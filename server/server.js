import express from 'express';
import path from 'path';
import open from 'open';
import webpack from 'webpack';
import config from '../webpack.config.dev';
import bodyParser from 'body-parser';
import appConfig from '../config.json';
import mongoose from 'mongoose';

import locationController from './locationController';
import userController from './userController';

const MLAB_URI = `mongodb://${appConfig.mongodb.user}:${appConfig.mongodb.password}@ds163781.mlab.com:63781/geo-tagger`; 

mongoose.connect(MLAB_URI);
mongoose.connection.once('open', () => { 
	console.log('Connected to mLab Database'); 
});

const port = 3000;
const app = express();
const compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '../src/index.html'));
});

app.post('/signup', userController.createUser);
app.post('/login', 	userController.verifyUser);

app.get('/getResults', locationController.getLocations);
app.post('/addLocation', locationController.addLocation);


app.listen(port, function (error) {
  if(error) {    
    console.log(error);
  } else {
    open(`http://localhost:${port}`)
  }
});