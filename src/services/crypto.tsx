import SimpleCrypto from 'simple-crypto-js'

const secretKey = '6teyG2F27qPCF8K4ddhe6kge34h2VU9tz6kskdf5YUcxdd76'

export const encrypt = (obj: any): string => {
    const simpleCrypto = new SimpleCrypto(secretKey)
    return simpleCrypto.encryptObject(obj)
}

export const decrypt = (encrypted: string): any => {
    const simpleCrypto = new SimpleCrypto(secretKey)
    return simpleCrypto.decryptObject(encrypted)
}
