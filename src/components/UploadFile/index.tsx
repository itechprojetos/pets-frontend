import React, { useState } from 'react'
import './styles.scss'
import { faUpload } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { toast } from 'react-toastify'

/** aws S3 */
import AwsS3Service from '../../services/aws-s3.service'

interface Props {
    localImage: string;
}


const UploadFile: React.FC<Props> = ({localImage}) => {

    // console.log('locale', localImage)

    const [file, setFile] = useState<any>([])

    const handleChange = ( e : any) => {
        // console.log('uploadFile', e.target.files);
        setFile(e.target.files[0])
    }

    const handleSubmit = async ( e : any) => {
        e.preventDefault();
        e.target.reset();

        try{
        
            const response = await AwsS3Service.upload(file, localImage)
            toast.success('Upload realizado com sucesso...');

        }catch(err){
            toast.error('Falha ao realizar o upload...');
        }
    }

    // console.log('aquiFile', file)

    return(
        <div className="container-upload">
            <div className="content-upload">
                <form onSubmit={handleSubmit}>
                    <span>
                        <FontAwesomeIcon icon={faUpload} size="xs" style={{marginRight: '5px'}}/>
                        Faça o upload dos arquivos abaixo...
                    </span>
                    <input type="file"  id="files" name="files" onChange={handleChange} multiple/>
                    <button type="submit">Enviar</button>
                </form>
            </div>
        </div>

    );

}

export default UploadFile