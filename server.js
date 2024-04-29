var express = require("express")
var app = express()
require('./dbConnection');
const router = require("./routers/router");

const http = require('http').createServer(app);
const io = require('socket.io')(http);

io.on('connection', (socket) => {
    console.log('a user connected'); 
    socket.on('disconnect', () => {
      console.log('user disconnected'); 
    });
    setInterval(()=>{
      socket.emit('number', parseInt(Math.random()*10));
    }, 1000); 
});

var port = process.env.port || 3000;

app.use(express.static(__dirname + '/public'))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/cat', router)

app.get('/', (req, res) => {
    res.render('index.html');
});
http.listen(port, () => {
    console.log('express server started');
});
