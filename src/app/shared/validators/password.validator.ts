import {AbstractControl} from '@angular/forms';
export class PasswordValidator {
  static matchPassword(AC: AbstractControl) {
      const password = AC.get('password').value; // to get value in input tag
      const confirmPassword = AC.get('confirmPassword').value; // to get value in input tag
      if (password !== confirmPassword) {
          AC.get('confirmPassword').setErrors( {matchPassword: true} );
      } else {
          return null;
      }
  }
}
