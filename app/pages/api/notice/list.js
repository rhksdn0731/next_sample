import axios from "axios";
import { TOKEN, NOTICELIST_ID } from '/config';

export default function handler(req, res) {
	console.log('====get notice List');
	
    try {
		const res = axios.post(`https://api.notion.com/v1/databases/${NOTICELIST_ID}/query`, JSON.stringify({page_size: 100}), {
			headers: {
				'Accept': 'application/json',
				'Notion-Version': '2022-02-22',
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${TOKEN}`
			}
		});
		console.log("====res.data");
		console.log(res.data);
		noticeList = res.data;
		return noticeList;
	}
	catch(error) {
		console.log('null');
	}
}