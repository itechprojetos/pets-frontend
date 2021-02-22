import React, { useState, useEffect } from 'react'

import DogImg from '../../assets/images/dog.png'
import CatImg from '../../assets/images/cat.png'

import Breeds from '../../assets/data/breeds'

import {
  useParams, Link
} from "react-router-dom"
import { Spinner } from 'react-bootstrap'

function TodasAsRacas() {
  const { animals } = useParams()
  const [breeds, setBreeds] = useState([])
  const [loading, setLoading] = useState(true)
  const [animal, setAnimal] = useState(animals)

  // const gatos =  ['Persa', 'Siamês', 'Himalaia', 'Maine Coon', 'Persa1', 'Siamês2', 'Himalaia2', 'Maine Coon2']
  // const cachorros = ['Hound', 'Akita', 'Affenpinschert', 'American', 'Hound1', 'Akita2', 'Affenpinschert3', 'American4']


  useEffect(() => {
    setAnimal(animals === 'dogs' ? 'Cachorro' : 'Gato')
    if (animals === 'dogs') {
      Promise.all(Breeds.filter(breed => breed.breedtypeid === 1).map(breed => new Promise((resolve) => {
        import(`../../assets/images/breeds/dogs/${breed.breedname}.jpg`).then(img => {
          resolve({ ...breed, image: img.default })
        }).catch(() => {
          resolve({ ...breed, image: DogImg })
        })
      })
      ))
        .then(dogBreeds => {
          console.log(dogBreeds)
          setBreeds(dogBreeds)
        }).finally(() => {
          setLoading(false)
        })
      return
    }

    Promise.all(Breeds.filter(breed => breed.breedtypeid === 2).map(breed => new Promise((resolve) => {
      import(`../../assets/images/breeds/cats/${breed.breedname}.jpg`).then(img => {
        resolve({ ...breed, image: img.default })
      }).catch(() => {
        resolve({ ...breed, image: CatImg })
      })
    })
    ))
      .then(catBreeds => {
        setBreeds(catBreeds)
      })
      .finally(() => setLoading(false))
  }, [animals])

  // const animal = animals == 'dogs' ? 'Cachorros' : '' || animals == 'cats' ? 'Gatos' : ''

  // const data = animals === 'dogs' ? cachorros : gatos
  // const img = animals == 'dogs' ? DogImg : CatImg

  // console.log(data)

  if (loading) return (
    <div className='loader-spinner'>
      <span>Carregando as raças...</span>
      <Spinner animation="border" />
    </div>
  )

  return (
    <div className="container">
      <h2 className="my-3" >Todas as raças de {animal} </h2>
      <div className="row d-flex justify-content-around mt-3 mb-5">
        {
          breeds.map((ele, index) =>
            <Link to={`/breeds/${ele.breedname}`} className="col-5 shadow mt-5 p-4 d-flex" style={{ textDecoration: 'none' }}>
              <div
                className=" mt-1 d-flex justify-content-center align-items-center"
                style={{
                  width: "90px",
                  height: "90px",
                  paddingTop: "16px",
                  paddingBottom: "16px",
                  paddingLeft: "10px",
                  paddingRight: "10px",
                  lineHeight: 1.33,
                  borderRadius: "90px",
                }}
              >
                <img src={ele.image} alt="" width="100" />
              </div>

              <div className="ml-5">
                <h6 className="mt-2" key={index}>{ele.breedname}</h6>
                <hr />
                <p>
                  {ele.description}
                </p>
              </div>
            </Link>
          )
        }
      </div>
    </div>
  )
}

export default TodasAsRacas
