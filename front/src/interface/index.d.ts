import React from 'react';

export interface UserData {
  id: number;
  email: string;
  allow_password_change: boolean;
  name?: string;
  nickname?: string;
  image?: string;
  undergraduate?: string;
  subject?: string;
  generation?: number;
  occupation?: string;
}

export interface IndexState {
  loggedInStatus: boolean;
  user: UserData;
}

export interface Headers {
  token: string;
  client: string;
  uid: string;
}

export interface Register {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  registrationError?: string;
}

export interface LoginState {
  email: string;
  password: string;
  loginError?: string;
}

export interface AppStateProps extends IndexState{
  setAppState: React.Dispatch<React.SetStateAction<IndexState>>
}

export interface Posts {
  id: number;
  user_id: number;
  message: string;
}

export type PostsList = Posts[]

export interface PostsState {
  data: PostsList
}
