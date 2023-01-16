const mongoose = require("mongoose");

const  connection=async()=>{

  await  mongoose.connect('mongodb://127.0.0.1:27017/assignment')
    .then(() => console.log('Connected to database'));
}

module.exports = connection