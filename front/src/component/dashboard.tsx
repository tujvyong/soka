import React from 'react';
import { IndexState } from '../interface';

export const Dashboard = (props: IndexState) => {
  return (
    <div className="ac">
      <h1>Dash Board</h1>
      <h2>Status: {props.loggedInStatus}</h2>
      <h2>user: {props.user.email} and {props.user.name}</h2>
    </div>
  );
}