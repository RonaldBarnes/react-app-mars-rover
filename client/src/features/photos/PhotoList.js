import React, { useState, useEffect, useCallback, useMemo } from "react";
// import usePhotoContext from "./usePhotoContext";
import Photo from "./Photo";
import useFetch from "../../hooks/useFetch";

import { API_URL } from "../../app/App";

import "./PhotoList.css";

// http://mars-photos.herokuapp.com/api/v1/rovers/curiosity/photos?sol=1000&page=2
// http://mars-photos.herokuapp.com/api/v1/rovers/curiosity/photos?earth_date=2015-6-3
// http://mars-photos.herokuapp.com/api/v1/rovers/opportunity/photos?earth_date=2015-6-3&camera=pancam
// http://mars-photos.herokuapp.com/api/v1/rovers/curiosity/photos?sol=1000


export default function PhotoList({
		cameraName = "?",
		rover
		})
	{
	// const photos = usePhotoContext();
console.log(`PhotoList.js rover.name: "${rover.name}" cameraName: "${cameraName}"`)

	const [page, setPage] = useState(1);
	const [earthDate, setEarthDate] = useState(rover.max_date);
	const [photos, setPhotos] = useState([]);
	const [dateButtonDisabled, setDatebuttonDisabled] = useState(false);
	const [pageButtonDisabled, setPageButtonDisabled] = useState(false);



	// One function to increment or decrement earthDate by one day:
	const incrementEarthDate = (d) => {
		// Date() uses LOCAL TIME interpretation for params: we need UTC
		let tmpEarthDate = yyyymmddToUtcDate(earthDate);
		// Increment by +1/-1 depending on button clicked:
		tmpEarthDate.setUTCDate( tmpEarthDate.getUTCDate() + d );

		let tmpMaxRoverDate = yyyymmddToUtcDate(rover.max_date);
		// No future dates allowed:
		if (tmpEarthDate >= tmpMaxRoverDate)
			{
			tmpEarthDate = tmpMaxRoverDate;
			setDatebuttonDisabled( c => true);
			}
		else
			setDatebuttonDisabled( c => false);

		// Create date string as yyyy-mm-dd from UTC elements:
		const newDate = `${tmpEarthDate.getUTCFullYear()}-`
			+ `${"0".concat(tmpEarthDate.getUTCMonth() + 1).slice(-2)}-`
			+ `${"0".concat(tmpEarthDate.getUTCDate()).slice(-2)}`
// console.log(`PhotoList.js newDate:"${newDate}" new earthDate:"${tmpEarthDate}"`)
		setEarthDate( old => newDate)
		return newDate;
		}




	// API serves dates as yyyy-mm-dd (UTC), and new Date() takes params as LOCAL TIME.
	// This will return a new Date from UTC params:
	// !mm is expected to be month NUMBER and will be converted to INDEX!
	const yyyymmddToUtcDate = (yyyy_mm_dd) => {
		let dateParts = yyyy_mm_dd.split("-");
		// let tmpDate = Date.UTC(dateParts[0], dateParts[1] - 1, dateParts[2])
		// Convert date to UTC: Date() uses LOCAL TIME for params by default:
		let tmpDate = new Date(yyyy_mm_dd);
		tmpDate.setUTCFullYear( dateParts[0]);
		tmpDate.setUTCMonth( dateParts[1] - 1);	// -1 because index vs number
		tmpDate.setUTCDate( dateParts[2]);			// d can be +1 or -1

		return tmpDate;
		}


	useEffect( () => {
		console.log(`PhotoList.js useEffect() cameraName:"${cameraName}"`)
		// setEarthDate( d => `${tmpDate.getFullYear() - 1}-${tmpDate.getMonth()}-${tmpDate.getDate()}` );
		setDataURL( u =>
			`${API_URL}/rovers/${rover.name.toLowerCase()}/photos?earth_date=${earthDate}&camera=${cameraName.toLowerCase()}&page=${page}`);

console.log(`dataURL="${dataURL}"`)
			// fetch(dataURL, {"Access-Control-Allow-Origin": "*"}, [earthDate, cameraName])
			fetch(`${API_URL}/rovers/${rover.name.toLowerCase()}/photos?earth_date=${earthDate}&camera=${cameraName.toLowerCase()}&page=${page}`,
					{"Access-Control-Allow-Origin": "*"}, [earthDate, cameraName])
				.then( res => {
					if (res.ok)
						{
						const json = res.json()
						console.log(`json: ${json}`)
						return json;
						}
					// return res.ok === true ? res.json() : res.json().then(x => Promise.reject(x) )
					})
				.then( res2 => {
					console.log(`res2:`);
					console.table(res2.photos);
					setPhotos( p => res2.photos);
					return res2
					})
				.catch( e => {console.log(`%cE R R O R: ${e.message}`, "color:red"); return e; })

			}, [earthDate, page, cameraName]);


	// let {loading, error, value} = useFetch(dataURL, {"Access-Control-Allow-Origin": "*"});
	let {loading, error, value} = {loading: true, error: undefined, value:undefined};


	const [dataURL, setDataURL] =
		useState( u => {
			if (earthDate !== "" && cameraName !== "" && loading === false)
				return `${API_URL}/rovers/${rover.name.toLowerCase()}/photos?earth_date=${earthDate}&camera=${cameraName.toLowerCase()}&page=${page}`;
			else
				return `${API_URL}/rovers/${rover.name.toLowerCase()}/photos?earth_date=${rover.max_date}&camera=${cameraName.toLowerCase()}&page=${page}`;
			})



// console.log(`loading: ${loading.toString()}`);
if (error !== undefined)
	{
	console.log(`error: ${error}`)
	console.table(error?.message);
	}
// console.log(`value?.photos:`)
// console.table(value?.photos);
console.log(`photos.length: ${photos.length}`)
console.table(photos);
console.table(photos?.camera);

	// const displayAllPhotos = () => photos.map((photo) => (
	//   <Photo source={photo.source} key={photo.id} />
	// ));

	return (
		<div className="PhotoList">
			{/* { displayAllPhotos() } */}
			<h2>PhotoList...</h2>
			<p>
				rover.name="{rover.name}"
				cameraName="{cameraName}"
				earthDate (UTC) = "{earthDate}"
				photos?.length (# photos): {photos?.length}
			</p>
			{/* <p>API_URL: {API_URL}</p> */}
			<p>dataURL: "{dataURL}"</p>
			<div>
				<form id="earth_date" style={{width:"fit-content", display:"inline-block"}}>
					<fieldset><legend>Earth Date {earthDate}</legend>
						<button
							type="button"
							value={earthDate}
							onClick={() => incrementEarthDate(-1)}
							>
							Previous Day
						</button>
						<button
							type="button"
							value={earthDate}
							onClick={() => incrementEarthDate(+1)}
							disabled={dateButtonDisabled}
							>
							Next Day
						</button>
					</fieldset>
				</form>

				<form id="page" style={{width:"fit-content", display:"inline-block"}}>
					<fieldset>
						<legend>Page</legend>
						<button
							type="button"
							value={page}
							onClick={() => setPage( p => ( p > 1 ? p - 1 : p) )}
							>
							Previous Page
						</button>
						<button
							type="button"
							value={page}
							onClick={() => setPage( p => p + 1)}
							>
							Next Page
						</button>
					</fieldset>
				</form>
			</div>

			{/* <p>loading: "{loading.toString()}"</p>
			<p>error: "{error?.message}"</p>
			<p>value?.photos.length: {value?.photos.length}</p> */}
			{
				photos.map( (p,idx) => (
					<Photo source={p.img_src} photo={p} rover={rover} />
					))
			}
		</div>
		);	// end return
	};	// end PhotoList
