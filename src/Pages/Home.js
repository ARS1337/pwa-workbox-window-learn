import React from 'react';
import { Link } from 'react-router-dom';

function Home(props) {
    return (
        <div>
            home<br/>
            <Link to="/Page2">Page2</Link><br/>
            <Link to="/Page3">Page3</Link>
        </div>
    );
}

export default Home;