import * as dotenv from 'dotenv'
dotenv.config()

import { Sequelize } from 'sequelize'

// const sequelize = new Sequelize(process.env.DATABASE_URL)
const sequelize = new Sequelize('sqlite::memory:')


try {
    await sequelize.authenticate()
    console.log('Connected!!!')
} catch (error) {
    console.error(error)
}
