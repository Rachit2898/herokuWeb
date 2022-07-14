class ErrorHander extends Error{
    constructor(message,statusCode){
        super(message, statusCode);
        this.statusCode = statusCode
        

        Error.captureStackTrace(this,this.constructor);
        

    }
    
}
module.exports = ErrorHander;