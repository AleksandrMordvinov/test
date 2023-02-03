import Link from 'next/link'
import Nav from '../components/Nav'
import Price from '../components/Price'

const AllUsers = ({ data }) => {
	//console.log(data)
	return (
		<>
			<Nav />
			<Price />
			<div className='m-10'>
				<div>ETH: {data.ethereum.usd}</div>
				<div>GODS: {data['gods-unchained'].usd}</div>
			</div>
		</>
	)
}
export default AllUsers

// export async function getStaticProps() {
// 	const resp = await fetch('https://jsonplaceholder.typicode.com/users')
// 	const users = await resp.json()
// 	return {
// 		props: { users },
// 	}
// }

export async function getStaticProps() {
	const resp = await fetch(
		'https://api.coingecko.com/api/v3/simple/price?vs_currencies=usd&ids=ethereum%2Cgods-unchained'
	)
	const data = await resp.json()
	//console.log(data)
	return {
		props: { data },
		revalidate: 10,
	}
}
