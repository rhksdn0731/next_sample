import axios from "axios";
import { TOKEN, DATABASE_ID } from '/config';

export default function handler(req, res) {
	const title = req.body.title;
	const track = parseInt(req.body.track);
    const releaseAt = req.body.releaseAt;
	const genre = req.body.genre.toString();
	const status = req.body.status;
	
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

	axios.post('https://api.notion.com/v1/pages', JsonData, {
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