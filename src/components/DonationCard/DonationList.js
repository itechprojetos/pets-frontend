import React from 'react'
import CardList from '../CardList'
import Skeleton from 'react-loading-skeleton'
import DonationCard from '.'

const DonationList = ({
  donations,
  xs = 1,
  sm = 2,
  md = 3,
  lg = 4,
  xl = 4,
  loading = true,
  loadingCount = 8
}) => {
  if (loading) {
    const items = Array.from(new Array(loadingCount)).map((item, index) => (
      <Skeleton key={index} height='17.3em' />
    ))
    return (
      <CardList xs={xs} sm={sm} md={md} lg={lg} xl={xl}>
        {items}
      </CardList>
    )
  }

  return (
    <CardList xs={xs} sm={sm} md={md} lg={lg} xl={xl}>
      {donations.map(donation => (
        <DonationCard
          key={donation.donation.id}
          donation={donation.donation}
          customerName={donation.customername}
        />
      ))}
    </CardList>
  )
}

export default DonationList
