import React, { useState, useEffect } from 'react'

import Editor from 'for-editor'
import defaultImg from '../../assets/images/default.jpg'
import trash from "../../assets/ico/trash.png"
import awsS3Service from '../../services/aws-s3.service'
import { Spinner } from 'react-bootstrap'

function FormBlog({ titlePage, functionButton, data }) {


    const [state, setState] = useState({
        id: '',
        slug: '',
        title: '',
        text: '',
        author: '',
        url_media: '',
        url_image1: defaultImg,
        url_image2: defaultImg,
        publishDate: '',
    })
    const [thumbLoading, setThumbLoading] = useState(false)

    const mascaraSlug = (val) => {
        let texto = val
        texto = texto.replace(" ", "-")
        texto = texto.replace(/[^a-z0-9-]/gi, "");
        return texto.toLocaleLowerCase()
    }

    const handleState = (dados) => {
        switch (dados.state) {
            case 'title':
                setState({ ...state, title: dados.value })
                return
            case 'text':
                setState({ ...state, text: dados.value })
                return
            case 'slug':
                let finaltxtSlug = mascaraSlug(dados.value)
                setState({ ...state, slug: finaltxtSlug })
                return
            case 'author':
                setState({ ...state, author: dados.value })
                return
            case 'url_media':
                setState({ ...state, url_media: dados.value })
                return
            default:
                return;
        }
    }

    const formFunction = (evt) => {
        evt.preventDefault()
        // console.log(evt.preventDefault)
        functionButton(state)
        setState({
            id: '',
            slug: '',
            title: '',
            text: '',
            author: '',
            url_media: '',
            url_image1: defaultImg,
            url_image2: defaultImg,
            publishDate: null,
        })
    }

    useEffect(() => {
        if (data !== undefined) {
            setState({
                id: data.id,
                slug: data.slug,
                title: data.title,
                text: data.text,
                url_media: data.url_media,
                author: data.author,
                url_image1: data.url_image1 || defaultImg,
                url_image2: data.url_image2 || defaultImg,
                publishDate: data.publishDate
            })
        }
    }, [data])

    // const showImgInput = (idCampo, idfoto) => {
    //     let img = document.getElementById(idfoto)
    //     let campo = document.getElementById(idCampo)
    //     let reader = new FileReader()

    //     reader.onload = function () {
    //         img.src = reader.result

    //         setState({ url_image1: reader.result, ...state })
    //     }
    // }

    //     if (campo.files[0] !== undefined) {
    //         return reader.readAsDataURL(campo.files[0])
    //     }
    // }

    const handleThumbChange = (e) => {
        console.log(e.target.files)
        setThumbLoading(true)

        awsS3Service.upload(e.target.files[0], '/blog-thumbs')
            .then(link => {
                setState({ ...state, url_image1: link })
            })
            .catch(() => {
                // setState({...state, })
            })
            .finally(() => {
                setThumbLoading(false)
            })
    }

    // const removeImgInput = (id) => {
    //     let img = document.getElementById(id)

    //     if (id === 'url_image1') {
    //         setState({ url_image1: defaultImg, ...state })
    //     } else if (id === 'url_image2') {
    //         setState({ url_image2: defaultImg, ...state })
    //     }

    //     return img.src = defaultImg
    // }

    const handleChange = (value) => {
        setState({
            ...state,
            text: value
        })
    }


    return (
        <div className="row d-flex flex-column container justify-content-center mb-4">
            <form onSubmit={formFunction} method="POST" className="col-md-10 col-sm-12">
                <div className="d-flex align-items-center justify-content-between" >
                    <h1 className="my-3 ml-3">{titlePage || 'Gerenciar Posts'}</h1>
                    <div>
                        <button
                            type='submit'

                            className="btn btn-lg btn-warning text-white"
                        >
                            Salvar
                        </button>
                    </div>
                </div>

                <div className="form-group" >
                    <label htmlFor="titulo">Titulo:</label>
                    <input
                        className="col-12 p-2 form-control"
                        type="text"
                        name="titulo"
                        id="titulo"
                        placeholder="Titilo da publicacao"
                        value={state.title}
                        onChange={(evt) => handleState({ state: 'title', value: evt.target.value })}
                        required
                    />
                </div>

                <div className="form-row">
                    <div className="col-12 col-md" >
                        <label htmlFor="slug">Slug:</label>
                        <input
                            className="col-12 p-2 form-control"
                            type="text"
                            name="slug"
                            id="slug"
                            placeholder="url da pagina"
                            value={state.slug}
                            onChange={(evt) => handleState({ state: 'slug', value: evt.target.value })}
                            required
                        />
                    </div>
                    <div className="col-12 col-md" >
                        <label htmlFor="author">Autor:</label>

                        <input
                            className="col-12 p-2 form-control"
                            type="text"
                            name="author"
                            id="author"
                            placeholder="ex: José A. Santos"
                            value={state.author}
                            onChange={(evt) => handleState({ state: 'author', value: evt.target.value })}
                        />
                    </div>
                </div>

                <div className="form-group mt-2">
                    <label htmlFor="conteudo">Conteudo:</label>
                    <Editor
                        value={state.text}
                        language="en"
                        onChange={handleChange}
                        placeholder="Escreva seu post aqui ...."
                        height="400px"
                    />
                </div>

                <div className="row mt-4 d-flex justify-content-between">
                    <div className="col-5">
                        <p>Selecione uma Thumb</p>
                        <br />
                        <label className="card img-fluid position-relative" htmlFor="foto_1">
                            <img
                                className="card-img img-fluid"
                                id="url_image1"
                                width="60%"
                                src={state.url_image1}
                                alt="thumb"
                                style={{ objectFit: 'cover', maxHeight: '250px' }}
                            />
                            <div hidden={!thumbLoading} className='position-absolute' style={{ display: 'flex', width: '100%', height: '100%', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                                <Spinner animation='border' style={{ margin: '0 auto' }} />

                            </div>
                        </label>
                        <input
                            type="file"
                            id="foto_1"
                            accept="image/*"
                            onChange={handleThumbChange}
                            hidden
                            disabled={thumbLoading}
                        />
                        <div className="row btn btn-outline-secondary d-flex justify-content-center "
                            onClick={() => setState({ ...state, url_image1: defaultImg })}
                        >
                            <img src={trash} width="25" alt="" />
                        </div>
                    </div>

                    {/*  <div className="col-5">
                    <label className="card img-fluid" htmlFor="foto_2">
                        <img 
                            className="card-img img-fluid" 
                            id="url_image2" 
                            width="60%" 
                            src={state.url_image2} 
                            alt="upload img2"  
                        />
                    </label>
                    <input 
                        type="file" 
                        id="foto_2" 
                        accept="image/*" 
                        onChange={() => showImgInput('foto_2', 'url_image2')} 
                        hidden 
                    />
                    <div className="row btn btn-outline-warning d-flex justify-content-center "
                        onClick={() => removeImgInput('url_image2')}
                    >
                        <img src={trash} width="25"  />
                    </div>
                </div> */}

                </div>

            </form>
        </div>
    )
}

export default FormBlog
