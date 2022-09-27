import Link from 'next/link'
import axios from "axios";
import Router from 'next/router'
	
export default function Album({data}) {
	
	console.log("====Notice start");
	const idx = data.id;
	const title = data.properties.title.title[0].plain_text;
	const content = data.properties.content.rich_text[0].plain_text;
	const type = data.properties.type.rich_text[0].plain_text;
	const state = data.properties.state.rich_text[0].plain_text;
	const create_date = data.properties.create_date.date.start;
	const start_date = data.properties.start_date.date.start;
	const end_date = data.properties.end_date.date.start;
	
	console.log(data.properties.start_date.date.start);
	console.log("====Notice end");
    return (
        <>
            <li className="py-2 bg-red-100 mb-2">
				<div>
					<p>{type}</p><br/>
					<p>{state}</p><br/>
					<p>{title}</p><br/>
					<p>{create_date}</p><br/>
					<p>{start_date}</p><br/>
					<p>{end_date}</p><br/>
				</div>
            </li>
        </>
    );
}