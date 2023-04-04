// decode the payload of the logged in user
export const parseJwt = (authToken) => {
  if (!authToken) {
    return;
  }

  const base64Url = authToken.split(".")[1];
  const base64 = base64Url.replace("-", "+").replace("_", "/");
  return JSON.parse(window.atob(base64));
};
