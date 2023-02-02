import { useRouter } from 'next/router'
import Nav from '../../components/Nav'

export default function User({ user }) {
	//const { query } = useRouter()

	return (
		<div>
			<Nav title={user.name} />
			{/* <h1>Пользователь с ID: {query.id}</h1> */}
			<h1>{user.name}</h1>
		</div>
	)
}

export async function getServerSideProps({ params }) {
	const resp = await fetch(
		`https://jsonplaceholder.typicode.com/users/${params.id}`
	)
	const user = await resp.json()

	return {
		props: { user },
	}
}
