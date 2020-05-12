import React, { useState } from 'react';
import { updateUser } from '../container/axiosContainer'
import { AppStateProps, UserData } from '../interface';

export const Dashboard: React.FC<AppStateProps> = (props) => {
  const [newUser, setNewUser] = useState<UserData>(props.user)

  function submitUpdate(e: React.FormEvent<HTMLFormElement>) {
    updateUser(newUser, props.setAppState)
    e.preventDefault()
  }

  const handleChange = (e: React.FormEvent<HTMLInputElement>): void => {
    let title = e.currentTarget.name
    let res = e.currentTarget.value
    let toSet = {[title]: res}
    setNewUser({...newUser, ...toSet})
  }

  const handleFileChange = (e: any): void => {
    const file = e.currentTarget.files
    if (file.length > 0){
      console.log(file[0])
      setNewUser({...newUser, image: file[0]})
    } else {
      setNewUser({...newUser, image: {url: '', current_path: ''}})
    }
    // if (files.length > 0) {
    //   let file = files[0]
    //   const reader = new FileReader()
    //   reader.onload = (e) => {
    //     setNewUser({...newUser, image: e.currentTarget.value})
    //   }
    // }
  }

  return (
    <div className="ac">
      <h1>Dash Board</h1>
      <h2>Status: {props.loggedInStatus}</h2>
      <h2>user: {props.user.email} and {props.user.name}</h2>

      <form onSubmit={(event) => submitUpdate(event)}>
        <div className="form-item">
          <p>Eメールアドレス</p>
          <input className="form-input" type="text" name="email" value={newUser.email} onChange={handleChange} />
        </div>

        <div className="form-item">
          <p>名前</p>
          <input className="form-input" type="text" name="name" value={newUser.name} onChange={handleChange}/>
        </div>

        <div className="form-item">
          <p>ニックネーム</p>
          <input className="form-input" type="text" name="nickname" value={newUser.nickname || ''} onChange={handleChange}/>
        </div>

        <div className="form-item">
          <p>画像</p>
          <input className="form-input" type="file" name="nickname" accept="image/*" onChange={handleFileChange} />
          <div>
            <img src={newUser.image.url} />
          </div>
        </div>

        <div className="form-item">
          <p>期</p>
          <input className="form-input" type="text" name="generation" value={newUser.generation || ''} onChange={handleChange}/>
        </div>

        <div className="form-item">
          <p>学部</p>
          <input className="form-input" type="text" name="undergraduate" value={newUser.undergraduate || ''} onChange={handleChange}/>
        </div>

        <div className="form-item">
          <p>専攻</p>
          <input className="form-input" type="text" name="subject" value={newUser.subject || ''} onChange={handleChange}/>
        </div>

        <div className="form-item">
          <p>職業</p>
          <input className="form-input" type="text" name="occupation" value={newUser.occupation || ''} onChange={handleChange}/>
        </div>


        <input type="submit" value="送信" />
      </form>

    </div>
  );
}