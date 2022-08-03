import * as React from "react";
import Image from "next/image"
import Cookies from "js-cookie";
import Button from '@mui/material/Button';
const Swal = require('sweetalert2');

// Level Gauge
import LevelGauge from '../components/Level/levelGauge';

//icons
import LocalMallIcon from '@mui/icons-material/LocalMall';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import IronIcon from '@mui/icons-material/Iron';



export default function Home() {

    const [token, setToken] = React.useState(null);
    const [username, setUsername] = React.useState(null);

    const [level, setLevel] = React.useState(0);
    const levelPercentage = "90%"

    React.useEffect(() => {
        setToken(Cookies.get("tokenAcres"));
        setUsername(Cookies.get("usernameAcres"));

    }, []);

    return (
        <>
            <div className="flex justify-start ml-1 mt-2">
                <h1>Level: {level}</h1>
            </div>

            <div className="flex flex-col mb-4 justify-center items-center">

                <LevelGauge percentage={levelPercentage} />
                <img src="https://mdbootstrap.com/img/new/standard/city/047.jpg" class="max-w-[92%] h-auto rounded-lg" alt="" />
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
            <div className="flex flex-col justify-center items-center m-[3%] space-y-2">
                <Button variant="outlined" startIcon={<CheckroomIcon />} className="justify-start w-[98%] h-[5vh]">
                    Dungeon
                </Button>
            </div>
        </>
    );
}
