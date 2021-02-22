export const blogTypes = {
    GET_BLOG_POSTS_REQUEST: 'blog/GET_POSTS_REQUEST',
    GET_BLOG_POSTS_SUCCESS: 'blog/GET_POSTS_SUCCESS',
    GET_BLOG_POSTS_ERROR: 'blog/GET_POSTS_ERROR',

    GET_POST_UNICO_REQUEST: 'blog/GET_POST_UNICO_REQUEST',
    GET_POST_UNICO_SUCCESS: 'blog/GET_POST_UNICO_SUCCESSS',
    GET_POST_UNICO_ERROR: 'blog/GET_POST_UNICO_ERROR',

    POST_BLOG_REQUEST: 'blog/POST_BLOG_REQUEST',
    POST_BLOG_SUCCESS: 'blog/POST_BLOG_SUCCESS',
    POST_BLOG_ERROR: 'blog/POST_BLOG_ERROR',

    PUT_BLOG_REQUEST: 'blog/PUT_BLOG_REQUEST',
    PUT_BLOG_SUCCESS: 'blog/PUT_BLOG_SUCCESS',
    PUT_BLOG_ERROR: 'blog/PUT_BLOG_ERROR',

    DELETE_BLOG_REQUEST: 'blog/DELETE_BLOG_REQUEST',
    DELETE_BLOG_SUCCESS: 'blog/DELETE_BLOG_SUCESS',
    DELETE_BLOG_ERROR: 'blog/DELETE_BLOG_ERROR'
}

export const getPostsBlogRequest = () => ({
    type: blogTypes.GET_BLOG_POSTS_REQUEST,
    payload: 'dados'
})

export const getPostsBlogSucess = (data) => {
    return {
        type: blogTypes.GET_BLOG_POSTS_SUCCESS,
        payload: data
    }
}

export const newPostBlogRequest = (data) => ({
    type: blogTypes.POST_BLOG_REQUEST,
    payload: data
})

export const newPostBlogSuccess = (data) => ({
    type: blogTypes.POST_BLOG_SUCCESS,
    payload: data
})

export const getPostBySlug = (slug) => {
    return {
        type: blogTypes.GET_POST_UNICO_REQUEST,
        payload: slug
    }
}
export const getPostBySlugSuccess = (dados) => {
    return {
        type: blogTypes.GET_POST_UNICO_SUCCESS,
        payload: dados
    }
}

// UPDATE
export const putBlogRequest = (data) => ({
    type: blogTypes.PUT_BLOG_REQUEST,
    payload: data
})

export const putBlogSuccess = () => ({
    type: blogTypes.PUT_BLOG_SUCCESS, 
})

// DELETE
export const deleteBlogRequest = (id) => ({
    type: blogTypes.DELETE_BLOG_REQUEST,
    payload: id
})

export const deleteBlogSuccess = (id) => ({
    type: blogTypes.DELETE_BLOG_SUCCESS,
    payload: id
})

