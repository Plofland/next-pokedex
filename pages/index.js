import Head from 'next/head';
import Layout from '../components/Layout';
import Link from 'next/Link';

export default function Home({ pokemon }) {
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
				<ul>
					{pokemon.map((pokeman, index) => (
						<li key={index}>
							<Link
								href={`/pokemon?id=${
									index + 1
								}`}
							>
								<a className="border p-4 border-gray my-2 capitalize flex items-center text-lg bg-gray-200 rounded-md">
									<img
										className="w-20 h-20 mr-3"
										src={pokeman.image}
										alt={pokeman.name}
									/>
									<span className="mr-2 font-bold">{index + 1}.</span>
									{pokeman.name}
								</a>
							</Link>
						</li>
					))}
				</ul>
			</Layout>
		</div>
	);
}

//This is one of 2 functions that determine whether a page is statically rendered or server-side rendered
//By defining this function, NextJS will know that this is a static page before/at build time
//At build time, it will run this function, make a call to the Pokemon API and then pass that info into this index page
//This way, it is a fully static page by the time it gets pulled down by the user

export async function getStaticProps(context) {
	try {
		const res = await fetch(
			'https://pokeapi.co/api/v2/pokemon?limit=151'
		);
		const { results } = await res.json();
		const pokemon = results.map((pokeman, index) => {
			const paddedIndex = ('00' + (index + 1)).slice(
				-3
			);
			const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${paddedIndex}.png`;
			return {
				...pokeman,
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
