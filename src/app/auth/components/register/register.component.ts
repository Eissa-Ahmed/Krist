import { Component, signal, WritableSignal } from '@angular/core';
import swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { CanComponentDeactivate } from '../../../core/guards/register-can-de-activate.guard';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements CanComponentDeactivate {
  formIsDirt: WritableSignal<boolean> = signal(false)

  canDeactivate(): boolean | Promise<boolean> | Observable<boolean> {
    if (this.formIsDirt()) {
      return new Promise<boolean>((resolve) => {
        swal.fire({
          title: 'Are you sure?',
          text: "You are about to leave and ignore the registration ",
          icon: 'warning',
          iconColor: '#ff7f3e',
          showCancelButton: true,
          confirmButtonColor: '#ff7f3e',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, leave!'
        }).then((result) => {
          resolve(result.isConfirmed);
        });
      });
    }
    return true;
  };
  onFormDirty(isDirty: boolean) {
    this.formIsDirt.set(isDirty)
  }
}
