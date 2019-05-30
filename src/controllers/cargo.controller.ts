import { Controller } from '../lapis_server/controller';
import { DatabaseService } from '../database/database.service';

export class CargoController extends Controller {
  constructor() {
    super()
    this.getAll()
  }

  getAll = () => {
    this.router.get('/', async (req, res) => {
      const data = await DatabaseService.cargoStore.get().run()
      res.send(data)
    })
  }

}
