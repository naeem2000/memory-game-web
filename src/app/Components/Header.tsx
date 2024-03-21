import { usePathname } from 'next/navigation';
import React from 'react';

export default function Header() {
	const path = usePathname();

	return (
		<header>
			<div>
				<h1>Memory</h1>
				<div>
					{path === '/game' && (
						<button>Restart Game</button> // Call reset function when button is clicked
					)}
					<button>Exit Game</button>
				</div>
			</div>
		</header>
	);
}
