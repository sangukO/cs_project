const express = require('express')
const app = express()
const cors = require('cors') //cors 오류 해결
app.use(cors()); //cors 오류 해결

const port = 3001;

const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser');
const { User } = require("./models/User");
const { auth } = require("./middleware/auth");
const { Board } = require("./models/Board");

app.use(bodyParser.urlencoded({extended: true})); 
app.use(bodyParser.json());
app.use(cookieParser());


//몽고디비 연결
const mongoose = require('mongoose')
mongoose.connect("mongodb+srv://root:complicatedpassword@csproject.vjvtipf.mongodb.net/cs_project", {
    // useNewUrlParser: true, 
    // useUnifiedTopology: true, 
    // useCreateIndex: true, 
    // useFindAndModify: false
}).then(() => console.log('MongoDB Connected..'))
    .catch(err => console.log(err))

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})

//home
app.get('/', (req, res) => {
  res.send('Hi, Back-end Page!')
})

//회원가입
app.post('/register', (req, res) => {
  //회원가입 할 때 필요한 정보들 client에서 가져오면 
  //해당 데이터를 데이터베이스에 넣어준다.
  console.log(req.body)
  const user = new User(req.body) 
  user.save((err,userInfo) => { // mongoDB 메소드, save해주면 Usermodel에 저장됨
    if(err) return res.json({success:false, err}) 
    return res.status(200).json ({sucess: true }) //status200은 성공했음을 의미
  })
})

// login
app.post('/login', (req, res) => {
  //params안의 userId 찾아서 비교
  User.findOne({userId: req.body.userId}, (err, user)=>{
    if(!user){
        return res.json({
            loginSuccess: false,
            message: "userId none"
        });
    }
    // 비밀번호 비교
    user.comparePassword(req.body.password, (err, isMatch)=>{
      //비밀번호 틀림
      if(!isMatch){
        return res.json({
            loginSuccess:false,
            message:"Wrong password"
        });
      }
      user.generateToken((err, user)=>{
        if(err) return res.status(400).send(err);
        // x_auth -> x-Auth-Token
        // x-auth-token : 엔드 포인트에서 인증 토큰 요청해서 
        // 성공시 서버에 인증 토큰을 반환해 줌
        // 그 토큰을 쿠키에 저장
        res.cookie("x_auth", user.token)
        .status(200)
        .json({
            loginSuccess: true,
            _id: user._id,
            userId: user.userId
        });
        // console.log(user.token)
        // console.log(user._id)
      });
    });
  });
})

// 로그인 유저 정보 post로 바꿔보기
app.get('/auth', auth, (req, res) => {
  // 여기까지 미들웨어(auth.js)를 통과해 왔다는 얘기는 Authentication이 True라는 말
  // 클라이언트에게 유저 정보 전달
  res.status(200).json({
      _id: req.user._id,
      isAuth: true,
      userId: req.user.userId,
      username: req.user.username,
      age: req.user.age,
      gender: req.user.gender === 0 ? "남" : "여",
      email: req.user.email,
      phone: req.user.phone
  })
})

app.post('/logout', (req, res) => {
  User.findOneAndUpdate({userId: req.body.userId}, {token: ""}, (err, user) => {
      if(err) return res.json({success: false, err});
      return res.status(200).send({
          success: true
      })
   })
})

// 기본 게시판 작성
app.post('/board', (req, res) => {
  const board = new Board(req.body)
  board.save((err, boardInfo) => {
    if(err) return res.json({success:false, err}) 
    return res.status(200).json ({success: true })
  })
})

app.post('/getTodo', (req, res) => {

  Board.find({}, (err, boardInfo) => {
    return res.json({
      boardInfo})
  })
})

// id 값 추가
// app.post('/add', (req, res) => {
//   res.send('전송완료');

//   db.collection('counter').findOne({name : '총게시물개수'}, function(err, result){

//     var totalPosts = result.totalPosts;

//     db.collection('boards').insertOne({
//       _id : totalPosts + 1, 
//       date : req.body.date, 
//       time : req.body.time,
//       todo : req.body.todo, 
//       tag : req.body.tag, 
//       name : req.body.name}, function(err, result){
//         console.log('게시물 저장')
//       })
      
//   })

// })


app.post('/update', async (req, res) => {

  const { name, date, time, todo, tag, _id} = req.body
  await Board.updateOne({ _id }, { $set: { name, date, time, todo, tag } });

})

app.post("/delete", async (req, res) => {

  const { _id } = req.body
  await Board.deleteOne({ _id : _id}) // merge

});

app.post("/getWriterName", (req, res) => {
  User.findOne({userId: req.body.userId}, (err, user)=>{
    if(user){
      return res.status(200).json({
          writerName: user.username
      });
    }
  })
})