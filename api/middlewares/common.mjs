var logger = (req, res, next) => {
    console.log(`Logged ${req.url} - ${req.method} --- ${new Date()}`);
    next();
};

var wrongRoute = (req, res, next) => {
    var error = new Error("Not found. Please try with another route!");
    error.status = 404;
    next(error);
};

var errorHandler = (err, req, res, next) => {
    var errorObj = {
        status: err.status,
        error: {
            message: err.message
        }
    };

    res.status(err.status).json(errorObj);
}

export default {logger , wrongRoute ,errorHandler}