import * as React from 'react';

import BottmNav from './components/Navigation/bottom_navigation';
import CookieChecker from './auth/cookieChecker';

export default function Main() {

    return (
        <>
            <CookieChecker />
            <BottmNav />
        </>
    )
}
