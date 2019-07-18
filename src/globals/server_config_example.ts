import { readFileSync } from 'fs';
import { join } from 'path';

export const SSL = {
    key: readFileSync(join(process.cwd(), 'ssl', 'privkey.pem')),
    cert: readFileSync(join(process.cwd(), 'ssl', 'cert.pem')),
    ca: readFileSync(join(process.cwd(), 'ssl', 'chain.pem')),
    passphrase: '',
    enable: true
}
