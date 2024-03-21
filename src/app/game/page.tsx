'use client';

import React, { useEffect, useState } from 'react';
import { CurrentPlayers } from '@/modules/modules';
import Header from '../Components/Header';
import './game.scss';
import { cards } from '../data';
import facedDown from '../assets/cards/Card_Back.svg';
import Image from 'next/image';

export default function Page() {
	const [players, setPlayers] = useState<CurrentPlayers>();
	const [board, setBoard] = useState(cards.card);
	const [flippedCards, setFlippedCards] = useState<number[]>([]);

	useEffect(() => {
		const userString = localStorage.getItem('users');
		if (userString) {
			const user = JSON.parse(userString);
			setPlayers(user);
		}
	}, []);

	const handleCardClick = (index: number) => {
		if (flippedCards.includes(index)) return;

		setFlippedCards((prevFlippedCards) => [...prevFlippedCards, index]);

		if (flippedCards.length === 1) {
			const firstCardIndex = flippedCards[0];
			const secondCardIndex = index;

			if (board[firstCardIndex].id === board[secondCardIndex].id) {
				console.log('Match!');

				setBoard((prevBoard) =>
					prevBoard.filter(
						(card, i) => i !== firstCardIndex && i !== secondCardIndex
					)
				);
			} else {
				setTimeout(() => {
					setFlippedCards([]);
				}, 1000);
			}
		}
	};

	return (
		<section className='game'>
			<Header />
			<div className='game-body'>
				<div className='player1'>1</div>
				<div className='board'>
					{board.map((card, index) => (
						<div key={index} onClick={() => handleCardClick(index)}>
							<Image
								src={flippedCards.includes(index) ? card.img : facedDown}
								alt='card'
							/>
						</div>
					))}
				</div>
				<div className='player2'>2</div>
			</div>
		</section>
	);
}
