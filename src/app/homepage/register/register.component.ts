import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { emailValidator } from '../../shared/validators/email.validator';
import { FormErrorHandlerService } from '../../shared/services/form-error-handler.service';
import { passwordMatchValidator } from '../../shared/validators/passwordmatch.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit {
  //Qui dicchiaro il mio formulario
  public form!: FormGroup;

  //Qui un oggetto per la mia gestione degli errori legati al mio formulario.
  public formErrors: {
    [campo: string]: {
      message: string;
      validations: { [field: string]: string };
    };
  } = {
    nome: {
      message: '',
      validations: {
        required: 'Il nome è obbligatorio.',
        minlength: 'Il nome deve avere almeno 3 caratteri.',
        pattern: "Il nome non puo' contenere ne numeri ne caratteri speciali.",
      },
    },
    cognome: {
      message: '',
      validations: {
        required: 'Il cognome è obbligatorio.',
        minlength: 'Il cognome deve avere almeno 3 caratteri.',
        pattern:
          "Il cognome non puo' contenere ne numeri ne caratteri speciali.",
      },
    },
    email: {
      message: '',
      validations: {
        required: "L'email è obbligatoria.",
        emailInvalid: "Inserisci un'email valida.",
      },
    },
    telefono: {
      message: '',
      validations: {
        required: 'Il numero di telefono è obbligatorio.',
        pattern: 'Il numero di telefono deve contenere 10 numeri.',
      },
    },
    password: {
      message: 'La password deve avere almeno 8 caratteri alfanumerici.',
      validations: {
        required: 'La password è obbligatoria.',
        pattern: 'La password deve avere almeno 8 caratteri alfanumerici.',
      },
    },
    confirmPassword: {
      message: '',
      validations: {
        required: 'La conferma della password è obbligatoria.',
        notMatch: 'Le password non coincidono.',
      },
    },
    form: {
      message: '',
      validations: {},
    },
  };

  constructor(private formErrorHandler: FormErrorHandlerService) {}

  ngOnInit(): void {
    this.form = new FormGroup(
      {
        nome: new FormControl('', [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern(
            /^[a-zA-ZÀ-ÖØ-öø-ÿ]{3,}( [a-zA-ZÀ-ÖØ-öø-ÿ]{3,})*$/
          ),
        ]),
        cognome: new FormControl('', [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern(
            /^[a-zA-ZÀ-ÖØ-öø-ÿ]{3,}( [a-zA-ZÀ-ÖØ-öø-ÿ]{3,})*$/
          ),
        ]),
        email: new FormControl('', [Validators.required, emailValidator()]),
        telefono: new FormControl('', [
          Validators.required,
          Validators.pattern(/^[0-9]{10}$/),
        ]),
        password: new FormControl('', [
          Validators.required,
          Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/),
        ]),
        confirmPassword: new FormControl('', [Validators.required]),
      },
      { validators: passwordMatchValidator() }
    );
  }

  public updateFormErrors() {
    this.formErrorHandler.updateFormErrors(this.form, this.formErrors);
  }

  public submit(): void {
    this.updateFormErrors();
    if (this.form.valid) {
      console.log(this.form.value);
      this.form.reset();
    }
  }
}
