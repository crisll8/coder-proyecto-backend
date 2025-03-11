require('dotenv').config(); 
const mongoose = require('mongoose');
const http = require('http');
const app = require('./src/app'); 
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const cors = require('cors');
require('./src/config/passport'); 

const port = process.env.PORT || 8080;
const server = http.createServer(app);

app.use(cors());
app.use(cookieParser());
app.use(session({
    secret: process.env.SESSION_SECRET || 'supersecreto',
    resave: false,
    saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Conectado a MongoDB'))
.catch(err => console.error('Error conectando a MongoDB:', err));

server.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});
