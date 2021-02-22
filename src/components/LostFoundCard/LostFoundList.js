import React from 'react'
import LostFoundCard from '.'
import CardList from '../CardList'

const LostFoundList = ({
  lostFounds,
  loading,
  loadingCount = 8,
  xs = 1,
  sm = 2,
  md = 3,
  lg = 4,
  xl = 4
}) => {
  const sizes = { xs, sm, md, lg, xl }
  return (
    <CardList {...sizes}>
      {loading ? (
        Array.from(new Array(loadingCount)).map((_, k) => (
          <LostFoundCard key={k} loading />
        ))
      ) : lostFounds.length === 0 ? (
        <h5 className='card-list-error'>Nenhum item a ser exibido</h5>
      ) : (
        lostFounds.map((item, k) => (
          <LostFoundCard key={k} loading={false} data={item} />
        ))
      )}
    </CardList>
  )
}

export default LostFoundList
