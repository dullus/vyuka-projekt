let express = require('express');
let serveStatic = require('serve-static');
let bodyParser = require('body-parser');
let restfulRouter = require('restful-router');

const app = express();

// static html
app.use(serveStatic(`${__dirname}/web`));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));
// parse application/json
app.use(bodyParser.json());

/** GET test **/
app.get('/hello', (req, res) => {
    console.log('hello');
    res.send('hello world');
});

/** POST picture upload **/
let picture = require('./controllers/picture');
app.post('/api/picture', picture.upload, picture.save);

/** REST for address **/
let address = require('./controllers/address');
restfulRouter({
    app,
    name: 'api/address',
    controller: address
});

/** run the thing **/
app.listen(3000);
console.log('Server running. Browse to http://localhost:3000');
