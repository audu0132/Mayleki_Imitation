export const stripPrivateFields = (userObj) => {
  if (!userObj) return null;
  const clone = { ...(userObj.toObject ? userObj.toObject() : userObj) };
  delete clone.password;
  delete clone.refreshToken;
  delete clone.verificationToken;
  return clone;
};
