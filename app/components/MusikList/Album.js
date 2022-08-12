import Link from 'next/link'
import axios from "axios";
import Router from 'next/router'
	
export default function Album({data}) {
	
	console.log("====Album start");
	const idx = data.id;
    const title = data.properties.title.title[0].plain_text;
    const track = data.properties.track.number;
    const date = data.properties.release_at.date.start;

	const deleteItem = async (idx) => {
		const data = {
			idx: idx,
		};
		//json 포멧으로 변경
		const JsonData = JSON.stringify(data);

		axios.post('/api/album/delete', JsonData, {
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			}
		})
		.then(function (response) {
			alert('삭제 되었습니다.');
			console.log(response.status);
			Router.push('/album/list');// 페이지 깜빡임 없이 라우터에 push하여 이동.
		})
		.catch(function (error) {
			alert('삭제 도중 에러가 발생되었습니다.');
			console.log(error.data);
		});
	}
	console.log("====Album end");
    return (
        <>
            <li className="py-2">
				<div>
					<p>{title}</p>
					<p>{track}</p>
					<p>{date}</p>
				</div>
				<div>
					<Link 
						href={{
							pathname: '/album/update', //패스이름
							query: { 'idx': idx }, // 뒤에 붙을 파라미터
						}}
						as={`/album/update?idx=${idx}`}//주소창에 보여질 URL
					>
						<a className="border rounded bg-zinc-700 text-white text-sm px-2 py-1">
							수정하기
						</a>
					</Link>
					<button className="border rounded bg-red-700 text-white text-sm px-2 py-1"
						onClick={() => deleteItem(idx)}
					>
						삭제하기
					</button>
				</div>
            </li>
        </>
    );
}