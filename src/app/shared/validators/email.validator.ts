import { AbstractControl, ValidatorFn } from '@angular/forms';

export function emailValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (control.value && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(control.value)) {
      return { emailInvalid: true };
    }
    return null;
  };
}
