import { NgxSpinnerService } from 'ngx-spinner';
import { catchError, take } from 'rxjs/operators';
import { SnackbarService } from 'src/app/core/services/snackbar.service';
import { HttpClient } from '@angular/common/http';
import { EMPTY } from 'rxjs';

export abstract class CrudService<T> {
  private getAll_URL: string;
  private getById_URL: string;
  private update_URL: string;
  private create_URL: string;
  private delete_URL: string;


  constructor(
    protected http: HttpClient,
    private API_URL,
    protected snackBar: SnackbarService,
    protected nxgSpinner: NgxSpinnerService
  ) {}

  getAll() {
    return this.http.get<T[]>(`${this.API_URL}${this.getAll_URL}`).pipe(
      take(1),
      catchError((err) => {
        console.log(err);
        this.handleError();
        this.nxgSpinner.hide();
        this.nxgSpinner.hide('content');
        return EMPTY;
      })
    );
  }

  getById(id) {
    return this.http.get(`${this.API_URL}${this.getById_URL}/${id}`).pipe(
      take(1),
      catchError((err) => {
        console.log(err);
        this.handleError();
        this.nxgSpinner.hide();
        this.nxgSpinner.hide('content');
        return EMPTY;
      })
    );
  }

  create(data: T) {
    this.nxgSpinner.show('content');
    return this.http.post(`${this.API_URL}${this.create_URL}`, data).pipe(
      take(1),
      // catchError((err) => {
      //   console.log(err);
      //   this.handleError();
      //   this.nxgSpinner.hide();
      //   this.nxgSpinner.hide('content');
      //   return EMPTY;
      // })
    );
  }

  update(data: T) {
    this.nxgSpinner.show('content');
    return this.http.put(`${this.API_URL}${this.update_URL}/${data['id']}`, data).pipe(
      take(1),
      // catchError((err) => {
      //   console.log(err);
      //   this.handleError();
      //   this.nxgSpinner.hide();
      //   this.nxgSpinner.hide('content');
      //   return EMPTY;
      // })
    );
  }

  delete(id) {
    this.nxgSpinner.show('content');
    return this.http.delete(`${this.API_URL}${this.delete_URL}/${id}`).pipe(
      take(1),
      // catchError((err) => {
      //   console.log(err);
      //   this.handleError();
      //   this.nxgSpinner.hide();
      //   this.nxgSpinner.hide('content');
      //   return EMPTY;
      // })
    );
  }

  public set setAll(data: string) {
    this.getAll_URL = data;
  }
  public set setById(data: string) {
    this.getById_URL = data;
  }
  public set setUpdate(data: string) {
    this.update_URL = data;
  }
  public set setCreate(data: string) {
    this.create_URL = data;
  }
  public set setDel(data: string) {
    this.delete_URL = data;
  }

  handleError() {
    this.snackBar.showMessage('Erro ao conectar com o servidor', true);
  }
}
