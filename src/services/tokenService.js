let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getToken = () => {
  return token;
};

export { setToken, getToken };