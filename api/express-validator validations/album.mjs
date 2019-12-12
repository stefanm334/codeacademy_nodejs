import expressValidator from 'express-validator';


var albumValidator = [
    expressValidator.check('Title', 'Track tittle cannot be empty').isLength({ min: 1 }),
    expressValidator.check('ReleaseYear', 'Invalid Release Year Value').isNumeric(),
    expressValidator.check('ArtistId', 'ArtistId must be a number').isNumeric(),
    expressValidator.check('Genre', 'Genre cannot be empty').isLength({ min: 1 })

]

var albumParameterValidator = [
    expressValidator.param('albumid', 'Album ID parameter cant be 0').isInt([{ min: 1 }])
]


export { albumValidator ,albumParameterValidator}