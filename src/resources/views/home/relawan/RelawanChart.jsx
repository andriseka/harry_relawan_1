import React from 'react';
import Home from '../Home'
import BarChartRelawan from './BarChartRelawan';

const RelawanChart = ({
    groupKecamatan, total
}) => {
    return (
        <Home>
            <div>
                <div className="card">
                    <div className="card-body">
                        <BarChartRelawan title={'GRAFIK RELAWAN'} data={groupKecamatan} total={total} />
                    </div>
                </div>
            </div>
        </Home>
    )
}

export default RelawanChart
