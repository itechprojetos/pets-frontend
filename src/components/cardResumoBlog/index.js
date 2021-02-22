import React, { useState, /*useCallback*/ } from 'react'

import { Link } from 'react-router-dom'

import noPhoto from '../../assets/images/no-photo.png'

import ExcluirPopUP from '../popupBlog'
import useImage from '../../hooks/useImage'
import ReactMarkdown from 'react-markdown'

function CardResumo({ data, deleteBtn, showConfig }) {
    const image = useImage(data.url_image1, noPhoto)

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <div>
            <ExcluirPopUP show={show} handleClose={handleClose} deletePost={() => deleteBtn(data.id)} />

            <div className="card mb-3">
                <div className="row m-0 p-0 no-gutters">
                    <div className="col-md-4 p-0">
                        <img src={image.src} onError={image.handleError} className="card-img" style={{ width: '300px', height: '250px', objectFit: 'cover' }} alt={data.title} />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h5 className="card-title">{data.title}</h5>
                            <div className="card-text mb-2 overflow-hidden" style={{ maxHeight: '150px' }}>
                                <ReactMarkdown escapeHtml={false} className='react-markdown resume' source={data.text} />
                            </div>
                            <p className="text-muted blockquote-footer"> {data.author}</p>
                        </div>
                        <div className="card-footer d-flex justify-content-center align-items-center bg-white" >
                            <Link className="text-warning h6 mx-2 mt-2" to={`/blog/posts/${data.id}`}>Ler mais</Link>
                            <Link className="btn btn-outline-info h6 mx-2" to={`/blog/admin/${data.id}`} hidden={showConfig}>Editar</Link>
                            <div onClick={handleShow} className="btn btn-outline-danger h6 mx-2" hidden={showConfig}>Excluir</div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default CardResumo
