class ErrorHandler extends Error {
    public statusCode: number

    constructor(statusCode: number, message: string) {
        super()
        this.statusCode = statusCode
        this.message = message
    }
}

class NotFound extends ErrorHandler {
    constructor(message: string) {
        super(404, message)
    }
}

export { ErrorHandler, NotFound }
