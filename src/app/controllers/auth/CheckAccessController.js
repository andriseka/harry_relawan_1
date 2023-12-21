import React, { useEffect } from 'react'
import Loading from '../../../resources/components/loading/Loading'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { checkLogin } from '../../model/auth/authSlice';
import { getProvinsi } from '../../model/wilayah/provinsiSlice';
import { getCaleg } from '../../model/caleg/calegSlice';
import { getDetailRelawan } from '../../model/relawan/relawanSlice';

function CheckAccessController() {
    const dispatch = useDispatch();

    const { username } = useParams();

    const checkAccess = async() => {
        try {
            const response = await dispatch(checkLogin(username)).unwrap();
            if (response.status === 200) {
                toast.success('Login berhasil');
                if (response.data.posisi === 'relawan') {
                    await dispatch(getCaleg()).unwrap();
                    const relawan = await dispatch(getDetailRelawan(response.data.username)).unwrap().catch((err) => {});
                    localStorage.setItem('profile', JSON.stringify(relawan.data));
                    return window.location.href = `/${response.data.username}/home/program`;
                } else if (response.data.posisi === 'admin') {
                    return window.location.replace(`https://admin.maspram.id/${response.data.username}`)
                } else if (response.data.posisi === 'timses') {
                    return window.location.replace(`https://timses.maspram.id/${response.data.username}`)
                } else if (response.data.posisi === 'sanksi') {
                    return window.location.replace(`https://sanksi.maspram.id/${response.data.username}`)
                }
            } else {
                toast.error('Periksa kembali data login Anda');
                setTimeout(() => {
                    return window.location.href = '/'; 
                }, 1000);
            }
        } catch (error) {
            
        }
    }

    useEffect(() => {
        checkAccess(); 
    }, []);

    return (
        <div>
            <Toaster position="top-right" />
            <Loading />
        </div> 
    )
}

export default CheckAccessController
