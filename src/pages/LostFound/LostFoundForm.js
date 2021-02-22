import React, { useState, useContext } from 'react'
import { useForm } from 'react-hook-form'
import styled from 'styled-components'
import ImageSelector from '../../components/ImageSelector'
import { Button } from 'react-bootstrap'
import useCEP from '../../hooks/useCEP'
import AuthenticationContext from '../../contexts/Authentication/AuthenticationContext'
import api from '../../services/api'
import { toast } from 'react-toastify'
import history from '../../routes/history'

// const lostFind = {
//   name: 'string',
//   url_image: 'string',
//   gender: 'string',
//   age: 0,
//   castration: 'string',
//   vaccines: 'string',
//   vermifuge: 'string',
//   temper: 'string',
//   created: '2020-04-09T20:49:57.118Z',
//   updated: '2020-04-09T20:49:57.118Z',
//   typeAction: 'string',
//   zipcode: 'string',
//   address: 'string',
//   complement: 'string',
//   city: 'string',
//   state: 'string',
//   reference: 'string',
//   phone: 'string',
//   obs: 'string',
//   petsTypeId: 0,
//   customerId: 0,
//   id: 0
// }

const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 600px;
`

const Form = styled.form``

const Field = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1em;
  /* padding-bottom: 0.5em; */
  & > label {
    margin-bottom: 0;
  }
`

const FieldInput = styled.input`
  padding: 0.5em;
  border: 1px solid rgba(0, 0, 0, 0.1);
`

const StyledImageSelector = styled.div`
  margin: 0 auto;
  width: 200px;
`

const RadioButtonGroup = styled.div`
  margin-top: 0.3em;
  & > label {
    margin-bottom: 0;
    & > input {
      margin-right: 0.5em;
    }

    &:not(:first-of-type) {
      margin-left: 1em;
    }
  }
`

const FieldErrorMessage = styled.span`
  color: red;
`

const FieldError = ({ value, validate }) => {
  return (
    <FieldErrorMessage>{validate && value && value.message}</FieldErrorMessage>
  )
}

const LostFoundForm = ({ type = 'lost', validate = true, submitHandler }) => {
  const { register, handleSubmit, watch, errors } = useForm()
  const [urlImage, setUrlImage] = useState('')
  const { address, city, uf, errored } = useCEP(watch('zipcode') || '')
  const { customer } = useContext(AuthenticationContext)

  console.log(errors)

  const onSubmit = values => {
    const date = new Date()
    const data = {
      customerId: Number(customer.id),
      typeAction: type,
      url_image: urlImage,
      created: date,
      updated: date,
      address,
      city,
      state: uf,
      ...values,
      petsTypeId: Number(values.petsTypeId),
      age: Number(values.age)
    }
    api
      .post('/services/app/LostFinds/CreateOrEdit', data)
      .then(() => {
        toast.success('O pet foi cadastrado com sucesso!')
        history.push('/lost-found')
      })
      .catch(() => {
        toast.error('Erro na sua solicitação')
      })
  }

  return (
    <Container>
      <StyledImageSelector>
        <ImageSelector
          uploadPrefix={`/lost-found/${type}/`}
          currentImage={urlImage}
          onChange={url => setUrlImage(url)}
        />
      </StyledImageSelector>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Field>
          <label>O pet é um</label>
          <RadioButtonGroup>
            <label>
              <input
                type='radio'
                defaultChecked
                name='petsTypeId'
                ref={register}
                value={1}
                autoFocus
              />
              Cão
            </label>
            <label>
              <input type='radio' name='petsTypeId' ref={register} value={2} />
              Gato
            </label>
          </RadioButtonGroup>
        </Field>
        <Field>
          <label>Nome</label>
          <FieldInput
            type='text'
            placeholder='Nome'
            name='name'
            ref={register({ required: 'Obrigatório' })}
          />
          <FieldError validate value={errors.name} />
        </Field>
        <Field>
          <label>O gênero dele é</label>
          <RadioButtonGroup>
            <label>
              <input
                type='radio'
                name='gender'
                defaultChecked
                ref={register}
                value='Macho'
              />
              Macho
            </label>
            <label>
              <input type='radio' name='gender' ref={register} value='Fêmea' />
              Fêmea
            </label>
          </RadioButtonGroup>
        </Field>
        <Field>
          <label>Castrado</label>
          <RadioButtonGroup>
            <label>
              <input
                type='radio'
                name='castration'
                defaultChecked
                ref={register}
                value='Sim'
              />
              Sim
            </label>
            <label>
              <input
                type='radio'
                name='castration'
                ref={register}
                value='Não'
              />
              Não
            </label>
          </RadioButtonGroup>
        </Field>
        <Field>
          <label>Idade</label>
          <FieldInput
            type='number'
            placeholder='Idade'
            name='age'
            ref={register({
              required: 'Obrigatório',
              validate: value =>
                isNaN(Number(value)) ? 'Deve ser um número' : null
            })}
          />
          <FieldError validate value={errors.age} />
        </Field>
        <Field>
          <label>Vacinas</label>
          <FieldInput
            type='text'
            placeholder='Vacinas'
            name='vaccines'
            ref={register({ required: 'Obrigatório' })}
          />
          <FieldError validate value={errors.vaccines} />
        </Field>
        <Field>
          <label>Vermífugos</label>
          <FieldInput
            type='text'
            placeholder='Vermífugos'
            name='vermifuge'
            ref={register({ required: 'Obrigatório' })}
          />
          <FieldError validate value={errors.vermifuge} />
        </Field>
        <Field>
          <label>Temperamento</label>
          <FieldInput
            type='text'
            placeholder='Temperamento'
            name='temper'
            ref={register({ required: 'Obrigatório' })}
          />
          <FieldError validate value={errors.temper} />
        </Field>
        <Field>
          <label>CEP</label>
          <FieldInput
            type='text'
            placeholder='CEP'
            name='zipcode'
            ref={register({
              required: 'Obrigatório',
              validate: () => (errored ? 'Preencha corretamente' : null)
            })}
          />
          <FieldError validate value={errors.zipcode} />
        </Field>
        <Field>
          <label>Endereço</label>
          <FieldInput
            type='text'
            placeholder='Endereço'
            // name='address'
            value={address}
            readOnly
          />
        </Field>
        <Field>
          <label>Cidade</label>
          <FieldInput
            type='text'
            placeholder='Cidade'
            // name='city'
            value={city}
            readOnly
          />
        </Field>
        <Field>
          <label>UF</label>
          <FieldInput
            type='text'
            placeholder='UF'
            // name='state'
            value={uf}
            readOnly
          />
        </Field>
        <Field>
          <label>Complemento</label>
          <FieldInput
            type='text'
            placeholder='Complemento'
            name='complement'
            ref={register}
          />
        </Field>
        <Field>
          <label>Referência</label>
          <FieldInput
            type='text'
            placeholder='Referência'
            name='reference'
            ref={register}
          />
        </Field>
        <Field>
          <label>Telefone</label>
          <FieldInput
            type='tel'
            placeholder='Telefone'
            name='phone' // 41 99897-3850
            ref={register({
              required: 'Obrigatório',
              validate: value => {
                if (value == null) return null
                console.log({ value })
                // return 'Precisa ser um número de telefone válido'
                return !/(\([1-9][0-9]\)?|[1-9][0-9])\s?([9]{1})?([0-9]{4})-?([0-9]{4})$/.test(
                  value
                )
                  ? 'Precisa ser um número de telefone válido'
                  : null
              }
            })}
          />
          <FieldError validate value={errors.phone} />
        </Field>
        <Field>
          <label>Observações</label>
          <FieldInput
            type='text'
            placeholder='Observações'
            multiple
            name='obs'
            ref={register}
          />
        </Field>
        <Button className='mt-3' type='submit'>
          Salvar
        </Button>
      </Form>
    </Container>
  )
}

export default LostFoundForm
