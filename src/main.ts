import { Cargo } from './models/cargo.model'
import { DatabaseService } from './database/database.service';
import * as express from 'express'
import { CargoController } from './controllers/cargo.controller';
import bodyParser = require('body-parser');
import { Controller } from './lapis_server/controller';

const init = async () => {
  // Initialize the database
  DatabaseService.init()
  const app = express()

  // Attach modules
  app.use(bodyParser({ extended: true }))

  const controllers: Controller[] = [
    new CargoController(),
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
