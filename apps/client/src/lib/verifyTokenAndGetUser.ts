import  jwt, { JwtPayload }  from "jsonwebtoken";

export const verifyTokenAndGetUser = (token : string, cb:(user: JwtPayload | boolean) => void) => {
    jwt.verify(token, "SECRET", (err, user) => {
        if (err) {
            return cb(false)
        }
        return cb(user as JwtPayload)
    })
}