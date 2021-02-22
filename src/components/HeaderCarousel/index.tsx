import React from 'react'
import { Carousel } from 'react-bootstrap'
import styled from 'styled-components'
import slide01 from '../../assets/images/slide01.png'

// const images = [slide01, slide01, slide01]

const CarouselHeight = 600
const CarouselHeightHigh = 650
const CarouselHeightHighest = 750

const CarouselPets = styled(Carousel)`
    
    & .carousel-inner {
        max-height: ${CarouselHeightHighest}px;
        @media (max-width: 1700px) {
            max-height: ${CarouselHeightHigh}px;
        }
        @media (max-width: 1450px) {
            max-height: ${CarouselHeight}px;
        }
    }
    & > ol {
        margin-bottom: 3rem;
    }
`

const CarouselItem = styled(Carousel.Item)`
    object-fit: cover !important;
`

const SlideImage = styled.img`
    width: 100%;
    object-fit: cover !important;
    height: ${CarouselHeightHighest}px;
    @media (max-width: 1700px) {
        height: ${CarouselHeightHigh}px;
    }
    @media (max-width: 1450px) {
        height: ${CarouselHeight}px;
    }
`

const CarouselCaption = styled(Carousel.Caption)`
    top: 0;
    bottom: 0;
    display: flex;
    flex-flow: column;
    justify-content: center;

    & > h2 {
        text-shadow: 1px 1px #0008;
    }
    & > p {
        text-shadow: 1px 1px #0008;
    }
`

const HeaderCarousel: React.FC = () => {
    return (
        <CarouselPets nextIcon={null} prevIcon={null}>
            <CarouselItem>
                <SlideImage className='d-block img-fluid' src={slide01} alt='' />
                <CarouselCaption>
                    <h2>O MAIOR MARKET PLACE PET DA AMÉRICA LATINA</h2>
                    {/* <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p> */}
                </CarouselCaption>
            </CarouselItem>
        </CarouselPets>
    )
}

export default HeaderCarousel
