import express from 'express'
import {default as orderRouter} from './orderRoutes.js'

const router = express.Router()

router.use('/', orderRouter)

export default router