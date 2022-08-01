import * as React from "react";
import Cookies from "js-cookie";
import axios from "axios";

const Swal = require('sweetalert2');


export default function Home() {

    const [token, setToken] = React.useState(null);
    const [username, setUsername] = React.useState(null);

    React.useEffect(() => {

        if (Cookies.get("tokenAcres") === undefined || Cookies.get("usernameAcres") === undefined) {

            window.location.href = "/";

        } else {

            setToken(Cookies.get("tokenAcres"));
            setUsername(Cookies.get("usernameAcres"));

            getValidToken();

        }

    }, []);

    const getValidToken = () => {

        axios
            .post("/srv/validateToken", {
                username: Cookies.get("usernameAcres"),
                token: Cookies.get("tokenAcres")
            })
            .then((response) => {

                if (response.data === 3302) {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Token true',
                        showConfirmButton: false,
                        timer: 1000
                    });
                    return;

                } else if (response.data === 4403) {

                    Swal.fire({
                        position: 'center',
                        icon: 'error',
                        title: ' ~Token expired~<br />Please login again',
                        showConfirmButton: true,
                    })
                        .then((result) => {

                            Cookies.remove("tokenAcres");
                            Cookies.remove("usernameAcres");

                            window.location.href = "/";

                        })

                }
                Cookies.remove("tokenAcres");
                Cookies.remove("usernameAcres");
            })
            .catch((error) => {
                console.log(error);
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'Token expired',
                    showConfirmButton: false,
                    timer: 1000
                });
                window.location.href = "/";
            });
    }

    return (
        <div>
            <h1>token {token}</h1>
            <h1>username {username}</h1>
        </div>
    );
}
