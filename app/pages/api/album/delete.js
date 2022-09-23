import axios from "axios";
import { TOKEN, ALUBUMLIST_ID } from '/config';

export default function handler(req, res) {
    const idx = req.body.idx;
	console.log(`https://api.notion.com/v1/blocks/${idx}`)
	axios.delete(`https://api.notion.com/v1/blocks/${idx}`, {
		// `withCredentials`은 자격 증명을 사용하여 사이트 간 액세스 제어 요청을 해야 하는지 여부를 나타냅니다.
		// `withCredentials`속성 미 기입 시 error:axios__WEBPACK_IMPORTED_MODULE_0___default(...).PATCH is not a function
        withCredentials: true,
        headers: {
            'Accept': 'application/json',
            'Notion-Version': '2022-02-22',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${TOKEN}`
        }
	})
	.then(function (response) {
		res.status(response.status).json({ status: 'Success' });
	})
	.catch(function (error) {
		console.log('error');
		res.status(400).json({ status: 'Fail' });
	});
}
