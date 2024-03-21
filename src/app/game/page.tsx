'use client';

import facedDown from '../assets/cards/Card_Back.svg';
import React, { useEffect, useState } from 'react';
import { CurrentPlayers } from '@/modules/modules';
import player1Img from '../assets/player-1-img.svg';
import player2Img from '../assets/player-2-img.svg';
import Header from '../Components/Header';
import { cards } from '../data';
import Image from 'next/image';
import './game.scss';

export default function Page() {
	//states for players, cards, scores, current player, cards that are flipped
	const [players, setPlayers] = useState<CurrentPlayers>();
	const [board, setBoard] = useState(cards.card);
	const [flippedCards, setFlippedCards] = useState<number[]>([]);
	const [player1Score, setPlayer1Score] = useState(0);
	const [player2Score, setPlayer2Score] = useState(0);
	const [currentPlayer, setCurrentPlayer] = useState(1);

	//function to reset everything once the page mounts
	const shuffleDeck = () => {
		const shuffledDeck = [...board].sort(() => Math.random() - 0.5);
		setBoard(shuffledDeck);
	};

	useEffect(() => {
		//fetch stored player names from login
		const userString = localStorage.getItem('users');
		if (userString) {
			//parsing the local storage to an object to retrieve each value from a pair
			const user = JSON.parse(userString);
			setPlayers(user);
		}
		//function call to shuffle deck on page mount
		shuffleDeck();
	}, []);

	console.log(players);

	const handleCardClick = (index: number) => {
		//comparing the cards if its = or less than 2, or if the card matches the index
		if (flippedCards.length >= 2 || flippedCards.includes(index)) return;

		//updating the state by using spread to update the indexed card in the state array
		setFlippedCards((prevFlippedCards) => [...prevFlippedCards, index]);

		//condition if its strictly = 1 then reset the flipped cards to be faced down if do not match
		if (flippedCards.length === 1) {
			const firstCardIndex = flippedCards[0];
			const secondCardIndex = index;

			//checking if the flipped cards matches each others alt attributes
			if (board[firstCardIndex].alt === board[secondCardIndex].alt) {
				console.log('Match!');
				//condition if the player got 1 match right, add a score point
				if (currentPlayer === 1) {
					setPlayer1Score((prevScore) => prevScore + 1);
				} else {
					setPlayer2Score((prevScore) => prevScore + 1);
				}
				//updating the board once all the above has met
				setBoard((prevBoard) =>
					prevBoard.filter(
						(card, i) => i !== firstCardIndex && i !== secondCardIndex
					)
				);
			}
			//turn cards back over once flipped, else if its correct then flip it over again, then add a point
			setTimeout(() => {
				setFlippedCards([]);
				setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
			}, 500);
		} else {
			setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
		}
	};

	//arrow function to reset game
	const resetGame = () => {
		// Reset all game states
		setBoard(cards.card);
		setFlippedCards([]);
		setPlayer1Score(0);
		setPlayer2Score(0);
		setCurrentPlayer(1);
		shuffleDeck();
	};

	return (
		<section className='game'>
			<Header />
			<div className='game-body'>
				<div className='card-section'>
					<div className='player-card'>
						<Image src={player1Img} alt='player 1' />
						<p>{players?.player1} </p>
						<p>Score: {player1Score}</p>
					</div>
					{currentPlayer === 1 ? <p>It’s your turn</p> : <span>&nbsp;</span>}
				</div>
				<div className='board'>
					{board.map((card, index) => (
						<div key={index} onClick={() => handleCardClick(index)}>
							<Image
								src={flippedCards.includes(index) ? card.img : facedDown}
								alt={card.alt}
							/>
						</div>
					))}
				</div>
				<div className='card-section'>
					<div className='player-card'>
						<Image src={player2Img} alt='player 2' />
						<p>{players?.player2}</p>
						<p>Score: {player2Score}</p>
					</div>
					{currentPlayer === 2 ? <p>It’s your turn</p> : <span>&nbsp;</span>}
				</div>
			</div>
			<div className='rotate-notify'>
				<p>Please rotate your screen</p>
			</div>
		</section>
	);
}
