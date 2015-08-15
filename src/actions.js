export const REGISTER_USER = 'REGISTER_USER';

export function registerUser(name) {
  return { type: REGISTER_USER, name };
}