const express = require('express');

const CustomerService = require('../services/customers.service');
const service = new CustomerService();
const validationHandler = require('../middlewares/validator.handler');
const {
  createCustomerSchema,
  getCustomerSchema,
  updateCustomerSchema,
} = require('../schemas/customer.schema');

const router = express.Router();


router.get('/',  async (req, res, next) => {
  try {
    res.json(await service.find());
  } catch (error) {
    next(error);
  }
});
router.get('/:id',
validationHandler(getCustomerSchema,'params'),
async (req, res, next) => {
  try {
    const {id}=req.params;
    res.json(await service.findOne(id));
  } catch (error) {
    next(error);
  }
});

router.post('/',
  validationHandler(createCustomerSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      res.json(await service.create(body));
    } catch (error) {
      next(error);
    }
  }
);

router.patch('/:id',
  validationHandler(getCustomerSchema, 'params'),
  validationHandler(updateCustomerSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      res.json(await service.update(id, body));
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:id',
  validationHandler(getCustomerSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      res.json(await service.delete(id));
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
