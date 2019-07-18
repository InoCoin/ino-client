import { FormGroup } from '@angular/forms';

export const Errors = {
  required: function(control: any, name: string, bool: boolean) {
    if(bool){
      return `${name[0].toUpperCase() + name.slice(1)} is required !`
    }
    return `Field is required !`
  },
  email: function(control: any, name: string){
    return `Email is not valid !`
  },
  maxlength: function(control: any, name: string) {
    return `Maximum length is ${control.errors.maxlength.requiredLength} !`
  },
  minlength: function(control: any, name: string) {
    return `Minimum length is ${control.errors.minlength.requiredLength} !`
  },
  passwordMismatch: function(control: any, name: string) {
    return `Password mismatch !`
  }
}

export function passwordMatchValidator(g: FormGroup) {
   return g.get('password').value === g.get('passwordConfirm').value
      ? null : {'passwordMismatch': true};
}
