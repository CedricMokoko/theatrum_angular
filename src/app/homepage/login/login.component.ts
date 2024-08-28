import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { emailValidator } from '../../shared/validators/email.validator';
import { FormErrorHandlerService } from '../../shared/services/form-error-handler.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  //Qui dicchiaro il mio formulario
  public form!: FormGroup;

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
        required: "L'email è obbligatoria.",
        emailInvalid: "Inserisci un'email valida.",
      },
    },
    codiceUtente: {
      message: '',
      validations: {
        required: 'Il codice utente obbligatorio.',
      },
    },
    form: {
      message: '',
      validations: {},
    },
  };

  constructor() {}

  ngOnInit(): void {
    //Qui inizializzo il mio formulario
    this.form = new FormGroup({
      email: new FormControl('', [emailValidator(), Validators.required]),
      codiceUtente: new FormControl('', [Validators.required]),
    });
  }

  public submit(): void {
    if (this.form.valid) {
      this.form.reset();
    } else {
      this.formErrors['form'].message = 'Email e/o codice utente sbaglito/i.';
    }
  }
}
