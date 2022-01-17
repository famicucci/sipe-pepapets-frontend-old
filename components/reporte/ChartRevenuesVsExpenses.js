import React, { useState, useEffect, useContext } from 'react';
import { Bar } from 'react-chartjs-2';
import GlobalDataContext from '../../context/globalData/GlobalDataContext';
import GastoContext from '../../context/gasto/GastoContext';
import SpinnerTabla from '../generales/SpinnerTabla';

import moment from 'moment';

const ChartRevenuesVsExpenses = () => {
	const { dates, loadingGlobalData, invoices } = useContext(GlobalDataContext);
	const { expenses, loading } = useContext(GastoContext);

	const [chartData, setChartData] = useState({});

	useEffect(() => {
		handleCharData(dates.startDate, dates.endDate);
	}, [expenses, invoices]);

	const handleCharData = (startDate, endDate) => {
		let monthsBetweenDates = getMonthsBetweenDates(startDate, endDate);
		const revenueAmounts = revenuePerMonth(monthsBetweenDates);
		const expenseAmounts = expenseChart(monthsBetweenDates);

		setChartData({
			labels: monthsBetweenDates,
			datasets: [
				{
					label: 'Ingresos totales',
					data: Object.values(revenueAmounts),
					borderColor: 'rgba(75, 192, 192)',
					backgroundColor: ['rgba(75, 192, 192, 0.2)'],
					borderWidth: 2,
					tension: 0.1,
				},
				{
					label: 'Gastos totales',
					data: Object.values(expenseAmounts),
					borderColor: 'rgba(255, 99, 132)',
					backgroundColor: ['rgba(255, 99, 132, 0.2)'],
					borderWidth: 2,
					tension: 0.1,
				},
			],
		});
	};

	const revenuePerMonth = (monthsBetweenDates) => {
		const validInvoices = invoices.filter(
			(x) => x.tipo === 'fac' && (x.estado === 'v') & (x.estadoPago === 'Pago')
		);

		let amountPerMonth = {};
		monthsBetweenDates.forEach((x) => {
			amountPerMonth[x] = amountPerMonth[x] ?? 0;
		});

		validInvoices.forEach((x) => {
			amountPerMonth[moment(x.createdAt).locale('es').format('MMMM')] +=
				parseFloat(x.importeFinal);
		});

		return amountPerMonth;
	};

	const expenseChart = (monthsBetweenDates) => {
		let amountPerMonth = {};
		monthsBetweenDates.forEach((x) => {
			amountPerMonth[x] = amountPerMonth[x] ?? 0;
		});

		expenses.forEach((x) => {
			amountPerMonth[moment(x.createdAt).locale('es').format('MMMM')] +=
				parseFloat(x.importe);
		});

		return amountPerMonth;
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
						plugins: { title: { text: 'Ingresos vs Gastos', display: true } },
					}}
				/>
			) : (
				<SpinnerTabla />
			)}
		</>
	);
};

export default ChartRevenuesVsExpenses;
