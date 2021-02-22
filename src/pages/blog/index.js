import React, { /*useEffect*/ useContext, useCallback } from 'react'

import { Container, Spinner } from 'react-bootstrap'

import { connect } from 'react-redux'
import {
  getPostsBlogRequest,
  deleteBlogRequest
} from '../../store/actions/blog'

import { Link } from 'react-router-dom'

// import {
//     useParams
// } from "react-router-dom";

import CardResumo from '../../components/cardResumoBlog'
import AuthenticationContext from '../../contexts/Authentication/AuthenticationContext'
import usePaginatedFetch from '../../hooks/usePaginatedFetch'
import PaginatedContent from '../../components/PaginatedContent'
import api from '../../services/api'

function Blog ({ data, loadData }) {
  const { customer } = useContext(AuthenticationContext)
  const { refetch, ...posts } = usePaginatedFetch(
    '/services/app/Posts/GetAll',
    3
  )

  const deletePost = useCallback(
    async id => {
      const response = await api.delete(`/services/app/Posts/Delete?Id=${id}`)

      if (response.status === 200) {
        refetch()
      }
    },
    [refetch]
  )

  if (posts.loading) {
    return (
      <div className='loader-spinner'>
        <span>Carregando a lista de posts...</span>
        <Spinner animation='border' />
      </div>
    )
  }

  // useEffect(() => {
  //     loadData()
  // }, [loadData])

  const verfifyAdm = id => {
    if (id === 7) return false
    else return true
  }

  const dados = customer == null ? 0 : customer.customerTypeId

  return (
    <Container>
      <div className='pt-4 d-flex align-items-center justify-content-between'>
        <h1 className=''>Todos os posts</h1>
        <Link
          className='btn btn-outline-info h6 m-3'
          to='/blog/new/post'
          hidden={verfifyAdm(dados)}
        >
          Criar Novo Post
        </Link>
      </div>
      <div className='block-items-container mb-5'>
        <div className='row m-0 p-0'>
          <PaginatedContent paginatedFetch={posts}>
            {/* <div className="professional-services-cards"> */}
            {posts.data.map((e, index) => (
              <CardResumo
                key={e.post.id}
                data={e.post}
                // showConfig={true}
                deleteBtn={deletePost}
                showConfig={verfifyAdm(dados)}
              />
            ))}
            {/* </div> */}
          </PaginatedContent>
        </div>
      </div>
    </Container>
  )
}

const mapStateToProps = state => {
  return {
    data: state.blog.blogStatus.posts
    // custumer: state.customer.customerStatus.customer
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadData: () => dispatch(getPostsBlogRequest()),
    deletePost: slug => dispatch(deleteBlogRequest(slug))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Blog)
