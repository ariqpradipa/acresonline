import * as React from "react";
import Cookies from "js-cookie";


export default function Home() {

    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    React.useEffect(() => {

        setEmail(Cookies.get("email"));
        setPassword(Cookies.get("password"));

    }, []);

    return (
        <div>
            <h1>emasil</h1>
            <h1>email {email}</h1>
            <h1>pass {password}</h1>
        </div>
    );
}
