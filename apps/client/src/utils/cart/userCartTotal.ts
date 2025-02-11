import { cartState } from "store";
import { Course } from "shared-types";
import { useRecoilState } from "recoil";

const userCartTotal = () => {
    const [cartItems] = useRecoilState<Record<string, Course>>(cartState);
    const cartTotal = Object.values(cartItems).reduce((sum, item) => sum +item.price, 0)
    return cartTotal
}

export default userCartTotal;