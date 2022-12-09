import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { RegistrationData } from 'src/app/interfaces/registration-data';
import { RegistrationService } from 'src/app/services/registration/registration.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {

  public form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private _registration: RegistrationService
    ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      username: [null, Validators.required],
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      email: ['', [Validators.email, Validators.required]],
      password: [null, [Validators.minLength(6), Validators.required]],
      confirmPassword: [null, Validators.required]
    },{
      validators: [this.controlValuesAreEqual('password','confirmPassword')]
    });
  }

  public register() {
    if (!this.form.valid) return;
    this._registration.registration(this.form.value);
  }

  private controlValuesAreEqual(controlNameA: string, controlNameB: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const FormGroup = control as FormGroup
      const valueOfControlA = FormGroup.get(controlNameA)?.value
      const valueOfControlB = FormGroup.get(controlNameB)?.value

      const str = `{\"${controlNameA}Confirmed\":"true"}`;
      const errorObj = JSON.parse(str);

      if (valueOfControlA !== valueOfControlB) {
        FormGroup.controls[controlNameB].setErrors(errorObj);
        return errorObj;
      }
      else {
        return null;
      }
    }
  }
}

