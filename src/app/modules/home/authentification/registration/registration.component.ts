import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {

  public form: FormGroup;

  constructor(
    private fb: FormBuilder,
    ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [null, Validators.required],
      lastName: [null, Validators.required],
      email: ['', [Validators.email, Validators.required]],
      password: [null, [Validators.minLength(6), Validators.required]],
      confirmPassword: [null, Validators.required]
    },{
      validators: [this.controlValuesAreEqual('password','confirmPassword')]
    });
  }

  public register() {
    console.log(this.form.value);
    console.log(`form valid: ${this.form.valid}`);
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

