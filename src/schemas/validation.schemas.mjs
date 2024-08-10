import { body } from 'express-validator';

const subscribctionSchema = [
  body('email').isEmail().withMessage('Incorrect email')
];

export { subscribctionSchema };
