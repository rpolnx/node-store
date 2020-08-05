import { app } from './app'

const PORT = process.env.PORT || 5000

const initialize = async () => {
    app.listen(PORT, () => {
        console.log(`Application started at port ${PORT}`)
    })
}

initialize()
