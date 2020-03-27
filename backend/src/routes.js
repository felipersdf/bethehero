const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');

const SessionController = require('./controllers/SessionController');
const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');

const routes = express.Router();

routes.post('/sessions', celebrate({
   [Segments.BODY]: Joi.object().keys({
      id: Joi.string().required().length(8),
   }),
}),SessionController.store);

routes.get('/ongs', OngController.index);

routes.post('/ongs', celebrate({
   [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().required().email(),
      whatsapp: Joi.string().required().min(11).max(13),
      city: Joi.string().required(),
      uf: Joi.string().required().length(2),
   }),
}), OngController.store);

routes.get('/profile', celebrate({
   [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required(),
   }).unknown(),
}) ,ProfileController.index);

routes.get('/incidents', celebrate({
   [Segments.QUERY]: Joi.object().keys({
      page: Joi.number(),
   }),
}),IncidentController.index);

routes.post('/incidents', celebrate({
   [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required(),
   }).unknown(),
   [Segments.BODY]: Joi.object().keys({
      title: Joi.string().required(),
      description: Joi.string(),
      value: Joi.number(),
   }),
}), IncidentController.store);

routes.delete('/incidents/:id', celebrate({
   [Segments.PARAMS]: Joi.object().keys({
      id: Joi.number().required(),
   }),
}) ,IncidentController.destroy);

module.exports = routes;