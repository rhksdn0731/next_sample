import Head from "next/head";
import NavBar from '/components/NavBar';
import Layout from '/components/Layout/Layout';
import List from "/components/notice/List";
import { useEffect, useState } from "react";

import axios from "axios";
import Link from 'next/link'

import useSWR from 'swr'

// item will be populated at build time by getStaticProps()
function noticeList ({ noticeList }) {
	
	const [pageIndex, setPageIndex] = useState(0);

	// React state인 페이지 인덱스를 포함하는 API URL
	const { data } = useSWR(`/api/notice/list?page=${pageIndex}`);

	return (
		<>
			<Head>
				<title>musik - noticeList</title>
				<meta property="og:title" content="database" key="title" />
			</Head>
			<NavBar></NavBar>
			<Layout>
				
			</Layout>
		</>
	)
}

// export async function getServerSideProps(context) {
// 	console.log("====run noticeList getServerSideProps start");
	
// 	let noticeList = null;
// 	try {
// 		const res = await axios.post(`https://api.notion.com/v1/databases/${ALUBUMLIST_ID}/query`, JSON.stringify({page_size: 100}), {
// 			headers: {
// 				'Accept': 'application/json',
// 				'Notion-Version': '2022-02-22',
// 				'Content-Type': 'application/json',
// 				'Authorization': `Bearer ${TOKEN}`
// 			}
// 		});
// 		console.log("====res.data");
// 		noticeList = res.data;
// 	}
// 	catch(error) {
// 		console.log('null');
// 	}
// 	console.log("====run noticeList getServerSideProps end");
// 	//console.log(noticeList);
//     return {
//         props: {
// 			noticeList
// 		}
//     }
// }

export default noticeList