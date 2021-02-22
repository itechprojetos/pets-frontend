import styled from 'styled-components'

export const ChatBox = styled.div`
  width: ${p => (p.visible ? '300px' : '35px')};
  max-height: 500px;
  height: ${p => (p.visible ? '500px' : '30px')};
  position: fixed;
  bottom: ${p => (p.visible ? '0px' : '30px')};
  right: 0px;
  background: #eee;
  z-index: 11;
  opacity: ${p => (p.visible ? '1' : '0.7')};
`
export const MainChatHeader = styled.div`
  display: flex;
  width: 300px;
  height: 30px;
  background: #ffbd00;
  padding: ${p => (p.visible ? '5px 5px 5px 15px' : '5px')};
  align-items: center;
  font-weight: bold;
  position: fixed;
  cursor: pointer;
  box-shadow: 0px 3px 5px -4px rgba(0, 0, 0, 0.9);
  z-index: 12;
`

export const BodyChat = styled.div`
  visibility: ${p => (p.visible ? 'visible' : 'hidden')};
  overflow-y: auto;
  height: 100%;
`

export const MessagesListBox = styled.div`
  display: flex;
  flex-direction: column;
  top: 30px;
  width: 100%;
  height: 100%;
  position: relative;
`

export const ConversationsBox = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  margin: 5px;
  &:hover {
    background: #ddd;
  }
  &:hover button {
    background: #ddd;
  }
`

export const ProfilePhoto = styled.div`
  border-radius: 50%;
  width: 50px;
  height: 50px;
  background-image: url(${p => p.profPic});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50% 50%;
  position: initial;
  margin: 10px;
`

export const Conversations = styled.div`
  border: 0;
  display: block;
  color: #303030;
  text-decoration: none;
  padding: 5px;
  font-size: 20px;
  position: relative;
  align-items: center;
  width: 60%;

  span {
    margin: 5px 0px 5px 0px;
    display: block;
    font-size: 12px;
    color: #303030;
  }
`
export const DeleteButton = styled.button`
  color: #bbb;
  align-items: center;
  justify-content: center;
  border-radius: 3px;
  transition: transform 0.3s, color 0.3s, background 0s;
  transform: scale(1);
  &:hover {
    color: #fa8072;
    background: #fff;
    transform: scale(1.5);
  }
`

export const ConversationChannel = styled.div`
  position: fixed;
  bottom: 0;
  right: ${p => {
    if (!p.mainChat) return 10 + p.index * 303
    if (p.mainChat && !p.mainMin) return 300 + p.index * 303
    if (p.mainChat && p.mainMin) return 40 + p.index * 303
  }}px;
  width: 300px;
  height: 350px;
  background: #eee;
  margin-right: 3px;
  z-index: 11;
`
export const ConversationHeader = styled.div`
  width: 100%;
  display: flex;
  background: #ffbd00;
  padding: 3px;
  box-shadow: 0px 3px 5px -4px rgba(0, 0, 0, 0.9);
  cursor: pointer;
`

export const BodyChannel = styled.div``

export const ConversationProfPic = styled.div`
  width: 30px;
  height: 30px;
  background: url('https://daikyn.com.br/wp-content/uploads/2019/05/perfil-twitter.png');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50% 50%;
  border-radius: 50%;
`

export const ConversationSubHeader = styled.div`
  color: #222;
  width: 89%;
  height: 30px;
  align-items: center;
  display: flex;
  background: #ffbd00;
  justify-content: space-between;
  padding: 0px 5px 0px 10px;
  font-weight: bold;
`

export const ConversationCloseButton = styled.button`
  color: #777;
  background: #ffbd00;
  transition: transform 0.3s, color 0.3s;
  transform: scale(1);
  &:hover {
    color: #fa8072;
    transform: scale(1.5);
  }
`

export const MessagesArea = styled.div`
  display: flex;
  background: #eee;
  width: 100%;
  height: 250px;
  padding: 25px;
  align-items: flex-end;
  justify-content: flex-end;

  div {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: auto;
    height: auto;
    background: #ffbd00;
    border-radius: 5px;
    padding: 5px 10px 5px 10px;
    font-size: 16px;
  }
`

export const TextArea = styled.div`
  display: flex;
  width: 100%;
  background: #eee;
  height: 70px;
  border-top: 3px solid;
  border-color: #ffbd00;
  border-radius: 0px 3px 0px 3px;
`

export const InputArea = styled.input`
  height: 50px;
  margin: 5px 0px 5px 5px;
  border-radius: 5px;
  padding: 5px;
  width: 230px;
`

export const ConversationButtonArea = styled.div`
  width: 60px;
  height: 50px;
  margin: 5px;
`
export const Anexos = styled.div`
  display: flex;
  height: 20px;
  font-size: 12px;
  background: #ddd;
  color: black;
  align-items: center;
  justify-content: space-around;
  border-radius: 3px;
  cursor: pointer;
  &:hover {
    background: #333;
  }
`

export const Enviar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30px;
  background: #ddd;
  font-size: 22px;
  border-radius: 3px 3px 0px 0px;
  border-bottom: 1px solid;
  cursor: pointer;
  &:hover {
    background: #333;
  }
`
