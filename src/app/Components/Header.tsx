import { usePathname } from 'next/navigation';
import React from 'react';

export default function Header() {
	const path = usePathname();
	return (
		<header>
			<div>
				<h1>Memory</h1>
				{path === '/game' && <p>awe</p>}
				<button>Exit Game</button>
			</div>
		</header>
	);
}
