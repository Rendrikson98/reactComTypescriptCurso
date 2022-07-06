import { RequiredFieldValidation, EmailValidation } from "@/validation/validators"
import { ValidationBuilder } from "./validation-builder";

describe('ValidationBuilder', ()=>{
  test('should return RequiredFieldValidation', ()=>{
    const validations = ValidationBuilder.field('any_field').required().build();
    expect(validations).toEqual([new RequiredFieldValidation('any_field')])
  })

  test('should return RequiredFieldValidation', ()=>{
    const validations = ValidationBuilder.field('any_field').email().build();
    expect(validations).toEqual([new EmailValidation('any_field')])
  })
})