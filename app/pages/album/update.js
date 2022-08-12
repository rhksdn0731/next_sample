import Head from "next/head";
import NavBar from '/components/NavBar';
import Layout from '/components/Layout/Layout';
import UpdateForm from '/components/MusikList/UpdateForm';
import { useRouter } from 'next/router'

export async function getServerSideProps(context) {// 파라미터 꺼내는 작업은 서버단에서만 허용.
	const router = context.query; //넘겨받은 라우터의 쿼리에서 idx꺼내기.
	const idx = router.idx;
	return {
		props: {
			'idx':idx
		} // will be passed to the page component as props
	}
}

// item will be populated at build time by getStaticProps()
export default function update (props) {
	return (
		<>
			<Head>
				<title>musik - update</title>
				<meta property="og:title" content="database" key="title" />
			</Head>
			<NavBar></NavBar>
			<Layout>
				<ul>
					<UpdateForm idx={props.idx}/>
				</ul>
			</Layout>
		</>
	)
}
