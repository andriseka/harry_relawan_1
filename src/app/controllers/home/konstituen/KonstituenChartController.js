import React, { useEffect, useState } from 'react'
import KonstituenChart from '../../../../resources/views/home/konstituen/KonstituenChart'
import { useDispatch } from 'react-redux';
import { getTotalKonstituen, getTotalKonstituenCode } from '../../../model/chart/konstituen/konstituenChartSlice';

function KonstituenChartController() {
    const dispatch = useDispatch();
    const [groupKecamatan, setGroupKecamatan] = useState([]);
    const [total, setTotal] = useState([]);
    const profile = JSON.parse(localStorage.getItem('profile'));
 
    const getDataTotalKonstituen = async(code) => {
        try {
            const response = await dispatch(getTotalKonstituenCode(code)).unwrap().catch((err) => {});
            setGroupKecamatan(response.data.map((i) => ({
                name: i.desa,
                y: i.total,
                z: i.total,
            })))
            setTotal(response.total);
        } catch (error) {
            
        }
    }

    useEffect(() => {
        const profileCode = profile.code;
        const explode = profileCode.split('.');
        if (profile.jabatan === 'korcam') {
            const code = explode[0];
            getDataTotalKonstituen(code);
        } else {

        }
    }, []);
    return (
        <KonstituenChart 
            groupKecamatan={groupKecamatan}
            total={total}
        />
    )
}

export default KonstituenChartController
