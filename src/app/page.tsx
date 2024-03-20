'use client';

import { Errors, Users } from '@/modules/modules';
import player1 from './assets/player-1-img.svg';
import player2 from './assets/player-2-img.svg';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Image from 'next/image';
import './home.scss';

export default function Home() {
	// player states
	const [playersName, setPlayersName] = useState<Users>({
		player1: '',
		player2: '',
	});

	// error states
	const [playersError, setPlayersError] = useState<Errors>({
		player1Error: false,
		player2Error: false,
	});

	//next router hook
	const router = useRouter();

	//proceed function
	const letsPlay = () => {
		//copy of errors in an obj to be used independenly when triggered
		const errors = {
			player1Error: !playersName.player1,
			player2Error: !playersName.player2,
		};

		//tracker if requirements are met or not
		let letsGo: boolean = false;

		//condition logic
		if (!playersName.player1) {
			setPlayersError({ ...playersError, player1Error: true });
		} else {
			setPlayersError({ ...playersError, player1Error: false });
			letsGo = true;
		}
		if (!playersName.player2) {
			setPlayersError({ ...playersError, player2Error: true });
		} else {
			setPlayersError({ ...playersError, player2Error: false });
			letsGo = true;
		}
		//assigning errors obj to state after firing
		setPlayersError(errors);

		letsGo = !errors.player1Error && !errors.player2Error;

		//router hook to nav to game
		if (letsGo) {
			router.push('/game');
		}

		return console.log(letsGo, playersName);
	};

	return (
		<>
			<section className='home'>
				<header>
					<div>
						<h1>Memory</h1>
						<button>Exit Game</button>
					</div>
				</header>
				<div className='home-content'>
					<div className='home-body'>
						<h2>Are you ready to play?</h2>
						<div className='players'>
							<div>
								<Image src={player1} alt='player 1' />
								<input
									type='text'
									placeholder='Player 1'
									onChange={(e) =>
										setPlayersName({ ...playersName, player1: e.target.value })
									}
									value={playersName.player1}
									className={playersError.player1Error ? 'error-outline' : ''}
								/>
								{playersError.player1Error ? (
									<p>Please enter player 1 name</p>
								) : (
									<p>&nbsp;</p>
								)}
							</div>
							<div>
								<Image src={player2} alt='player 2' />
								<input
									type='text'
									placeholder='Player 2'
									onChange={(e) =>
										setPlayersName({ ...playersName, player2: e.target.value })
									}
									value={playersName.player2}
									className={playersError.player2Error ? 'error-outline' : ''}
								/>
								{playersError.player2Error ? (
									<p>Please enter player 2 name</p>
								) : (
									<p>&nbsp;</p>
								)}
							</div>
						</div>
						<button onClick={letsPlay}>Let's Play</button>
					</div>
				</div>
			</section>
		</>
	);
}
