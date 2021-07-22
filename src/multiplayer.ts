import { io } from 'socket.io-client'

export function connect() {
  const socket = io(`https://fnsty.herokuapp.com`, { transports: ['websocket'] })

  socket.on('chat message', function (msg) {
    console.log('socket msg', msg)
  })

  return socket
}

export const chan = connect()
