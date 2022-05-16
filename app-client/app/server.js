// pego o modulo express na variável express
var http = require('http');
const path = require('path');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const config = require('config');

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());

var distDir = '../build';

app.use(express.static(path.join(__dirname, distDir)));
app.use(/^((?!(api)).)*/, (req, res) => {
    res.sendFile(path.join(__dirname, distDir + '/index.html'));
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
    const err = new httpError(404);
    return next(err);
});

// error handler, send stacktrace only during development
app.use((err, req, res, next) => {
    // customize Joi validation errors
    if (err.isJoi) {
        err.message = err.details.map(e => e.message).join('; ');
        err.status = 400;
    }

    res.status(err.status || 500).json({
        message: err.message
    });
    next(err);
});

var server = http.createServer(app);

server.listen(config.get('server.port'));