import React from 'react';
import { Link } from 'react-router-dom';

function Page2(props) {
    return (
        <div>
            <Link to="/">Home</Link><br/>
            Page2<br/>
            <Link to="/Page3">Page3</Link>
        </div>
    );
}

export default Page2;