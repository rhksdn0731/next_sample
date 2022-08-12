import Head from "next/head";
import NavBar from '/components/NavBar';
import Layout from '/components/Layout/Layout';
import Album from "/components/MusikList/Album";
import { NextRequest } from 'next/server';

import axios from "axios";
import Link from 'next/link'

import { TOKEN, DATABASE_ID } from '/config';
import { loginCheck } from '/lib/auth';
import Router from 'next/router'

// item will be populated at build time by getStaticProps()
function albumList ({ login, albumlist }) {
	console.log("===login====");
	if (!login) {
		Router.replace('/member/signin');
		return (
			<></>
		)
	} else {
		console.log("====albumlist start");
		return (
			<>
				<Head>
					<title>musik - albumList</title>
					<meta property="og:title" content="database" key="title" />
				</Head>
				<NavBar></NavBar>
				<Layout>
					<div>
						<Link href="/album/create">
							<a className="border rounded border-zinc-700 text-zinc-700 text-sm px-2 py-1">
								추가하기
							</a>
						</Link>
					</div>
					<p>tes11t : { albumlist.results.length > 0 ? albumlist.results.length : '' }</p>
					<ul>
						{
							albumlist.results.length > 0 
							? albumlist.results.map((albumData,idx) => (
								<Album key={idx} data={albumData}/>
							))
							: <li>empty</li>
						}
					</ul>
				</Layout>
			</>
		)
	}
}

export async function getServerSideProps(context) {
  console.log("====run albumlist getServerSideProps start");
	//console.log(`${TOKEN}`);
	
	let login = false;
	let albumlist2 = loginCheck(context.req.cookies);
	albumlist2.then(value => {
		login = value;
	}).catch(err => {
		//console.log(err);
	});
	
	let albumlist = null;
	try {
		const res = await axios.post(`https://api.notion.com/v1/databases/${DATABASE_ID}/query`, JSON.stringify({page_size: 100}), {
			headers: {
				'Accept': 'application/json',
				'Notion-Version': '2022-02-22',
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${TOKEN}`
			}
		});
		console.log("====res.data");
		albumlist = res.data;
	}
	catch(error) {
		console.log('null');
	}
	console.log("====run albumlist getServerSideProps end");
	//console.log(albumlist);
    return {
        props: {
			login: login,
			albumlist
		}
    }
}

export default albumList