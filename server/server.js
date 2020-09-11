require('./config/config');

const express = require('express')
const app = express()
const bodyParser = require('body-parser')


//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
    // parse application/json
app.use(bodyParser.json())


app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

// Configuracion global de rutas
app.use(require('./routes/index'));


app.listen(process.env.PORT, () => {
    console.log('Escuchando puertos ', process.env.PORT)
});