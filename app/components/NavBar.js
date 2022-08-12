import Link from 'next/link'
import { useRouter } from 'next/router'

export default function NavBar() {
	const router = useRouter();
	return (
		<nav>

			<button type="button" 
				className="pl-3" 
				style={{color: router.pathname === '/' ? 'red':'black'}}
				onClick={() => router.push('/')}
			>
				main
			</button>
			
			<button type="button" 
				className="pl-3" 
				style={{color: router.pathname.split('/')[1] === 'album' ? 'red':'black'}}
				onClick={() => router.push('/album/list')}
			>
				album
			</button>
		
			<button type="button" 
				className="pl-3" 
				style={{color: router.pathname.split('/')[2] === 'signin' ? 'red':'black'}}
				onClick={() => router.push('/member/signin')}
			>
				Signin
			</button>
				
			{/*
			<Link href="/member/signin">
				<a className="pl-3"
					style={{color: router.pathname.split('/')[2] === 'signin' ? 'red':'black'}}
				>
					Signin
				</a>
			</Link>
			*/}
		</nav>
	) 
	
}