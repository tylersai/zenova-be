import * as bcrypt from 'bcrypt';

export const SALT_ROUND = 10;

export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(SALT_ROUND);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

export const verifyPassword = async (
  password: string,
  hashedPassword: string,
): Promise<boolean> => {
  try {
    return await bcrypt.compare(password, hashedPassword);
  } catch (error) {
    console.error(error);
    return false;
  }
};
