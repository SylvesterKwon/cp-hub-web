export type SignInForm = {
  email: string;
  password: string;
  rememberMe?: boolean;
};

export type SignUpForm = {
  username: string;
  email: string;
  password: string;
  passwordConfirmation: string;
};
