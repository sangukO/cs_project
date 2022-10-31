import axios from "axios";
import { LOGIN_USER } from './types';

export function loginUser(dataToSubmit) {
    const request = axios.post('http://localhost:3001/login', dataToSubmit)
        .then((response) => console.log("로그인 클라이언트에서 받음", response.data))

    return {
        type: LOGIN_USER,
        payload: request,
    }
            
}