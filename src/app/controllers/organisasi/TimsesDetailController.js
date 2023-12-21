import React, { useEffect, useState } from 'react'
import TimsesDataDetail from '../../../resources/views/organisasi/timses/data/TimsesDataDetail'
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getTimsesDetail } from '../../model/timses/timsesSlice';

const TimsesDetailController = () => {
    const dispatch = useDispatch();
    const { timses } = useParams();

    const [detail, setDetail] = useState([]);

     // get data detail
     const getDataTimsesDetail = async() => {
        try {
            const response = await dispatch(getTimsesDetail(timses)).unwrap().catch((err) => {});
            setDetail(response.data);
        } catch (error) {
            
        }
    }

    useEffect(() => {
        getDataTimsesDetail();
    }, []);

    return (
        <TimsesDataDetail 
            detail={detail}
        />
    )
}

export default TimsesDetailController
