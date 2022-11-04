const mongoose = require('mongoose');    // mongoose 연결

const boardSchema = mongoose.Schema( {    // 스키마 세팅
  id:  {
    type: String,  
    
  },
  name: {
    type: String,

  },
  date: { 
    type: String,

  },
  time: {
    type: String,

  },
  todo: {
    type: String,

  },
  tag: {
    type: String,

  }
})

const Board = mongoose.model('Board', boardSchema)
module.exports = { Board }