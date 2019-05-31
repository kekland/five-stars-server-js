export class BadRequestException {
  static code: number = 400
  message: any

  constructor(message: any) {
    this.message = message
  }
}

export class UnauthorizedException {
  static code: number = 401;
  message: any;

  constructor(message: any) {
    this.message = message
  }
}
