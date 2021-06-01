import React from 'react';
import Layout from '../components/Layout';
import Link from 'next/Link';

export default function pokemon({ pokeman }) {
	console.log(pokeman);
	return (
		<Layout title={pokeman.name}>
			<h1 className="text-4xl mb-2 text-center capitalize">
				{pokeman.name}
			</h1>
			<img
				src={pokeman.image}
				alt={pokeman.name}
				className="mx-auto"
			/>
			<p>
				<span className="font-bold mr-2">
					Weight: {pokeman.weight}
				</span>
			</p>
			<p>
				<span className="font-bold mr-2">
					Height: {pokeman.height}
				</span>
			</p>
			<h2 className="text-2xl mt-6 mb-2">Types: </h2>
			{pokeman.types.map((type, index) => (
				<p key={index}>{type.type.name}</p>
			))}
			<p className="mt-10 text-center">
				<Link href="/">
					<a className="text-2xl underline">
						Home
					</a>
				</Link>
			</p>
		</Layout>
	);
}

//This is the other function that is the server-side rendered page (as opposed to a static page) that was mentioned in the index.js file

export async function getServerSideProps({ query }) {
	const id = query.id;
	try {
		const res = await fetch(
			`https://pokeapi.co/api/v2/pokemon/${id}`
		);
		const pokeman = await res.json();
		const paddedIndex = ('00' + id).slice(-3);
		const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${paddedIndex}.png`;
		pokeman.image = image;
		return {
			props: { pokeman }
		};
	} catch (error) {
		console.log(error);
	}
}
