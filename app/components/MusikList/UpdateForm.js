import axios from "axios";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import Router from 'next/router'

const schema = yup.object({
	title: yup
		.string()
		.required('앨범 제목은 필수 입력 해주세요.'),
		//required내 의 에러 메세지는 type이 string일 때만 동작
	track: yup
		.number()
		.positive()
		.integer()
		.min(1, '1~30개 이내 트랙만 등록 가능합니다.')
		.max(32, '1~30개 이내 트랙만 등록 가능합니다.')
		.typeError('트랙은 필수 입력 해주세요.')
		.required(),
	releaseAt: yup
		.date()
		.typeError('발매일은 필수 입력 해주세요.')
		.required(),
	genre: yup
		.array()
		.typeError('장르는 필수 선택 해주세요.')//최초 아무것도 선택 안했을때,
		.min(1, '장르는 필수 선택 해주세요.')//최초 선택 후 아무것도 선택 안했을 때
		.required(),
	status: yup
		.string()
		.required('공개여부는 필수 입력 해주세요.')
});

export default function AddAlbum({idx}) {
	const { register, handleSubmit, formState:{ errors } } = useForm({
		mode: 'onSubmit', // 이 값은 입npm력하지 않아도 적용되는 기본 설정입니다.
		reValidateMode: 'onChange', // 이 값은 입력하지 않아도 적용되는 기본 설정입니다.
		defaultValues: { // 초기값 설정
            track: 0,
			state: ''
        },
		resolver: yupResolver(schema) //const 로 선언된 yup schema를 유효성 기준으로 가져옴. 
	});
	//const onSubmit = data => console.log(data);

	const onSubmit = async (data) => {
		// form이 submit 후 refresh 방지.
		//console.log(data);
		event.preventDefault();
		//data에서 같은 이름의 변수를 가져와 담는다.
		const {title, track, releaseAt, genre, status} = data;
		//console.log('title:: ' + title + ' / track: ' + track + ' / releaseAt: ' + releaseAt + ' / genre: ' + genre);
		
		//json 포멧으로 변경
		const JsonData = JSON.stringify({
			idx: idx,
			title: title,
			track: track,
			releaseAt: releaseAt,
			genre: genre,
			status: status
		});
		//console.log(JsonData);
		axios.post('/api/album/update', JsonData, {
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			}
		})
		.then(function (response) {
			alert('수정 완료되었습니다.');
			Router.push('/album/list');// 페이지 깜빡임 없이 라우터에 push하여 이동.
			console.log(response.status);
		})
		.catch(function (error) {
			alert('수정 실패했습니다.');
			console.log(error.data);
		});
	}
	
	// onKeyPress handler function
	function trackCount (event) {
		let targetId = event.target.id;
		var targetValue = event.target.value;
		var targetfirstChar = targetValue.substring(0,1);
		var regex = /[^0-9]/g;
		var result = targetValue.replace(regex, "");
		if(!result || targetfirstChar == 0 || targetfirstChar == '-') {
			document.getElementById(targetId).value = 0;
		}
	}

	return (
		// We pass the event to the handleSubmit() function on submit. <p className="errorMessage">{errors.track?.message}</p>
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className="pt-2">
				<label htmlFor="title">앨범 제목</label>
				<input type="text" id="title" name="title" className="flex border border-zinc-300 rounded" {...register("title")}/>
				{errors.title && <p className="errorMessage">{errors.title.message}</p>}
			</div>
			<div className="pt-2">
				<label htmlFor="track">트랙</label>
				<input type="number" id="track" name="track" className="flex border border-zinc-300 rounded" {...register("track")} min='0' onKeyUp={trackCount}/>
				{errors.track && <p className="errorMessage">{errors.track.message}</p>}
			</div>
			<div className="pt-2">
				<label htmlFor="releaseAt">발매일</label>
				<input type="date" id="releaseAt" name="releaseAt" className="flex border border-zinc-300 rounded" {...register("releaseAt")}/>
				{errors.releaseAt && <p className="errorMessage">{errors.releaseAt.message}</p>}
			</div>
			<div className="flex flex-col pt-2">
				<div className="flex">
					<h3>장르</h3>
					{errors.genre && <p className="errorMessage pl-2">{errors.genre.message}</p>}
				</div>
				<div className="flex items-center">
					<div>
						<label htmlFor="genre1" className="cursor-pointer">rock</label>
						<input type="checkbox" id="genre1" name="genre" value="rock" /*className="hidden"*/ {...register("genre")}/>
					</div>
					<div className="pl-2">
						<label htmlFor="genre2" className="cursor-pointer">funk</label>
						<input type="checkbox" id="genre2" name="genre" value="funk" /*className="hidden"*/ {...register("genre")}/>
					</div>
				</div>
			</div>
			<div className="pt-2">
				<label htmlFor="status">공개여부</label>
				<select id="status" name="status" className="flex border border-zinc-300 rounded" {...register("status")}>
					<option value="" disabled>선택</option>
					<option value="Y">공개</option>
					<option value="N">비공개</option>
				</select>
				{errors.status && <p className="errorMessage">{errors.status.message}</p>}
			</div>
			
			<button type="submit" className="flex border border-zinc-300 rounded py-1 px-3 mt-3">Submit</button>
		</form>
	)
}