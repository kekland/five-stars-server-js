import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { BadRequestException } from './errors';

export class ValidationService {
  static validate = async (data) => {
    return await validate(data, { validationError: { target: false, value: false }, forbidUnknownValues: true })
  }

  static transformAndValidate = async<T> (data: any, type: () => any) => {
    const transformedData = plainToClass(type(), data)
    const errors = await ValidationService.validate(transformedData)
    if (errors.length > 0) {
      throw new BadRequestException(errors)
    }

    return (transformedData as unknown) as T
  }
}
