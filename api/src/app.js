import express from 'express'
import morgan from 'morgan'
import pkg from '../package.json'

import { create_roles } from './libs/initialSetup'
import userRoutes from './routes/user.routes'
import authRoutes from './routes/auth.routes'
import representanteRoutes from './routes/representante.routes'

const app = express()
//create_roles()

app.set('pkg', pkg)
app.use(morgan('dev'))
app.set("json spaces", 4);

app.get('/', (req, res) => {
    res.json({
        name: app.get('pkg').name,
        author: app.get('pkg').author,
        description: app.get('pkg').description,
        version: app.get('pkg').version
    })
})

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/', express.static('src'))

app.get('/register', (req, res) => {
    res.sendFile(__dirname + '/registrarse.html');
});

app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/login.html');
});

app.get('/representante', (req, res) => {
    res.sendFile(__dirname + '/representante.html');
});

app.get('/home', (req, res) => {
    res.sendFile(__dirname + '/home.html');
});
app.use('/users', userRoutes)
app.use('/auth', authRoutes)
app.use('/forms', representanteRoutes)

export default app