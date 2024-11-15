import { body } from "express-validator";

const orderRules = [
  body('*.order_date').exists().withMessage('Date is required').matches(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/).withMessage("This is not a valid date"),
  body('*.total_price').exists().withMessage('Price is required').isDecimal().withMessage("This is not a valid price").isFloat({ min: 0.01 }).withMessage("The price must be greater than 0"),
  body('*.status').exists().withMessage('Status is required').matches(/^(in process|ready|picked up|cancelled)$/).withMessage("The status must be one of the following options: in process, ready, picked up, cancelled."),
  body('*.reservation').optional().matches(/^(true|false)$/).withMessage("This is not a valid boolean value."),
  body('*.pickup_date').optional().matches(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/).withMessage("This is not a valid date")
];

export default orderRules;