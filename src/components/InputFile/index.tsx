import React from 'react'

import './styles.scss'
import { HTMLInputEvent } from '../../shared'

interface Props {
    className?: string
    placeholder?: string
    onFileChosen?: (file: File, dataBase64: string) => void
    value?: string
}

const InputFile: React.FC<Props> = ({className, placeholder, onFileChosen, value}) => {

    const chooseFile = () => {
        const ele = document.getElementById('input-file-element')
        if (ele) {
            ele.click()
        }
    }

    const handleFileChosen = (e: any) => {
        const event = e as HTMLInputEvent
        const reader = new FileReader()
        if (event.target && event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0]
            reader.onload = (e: any) => {
                const key = 'result'
                // this.imageSrc = e.target[key];
                // this.auth.storeUser()
                const result = e.target[key]
                console.log('result: ', file)
                if (result && onFileChosen) {
                    // file.extension = file.name.substring(file.name.lastIndexOf(".") + 1)
                    // theFile.dataBase64 = result
                    onFileChosen(file, result)
                }
                // const value = result.split(",")[1];
                // this.form.get("foto").setValue({
                //     nome: file.name,
                //     mimeType: file.type,
                //     extencao: file.name.substring(file.name.lastIndexOf(".") + 1),
                //     dataBase64: value
                // });
            }
            // reader.re
            reader.readAsDataURL(file)
        }
    }

    return (
        <>
            <input type="file" accept="image/*" id="input-file-element" className="input-file-file"
                   onChange={handleFileChosen}/>
            <input className={['form-control', className ? className : ''].join(' ')} aria-label=""
                   value={value || ''}
                   onChange={() => {
                   }}
                   placeholder={placeholder || ''}/>
            <button type="button" className="input-file-button" onClick={chooseFile}/>
        </>
    )
}

export default InputFile
