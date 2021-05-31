import Head from 'next/head';
import Layout from '../components/Layout';

export default function Home({ pokemon }) {
	console.log(pokemon);
	return (
		<div>
			<Head>
				<title>Pokedex</title>
				<meta
					name="description"
					content="Pokemon Pokedex created with NextJS and Tailwind"
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<Layout title="NextJS Pokedex">
				<h1 className="text-4xl mb-8 text-center">
					NextJS Pokedex
				</h1>
			</Layout>
		</div>
	);
}

//This is one of 2 functions that determine whether a page is statically rendered or server-side rendered
//By defining this function, NextJS will know that this is a static page before/at build time
//At build time, it will run this function, make a call to the Pokemon API and then pass that info into this index page
//This way, it is a fully static page by the time it gets pulled down by the user

export async function getStaticPros(context) {
	try {
		const res = await fetch(
			'https://pokeapi.co/api/v2/pokemon?limit=151'
		);
		console.log(res);
		const { results } = await res.json();
		const pokemon = results.map((result, index) => {
			const paddedIndex = ('00' + (index + 1)).slice(
				-3
			);
			const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${paddedIndex}.png`;
			return {
				...result,
				image
			};
		});
		return {
			props: { pokemon }
		};
	} catch (error) {
		console.log(error);
	}
}
