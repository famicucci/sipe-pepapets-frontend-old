import React, { useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import VentasContext from '../../context/ventas/ventasContext';
import GlobalDataContext from '../../context/globalData/GlobalDataContext';

const useStyles = makeStyles((theme) => ({
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120,
	},
	selectEmpty: {
		marginTop: theme.spacing(0),
		textAlign: 'left',
	},
}));

const SelectPtoStockVenta = () => {
	const classes = useStyles();

	const { stockPoints, getStockPoints } = useContext(GlobalDataContext);
	const { ptoStock, valorRadio, handlePtoStock } = useContext(VentasContext);

	useEffect(() => {
		if (!stockPoints) getStockPoints();
	}, []);

	let status = {};
	if (valorRadio !== 'pto-stock') {
		status = {
			disabled: true,
		};
	}

	const handleChange = (e) => {
		handlePtoStock(e.target.value);
	};

	return (
		<FormControl className={classes.formControl}>
			{stockPoints ? (
				<Select
					value={ptoStock}
					defaultValue=""
					onChange={handleChange}
					displayEmpty
					className={classes.selectEmpty}
					inputProps={{ 'aria-label': 'Without label' }}
					{...status}
				>
					{stockPoints.map((x) => (
						<MenuItem key={x.id} value={x.id}>
							{x.descripcion}
						</MenuItem>
					))}
				</Select>
			) : null}
		</FormControl>
	);
};

export default SelectPtoStockVenta;
