import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-confirm',
  templateUrl: './modal-confirm.component.html',
  styleUrls: ['./modal-confirm.component.scss']
})
export class ModalConfirmComponent implements OnInit {
  @Input() title: string;
  @Input() body: string;
  @Input() button = 'primary'
  @Input() action = 'Salvar'

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

}
