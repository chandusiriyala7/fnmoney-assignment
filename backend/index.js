const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3')
const app = express();


app.use(express.json())
app.listen(8081 , () =>{
    console.log("Port is running on http://localhost:8081")
})