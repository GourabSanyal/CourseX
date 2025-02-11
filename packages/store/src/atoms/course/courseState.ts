import {atom} from "recoil";
import type {Course} from 'shared-types';

export const courseState = atom<Record<string, Course>>({
  key: 'courseStateAtom',
  default: {}, 
});
