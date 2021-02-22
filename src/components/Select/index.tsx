import React, { useEffect, useState } from 'react'

import './styles.scss'

interface OptionProps {
    className?: string
    children: string
    onSelected: (value: string) => void
}

export const SelectOption: React.FC<OptionProps> = ({
        className,
        children,
        onSelected
    }) => {
    return (
        <div className={['fb-select-options-option', className ? className : ''].join(' ')}
             onClick={() => onSelected(children)}>
            {children}
        </div>
    )
}

interface Props {
    className?: string
    // @ts-ignore
    children: SelectOption[] | SelectOption
    value?: string
}

const Select: React.FC<Props> = ({
    className,
    children,
    value}) => {

    useEffect(() => {
        setShow(false)
    }, [value])

    document.addEventListener('click', e => {
        if ((e as any).target.className !== 'fb-select-options-button') {
            setTimeout(() => {
                setShow(false)
            }, 100)
        }
    })

    const [show, setShow] = useState(false)

    return (
        <div className={['fb-select-options', className ? className : ''].join(' ')}>
            <input className="form-control" aria-label="" value={value} onChange={() => {}}/>
            <button className="fb-select-options-button" type="button" onClick={() => setShow(!show)}/>
            <img className="fb-select-options-arrow" src={require('../../assets/images/down-arrow.png')} alt=""/>
            {show && <div className="fb-select-options-options">
                {Array.isArray(children) ? children.map(i => i) : children}
            </div>}
        </div>
    )
}


export default Select
