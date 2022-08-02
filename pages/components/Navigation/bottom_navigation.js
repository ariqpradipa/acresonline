import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Paper from '@mui/material/Paper';
import Home from '../../w/home';
import Regis from '../../auth/register';

// icons
import HomeIcon from '@mui/icons-material/Home';
import AssignmentIcon from '@mui/icons-material/Assignment';
import PersonIcon from '@mui/icons-material/Person';

export default function FixedBottomNavigation() {
    const [value, setValue] = React.useState(0);
    const ref = React.useRef(null);

    React.useEffect(() => {
        ref.current.ownerDocument.body.scrollTop = 0;
    }, [value]);

    return (
        <>
            {value === 0 && <Home />}
            {value === 1 && <Regis />}
            <Box sx={{ pb: 7 }} ref={ref}>
                <CssBaseline />
                <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
                    <BottomNavigation
                        showLabels
                        value={value}
                        onChange={(event, newValue) => {
                            setValue(newValue);
                        }}
                    >
                        <BottomNavigationAction label="Home" icon={<HomeIcon />} />
                        <BottomNavigationAction label="Quests" icon={<AssignmentIcon />} />
                        <BottomNavigationAction label="Status" icon={<PersonIcon />} />
                    </BottomNavigation>
                </Paper>
            </Box>
        </>
    );
}
