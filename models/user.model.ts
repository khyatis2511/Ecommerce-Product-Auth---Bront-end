/* eslint-disable func-names */
/* eslint-disable no-unused-vars */
import mongoose, { Document } from 'mongoose';
import crypto from 'crypto';

const { Schema } = mongoose;

interface userData extends Document {
  name: string,
  email: string,
  password: string,
  encrypt_key: string,
  validatePassword: (password: string) => boolean,
}

const userSchema = new Schema<userData>({
  name: String,
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  encrypt_key: {
    type: String,
  },
});

userSchema.pre('save', function save(next) {
  const user = this;
  const { password } = user;
  if (password && (password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[~`!@#$%^&*()+_=\\|[\]{}:;"'?/,.<>-])(?=.*[A-Z]).{8,16}$/))) {
    this.encrypt_key = crypto.randomBytes(16).toString('hex');
    this.password = crypto.pbkdf2Sync(password, this.encrypt_key, 1000, 64, 'sha512').toString('hex');
    next();
  } else {
    next({
      name: 'PasswordError',
      message: 'Password must contains 8 char with special char,small letter,capital letter and a number',
    });
  }
});

userSchema.methods.validatePassword = function (password : string) {
  const hash = crypto.pbkdf2Sync(password, this.encrypt_key, 1000, 64, 'sha512').toString('hex');
  return this.password === hash;
};

const User = mongoose.model('User', userSchema);

export default User;
