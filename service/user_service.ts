import User from '../src/database/userSchema'

export const createUser = async (email: string, name: string, password: string) => {
  const user = new User({ email, name, password });
  return await user.save();
};

export const findUserByEmail = async (email: string) => {
  return await User.findOne({ email });
};