const mongoose = require('mongoose');

const url = process.env.URL

mongoose.connect(url
, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
}).then(() =>{
    console.log("Connected")
}).catch(err =>{
    console.log(err)
})