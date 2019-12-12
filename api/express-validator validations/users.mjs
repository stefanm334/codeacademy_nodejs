import expressValidator from 'express-validator';


var userValidator = [
    expressValidator.check('Name', 'Name field cannot be empty').isLength({ min: 1 }),
    expressValidator.check('Name', 'Name must be longer than 4 characters').isLength({ min: 4 }),
    expressValidator.check('Surname', 'Surname field cannot be empty').isLength({ min: 1 }),
    expressValidator.check('Surname', 'Surname must be longer than 4 characters').isLength({ min: 4 }),
    expressValidator.check('Email', 'Invalid E-Mail!!').isEmail(),
    expressValidator.check('Password', 'Password must be longer than 6 characters').isLength({ min: 6 }),
    expressValidator.check('Password', 'Password cannot be empty').isLength({ min: 6 })
]


var loginValidator = [
    expressValidator.check('Email', 'Invalid E-Mail!!').isEmail(),
    expressValidator.check('Email', 'You must enter email').isLength({ min: 1 }),
    expressValidator.check('Password', 'Password must be longer than 6 characters').isLength({ min: 6 }),
    expressValidator.check('Password', 'Password cannot be empty').isLength({ min: 6 })
]



export { userValidator,loginValidator }