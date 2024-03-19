import {atom} from "recoil";

export const courseState = atom<{isLoading: boolean, course: any}>({
  key: 'courseStateSelector',
  default: {
    isLoading: true,
    course: null
  }, 
});