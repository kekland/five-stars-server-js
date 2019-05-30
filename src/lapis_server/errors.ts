export class BadRequestException {
  static code: number = 400
  message: any

  constructor(message: any) {
    this.message = message
  }
}
