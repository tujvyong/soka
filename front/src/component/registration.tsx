import React, { useState } from 'react';
import { handleSuccessfulAuth } from '../container/axiosContainer'
import { Register, AppStateProps } from '../interface';

export const Registration: React.FC<AppStateProps> = (props) => {
  const [user, setUser] = useState<Register>({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    registrationError: ''
  })
  
  const handleChange = (e: React.FormEvent<HTMLInputElement>): void => {
    let title = e.currentTarget.name
    let res = e.currentTarget.value
    let toSet = {[title]: res}
    setUser({...user, ...toSet})
  }
    
  const handleSubmit = (e: any) => {
    handleSuccessfulAuth(user, props.setAppState)
    e.preventDefault()
  }

  return(
    <form onSubmit={(event) => handleSubmit(event)}>

      <div className="form-item">
        <p>名前</p>
        <input 
          className="form-input"
          type="text" name="name"
          value={user.name}
          onChange={handleChange}
        />
      </div>

      <div className="form-item">
        <p>Eメールアドレス</p>
        <input
          className="form-input"
          type="text" name="email"
          value={user.email}
          onChange={handleChange}
        />
      </div>

      <div className="form-item">
        <p>パスワード</p>
        <input
          className="form-input"
          type="password"
          name="password"
          value={user.password}
          onChange={handleChange}
        />
      </div>

      <div className="form-item">
        <p>パスワード(確認用)</p>
        <input
          className="form-input"
          type="password"
          name="password_confirmation"
          value={user.password_confirmation}
          onChange={handleChange}
        />
      </div>

      <input type="submit" value="送信" />
    </form>
  )
}
