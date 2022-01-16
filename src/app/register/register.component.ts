import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedService } from '../shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../app.component.css', './register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  Users: any = [];

  constructor(private fb: FormBuilder,
              private service: SharedService,
              private router: Router) { }

  ngOnInit(): void {
    // this.refreshUsers();

    this.registerForm = this.fb.group({
      email: ['', [ Validators.required, Validators.email ]],
      pass: ['', [ Validators.required, Validators.minLength(8) ]],
      repass: ['', [ Validators.required, Validators.minLength(8) ]],
      fst_name: ['', [ Validators.required, Validators.minLength(2) ]],
      sec_name: ['', [ Validators.required, Validators.minLength(2) ]],
      phone: ['', [ Validators.required, Validators.pattern('^[0-9]*$'), Validators.minLength(9), Validators.maxLength(9) ]],
    },
      { validator: this.checkPasswords('pass', 'repass') }
    );
  }
  
  //custom validator - is passwords same
  checkPasswords(t_pass:string, t_repass:string) {
    return (formGroup: FormGroup) => {
      const pass = formGroup.controls[t_pass];
      const repass = formGroup.controls[t_repass];
      if (repass.errors && !repass.errors.confirmedValidator) {
        return;
      }
      if (pass.value !== repass.value) {
        repass.setErrors({ confirmedValidator: true });
        pass.setErrors({ confirmedValidator: true });
      } else {
        repass.setErrors(null);
        pass.setErrors(null);
      }
    }
  }

  submitHandler() {
    var x = { Email: this.registerForm.get('email').value,
              Pass: this.registerForm.get('pass').value,
              Name: this.registerForm.get('fst_name').value,
              LastName: this.registerForm.get('sec_name').value,
              Phone: this.registerForm.get('phone').value };
    this.service.addUser(x).subscribe(res => {
      if (res != 'Failed to Add')
        this.router.navigate(['../login'])
      else {
        console.log('register error')
        this.registerForm.reset()
      }
    })
  }

  get email() { return this.registerForm.get('email'); }
  get pass() { return this.registerForm.get('pass'); }
  get repass() { return this.registerForm.get('repass'); }
  get fst_name() { return this.registerForm.get('fst_name'); }
  get sec_name() { return this.registerForm.get('sec_name'); }
  get phone() { return this.registerForm.get('phone'); }
}
