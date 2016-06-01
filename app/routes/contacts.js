'use strict';

const express = require('express');
const router = express.Router();
const contactCtrl = require('../controllers/contact');
const auth = require('../middlewares/authentication');
const response = require('../helpers/response');

router.post('/contacts', auth.ensured, contactCtrl.saveContact);
router.get('/contacts', auth.ensured, contactCtrl.getAllContacts, response.toJSON('contacts'));
router.get('/contacts/:contactId', auth.ensured, contactCtrl.findById, response.toJSON('contact'));
router.put('/contacts/:contactId', auth.ensured, contactCtrl.findById, contactCtrl.update, response.toJSON('contact'));
router.delete('/contacts/:contactId', auth.ensured, contactCtrl.delete);

module.exports = router;
