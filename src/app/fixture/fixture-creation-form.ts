import { MatSnackBar } from '@angular/material';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { FormHelpers } from '../helpers/form-helpers';

export class FixtureCreationForm {

  public form: FormGroup;
  public formErrors = {
    fixtureDate: [],
    fixtureType: [],
    homeTeamId: [],
    awayTeamId: []
  };
  public validationMessages = {
    fixtureDate: {
      required: 'Date is required.'
    },
    fixtureType: {
      required: 'Fixture type is required.'
    },
    homeTeamId: {
      required: 'Home team is required.'
    },
    awayTeamId: {
      required: 'Away team is required.'
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
      fixtureDate: ['', Validators.required],
      fixtureType: ['', Validators.required],
      homeTeamId: [null, Validators.required],
      awayTeamId: [null, Validators.required]
    });
  }

}
