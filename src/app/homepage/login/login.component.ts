import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { emailValidator } from '../../shared/validators/email.validator';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  public form!: FormGroup;

  //Qui un oggetto per la mia gestione degli errori legati al mio formulario.
  public formErrors: {
    [campo: string]: {
      message: string;
      validations: { [field: string]: string };
    };
  } = {
    form: {
      message: '',
      validations: {},
    },
  };

  constructor(private authService: AuthService, private router: Router) {}

  public subscription: Subscription = new Subscription();

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', [emailValidator(), Validators.required]),
      password: new FormControl('', [Validators.required]),
    });

    this.subscription.add(
      this.form.statusChanges.subscribe(() => {
        this.updateFormErrors();
      })
    );
  }

  public updateFormErrors() {
    if (!this.form) {
      return;
    }
    // Questo serve per cancellare eventuali messaggi di errore già visibles.
    for (const campo in this.formErrors) {
      this.formErrors[campo].message = '';
    }
  }

  public submit(): void {
    if (this.form.valid) {
      const email = this.form.get('email')?.value;
      const password = this.form.get('password')?.value;

      this.authService.login$(email, password).subscribe({
        next: (cliente) => {
          this.authService.setToken(Number(cliente.id), cliente.nome!);
          this.router.navigate(['/contents', cliente.id, cliente.nome]);

          console.log('cliente -> ', cliente);
        },
        // Messaggi di errori provenienti dall' authService dopo la sua interazione con il server
        error: (error) => {
          this.formErrors['form'].message = error.message;
        },
      });
    } else {
      this.formErrors['form'].message =
        'Il formulario è incompleto o contiene degli errori, controlla i campi.';
    }
  }
}
