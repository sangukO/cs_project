const { User } = require("../models/User");

let role = (req, res, next) => {

  let admin = req.user.admin;

  if (admin == 0) {
    return res.json({admin: false});        
  } 
  
  next();
  // });
  
  // userId로 admin 0,1 구분
  // 1. 공지 목록을 보여줄 때 admin 구분을 위한 userId를 보낸다
  // 2. userId로 admin 0,1을 구분하고 인증 페이지를 넘어간다
  // 3. 단추만 안보이게 할거면 어떻게 할 것인가?

};

module.exports = { role };