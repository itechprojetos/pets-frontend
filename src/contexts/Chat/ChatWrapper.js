import React, { useState, useEffect, useMemo } from 'react'
import useWindowSize from '../../hooks/useWindowSize'
import ChatContext from './ChatContext'
import api from '../../services/api'

const ChatWrapper = ({ children }) => {
  const [opened, setOpened] = useState(false)
  const [chatMinimize, setChatMinimize] = useState(false)
  const [openedChannels, setOpenedChannels] = useState([])
  const [channelMin, setChannelMin] = useState([])

  // api
  //   .get('/api/services/app/Chat/GetUserChatFriendsWithSettings')
  //   .then(res => console.log(res))
  //   .catch(err => console.log(err))

  //responsividade

  const windowSize = useWindowSize()

  const windowCount = useMemo(
    () => Math.min(Math.floor((windowSize.width - 300) / 300), 3),
    [windowSize.width]
  )

  useEffect(() => {
    console.log(windowCount)
    if (openedChannels.length > 0)
      return setOpenedChannels(openedChannels.slice(0, windowCount))
  }, [windowCount])

  // Janela principal do chat

  const openChat = () => {
    setOpened(opened ? false : true)
    setChatMinimize(false)
  }

  const Minimize = () => {
    setChatMinimize(!chatMinimize ? true : false)
    if (windowCount <= 0) return setOpenedChannels([])
  }

  // janelas de conversação

  function openChannels (id) {
    if (openedChannels.findIndex(channel => channel.id === id) >= 0)
      return setOpenedChannels(
        openedChannels.filter(channel => channel.id !== id)
      )
    if (windowCount <= 0)
      return setOpenedChannels(
        [{ id, open: true }, ...openedChannels.slice(0, 0)],
        setChatMinimize(true)
      )

    setOpenedChannels([
      { id, open: true },
      ...openedChannels.slice(0, windowCount - 1)
    ])
  }

  function channelMinimize (id) {
    if (channelMin.findIndex(channel => channel.id === id) >= 0)
      return (
        setChannelMin(channelMin.filter(channel => channel.id !== id)),
        console.log(channelMin)
      )
    setChannelMin([{ id, minim: true }, ...channelMin])
    console.log(channelMin)
  }

  const closeChannel = id => {
    setOpenedChannels(openedChannels.filter(channel => channel.id !== id))
    setChannelMin(channelMin.filter(channel => channel.id !== id))
  }

  const conversations = [
    {
      id: 1,
      name: 'Pedro',
      lastMsg: 'Lorem ipsum dolor',
      urlProf:
        'https://daikyn.com.br/wp-content/uploads/2019/05/perfil-twitter.png'
    },
    {
      id: 2,
      name: 'João',
      lastMsg: 'Lorem ipsum dolor',
      urlProf:
        'https://daikyn.com.br/wp-content/uploads/2019/05/perfil-twitter.png'
    },
    {
      id: 3,
      name: 'Luiza',
      lastMsg: 'Lorem ipsum dolor',
      urlProf:
        'https://daikyn.com.br/wp-content/uploads/2019/05/perfil-twitter.png'
    },
    {
      id: 4,
      name: 'Maria',
      lastMsg: 'Lorem ipsum dolor',
      urlProf:
        'https://daikyn.com.br/wp-content/uploads/2019/05/perfil-twitter.png'
    },
    {
      id: 5,
      name: 'EnterPets',
      lastMsg: 'Lorem ipsum dolor',
      urlProf:
        'https://daikyn.com.br/wp-content/uploads/2019/05/perfil-twitter.png'
    },
    {
      id: 6,
      name: 'VetPet',
      lastMsg: 'Lorem ipsum dolor',
      urlProf:
        'https://daikyn.com.br/wp-content/uploads/2019/05/perfil-twitter.png'
    },
    {
      id: 7,
      name: 'Romulo',
      lastMsg: 'Lorem ipsum dolor',
      urlProf:
        'https://daikyn.com.br/wp-content/uploads/2019/05/perfil-twitter.png'
    },
    {
      id: 8,
      name: 'Tânia',
      lastMsg: 'Lorem ipsum dolor',
      urlProf:
        'https://daikyn.com.br/wp-content/uploads/2019/05/perfil-twitter.png'
    },
    {
      id: 9,
      name: 'José',
      lastMsg: 'Lorem ipsum dolor',
      urlProf:
        'https://daikyn.com.br/wp-content/uploads/2019/05/perfil-twitter.png'
    },
    {
      id: 10,
      name: 'Jorge',
      lastMsg: 'Lorem ipsum dolor',
      urlProf:
        'https://daikyn.com.br/wp-content/uploads/2019/05/perfil-twitter.png'
    }
  ]

  return (
    <ChatContext.Provider
      value={{
        opened,
        openChat,
        conversations,
        openedChannels,
        openChannels,
        closeChannel,
        chatMinimize,
        Minimize,
        channelMin,
        channelMinimize
      }}
    >
      {children}
    </ChatContext.Provider>
  )
}

export default ChatWrapper
