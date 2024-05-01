import { recoilPersist} from 'recoil-persist'

export const getStorage = (key: string) => {
    if (typeof window !== 'undefined') {
      return window.localStorage.getItem(key);
    }
    return null;
  };
  
  export const setStorage = (key: string, value: string) => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(key, value);
    }
  };
  
//   export const removeStorage = (key: string) => {
//     if (typeof window !== 'undefined') {
//       window.localStorage.removeItem(key);
//     }
//   };

  export const { persistAtom } = recoilPersist({
    key: 'recoil-persist',
    storage: {
      getItem: (key : string) => getStorage(key),
      setItem: (key : string, value : string) => setStorage(key, value),
    //   removeItem: (key : string) => removeStorage(key),
    },
  });