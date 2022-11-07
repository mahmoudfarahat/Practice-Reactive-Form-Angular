import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }
  genders = ['male', 'female'];

  forbiddenName = ['ahmed','maro']
  signupForm : FormGroup
ngOnInit(): void {
  this.signupForm =  new FormGroup({
    'userData': new FormGroup({
      'username' : new FormControl(null, [Validators.required,this.forbiddenNames.bind(this) ] ),
      'email' : new FormControl(null , [Validators.required , Validators.email], this.forbiddenEmail)
    }),

    'gender': new FormControl('male'),
    'hobbies': new FormArray([])
  })

  this.signupForm.get('userData.username').valueChanges.subscribe((value) =>
  {
     console.log(value)
  }
  )
  this.signupForm.get('userData.email').statusChanges.subscribe((status) =>
  {
     console.log(status)
  })
}

onSubmit()
{
  console.log(this.signupForm)
}

onAddHoppy()
{
  const control = new FormControl(null, Validators.required);

  (<FormArray>this.signupForm.get('hobbies')).push(control)
}

getControls() {
  return (<FormArray>this.signupForm.get('hobbies')).controls;
}

forbiddenNames(control: FormControl) :{[s:string]: boolean} {
if(this.forbiddenName.indexOf(control.value) !== -1 ){

  return {'nameIsForbbin':true}
}
return null
}

forbiddenEmail(control : FormControl) : Promise<any> | Observable<any> {
  const promise = new Promise<any>((res,rej) => {
    setTimeout(() => {
      if(control.value == 'test@test.com'){
        res({'emailIsForbidden': true})
      }else{
        res(null)
      }
    },1500)
  })
  return promise
}


}
