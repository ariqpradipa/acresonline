import * as React from "react";
import Cookies from "js-cookie";


export default function Home() {

    const [token, setToken] = React.useState(null);
    const [username, setUsername] = React.useState(null);

    React.useEffect(() => {

        setToken(Cookies.get("tokenAcres"));
        setUsername(Cookies.get("usernameAcres"));

    }, []);

    return (
        <div>
            <h1>emasil</h1>
            <h1>email {token}</h1>
            <h1>pass {username}</h1>
        </div>
    );
}
