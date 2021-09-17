import {authStoreKey} from '../config/config'

export const setLocalStorageItem = async (key, obj) => {
  try {
    await localStorage.setItem(key, JSON.stringify(obj))
    return true
  } catch (error) {
    console.error(error)
    return false
  }
}

export const removeFromLocalStorage = async key => {
  try {
    await localStorage.removeItem(key)
    return true
  } catch (error) {
    console.error(error)
    return false
  }
}

export const checkUserInLocalStorage = () => {
  try {
    const data = getFromLocalStorage(authStoreKey)
    if (data) {
      return {
        status: true,
        result: data
      }
    } else {
      return {
        status: false
      }
    }
  } catch (error) {
    console.error(error)
    return {
      status: false
    }
  }
}

const getFromLocalStorage = key => {
  try {
    return JSON.parse(localStorage.getItem(key))
  } catch (error) {
    console.error(error)
    return false
  }
}
