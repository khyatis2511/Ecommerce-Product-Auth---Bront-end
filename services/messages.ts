/* eslint-disable import/prefer-default-export */
export const returnRes = (
  status : number,
  message: string,
  data?: Array<any> | object,
  other?: Array<any>,
) => ({
  status, message, data, ...other,
});

// ---- message ----

export const msgs = {
  somethingWrong: 'Something went wrong. Try again!',
  invalidPassword: 'Username or Password are incorrect.',
  registered: 'Register successfully.',
  emailExist: 'Email Already Exists!!',
  loggedIn: 'Login successfully.',
  unauthorized: 'You are unauthorized.',
  dataSent: 'Data sent successfully',
};
