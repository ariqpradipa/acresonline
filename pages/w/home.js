import * as React from "react";
import Image from "next/image"
import Cookies from "js-cookie";
import Button from '@mui/material/Button';

//icons
import LocalMallIcon from '@mui/icons-material/LocalMall';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import IronIcon from '@mui/icons-material/Iron';

const Swal = require('sweetalert2');


export default function Home() {

    const [token, setToken] = React.useState(null);
    const [username, setUsername] = React.useState(null);
    const percentage = "100%"

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

            <div className="flex flex-col mb-4 justify-center items-center">
                <div className="w-[98%] bg-gray-200 h-5 mb-2">
                    <div className="bg-blue-600 h-5 text-white text-center" style={{width: percentage}}>{percentage}</div>
                </div>
                <img src="https://mdbootstrap.com/img/new/standard/city/047.jpg" class="max-w-[90%] h-auto rounded-lg" alt="" />
            </div>
            <div className="flex flex-col justify-center items-center space-y-2">
                <div className="flex space-x-2">
                    <Button variant="outlined" startIcon={<LocalMallIcon />} className="justify-start w-[45vw]">
                        Store
                    </Button>
                    <Button variant="outlined" startIcon={<LocalHospitalIcon />} className="justify-start w-[45vw]">
                        Infirmary
                    </Button>
                </div>
                <div className="flex space-x-2">
                    <Button variant="outlined" startIcon={<IronIcon />} className="justify-start w-[45vw]">
                        Blacksmith
                    </Button>
                    <Button variant="outlined" startIcon={<CheckroomIcon />} className="justify-start w-[45vw]">
                        Tailor
                    </Button>
                </div>
            </div>
        </>
    );
}
