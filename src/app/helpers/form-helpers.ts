import { FormGroup, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import * as Bluebird from 'bluebird';

export class FormHelpers {
  public static async onValueChanged(
    form: FormGroup,
    formErrors: Object,
    validationMessages: Object) {

    if (!form) { return; }
    await this.loopFormValidation(formErrors, form, validationMessages);
  }

  public static async checkValidations(form: FormGroup, formErrors: Object, snackBar: MatSnackBar):
    Promise<boolean> {

    form.updateValueAndValidity();
    if (form.valid) {
      return true;
    } else {

      await this.loopFormErrors(formErrors, form);

      snackBar.open('Error: Validation errors', '', {
        duration: 2000
      });

      return false;

    }

  }

  private static async loopFormErrors(
    formErrors: Object,
    form: FormGroup,
    nestedString: String = ''
  ) {
    await Bluebird.each(Object.keys(formErrors), async (key) => {
      const errorsItem = formErrors[key];

      const newKey = nestedString + key;
      const part = form.get(newKey);

      if (errorsItem instanceof Array) {
        part.markAsDirty();
        part.markAsTouched();
      } else {
        await this.loopFormErrors(errorsItem, form, newKey + '.');
      }

    });
  }

  private static async loopFormValidation(
    formErrors: Object,
    form: FormGroup,
    validationMessages: Object,
    nestedString: String = ''
  ) {
    const e = await Bluebird.each(Object.keys(formErrors), async (key) => {
      let errorsItem = formErrors[key];

      const newKey = nestedString + key;
      const part = form.get(newKey);

      if (errorsItem instanceof Array) {
        errorsItem = [];
        if (part && part instanceof FormControl && !part.valid && !part.disabled) {
          const messages = validationMessages[key];
          await Bluebird.each(Object.keys(part.errors), async (controlErrorKey) => {
            errorsItem.push(messages[controlErrorKey]);
          });
          formErrors[key] = errorsItem;
        }
      } else {
        await this.loopFormValidation(errorsItem, form, validationMessages[key], newKey + '.');
      }

    });
  }


}
