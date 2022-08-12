import { serialize } from "cookie";
import Cryptr from 'cryptr';

const cookieOptions = {
    httpOnly: true,
	domain: '.goorm.io',
    maxAge: 2592000,
    path: "/",
    sameSite: "Lax",
};


export default function handler(req, res) {
    const cryptr = new Cryptr('123456');
    const encryptedString = cryptr.encrypt('user:P202206132323219169:eyJpdiI6IlFjVGp4TEhWcVZBZGxHSWo0Tm4vL1E9PSIsInZhbHVlIjoiaGVpSUt2TjBGY3lDMVlEYXk1Lzg5YVVnbGRqY2FRUnNWY0Iwc3ZtS0RHWENNQ3JiN1BUTXF0VGV0dCtNSVV4a2lKN1NDVXBSZUVqVXhtN2piZWFDejlkcUlwYjFFTGJFSElCNlh3TFpzdE5iZTZlSUJNRlk1SE4xSDRnbE13SWdOWHdZam5aa0VlcDFKS1Q0R3UrdVU1cmE3dnhxaElBOFVtcEU1ZlRXK29zNnFwVG8ydVJITjN3UmpKK0VTazZlIiwibWFjIjoiNjdjNDcyZGY1MWI4NGIxZmQ0YWNlZGY5Zjg4YTQ1OTA2NGUxMDE0NDdiZTc1NzQ4ZmZjZGRmMzk4MmM3NWU3MyIsInRhZyI6IiJ9');
    res.setHeader('Set-Cookie', serialize("madahm_test", encryptedString, cookieOptions));
    res.end();//쿠키 생성 후 꼭 닫아주어야 함. 그렇지 않으면 리턴값없이 api독자적으로 종료해버리고 페이지는 지연된다고 판단하여 계속 리턴값을 기다림.
    // console.log(res.getHeader('Set-Cookie'));
}