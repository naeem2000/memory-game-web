'use client';

import React, { useEffect, useState } from 'react';
import { CurrentPlayers } from '@/modules/modules';
import './game.scss';

export default function Page() {
	const [players, setPlayers] = useState<CurrentPlayers>();

	useEffect(() => {
		const userString = localStorage.getItem('users');
		if (userString) {
			const user = JSON.parse(userString);
			setPlayers(user);
		} else {
			setPlayers(undefined);
		}
	}, []);
	console.log(players);

	return (
		<section>
			{players && <p>{players.player1}</p>}
			{players && <p>{players.player2}</p>}
		</section>
	);
}
