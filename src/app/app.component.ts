import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  genders = ['male', 'female'];

  forbiddenName = ['ahmed','maro']
  signupForm : FormGroup
ngOnInit(): void {
  this.signupForm =  new FormGroup({
    'userData': new FormGroup({
      'username' : new FormControl(null, [Validators.required,this.forbiddenNames.bind(this) ]),
      'email' : new FormControl(null , [Validators.required , Validators.email])
    }),

    'gender': new FormControl('male'),
    'hobbies': new FormArray([])
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


}
