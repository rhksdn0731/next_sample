import axios from "axios";
import Cryptr from "cryptr";
import Router from "next/router";
//import { REDIS_HOST, REDIS_PASSWORD, REDIS_PORT } from  '../config';

export const login = async( userid, passwd ) => {
	const data = {
		userid: userid,
		passwd: passwd
	};
	console.log(data);

	const JsonData = JSON.stringify(data);

	axios.post('/api/member/signin', JsonData, {
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
		}
	})
	.then(function (response) {
		Router.push('/');
		//console.log(response.status);

	})
	.catch(function (error) {
		Router.push('/');
		//console.log(error.data);
	});
};

export const loginCheck = async ( NextRequest ) => {
	console.log('auth');
	const cryptr = new Cryptr('123456');
	const cookies = NextRequest;
	
	let loginCookie = "";

	/*
	let redis = new Redis({
        port: REDIS_PORT,
        host: REDIS_HOST,
        password: REDIS_PASSWORD
    });
	*/

    if (cookies != null) {
		const cookieList = cookies.split("; ");
		for ( var i = 0; i < cookieList.length; i++) {
			if(cookieList[i].includes('madahm_test=')) {
				loginCookie = cookieList[i].split('madahm_test=')[1];
				const decryptedString = cryptr.decrypt(loginCookie);
			}
		}
    }
	console.log("loginCookie");
	console.log(loginCookie != '' ? 1 : 0);
	
	Router.push("/");
};


export const logout = async( name ) => {
	console.log(name);
	console.log(time()-1);
	//document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
	//setcookie("madahm_test","",time()-1);
};