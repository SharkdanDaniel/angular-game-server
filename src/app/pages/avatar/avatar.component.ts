import { Avatar } from './../../core/models/avatar';
import { ModalConfirmComponent } from './../../shared/components/modal-confirm/modal-confirm.component';
import { SnackbarService } from './../../core/services/snackbar.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import {
  TableAction,
  TableColumn
} from './../../shared/modules/table/table-models.model';
import { Router } from '@angular/router';
import { AvatarService } from './../../core/services/avatar.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent implements OnInit {
  avatars: any[] = [];
  pageSize = 4;

  columns: TableColumn[] = [
    {
      displayName: 'Nome',
      columnName: 'name'
    },
    {
      displayName: 'Título',
      columnName: 'title'
    },
    {
      displayName: 'Vida',
      columnName: 'health',
      className: 'text-center'
    },

    {
      displayName: 'Armadura',
      columnName: 'armor',
      className: 'text-center'
    },
    {
      displayName: 'Fome',
      columnName: 'hungry',
      className: 'text-center'
    },
    {
      displayName: 'Líder',
      columnName: 'leader',
      className: 'text-center'
    },
    {
      displayName: 'Experiência',
      columnName: 'experience',
      className: 'text-center'
    },
    {
      displayName: 'Money',
      columnName: 'money',
      className: 'text-center'
    },
    {
      displayName: 'Pontos de status',
      columnName: 'statusPoint',
      className: 'text-center'
    },
    {
      displayName: 'Banido',
      columnName: 'isBanned',
      className: 'text-center'
    },
    {
      displayName: 'Motivo do ban',
      columnName: 'bannedReason',
      className: 'text-center'
    },
    {
      displayName: 'Admin',
      columnName: 'isAdmin',
      className: 'text-center'
    },
    {
      displayName: 'Morte',
      columnName: 'isDead',
      className: 'text-center'
    },
    {
      displayName: 'Str',
      columnName: 'strength',
      className: 'text-center'
    },
    {
      displayName: 'Res',
      columnName: 'endurance',
      className: 'text-center'
    },
    {
      displayName: 'Agi',
      columnName: 'agility',
      className: 'text-center'
    },
    {
      displayName: 'Acc',
      columnName: 'accuracy',
      className: 'text-center'
    }
  ];

  actions: TableAction[] = [
    {
      iconClass: 'edit',
      eventName: 'edit'
    },
    {
      iconClass: 'like',
      eventName: 'unban',
      disabledName: 'isBanned',
      isDisabled: false
    },
    {
      iconClass: 'ban',
      eventName: 'ban',
      disabledName: 'isBanned',
      isDisabled: true
    }
  ];

  constructor(
    private avatarService: AvatarService,
    protected ngxSpinner: NgxSpinnerService,
    private modalService: NgbModal,
    private snackBar: SnackbarService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.avatarService.getAvatars().subscribe(data => {
      this.avatars = data;
    });
  }

  ban(avatar: any, reason: string) {
    if (reason == null || reason == '') {
      console.log('ban cancelado');
    } else {
      this.avatarService
        .banAvatar(avatar, reason)
        .subscribe(res => {
          console.log('Avatar banido', res);
          this.getAll();
        });
    }
  }

  unBan(avatar: any) {
    this.avatarService
      .unbanAvatar(avatar)
      .subscribe(res => {
        console.log('Avatar desbanido', res);
        this.getAll();
      });
  }

  openModal(avatar: Avatar, ban: boolean) {
    const modalRef = this.modalService.open(ModalConfirmComponent, {
      centered: true,
      windowClass: 'h-75'
    });
    modalRef.componentInstance.title = ban? 'Banir avatar' : 'Desbanir avatar';
    modalRef.componentInstance.ban = ban ? true : false;
    modalRef.componentInstance.name = ban ? null : avatar.bannedReason;
    modalRef.componentInstance.input =
      'Motivo do banimento';
    modalRef.componentInstance.button = ban ? 'danger' : 'primary';
    modalRef.componentInstance.action = 'Confirmar';
    modalRef.result.then(res => {
      if (res) {
        ban ? this.ban(avatar, res) : this.unBan(avatar);
      }
    });
  }

  onAction(ev: any) {
    if (ev.action === 'edit') {
      console.log(ev.item);
      return this.router.navigate(['/avatar/update', ev.item.uuid]);
    }
    if (ev.action) {
      return this.openModal(ev.item, ev.action == 'ban' ? true : false);
    }
  }
}
