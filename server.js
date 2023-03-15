import * as dotenv from 'dotenv'
dotenv.config()

// import { Sequelize } from 'sequelize'
// const sequelize = new Sequelize('sqlite::memory:')

import express from 'express'
const app = express()
const port = 5050

import router from './controllers/index.js'

// Middleware
app.use(express.json())

// Further Authentication Here
function isAuth(req, res, next) {
    const auth = req.headers.authorization;
    if (auth === process.env.API_KEY) {
      next();
    } else {
      res.status(401);
      res.send('Access forbidden');
    }
}

app.use(router)

// // Routes
// app.get('/', (req, res) => {
//     res.send('Works')
// })

// app.post('/order', isAuth,(req, res) => {
//     axios.post('http://localhost:5051/sort', req.body.items)
//     .then((results) => {
//         res.send(results.data);
//     })
//     .catch((err) => {
//         res.send(err)
//     })
// })

// Listener
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})