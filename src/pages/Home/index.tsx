import React, { useEffect, useContext } from 'react'
import { bindActionCreators } from 'redux'
import { connect, /*useSelector*/ } from 'react-redux'
import { Container } from 'react-bootstrap'

import HeaderBanner from '../../components/HeaderBanner'
import HeaderCarousel from '../../components/HeaderCarousel'
//import CardItem from '../../components/CardItem'
import CardAroundAnimals from '../../components/CardAroundAnimals'

import CardBlogPosts from '../../components/cardHomeBlog'
import Newsletter from '../../components/Newsletter'

//import CardVideoItem from '../../components/CardVideoItem'
//import { Product } from '../../models/Product'

import { getPostsBlogRequest } from '../../store/actions/blog'
import { CustomerActions } from '../../store/actions/customer'
import { PetsActions } from '../../store/actions/pets'
import { ProductActions } from '../../store/actions/product'

import { Pet } from '../../models/Pet'
import { Customer } from '../../models/Customer'
import { Blog } from '../../models/Blog'
import { ProfessionalService } from '../../models/ProfessionalService'

import './styles.scss'
import { Video } from '../../models/Video'
import { VideoActions } from '../../store/actions/video'

// Images 
import CatImg from '../../assets/images/cat.png'
import DogImg from '../../assets/images/dog.png'
import noPhoto from '../../assets/images/no-photo.png'
import Plus from '../../assets/icons/plus.svg'

// Pagination
import usePaginatedFetch from '../../hooks/usePaginatedFetch';
import PaginatedContent from '../../components/PaginatedContent';
import useImage from '../../hooks/useImage'
import { Link } from 'react-router-dom'
import history from '../../routes/history'
import useFavoritableItem from '../../hooks/useFavoritableItem'
import AuthenticationContext from '../../contexts/Authentication/AuthenticationContext'
import ProfessionalServiceCardList from '../../components/ProfessionalServiceCardList'

import Breeds from '../../assets/data/breeds'
import BreedFilter from '../../components/BreedFilter'
import styled from 'styled-components'

const DogBreeds = Breeds.filter(breed => breed.breedtypeid === 1).slice(0, 4).map(breed => ({ ...breed, image: require(`../../assets/images/breeds/dogs/${breed.breedname}.jpg`) }))
const CatBreeds = Breeds.filter(breed => breed.breedtypeid === 2).slice(0, 4).map(breed => ({ ...breed, image: require(`../../assets/images/breeds/cats/${breed.breedname}.jpg`) }))

type Item = {
    customername: string;
    professionalService: ProfessionalService;
}

interface Props {
    highlights: Item[]
    getHighlights: () => void
    videosHighlight: Video[]
    getVideoHighlights: () => void
    petsGetAllUser: () => void
    userPets: Pet[]
    customerGet: () => void
    customer: Customer
    posts: Blog[]
    getPostsBlogRequest: () => void
}

const BreedsContainer = styled.div`
    display: grid;
    grid-gap: 1em;
    padding: .75em;
    grid-template-columns: 1fr;
    & > div:last-of-type {
            margin-top: 1em;
        }
    @media screen and (min-width: 800px) {
        grid-template-columns: 1fr 1fr;
        & > div:last-of-type {
            margin-top: 0;
        }
    }
`

const Home: React.FC<Props> = ({
    // customerGet,
    // customer,
    userPets,
    petsGetAllUser,
    highlights,
    getHighlights,
    videosHighlight,
    getVideoHighlights,
    posts,
    getPostsBlogRequest
}) => {
    const { customer } = useContext(AuthenticationContext)
    const dadosProfessional1 = usePaginatedFetch('/services/app/ProfessionalServices/GetAll', 8)
    const dadosProfessional2 = usePaginatedFetch('/services/app/ProfessionalServices/GetAll', 8)

    useEffect(() => {
        getHighlights()
    }, [getHighlights])

    useEffect(() => {
        getVideoHighlights()
    }, [getVideoHighlights])

    useEffect(() => {
        if (customer != null) {
            petsGetAllUser()
        }
    }, [petsGetAllUser, customer])

    // useEffect(() => {
    //     customerGet()
    // }, [customerGet])

    useEffect(() => {
        getPostsBlogRequest()
    }, [getPostsBlogRequest])



    const dadosPosts = posts.reverse().slice(0, 3).map(e => Object.values(e))

    let customerOff = false

    if (customer == null) {
        customerOff = true
    } else {
        customerOff = false
    }

    return (
        <>
            <HeaderCarousel />
            <HeaderBanner />
            <Container>
                <div className="mt-4" hidden={customerOff}>
                    <h5>MEUS PETS</h5>
                    <div className="row col-12 mt-2">
                        {
                            userPets.map(e => (
                                <Link to={`/profile/edit-my-pet/${e.id}`}>
                                    <div key={e.id}>
                                        <div className="pet-image m-2">
                                            <img
                                                src={e.url_image ? e.url_image : require('../../assets/images/dog.png')}
                                                alt="" />
                                        </div>
                                        <div className="text-center">{e.name}</div>
                                    </div>
                                </Link>
                            ))
                        }
                        <div className="containerBtn d-flex flex-column justify-content-end align-items-center">
                            <button className="btn-circle btn-xl btn-warning" onClick={() => {
                                history.push('/profile/add-my-pet')
                                window.scrollTo(0, 0)
                            }}>
                                <img src={Plus} alt="btn adote novo pet" width="40" />
                            </button>
                            <div className="text-center"><b>Add novo pet</b></div>
                        </div>
                    </div>
                </div>
                <div className="block-items-container">
                    <h5>DESTAQUES</h5>
                    <div className="row">
                        {/* HIGHLIGHTS */}
                        {/*highlights.map((product, index) => <CardItem key={index} professional={product.professionalService}/>)*/}
                        <PaginatedContent
                            paginatedFetch={dadosProfessional1}
                        >
                            {/* <div className="professional-services-cards">
                                {
                                    dadosProfessional1.data.map((ele, index) =>
                                        <ProfessionalItem key={ele.professionalService.id} professional={ele} />
                                    )
                                }
                            </div> */}
                            <ProfessionalServiceCardList loading={dadosProfessional1.loading} loadingCount={8} services={dadosProfessional1.data} />
                        </PaginatedContent>
                    </div>
                </div>
                <div className="col-12 p-5 border border bg-white mb-4 mt-2" />
                <div className="block-items-container">
                    <h5>NOSSO BLOG</h5>
                    <div className="row">
                        {/* BLOG VIDEOS */}
                        {dadosPosts.map((video, index) => <CardBlogPosts key={index} dados={video} />)}
                    </div>
                </div>

                <div className="col-12 p-5 border border bg-white mb-4 mt-3" />

                <div className="d-none row mb-4">
                    <div className="col-12 col-md-6 ">
                        <h5>Marcas parceiras</h5>
                        <div className="row mt-2">
                            {
                                ['A', 'B', 'C', 'D'].map(e => {
                                    return (
                                        <div key={e} className="bg-danger mt-2 p-5 col-6 col-md-3" >
                                            {e}
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>

                    <div className="col-12 col-md-6 ">
                        <h5>Marcas parceiras</h5>
                        <div className="row mt-2">
                            {
                                ['A', 'B', 'C', 'D'].map(e => {
                                    return (
                                        <div key={e} className="bg-danger mt-2 p-5 col-6 col-md-3" >
                                            {e}
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>

                <BreedsContainer className="row">
                    <div>
                        <BreedFilter breedType={1} />
                    </div>
                    <div>
                        <BreedFilter breedType={2} />
                    </div>
                </BreedsContainer>

                <div className="block-items-container mt-4">
                    <h5>MAIS VISTOS</h5>
                    <div className="row">
                        {/* HIGHLIGHTS */}
                        {/*highlights.map((product, index) => <CardItem key={index} professional={product.professionalService}/>)*/}

                        <PaginatedContent
                            paginatedFetch={dadosProfessional2}
                        >
                            <ProfessionalServiceCardList loading={dadosProfessional2.loading} loadingCount={8} services={dadosProfessional2.data} />
                        </PaginatedContent>
                    </div>
                </div>
                <Newsletter />
            </Container>
        </>
    )
}


const mapStateToProps = (state: any) => ({
    highlights: state.product.productStatus.highlights,
    videosHighlight: state.video.videoStatus.videosHighlight,
    userPets: state.pets.petsStatus.userPets,
    customer: state.customer.customerStatus.customer,
    posts: state.blog.blogStatus.posts,
})

const mapDispatchToProps = (dispatch: any) =>
    bindActionCreators({ ...ProductActions, ...PetsActions, ...VideoActions, ...CustomerActions, getPostsBlogRequest }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Home)
