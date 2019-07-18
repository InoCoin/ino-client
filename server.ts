// These are important and needed before anything else
import 'zone.js/dist/zone-node';
import 'reflect-metadata';

import * as compression from 'compression';
import * as cluster from 'cluster';
import * as express from 'express';
import * as useragent from 'express-useragent';

import { join } from 'path';
import { enableProdMode } from '@angular/core';
import { ngExpressEngine } from '@nguniversal/express-engine';
import { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader';
import { SSL } from './src/globals/server_config';

if (cluster.isMaster) {

  cluster.fork();
  console.log('Master cluster started');
  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
    cluster.fork();
  });

} else {

  // Faster server renders w/ Prod mode (dev mode never needed)
  enableProdMode();

  // Express server
  const app = express();

  const PORT = process.env.PORT || 5002;
  const DIST_FOLDER = join(process.cwd(), 'dist');
  const PUBLIC_FOLDER = join(process.cwd(), 'public');

  // * NOTE :: leave this as require() since this file is built Dynamically from webpack
  const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = require('./dist/server/main');

  app.use(compression());
  app.use(useragent.express());

  app.engine('html', ngExpressEngine({
    bootstrap: AppServerModuleNgFactory,
    providers: [
      provideModuleMap(LAZY_MODULE_MAP)
    ]
  }));

  app.set('view engine', 'html');
  app.set('views', join(DIST_FOLDER, 'ino-coin'));

  // Server static files from /ino-coin
  app.get('*.*', express.static(join(DIST_FOLDER, 'ino-coin'), {
    maxAge: '30d'
  }));

  app.use(express.static(PUBLIC_FOLDER, {
    maxAge: '30d'
  }));

  // All regular routes use the Universal engine
  app.get('*', (req, res) => {
    return res.render('index', { req });
  });

  if (SSL.enable) {
    console.log('Production mode started');

    const httpsServer = require('spdy').createServer({
      ...SSL,
      spdy: {
        protocols: ['h2', 'http/1.1'],
      }
    }, app);

    httpsServer.listen(PORT, () => {
      console.log(`Https server is running on port ${PORT}`);
    });

  } else {
    // Start up the Node server
    app.listen(PORT, () => {
      console.log(`Node Express server listening on http://localhost:${PORT}`);
    });
  }
}
