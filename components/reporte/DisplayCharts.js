import React, { useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Paper from '@material-ui/core/Paper';
import { Grid } from '@material-ui/core';
import ChartRevenuesVsExpenses from './ChartRevenuesVsExpenses';
import BarraHerramientasContext from '../../context/barraHerramientas/barraHerramientasContext';
import ChartCategorieExpenses from './ChartCategorieExpenses';
import ChartSubcategorieExpenses from './ChartSubcategorieExpenses';
import TablaProductosMasVendidos from './TablaProductosMasVendidos';
import GlobalDataContext from '../../context/globalData/GlobalDataContext';
import GastoContext from '../../context/gasto/GastoContext';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	paper: {
		width: '100%',
		height: '100%',
		padding: theme.spacing(2),
		textAlign: 'center',
		color: theme.palette.text.secondary,
	},
	paperheight: { height: '65vh' },
}));

const DisplayCharts = () => {
	const classes = useStyles();

	const { handleToolsReports } = useContext(BarraHerramientasContext);
	const { dates, getInvoicing } = useContext(GlobalDataContext);
	const { getExpenses } = useContext(GastoContext);

	useEffect(() => {
		handleToolsReports();
	}, []);

	useEffect(() => {
		getExpenses(dates.startDate, dates.endDate);
		getInvoicing(dates.startDate, dates.endDate);
	}, [dates]);

	return (
		<div className={classes.root}>
			<Grid container spacing={3}>
				<Grid item xs={6}>
					<Paper className={classes.paper} elevation={3}>
						<ChartRevenuesVsExpenses />
					</Paper>
				</Grid>
				<Grid item xs={6}>
					<Paper className={classes.paper} elevation={3}>
						<ChartCategorieExpenses />
					</Paper>
				</Grid>
				<Grid item xs={4}>
					<Paper
						className={clsx(classes.paper, classes.paperheight)}
						elevation={3}
					>
						<ChartSubcategorieExpenses />
					</Paper>
				</Grid>
				<Grid item xs={8}>
					<Paper
						className={clsx(classes.paper, classes.paperheight)}
						elevation={3}
					>
						<TablaProductosMasVendidos />
					</Paper>
				</Grid>
			</Grid>
		</div>
	);
};

export default DisplayCharts;
