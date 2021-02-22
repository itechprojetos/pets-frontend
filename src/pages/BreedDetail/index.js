import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import styled from 'styled-components'
import Skeleton from 'react-loading-skeleton'
import useImage from '../../hooks/useImage'
import { Container as BootstrapContainer } from 'react-bootstrap'
import Patinha from '../../assets/icons/patinha'

const Container = styled(BootstrapContainer)`
  margin-top: 2em;
  margin-bottom: 2em;
  font-family: 'Lato';
`

const Header = styled.header`
  margin-bottom: 0.5em;
  width: 100%;
  & > h4 {
    font-weight: 600;
  }
`

const Content = styled.main`
  display: grid;
  grid-template-columns: 1fr;
  @media screen and (min-width: 1024px) {
    grid-template-columns: minmax(462px, 1fr) 1fr; */
  }
  grid-gap: 2em;
  & > .breed-image > img {
    min-height: 300px;
    object-fit: cover;
    max-width: 100%;
  }
`

const Characteristics = styled.div`
  margin-top: 1em;
  & > h5 {
    font-size: 1rem;
    font-weight: 600;
    text-transform: uppercase;
  }
`

const Stats = styled.footer`
  font-size: 16px;
  margin-top: 1em;
  display: flex;
  flex-direction: column;
`

const Stat = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 100%;
  margin-bottom: 0.5em;
  & > span:last-of-type {
    @media screen and (max-width: 600px) {
      margin-left: auto;
    }
    & > div:not(:first-of-type) {
      margin-left: 0.75em;
    }
  }
`

const Circle = styled.div`
  display: inline-block;
  width: 20px;
  height: 20px;
  background-color: ${p => (p.active === true ? '#fab900' : '#d8d8d8')};
  border-radius: 100%;
`

const PataContainer = styled.div`
  display: inline-block;
  width: 20px;
  height: 20px;
  color: ${p => (p.active === true ? '#fab900' : '#d8d8d8')};
`

const Pata = ({ active }) => {
  return (
    <PataContainer active={active}>
      <Patinha />
    </PataContainer>
  )
}

const getStarsFromNumber = number => {
  const yellowStars = Array.from(new Array(number)).map((v, k) => (
    <Pata key={k} active />
  ))

  const greyStars = Array.from(new Array(5 - number)).map((v, k) => (
    <Pata key={k} />
  ))

  return [...yellowStars, ...greyStars]
}

const BreedDetail = () => {
  const [breed, setBreed] = useState(null)
  const [breedImage, setBreedImage] = useState(null)
  const [loading, setLoading] = useState(true)
  const [errored, setErrored] = useState(false)
  const { name } = useParams()

  const image = useImage(breedImage)

  useEffect(() => {
    ;(async () => {
      const importedBreeds = await import('../../assets/data/breeds')

      const matchedBreed = importedBreeds.default.find(
        b => b.breedname.toLocaleLowerCase() === name.toLowerCase()
      )

      if (matchedBreed == null) {
        setErrored(true)
        setBreed(null)
        setBreedImage(null)
      }

      setBreed(matchedBreed)

      try {
        const breedImage = await import(
          `../../assets/images/breeds/${
            matchedBreed.breedtypeid === 1 ? 'dogs' : 'cats'
          }/${name}.jpg`
        )

        setBreedImage(breedImage.default)
      } catch {
        const image = await import(
          `../../assets/images/${
            matchedBreed.breedtypeid === 1 ? 'dog' : 'cat'
          }.png`
        )
        setBreedImage(image.default)
      }

      setErrored(false)
    })().finally(() => {
      setLoading(false)
    })
  }, [name])

  return (
    <Container>
      <Header>
        <h4>{loading ? <Skeleton /> : breed.breedname}</h4>
      </Header>
      <Content>
        <div className='breed-image'>
          {loading ? (
            <Skeleton width='100%' height='500px' />
          ) : (
            <img alt='' src={image.src} onError={image.handleError} />
          )}
        </div>
        <div className='breed-infos'>
          <p style={{ fontSize: '16px' }}>
            {loading ? <Skeleton count={10} /> : breed.description}
          </p>
          <Characteristics>
            <h5>
              Características do {loading ? <Skeleton /> : breed.breedname}
            </h5>

            <Stats>
              <Stat value={breed ? breed.energy : 0}>
                <span>Energia</span>
                <span>
                  {loading ? <Skeleton /> : getStarsFromNumber(breed.energy)}
                </span>
              </Stat>
              <Stat value={breed ? breed.obedience : 0}>
                <span>Obediência</span>
                <span>
                  {loading ? <Skeleton /> : getStarsFromNumber(breed.obedience)}
                </span>
              </Stat>
              <Stat value={breed ? breed.intelligence : 0}>
                <span>Inteligência</span>
                <span>
                  {loading ? (
                    <Skeleton />
                  ) : (
                    getStarsFromNumber(breed.intelligence)
                  )}
                </span>
              </Stat>
              <Stat value={breed ? breed.territorialist : 0}>
                <span>Territorialista</span>
                <span>
                  {loading ? (
                    <Skeleton />
                  ) : (
                    getStarsFromNumber(breed.territorialist)
                  )}
                </span>
              </Stat>
              <Stat value={breed ? breed.attached_ttowner : 0}>
                <span>Apegado ao dono</span>
                <span>
                  {loading ? (
                    <Skeleton />
                  ) : (
                    getStarsFromNumber(breed.attached_ttowner)
                  )}
                </span>
              </Stat>
              <Stat value={breed ? breed.trendtobark : 0}>
                <span>Tendência a latir</span>
                <span>
                  {loading ? (
                    <Skeleton />
                  ) : (
                    getStarsFromNumber(breed.trendtobark)
                  )}
                </span>
              </Stat>
              <Stat value={breed ? breed.childfriendship : 0}>
                <span>Amizade com crianças</span>
                <span>
                  {loading ? (
                    <Skeleton />
                  ) : (
                    getStarsFromNumber(breed.childfriendship)
                  )}
                </span>
              </Stat>
              <Stat value={breed ? breed.petfriendship : 0}>
                <span>Amizade com pets</span>
                <span>
                  {loading ? (
                    <Skeleton />
                  ) : (
                    getStarsFromNumber(breed.petfriendship)
                  )}
                </span>
              </Stat>
            </Stats>
          </Characteristics>
        </div>
      </Content>
    </Container>
  )
}

// {
//   "breedtypeid": 1,
//   "breedname": "Affenpinscher",
//   "photo": "",
//   "description": "Criado no século XVII na Alemanha, o affenpinscher era utilizado para caçar roedores. Pequeno e com uma pelagem um tanto quanto diferente, ele chama a atenção e confunde aqueles que não conhecem sobre a raça. Ele se parece bastante com o Griffon de Bruxelas, cachorro raro no Brasil, mas que é facilmente lembrado pelo cão Verdell que participa ao lado de Jack Nicholson do filme “Melhor Impossível”.",
//   "energy": 2,
//   "obedience": 2,
//   "intelligence": 2,
//   "territorialist": 2,
//   "attached_ttowner": 2,
//   "trendtobark": 2,
//   "childfriendship": 2,
//   "petfriendship": 2
// },

export default BreedDetail
