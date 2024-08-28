import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FormErrorHandlerService {
  updateFormErrors(
    form: FormGroup,
    formErrors: {
      [campo: string]: {
        message: string;
        validations: { [field: string]: string };
      };
    }
  ): void {
    // Reset error messages
    for (const campo in formErrors) {
      formErrors[campo].message = '';
    }

    // Qui per inviare il messaggio 'Le password non coincidono.'
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    if (password && confirmPassword && password !== confirmPassword) {
      formErrors['confirmPassword'].message +=
        formErrors['confirmPassword'].validations['notMatch'] + ' ';
      formErrors['confirmPassword'].message =
        formErrors['confirmPassword'].message.trim();
    }

    // Qui per qualsiasi altri messaggi di errore per gli altri campi input
    for (const campo in form.controls) {
      const control = form.get(campo)!;

      if (control.invalid && (control.touched || control.dirty)) {
        const messages = formErrors[campo].validations;
        for (const key in control.errors) {
          if (messages[key]) {
            formErrors[campo].message += messages[key] + ' ';
          }
        }
        formErrors[campo].message = formErrors[campo].message.trim();
      }

      //Qui nel caso in ciu il formulario non risulta valido al momento del submit
      if (form.invalid) {
        formErrors['form'].message =
          'Il formulario contiene errori. Per favore, controlla i campi evidenziati.';
      }
    }
  }
}
