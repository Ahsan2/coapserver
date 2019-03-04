const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
let coap        = require('coap')
let server      = coap.createServer()

// Init App
const app = express();

// Load View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Body Parser Middleware
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// Set Public Folder
app.use(express.static(path.join(__dirname, 'public')));

// Express Messages Middleware
app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

let pir1 = false, pir2 = false;

app.get('/', function(req, res){
  res.render('index', {pir1, pir2});
})

app.get('/update', function(req, res){
  res.json({pir1, pir2});
})

// Start Server
const port = process.env.PORT || 8080;
app.listen(port, function(){
  console.log(`Server started on port ${port}...`);
});

server.on('request', function(req, res) {
  let resource = req.url.split('/')[1]
  if (resource == 'pir1') {
    if (req.payload.toString('utf8') == "0")
      pir1 = false
    if (req.payload.toString('utf8') == "1")
      pir1 = true
  }

  if (resource == 'pir2') {
    if (req.payload.toString('utf8') == "0")
      pir2 = false
    if (req.payload.toString('utf8') == "1")
      pir2 = true
  }

  // console.log(req.payload.toString('utf8'))
  res.end('Hello ' + req.url.split('/')[1] + '\n')
})
 
// the default CoAP port is 5683
server.listen(5683, null,function() {
//   var req = coap.request('coap://localhost/Matteo')
 
//   req.on('response', function(res) {
//     res.pipe(process.stdout)
//     res.on('end', function() {
//       process.exit(0)
//     })
//   })
 
//   req.end()
    console.log('listening...')
})