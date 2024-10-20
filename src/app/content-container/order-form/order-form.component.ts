import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Replica } from '../../shared/interfaces/replica';
import { ReplicaService } from '../../shared/services/replica.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrl: './order-form.component.scss',
})
export class OrderFormComponent implements OnInit {
  public orderForm!: FormGroup;
  private replica!: Replica;
  public clienteId!: string;

  constructor(
    private replicaService: ReplicaService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    //Parametro clienteId dalla route
    this.clienteId = this.activatedRoute.snapshot.paramMap.get('cliente_id')!;
  }
}
