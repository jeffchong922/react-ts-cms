import webStorage from './web-storage'

const TOKEN_KEY = 'cms-token'

function setToken (token: string) {
  webStorage.setItem(TOKEN_KEY, token)
}

function getToken () {
  return webStorage.getItem(TOKEN_KEY);
}

function clearToken() {
  webStorage.removeItem(TOKEN_KEY);
}

export default Object.freeze({
  setToken,
  getToken,
  clearToken
})