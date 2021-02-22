import React, { useCallback, useRef } from 'react'
import './styles.scss'

const PaginatedContent = ({ children, paginatedFetch }) => {
  const {
    loading,
    page,
    pagesCount,
    navigateToPage,
    navigateToNextPage,
    navigateToPreviousPage
  } = paginatedFetch
  const containerRef = useRef(null)

  const scrollToContainer = useCallback(() => {
    if (
      window.document.documentElement.scrollTop >
      containerRef.current.offsetTop - 50
    ) {
      window.scrollTo(0, containerRef.current.offsetTop - 50)
    }
  }, [containerRef])

  const previous = useCallback(() => {
    if (loading) return
    scrollToContainer()
    navigateToPreviousPage()
  }, [loading, scrollToContainer, navigateToPreviousPage])

  const nextPage = useCallback(() => {
    if (loading) return
    scrollToContainer()
    navigateToNextPage()
  }, [loading, scrollToContainer, navigateToNextPage])

  const pageClick = useCallback(
    page => {
      if (loading) return
      scrollToContainer()
      navigateToPage(page)
    },
    [loading, scrollToContainer, navigateToPage]
  )

  return (
    <div className='w-100'>
      <div className='pagination-items' ref={containerRef}>
        {children}
      </div>
      <footer className='pagination-footer'>
        <ul>
          {page > 1 && (
            <li>
              <button className='paginator-link' onClick={previous}>
                {'<'}
              </button>
            </li>
          )}
          {Array.from(new Array(pagesCount)).map((v, k) => (
            <li key={k} className={page === k + 1 ? 'active' : ''}>
              <button
                className='paginator-link'
                onClick={() => pageClick(k + 1)}
              >
                {(k + 1).toString()}
              </button>
            </li>
          ))}
          {page < pagesCount && (
            <li>
              <button className='paginator-link' onClick={nextPage}>
                {'>'}
              </button>
            </li>
          )}
        </ul>
      </footer>
    </div>
  )
}

export default PaginatedContent
