import Header from '/components/Header'
import Footer from '/components/Footer'

const Layout = props => (
  <>
    <Header />
	{props.children}
	<Footer />
  </>
)

export default Layout