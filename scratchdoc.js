import axios from 'axios'
import * as dotenv from 'dotenv'
dotenv.config()

import { Sequelize } from 'sequelize'
const sequelize = new Sequelize('sqlite::memory:')

const Order = sequelize.define('Order', {
    id: {
        type: DataTypes
    }
})

import express from 'express'

const app = express()
const app2 = express()

const port = 5050
const port2 = 5051
import { Sequelize, Model, DataTypes } from 'sequelize'
const sequelize = new Sequelize(process.env.DATABASE_URL)

// Middleware
app.use(express.json())
app2.use(express.json())

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

// Routes
app.get('/', (req, res) => {
    res.send('Works')
})

app.post('/order', isAuth,(req, res) => {
    axios.post('http://localhost:5051/sort', req.body.items)
    .then((results) => {
        res.send(results.data);
    })
    .catch((err) => {
        res.send(err)
    })
})



// app2.post('/sort', (req, res) => {
//     // res.send(req.body)
//     res.send(orderSort(req.body))
// })

// app2.post('/print', (req, res) => {
//     // res.send(req.body)
//     res.send(orderSort(req.body))
// })

// app2.post('/track', (req, res) => {
//     // res.send(req.body)
//     res.send(orderSort(req.body))
// })

// Listener
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})

// app2.listen(port2, () => {
//     console.log(`Also listening on port ${port2}`);
// })

// function orderSort(unsortedArray) {
//     let sortedArray = unsortedArray.sort((a,b) => {
//         if ( a.shipTo.postcode.toLowerCase() < b.shipTo.postcode.toLowerCase() ) {
//             return -1
//         }
//         if ( a.shipTo.postcode.toLowerCase() > b.shipTo.postcode.toLowerCase() ) {
//             return 1
//         }
//         return 0;
//     })
//     return sortedArray
// }
