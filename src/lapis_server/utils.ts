import { validate } from 'class-validator';

export class ValidationService {
  static validate = async (data) => {
    return await validate(data, { validationError: { target: false, value: false }, forbidUnknownValues: true })
  }
}
