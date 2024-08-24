import { Component, EventEmitter, OnInit, Output, output, signal, WritableSignal } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { selectIsLoadingAuth } from '../../../state/auth.selectors';
import { AuthState } from '../../../state/auth.reducer';
import { Store } from '@ngrx/store';
import { AuthActions } from '../../../state/auth.all.actions';
import { Register } from '../../../../share/models/Register';
import { passwordValidator } from '../../../../share/validators/password.validator';
import swal from 'sweetalert2';


@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.scss'
})
export class RegisterFormComponent implements OnInit {

  registerForm = this.formBuilder.group({
    firstName: ['', { validators: [Validators.maxLength(25), Validators.minLength(2)] }],
    lastName: ['', { validators: [Validators.maxLength(25), Validators.minLength(2)] }],
    email: ['', { validators: [Validators.required, Validators.email] }],
    password: ['', { validators: [Validators.required, Validators.minLength(6), Validators.maxLength(25)] }],
    confirmPassword: [''],
    checkbox: [false, { validators: [Validators.requiredTrue] }],
  }, { validators: [passwordValidator] });
  isLoading: WritableSignal<boolean> = signal(false);
  isSubmitted: WritableSignal<boolean> = signal(false);
  @Output() formIsDirty: EventEmitter<boolean> = new EventEmitter<boolean>(false);
  constructor(private router: Router, private formBuilder: FormBuilder, private store: Store<AuthState>) {

  }

  ngOnInit(): void {
    this.isLoadingTrack();
    this.trackFormValue();
  }
  onSubmit() {
    this.isSubmitted.set(true);
    this.store.dispatch(AuthActions.register({
      register: new Register(this.registerForm.value.firstName!,
        this.registerForm.value.lastName!,
        this.registerForm.value.email!,
        this.registerForm.value.password!)
    }));
  }

  trackFormValue() {
    this.registerForm.valueChanges.subscribe(() => {
      if (!!this.registerForm.value.firstName ||
        !!this.registerForm.value.lastName ||
        !!this.registerForm.value.email ||
        !!this.registerForm.value.password
      ) {
        console.log(this.registerForm.value.checkbox);

        this.formIsDirty.emit(true);
      }
      else {
        this.formIsDirty.emit(false);
      }
    })
  }

  isLoadingTrack() {
    this.store.select(selectIsLoadingAuth).subscribe((isLoading) => {
      this.isLoading.set(isLoading);
    })
  }
  getControl(name: string) {
    return this.registerForm.get(name);
  }

  openTerms() {
    const isMobile = window.innerWidth < 768;
    swal.fire({
      html: `
      <div class="container" style="max-width: 700px; direction: rtl; text-align: right;">
        <section>
          <h2 class="text-center" style="font-size: 24px;">مرحبًا بك في موقعنا</h2>
          <p style="font-size: 14px;">بإستخدام هذا الموقع، فإنك توافق على الالتزام بالشروط والأحكام التالية. يرجى قراءتها بعناية.</p>
        </section>

        <section>
          <h3 style="font-size: 18px;">1. قبول الشروط</h3>
          <p style="font-size: 14px;">باستخدام هذا الموقع، فإنك توافق على الالتزام بهذه الشروط والأحكام. إذا كنت لا توافق على أي جزء من هذه الشروط، فلا يجوز لك استخدام الموقع.</p>
        </section>

        <section>
          <h3 style="font-size: 18px;">2. استخدام الموقع</h3>
          <p style="font-size: 14px;">يُسمح لك باستخدام هذا الموقع فقط لأغراض قانونية ووفقًا لهذه الشروط. يُحظر استخدام الموقع في أي نشاط غير قانوني أو ضار.</p>
        </section>

        <section>
          <h3 style="font-size: 18px;">3. حقوق الملكية الفكرية</h3>
          <p style="font-size: 14px;">جميع المحتويات الموجودة على هذا الموقع، بما في ذلك النصوص والصور والشعارات والرموز البرمجية، محمية بموجب حقوق الطبع والنشر والعلامات التجارية. يُحظر استخدام هذه المحتويات دون إذن مسبق منا.</p>
        </section>

        <section>
          <h3 style="font-size: 18px;">4. الخصوصية</h3>
          <p style="font-size: 14px;">نحن ملتزمون بحماية خصوصيتك. سيتم استخدام أي معلومات شخصية تزودنا بها وفقًا لسياسة الخصوصية الخاصة بنا.</p>
        </section>

        <section>
          <h3 style="font-size: 18px;">5. التعديلات</h3>
          <p style="font-size: 14px;">نحتفظ بالحق في تعديل هذه الشروط والأحكام في أي وقت دون إشعار مسبق. إن استخدامك المستمر للموقع بعد أي تعديلات يعتبر قبولًا منك بالشروط المعدلة.</p>
        </section>

        <section>
          <h3 style="font-size: 18px;">6. المسؤولية</h3>
          <p style="font-size: 14px;">نحن لا نتحمل أي مسؤولية عن أي أضرار مباشرة أو غير مباشرة تنشأ عن استخدامك لهذا الموقع أو أي محتوى موجود فيه.</p>
        </section>

        <section>
          <h3 style="font-size: 18px;">7. القوانين السارية</h3>
          <p style="font-size: 14px;">تخضع هذه الشروط والأحكام وتُفسر وفقًا للقوانين المعمول بها في الدولة التي نعمل فيها.</p>
        </section>

        <section>
          <h3 style="font-size: 18px;">8. الاتصال بنا</h3>
          <p style="font-size: 14px;">إذا كان لديك أي استفسارات أو شكاوى بشأن هذه الشروط والأحكام، فلا تتردد في الاتصال بنا من خلال وسائل الاتصال المتاحة على الموقع.</p>
        </section>
      </div>
    `,
      icon: 'info',
      width: isMobile ? '97%' : '70%',
      allowEscapeKey: false,
      allowOutsideClick: false,
      iconColor: '#5B99C2',
      showCancelButton: true,
      confirmButtonColor: '#5B99C2',
      cancelButtonColor: '#d33',
      confirmButtonText: 'I agree',
      preConfirm: () => {
        this.registerForm.patchValue({
          checkbox: true
        });
      },

    });
  }
}
