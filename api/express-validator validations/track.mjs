import expressValidator from 'express-validator';


var trackValidator = [
expressValidator.check('Title','Track tittle cannot be empty').isLength({min:1}),
expressValidator.check('AlbumId','AlbumId must be a number').isNumeric(),
expressValidator.check('Duration','Duration must be a number').isNumeric(),
expressValidator.check('ArtistId','ArtistId must be a number').isNumeric(),
expressValidator.check('Url','Invalid Url').isURL()
]




export  {trackValidator}