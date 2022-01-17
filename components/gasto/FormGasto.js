import React, { useEffect, useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';
import { Grid } from '@material-ui/core';
import GlobalDataContext from '../../context/globalData/GlobalDataContext';
import AlertaContext from '../../context/alertas/alertaContext';
import Alerta from '../generales/Alerta';
import GastoContext from '../../context/gasto/GastoContext';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { es } from 'date-fns/locale';
import {
	MuiPickersUtilsProvider,
	KeyboardDatePicker,
} from '@material-ui/pickers';

const useStyles = makeStyles((theme) => ({
	inputDate: { width: '100%', marginTop: theme.spacing(2) },
	formControl: {
		width: '100%',
	},
}));

const FormGasto = (props) => {
	const classes = useStyles();

	const {
		expenseCategories,
		expenseSubcategories,
		getCategorieExpenses,
		getSubcategorieExpenses,
	} = useContext(GlobalDataContext);
	const { createExpense, editExpense } = useContext(GastoContext);
	const { alerta, mostrarAlerta } = useContext(AlertaContext);

	const [expense, setExpense] = useState(
		props.initialState && props.type === 'edit'
			? props.initialState
			: {
					createdAt: moment(new Date()).toISOString(),
					estado: '',
					GastoCategoriaId: '',
					GastoSubcategoriaId: '',
					descripcion: '',
					importe: '',
			  }
	);

	const getSubcategoriesFromCategorie = (categorieId) => {
		return expenseSubcategories.filter(
			(x) => x.GastoCategoriaId === categorieId
		);
	};

	const [data, setData] = useState(
		getSubcategoriesFromCategorie(expense.GastoCategoriaId)
			? getSubcategoriesFromCategorie(expense.GastoCategoriaId)
			: []
	);

	useEffect(() => {
		if (!expenseCategories || expenseSubcategories) {
			getCategorieExpenses();
			getSubcategorieExpenses();
		}
	}, []);

	const onChangeDate = (date) => {
		setExpense({ ...expense, createdAt: moment(date).toISOString() });
	};

	const onChange = (e) => {
		setExpense({ ...expense, [e.target.name]: e.target.value });
	};

	const onChangeCategorie = (e) => {
		const r = getSubcategoriesFromCategorie(e.target.value);
		setData(r);

		setExpense({
			...expense,
			[e.target.name]: e.target.value,
			GastoSubcategoriaId: '',
		});
	};

	const onSubmit = (e) => {
		e.preventDefault();

		// validation
		if (expense.estado === '')
			return mostrarAlerta('Debes elegir un estado', 'error');
		else if (expense.GastoCategoriaId === '')
			return mostrarAlerta('Debes elegir una categoría', 'error');
		else if (expense.GastoSubcategoriaId === '')
			return mostrarAlerta('Debes elegir una Subcategoría', 'error');
		else if (!expense.descripcion)
			return mostrarAlerta('Coloca una descripción', 'error');
		else if (!expense.importe)
			return mostrarAlerta('Coloca un importe', 'error');

		if (props.type === 'create') createExpense(expense);
		else if (props.type === 'edit') editExpense(expense);

		// close modal
		if (props.handleClose) props.handleClose();
	};

	return (
		<form id="form-gasto" onSubmit={onSubmit}>
			<Grid container spacing={2}>
				<Grid item xs={6}>
					<MuiPickersUtilsProvider utils={DateFnsUtils} locale={es}>
						<Grid container justify="space-around">
							<KeyboardDatePicker
								className={classes.inputDate}
								disableToolbar
								variant="inline"
								format="dd/MM/yyyy"
								value={expense.createdAt}
								onChange={onChangeDate}
							/>
						</Grid>
					</MuiPickersUtilsProvider>
				</Grid>
				<Grid item xs={6}>
					<FormControl className={classes.formControl}>
						<InputLabel>Estado del pago</InputLabel>
						<Select name="estado" value={expense.estado} onChange={onChange}>
							{['Pago', 'Pendiente'].map((x) => (
								<MenuItem key={x} value={x}>
									{x}
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</Grid>
				<Grid item xs={6}>
					<FormControl className={classes.formControl}>
						<InputLabel>Categoría</InputLabel>
						<Select
							name="GastoCategoriaId"
							value={expense.GastoCategoriaId}
							onChange={onChangeCategorie}
						>
							{expenseCategories.map((x) => (
								<MenuItem key={x.id} value={x.id}>
									{x.descripcion}
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</Grid>

				<Grid item xs={6}>
					<FormControl className={classes.formControl}>
						<InputLabel>Subcategoría</InputLabel>
						<Select
							name="GastoSubcategoriaId"
							value={expense.GastoSubcategoriaId}
							onChange={onChange}
						>
							{data.map((x) => (
								<MenuItem key={x.id} value={x.id}>
									{x.descripcion}
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</Grid>
				<Grid item xs={6}>
					<TextField
						name="descripcion"
						label="Descripción"
						placeholder="Escribe una descripción"
						value={expense.descripcion}
						onChange={onChange}
						fullWidth
					/>
				</Grid>
				<Grid item xs={6}>
					<TextField
						type="number"
						name="importe"
						label="Importe"
						placeholder="Coloca un importe"
						value={expense.importe}
						onChange={onChange}
						fullWidth
					/>
				</Grid>
			</Grid>
			{alerta !== null ? <Alerta /> : null}
		</form>
	);
};

export default FormGasto;
