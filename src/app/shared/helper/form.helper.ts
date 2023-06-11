import { FormControl,FormGroup } from "@angular/forms";

function validate(formGroup : any){
    // validate all fields if actor click without touch any field
    Object.keys(formGroup.controls).forEach(field => {
        const control = formGroup.get(field);
        if (control instanceof FormControl) {
            control.markAsDirty();
            control.markAsTouched();
        } else if (control instanceof FormGroup) {
            validate(control);
        }
    });
}

export {validate}
