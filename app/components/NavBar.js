import Link from 'next/link'
import { useRouter } from 'next/router'

export default function NavBar() {
	const router = useRouter();
	return  <nav>
				<Link href="/">
					<a className="pl-3" style={{color: router.pathname === '/' ? 'red':'black'}}>
						main
					</a>
				</Link>

				<Link href="/album/list">
					<a className="pl-3" style={{color: router.pathname.split('/')[1] === 'album' ? 'red':'black'}}>
						album
					</a>
				</Link>

				<Link href="/member/signin">
					<a className="pl-3" style={{color: router.pathname.split('/')[2] === 'signin' ? 'red':'black'}}>
						Signin
					</a>
				</Link>
			</nav>
}