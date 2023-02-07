import { useEffect, useState } from 'react'

const Timer = () => {
	const [timer, setTimer] = useState(0)
	useEffect(() => {
		setTimeout(() => {
			setTimer(prev => prev + 1)
		}, 2000)
	}, [timer])
	return <div>Timer: {timer}</div>
}

export default Timer
