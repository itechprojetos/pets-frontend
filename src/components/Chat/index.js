import React, { useContext } from 'react'
import { FaTrashAlt, FaTimes, FaPaperclip, FaGrinAlt } from 'react-icons/fa'
import { MdSend } from 'react-icons/md'
import { faComment } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ChatContext from '../../contexts/Chat/ChatContext'

import {
  ChatBox,
  BodyChat,
  MainChatHeader,
  MessagesListBox,
  ConversationsBox,
  ProfilePhoto,
  Conversations,
  DeleteButton,
  ConversationChannel,
  ConversationHeader,
  BodyChannel,
  ConversationProfPic,
  ConversationSubHeader,
  ConversationCloseButton,
  MessagesArea,
  TextArea,
  InputArea,
  ConversationButtonArea,
  Anexos,
  Enviar
} from './styles'

const Chat = () => {
  const {
    opened,
    conversations,
    openedChannels,
    openChannels,
    closeChannel,
    chatMinimize,
    Minimize
  } = useContext(ChatContext)

  return (
    <>
      {opened && (
        <ChatBox visible={!chatMinimize}>
          <MainChatHeader onClick={() => Minimize()} visible={!chatMinimize}>
            {!chatMinimize ? (
              'Mensagens'
            ) : (
              <FontAwesomeIcon icon={faComment} color='#fff' />
            )}
          </MainChatHeader>
          <BodyChat visible={!chatMinimize}>
            <MessagesListBox>
              {conversations.map(conv => (
                <ConversationsBox>
                  <ProfilePhoto profPic={conv.urlProf} />
                  <Conversations
                    key={conv.id}
                    onClick={() => openChannels(conv.name)}
                  >
                    {conv.name}
                    <span>{conv.lastMsg}</span>
                  </Conversations>
                  <DeleteButton>
                    <FaTrashAlt />
                  </DeleteButton>
                </ConversationsBox>
              ))}
            </MessagesListBox>
          </BodyChat>
        </ChatBox>
      )}
      {openedChannels.map((channel, index) => (
        <ConversationChannel
          key={channel.id}
          index={index}
          mainChat={opened}
          mainMin={chatMinimize}
        >
          <ConversationHeader>
            <ConversationProfPic />

            <ConversationSubHeader>
              {channel.id}
              <ConversationCloseButton onClick={() => closeChannel(channel.id)}>
                <FaTimes />
              </ConversationCloseButton>
            </ConversationSubHeader>
          </ConversationHeader>
          <BodyChannel>
            <MessagesArea>
              <div>Lorem ipsum dolor</div>
            </MessagesArea>
            <TextArea>
              <InputArea placeholder={'Digite sua menssagem aqui!'} />
              <ConversationButtonArea>
                <Enviar>
                  <MdSend />
                </Enviar>
                <Anexos onCLick={() => <input type='file' />}>
                  <FaPaperclip />
                </Anexos>
              </ConversationButtonArea>
            </TextArea>
          </BodyChannel>
        </ConversationChannel>
      ))}
    </>
  )
}

export default Chat
