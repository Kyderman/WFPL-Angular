import { MatSnackBar } from '@angular/material';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { FormHelpers } from '../helpers/form-helpers';

export class LoginForm {

  public form: FormGroup;
  public formErrors = {
    username: [],
    password: [],
  };
  public validationMessages = {
    username: {
      required: 'Username is required.'
    },
    password: {
      required: 'Password is required.'
    }
  };

  constructor(public fb: FormBuilder) {
    this.createForm();
    this.form.valueChanges
    .subscribe((data) => {
      FormHelpers.onValueChanged(this.form, this.formErrors, this.validationMessages);
    });

    FormHelpers.onValueChanged(this.form, this.formErrors, this.validationMessages);
  }

  public async validate(snackBar: MatSnackBar) {

    const result = await FormHelpers.checkValidations(this.form, this.formErrors, snackBar);
    if (result) { return this.form.value; }
    return false;

  }

  private createForm() {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

}
