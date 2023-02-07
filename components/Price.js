import { useEffect, useState } from 'react'

export default function Price() {
	const [user, setUser] = useState([])

	useEffect(() => {
		async function getData() {
			try {
				const response = await fetch(
					'https://api.coingecko.com/api/v3/simple/price?vs_currencies=usd&ids=ethereum%2Cgods-unchained'
				)
				const json = await response.json()
				console.log(json)
			} catch (e) {}
		}
		getData()

		const interval = setInterval(() => getData(), 10000)

		return () => clearInterval(interval)
	}, [])

	if (user)
		return (
			<>
				{/* {user.map(it => (
					<div>hello</div>
				))} */}
			</>
		)
	return null
}
