const mongoose = require('mongoose');    // mongoose 연결
const autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);

const noticeSchema = mongoose.Schema( {    // 스키마 세팅
  writer: {
    type: String,

  },
  date: { 
    type: String,

  },
  title: { 
    type: String,

  },
  content: { 
    type: String,

  }
})

//id값 자동 상승 게시물 구분
noticeSchema.plugin(autoIncrement.plugin, {
  model: 'Notice',
  field: '_id',
  startAt: 1, //시작
  increment: 1 // 증가
});

const Notice = mongoose.model('Notice', noticeSchema)
module.exports = { Notice }

