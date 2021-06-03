const express = require('express')
const app = express()
const Dealer = require ('./Routes/dealer')
const Connection = require('./Routes/connectionrequest')
// const bodyParser = require('body-parser');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

require("./initDB")

// For Support Cross Origin Request
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin","*"); // '*' for any
    res.header("Access-Control-Allow-Credentials", true);
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
  
    if (req.method === "OPTIONS") {
      res.header("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE");
      return res.status(200).json({});
    }
  
    next();
  });
  
app.use('/dealer',Dealer)
app.use('/connection',Connection)




app.listen(3001,()=>{

    console.log("api running on 3001");

})