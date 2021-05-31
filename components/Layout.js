import React, { Children } from 'react';
import Head from 'next/Head';

export default function Layout({ title, children }) {
	return (
		<div className="bg-gray-300">
			<main className="container mx-auto max-w-xl pt-8 min-h-screen">
				{children}
			</main>
		</div>
	);
}
