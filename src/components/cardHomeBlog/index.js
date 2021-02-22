import React from 'react'

import './styles.scss'
import { Link } from 'react-router-dom'
import useImage from '../../hooks/useImage'
import noPhoto from '../../assets/images/no-photo.png'
import ReactMarkdown from 'react-markdown'

const CardHomeBlog = ({ dados }) => {
  const data = dados[0]
  const image = useImage(data.url_image1, noPhoto)
  return (
    <div className='container-video-item'>
      <div className='image_thumb'>
        <img src={image.src} onError={image.handleError} />
      </div>
      <hr />
      <div className='card-body'>
        <h5 className='card-title'>{data.title}</h5>
        <ReactMarkdown
          escapeHtml={false}
          className='react-markdown resume blog-markdown'
          source={data.text}
        />

        <Link className='btn btn-primary mt-3' to={`/blog/posts/${data.id}`}>
          ver mais
        </Link>
      </div>
    </div>
  )
}

export default CardHomeBlog
