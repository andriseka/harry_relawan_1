import React, { useEffect, useState } from 'react'
import RelawanChart from '../../../../resources/views/home/relawan/RelawanChart'
import { useDispatch } from 'react-redux';
import { getTotalRelawan, getTotalRelawanCode } from '../../../model/chart/relawan/relawanChartSlice';

function RelawanChartController() {
    const dispatch = useDispatch();
    const [groupKecamatan, setGroupKecamatan] = useState([]);
    const [detail, setDetail] = useState([]);
    const profile = JSON.parse(localStorage.getItem('profile'));
    const [total, setTotal] = useState([]);
 
    const getDataTotalRelawan = async(code) => {
        try {
            const response = await dispatch(getTotalRelawanCode(code)).unwrap().catch((err) => {});
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
            getDataTotalRelawan(code);
        } else {

        }
    }, []);

    return (
        <RelawanChart 
            groupKecamatan={groupKecamatan}
            total={total}
        />
    )
}

export default RelawanChartController
