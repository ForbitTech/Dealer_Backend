const mongoose = require ('mongoose')

mongoose.connect('mongodb://localhost:27017/gsm',{ useNewUrlParser: true , useUnifiedTopology: true , useFindAndModify:false})
.then(() =>{
    // console.log("db connected");
})
.catch( e => { console.error(e) })