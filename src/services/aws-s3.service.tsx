import AWS from 'aws-sdk'
import { ManagedUpload } from 'aws-sdk/lib/s3/managed_upload'
import { v4 as uuidv4 } from 'uuid'
import { fileExtension } from '../shared'

// import S3FileUpload from 'react-s3'
//@types/react-s3
class AwsS3Service {

    public upload(file: File, filePath: string): Promise<string> {
        return new Promise(((resolve, reject) => {

            AWS.config.credentials = new AWS.Credentials(
                'AKIAJVEAMWOP3QEVKCHA',
                'Rd4wVy5yw7g5GQxQGgJeggKk5RyzIojslAuBnjn6'
            )

            // AWS.config.credentials = new AWS.Credentials(
            //     'AKIAIZ2IDM2N3SFK3K7A',
            //     'G3wHrfy1d/OtRWD2UrxqNDdLv2XO68ZCOK2PBRi6'
            // )

            const ext = fileExtension(file)
            const filename = `${uuidv4()}.${ext}`

            const s3 = new AWS.S3()

            // s3.listBuckets(((err, data) => {
            //     if (err) {
            //         console.log(err)
            //     }
            //     if (data) {
            //         console.log(data)
            //     }
            // }))

            const key = `pets/${filePath}${filename}`
            const uploadParams = {Bucket: 'wbctech-files', Key: key, Body: file, ACL: 'public-read'}

            s3.upload(uploadParams, ((err: Error, data: ManagedUpload.SendData) => {
                if (err) {
                    reject(err)
                }
                if (data) {
                    resolve(data.Location)
                }
            }))
        }))
    }

}

export default new AwsS3Service()
