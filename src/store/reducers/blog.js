import {combineReducers} from 'redux'
import actions from '../actions'

const INITIAL_STATE = { 
    posts: [],
    formDados: [],
    slug: [],
}

export const blogStatus = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case actions.blogTypes.GET_BLOG_POSTS_SUCCESS:
            return {
                ...state,
                posts: action.payload
            }
        case actions.blogTypes.GET_BLOG_POSTS_ERROR:
            console.log('ERROR_REQUEST')
            return state

        case actions.blogTypes.POST_BLOG_REQUEST:
            return { ...state, formDados: action.payload }
        case actions.blogTypes.POST_BLOG_SUCCESS:
            const newPosts = action.payload
            return {
                ...state,
                posts: [...state.posts, newPosts ],
            }

        case actions.blogTypes.PUT_BLOG_REQUEST:
            let put_recebidos = action.payload
            return {
                ...state,
                formDados: put_recebidos
            }

        case actions.blogTypes.PUT_BLOG_SUCCESS:
            console.log('atualizado com sucesso')
            return {
                ...state
            }

        case actions.blogTypes.GET_POST_UNICO_REQUEST: 
            let unico_post = state.posts.filter(e => e.post.slug === action.payload)
            return  { ...state, formDados: {...unico_post[0]}  }
        
        case actions.blogTypes.GET_POST_UNICO_SUCCESS:
            console.log(action.payload)
            return  { ...state, formDados: action.payload }

        case actions.blogTypes.DELETE_BLOG_REQUEST:
            let getDelDados = state.posts.filter(e => e.post.id === action.payload)
            return { ...state, formDados: getDelDados }

        case actions.blogTypes.DELETE_BLOG_SUCCESS:
            let del = state.posts.filter(e => e.post.id !== action.payload)
            return { ...state, posts: del }
        
        default :
            return state
    }
    
}

export default combineReducers({
    blogStatus
})
