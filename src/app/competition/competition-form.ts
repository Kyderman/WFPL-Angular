import { MatSnackBar } from '@angular/material';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { FormHelpers } from '../helpers/form-helpers';

export class CompetitionForm {

  public form: FormGroup;
  public formErrors = {
    name: [],
  };
  public validationMessages = {
    name: {
      required: 'Name is required.'
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
      name: ['', Validators.required],
    });
  }

}
