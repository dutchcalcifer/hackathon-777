async function fetchData(URL) {
	return (
		fetch(URL)
		.then (
			response => response.json()
		)
		.then (
			jsonData => {return jsonData.data}
		)
	)
}