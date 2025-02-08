import { CpHubBaseClient } from "./CpHubBase";

class CpHubClient extends CpHubBaseClient {
  async signIn(dto: {
    email: string;
    password: string;
    rememberMe?: boolean | undefined;
  }) {
    // status code 등 접근할 수 있도록 baseclient 수정 필요. 지금은 body만 접근 가능
    const res = await this.post("/user/sign-in", dto);
    return res as {
      accessToken: string;
      userId: string;
      username: string;
    };
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
