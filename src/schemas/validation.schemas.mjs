import { body } from 'express-validator';

const subscribctionSchema = [
  body('id').isNumeric(),
  body('email').isEmail().withMessage('Incorrect email')
];

export { subscribctionSchema };
