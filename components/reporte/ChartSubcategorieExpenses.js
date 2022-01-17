import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Doughnut } from 'react-chartjs-2';
import GlobalDataContext from '../../context/globalData/GlobalDataContext';
import GastoContext from '../../context/gasto/GastoContext';
import Box from '@material-ui/core/Box';
import moment from 'moment';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import SpinnerTabla from '../generales/SpinnerTabla';

const useStyles = makeStyles((theme) => ({
	formControl: {
		textAlign: 'left',
		marginBottom: theme.spacing(0),
		minWidth: 120,
	},
}));

const ChartSubcategorieExpenses = () => {
	const classes = useStyles();
	const {
		dates,
		loadingGlobalData,
		expenseCategories,
		expenseSubcategories,
		getCategorieExpenses,
		getSubcategorieExpenses,
	} = useContext(GlobalDataContext);
	const { expenses, loading } = useContext(GastoContext);

	const [chartData, setChartData] = useState({});
	const [categorieId, setCategorieId] = useState(1);

	useEffect(() => {
		if (!expenseCategories) getCategorieExpenses();
		if (!expenseSubcategories) getSubcategorieExpenses();
	}, []);

	useEffect(() => {
		if (expenseCategories && expenseSubcategories)
			handleCharData(dates.startDate, dates.endDate);
	}, [expenses, expenseCategories, expenseSubcategories, categorieId]);

	const handleChange = (event) => {
		setCategorieId(event.target.value);
	};

	const handleCharData = (startDate, endDate) => {
		const expenseAmounts = expensesPerSubcategoriePerMonth(
			startDate,
			endDate,
			expenseSubcategories,
			expenses,
			categorieId
		);
		const subcategories = getSubcategoriesFromCategorie(categorieId);
		const subcategorieColors = {
			1: {
				background: 'rgba(75, 192, 192)',
			},
			2: {
				background: 'rgba(255, 159, 64)',
			},
			3: {
				background: 'rgba(153, 102, 255)',
			},
			4: {
				background: 'rgba(255, 205, 86)',
			},
			5: {
				background: 'rgba(75, 192, 192)',
			},
			6: {
				background: 'rgba(54, 162, 235)',
			},
			7: {
				background: 'rgba(54, 162, 235)',
			},
			8: {
				background: 'rgba(54, 162, 235)',
			},
			9: {
				background: 'rgba(54, 162, 235)',
			},
			10: {
				background: 'rgba(54, 162, 235)',
			},
			11: {
				background: 'rgba(54, 162, 235)',
			},
			12: {
				background: 'rgba(54, 162, 235)',
			},
			13: {
				background: 'rgba(54, 162, 235)',
			},
			14: {
				background: 'rgba(54, 162, 235)',
			},
			15: {
				background: 'rgba(54, 162, 235)',
			},
			16: {
				background: 'rgba(54, 162, 235)',
			},
			17: {
				background: 'rgba(54, 162, 235)',
			},
			18: {
				background: 'rgba(54, 162, 235)',
			},
			19: {
				background: 'rgba(54, 162, 235)',
			},
			20: {
				background: 'rgba(54, 162, 235)',
			},
			21: {
				background: 'rgba(54, 162, 235)',
			},
			22: {
				background: 'rgba(54, 162, 235)',
			},
			23: {
				background: 'rgba(54, 162, 235)',
			},
			24: {
				background: 'rgba(54, 162, 235)',
			},
			25: {
				background: 'rgba(54, 162, 235)',
			},
			26: {
				background: 'rgba(54, 162, 235)',
			},
			27: {
				background: 'rgba(54, 162, 235)',
			},
			28: {
				background: 'rgba(54, 162, 235)',
			},
			29: {
				background: 'rgba(54, 162, 235)',
			},
			30: {
				background: 'rgba(54, 162, 235)',
			},
			31: {
				background: 'rgba(54, 162, 235)',
			},
		};

		const charData = {
			labels: [],
			datasets: [
				{
					data: [],
					backgroundColor: [],
					hoverOffset: 4,
				},
			],
		};

		subcategories.forEach((x) => {
			charData.labels.push(x.descripcion);
			charData.datasets[0]['data'].push(expenseAmounts[x.id]);
			charData.datasets[0]['backgroundColor'].push(
				subcategorieColors[x.id]['background']
			);
		});

		setChartData(charData);
	};

	const expensesPerSubcategoriePerMonth = (
		startDate,
		endDate,
		subcategories,
		expenses,
		categoriaId
	) => {
		const filteredExpenses = expenses.filter(
			(x) =>
				moment(startDate).format('YYYY-MM-DDTHH:mm:ss.SSSSZ') <
					moment(x.createdAt).format('YYYY-MM-DDTHH:mm:ss.SSSSZ') &&
				moment(x.createdAt).format('YYYY-MM-DDTHH:mm:ss.SSSSZ') <
					moment(endDate).format('YYYY-MM-DDTHH:mm:ss.SSSSZ') &&
				x.GastoCategoriaId === categoriaId
		);

		let subcategoriesAmount = {};
		subcategories.forEach((x) => {
			subcategoriesAmount[x.id] = subcategoriesAmount[x.id] ?? 0;
		});

		filteredExpenses.forEach((x) => {
			subcategoriesAmount[x.GastoSubcategoriaId] += parseFloat(x.importe);
		});

		return subcategoriesAmount;
	};

	const getSubcategoriesFromCategorie = (categorieId) => {
		return expenseSubcategories.filter(
			(x) => x.GastoCategoriaId === categorieId
		);
	};

	return (
		<Box>
			{!loadingGlobalData ? (
				<Box display="flex" justifyContent="flex-start">
					<FormControl className={classes.formControl}>
						<InputLabel>Categoría</InputLabel>
						{expenseCategories ? (
							<Select value={categorieId} onChange={handleChange}>
								{expenseCategories.map((x) => (
									<MenuItem key={x.id} value={x.id}>
										{x.descripcion}
									</MenuItem>
								))}
							</Select>
						) : null}
					</FormControl>
				</Box>
			) : null}
			{!loading ? (
				<Box>
					<Doughnut
						data={chartData}
						options={{
							responsive: true,
						}}
					/>
				</Box>
			) : (
				<SpinnerTabla />
			)}
		</Box>
	);
};

export default ChartSubcategorieExpenses;
