require('dotenv').config();
const express = require('express');
const fs = require('fs');
const cors = require('cors');
const path = require('path');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const routes = require('./routes/routes');
const https = require('https');
const {log} = require("mercedlogger");
const { APP_NAME, PORT } = process.env;

const app = express();

app.set('trust proxy', true);
app.use(helmet());
app.use(cors());
app.use(compression());
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(routes);

// catch 404 and forward to error handler
app.get('*', (_req, res) => {
    res.status(404).json({ success: false, code: 404, message: 'Route Not Found.', data: {} });
  });

const httpsOptions = {
    key: fs.readFileSync(path.join(__dirname, '../assets/cert/localhost.key')),
    cert: fs.readFileSync(path.join(__dirname, '../assets/cert/localhost.crt'))
  };

const port = PORT || 8060;

// const server = app.listen(port);
const server = https.createServer(httpsOptions, app).listen(port, 
    ()=>log.green((`${APP_NAME}`), `Online on port ${APP_NAME}`));
  
  
module.exports = { app, server };