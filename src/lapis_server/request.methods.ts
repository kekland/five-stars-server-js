import { BadRequestException } from './errors';
import { classToPlain } from 'class-transformer';

export enum RequestMethod {
  Get,
  Post,
  Put,
  Delete,
}

export interface ControllerRequestMethod {
  type: RequestMethod;
  route: string;
  function: any;
}

const requestMethod = async (fn, req, res) => {
  try {
    const data = await fn(req)
    return res.status(200).send(classToPlain(data))
  }
  catch (e) {
    if (e instanceof BadRequestException) {
      res.status(BadRequestException.code).send(e.message)
    }
    else {
      console.log(`[500] ${e.message}`)
      res.status(500).send({message: e.message})
    }
  }
}

const defineMetadata = (method: RequestMethod, route: string, target, descriptor: PropertyDescriptor) => {
  const metadata = {
    type: method,
    function: async (req, res) => requestMethod(descriptor.value, req, res),
    route,
  } as ControllerRequestMethod;
  if (Reflect.hasMetadata(`${target.constructor.name}:methods`, target.constructor)) {
    const values: ControllerRequestMethod[] = Reflect.getMetadata(`${target.constructor.name}:methods`, target.constructor);
    values.push(metadata);
    Reflect.defineMetadata(`${target.constructor.name}:methods`, values, target.constructor);
  }
  else {
    Reflect.defineMetadata(`${target.constructor.name}:methods`, [metadata], target.constructor);
  }
}

export function Get(route: string = '/') {
  // tslint:disable-next-line:only-arrow-functions
  return function(target, key: string, descriptor: PropertyDescriptor) {
    // tslint:disable-next-line:no-console
    console.log(`Registered method [GET] on route ${route} in ${target.constructor.name}`);
    defineMetadata(RequestMethod.Get, route, target, descriptor);
  }
}

export function Post(route: string = '/') {
  // tslint:disable-next-line:only-arrow-functions
  return function(target, key: string, descriptor: PropertyDescriptor) {
    // tslint:disable-next-line:no-console
    console.log(`Registered method [POST] on route ${route} in ${target.constructor.name}`);
    defineMetadata(RequestMethod.Post, route, target, descriptor);
  }
}

export function Put(route: string = '/') {
  // tslint:disable-next-line:only-arrow-functions
  return function(target, key: string, descriptor: PropertyDescriptor) {
    // tslint:disable-next-line:no-console
    console.log(`Registered method [PUT] on route ${route} in ${target.constructor.name}`);
    defineMetadata(RequestMethod.Put, route, target, descriptor);
  }
}

export function Delete(route: string = '/') {
  // tslint:disable-next-line:only-arrow-functions
  return function(target, key: string, descriptor: PropertyDescriptor) {
    // tslint:disable-next-line:no-console
    console.log(`Registered method [DELETE] on route ${route} in ${target.constructor.name}`);
    defineMetadata(RequestMethod.Delete, route, target, descriptor);
  }
}
