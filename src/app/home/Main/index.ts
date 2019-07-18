import { Component } from '@angular/core';

@Component({
  selector: 'main',
  templateUrl: 'index.html',
  styleUrls: ['style.scss']
})

export class Main {

  stepper = {
    register: {
      id: 0,
      name: "Register"
    },
    myProjects: {
      id: 1,
      name: "My projects"
    },
    myWallet: {
      id: 2,
      name: "My wallet"
    },
    projects: {
      id: 3,
      name: "Projects"
    },
    complete: {
      id: 4,
      name: "Complete"
    }
  }

  currentStepper = this.stepper.register.id;

  constructor() { }

  setStepper(id) {
    this.currentStepper = id;
  }

}
