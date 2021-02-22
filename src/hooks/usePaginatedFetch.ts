import { useState, useEffect, useCallback, useMemo } from "react"
import api from '../services/api'

// Colocará a url relativa para o GET e o número de itens por página
// Isso será o bastante para que esse hook lhe retorne:
// - data,
// - loading,
// - errored,
// - page,
// - totalCount,
// - pagesCount,
// - navigateToPage,
// - navigateToNextPage,
// - navigateToPreviousPage

export default (url: string, itemsPerPage: number = 8, lazy = false) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [errored, setErrored] = useState(false)
  const [totalCount, setTotalCount] = useState(0)
  const [shouldFetch, setShouldFetch] = useState(!lazy)

  const pagesCount = useMemo(() => totalCount === 0 ? 0 : Math.ceil(totalCount / itemsPerPage), [totalCount, itemsPerPage])

  useEffect(() => {
    setShouldFetch(true)
  }, [url, itemsPerPage])

  useEffect(() => {
    if (shouldFetch === false) return
    setShouldFetch(false)
    setLoading(true);

    (async () => {
      const skipCount = itemsPerPage * (page - 1)

      const fetchUrl = (url.includes('?') ? url + '&' : url + '?') + `SkipCount=${skipCount}&MaxResultCount=${itemsPerPage}`;

      const response = await api.get(fetchUrl)

      if (response.data.result.totalCount === 0) {
        setTotalCount(0)
      } else {
        setTotalCount(response.data.result.totalCount)
      }


      setData(response.data.result.items)

      setErrored(false)
    })()
      .catch(err => {
        console.log(err)
        setTotalCount(0)
        setErrored(true)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [url, itemsPerPage, page, shouldFetch])

  const navigateToPage = useCallback((newPage) => {
    setPage(newPage)
    setShouldFetch(true)
  }, [])

  const navigateToNextPage = useCallback(() => {
    if (page > pagesCount) return

    setPage(page + 1)
    setShouldFetch(true)

  }, [page, pagesCount])

  const navigateToPreviousPage = useCallback(() => {
    if (page === 1) return

    setPage(page - 1)
    setShouldFetch(true)

  }, [page])

  const refetch = useCallback(() => {
    setShouldFetch(true)
  }, [])

  return {
    data,
    loading,
    errored,
    page,
    totalCount,
    pagesCount,
    navigateToPage,
    navigateToNextPage,
    navigateToPreviousPage,
    refetch
  }
}