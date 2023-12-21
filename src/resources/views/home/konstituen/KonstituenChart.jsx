import React from 'react'
import Home from '../Home'
import BarChartKonstituen from './BarChartKonstituen'

const KonstituenChart = ({
    groupKecamatan, total
}) => {
    return (
        <Home>
            <div>
                <div className="card">
                    <div className="card-body">
                        <BarChartKonstituen total={total} title={'GRAFIK KONSTITUEN'} data={groupKecamatan} />
                    </div>
                </div>
            </div>
        </Home>
    )
}

export default KonstituenChart
