import { adminState } from "../../atoms/admin/admin";
import { selector } from "recoil";

export const isAdminLoading = selector({
    key: 'isAdminLoading',
    get: ({get}) => {
        const state = get(adminState)
        return state.isLoading
    }
})