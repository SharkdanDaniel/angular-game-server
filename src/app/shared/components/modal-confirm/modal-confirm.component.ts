import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-confirm',
  templateUrl: './modal-confirm.component.html',
  styleUrls: ['./modal-confirm.component.scss']
})
export class ModalConfirmComponent implements OnInit {
  form: FormGroup;
  @Input() title: string;
  @Input() body: string;
  @Input() input: string;
  @Input() ban: boolean = true;
  @Input() button = 'primary';
  @Input() action = 'Salvar';

  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    if (this.input) {
      this.form = this.formBuilder.group({
        name: [{value: null, disabled : this.ban ? false : true}]
      });
    }
  }
}
