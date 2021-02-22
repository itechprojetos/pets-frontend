import React from 'react'

import './styles.scss'

interface Props {
    className?: string
}

const SimpleLoading: React.FC<Props> = ({className}) => {
    return (
        <div className={['loader', className ? className : ''].join(' ')}/>
    )
}

export default SimpleLoading
