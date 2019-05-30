import { Cargo } from './models/cargo'
import { DatabaseService } from './database/database.service';
import * as express from 'express'

const init = async () => {
  // Initialize the database
  DatabaseService.init()
  const app = express()

  // Attach modules
  // ...

  app.listen(3008, () => {
    // tslint:disable-next-line:no-console
    console.log(`Listening on port ${3008}`)
  })
}

init()
