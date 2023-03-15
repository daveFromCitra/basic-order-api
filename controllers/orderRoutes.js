import express from 'express'
// import { Item, Order } from '../models/index.js'

import Order  from '../models/Order.js'



const router = express.Router()

router.get('/orders', (req, res) => {
    Order.findAll({
    })
    .then((allOrders) => res.json(allOrders))
    .catch((err) => res.json(err))
})

router.post('/order', (req, res) => {
    Order.create({
        sourceId: req.body.sourceId,
        account: req.body.account
    })
    .then((newOrder) => res.json(newOrder))
    .catch((err) => res.status(500).json(err))
})

export default router;