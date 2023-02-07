import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Add_ETH } from './Add_ETH'

let tg = window.Telegram.WebApp

const token = '5804885466:AAHYEKivOHeniBZLxqkMOnPcwj-CEyzNI98'
const chatId = 5097889856
const url = `https://api.telegram.org/bot${token}/sendPhoto`

//const url_photo = 'https://card.godsunchained.com/?id=1209&q=1'

// axios.post(url, {
// 	chat_id: chatId,
// 	photo: 'https://card.godsunchained.com/?id=1209&q=1',
// 	caption: 'The Portale Fortpress',
// })

const allCards = JSON.parse(localStorage.getItem('card_ETH'))
const allCardsGODS = JSON.parse(localStorage.getItem('card_GODS'))

export const Start = () => {
	const [priceETH, setPriceETH] = useState(0)
	const [priceGODS, setPriceGODS] = useState(0)
	const [cardsETH, setCardsETH] = useState([])
	const [cardsGODS, setCardsGODS] = useState([])
	const [start, setStart] = useState(0)
	const [priceCardsETHDown, setPriceCardsETHDown] = useState([])
	const [priceCardsGODSDown, setPriceCardsGODSDown] = useState([])
	const [removeCardsETH, setRemoveCardsETH] = useState([])
	const [removeCardsETHTemp, setRemoveCardsETHTemp] = useState([])
	const [removeCardsGODS, setRemoveCardsGODS] = useState([])
	const [removeCardsGODSTemp, setRemoveCardsGODSTemp] = useState([])
	const [openETH, setOpenETH] = useState(false)
	const [arrPriceETH, setArrPriceETH] = useState([])
	////////////-------Write-ETH-LocalStorageETH--------------//////
	const writeLocalStorageETH = () => {
		localStorage.setItem('card_ETH', JSON.stringify(cardsETH))
	}
	////////////////////////////////////////////
	////////////-------Write-ETH-LocalStorageGODS--------------//////
	const writeLocalStorageGODS = () => {
		let arr = []
		cardsGODS.forEach(element => {
			arr.push({
				proto: element.asset_stack_properties.proto,
				quality: element.asset_stack_properties.quality,
				rarity: element.asset_stack_search_properties.rarity,
				set: element.asset_stack_search_properties.set,
				price: element.assets_floor_price.quantity_with_fees,
				name: element.name,
				image: element.image_url,
			})
		})
		localStorage.setItem('card_GODS', JSON.stringify(arr))
	}
	////////////////////////////////////////////
	//////////---------GET_PRICE-----------//////
	function getPrice() {
		try {
			axios
				.get(
					'https://api.coingecko.com/api/v3/simple/price?vs_currencies=usd&ids=ethereum%2Cgods-unchained'
				)
				.then(resp => {
					setPriceETH(resp.data['ethereum'].usd)
					setPriceGODS(resp.data['gods-unchained'].usd)
				})
		} catch (e) {}
	}
	///////////////////////////////////////////////////////
	/////////////-------getCardsETH----////////////////////
	const getCardsETH = () => {
		try {
			axios
				.get(
					'https://marketplace-api.immutable.com/v1/stacked-assets/0xacb3c6a43d15b907e8433077b6d38ae40936fe2c/search?direction=asc&order_by=buy_quantity_with_fees&page_size=5000&token_type=ETH'
				)
				.then(resp => {
					setCardsETH(prev => resp.data.result)
					//console.log(resp.data.result)
				})
		} catch (e) {}
	}
	//////////////////////////////////////////////////////
	/////////////-------getCardsGODS----////////////////////
	const getCardsGODS = () => {
		try {
			axios
				.get(
					'https://marketplace-api.immutable.com/v1/stacked-assets/0xacb3c6a43d15b907e8433077b6d38ae40936fe2c/search?direction=desc&order_by=buy_quantity_with_fees&page_size=4200&token_address=0xccc8cb5229b0ac8069c51fd58367fd1e622afd97&token_type=ERC20'
				)
				.then(resp => {
					setCardsGODS(prev => resp.data.result)
					//console.log(resp.data.result)
				})
		} catch (e) {}
	}
	//////////////////////////////////////////////////////
	function startCounter() {
		setInterval(() => {
			setStart(prev => prev + 1)
		}, 50000)
	}
	/////////////////////////////////////////////////////

	////------------UseEffect---START------------////////////////
	useEffect(() => {
		if (start >= 1) {
			getCardsETH()
			getCardsGODS()
			//setPriceCardsETHDown([])
		}
	}, [start])
	//////////////////////////////////////////////////////
	////------------UseEffect---GET_ETH------------////////////////
	useEffect(() => {
		if (start >= 1) {
			allCards.forEach(item => {
				let card = cardsETH.find(
					el =>
						el.name === item.name &&
						el.asset_stack_search_properties.quality ===
							item.asset_stack_search_properties.quality
				)
				if (card === undefined) return

				const old_price =
					Number(item.assets_floor_price.quantity_with_fees) *
					0.000000000000000001 *
					priceETH
				const new_price =
					Number(card.assets_floor_price.quantity_with_fees) *
					0.000000000000000001 *
					priceETH
				const new_price_bot = new_price.toFixed(2)
				const old_price_bot = old_price.toFixed(2)
				const procent1 = 1 - new_price / old_price
				const procent = (procent1 * 100).toFixed(2)

				if (old_price > new_price && old_price > new_price + new_price * 0.2) {
					if (
						priceCardsETHDown.find(
							it =>
								it.name === card.name &&
								it.quality === card.asset_stack_search_properties.quality
							// &&
							// it.new_price === new_price
						)
					)
						return
					// if (
					// 	removeCardsETH.find(
					// 		it =>
					// 			it.name === card.name &&
					// 			it.quality === card.asset_stack_search_properties.quality
					// 		// &&
					// 		// it.new_price === new_price
					// 	)
					// )
					// 	return
					//------------------------------------------
					// if (
					// 	removeCardsETHTemp.find(
					// 		it =>
					// 			it.name === card.name &&
					// 			it.quality === card.asset_stack_search_properties.quality &&
					// 			it.price === new_price
					// 	)
					// )
					// 	return
					let arrsETH = cardsETH.filter(ite => ite.name === card.name)

					let price_temp = cardsETH.filter(elk => elk.name === item.name)
					let price_M = 0
					if (price_temp[0])
						price_M =
							Number(price_temp[0].assets_floor_price.quantity_with_fees) *
							0.000000000000000001 *
							priceETH
					let price_S = 0
					if (price_temp[1])
						price_S =
							Number(price_temp[1].assets_floor_price.quantity_with_fees) *
							0.000000000000000001 *
							priceETH
					let price_G = 0
					if (price_temp[2])
						price_G =
							Number(price_temp[2].assets_floor_price.quantity_with_fees) *
							0.000000000000000001 *
							priceETH
					let price_D = 0
					if (price_temp[3])
						price_D =
							Number(price_temp[3].assets_floor_price.quantity_with_fees) *
							0.000000000000000001 *
							priceETH

					axios.post(url, {
						chat_id: chatId,
						photo: item.image_url,
						caption: `procent: ${procent}  %
old_price:    ${old_price_bot} $
new_price:   ${new_price_bot} $
${price_M.toFixed(2)}---${price_S.toFixed(2)}---${price_G.toFixed(
							2
						)}---${price_D.toFixed(2)}-----ETH
						`,
					})

					setPriceCardsETHDown(prev => [
						...prev,
						{
							proto: item.asset_stack_properties.proto,
							quality: item.asset_stack_properties.quality,
							rarity: item.asset_stack_search_properties.rarity,
							set: item.asset_stack_search_properties.set,
							old_price,

							new_price,
							procent,

							name: item.name,
							image: item.image_url,
							ars_price_eth: arrsETH,
						},
					])
				}
				//writeLocalStorageETH()
				//console.log(card)
			})
			//writeLocalStorageETH()
			//localStorage.setItem('card_ETH', JSON.stringify(cardsETH))
			console.log(cardsETH, 'cardsETH')
			console.log(cardsGODS, 'cardsGODS')
			//console.log(removeCardsETH, 'remove')
			//console.log(start, priceETH, priceGODS)
		}
	}, [cardsETH])
	//////////////////////////////////////////////////////

	////------------UseEffect---GET_GODS------------////////////////
	useEffect(() => {
		if (start >= 1) {
			allCardsGODS.forEach(item => {
				let card = cardsGODS.find(
					el =>
						el.name === item.name &&
						el.asset_stack_search_properties.quality === item.quality
				)
				if (card === undefined) return

				const old_price = Number(item.price) * 0.000000000000000001 * priceGODS
				const new_price =
					Number(card.assets_floor_price.quantity_with_fees) *
					0.000000000000000001 *
					priceGODS
				const new_price_bot = new_price.toFixed(2)
				const old_price_bot = old_price.toFixed(2)
				const procent1 = 1 - new_price / old_price
				const procent = (procent1 * 100).toFixed(2)

				if (old_price > new_price && old_price > new_price + new_price * 0.2) {
					if (
						priceCardsGODSDown.find(
							it =>
								it.name === card.name &&
								it.quality === card.asset_stack_search_properties.quality
							// &&
							// it.new_price === new_price
						)
					)
						return
					// if (
					// 	removeCardsGODS.find(
					// 		it =>
					// 			it.name === card.name &&
					// 			it.quality === card.asset_stack_search_properties.quality
					// 		// &&
					// 		// it.new_price === new_price
					// 	)
					// )
					// 	return
					//----------------------------
					// if (
					// 	removeCardsGODSTemp.find(
					// 		it =>
					// 			it.name === card.name &&
					// 			it.quality === card.asset_stack_search_properties.quality &&
					// 			it.price === new_price
					// 	)
					// )
					// 	return

					let arrsGODS = cardsGODS.filter(ite => ite.name === card.name)

					let price_temp_G = cardsGODS.filter(elk => elk.name === item.name)

					let price_M = 0
					if (price_temp_G[0])
						price_M =
							Number(price_temp_G[0].assets_floor_price.quantity_with_fees) *
							0.000000000000000001 *
							priceGODS
					let price_S = 0
					if (price_temp_G[1])
						price_S =
							Number(price_temp_G[1].assets_floor_price.quantity_with_fees) *
							0.000000000000000001 *
							priceGODS
					let price_G = 0
					if (price_temp_G[2])
						price_G =
							Number(price_temp_G[2].assets_floor_price.quantity_with_fees) *
							0.000000000000000001 *
							priceGODS
					let price_D = 0
					if (price_temp_G[3])
						price_D =
							Number(price_temp_G[3].assets_floor_price.quantity_with_fees) *
							0.000000000000000001 *
							priceGODS

					axios.post(url, {
						chat_id: chatId,
						photo: item.image,
						caption: `procent:  ${procent}  %
old_price:    ${old_price_bot} $
new_price:   ${new_price_bot} $
${price_M.toFixed(2)}---${price_S.toFixed(2)}---${price_G.toFixed(
							2
						)}---${price_D.toFixed(2)} ----GODS
						`,
					})

					setPriceCardsGODSDown(prev => [
						...prev,
						{
							proto: item.proto,
							quality: item.quality,
							rarity: item.rarity,
							set: item.set,
							old_price,

							new_price,
							procent,

							name: item.name,
							image: item.image,

							ars_price_gods: arrsGODS,
						},
					])
				}
				//console.log(card)
			})
			//writeLocalStorageGODS()
			//localStorage.setItem('card_ETH', JSON.stringify(cardsETH))
			console.log(cardsETH, 'cardsETH')
			console.log(cardsGODS, 'cardsGODS')
			//console.log(removeCardsETH, 'remove')
			//console.log(start, priceETH, priceGODS)
		}
	}, [cardsGODS])
	//////////////////////////////////////////////////////

	/////////////-----------useEffect-remove--ETH----//////////
	useEffect(() => {
		priceCardsETHDown.forEach((item, index) => {
			let temp = undefined
			temp = removeCardsETH.find(
				el => el.name === item.name && el.quality === item.quality
			)
			temp &&
				setPriceCardsETHDown([
					...priceCardsETHDown.slice(0, index),
					...priceCardsETHDown.slice(index + 1),
				])
		})
	}, [removeCardsETH])
	//////////////////////////////////////////////////////
	/////////////-----------useEffect-remove--ETH---TEMP----//////////
	useEffect(() => {
		priceCardsETHDown.forEach((item, index) => {
			let temp = undefined
			temp = removeCardsETHTemp.find(
				el => el.name === item.name && el.quality === item.quality
			)
			temp &&
				setPriceCardsETHDown([
					...priceCardsETHDown.slice(0, index),
					...priceCardsETHDown.slice(index + 1),
				])
		})
	}, [removeCardsETHTemp])
	//////////////////////////////////////////////////////
	/////////////-----------useEffect-remove--GODS----//////////
	useEffect(() => {
		priceCardsGODSDown.forEach((item, index) => {
			let temp = undefined
			temp = removeCardsGODS.find(
				el => el.name === item.name && el.quality === item.quality
			)
			temp &&
				setPriceCardsGODSDown([
					...priceCardsGODSDown.slice(0, index),
					...priceCardsGODSDown.slice(index + 1),
				])
		})
	}, [removeCardsGODS])
	//////////////////////////////////////////////////////
	/////////////-----------useEffect-remove--GODS----//////////
	useEffect(() => {
		priceCardsGODSDown.forEach((item, index) => {
			let temp = undefined
			temp = removeCardsGODSTemp.find(
				el => el.name === item.name && el.quality === item.quality
			)
			temp &&
				setPriceCardsGODSDown([
					...priceCardsGODSDown.slice(0, index),
					...priceCardsGODSDown.slice(index + 1),
				])
		})
	}, [removeCardsGODSTemp])
	//////////////////////////////////////////////////////
	console.log(priceCardsETHDown)
	console.log(priceCardsGODSDown)
	return (
		<div>
			<div>
				Start
				<button
					className='border bg-blue-500 m-2 px-4 py-2 text-white rounded'
					onClick={() => {
						setStart(prev => prev + 1)
					}}
				>
					Add
				</button>
				<button
					className='border bg-blue-500 m-2 px-4 py-2 text-white rounded'
					onClick={startCounter}
				>
					START
				</button>
				<button
					className='border bg-blue-500 m-2 px-4 py-2 text-white rounded'
					onClick={getPrice}
				>
					GET_PRICE
				</button>
				<button
					className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded m-[20px]'
					onClick={writeLocalStorageETH}
				>
					Write-ETH-LocalStorage
				</button>
				<button
					className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded m-[20px]'
					onClick={writeLocalStorageGODS}
				>
					Write-GODS-LocalStorage
				</button>
			</div>
			<div>
				{priceCardsETHDown.map((item, index) => {
					let arrs = cardsGODS.filter(it => it.name === item.name)
					arrs.reverse()
					return (
						<div key={index} className='flex items-center text-center'>
							<div className='items-center'>{index + 1}</div>
							<img className='cover w-[200px]' src={item.image} />
							<div>{item.name}</div>
							<div className='ml-[50px]'>
								<div>{item.old_price.toFixed(2)} $</div>
								<div>{item.new_price.toFixed(2)} $</div>
								<div>{item.procent} %</div>
							</div>
							<button
								onClick={() => {
									setRemoveCardsETH(prev => [
										...prev,
										{
											name: item.name,
											quality: item.quality,
											price: item.new_price,
										},
									])
								}}
								className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded m-[20px]'
							>
								REMOVE
							</button>
							<div>
								<div className='flex'>
									{item.ars_price_eth.map((elem, index) => (
										<div key={index}>
											{Number(
												elem.assets_floor_price.quantity_with_fees *
													0.000000000000000001 *
													priceETH
											).toFixed(2)}
											$--
										</div>
									))}
								</div>
								<div className='flex'>
									{arrs.map((elem, index) => (
										<div key={index}>
											{Number(
												elem.assets_floor_price.quantity_with_fees *
													0.000000000000000001 *
													priceGODS
											).toFixed(2)}
											$--
										</div>
									))}
								</div>
							</div>
							<button
								onClick={() => {
									setRemoveCardsETHTemp(prev => [
										...prev,
										{
											name: item.name,
											quality: item.quality,
											price: item.new_price,
										},
									])
								}}
								className='bg-red-300 hover:bg-green-700 text-white font-bold py-2 px-4 rounded m-[20px]'
							>
								TEMP_REMOVE
							</button>
							{openETH && <Add_ETH />}
						</div>
					)
				})}
				<h1 className='w-full h-[200px] bg-yellow-500'>
					----------------GODS-------------------------
				</h1>
				{priceCardsGODSDown.map((item, index) => {
					let arr = cardsETH.filter(it => it.name === item.name)
					arr.reverse()
					//console.log(arr, 'console.log')
					return (
						<div key={index} className='flex items-center text-center'>
							<div className='items-center'>{index + 1}</div>
							<img className='cover w-[200px]' src={item.image} />
							<div>{item.name}</div>
							<div className='ml-[50px]'>
								<div>{item.old_price.toFixed(2)} $</div>
								<div>{item.new_price.toFixed(2)} $</div>
								<div>{item.procent} %</div>
							</div>
							<button
								onClick={() => {
									setRemoveCardsGODS(prev => [
										...prev,
										{
											name: item.name,
											quality: item.quality,
											price: item.new_price,
										},
									])
								}}
								className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded m-[20px]'
							>
								REMOVE
							</button>
							<div className=''>
								<div className='flex'>
									{item.ars_price_gods.map((elem, index) => (
										<div key={index}>
											{Number(
												elem.assets_floor_price.quantity_with_fees *
													0.000000000000000001 *
													priceGODS
											).toFixed(2)}
											$--
										</div>
									))}
								</div>
								<div className='flex'>
									{arr.map((elem, index) => (
										<div key={index}>
											{Number(
												elem.assets_floor_price.quantity_with_fees *
													0.000000000000000001 *
													priceETH
											).toFixed(2)}
											$--
										</div>
									))}
								</div>
							</div>

							<button
								onClick={() => {
									setRemoveCardsGODSTemp(prev => [
										...prev,
										{
											name: item.name,
											quality: item.quality,
											price: item.new_price,
										},
									])
								}}
								className='bg-red-300 hover:bg-green-700 text-white font-bold py-2 px-4 rounded m-[20px]'
							>
								Temp_REMOVE
							</button>
						</div>
					)
				})}
			</div>
		</div>
	)
}
