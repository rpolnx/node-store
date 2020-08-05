import express from 'express'

const morgan = require('morgan')

import { router } from './routes'
import { handleError } from './config/error.handler'

const app = express()

app.use(express.json())
app.use(morgan('short'))
app.use(router)

// app.use((err, req, res, next) => {
//     // Do logging and user-friendly error message display
//     console.log('Route does not exist')
//     res.status(500).send({status:500, message: 'internal error',type:'internal'}); 
//  })

export { app }
