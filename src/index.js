const express = require('express');
const morgan  = require('morgan');
const server = http.createServer(express);
const exhbs   = require('express-handlebars');
const path    = require('path');
const io = socketio.listen(server);
const { database } = require('./keys');

// Inicializacion
const app = express();


//settings
app.set('port', process.env.PORT || 6646);

app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exhbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partial'),
    extname: '.hbs',
}));
app.set('view engine', '.hbs');

// middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));

// routes
app.use('/STAR',require('./route/crud'));

// Public 
app.use(express.static(path.join(__dirname, 'public')));

// inicio del servidor 
app.listen(app.get('port'), () => {
    console.log('server on port: ', app.get('port'));
});

require('sockets')(io);