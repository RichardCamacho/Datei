import { FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms"

//verifica que los dos campos de contraseña sean iguales
export const sameFields: ValidatorFn = (
  control: FormGroup
): ValidationErrors | null => {
  const password = control.get("password")
  const confirmarPassword = control.get("repPassword")

  return password.value === confirmarPassword.value
    ? null
    : { noSonIguales: true }
}