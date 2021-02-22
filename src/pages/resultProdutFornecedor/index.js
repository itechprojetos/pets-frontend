import React, { /*useEffect*/ } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ProductActions } from '../../store/actions/product'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import Image from '../../assets/images/destaque1.png'
//import { Spinner } from 'react-bootstrap'

//import usePaginatedFetch from '../../hooks/usePaginatedFetch'
//import PaginatedContent from '../../components/PaginatedContent'

// import {
//     useParams
// } from "react-router-dom"

//import CardItem from '../../components/CardItem'

function ResultProductFornecedor({ highlights, getHighlights }) {
    //const { id } = useParams()

    // useEffect(() => {
    //     getHighlights()
    // }, [getHighlights])

    return (
        <div className="container">
            <p className="my-3">Home / Resultado da busca: Alimentos Saudavei / Lorem </p>
            <div className="row mb-3">
                <div className="col-12 col-md-6 col-sm-12">
                    <img src={Image} className="img-fluid" alt="" />
                    <br/>
                    <div className="row mt-3">
                        { 
                            [1,2,3,4].map((e, i) => (
                                <img className="mr-2" src={Image} width="120" alt={i}/>
                            ))
                        }
                    </div>
                </div>
                <div className="col-12 col-md-6 col-sm-12">
                    <div>
                        <FontAwesomeIcon icon={faStar} size="sm" className={`mr-1 container-item-rate`} color="#ffc800" />
                        <FontAwesomeIcon icon={faStar} size="sm" className={`mr-1 container-item-rate`} color="#ffc800" />
                        <FontAwesomeIcon icon={faStar} size="sm" className={`mr-1 container-item-rate`} color="#ffc800" />
                        <FontAwesomeIcon icon={faStar} size="sm" className={`mr-1 container-item-rate`} color="#ffc800" />
                        <FontAwesomeIcon icon={faStar} size="sm" className={`mr-1 container-item-rate`} />
                    </div>
                   <h2>Lorem ipsum dolor sit amet consectetur, adipisicinuia.</h2>
                   <small>a partir de</small>
                   <p className="text-warning h3 mb-3" ><b>R$ 92,00</b></p>
                   <p className="mb-4">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                        Aliquid repellendus dolores nihil corrupti autem non modi 
                        inventore nulla ipsa, neque eos molestias minima repudiandae. 
                        Voluptate consequuntur assumenda quo eius repudiandae.
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                        Aliquid repellendus dolores nihil corrupti autem non modi 
                        inventore nulla ipsa, neque eos molestias minima repudiandae. 
                        Voluptate consequuntur assumenda quo eius repudiandae.
                        <br/>
                        <br/>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                        Aliquid repellendus dolores nihil corrupti autem non modi 
                        inventore nulla ipsa, neque eos molestias minima repudiandae. 
                        Voluptate consequuntur assumenda quo eius repudiandae.
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                        Aliquid repellendus dolores nihil corrupti autem non modi 
                        inventore nulla ipsa, neque eos molestias minima repudiandae. 
                        Voluptate consequuntur assumenda quo eius repudiandae.
                   </p>

                    <div className="row">
                        <div className="border border-warning rounded d-flex align-items-center p-1 mr-2" >
                            <button className="btn" >-</button>
                            <p className="text-center mx-1" >1</p>
                            <button className="btn" >+</button>
                        </div>
                        <button className="btn btn-lg btn-warning text-white">COMPRAR</button>
                    </div>        
                </div>
            </div>

                <div 
                    className="row col-12 px-2 py-3 shadow-lg bg-white" 
                    style={{ marginBottom: '-18px'}} 
                >
                    <div className="col-12 col-sm-12 col-md-6" >
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                            Perspiciatis quos excepturi at neque modi, possimus quas 
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                            Perspiciatis quos excepturi at neque modi, possimus quas 
                            Perspiciatis quos excepturi at neque modi, possimus quas 
                            <br />
                            <br />
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                            Perspiciatis quos excepturi at neque modi, possimus quas 
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                        </p>
                    </div>

                    <div className="col-12 col-sm-12 col-md-6 mt-3 mt-md-0 mt-lg-0" >
                        <h5>CERTIFICAÇÕES</h5>
                        <p className="mb-2">ISO 9002</p>
                        
                        <h5>ENDERECO</h5>
                        <p className="mb-2">
                            orem ipsum dolor sit amet, consectetur adipisicing elit.
                            Perspiciatis quos excepturi at neque modi, possimus quas
                        </p>
                        <small>Ver no mapa</small>
                    </div>
        
                </div>   
   
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        highlights: state.product.productStatus.highlights
    }
}

const mapDispatchToProps = (dispatch) => 
    bindActionCreators({ ...ProductActions }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(ResultProductFornecedor)
