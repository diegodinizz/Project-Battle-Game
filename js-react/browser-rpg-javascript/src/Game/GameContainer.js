import React, {Component, Fragment} from 'react'
import StartScreenContainer from '../Containers/StartScreenContainer'
import NewCharacterContainer from '../Containers/NewCharacterContainer'
import BattleContainer from '../Containers/BattleContainer'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import EndGameContainer from '../Containers/EndGameContainer';
import NewPlayerContainer from '../Containers/NewPlayerContainer';


class GameContainer extends Component{

    constructor(props){
        super(props)
        this.state = {
            players: [],
            characters: [],
            currentPlayer: {name:''},
            currentCharacter: null,
            currentEnemy: {alive: true},
            newCharacterSpriteID: 0,
            createdNewPlayer: false,
            createdNewCharacter: false,
            playerIsDefending: false
        }
        this.handleCharacterSubmit = this.handleCharacterSubmit.bind(this)
        this.handleCurrentPlayerChange = this.handleCurrentPlayerChange.bind(this)
        this.handleNewPlayerForm = this.handleNewPlayerForm.bind(this)
        this.setCurrentPlayer = this.setCurrentPlayer.bind(this)
        this.playerAttacksEnemy = this.playerAttacksEnemy.bind(this)
        this.enemyAttacksPlayer = this.enemyAttacksPlayer.bind(this)
        this.playerDefends = this.playerDefends.bind(this)
        this.resetEnemy = this.resetEnemy.bind(this)
        this.accumulateScore = this.accumulateScore.bind(this)
        this.handleCurrentCharacterChange = this.handleCurrentCharacterChange.bind(this)
        this.setCurrentHPCharacter = this.setCurrentHPCharacter.bind(this)
        this.saveCharacter = this.saveCharacter.bind(this);
    }

    handleCharacterSubmit(event) {
        event.preventDefault();
        console.log("posting")
        const url = 'http://localhost:8080/avatars'
        const newCharacter = { name: event.target.name.value, maxHP: event.target.hp.value, currentHP: event.target.hp.value, power: event.target.power.value, spriteID: event.target.spriteID.value, score: 0, player: this.state.currentPlayer._links.player.href, alive: true}
        this.setState({currentCharacter: newCharacter})
        this.setState({createdNewCharacter: true})
        const headers = { 'Content-Type': 'application/json' }
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(newCharacter),
            headers: headers
        })
    }

    handleNewPlayerForm(event) {
        event.preventDefault();
        const url = 'http://localhost:8080/players'
        const newPlayer = { name: event.target.name.value }
        const headers = { 'Content-Type': 'application/json' }
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(newPlayer),
            headers: headers
        })
        this.setState({createdNewPlayer: true})
    }

    setCurrentPlayer(index){
        this.setState({ currentPlayer: this.state.players[index] })
    }

    handleCurrentPlayerChange(event){
        const playerIndex = event.target.value - 1 ;
        console.log(playerIndex)
        this.setState({currentPlayer: this.state.players[playerIndex]})
    }

    handleCurrentCharacterChange(event){
        const characterIndex = event.target.value -1;
        this.setState({currentCharacter: this.state.characters[characterIndex]})
        
    }

    componentDidUpdate(prevProps, prevState){
        if(this.state.createdNewPlayer === true){
            fetch("http://localhost:8080/players")
                .then(res => res.json())
                .then(newPlayers => this.setState({ players: newPlayers._embedded.players }))
                .then(err => console.error)
                this.setState({createdNewPlayer:false})
        }
        if(this.state.createdNewCharacter === true){
            fetch("http://localhost:8080/avatars")
                .then(res => res.json())
                .then(newCharacters => this.setState({ characters: newCharacters._embedded.avatars }))
                .then(err => console.error)
                this.setState({createdNewCharacter:false})
        }
    }

    componentDidMount(){
        fetch("http://localhost:8080/players")
            .then(res => res.json())
            .then(existingPlayers => this.setState({ players: existingPlayers._embedded.players }))
            .then(err => console.error)

        fetch("http://localhost:8080/avatars")
            .then(res => res.json())
            .then(avatars => this.setState({ characters: avatars._embedded.avatars }))
            .then(err => console.error)

        fetch("http://localhost:8080/enemies/1")
            .then(res => res.json())
            .then(enemy => this.setState({ currentEnemy: enemy }))
            .then(err => console.error)
    }

    playerAttacksEnemy(){
        this.setState({ playerIsDefending: false })
       
        const power = this.state.currentCharacter.power;
        if(!(this.state.currentEnemy.currentHP - power <= 0)){
            this.setState(prevState => {
                const currentEnemy = { ...prevState.currentEnemy }
                currentEnemy.currentHP -= power;                             
                return { currentEnemy };
            })
        }else {
            this.setState(prevState => {
                const currentEnemy = { ...prevState.currentEnemy}
                currentEnemy.alive = false;
                return {currentEnemy};
            })
        }
    }

    resetEnemy(){
        this.setState(prevState => {
            const currentEnemy = {...prevState.currentEnemy}
            currentEnemy.currentHP = currentEnemy.maxHP
            currentEnemy.alive = true
            return {currentEnemy}
        })
    }

    setCurrentHPCharacter(){
        this.setState(prevState => {
            const currentCharacter= {...prevState.currentCharacter}
            currentCharacter.currentHP = 0
            return {currentCharacter}
        })
    }

    accumulateScore(){
        this.setState(prevState => {
            const currentCharacter = {...prevState.currentCharacter}
            currentCharacter.score += 500
            return {currentCharacter}
        })
    }

    enemyAttacksPlayer(){
        let power= 0;
        if(this.state.currentEnemy.currentHP <= 70){
            power = this.state.currentEnemy.power + 30;
        }

        if(!this.state.playerIsDefending){
            power = this.state.currentEnemy.power;
        } else{
            power = this.state.currentEnemy.power - 20;
        }

        if (!(this.state.currentCharacter.currentHP - power <= 0)) {
            this.setState(prevState => {
                const currentCharacter = { ...prevState.currentCharacter }
                currentCharacter.currentHP -= power;
                return { currentCharacter };
            })
        } else {
            this.setState(prevState => {
                const currentCharacter = { ...prevState.currentCharacter }
                currentCharacter.alive = false;
                return { currentCharacter };
            })
        }
    }

    playerDefends(){
        this.setState({playerIsDefending: true})

        const power = this.state.currentCharacter.power;
        if (!(this.state.currentEnemy.currentHP - (power - 30) <= 0)) {
            this.setState(prevState => {
                const currentEnemy = { ...prevState.currentEnemy }
                currentEnemy.currentHP -= (power - 30);
                return { currentEnemy };
            })
        } else {
            this.setState(prevState => {
                const currentEnemy = { ...prevState.currentEnemy }
                currentEnemy.alive = false;
                return { currentEnemy };
            })
        }
    }

    saveCharacter() {
		const url = `http://localhost:8080/avatars`;
		const newCharacter = this.state.currentCharacter;
		const headers = { "Content-Type": "application/json" };
		fetch(url, {
			method: "POST",
			body: JSON.stringify(newCharacter),
			headers: headers,
		});
	}

    render(){

        return(
            <Router>
                <Fragment>
                    <Route exact path="/" component={StartScreenContainer} />
                    <Route exact path="/select-player" 
                        render={(props) => <NewPlayerContainer {...props} 
                        players={this.state.players} 
                        currentPlayer={this.state.currentPlayer}
                        changePlayer={this.handleCurrentPlayerChange} 
                        handleSubmit={this.handleNewPlayerForm}
                        handleNameChange={this.handlePlayerNameChange}
                        />}
                        />
                    <Route exact path="/new-character" 
                        render={(props) => 
                        <NewCharacterContainer {...props} 
                            currentPlayer={this.state.currentPlayer} 
                            currentCharacter={this.state.currentCharacter}
                            handleClick={this.handleClick} 
                            handleSubmit={this.handleCharacterSubmit}
                            characters={this.state.characters}
                            changeCharacter={this.handleCurrentCharacterChange}
                        />}
                        />
                    <Route exact path="/battle" 
                        render={(props) => <BattleContainer {...props}
                        currentPlayer={this.state.currentPlayer}
                        currentCharacter={this.state.currentCharacter} 
                        currentEnemy={this.state.currentEnemy}
                        resetEnemy={this.resetEnemy}
                        accumulateScore={this.accumulateScore}
                        setCurrentHPCharacter={this.setCurrentHPCharacter}
                        playerAttacksEnemy={this.playerAttacksEnemy}
                        enemyAttacksPlayer={this.enemyAttacksPlayer}
                        playerDefends={this.playerDefends}
                        />}
                        />
                    <Route exact path="/endgame"render={(props) => <EndGameContainer {...props}
                    currentCharacter={this.state.currentCharacter}
                    currentPlayer={this.state.currentPlayer}
                    />} 
                    /> 
                </Fragment>
            </Router>
        )
    }
}

export default GameContainer;
