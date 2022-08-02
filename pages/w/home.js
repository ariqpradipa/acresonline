import * as React from "react";
import Cookies from "js-cookie";
import Button from '@mui/material/Button';
import axios from "axios";

//icons
import LocalMallIcon from '@mui/icons-material/LocalMall';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import CheckroomIcon from '@mui/icons-material/Checkroom';

const Swal = require('sweetalert2');


export default function Home() {

    const [token, setToken] = React.useState(null);
    const [username, setUsername] = React.useState(null);

    React.useEffect(() => {

        setToken(Cookies.get("tokenAcres"));
        setUsername(Cookies.get("usernameAcres"));

    }, []);

    return (
        <>
            <div>
                <h1>Home Page</h1>
                <h1>token {token}</h1>
                <h1>username {username}</h1>
            </div>
            <div className="flex flex-col justify-center items-center space-y-2">
                <div className="flex space-x-2">
                    <Button variant="outlined" startIcon={<LocalMallIcon />} sx={{ width: 185 }} className="justify-start">
                        Store
                    </Button>
                    <Button variant="outlined" startIcon={<LocalHospitalIcon />} sx={{ width: 185 }} className="justify-start">
                        Infirmary
                    </Button>
                </div>
                <div className="flex space-x-2">
                    <Button variant="outlined" startIcon={<LocalMallIcon />} sx={{ width: 185 }} className="justify-start">
                        Blacksmith
                    </Button>
                    <Button variant="outlined" startIcon={<CheckroomIcon />} sx={{ width: 185 }} className="justify-start">
                        Tailor
                    </Button>
                </div>
            </div>
        </>
    );
}
