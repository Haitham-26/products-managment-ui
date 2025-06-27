import { User } from "../../model/user/User";
import { MyApi } from "../AxiosClient";

export class UserAxios {
  static signUp(dto: SignUpDto) {
    return MyApi.post<User>("/users/signup", dto).then(({ data }) => data);
  }

  static login(dto: LoginDto) {
    return MyApi.post<User>("/users/login", dto).then(({ data }) => data);
  }
}
