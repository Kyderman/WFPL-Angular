import { MatSnackBar } from '@angular/material';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { FormHelpers } from '../helpers/form-helpers';

export class PlayerForm {

  public form: FormGroup;
  public formErrors = {
    firstName: [],
    lastName: [],
    currentValue: []
  };
  public validationMessages = {
    firstName: {
      required: 'First name is required.'
    },
    lastName: {
      required: 'Last name is required.'
    },
    currentValue: {
      required: 'Current value is required.'
    },
  };

  constructor(public fb: FormBuilder) {
    this.createForm();
    this.form.valueChanges
    .subscribe(() => FormHelpers.onValueChanged(this.form, this.formErrors,this.validationMessages));
    FormHelpers.onValueChanged(this.form, this.formErrors, this.validationMessages);
  }

  public async submit(snackBar: MatSnackBar) {
    if (await FormHelpers.checkValidations(this.form, this.formErrors, snackBar)) {
      try {
        return this.form.value
      } catch (err) {
        return false;
      }
    }
  }

  private createForm() {
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      currentValue: [2.0, [Validators.required, Validators.min(2.0), Validators.max(5.0)]]
    });
  }

}
