import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { FooterService } from "../../../core/services/footer.service";
import { ToastrService } from "ngx-toastr";
import { catchError, exhaustMap, map, of } from "rxjs";
import { HttpErrorResponse } from "@angular/common/http";
import { ShareActions } from "./share.all.action";

@Injectable()
export class ShareEffects {
  constructor(private actions$: Actions, private footerService: FooterService, private toastr: ToastrService) {

  }

  userSubscription$ = createEffect(() => this.actions$.pipe(
    ofType(ShareActions.userSubscription),
    exhaustMap((action) => this.footerService.userSubscription$(action.email).pipe(
      map((response) => {
        this.toastr.success(response.Message);
        return ShareActions.userSubscriptionSuccess();
      }),
      catchError((error: HttpErrorResponse) => {
        this.toastr.error(error.error.Message, '', { timeOut: 3000 });
        return of(ShareActions.userSubscriptionError());
      })
    ))
  ));
}
