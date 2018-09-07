const express    = require('express');
const app        = express();
const bodyParser = require('body-parser');
const mongoose   = require('mongoose');
const expressValidator = require('express-validator');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(expressValidator())

const port = process.env.PORT || 8080;

// Routes
app.use('/', require('./routes/auth.js'));
app.use('/admin', require('./routes/admin.js'));
app.use('/user', require('./routes/user.js'));
app.use('/open', require('./routes/open.js'));
app.use('/book', require('./routes/book.js'));

// I have put static connection string of mongoDb 
// We can make makeConnectionString() for development, Production, Staging
mongoose.connect('mongodb://localhost:27017/mynodetest', { useNewUrlParser: true });

// Error handling if Endpoind not found 
app.use(function(req, res, next) {
	let err = new Error('Not Found');
	err.status = 404;
	res.status(404).json({ Error : "Endpoint not found"});
});

app.listen(port);
console.log('Magic happens on port ' + port);
