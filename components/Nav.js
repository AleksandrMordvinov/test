import Head from 'next/head'
import Link from 'next/link'
import style from '../styles/Nav.module.css'
const Nav = ({ title }) => {
	return (
		<>
			<Head>
				<title>{title}</title>
			</Head>
			<div className={style.nav}>
				<Link className={style.link} href={'/'}>
					Домашняя страница
				</Link>
				<Link className={style.link} href={'/AllUsers'}>
					Все пользователи
				</Link>
			</div>
		</>
	)
}

export default Nav
