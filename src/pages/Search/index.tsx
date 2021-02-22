import React, { useMemo } from 'react'
import { Container, Spinner } from 'react-bootstrap'
import './styles.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from "@fortawesome/free-solid-svg-icons";
import usePaginatedFetch from '../../hooks/usePaginatedFetch';
import PaginatedContent from '../../components/PaginatedContent';
import { /*useParams*/ useLocation, Redirect, useHistory } from 'react-router';
import { ProfessionalService } from '../../models/ProfessionalService';
import useImage from '../../hooks/useImage';

const noPhoto = require('../../assets/images/no-photo.png')

type SearchItemProps = {
  item: {
    customername: string;
    professionalService: ProfessionalService;
  }
}

const SearchItem: React.FC<SearchItemProps> = ({ item: { customername, professionalService: item } }) => {
  const img = useImage(item.url_image, noPhoto)

  const history = useHistory()

  return (
    <div className='search-item'>
      <img src={img.src} onError={img.handleError} alt='' />
      <div className='details'>
        <span className='details-title'>{item.description}</span>
        <span className='price-info'>a partir de</span>
        <span className='price'>R$ {item.value ?? '0,00'}</span>
        <div className='details-footer'>
          <span className='professional'>
            {customername}
          </span>
          <a className='reviews' href='##'>reviews(0)</a>
          <div className='stars'>
            <FontAwesomeIcon
              icon={faStar}
              size="sm"
              className={`mr-1 store-rate`}
            />
            <FontAwesomeIcon
              icon={faStar}
              size="sm"
              className={`mr-1 store-rate`}
            />
            <FontAwesomeIcon
              icon={faStar}
              size="sm"
              className={`mr-1 store-rate`}
            />
            <FontAwesomeIcon
              icon={faStar}
              size="sm"
              className={`mr-1 store-rate`}
            />
            <FontAwesomeIcon
              icon={faStar}
              size="sm"
              className={`mr-1 store-rate`}
            />
          </div>
        </div>
      </div>
      <div className='action'>
        <button onClick={() => history.push(`/professionals/${item.customerId}/services/${item.id}`)}>Visualizar</button>
      </div>
    </div>
  )
}

const Search: React.FC<{}> = () => {
  const location = useLocation()
  const query = useMemo(() => new URLSearchParams(location.search), [location.search])
  const q = useMemo(() => query.get('q'), [query])

  const search = usePaginatedFetch(`/services/app/ProfessionalServices/GetAll?descriptionFilter=${q}`, 6)

  if (q == null || q === '') return <Redirect to='/' />

  if (search.loading) return (
    <div className='loader-spinner'>
      <span>Carregando resultados para a busca...</span>
      <Spinner animation="border" />
    </div>
  )

  return (
    <Container className='search-page'>
      <div className='row mb-4'>
        <header className='search-page-header'>
          <h1 className="search-page-header-title mb-0 pb-0"><span>Você buscou por:</span> {q}</h1>
          <span className='search-page-header-info'>e sua busca retornou {search.totalCount} resultado(s)</span>
        </header>
      </div>
      <div className='row mb-4'>
        <aside className='col m-0 p-0'>
          <div className='filter-card'>
            <span className='filter-card-title'>Refinar busca</span>
            <div className='filter-card-animal'>
              <span>Animalzinho</span>
              <label><input type='radio' name='animal' checked></input> Cães</label>
              <label><input type='radio' name='animal' disabled></input> Gatos</label>
              <label><input type='radio' name='animal' disabled></input> Outros</label>
            </div>
            <div className='filter-card-pricerange'>
              <span>Faixa de Preço</span>
              <input type='text' placeholder='de R$' disabled />
              <input type='text' placeholder='até R$' disabled />
            </div>
            <div className='filter-card-distance'>
              <span>Em qual distância</span>
              <input type='text' placeholder='até Km' disabled />
            </div>
            <button>Refinar</button>
          </div>
        </aside>
        <section className='col-9 ml-4'>
          <PaginatedContent paginatedFetch={search}>
            {search.data.map((v, k) => <SearchItem key={k} item={v} />)}
          </PaginatedContent>
        </section>
      </div>
    </Container>
  )
}

export default Search