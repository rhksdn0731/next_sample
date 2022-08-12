import Header from '/components/Header'
import Footer from '/components/Footer'

const OnlyHeader = props => (
  <>
    <Header />
	{props.children}
  </>
)

export default OnlyHeader