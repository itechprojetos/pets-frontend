import React, { useState, useEffect } from 'react'

//import Image from '../../assets/images/destaque1.png'
import { useParams, Redirect } from 'react-router'
import usePetAdopt from './usePetAdopt'
import { Spinner } from 'react-bootstrap'
import './styles.scss'
import useImage from '../../hooks/useImage'
import noPhoto from '../../assets/images/no-photo.png'
import Skeleton from 'react-loading-skeleton'

function PetParaAdocao () {
  const { id } = useParams()

  const { data, loading, errored } = usePetAdopt(id)

  const [imageUrl, setImageUrl] = useState('')

  useEffect(() => {
    if (data == null) return
    setImageUrl(data.donation.url_image)
  }, [data])

  const image = useImage(imageUrl, noPhoto)

  // if (loading) {
  //     return <div className='loader-spinner'>
  //         <span>Carregando os dados do pet...</span>
  //         <Spinner animation="border" />
  //     </div>
  // }

  if (errored) return <Redirect to='/' />

  return (
    <div className='container'>
      <h3 className='my-4 bold d-flex'>
        <span>Este é&nbsp;</span>
        <span>{loading ? <Skeleton width={100} /> : data.donation.name}</span>
        <span className='text-warning'>,&nbsp;</span>
        <span> e ele esta buscando uma nova familia </span>
      </h3>

      <div className='row mb-3'>
        <div className='col-12 col-md-6 col-sm-12'>
          {loading ? (
            <Skeleton height={350} width={500} />
          ) : (
            <img
              src={image.src}
              onError={image.handleError}
              alt=''
              className='img-fluid'
            />
          )}
          <br />
          <div className='row mt-3'>
            {loading ? (
              <Skeleton width={100} height={100} />
            ) : (
              <img
                className='mr-2 mt-2 img-fluid'
                src={image.src}
                onError={image.handleError}
                width='120'
                alt=''
              />
            )}
          </div>

          <div className='d-none d-sm-none d-md-flex justify-content-between mt-4 mb-4'>
            <h5>DETALHES DO DOADOR / ONG</h5>
            <button className='btn btn-warning mr-3 text-white'>
              Falar com Doador
            </button>
          </div>

          <div className='d-block d-md-none mt-4 mb-4'>
            <h5 className='text-center'>DETALHES DO DOADOR / ONG</h5>
            <br />
            <button className='btn btn-warning btn-block mr-3 text-white'>
              Falar com Doador
            </button>
          </div>

          <p className='mb-4 d-flex'>
            <b>Nome:</b>
            <span>
              &nbsp;
              {loading ? <Skeleton width={200} /> : data.customer.customer.name}
            </span>
          </p>
          <p className='mb-4 d-flex'>
            <b>Endereço:</b>
            <span>
              &nbsp;
              {loading ? (
                <Skeleton width={200} />
              ) : (
                data.customer.customer.address
              )}
            </span>
          </p>
          <p className='mb-4 d-flex'>
            <b>Bairro:</b>
            <span>&nbsp; {loading ? <Skeleton width={200} /> : ''}</span>
          </p>
          <p className='mb-4 d-flex'>
            <b>Cidade:</b>
            <span>
              &nbsp;
              {loading ? <Skeleton width={200} /> : data.customer.customer.city}
            </span>
          </p>
          <p className='mb-4 d-flex'>
            <b>UF:</b>
            <span>
              &nbsp;
              {loading ? (
                <Skeleton width={200} />
              ) : (
                data.customer.customer.state
              )}
            </span>
          </p>
        </div>
        <div className='col-12 col-md-6 col-sm-12 mt-2 mt-sm-2 mt-md-0'>
          <p className='mb-4 d-flex'>
            <b>Nome:</b>
            <span>
              &nbsp;
              {loading ? <Skeleton width={200} /> : data.donation.name}
            </span>
          </p>
          <p className='mb-4 d-flex'>
            <b>Castrado:</b>{' '}
            <span>
              &nbsp;
              {loading ? <Skeleton width={200} /> : data.donation.castration}
            </span>
          </p>
          <p className='mb-4 d-flex'>
            <b>Vacinas:</b>{' '}
            <span>
              &nbsp;
              {loading ? <Skeleton width={200} /> : data.donation.vaccines}
            </span>
          </p>
          <p className='mb-4 d-flex'>
            <b>Vermífugos:</b>
            <span>
              &nbsp;
              {loading ? <Skeleton width={200} /> : data.donation.vermifuges}
            </span>
          </p>
          <p className='mb-4 d-flex'>
            <b>Amigável:</b>
            <span>
              &nbsp;{loading ? <Skeleton width={200} /> : data.donation.temper}
            </span>
          </p>

          <p className='mb-4 d-flex'>
            <b>Espécie:</b>
            <span>
              &nbsp;{loading ? <Skeleton width={200} /> : data.donation.specie}
            </span>
          </p>
          <p className='mb-4 d-flex'>
            <b>Raça:</b>
            <span>
              &nbsp;{loading ? <Skeleton width={200} /> : data.donation.breed}
            </span>
          </p>
          <p className='mb-4 d-flex'>
            <b>Cor:</b>
            <span>
              &nbsp;{loading ? <Skeleton width={200} /> : data.donation.color}
            </span>
          </p>
          <p className='mb-4 d-flex'>
            <b>Aniversário:</b>
            <span>
              &nbsp;
              {loading ? <Skeleton width={200} /> : data.donation.birthday}
            </span>
          </p>
          <p className='mb-4 d-flex'>
            <b>Peso:</b>
            <span>
              &nbsp;{loading ? <Skeleton width={200} /> : data.donation.weight}
            </span>
          </p>
          <p className='mb-4 d-flex'>
            <b>Porte:</b>
            <span>
              &nbsp;{loading ? <Skeleton width={200} /> : data.donation.port}
            </span>
          </p>
          <p className='mb-4 d-flex'>
            <b>Pelagem:</b>
            <span>
              &nbsp;{loading ? <Skeleton width={200} /> : data.donation.coat}
            </span>
          </p>

          <p className='mb-4'>
            <b>Regras e documentação necessárias para adoção</b>
            <br />
            {loading ? <Skeleton count={3} /> : data.donation.rules}
            {/* {data.donation.complement} */}
          </p>

          <p className='mb-4'>
            <b>Observações</b>
            <br />
            {loading ? <Skeleton count={3} d-flex /> : data.donation.obs}
            {/* {data.donation.complement} */}
          </p>
        </div>
      </div>
    </div>
  )
}

export default PetParaAdocao
