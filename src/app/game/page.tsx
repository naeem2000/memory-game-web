'use client';

import facedDown from '../assets/cards/Card_Back.svg';
import player1Img from '../assets/player-1-img.svg';
import player2Img from '../assets/player-2-img.svg';
import { CurrentPlayers } from '@/modules/modules';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '../Components/Header';
import rotate from '../assets/rotate.png';
import { cards } from '../data';
import Image from 'next/image';
import './game.scss';

export default function Page() {
	//states for players, cards, scores, current player, cards that are flipped, game completed
	const [players, setPlayers] = useState<CurrentPlayers>();
	const [board, setBoard] = useState(cards.card);
	const [flippedCards, setFlippedCards] = useState<number[]>([]);
	const [player1Score, setPlayer1Score] = useState(0);
	const [player2Score, setPlayer2Score] = useState(0);
	const [currentPlayer, setCurrentPlayer] = useState(1);
	const [gameCompleted, setGameCompleted] = useState(false);

	const router = useRouter();

	//function to reset deck once the page mounts
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

	const handleCardClick = (index: number) => {
		// comparing the cards if it's = or less than 2, or if the card matches the index
		if (flippedCards.length >= 2 || flippedCards.includes(index)) return;

		// updating the state by using spread to update the indexed card in the state array
		setFlippedCards((prevFlippedCards) => [...prevFlippedCards, index]);

		// condition if it's strictly = 1 then reset the flipped cards to be faced down if do not match
		if (flippedCards.length === 1) {
			const firstCardIndex = flippedCards[0];
			const secondCardIndex = index;

			// checking if the flipped cards match each other's alt attributes
			if (board[firstCardIndex].alt === board[secondCardIndex].alt) {
				//storing player scores in an object for stringify then parse for local storage
				const winner = {
					score1: player1Score,
					score2: player2Score,
				};
				localStorage.setItem('winner', JSON.stringify(winner));
				// condition if the player got 1 match right, add a score point to the player
				if (currentPlayer === 1) {
					setPlayer1Score((prevScore) => prevScore + 1);
				} else {
					setPlayer2Score((prevScore) => prevScore + 1);
				}
				// updating the board once all the above has met
				setBoard((prevBoard) =>
					prevBoard.filter(
						(card, i) => i !== firstCardIndex && i !== secondCardIndex
					)
				);
			}
			// turn cards back over once flipped, else if it's correct then flip it over again, then add a point
			setTimeout(() => {
				setFlippedCards([]);
				// Switch players only after two matches have been attempted
				if (flippedCards.length === 1) {
					setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
				}
			}, 500);
		}
	};

	//replace the board with its a wrap image
	useEffect(() => {
		if (board.length !== 0) {
			setGameCompleted(true);
			//navigate to the winner page
			setTimeout(() => {
				router.push('/winner');
			}, 2000);
		}
	}, [board]);

	//reset game function
	const reset = () => {
		setBoard(cards.card);
		setPlayer1Score(0);
		setPlayer2Score(0);
		setGameCompleted(false);
	};

	return (
		<section className='game'>
			<Header reset={reset} />
			<div className='game-body'>
				<div className='card-section'>
					<div className='player-card'>
						<Image src={player1Img} alt='player 1' />
						<p>{players?.player1} </p>
						<p>Score: {player1Score}</p>
					</div>
					{currentPlayer === 1 ? <p>It’s your turn</p> : <span>&nbsp;</span>}
				</div>
				{!gameCompleted ? (
					<div className='board'>
						{board.map((card, index) => (
							<div key={index} onClick={() => handleCardClick(index)}>
								<Image
									src={!flippedCards.includes(index) ? card.img : facedDown}
									alt={card.alt}
								/>
							</div>
						))}
					</div>
				) : (
					<div className='its-a-wrap'></div>
				)}
				<div className='card-section'>
					<div className='player-card'>
						<Image src={player2Img} alt='player 2' />
						<p>{players?.player2}</p>
						<p>Score: {player2Score}</p>
					</div>
					{currentPlayer === 2 ? <p>It’s your turn</p> : <span>&nbsp;</span>}
				</div>
			</div>
			<div className='mobile-cards'>
				<div className='player-card'>
					<Image src={player1Img} alt='player 1' />
					<p>{players?.player1} </p>
					{currentPlayer === 1 ? (
						<div>It’s your turn</div>
					) : (
						<span>&nbsp;</span>
					)}
					<p>{player1Score}</p>
				</div>
				<p>Score</p>
				<div className='player-card'>
					<Image src={player2Img} alt='player 2' />
					<p>{players?.player2}</p>
					{currentPlayer === 2 ? (
						<div>It’s your turn</div>
					) : (
						<span>&nbsp;</span>
					)}
					<p>{player2Score}</p>
				</div>
			</div>
			<div className='rotate-notify'>
				<p>Please rotate your device</p>
				<Image src={rotate} alt='rotate' />
			</div>
		</section>
	);
}
