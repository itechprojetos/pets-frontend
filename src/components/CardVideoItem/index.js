import React from 'react'

import './styles.scss'
import { Video } from '../../models/Video'

const CardVideoItem = ({video}) => {
    return (
        <div className="container-video-item">
            <div className="image_thumb">
                {/*<img src={require('../../assets/images/destaque1.png')} alt=""/>*/}
                {/*<img className="icon_play" src={require('../../assets/images/ic_play.svg')} alt=""/>*/}
                <video width="100%" controls>
                    <source src={video.videoUrl} type="video/mp4"/>
                </video>
            </div>
            <hr/>
            <p className="container-video-item-body container-video-item-body-title">
                {video.title}
            </p>
            <p className="container-video-item-body container-video-item-body-description">
                {video.description}
            </p>
            <p className="container-video-item-body container-video-item-body-tags">
                {video.getTags()}
            </p>
        </div>
    )
}

export default CardVideoItem
