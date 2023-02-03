import { useEffect, useState } from 'react'
import getPrice from '../services/getPrice'

const Price = () => {
	//const [price, setPrice] = useState([])
	const [count, setCount] = useState(0)

	function startCounter() {
		setInterval(() => {
			setCount(prev => prev + 1)
		}, 3000)
	}

	// useEffect(() => {
	// 	try {
	// 		getPrices().then(resp =>
	// 			setPrice([...price, [resp.ethereum.usd, resp['gods-unchained'].usd]])
	// 		)
	// 	} catch (er) {}
	// }, count)

	//console.log(price)
	return (
		<>
			<button
				className='bg-blue-600 m-20 border px-2 py-1 rounded-lg'
				onClick={startCounter}
			>
				Start
			</button>
			<h1>Price: {count}</h1>
		</>
	)
}

export default Price
