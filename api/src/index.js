import app from './app'
import config from "./config"
import './db'

app.listen(config.PORT)
console.log('Server listen on port ', config.PORT)