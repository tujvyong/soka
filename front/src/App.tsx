import React, { useState, useEffect } from 'react';
import { Switch, Route, Redirect, RouteProps } from "react-router-dom";
import { checkLoginStatus } from './container/axiosContainer'
import { IndexState } from './interface';
import { NotFound } from './component/404'
import { Header } from './component/header';
import { Registration } from './component/registration';
import { Login } from './component/login'
import { Home } from './component/home';
import { Dashboard } from './component/dashboard';



export const App: React.FC = () => {
  const [AppState, setAppState] = useState<IndexState>({
    loggedInStatus: false,
    user: {
      id: -1,
      email: '',
      allow_password_change: false,
      name: '',
      nickname: '',
      image: {url: '', current_path: ''},
      undergraduate: '',
      subject: '',
      generation: '',
      occupation: '',
    }
  })

  // const toggleOpen = (): void => {
  //   let toSet = {isOpen: !AppState.isOpen}
  //   setAppState({...AppState, ...toSet})
  // }
  
  const PrivateRoute: React.FC<RouteProps> = ({ children, ...rest }) => {
    return (
      <Route
        {...rest}
        render={({ location }) =>
          AppState.loggedInStatus ? ( children ) : ( <Redirect to={{ pathname: "/login", state: { from: location } }} /> )
        }
      />
    );
  }
  
  useEffect(() => {
    checkLoginStatus(AppState, setAppState)
  }, [])
  // let modal;
  // if (AppState.isOpen) {
  //   modal = (
  //     <div className="mask-modal">
  //       <div className="modal-in">
  //         <FontAwesomeIcon className="close-button" icon={faTimes} onClick={toggleOpen} />
  //         <p className="ac mb1">何かしらの処理</p>
  //       </div>
  //     </div>
  //   )
  // }

  let content;
  content = (
    <Switch>
      <Route 
        exact path={"/"}
        children={ <Home {...AppState} /> }
      />
      <PrivateRoute 
        exact path={"/dashboard"} 
        children={<Dashboard {...AppState} setAppState={setAppState} /> }
      />
      <Route 
        exact path={"/registration"} 
        children={ <Registration {...AppState} setAppState={setAppState} /> }
      />
      <Route 
        exact path="/login"
        children={ <Login {...AppState} setAppState={setAppState} /> }
      />
      <Route
        children={ <NotFound /> }
        default
      />
    </Switch>
  )

  return (
    <div id="content">
      <Header {...AppState} loggedInStatus={AppState.loggedInStatus} setAppState={setAppState} />
      <div className="container">
          {content}
      </div>

    </div>
  );
}
