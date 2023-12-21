import React from 'react'

const GridCols2 = ({ children }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            { children }
        </div>
    )
}

export default GridCols2
