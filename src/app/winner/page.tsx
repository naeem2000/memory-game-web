'use client';

import player2Img from '../assets/player-2-img.svg';
import player1Img from '../assets/player-1-img.svg';
import React, { useEffect, useState } from 'react';
import { usePlayers } from '../hooks/usePlayers';
import winnerImg from '../assets/winner.svg';
import { useRouter } from 'next/navigation';
import trophy from '../assets/trophy.svg';
import rotate from '../assets/rotate.png';
import Image from 'next/image';
import './winner.scss';

interface WinnerScores {
	score1: number;
	score2: number;
}

interface Players {
	player1: string;
	player2: string;
}

export default function Page() {
	const [playerScores, setPlayerScores] = useState<WinnerScores>();
	const [winner, setWinner] = useState<string>();
	const [players, setPlayers] = useState<Players>();

	const router = useRouter();

	useEffect(() => {
		//fetch stored player names from login
		const userString = localStorage.getItem('users');
		if (userString) {
			//parsing the local storage to an object to retrieve each value from a pair
			const user = JSON.parse(userString);
			setPlayers(user);
		}
	}, []);

	console.log();

	useEffect(() => {
		//getting scores from local storage and parsing into object to use key value pairs individually
		const scores = localStorage.getItem('winner');
		if (scores) {
			const parsedScores: WinnerScores = JSON.parse(scores);
			setPlayerScores(parsedScores);
		}
	}, []);

	//second useffect if playerScores state changes in the dependency array then run the useffect
	useEffect(() => {
		if (playerScores) {
			if (playerScores.score1 > playerScores.score2) {
				setWinner('Player 1');
			} else if (playerScores.score1 < playerScores.score2) {
				setWinner('Player 2');
			} else {
				setWinner('Tie');
			}
		}
	}, [playerScores]);

	const playAgain = () => {
		localStorage.removeItem('winner');
		router.push('/game');
	};

	const exit = () => {
		localStorage.clear();
		router.push('/');
	};

	return (
		<section>
			<div className='winner-header'>
				<header>
					<div>
						<button onClick={exit}>Exit Game</button>
					</div>
				</header>
			</div>
			<div className='winner'>
				<div className='winner-body'>
					<h2>Well Done!</h2>
					<h1>{winner === 'Tie' ? "It's a Tie!" : `${winner} Wins!`}</h1>
					<Image src={winnerImg} alt='winner' />
					<div>
						<div className='win-row'>
							<Image src={trophy} alt='trophy' />
							<div className='winner-card'>
								<Image src={player1Img} alt='player 1' />
								<p>{winner === 'Player 1' ? '1st Place' : '2nd Place'}</p>
								<p>{players?.player1}</p>
								<p>Score: {playerScores?.score1}</p>
							</div>
						</div>
						<div className='winner-card'>
							<Image src={player2Img} alt='player 2' />
							<p>{winner === 'Player 2' ? '1st Place' : '2nd Place'}</p>
							<p>{players?.player2}</p>
							<p>Score: {playerScores?.score2}</p>
						</div>
					</div>
				</div>
				<button onClick={playAgain}>Play again</button>
			</div>
			<div className='rotate-notify'>
				<p>Please rotate your device</p>
				<Image src={rotate} alt='rotate' />
			</div>
		</section>
	);
}
