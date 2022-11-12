const mongoose = require('mongoose');    // mongoose 연결
const autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);

const boardSchema = mongoose.Schema( {    // 스키마 세팅
  id:  {
    type: Number,
    default: 0  
    
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
  memo: {
    type: String,
    default : ""

  },
  tag: {
    type: String,

  }
})

boardSchema.plugin(autoIncrement.plugin, {
  model: 'Board',
  field: 'id',
  startAt: 1, //시작
  increment: 1 // 증가
});

const Board = mongoose.model('Board', boardSchema)
module.exports = { Board }