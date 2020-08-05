import { Router } from 'express'

const userRouter = Router()

userRouter.get('/', async (request, response) => {
    // TODO
    return response.status(200).json([{}])
})

userRouter.get('/:id', async (request, response) => {
    // TODO
    return response.status(200).json({})
})

userRouter.post('/', async (request, response) => {
    // TODO
    return response.status(201).json()
})

userRouter.put('/:id', async (request, response) => {
    // TODO
    return response.status(204).json()
})

userRouter.delete('/:id', async (request, response) => {
    // TODO
    return response.status(204).json()
})

export { userRouter }
