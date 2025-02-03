const express = require('express');
const path = require('path');
const { engine } = require('express-handlebars');
const dotenv = require('dotenv');

const viewsRouter = require('./routes/views'); // Importar views.js

const app = express();
dotenv.config();

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, '../views'));

app.use(express.static(path.join(__dirname, '../public')));

app.use('/', viewsRouter); // Usar el router de vistas

module.exports = app;
