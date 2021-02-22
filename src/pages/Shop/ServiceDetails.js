import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import ImgTopo from '../../assets/images/bg_header_store.jpg'
import ImgDogDestaque from '../../assets/images/destaque1.png'
import useProfessionalShop from './useProfessionalServices'
import ProfessionalServiceCardList from '../../components/ProfessionalServiceCardList'
import './styles.scss'
import Skeleton from 'react-loading-skeleton'
import { useParams } from 'react-router'
import useImage from '../../hooks/useImage'
import useFetchSingle from '../../hooks/useFetchSingle'
import { formatMoney } from '../../helpers/currency'
import { Container } from 'react-bootstrap'

const DetalhesServico = () => {
  const { id, serviceId } = useParams()
  const { loading, services, customer: shopCustomer } = useProfessionalShop(id)
  const {
    loading: serviceLoading,
    data: serviceData,
    errored: serviceErrored
  } = useFetchSingle(
    '/services/app/ProfessionalServices/GetProfessionalServiceForView?id=' +
      serviceId
  )

  const image = useImage(
    serviceData == null ? null : serviceData.professionalService.url_image
  )

  return (
    <div className='container-detalhes'>
      <div className='content-detalhes'>
        <div className='topo'>
          <img src={ImgTopo} />
          <div className='container-description-service'>
            <div className='content-description-service'>
              <h4>{loading ? <Skeleton /> : shopCustomer.socialReason}</h4>
              <p>
                <FontAwesomeIcon icon={faStar} size='sm' color='#ffbd00' />
                <FontAwesomeIcon icon={faStar} size='sm' color='#ffbd00' />
                <FontAwesomeIcon icon={faStar} size='sm' color='#ffbd00' />
                <FontAwesomeIcon icon={faStar} size='sm' color='#ffbd00' />
                <FontAwesomeIcon icon={faStar} size='sm' />
              </p>
            </div>
          </div>
        </div>
        <div className='barra-categorias'>
          <div className='categorias-itens'>
            <span>CATEGORIAS</span>
            <ul>
              <li>
                <a href='#'>ALIMENTAÇÃO</a>
              </li>
              <li>
                <a href='#'>HIGIENE</a>
              </li>
              <li>
                <a href='#'>ACESSÓRIOS</a>
              </li>
              <li>
                <a href='#'>MEDICAMENTOS</a>
              </li>
              <li>
                <a href='#'>BANHO E TOSA</a>
              </li>
              <li>
                <a href='#'>VETERINÁRIO</a>
              </li>
              <li>
                <a href='#'>VACINAÇÃO</a>
              </li>
              <li>
                <a href='#'>PET SITTER</a>
              </li>
              <li>
                <a href='#'>DOG WALKER</a>
              </li>
              <li>
                <a href='#'>OUTROS</a>
              </li>
            </ul>
          </div>
        </div>
        <Container className='container-info-detalhes'>
          <div className='content-all'>
            <div className='content-img-detalhes'>
              <div className='content-img-principal-detalhes'>
                <img src={image.src} onError={image.handleError} />
              </div>
            </div>
            <div className='content-info-detalhes'>
              <div className='content-icons'>
                <FontAwesomeIcon icon={faStar} size='sm' color='#ffbd00' />
                <FontAwesomeIcon icon={faStar} size='sm' color='#ffbd00' />
                <FontAwesomeIcon icon={faStar} size='sm' color='#ffbd00' />
                <FontAwesomeIcon icon={faStar} size='sm' color='#ffbd00' />
                <FontAwesomeIcon icon={faStar} size='sm' />
              </div>
              <h3>
                {serviceLoading ? (
                  <Skeleton />
                ) : (
                  serviceData.professionalService.description
                )}
              </h3>
              <p className='description-valor'>
                <span className='a-partir'>a partir de</span>
                <span className='valor'>
                  {serviceLoading ? (
                    <Skeleton />
                  ) : (
                    formatMoney(serviceData.professionalService.value)
                  )}
                </span>
              </p>
              <p className='description'>
                {/* Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum. */}
              </p>
              <button className='btn-comprar' type='submit'>
                COMPRAR
              </button>
            </div>
          </div>
        </Container>
        <div className='container-products-relacionados'>
          <div className='content-products-relacionados'>
            <h4>Produtos Relacionados</h4>
            <ProfessionalServiceCardList
              services={services}
              loading={loading}
              loadingCount={8}
              xs={2}
              sm={2}
              md={3}
              lg={4}
              xl={4}
            />
          </div>
        </div>
        <div className='container-infos-empresa'>
          <div className='content-infos-empresa'>
            <div className='content-infos-one'>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged.
                <br />
                <br /> Lorem Ipsum is simply dummy text of the printing and
                typesetting industry.{' '}
              </p>
            </div>
            <div className='content-infos-two'>
              <span>NÚMERO DE FUNCIONÁRIOS</span>
              <p>12</p>
              <br />
              <span>CERTIFICAÇÕES</span>
              <p>ISO 9002</p>
            </div>
            <div className='content-infos-tree'>
              <span>TELEFONES/WHATSAPP</span>
              <p>ISO 9002</p>
              <br />
              <span>ENDEREÇO</span>
              <p>ISO 9002</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DetalhesServico
