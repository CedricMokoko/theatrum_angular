import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { emailValidator } from '../../shared/validators/email.validator';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  //Qui dicchiaro il mio formulario
  public form!: FormGroup;

  constructor() {}

  public subscription: Subscription = new Subscription();

  ngOnInit(): void {
    //Qui inizializzo il mio formulario
    this.form = new FormGroup({
      email: new FormControl('', [emailValidator(), Validators.required]),
      codiceUtente: new FormControl('', [Validators.required]),
    });

    this.subscription.add(
      this.form.statusChanges.subscribe(() => {
        this.updateFormErrors();
      })
    );
  }

  //Qui un oggetto per la mia gestione degli errori legati al mio formulario.
  public formErrors: {
    [campo: string]: {
      message: string;
      validations: { [field: string]: string };
    };
  } = {
    email: {
      message: '',
      validations: {
        required: 'Ce champ est requis.',
        emailInvalid: 'Rentrez une adresse email valide.',
      },
    },
    codiceUtente: {
      message: '',
      validations: {
        required: 'Ce champ est requis.',
      },
    },
    form: {
      message: '',
      validations: {},
    },
  };

  // Funzione per il controllo dei miei campi se passano onblur dopo essere stati toccati
  updateFormErrors(): void {
    for (const campo in this.formErrors) {
      this.formErrors[campo].message = '';
    }

    // Check each control in the form
    for (const campo in this.form.controls) {
      const control = this.form.get(campo)!;

      if (control.invalid && (control.touched || control.dirty)) {
        const messages = this.formErrors[campo].validations;
        for (const key in control.errors) {
          if (messages[key]) {
            this.formErrors[campo].message += messages[key] + ' ';
          }
        }
        this.formErrors[campo].message = this.formErrors[campo].message.trim();
      }
    }
  }

  public submit(): void {
    if (this.form.valid) {
      this.form.reset();
    } else {
      this.formErrors['form'].message =
        'Il form è vuoto o contiene errori. Per favore, controlla i campi evidenziati.';
    }
  }
}
