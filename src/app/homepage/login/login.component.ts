import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { emailValidator } from '../../shared/validators/email.validator';
import { FormErrorHandlerService } from '../../shared/services/form-error-handler.service';
import { Subscription, tap } from 'rxjs';
import { ClienteService } from '../../shared/services/cliente.service';
import { AuthService } from '../../shared/auth/auth.service';
import { Router } from '@angular/router';

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
    password: {
      message: '',
      validations: {
        pattern: 'La password deve avere almeno 8 caratteri alfanumerici.',
        required: 'La password è obbligatoria.',
      },
    },
    form: {
      message: '',
      validations: {},
    },
  };

  constructor(
    private clienteService: ClienteService,
    private authService: AuthService, // Inietta AuthService
    private router: Router
  ) {}

  public subscription: Subscription = new Subscription();

  ngOnInit(): void {
    //Qui inizializzo il mio formulario
    this.form = new FormGroup({
      email: new FormControl('', [emailValidator(), Validators.required]),
      password: new FormControl('', [
        Validators.required,
        // Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/),
      ]),
    });

    this.subscription.add(
      this.form.statusChanges.subscribe(() => {
        this.updateFormErrors();
      })
    );
  }

  public updateFormErrors() {
    // Mi consente di uscire subito della function se il modulo non esiste.
    if (!this.form) {
      return;
    }
    // Questo serve per cancellare eventuali messaggi di errore precedenti.
    for (const campo in this.formErrors) {
      this.formErrors[campo].message = '';
    }
  }

  public submit(): void {
    if (this.form.valid) {
      const email = this.form.get('email')?.value;
      const password = this.form.get('password')?.value;

      this.clienteService.login$(email, password).subscribe({
        next: (cliente) => {
          this.authService.login(cliente.nome);
          this.router.navigate(['/contents']);
        },
        // messaggi di errori provenienti dal clienteService dopo la sua interazione con il server
        error: (error) => {
          this.formErrors['form'].message = error.message;
        },
      });
    } else {
      this.formErrors['form'].message = 'Invalid email or password.';
    }
  }
}
