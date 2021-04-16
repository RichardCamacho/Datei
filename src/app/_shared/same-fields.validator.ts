import { FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms"

export const sameFields: ValidatorFn = (
  control: FormGroup
): ValidationErrors | null => {
  const password = control.get("password")
  const confirmarPassword = control.get("repPassword")

  return password.value === confirmarPassword.value
    ? null
    : { noSonIguales: true }
}