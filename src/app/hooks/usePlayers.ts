import { Errors, Players } from '@/modules/modules';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function usePlayers() {
	// player states
	const [playersName, setPlayersName] = useState<Players>({
		player1: '',
		player2: '',
	});

	//error states
	const [playersError, setPlayersError] = useState<Errors>({
		player1Error: false,
		player2Error: false,
	});

	//navigation hook
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

		//navigation hook to nav to game
		if (letsGo) {
			router.push('/game');
		}

		return console.log(letsGo, playersName);
	};
	return {
		setPlayersError,
		setPlayersName,
		playersError,
		playersName,
		letsPlay,
	};
}
