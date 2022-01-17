import React, { useState, useEffect } from 'react';

const useFilterPtoStock = (data, ptoStock) => {
	const [ptoStockData, setPtoStockData] = useState([]);

	useEffect(() => {
		const filteredRows = data.filter((x) => x.PtoStockId === ptoStock);
		setPtoStockData(filteredRows);
	}, [data, ptoStock]);

	return [ptoStockData];
};

export default useFilterPtoStock;
