var coap        = require('coap')
  , server      = coap.createServer()
 
const PORT = process.env.PORT || 5683;

server.on('request', function(req, res) {
  res.end('Hello ' + req.url.split('/')[1] + '\n')
})
 
// the default CoAP port is 5683
server.listen(PORT, function() {
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