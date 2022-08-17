async function handler(req, res) {
	let loginExist = req.cookies['madahm_test'] != null ? true : false;
	
	console.log("====loginExist start");
	console.log(loginExist);
	console.log("====loginExist end");
	
	res.json({
		loginExist
	})
}

export default handler;