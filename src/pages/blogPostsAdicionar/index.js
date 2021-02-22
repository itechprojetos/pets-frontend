import React from 'react'

import { connect } from 'react-redux'
import { newPostBlogRequest } from '../../store/actions/blog'

import FormBlog from '../../components/formBlog'

function BlogNewPost({ newPostBlogRequest }) {
    
    return (
        <div className="container">
            <FormBlog titlePage="Novo Post" functionButton={newPostBlogRequest} />
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
        newPostBlogRequest: (dados) => dispatch(newPostBlogRequest(dados))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BlogNewPost)
