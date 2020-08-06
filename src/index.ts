import dotenv from 'dotenv'

dotenv.config({ path: process.env.ENV || '.env' })

const PORT = process.env.PORT

import { app } from './app'
import { createConnection } from './config/database.config'

const initialize = async () => {
    await createConnection()
    app.listen(PORT, () => {
        console.log(`Application started at port ${PORT}`)
    })
}

initialize()
