import Head from "next/head";
import NavBar from '/components/NavBar';
import Layout from '/components/Layout/Layout';
import Detail from "/components/Notice/Detail";
import { NextRequest } from 'next/server';

import axios from "axios";
import Link from 'next/link'

import { TOKEN, NOTICELIST_ID } from '/config';

// item will be populated at build time by getStaticProps()
function noticelist ({ noticelist }) {
	console.log("===login====");
	return (
		<>
			<Head>
				<title>musik - Notice List</title>
				<meta property="og:title" content="database" key="title" />
			</Head>
			<NavBar></NavBar>
			<Layout>
				<p>Notice count : { noticelist.results.length > 0 ? noticelist.results.length : '' }</p>
				<ul>
					{
						noticelist.results.length > 0 
						? noticelist.results.map((albumData,idx) => (
							<Detail key={idx} data={albumData}/>
						))
						: <li>empty</li>
					}
				</ul>
			</Layout>
		</>
	)
}

export async function getServerSideProps(context) {
	console.log("====run noticelist getServerSideProps start");
	
	let noticelist = null;
	try {
		const res = await axios.post(`https://api.notion.com/v1/databases/${NOTICELIST_ID}/query`, JSON.stringify({page_size: 100}), {
			headers: {
				'Accept': 'application/json',
				'Notion-Version': '2022-02-22',
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${TOKEN}`
			}
		});
		console.log("====res.data");
		noticelist = res.data;
	}
	catch(error) {
		console.log('null');
	}
	console.log("====run noticelist getServerSideProps end");
	//console.log(noticelist);
    return {
        props: {
			noticelist
		}
    }
}

export default noticelist