import { adminState } from "../../atoms/admin/admin";
import { selector } from "recoil";

export const adminUserName = selector({
    key: 'adminUserName',
    get: ({get}) => {
        const state = get(adminState)
        return state.username
    }
})