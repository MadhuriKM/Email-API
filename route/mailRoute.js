const route = require('express').Router()
const { sendEmail, readEmail, deleteEmail } = require('../controller/mailCtrl')

// send mail
route.post(`/send`, sendEmail)

// read an emails
route.get(`/all`, readEmail)

// delete an email
route.delete(`/delete/:id`, deleteEmail)

module.exports = route