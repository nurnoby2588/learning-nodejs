const express = require('express');
const { createShortUrl, getRedirectUrl, handleAnaliticsUrl } = require('../controller/urlController');

const urlRouter = express.Router();
urlRouter.post('/',createShortUrl)
urlRouter.get('/:shortId',getRedirectUrl)
urlRouter.get('/analytics/:shortId',handleAnaliticsUrl)

module.exports = urlRouter