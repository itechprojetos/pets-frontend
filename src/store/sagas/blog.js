import { call, put, select } from 'redux-saga/effects'
import { getPostsBlogSucess, newPostBlogSuccess, deleteBlogSuccess, getPostBySlugSuccess, blogTypes } from '../actions/blog'
//import { Blog } from '../../models/Blog'
import api from '../../services/api'

const getBlogState = (state) => state.blog.blogStatus

export function* getAllBlogPosts() {
    const { data } = yield call(api.get, '/services/app/Posts/GetAll')

    if (data.success) {
        yield put(getPostsBlogSucess(data.result.items))
    } else {
        yield put({ type: blogTypes.GET_BLOG_POSTS_ERROR })
    }
}

export function* getPostForView() {
    const blogState = yield select(getBlogState)
    let id = blogState.formDados.post.id

    const { data } = yield call(api.get, `/services/app/Posts/GetPostForView?Id=${id}`)

    if (data.success) {
        yield put(getPostBySlugSuccess(data.result.post))
    } else {
        yield put({ type: blogTypes.GET_POST_UNICO_ERROR })
    }
}

export function* newPost() {
    const blogState = yield select(getBlogState)
    const dados = blogState.formDados

    const Dadosreq = {
        slug: dados.slug,
        title: dados.title,
        text: dados.text,
        author: dados.author,
        url_media: dados.url_media,
        url_image1: dados.url_image1,
        url_image2: dados.url_image2,
        publishDate: '',
    }

    // function dataAtualFormatada() {
    //     var data = new Date(),
    //         dia = data.getDate().toString(),
    //         diaF = (dia.length === 1) ? '0' + dia : dia,
    //         mes = (data.getMonth() + 1).toString(),
    //         mesF = (mes.length === 1) ? '0' + mes : mes,
    //         anoF = data.getFullYear();
    //     return diaF + "/" + mesF + "/" + anoF;
    // }

    Dadosreq.publishDate = new Date()

    const { data } = yield call(api.post, '/services/app/Posts/CreateOrEdit', Dadosreq)

    if (data.success) {
        yield put(newPostBlogSuccess({ post: Dadosreq }))
    } else {
        yield put({ type: blogTypes.POST_BLOG_ERROR })
    }
}

export function* excluirPost() {
    const blogState = yield select(getBlogState)
    const id = blogState.formDados[0].post.id

    const { data } = yield call(api.delete, `/services/app/Posts/Delete?Id=${id}`)

    if (data.success) {
        yield put(deleteBlogSuccess(id))
    } else {
        yield put({ type: blogTypes.DELETE_BLOG_ERROR })
    }
}

export function* editarPost() {
    const blogState = yield select(getBlogState)
    const dados = blogState.formDados

    const { data } = yield call(api.post, '/services/app/Posts/CreateOrEdit', dados)

    if (data.success) {
        yield put({ type: blogTypes.PUT_BLOG_SUCCESS })
    } else {
        yield put({ type: blogTypes.PUT_BLOG_ERROR })
    }
}
