export default async function getPrice() {
	const resp = await fetch(
		'https://api.coingecko.com/api/v3/simple/price?vs_currencies=usd&ids=ethereum%2Cgods-unchained'
	)
	return await resp.json()
}
