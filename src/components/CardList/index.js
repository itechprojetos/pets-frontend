import styled from 'styled-components'

const CardList = styled.div`
  display: grid;
  grid-template-columns: repeat(${p => p.xs}, 1fr);
  @media screen and (min-width: 576px) {
    grid-template-columns: repeat(${p => p.sm}, 1fr);
  }
  @media screen and (min-width: 768px) {
    grid-template-columns: repeat(${p => p.md}, 1fr);
  }
  @media screen and (min-width: 992px) {
    grid-template-columns: repeat(${p => p.lg}, 1fr);
  }
  @media screen and (min-width: 1200px) {
    grid-template-columns: repeat(${p => p.xl}, 1fr);
  }
  grid-gap: 25px;
  width: 100%;
  margin-top: 1.3em;
  padding-bottom: 2em;
  & > * {
    column-span: 1;
  }

  & > .card-list-error {
    column-span: 10;
    color: rgba(255, 0, 0, 0.8);
  }
`

export default CardList
