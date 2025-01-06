import express from 'express';
import { engine } from 'express-handlebars';
import path from 'path';

import { serverInit } from './services/serverInit.js';


import router from './routes/routes.js'
import { errorHandler } from './middlewares/errorHandlers.js';

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.static(path.join(process.cwd(), 'public')));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('hbs', engine({ 
    extname: '.hbs',
    layoutsDir: path.join(process.cwd(), 'src','views', 'layouts'),
    defaultLayout: 'main',
    partialsDir: path.join(process.cwd(), 'src', 'views', 'partials')
}));


app.set('views', path.join(process.cwd(), 'src','views'));
app.set('view engine', '.hbs');

// cwd: current working directory

app.use('/api/v1', router);

app.use(errorHandler);

app.get('/', (req, res) => {
    res.render('pages/home');
})


serverInit(app, PORT)