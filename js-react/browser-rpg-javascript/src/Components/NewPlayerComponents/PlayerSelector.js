import React from 'react'

const PlayerSelector = ({players, changePlayer}) => {

   console.log(players);
   
   // if(!props._embedded) return null
    const playerList = players.map((player, index) => {
       return <option key={index} value={player.id} >
          {player.name}
        </option>
    })

    return (
       <select id="player-select" defaultValue="default" onChange={changePlayer}>
         <option disabled value="default">
         Select Player
         </option>
         {playerList}
       </select> 
    )
}

export default PlayerSelector