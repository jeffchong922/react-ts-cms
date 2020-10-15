export enum StorageSite {
  SESSION = 'session',
  LOCAL = 'local'
}

function setItem (key: string, val: string, site: StorageSite = StorageSite.SESSION) {
  if (site === StorageSite.SESSION) {
    sessionStorage.setItem(key, val)
  } else {
    localStorage.setItem(key, val)
  }
}

function getItem (key: string, site: StorageSite = StorageSite.SESSION) {
  if (site === StorageSite.SESSION) {
    return sessionStorage.getItem(key)
  } else {
    return localStorage.getItem(key)
  }
}

function removeItem (key: string, site: StorageSite = StorageSite.SESSION) {
  if (site === StorageSite.SESSION) {
    sessionStorage.removeItem(key)
  } else {
    localStorage.removeItem(key)
  }
}

function clearStorage (site: StorageSite = StorageSite.SESSION) {
  if (site === StorageSite.SESSION) {
    sessionStorage.clear()
  } else {
    localStorage.clear()
  }
}

export default Object.freeze({
  setItem,
  getItem,
  removeItem,
  clearStorage
})