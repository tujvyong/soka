import React from 'react';
import axios from 'axios';
import { LoginState, Register, Headers, IndexState, PostsState } from '../interface'

// https://github.com/axios/axios#custom-instance-defaults ← 設定の仕方
// https://github.com/lynndylanhurley/devise_token_auth/blob/275da3c1960b60adf9c49adfff15725a7c60faf9/app/controllers/devise_token_auth/concerns/set_user_by_token.rb#L26
const createCredencialsAxios = () => {
  const auth: Headers = JSON.parse(sessionStorage.getItem("sokabook_auth") || '[]')
  const { token, client, uid } = auth
  const result = axios.create({
    headers: {
      'Content-Type': 'application/json',
      'access-token': token,
      'client': client,
      'uid': uid
    },
    responseType: 'json',
    withCredentials: true
  })

  return result
}

export const checkLoginStatus = (AppState: IndexState, setAppState: React.Dispatch<React.SetStateAction<IndexState>>): void => {
  const axiosWithCredentials = createCredencialsAxios()
  axiosWithCredentials
    .get(
      'http://localhost:3020/auth/validate_token',
    )
    .then( res => {
      if (res.data.success && AppState.loggedInStatus === false){
        setAppState({...AppState, loggedInStatus: true, user: res.data.data})
        console.log("check logged in?", res)
      }
    })
    .catch(error => {
      if (AppState.loggedInStatus === true) {
        if (error.response.data['errors'][0] === "Invalid login credentials") {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log('Error', error.message);
          console.log(error.config);
        }
      }
    })  
}

export const handleLogin = (recUser: LoginState, setAppState: React.Dispatch<React.SetStateAction<IndexState>>): void => {
  axios
    .post(
      'http://localhost:3020/auth/sign_in',
      {
        email: recUser.email,
        password: recUser.password
      },
      { withCredentials: true }
    )
    .then(res => {
      if (res.status === 200) {
        let userData = res.data.data
        delete userData.provider
        delete userData.uid
        const save = {
          "token": res.headers['access-token'],
          "client": res.headers['client'],
          "uid": res.headers['uid'],
          "user": userData
        }
        sessionStorage.setItem("sokabook_auth", JSON.stringify(save))
        setAppState({ loggedInStatus: true, user: userData })
        console.log("logged IN!", res.headers)
      }
    })
    .catch(error => {
      console.log("Failed login.", error)
    })
}

export const handleLogout = (setAppState: React.Dispatch<React.SetStateAction<IndexState>>): void => {
  const auth: Headers = JSON.parse(sessionStorage.getItem("sokabook_auth") || '[]') as Headers
  const {token, client, uid} = auth
  axios
    .delete(
      'http://localhost:3020/auth/sign_out',
      { 
        headers:{
          'Content-Type': 'application/json',
          'access-token': token,
          'client': client,
          'uid': uid
        }
      }
    )
    .then(res => {
      sessionStorage.removeItem("sokabook_auth")
      setAppState({loggedInStatus: false, user: { id: -1, email: '', name: '', allow_password_change: false }})
      console.log("Logout success", res)
    })
    .catch(error => {
      console.log("Failed logout.", error)
    })
}

export const handleSuccessfulAuth = (recUser: Register, setAppState: React.Dispatch<React.SetStateAction<IndexState>>): void => {
  axios
    .post(
      'http://localhost:3020/auth',
      {
        name: recUser.name,
        email: recUser.email,
        password: recUser.password,
        password_confirmation: recUser.password_confirmation
      },
      { withCredentials: true }
    )
    .then(res => {
      if (res.data.status === "success") {
        handleLogin(recUser, setAppState)
        console.log("Registration success", res.data.data)
      }
    })
    .catch(error => {
      console.log("Failed registrations.", error)
    })
}

export const getPosts = (setPosts: React.Dispatch<React.SetStateAction<PostsState>>): void => {
  const axiosWithCredentials = createCredencialsAxios()
  axiosWithCredentials
    .get('http://localhost:3020/api/v1/posts')
    .then((res): any => {
      console.log("Success get posts.", res)
      setPosts({data: res.data})
    })
    .catch((error): any => {
      console.log("Failed get posts.", error)
    })
}