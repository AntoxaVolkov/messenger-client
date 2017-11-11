import electron from 'electron'
import { Application } from 'spectron'



export default {
  afterEach () {
    this.timeout(10000)
      console.log(this.app, this.app.isRunning());
    if (this.app && this.app.isRunning()) {
      return this.app.stop()
    }
  },
  beforeEach () {
    this.timeout(50000)
    this.app = new Application({
      path: electron,
      args: ['dist/electron/main.js'],
      startTimeout: 30000,
      waitTimeout: 60000
    })

    return this.app.start()
  }
}
