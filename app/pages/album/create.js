import Head from "next/head";
import NavBar from '/components/NavBar';
import Layout from '/components/Layout/Layout';
import CreateForm from '/components/MusikList/CreateForm';
import { TOKEN, DATABASE_ID } from '/config';
import axios from "axios";

// item will be populated at build time by getStaticProps()
function create () {
  return (
	<>
		<Head>
			<title>musik - create</title>
			<meta property="og:title" content="database" key="title" />
		</Head>
		<NavBar></NavBar>
		<Layout>
		  <ul>
			<CreateForm/>
		  </ul>
		</Layout>
	</>
  )
}

export default create