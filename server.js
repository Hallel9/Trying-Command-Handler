const express = require("express");
const server = express();
const port = 8000;

server.get('/', (req, res) => res.send('Working!'));

function keepAlive(){
    server.listen(2000, ()=>{console.log("Server is Ready!")});
}

module.exports = keepAlive