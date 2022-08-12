import axios from "axios";
import { TOKEN, DATABASE_ID } from '/config';

export default function handler(req, res) {
	const idx = req.body.idx;
	const title = req.body.title;
	const track = parseInt(req.body.track);
    const releaseAt = req.body.releaseAt;
	const genre = req.body.genre.toString();
	const status = req.body.status;
		console.log(idx);

	const data = {
		parent: {
			database_id: DATABASE_ID
		},
		properties: {
			title: {
				title: [{
					text: {
						content : title
					}
				}]
			},
			track: {
				number: track,
			},
			release_at: {
				date: {
					start: releaseAt,
				}
			},
			status: {
				rich_text: [{
					text: {
						content : status,
					}
				}]
			},
			genre: {
				rich_text: [{
					text: {
						content : genre,
					}
				}]
			}
		}
	}
	
	const JsonData = JSON.stringify(data);
	console.log(data);
	axios.patch(`https://api.notion.com/v1/pages/${idx}`, JsonData, {
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
		console.log('1212');
	})
	.catch(function (error) {
		console.log(`https://api.notion.com/v1/pages/${idx}`);

		console.log('error');
		res.status(400).json({ status: 'Fail' });
	});
}