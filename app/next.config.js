/** @type {import('next').NextConfig} */
const path = require('path')

const nextConfig = {
	reactStrictMode: false, // Root 컴포넌트에서 2번씩 호출, 코드의 문제를 감지하고 경고
	swcMinify: true, //Rust 컴파일러로 변경 x7x faster than Terser.
	//SASS COMPILER setthing
	sassOptions: {
		includePaths: [path.join(__dirname, 'styles')],
		//_variables, _mixins 전역설정.
		prependData: `@import "styles/_variables.scss"; @import "styles/_mixins.scss";`
	}
}

module.exports = nextConfig