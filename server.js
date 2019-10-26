const express = require('express');
const http = require('http');

const app = express();
const server = http.createServer(app).listen(process.env.PORT || 2000,()=>{
    console.log('server start on port:' + server.address().port);
});
app.use('/', express.static('./public'));
app.use((req,res)=>{
    res.status(404).send('404 Not Found');
});