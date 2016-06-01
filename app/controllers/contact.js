'use strict';

const _ = require('lodash');
const mongoose = require('mongoose');
const Contact = mongoose.model('Contact');
const ObjectId = mongoose.Types.ObjectId;

module.exports.saveContact = saveContact;
module.exports.getAllContacts = getAllContacts;
module.exports.findById = findContactById;
module.exports.update = updateContact;
module.exports.delete = deleteContact;

function saveContact(req, res, next) {
    let contact = new Contact(req.body);
    contact.user =req.user;

    contact.save((err, contact) => {
        if (err) {
            return next(err);
        }
        res.status(201).json(contact);
    });
}

function getAllContacts(req, res, next) {
  Contact.find((err, contacts) => {
    if (err) {
      return next(err);
    }

    req.resources.contacts = contacts;
    next();
  });
};

function findContactById(req, res, next) {
  if (!ObjectId.isValid(req.params.contactId)) {
    return res.status(404).json({ message: '404 not found.'});
  }

  Contact.findById(req.params.contactId, (err, contact) => {
    if (err) {
      next(err);
    } else if (contact) {
      req.resources.contact = contact;
      next();
    } else {
      next(new Error('failed to find contact'));
    }
  });
};

function deleteContact(req, res, next) {
  Contact.findById(req.params.contactId, (err, contact) => {
    if (err) {
      next(err);
    } else if (contact) {
      contact.remove((err) => {
          if (err) {
            return next(err);
          }
          res.status(204).json();
      });
      next();
    } else {
      next(new Error('failed to find contact'));
    }
  });
};

function updateContact(req, res, next) {
  let contact = req.resources.contact;
  _.assign(contact, req.body);

  contact.save((err, updatedContact) => {
    if (err) {
      return next(err);
    }

    req.resources.contact = updatedContact;
    next();
  });
};
