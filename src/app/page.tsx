'use client';

import { usePlayers } from './hooks/usePlayers';
import player1 from './assets/player-1-img.svg';
import player2 from './assets/player-2-img.svg';
import Header from './Components/Header';
import Image from 'next/image';
import './home.scss';

export default function Home() {
	//custom hook to set the players
	const { setPlayersName, playersName, playersError, letsPlay } = usePlayers();
	return (
		<>
			<section className='home'>
				<Header />
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
