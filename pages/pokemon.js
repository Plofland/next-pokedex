import React from 'react';
import Layout from '../components/Layout';
import Link from 'next/Link';

export default function pokemon({ pokeman }) {
	console.log(pokeman);
	return <div></div>;
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
