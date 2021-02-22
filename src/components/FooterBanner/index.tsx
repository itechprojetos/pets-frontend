import React from 'react'

import './styles.scss'

interface Props {

}

const FooterBanner: React.FC<Props> = () => {
    return (
        <div className="footer-banner d-flex flex-column align-items-center position-relative">
            <img className="footer-banner-img" src={require('../../assets/images/banner_bottom.jpg')} alt=""/>
            <img className="footer-banner-pets" src={require('../../assets/images/pets_above_banner.png')} alt=""/>
        </div>
    )
}

export default FooterBanner
