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
