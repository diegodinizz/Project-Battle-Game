import React, { Fragment, useState } from "react";
import PlayerBattleSprite from "../Components/BattleComponents/PlayerBattleSprite";
import EnemyBattleSprite from "../Components/BattleComponents/EnemyBattleSprite";

import { Redirect } from "react-router-dom";

import "./BattleContainer.css";

const BattleContainer = ({
	currentPlayer,
	currentCharacter,
	currentEnemy,
	playerAttacksEnemy,
	enemyAttacksPlayer,
	playerDefends,
	resetEnemy,
	accumulateScore,
}) => {
	const [playerTurn, setPlayerTurn] = useState(true);
	const [enemyDamaged, setEnemyDamaged] = useState(false);
	const [playerDamaged, setPlayerDamaged] = useState(false);

	if (!currentPlayer.id || !currentCharacter.maxHP) {
		return <Redirect to="/" />;
	}

	if (currentEnemy.alive === false) {
		console.log(currentEnemy.currentHP);
		resetEnemy();
		accumulateScore();
		return <Redirect to="/endgame" />;
	}

	if (currentCharacter.alive === false) {
		console.log(currentCharacter.currentHP);
		resetEnemy();
		return <Redirect to="/endgame" />;
	}

	function attack() {
		setEnemyDamaged(true);
		setTimeout(() => {
			setEnemyDamaged(false);
			playerAttacksEnemy();
			setPlayerDamaged(true);
			setTimeout(() => {
				setPlayerDamaged(false);
				enemyAttacksPlayer();
			}, 3000);
		}, 3000);
	}

	function defend() {
		setEnemyDamaged(true);
		setTimeout(() => {
			setEnemyDamaged(false);
			playerDefends();
			setPlayerDamaged(true);
			setTimeout(() => {
				setPlayerDamaged(false);
				enemyAttacksPlayer();
			}, 3000);
		}, 3000);
	}

	return (
		<Fragment>
			<div id="battle-container">
				<h1>FIGHT!</h1>
				<PlayerBattleSprite
					currentCharacter={currentCharacter}
					damage={playerDamaged}
				/>
				<EnemyBattleSprite hp={currentEnemy} damage={enemyDamaged} />
				<button id="attack" onClick={attack}>
					Attack!
				</button>
				<button id="defend" onClick={defend}>
					Defend!
				</button>
			</div>
		</Fragment>
	);
};

export default BattleContainer;
