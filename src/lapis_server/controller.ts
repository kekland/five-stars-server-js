import { Router } from 'express';

export class Controller {
  router: Router;

  constructor() {
    this.router = Router()
  }
}
