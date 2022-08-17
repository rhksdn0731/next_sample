import { useRouter } from 'next/router';
import { useEffect, useState } from "react";
import useSWR from "swr";

export default function authTest() {
	const {data, error} = useSWR("/api/auth/loginChk");
	const router = useRouter();
	
	console.log("====!data start");
	console.log(!data);
	console.log("====!data end");
	
	useEffect(() => {
		if(!data) {
			return router.replace("/member/signin");
		} else {
			return router.replace("/");
		}
	}, [data, router]) //data와 router가 바뀔 때 마다 계속 실행
	
	return data;
}