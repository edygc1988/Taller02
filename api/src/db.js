import mongoose from "mongoose"
import config from "./config"

mongoose.set('strictQuery', false)

mongoose.connect(config.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then((data) => console.log('DB se encuentra conectada.'))
    .catch((error) => console.log(error))