import { AbstractControl, FormControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class MinReqdValidators {
    static checkMin(minRequired): ValidatorFn {
        return function validate(formControl: FormControl) {
            return parseInt(formControl.value) < minRequired ? { lessThanMin: true } : null;
        }

    }
}