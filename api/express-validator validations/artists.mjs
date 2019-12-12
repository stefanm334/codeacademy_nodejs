import expressValidator from 'express-validator';


var artistValidator = [
expressValidator.check('Name','Name field cannot be empty').isLength({min:1}),
expressValidator.check('Country','You must enter country!!').isLength({min:1}),
expressValidator.check('Age','Age must be a number').isNumeric()
]




export  {artistValidator}