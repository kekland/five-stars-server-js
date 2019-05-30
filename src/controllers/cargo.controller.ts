import { Controller } from './controller';
import { DatabaseService } from '../database/database.service';

export class CargoController extends Controller {
  constructor() {
    super()
    this.getAll()
  }

  getAll = () => {
    // tslint:disable-next-line:no-console
    console.log('Attaching method getAll')
    this.router.get('/', async (req, res) => {
      const data = await DatabaseService.cargoStore.get().run()
      res.send(data)
    })
  }

}
