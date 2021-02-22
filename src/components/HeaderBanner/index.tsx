// import { faCommentDollar, faMobileAlt, faSearch, faStar } from '@fortawesome/free-solid-svg-icons'
// import { MdStar } from 'react-icons/md';
// import { FaMobileAlt, FaSearch, FaCommentDollar } from 'react-icons/fa';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Container } from 'react-bootstrap'
import styled from 'styled-components'
import Mobile from '../../assets/icons/icone-celular.svg'
import Star from '../../assets/icons/icone-estrela.svg'
import Lupa from '../../assets/icons/icone-lupa.svg'
import BalaoDolar from '../../assets/icons/icone-balao.svg'


import './styles.scss'

const Banner = styled.div`
    background-color: #303030;
    color: white;
    padding: 16px 14px;
    display: flex;
    font-size: 0.75rem;
    justify-content: space-between;
    margin-top: -52px;
    z-index: 1000 !important;
    @media (max-width: 780px) {
        display: none;
    }
`

const BannerItem = styled.div`
    max-width: 23%;
`

const BannerItemText = styled.div`
    display: flex;
    flex-flow: column;
    margin-left: 0.7rem;

    .title{
        font-family: 'Lato';
        font-weight: bold;
    }

    .description{
        font-family: 'Lato';
        font-size: 14px;
        line-height: 15px;
    }
`

const items = [
    {
        // icon: <FaSearch size={40}/>,
        icon: <img src={Lupa} alt="lupa" />,
        title: 'ENCONTRE',
        description: 'Produtos e serviços para o seu animalzinho'
    },
    {
        // icon: <FaCommentDollar size={50}/>,
        icon: <img src={BalaoDolar} alt="balao" />,
        title: 'CONTRATE',
        description: 'Rápido e com total segurança, clicou contratou!'
    },
    {
        // icon: <MdStar size={50}/>,
        icon: <img src={Star} alt="star" />,
        title: 'QUALIFIQUE',
        description: 'Seu feedbackdos serviços nos ajuda a melhorar'
    },
    {
        // icon: <FaMobileAlt size={40}/>,
        icon: <img src={Mobile} alt="mobile" />,
        title: 'EM QUALQUER LUGAR',
        description: 'Utilizando nosso APP você acessa de onde estiver'
    }
]

const HeaderBanner: React.FC = () => {
    return (
        <Container className="header-banner-container">
            <Banner>
                {items.map((item, index) => (
                    <BannerItem key={index} className="d-flex align-items-center">
                        <span>{item.icon}</span>
                        {/* <FontAwesomeIcon icon={item.icon} color='white' size='3x'/> */}
                        <BannerItemText>
                            <span className="title">{item.title}</span>
                            <span className="description">{item.description}</span>
                        </BannerItemText>
                    </BannerItem>
                ))}
            </Banner>

        </Container>

    )
}

export default HeaderBanner
