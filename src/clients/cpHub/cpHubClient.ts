import { CpHubBaseClient } from "./CpHubBase";

class CpHubClient extends CpHubBaseClient {
  async signIn(dto: {
    email: string;
    password: string;
    rememberMe?: boolean | undefined;
  }) {
    await this.post("/user/sign-in", dto);
    return;
  }

  async signUp(dto: {
    username: string;
    email: string;
    password: string;
    passwordConfirmation: string;
  }) {
    await this.post("/user/sign-up", dto);
    return;
  }
}

const cpHubClient = new CpHubClient();
export default cpHubClient;
