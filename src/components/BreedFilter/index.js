import React, { useState, useMemo, useEffect } from 'react'
import styled from 'styled-components'
import Breeds from '../../assets/data/breeds'
import useImage from '../../hooks/useImage'
import noPhoto from '../../assets/images/no-photo.png'
import { Link } from 'react-router-dom'

const Container = styled.div`
  position: relative;
  width: 100%;
  background-color: #ffbd00;
  padding: 1em;
  & > h5 {
    color: white;
    font-weight: 600;
    margin-bottom: 0.5em;
  }
`

const Input = styled.input`
  padding: 1em;
  width: 100%;
`

const BreedList = styled.div`
  position: absolute;
  width: 100%;
  margin-top: 1em;
  margin-left: -1em;
  padding: 0 1em 1em 1em;
  z-index: 20;
  background-color: #ffbd00;
  /* border-radius: 0 0 8px 8px; */
  box-shadow: 5px 5px 5px 1px rgba(0, 0, 0, 0.1);
  max-height: 500px;
  overflow-y: auto;
  & > h5 {
    color: white;
    width: 100%;
    text-align: center;
  }
`

const BreedItemContainer = styled.div`
  display: flex;
  align-items: center;
  color: white;

  padding: 0.5em;
  &:not(:last-of-type) {
    margin-bottom: 0.5em;
  }

  &:hover {
    color: black;
    background-color: white;
  }

  & > span {
    margin-left: 0.75em;
    font-size: 1.2rem;
    font-weight: bold;
  }
`

const BreedItemImageWrapper = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 100px;
  overflow: hidden;
  & > img {
    width: 90px;
    height: 90px;
    margin-left: -15px;
    margin-top: -15px;
    object-fit: cover;
  }
`

const BreedItem = ({ breed, img }) => {
  const image = useImage(img ? img.image : null, noPhoto)

  return (
    <Link to={`/breeds/${breed.breedname}`}>
      <BreedItemContainer>
        <BreedItemImageWrapper>
          <img
            className='breed-image'
            src={image.src}
            onError={image.handleError}
          />
        </BreedItemImageWrapper>
        <span>{breed.breedname}</span>
      </BreedItemContainer>
    </Link>
  )
}

const BreedFilter = ({ breedType }) => {
  const [filter, setFilter] = useState('')
  const [loading, setLoading] = useState(true)
  const [images, setImages] = useState([])
  const [focused, setFocused] = useState(false)

  const breedsByType = useMemo(
    () => Breeds.filter(breed => breed.breedtypeid === breedType),
    [breedType]
  )

  useEffect(() => {
    setLoading(true)
    Promise.all(
      breedsByType.map(async breed => {
        try {
          const image = await import(
            `../../assets/images/breeds/${breedType === 1 ? 'dogs' : 'cats'}/${
              breed.breedname
            }.jpg`
          )

          return {
            breedname: breed.breedname,
            image: image.default
          }
        } catch {
          return null
        }
      })
    ).then(res => {
      setImages(res.filter(img => img != null))
      setLoading(false)
    })
  }, [breedsByType, breedType])

  const filteredBreeds = React.useMemo(() => {
    if (filter === '') return [...breedsByType]

    return breedsByType.filter(breed =>
      breed.breedname.toLowerCase().includes(filter.toLowerCase())
    )
    // .slice(0, 5)
  }, [breedsByType, filter])

  return (
    <Container
      onFocus={() => setFocused(true)}
      onBlur={() => setTimeout(() => setFocused(false), 200)}
    >
      <h5>RAÇAS DE {breedType === 1 ? 'CÃES' : 'GATOS'}</h5>
      <Input
        placeholder='Pesquise por raça'
        value={filter}
        onChange={e => setFilter(e.target.value)}
      />
      {focused ? (
        <BreedList>
          {loading ? (
            <div>Loading...</div>
          ) : (
            filteredBreeds.map(breed => (
              <BreedItem
                key={breed.breedname}
                breed={breed}
                img={images.find(img => img.breedname === breed.breedname)}
              />
            ))
          )}

          {!loading && filteredBreeds.length === 0 && (
            <h5>Nenhum resultado encontrado</h5>
          )}
        </BreedList>
      ) : null}
    </Container>
  )
}

export default BreedFilter
