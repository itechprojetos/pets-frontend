import React, { /*useEffect*/ } from 'react'
import { connect } from 'react-redux'
import { Container, Spinner } from 'react-bootstrap'
import ReactMarkdown from 'react-markdown'

import { getPostBySlug } from '../../store/actions/blog'
//import CardBlogPosts from '../../components/cardHomeBlog'
import Newsletter from '../../components/Newsletter'

import {
    useParams
} from "react-router-dom"

//import Img from '../../assets/images/retrato.jpg'

import fbIcon from '../../assets/images/facebook.svg'
import GPIcon from '../../assets/images/google-plus.svg'
import TwIcon from '../../assets/images/twitter.svg'
import WppIcon from '../../assets/images/whatsapp.svg'
import usePost from './usePost'
//import usePaginatedFetch from '../../hooks/usePaginatedFetch'
//import PaginatedContent from '../../components/PaginatedContent'

const PostUnico = () => {

    const { post } = useParams()

    const { data, loading /*errored*/ } = usePost(post)

    // const morePosts = usePaginatedFetch('/services/app/Posts/GetAll', 4)

    if (loading) {
        return <div className='loader-spinner'>
            <span>Carregando o conteúdo do post...</span>
            <Spinner animation="border" />
        </div>
    }

    function dataFormat() {
        let format_data = data.publishDate
        // let format_data = '2020-03-16T00:00:00'
        format_data = format_data.toString().substr(0, 10)

        let ano = format_data.substr(0, 4)
        let mes = format_data.substr(5, 2)
        let dia = format_data.substr(8, 10)

        return `${dia}/${mes}/${ano}`
    }

    // const dadosPosts = posts.reverse().slice(0, 3).map(e => Object.values(e))
    console.log('dados view post: ', data)
    return (

        <Container>
            <div className="col-12 col-sm-12 mb-5">
                <h1 className="mt-4" >{data.title}</h1>
                <small className="ml-2">Publicado em: {dataFormat()}</small>

                <div className="m-2 mb-5">
                    <ReactMarkdown
                        className="react-markdown"
                        escapeHtml={false}
                        source={data.text}
                    />
                </div>

                <p className="h6 m-2 mb-2">COMPARTILHE ESSA NOVIDADE NAS SUAS REDES SOCIAIS</p>
                <div>
                    <a href="##" className="m-2 h2">
                        <img src={fbIcon} width="40" alt="" />
                    </a>
                    <a href="##" className="m-2 h2">
                        <img src={TwIcon} width="40" alt=""/>
                    </a>
                    <a href="##" className="m-2 h2">
                        <img src={GPIcon} width="40" alt=""/>
                    </a>
                    <a href="##" className="m-2 h2">
                        <img src={WppIcon} width="40" alt=""/>
                    </a>
                    <a href="##" className="m-2 h2">
                        <img src={fbIcon} width="40" alt=""/>
                    </a>
                </div>
            </div>

            <div className="col-12">
                {/* <div className="block-items-container"> */}
                {/* <p className="ml-4 h3" >MAIS NOVIDADES</p> */}
                {/* <div className="row"> */}
                {/* <PaginatedContent
                        currentPage={morePosts.page}
                        loading={morePosts.loading}
                        onNextPage={morePosts.navigateToNextPage}
                        onPreviousPage={morePosts.navigateToPreviousPage}
                        onPageClick={morePosts.navigateToPage}
                        totalPages={morePosts.pagesCount}
                    >
                        {
                            morePosts.data.map((e, index) =>
                                <CardResumo
                                    key={e.post.id}
                                    data={e.post}
                                    // showConfig={true} 
                                    deleteBtn={deletePost}
                                    showConfig={verfifyAdm(dados)}
                                />
                            )
                        }
                    </PaginatedContent> */}
                {/* BLOG VIDEOS */}
                {/* {dadosPosts.map((video, index) => <CardBlogPosts key={index} dados={video} />)} */}
                {/* </div> */}
                {/* </div> */}

                <div className="row mt-2">
                    <div className="col-12 p-5 border border bg-white mb-4" />
                    <Newsletter />
                </div>
            </div>
        </Container>

    )
}

const mapStateToProps = (state) => ({
    videosHighlight: state.video.videoStatus.videosHighlight,
    data: state.blog.blogStatus.formDados,
    posts: state.blog.blogStatus.posts
})

const mapDispatchToProps = (dispatch) => {
    return {
        loadData: (slug) => dispatch(getPostBySlug(slug))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(PostUnico)
