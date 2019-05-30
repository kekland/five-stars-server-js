import { Router } from 'express';
import { classToPlain } from 'class-transformer';
import { BadRequestException } from './errors';
import 'reflect-metadata';
import { ControllerRequestMethod, RequestMethod } from './request.methods';

export class Controller {
  router: Router;
}

export function RoutedController() {
  return function _DecoratorName<T extends new(...args: any[]) => {}>(constr: T) {
    return class extends constr {
      constructor(...args: any[]) {
        const meta: ControllerRequestMethod[] = Reflect.getMetadata(`${constr.name}:methods`, constr)
        super(...args)

        const thisAsController = ((this as unknown) as Controller)
        const router = Router();

        meta.forEach((method) => {
          if (method.type === RequestMethod.Get) {
            router.get(method.route, method.function)
          }
          else if (method.type === RequestMethod.Post) {
            router.post(method.route, method.function)
          }
          else if (method.type === RequestMethod.Put) {
            router.put(method.route, method.function)
          }
          else if (method.type === RequestMethod.Delete) {
            router.delete(method.route, method.function)
          }
        });

        ((this as unknown) as Controller).router = router
      }
    }
  }
}
