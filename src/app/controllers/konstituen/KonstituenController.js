import React, { useEffect, useState } from 'react'
import KonstituenForm from '../../../resources/views/organisasi/konstituen/form/KonstituenForm'
import KonstituenData from '../../../resources/views/organisasi/konstituen/data/KonstituenData'
import { useDispatch, useSelector } from 'react-redux'
import { getByRelawan, getKonstituen } from '../../model/konstituen/konstituenSlice';
import toast from 'react-hot-toast';

function KonstituenController({ view }) {
    const dispatch = useDispatch();
    const [konstituen, setKonstituen] = useState([]);
    const [pagination, setPagination] = useState([]);

    const profile = JSON.parse(localStorage.getItem('profile'));

    // get data by relawan


    const getDataKonstituen = async() => {
        try {
            const response = await dispatch(getByRelawan(profile.username)).unwrap().catch((err) => {});
            setKonstituen(response.data);
            setPagination(response.pagination);
        } catch (error) {
            
        }
    }

    useEffect(() => {
        getDataKonstituen();
    }, []);

    // pagination
    const handlePagination = (page) => {
        if (page === 0) {
            toast('Anda berapa di halaman pertama', {icon: '🙏'});
        } else if(page === pagination.last_page + 1) {
            toast('Anda berapa di halaman terkahir', {icon: '🙏'});
        } else {
            return getDataKonstituen(page);
        }
    }

    if (view === 'form') {
        return (
            <KonstituenForm />
        )
    } else if (view === 'data') {
        return (
            <KonstituenData 
                konstituen={konstituen}
                pagination={pagination}
                handlePagination={handlePagination}
            />
        )
    }
}

export default KonstituenController
