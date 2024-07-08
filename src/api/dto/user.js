export class UserDTO {
  constructor(username, password) {
    this.id = username;
    this.name = username;
    this.pw = password;
    this.user_type = "U";
  }
}

export class GoogleUserDTO {
  constructor(username, token) {
    this.id = username;
    this.name = username.split("@")[0];
    this.user_type = "G";
    this.api_token = token;
  }
}
