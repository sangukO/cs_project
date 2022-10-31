import axios from "axios";
import {
    LOGIN_USER
} from './types';

export function loginUser(dataToSubmit) {
    const request = axios.post('http://localhost:3001/login', dataToSubmit)
        .then((response) => {
            if(!response.data.loginSuccess) {
                if(response.data.message == "userId none") {
                    alert("없는 아이디입니다.");
                } else {
                    alert("잘못된 비밀번호입니다.");
                }
            }
        })

        return {
            type: LOGIN_USER,
            payload: request
        }

}