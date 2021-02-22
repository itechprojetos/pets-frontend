import React from 'react'
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import './HeartComponent.scss'

type HeartComponentProps = {
  favorited: boolean
  toggleFavorited: () => void
  marginTop?: string | number;
  marginRight?: string | number;
  fontSize?: string | number;
  visible: boolean;
}

const HeartComponent: React.FC<HeartComponentProps> = ({ favorited, toggleFavorited, marginTop, marginRight, fontSize, visible }) => {
  const handleClick = React.useCallback((e) => {
    e.stopPropagation()
    toggleFavorited()
  }, [toggleFavorited])

  const Element = React.useMemo(() => {
    if (!visible) return null;

    if (favorited) return <div className='favorite-heart active' style={{ marginTop, marginRight, fontSize }}><FaHeart className='favorite-heart-icon' onClick={handleClick} /></div>

    return <div className='favorite-heart' style={{ marginTop, marginRight, fontSize }}><FaRegHeart className='favorite-heart-icon' onClick={handleClick} /></div>
  }, [favorited, fontSize, handleClick, marginRight, marginTop, visible])

  return <>
    {Element}
  </>

}

export default HeartComponent