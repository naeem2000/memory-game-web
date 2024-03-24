import { usePathname, useRouter } from 'next/navigation';
import React from 'react';

type Props = {
	reset: () => void;
};

export default function Header({ reset }: Props) {
	const path = usePathname();
	const router = useRouter();

	const exit = () => {
		router.push('/');
		localStorage.clear();
	};

	return (
		<header>
			<div>
				<h1>Memory</h1>
				<div>
					{path === '/game' && (
						<button onClick={reset}>Restart Game</button> // Call reset function when button is clicked
					)}
					<button onClick={exit}>Exit Game</button>
				</div>
			</div>
		</header>
	);
}
