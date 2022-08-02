import { useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";

const Swal = require('sweetalert2');

export default function CookieChecker() {

    useEffect(() => {

        if (Cookies.get("tokenAcres") === undefined || Cookies.get("usernameAcres") === undefined) {

            Cookies.remove("tokenAcres");
            Cookies.remove("usernameAcres");

            window.location.href = "/";

        } else {

            getValidToken();

        }

    }, [Cookies.get("tokenAcres"), Cookies.get("usernameAcres")]);

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
}