import Head from "next/head";
import NavBar from '/components/NavBar';
import Layout from '/components/Layout/Layout';
import axios from "axios";
import useSWR from 'swr';

// item will be populated at build time by getStaticProps()
function Home() {
	return (
		<>
			<Head>
				<title>musikBox</title>
				<meta property="og:title" content="database" key="title" />
			</Head>
			<NavBar></NavBar>
			<Layout>
			  <p>메인페이지 입니다</p>
			</Layout>
		</>
	)
}

export default Home