// import { TestBed, async, tick, fakeAsync, } from '@angular/core/testing';
// import { RouterTestingModule } from '@angular/router/testing';

// import { NgModuleFactoryLoader } from '@angular/core';
// import { Location } from '@angular/common';
// import { RouterModule, Router, } from '@angular/router';

// import { MODULE_COMPONENTS, MODULE_ROUTES } from './app.routes';
// import { HomeModule } from './home/home.module';

// import { AppComponent } from './app.component';
// import { MainComponent } from './home/Main';

// describe('AppComponent', () => {

//   let router: Router;
//   let location: Location;

//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       imports: [
//         RouterTestingModule.withRoutes(MODULE_ROUTES, { initialNavigation: 'enabled' }),
//         HomeModule
//       ],
//       declarations: [
//         AppComponent,
//         MODULE_COMPONENTS
//       ]
//     }).compileComponents();

//     router = TestBed.get(Router);
//     location = TestBed.get(Location);

//   }));

//   it('should create the app', async(() => {
//     const fixture = TestBed.createComponent(AppComponent);
//     const app = fixture.debugElement.componentInstance;
//     expect(app).toBeTruthy();
//   }));

//   it('navigate to "" redirects you to /', fakeAsync(() => {

//     const fixture = TestBed.createComponent(MainComponent);
//     const compiled = fixture.debugElement.nativeElement;

//     router.navigateByUrl('/');
//     tick();
//     fixture.detectChanges();

//     expect(location.path()).toBe('/');
//     expect(compiled.querySelector('div.main').textContent).toContain('Main');
// }));

// });
