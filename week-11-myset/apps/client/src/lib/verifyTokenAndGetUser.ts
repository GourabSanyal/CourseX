import  jwt  from "jsonwebtoken";

type CallbackFunction = (result : boolean | object) => void;

export const verifyTokenAndGetUser = (token : string, cb: CallbackFunction) => {
    jwt.verify(token, "SECRET", (err, user) => {
        if (err) {
            return cb(false)
        }
        return cb(user as object)
    })
}