import React, { useEffect, useState } from 'react'
import DptChart from '../../../../resources/views/home/dpt/DptChart'
import { useDispatch, useSelector } from 'react-redux'
import { getTotalDpt } from '../../../model/chart/dpt/dptChartSlice';
import { getVotingTotal } from '../../../model/chart/dpt/votingBlockChartSlice';

function DptChartController() {
    const dispatch = useDispatch();
    const [groupKecamatan, setGroupKecamatan] = useState([]);
    const [detail, setDetail] = useState([]);
    const [total, setTotal] = useState([]);
 
    const getDataTotalDpt = async() => {
        try {
            const response = await dispatch(getTotalDpt()).unwrap().catch((err) => {});
            setGroupKecamatan(response.data.map((i) => ({
                name: i.kecamatan,
                y: i.total,
                z: i.total,
                drilldown: i.kecamatan
            })))
            setDetail(response.data.map((i) => ({
                colorByPoint: true,
                name: i.kecamatan,
                id: i.kecamatan,
                data: i.desa.map((j) => ({
                    name: j.name,
                    y: j.total,
                    z: j.total
                }))
            })))
            setTotal(response.total);
        } catch (error) {
            
        }
    }

    useEffect(() => {
        getDataTotalDpt();
    }, []);

    return (
        <DptChart 
            groupKecamatan={groupKecamatan}
            detail={detail}
            total={total}
        />
    )
}

export default DptChartController
