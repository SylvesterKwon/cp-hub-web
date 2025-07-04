export const encodeBase64 = (data: WithImplicitCoercion<string>) => {
  return Buffer.from(data).toString("base64");
};

export const decodeBase64 = (data: WithImplicitCoercion<string>) => {
  return Buffer.from(data, "base64").toString("ascii");
};
