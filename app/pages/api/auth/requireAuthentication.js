import Cryptr from "cryptr";
import Router from 'next/router'

export function requireAuthentication(gssp) { // gssp == GetServerSideProps
	console.log("====run requireAuthentication");
    return async (context) => {
		//console.log(context);
        const { req, res } = context;
		const cryptr = new Cryptr('123456');
		
		const cookies = req.cookies;
		let loginCookie = "";
		console.log("====get cookies");
		/*
		console.log("====cookies");
		console.log(cookies);
		*/
		if (cookies != null) {
			loginCookie = cookies['madahm_test'];
			console.log("====search loginCookie");
			
			if (loginCookie != null) {
				console.log("====exist loginCookie");
				const decryptedString = cryptr.decrypt(loginCookie);
				console.log("====decrypt loginCookie");
				// Redirect to login page
			} else {
				console.log("====not exist loginCookie");
				
				console.log(req.url == '/member/signin');
				if(req.url != '/member/signin') {
					return {
						redirect: {
							destination: '/member/signin',
							statusCode: 302
						}
					};
				}
			}
		}

        return await gssp(context); // Continue on to call `getServerSideProps` logic
    }
}