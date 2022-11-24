export interface SignUpRequest {
  name: string;
  login: string;
  password: string;
}

export interface SignUpResponse {
  name: string;
  login: string;
  _id: string;
}

export interface SignInRequest {
  login: string;
  password: string;
}

export interface SignInResponse {
  token: string;
}

export interface userInterface {
  _id: string;
  name: string;
  login: string;
}
