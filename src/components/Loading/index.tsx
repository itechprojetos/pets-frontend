import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import './styles.scss'
import Patinha from '../../assets/icons/patinha'

interface Props {
  loading: boolean,
  bgColor?: string,
  initialOpacity?: number
}

const Container = styled.div<{ bgColor: string }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: ${p => p.bgColor};
  z-index: 25000;
  display: flex;
  align-items: center;
  justify-content: center;
`

const PatinhaWrapper = styled.div<{ opacity: number }>`
  width: 150px;
  height: 150px;
  background-color: black;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  & > svg {
    width: 100px;
    height: 100px;
    color: #ffbd00;
    opacity: ${p => p.opacity};
    transition: opacity .1s ease;
  }
`

const Loading: React.FC<Props> = ({ loading, bgColor = 'rgba(47,56,69,0.5)', initialOpacity = 0.3 }: Props) => {
  const [opacity, setOpacity] = useState(initialOpacity)

  useEffect(() => {
    if (opacity >= 0.9) return

    const timeout = setTimeout(() => {
      setOpacity(opacity + 0.2)
    }, 100)

    return (() => {
      clearTimeout(timeout)
    })
  }, [opacity])

  return loading ? (
    <Container bgColor={bgColor}>
      <PatinhaWrapper opacity={opacity}>
        <Patinha />
      </PatinhaWrapper>
    </Container>
  ) : null
}

export default Loading
