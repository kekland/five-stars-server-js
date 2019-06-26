import 'reflect-metadata';
import { Cargo } from './models/cargo/cargo.model'
import { DatabaseService } from './database/database.service';
import * as express from 'express'
import { CargoController } from './controllers/cargo.controller';
import bodyParser = require('body-parser');
import { Controller } from './lapis_server/controller';
import { verify } from 'jsonwebtoken';
import { AuthController } from './controllers/auth.controller';
import { UserController } from './controllers/user.controller';
import { VehicleController } from './controllers/vehicle.controller';
import { secretKey } from './secret';
import * as cors from 'cors'
import { AdminController } from './controllers/admin.controller';

const init = async () => {
  // Initialize the database
  DatabaseService.init()
  const app = express()
  app.use(cors())

  // Attach modules
  app.use(bodyParser({ extended: true }))
  app.use((req, res, next) => {
    const auth = req.header('authorization')
    if (auth != null) {
      const parts = auth.split(' ')
      if (parts[0].toLowerCase() === 'bearer') {
        try {
          const payload = verify(parts[1], secretKey);
          (req as any).payload = payload
          next()
        }
        catch (e) {
          res.status(401).send({ message: 'Invalid JWT token' })
        }
      }
      else {
        next()
      }
    }
    else {
      next()
    }
  })

  app.use((req, res, next) => { setTimeout(next, 0) });

  const controllers: Controller[] = [
    new AdminController(),
    new CargoController(),
    new VehicleController(),
    new AuthController(),
    new UserController(),
  ]

  controllers.forEach(controller => {
    app.use(controller.route, controller.router)
  });

  const port = 3008
  app.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log(`Listening on port ${port}`)
  })
}

init()
