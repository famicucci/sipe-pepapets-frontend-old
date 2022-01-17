import React, { useState, useEffect, useContext } from 'react';
import { Bar } from 'react-chartjs-2';
import GlobalDataContext from '../../context/globalData/GlobalDataContext';
import GastoContext from '../../context/gasto/GastoContext';
import moment from 'moment';
import SpinnerTabla from '../generales/SpinnerTabla';

const ChartCategorieExpenses = () => {
	const { dates, loadingGlobalData, expenseCategories, getCategorieExpenses } =
		useContext(GlobalDataContext);
	const { expenses, loading } = useContext(GastoContext);

	const [chartData, setChartData] = useState({});

	useEffect(() => {
		if (!expenseCategories) getCategorieExpenses();
	}, []);

	useEffect(() => {
		if (expenseCategories) handleCharData(dates.startDate, dates.endDate);
	}, [expenses, expenseCategories]);

	const handleCharData = (startDate, endDate) => {
		let monthsBetweenDates = getMonthsBetweenDates(startDate, endDate);
		const expenseAmounts = expensesPerCategoriePerMonth(
			monthsBetweenDates,
			expenseCategories,
			expenses
		);

		const categorieColors = {
			1: {
				border: 'rgba(255, 99, 132)',
				background: 'rgba(255, 99, 132, 0.2)',
			},
			2: {
				border: 'rgba(255, 159, 64)',
				background: 'rgba(255, 159, 64, 0.2)',
			},
			3: {
				border: 'rgba(153, 102, 255)',
				background: 'rgba(153, 102, 255, 0.2)',
			},
			4: {
				border: 'rgba(255, 205, 86)',
				background: 'rgba(255, 205, 86, 0.2)',
			},
			5: {
				border: 'rgba(75, 192, 192)',
				background: 'rgba(75, 192, 192, 0.2)',
			},
			6: {
				border: 'rgba(54, 162, 235)',
				background: 'rgba(54, 162, 235, 0.2)',
			},
			7: {
				border: 'rgba(54, 162, 235)',
				background: 'rgba(54, 162, 235, 0.2)',
			},
		};

		let categoriesData = {};
		expenseCategories.forEach(
			(x) =>
				(categoriesData[x.id] = {
					description: x.descripcion,
					borderColor: categorieColors[x.id].border,
					backgroundColor: categorieColors[x.id].background,
				})
		);

		const datasets = Object.entries(expenseAmounts).map((x) => ({
			label: categoriesData[x[0]].description,
			data: Object.values(x[1]),
			borderColor: categoriesData[x[0]].borderColor,
			backgroundColor: categoriesData[x[0]].backgroundColor,
			borderWidth: 2,
			tension: 0.1,
		}));

		setChartData({
			labels: monthsBetweenDates,
			datasets: datasets,
		});
	};

	const expensesPerCategoriePerMonth = (
		monthsBetweenDates,
		categories,
		expenses
	) => {
		let amountPerMonth = {};
		monthsBetweenDates.forEach((x) => {
			amountPerMonth[x] = amountPerMonth[x] ?? 0;
		});

		let categoriesInMonths = {};
		categories.forEach((x) => {
			categoriesInMonths[x.id] = categoriesInMonths[x.id] ?? amountPerMonth;
		});

		expenses.forEach((x) => {
			const categorie = x.GastoCategoriaId;
			const month = moment(x.createdAt).locale('es').format('MMMM');
			const amount = parseFloat(x.importe);

			if (amountPerMonth[month] >= 0)
				categoriesInMonths = {
					...categoriesInMonths,
					[categorie]: {
						...categoriesInMonths[categorie],
						[month]: categoriesInMonths[categorie][month] + amount,
					},
				};
		});

		return categoriesInMonths;
	};

	const getMonthsBetweenDates = (startDate, endDate) => {
		const startMonth = moment(startDate, 'YYYY/MM/DD').format('M');
		const endMonth = moment(endDate, 'YYYY/MM/DD').format('M');

		let monthsBetweenDates = [];
		for (let i = startMonth - 1; i < endMonth; i++) {
			monthsBetweenDates.push(moment().locale('es').month(i).format('MMMM'));
		}

		return monthsBetweenDates;
	};

	return (
		<>
			{!loading && !loadingGlobalData ? (
				<Bar
					data={chartData}
					options={{
						responsive: true,
						plugins: { title: { text: 'Gastos por Categoría', display: true } },
					}}
				/>
			) : (
				<SpinnerTabla />
			)}
		</>
	);
};

export default ChartCategorieExpenses;
