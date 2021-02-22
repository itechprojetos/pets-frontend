import { all, takeLatest, take } from 'redux-saga/effects'
import actions from '../actions'
import { getHighlights, getProducts } from './product'
import { getVideoHighlights } from './video'

import { getAllBlogPosts, getPostForView, newPost, excluirPost, editarPost } from './blog'
import { blogTypes } from '../actions/blog'

// import { systemSignIn } from './auth'
import { customerGet, customerSignIn, customerCreateOrEdit, customerSignOut } from './customer'
import { donate, donateGetAll, donateGetAllUser } from './donation'
import { lostFinds } from './lostfinds'
import { veterinariesCreateOrEdit, veterinariesGetAll } from './veterinaries'
import { petsCreateOrEdit, petsGetAll, petsGetAllUser } from './pets'
import {
  servicesCreateOrEdit,
  servicesDelete,
  servicesGetAll,
  servicesGetAllUser
} from './services'

export default function * rootSaga () {
  yield take('INITIAL_LOADING_FINISHED')

  yield all([
    // takeLatest(actions.AuthTypes.SYSTEM_LOGIN, systemSignIn),

    takeLatest(actions.CustomerTypes.SIGN_IN, customerSignIn),
    takeLatest(actions.CustomerTypes.SIGN_UP, customerCreateOrEdit),
    takeLatest(actions.CustomerTypes.GET_CUSTOMER, customerGet),
    takeLatest(actions.CustomerTypes.SIGN_OUT, customerSignOut),

    takeLatest(actions.ProductTypes.GET_HIGHLIGHTS, getHighlights),
    takeLatest(actions.ProductTypes.GET_PRODUCTS, getProducts),

    takeLatest(actions.VideoTypes.GET_VIDEO_HIGHLIGHTS, getVideoHighlights),

    // Blog
    takeLatest(blogTypes.GET_BLOG_POSTS_REQUEST, getAllBlogPosts),
    takeLatest(blogTypes.GET_POST_UNICO_REQUEST, getPostForView),
    takeLatest(blogTypes.POST_BLOG_REQUEST, newPost),
    takeLatest(blogTypes.DELETE_BLOG_REQUEST, excluirPost),
    takeLatest(blogTypes.PUT_BLOG_REQUEST, editarPost),

    takeLatest(actions.DonationTypes.DONATE, donate),
    takeLatest(actions.DonationTypes.DONATE_GET_ALL, donateGetAll),
    takeLatest(actions.DonationTypes.DONATE_GET_ALL_USER, donateGetAllUser),

    takeLatest(actions.LostFindsTypes.LOST_FINDS, lostFinds),

    takeLatest(
      actions.VeterinariesTypes.VETERINARIES_GET_ALL,
      veterinariesGetAll
    ),
    takeLatest(
      actions.VeterinariesTypes.VETERINARIES_CREATE_OR_EDIT,
      veterinariesCreateOrEdit
    ),

    takeLatest(actions.PetsTypes.CREATE_OR_EDIT, petsCreateOrEdit),
    takeLatest(actions.PetsTypes.GET_ALL, petsGetAll),
    takeLatest(actions.PetsTypes.GET_ALL_USER, petsGetAllUser),

    takeLatest(actions.ServicesTypes.CREATE_OR_EDIT, servicesCreateOrEdit),
    takeLatest(actions.ServicesTypes.GET_ALL, servicesGetAll),
    takeLatest(actions.ServicesTypes.GET_ALL_USER, servicesGetAllUser),
    takeLatest(actions.ServicesTypes.DELETE, servicesDelete)
  ])
}
