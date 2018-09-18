import { MatSnackBar } from '@angular/material';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { FormHelpers } from '../helpers/form-helpers';

export class GameweekForm {

  public form: FormGroup;
  public formErrors = {
    weekNumber: [],
    season: [],
    startDate: [],
    endDate: []
  };
  public validationMessages = {
    weekNumber: {
      required: 'Week number is required.'
    },
    season: {
      required: 'Season is required.'
    },
    startDate: {
      required: 'Start date is required.'
    },
    endDate: {
      required: 'End date is required.'
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
      weekNumber: [1, Validators.required],
      season: [1, Validators.required],
      startDate: [null, Validators.required],
      endDate: [null, Validators.required]
    });
  }

}
