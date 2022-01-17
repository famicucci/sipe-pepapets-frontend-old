import React, { useState, useEffect } from 'react';

const useFilter = (data, search) => {
	const [filteredData, setFilteredData] = useState([]);

	useEffect(() => {
		const filteredRows = filterBySearch(data, search);
		setFilteredData(filteredRows);
	}, [data, search]);

	const filterBySearch = (rows, search) => {
		const searchMod = search.toLowerCase().replace(/\s+/g, '');

		const r = rows.filter(
			(x) =>
				Object.values(x)
					.join()
					.replace(/\s+/g, '')
					.toLowerCase()
					.indexOf(searchMod) !== -1
		);

		return r;
	};

	return [filteredData];
};

export default useFilter;
