export interface AccessTokenJwtPayload {
  openid: string;
  id: number;
  session_key: string;
}

export interface JwtUserData {
  openid: string;
  id: number;
  session_key: string;
}
