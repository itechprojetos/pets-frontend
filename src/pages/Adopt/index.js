import React, { useEffect } from 'react'
import { Container } from 'react-bootstrap'

import './styles.scss'
import CardItem from '../../components/CardItem'
import FooterBanner from '../../components/FooterBanner'
import usePaginatedFetch from '../../hooks/usePaginatedFetch'
import DonationList from '../../components/DonationCard/DonationList'
import PaginatedContent from '../../components/PaginatedContent'

const Adopt = () => {
  const donations = usePaginatedFetch('/services/app/Donations/GetAll', 8)

  return (
    <Container className='adopt-content'>
      <div className='adopt-content-title'>Quer Adotar um Pet?</div>
      {/* {notSignedError && (
                <div className="lost-finds-content-message-error">{notSignedError}</div>
            )} */}
      {/* {!notSignedError && ( */}

      <div className='block-items-container mb-5'>
        <div className='row'>
          {/* products */}
          <PaginatedContent paginatedFetch={donations}>
            <DonationList
              donations={donations.data}
              loading={donations.loading}
            />
          </PaginatedContent>
        </div>
      </div>
      {/* )} */}
      <FooterBanner />
    </Container>
  )
}

// const mapStateToProps = (state: any) => ({
//     userSigned: state.customer.customerStatus.userSigned,
//     donations: state.donation.donationStatus.donations,
// })

// const mapDispatchToProps = (dispatch: any) =>
//     bindActionCreators({ ...DonationActions }, dispatch)

export default Adopt
