import { Cargo } from './models/cargo'
import { DatabaseService } from './database/database.service';

const init = async () => {
  // Initialize the database
  DatabaseService.init()
}

init()
