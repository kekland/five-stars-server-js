import { Controller } from '../lapis_server/controller';
import { DatabaseService } from '../database/database.service';

export class CargoController extends Controller {
  constructor() {
    super()
    this.get()
  }

  get = () => {
    this.router.get('/', async (req, res) => {
      const data = await DatabaseService.cargoStore.get().run()
      res.send(data)
    })
  }

  create = () => {
    /*this.router.post('/', async (req, res) => {

    })*/
  }
}
