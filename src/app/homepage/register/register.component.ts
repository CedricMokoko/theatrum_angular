import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { emailValidator } from '../../shared/validators/email.validator';
import { FormErrorHandlerService } from '../../shared/services/form-error-handler.service';
import { passwordMatchValidator } from '../../shared/validators/passwordmatch.validator';
import { ClienteService } from '../../shared/services/cliente.service';
import { Router } from '@angular/router';

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
        minlength: 'Il nome deve avere almeno 3 lettere.',
        required: 'Il nome è obbligatorio.',
        pattern: "Il nome non puo' contenere spazi finali o caratteri speciali",
      },
    },
    cognome: {
      message: '',
      validations: {
        minlength: 'Il cognome deve avere almeno 3 lettere.',
        required: 'Il cognome è obbligatorio.',
        pattern:
          "Il cognome non puo' contenere spazi finali o caratteri speciali",
      },
    },
    email: {
      message: '',
      validations: {
        emailInvalid: "Inserisci un'email valida.",
        required: "L'email è obbligatoria.",
      },
    },
    password: {
      message: '',
      validations: {
        pattern: 'La password deve avere almeno 8 caratteri alfanumerici.',
        required: 'La password è obbligatoria.',
      },
    },
    confirmPassword: {
      message: '',
      validations: {
        notMatch: 'Le password non coincidono.',
        required: 'La conferma della password è obbligatoria.',
      },
    },
    form: {
      message: '',
      validations: {},
    },
  };

  constructor(
    private formErrorHandler: FormErrorHandlerService,
    private clienteService: ClienteService,
    private router: Router
  ) {}

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
        password: new FormControl('', [
          Validators.required,
          Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/),
        ]),
        confirmPassword: new FormControl('', [Validators.required]),
      },
      // Qui un validator personnalizzato passato in secondo paramettro per il FormGroup
      { validators: passwordMatchValidator() }
    );
  }

  public updateFormErrors() {
    this.formErrorHandler.updateFormErrors(this.form, this.formErrors);
  }

  /** Utils */
  // Getter per controllare se tutti i campi sono stati toccati o modificati
  // public get allTouchedOrDirty(): boolean {
  //   const controls = this.form.controls;
  //   for (const key in controls) {
  //     if (controls[key].untouched && controls[key].pristine) {
  //       return false;
  //     }
  //   }
  //   return true;
  // }

  public submit(): void {
    this.updateFormErrors();
    if (this.form.valid) {
      const cognome = this.form.get('cognome')?.value;
      const nome = this.form.get('nome')?.value;
      const email = this.form.get('email')?.value;
      const password = this.form.get('password')?.value;

      this.form.reset();
      this.clienteService.register$(cognome, nome, email, password).subscribe({
        next: (cliente) => {
          this.router.navigate(['/register-success']);
        },
        // messaggi di errori provenienti dal clienteService dopo la sua interazione con il server
        error: (error) => {
          this.formErrors['form'].message = error.message;
        },
      });
    } else {
      this.formErrors['form'].message =
        'Il formulario contiene degli errori, controlla i campi.';
    }
  }
}
