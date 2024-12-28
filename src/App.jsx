import { useState } from 'react'
import GameBoard from './components/GameBoard'
import Player from './components/Player'
import Log from './components/Log'

function deriveActivePlayer(gameTurns) {
  let currentPlayer = 'X'

  if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
    currentPlayer = 'O'
  }

  return currentPlayer
}

function App() {
  const [gameTurns, setGameTurns] = useState([])
  //const [activePlayer, setActivePlayer] = useState('X')
  // let currentPlayer = 'X'

  // if (gameTurns.length > 0 && prevGameTurns[0].player === 'X') {
  //   currentPlayer = 'O'
  // }

  //console.log('Turns State Manager', gameTurns)

  let activePlayer = deriveActivePlayer(gameTurns)

  function handleSelectSquare(rowIndex, colIndex) {
    //setActivePlayer((currActivePlayer) =>
    //  currActivePlayer === 'X' ? 'O' : 'X'
    //)

    setGameTurns((prevGameTurns) => {
      const currentPlayer = deriveActivePlayer(prevGameTurns)
      const updatedTurns = [
        {
          square: { row: rowIndex, col: colIndex },
          player: currentPlayer,
        },
        ...prevGameTurns,
      ]

      return updatedTurns
    })
  }

  return (
    <main>
      <div id='game-container'>
        <ol id='players' className='highlight-player'>
          <Player
            initialPlayerName='Player 1'
            symbol='X'
            isActive={activePlayer === 'X'}
          />
          <Player
            initialPlayerName='Player 2'
            symbol='O'
            isActive={activePlayer === 'O'}
          />
        </ol>
        <GameBoard onSelectSquare={handleSelectSquare} turns={gameTurns} />
      </div>
      <Log turns={gameTurns} />
    </main>
  )
}

export default App
