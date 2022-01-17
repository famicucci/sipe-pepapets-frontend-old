import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import { es } from 'date-fns/locale';
import {
	MuiPickersUtilsProvider,
	KeyboardDatePicker,
} from '@material-ui/pickers';

const useStyles = makeStyles(() => ({
	root: { width: '100%' },
}));

const InputFecha = (props) => {
	const classes = useStyles();
	const [selectedDate, setSelectedDate] = useState(
		props.initialValue ? props.initialValue : new Date()
	);

	const handleDateChange = (date) => {
		setSelectedDate(date);
		props.tochangestate(date);
	};

	return (
		<MuiPickersUtilsProvider utils={DateFnsUtils} locale={es}>
			<Grid container justify="space-around">
				<KeyboardDatePicker
					className={classes.root}
					disableToolbar
					variant="inline"
					format="dd/MM/yyyy"
					label="Fecha"
					value={selectedDate}
					onChange={handleDateChange}
				/>
			</Grid>
		</MuiPickersUtilsProvider>
	);
};

export default InputFecha;
