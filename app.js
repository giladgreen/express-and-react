"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var path = require("path");
var router = express.Router({ mergeParams: true });
var SERVER_PORT = process.env.PORT || 3000;
var app = express();
var PUBLIC = path.join(__dirname, 'public');
app.use(express.static(PUBLIC));
app.disable('x-powered-by');
app.enable('trust proxy'); // only if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
app.use(function (_req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Access-Control-Expose-Headers', '*');
    next();
});
app.use('/api/', router);
var taskRoutes = express.Router({ mergeParams: true });
taskRoutes.get('/', function (_req, res) {
    res.json({ message: 'Hello World' });
});
router.use('', taskRoutes);
app.listen(SERVER_PORT, function () {
    console.log('### startListening ##');
    console.log("Node app is running on port:  ".concat(SERVER_PORT));
});
module.exports = {
    server: app,
};
