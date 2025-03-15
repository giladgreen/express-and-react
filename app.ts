import * as express from 'express';
import * as path from 'path';

const router = express.Router({ mergeParams: true });
const SERVER_PORT = process.env.PORT || 3000;
const app = express();


const PUBLIC = path.join(__dirname, 'public');

app.use(express.static(PUBLIC));

app.disable('x-powered-by');
app.enable('trust proxy'); // only if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)

app.use((_req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Access-Control-Expose-Headers', '*');
  next();
});


app.use('/api/', router);


// router.use('', gamesRoutes);


app.listen(SERVER_PORT, () => {
  console.log('### startListening ##');
  console.log(`Node app is running on port:  ${SERVER_PORT}`);
});

module.exports = {
  server: app,
};
