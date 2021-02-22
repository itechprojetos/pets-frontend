import React, { useState } from 'react'
import ProviderForm from './ProviderForm'
import { CustomerTypesIds } from '../../../shared'

const ProviderFormChooseType = ({ onChosenType }) => {
  const [type, setType] = useState(0)

  const setChosenType = chosenType => {
    setType(chosenType)
    onChosenType(chosenType)
  }

  return (
    <>
      {type === 0 ? (
        <div className='d-flex flex-column mt-4'>
          <button
            className='btn btn-primary col-md-4 mt-5'
            onClick={() => setChosenType(CustomerTypesIds.dayCare)}
          >
            Day Care
          </button>
          <button
            className='btn btn-primary col-md-4 mt-3'
            onClick={() => setChosenType(CustomerTypesIds.trainingSchool)}
          >
            Escola de Treinamento
          </button>
          <button
            className='btn btn-primary col-md-4 mt-3'
            onClick={() => setChosenType(CustomerTypesIds.hotel)}
          >
            Hotel
          </button>
          <button
            className='btn btn-primary col-md-4 mt-3'
            onClick={() => setChosenType(CustomerTypesIds.ong)}
          >
            ONG
          </button>
        </div>
      ) : (
        <ProviderForm type={type} />
      )}
    </>
  )
}

export default ProviderFormChooseType
