const errorHandler=(statusCode,message)=>
    {
        const error=new Error() //JAVASCRIPT ERROR CONTRUCTOR
        error.statusCode = statusCode
        error.message=message
        return error;
    }
    
export default errorHandler;