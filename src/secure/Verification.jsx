import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

const Verification = (props) => {
    const user_data = JSON.parse(localStorage.getItem('user_data'));
    const caleg = JSON.parse(localStorage.getItem('caleg'));
    const profile = JSON.parse(localStorage.getItem('profile'));

    const { username } = useParams();

    const [verified, setVerified] = useState(false);

    const checkUserData = () => {
        if (! profile || profile === null) {
            return window.location.href = '/';
        } else {
            if (profile.username === username && user_data.posisi === 'relawan') {
                setVerified(true);
            } else {
                return window.location.href = '/';
            }
        }
    }

    const checkProfileData = () => {
        if (! profile || profile === null) {
            setVerified(false);
            return window.location.href = '/';
        } else {
            setVerified(true);
        }
    }

    const checkCalegData = () => {
        if (! caleg || caleg === null) {
            setVerified(false);
            return window.location.href = '/';
        } else {
            setVerified(true);
        }
    }

    useEffect(() => {
        checkUserData();
        checkProfileData();
        checkCalegData();
    }, [verified]);

    return (
        <React.Fragment>
            { verified ? props.children : '' }
        </React.Fragment>
    )
}

export default Verification
