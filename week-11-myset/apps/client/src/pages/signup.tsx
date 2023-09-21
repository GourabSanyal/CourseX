import { Signup } from "ui";

export default function SignPage () {
    return <div>
        <Signup onClick={async( username, password) => {
           const response =  await axios.post( "localhost:3000/admin/signup", {
            username,
            password
           })
        }}/>
    </div>
}