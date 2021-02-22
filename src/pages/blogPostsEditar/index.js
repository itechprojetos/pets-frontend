import React, { /*useEffect*/ } from 'react'

import './styles.css'

import {
    useParams
} from "react-router-dom"

import { connect } from 'react-redux'
import { getPostBySlug, putBlogRequest } from '../../store/actions/blog'

import FormBlog from '../../components/formBlog'
import usePost from '../blogPostView/usePost'
import { Spinner } from 'react-bootstrap'

function BlogLogin({ loadData, data, putBlogRequest }) {

    const { slug } = useParams()

    const post = usePost(slug)

    // useEffect(() => {
    //     loadData(slug)
    // }, [loadData])

    if (post.loading) {
        return <div className='loader-spinner'>
            <span>Carregando o conteúdo do post...</span>
            <Spinner animation="border" />
        </div>
    }

    return (
        <div className="container">
            <FormBlog titlePage={data.title} functionButton={putBlogRequest} data={post.data} />
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        data: state.blog.blogStatus.formDados
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadData: (slug) => dispatch(getPostBySlug(slug)),
        putBlogRequest: (data) => dispatch(putBlogRequest(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BlogLogin)


// Imgs referentes

// import bold from '../../assets/ico/bold.png'
// import italic from '../../assets/ico/italic.png'
// import underline from  "../../assets/ico/underline.png"
// import listab from "../../assets/ico/listab.svg"
// import listaNumero from "../../assets/ico/lista-numbero.svg" 
// import left from "../../assets/ico/left.svg" 
// import centerAlign from"../../assets/ico/center.svg" 
// import rightAlign from"../../assets/ico/right.svg" 
// import justifyAlign from"../../assets/ico/justify.svg" 
// import anexo from "../../assets/ico/anexo.svg"

// const alteraFormatacao = (params) => {
//     return document.execCommand(params)
// }

// editor de texto
// <div className="editor-conteudo">
// <label htmlFor="">Descrição Completa</label>
// <div className="icones-editor">
//     <img onClick={() => alteraFormatacao('bold')}  width="40" src={bold} alt="Bold"/>
//     <img onClick={() => alteraFormatacao('italic')} width="40" src={italic} alt="Italic"/>
//     <img onClick={() => alteraFormatacao('underline')} width="40" src={underline} alt="underline"/>
//     <img onClick={() => alteraFormatacao('insertUnorderedList')} width="40" src={listab} alt="Bold"/>
//     <img width="40" src={listaNumero} alt="Bold"/>
//     <img onClick={() => alteraFormatacao('justifyLeft')} width="40" src={left} alt="esquerda"/>
//     <img onClick={() => alteraFormatacao('justifyCenter')} width="40" src={centerAlign} alt="Centro"/>
//     <img onClick={() => alteraFormatacao('justifyRight')} width="40" src={rightAlign} alt="Direita"/>
//     <img onClick={() => alteraFormatacao('justifyFull')} width="40" src={justifyAlign} alt="Justificar"/>
//     <img width="40" src={anexo} alt="Bold"/>
// </div>
// <div className="content-editor" data-editor contenteditable="true" ></div>
// </div>