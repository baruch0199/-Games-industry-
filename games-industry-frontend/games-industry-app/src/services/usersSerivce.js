import httpService from "./httpService";
import lodash from "lodash";
import jwtDecode from "jwt-decode";

export const refresh = () => {
  window.location.reload();
};

const tokenKey = "token";
setTokenHeader();

function setTokenHeader() {
  return httpService.setCommonHeader("x-auth-token", getJwt());
}

export function signUp(user) {
  const pickedDtailsReqBody = lodash.pick(user, ["name", "email", "password"]);
  return httpService.post("/sign-up/registration", pickedDtailsReqBody);
}

export async function signIn(credential) {
  const { data } = await httpService.post("/sign-in", credential);
  localStorage.setItem(tokenKey, data.token);
  setTokenHeader();
  // refresh();
}

export function logOut() {
  localStorage.removeItem(tokenKey);
  setTokenHeader();
  // refresh();
}

export function getJwt() {
  return localStorage.getItem(tokenKey);
}

export function user() {
  const token = getJwt();
  try {
    return jwtDecode(token);
  } catch {
    return null;
  }
}

user();
const userService = {
  signUp,
  signIn,
  logOut,
  getJwt,
  user,
};

export default userService;
