import React from 'react';
import { Link } from 'react-router-dom';

function Page3(props) {
    return (
        <div>
            <Link to="/">Home</Link><br/>
            <Link to="/Page2">Page2</Link><br/>
            Page3<br/>
        </div>
    );
}

export default Page3;