import { CpHubBaseClient } from "./cpHubBase";

class CpHubClient extends CpHubBaseClient {
  async signIn(dto: {
    email: string;
    password: string;
    rememberMe?: boolean | undefined;
  }) {
    await this.post("/user/sign-in", dto);
    return;
  }
}

const cpHubClient = new CpHubClient();
export default cpHubClient;
