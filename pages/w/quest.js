import * as React from "react";
import Cookies from "js-cookie";
import axios from "axios";

const Swal = require('sweetalert2');


export default function Quest() {

    const [token, setToken] = React.useState(null);
    const [username, setUsername] = React.useState(null);

    React.useEffect(() => {

        setToken(Cookies.get("tokenAcres"));
        setUsername(Cookies.get("usernameAcres"));

    }, []);

    return (
        <div>
            <h1>Quest Page</h1>
            <h1>token {token}</h1>
            <h1>username {username}</h1>
        </div>
    );
}
