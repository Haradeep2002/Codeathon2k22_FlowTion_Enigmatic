import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
    <div>
        <div style={{ backgroundColor: 'rgba(5, 0, 255, 0.4)',height:'100vh' }}>
            <h1 style={{ color: '#131D5A' }}>404 - Not Found!</h1>
        </div>
        <br></br>
        <br></br>
        <Link to="/" style={{ border: '2px solid #000133', backgroundColor: '#EFE0CA', color: '#001233', textDecoration: 'none', padding: '10px', marginTop: '20px' }} >Go Home</Link>
    </div>
);

export default NotFound;