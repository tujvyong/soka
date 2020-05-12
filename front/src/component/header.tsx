import React from 'react';
import { Link } from 'react-router-dom';
import { AppStateProps } from '../interface';
import { handleLogout } from '../container/axiosContainer'

export const Header = (props: AppStateProps) => {
  const logout = (): void => {
    handleLogout(props.setAppState)
  }

  let authForm;
  if (props.loggedInStatus === false) {
    authForm = (
      <ul className="h-menus">
        <li><Link to="/platform" className="white">投稿</Link></li>
        <li><Link to="/login" className="white">ログイン</Link></li>
        <li><Link to="/registration" className="white">登録</Link></li>
      </ul>
    )
  } else {
    authForm = (
      <ul className="h-menus">
        <li><Link to="/platform" className="white">投稿</Link></li>
        <li><Link to="/dashboard" className="white">ダッシュボード</Link></li>
        <li><Link to="/logout" className="white" onClick={logout}>ログアウト</Link></li>
      </ul>
    )
  }

  return (
    <header>
      <div className="container cf">
        <div className="h-logo">
        <Link to="/" className="white">Sokabook</Link>
        </div>
        {authForm}
      </div>
    </header>
  )
}