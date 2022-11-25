const mongoose = require('mongoose');    // mongoose 연결
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema( {    // 스키마 세팅
  
  userId:  {
    type: String,  
    maxlength: 50,
    unique: 1
  },
  password: {
    type: String,
    minlength: 5
  },
  username: {
    type: String,
    maxlength: 50
  },
  gender: {                 // 0 = 남, 1 = 여
    type: Number, 
    default: 0
  },
  email: {
    type: String,
    trim: true               // 공백 제거
  },
  phone: {
    type: String
  },
  token: {
    type:String
  },
  tokenExp: {
    type: Number
  },
  admin: {
    type: Number,
    default: 0
  }

})

userSchema.pre('save', function(next) {
  //비밀번호 암호화
  var user = this;
  // 암호화 코드
  if(user.isModified('password')) {  // pw변경시에만 해쉬값 넣도록
    bcrypt.genSalt(saltRounds, function(err, salt) {
      if(err) return next(err) //에러나오면 index로
        bcrypt.hash(user.password, salt, function(err, hash) {
          // Store hash in your password DB.
          if(err) return next(err)
            user.password = hash
            next()  // hash값 저장했으면 index로
        });
    });
  } else {
    next()
  }
})

// 암호화된 비밀번호와 입력한 비밀번호 암호화해서 비교
userSchema.methods.comparePassword=function(plainPassword, cb){
  bcrypt.compare(plainPassword, this.password, function(err, isMatch){
      if(err) return cb(err);
      cb(null, isMatch);
  });
}

// 로그인 토큰 생성
userSchema.methods.generateToken = function(cb) {
  var user = this;
  // jsonwebtoken을 이용해서 토큰 생성 = JWT
  var token = jwt.sign(user._id.toHexString(), 'secretToken')
  // user._id + 'secretToken' = token 을 통해 토큰 생성
  // 토큰 해석을 위해 'secretToken' 입력 -> user._id 가 나옴
  // 토큰을 가지고 누구인지 알 수 있는 것
  user.token = token

  user.save(function(err, user) {
      if(err) return cb(err)
      cb(null, user)
  })
}

// 토큰 복호화 
userSchema.statics.findByToken = function(token, cb) {
  var user = this;

  jwt.verify(token, 'secretToken', function(err, decoded) {
      // 유저 아이디를 이용해서 유저를 찾은 다음에
      // 클라이언트에서 가져온 token과 DB에 보관된 토큰이 일치하는지 확인
      user.findOne({"_id": decoded, "token": token}, function(err, user) {
          if(err) return cb(err);
          cb(null, user)
      })
  })
}

const User = mongoose.model('User', userSchema)  // 모델로 감싸주고
module.exports = { User }