import { createContext } from 'react'

const DEFAULT_VALUE = {
  opened: false,
  openChat: () => null,
  conversations: [],
  openedChannels: [],
  openChannels: id => null,
  closeChannel: id => null,
  Minimize: () => null,
  chatMinimize: false,
  channelMin: [],
  channelMinimize: id => null
}

export default createContext(DEFAULT_VALUE)
