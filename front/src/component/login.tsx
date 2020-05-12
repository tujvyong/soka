import React, { useState } from 'react';
import { handleLogin } from '../container/axiosContainer'
import { LoginState, AppStateProps } from '../interface';

export const Login: React.FC<AppStateProps> = (props) => {
  const [user, setUser] = useState<LoginState>({
    email: '',
    password: '',
    loginError: ''
  })
  
  const handleChange = (e: React.FormEvent<HTMLInputElement>): void => {
    let title = e.currentTarget.name
    let res = e.currentTarget.value
    let toSet = {[title]: res}
    setUser({...user, ...toSet})
  }

  const handleSubmit = (e: any) => {
    handleLogin(user, props.setAppState)
    e.preventDefault()
  }

  return(
    <form onSubmit={(event) => handleSubmit(event)}>

      <div className="form-item">
        <p>Eメールアドレス</p>
        <input className="form-input" type="text" name="email" value={user.email} onChange={handleChange} />
      </div>

      <div className="form-item">
        <p>パスワード</p>
        <input className="form-input" type="password" name="password" value={user.password} onChange={handleChange}/>
      </div>

      <input type="submit" value="送信" />
    </form>
  )
}
