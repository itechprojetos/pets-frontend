import React, { useEffect, useState } from 'react'

import './styles.scss'

export interface AutocompleteOption {
    id: number
    name: string
}

interface Props {
    className?: string
    placeholder?: string
    options: AutocompleteOption[]
    onOptionSelected?: (option: AutocompleteOption) => void
    value?: string
    onChange?: (text: string) => void
}

const Autocomplete: React.FC<Props> = ({
        className, placeholder,
        options, onOptionSelected,
        value, onChange
    }) => {

    const [showDropdown, setShowDropdown] = useState(false)

    useEffect(() => {
        document.addEventListener('click', e => {
            setShowDropdown(false)
        })
    })

    const handleOptionSelected = (option: AutocompleteOption) => {
        if (onOptionSelected) {
            onOptionSelected(option)
        }
        setShowDropdown(false)
    }

    const handleValueOnChange = (text: string) => {
        if (onChange) {
            onChange(text)
        }
        if (options.length > 0) {
            setShowDropdown(true)
        }
    }

    return (
        <div className="fb-autocomplete">
            <input className={['', className ? className : ''].join(' ')} aria-label=""
                   placeholder={placeholder || ''}
                   value={value}
                   onChange={e => handleValueOnChange(e.target.value)}
            />
            {showDropdown && <div className="fb-autocomplete-dropdown">
                {options.map((option, index) => (
                    <div key={index} className="fb-autocomplete-dropdown-item" onClick={() => handleOptionSelected(option)}>
                        {option.name}
                    </div>
                ))}
            </div>}
        </div>
    )
}

export default Autocomplete
