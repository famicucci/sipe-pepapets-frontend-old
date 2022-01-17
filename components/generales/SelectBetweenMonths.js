import React, { useEffect, useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { DatePicker } from '@material-ui/pickers';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { es } from 'date-fns/locale';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import moment from 'moment';
import { Box, Typography } from '@material-ui/core';
import GlobalDataContext from '../../context/globalData/GlobalDataContext';
import IconButton from '@material-ui/core/IconButton';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CheckIcon from '@material-ui/icons/Check';

const useStyles = makeStyles(() => ({
	inputRoot: {
		color: '#fff',
		width: '50px',
		borderBottom: '1px solid #fff',
	},
}));

const SelectBetweenMonths = () => {
	const classes = useStyles();

	const { dates, handleDates } = useContext(GlobalDataContext);

	const [datesLocal, setDatesLocal] = useState({
		begin: '',
		end: '',
	});
	const [changed, setChanged] = useState(false);

	useEffect(() => {
		setDatesLocal({
			begin: dates.startDate,
			end: dates.endDate,
		});
	}, []);

	const onChangeStartDate = (date) => {
		const startOfMonth = getStartDateOfMonth(date);
		setDatesLocal({ ...datesLocal, begin: startOfMonth });
		setChanged(true);
	};

	const onChangeEndDate = (date) => {
		const endOfMonth = getEndDateOfMonth(date);
		setDatesLocal({ ...datesLocal, end: endOfMonth });
		setChanged(true);
	};

	const getStartDateOfMonth = (date) => {
		return moment(date).startOf('month').format('YYYY-MM-DD hh:mm');
	};

	const getEndDateOfMonth = (date) => {
		return moment(date).endOf('month').format('YYYY-MM-DD hh:mm');
	};

	const onSubmit = (e) => {
		e.preventDefault();
		handleDates({ startDate: datesLocal.begin, endDate: datesLocal.end });
		setChanged(false);
	};

	return (
		<form onSubmit={onSubmit}>
			<Box display="flex" alignItems="center">
				<Box>
					<MuiPickersUtilsProvider
						utils={DateFnsUtils}
						locale={es}
						className={classes.root}
					>
						<DatePicker
							variant="inline"
							openTo="month"
							views={['year', 'month']}
							format="MM/yy"
							value={datesLocal.begin}
							InputProps={{ classes: { root: classes.inputRoot } }}
							onChange={onChangeStartDate}
							autoOk
						/>
					</MuiPickersUtilsProvider>
				</Box>
				<Box
					display="flex"
					alignItems="flex-end"
					style={{
						marginLeft: '8px',
						marginRight: '12px',
					}}
				>
					<Typography>-</Typography>
				</Box>
				<Box>
					<MuiPickersUtilsProvider
						utils={DateFnsUtils}
						locale={es}
						className={classes.root}
					>
						<DatePicker
							variant="inline"
							openTo="month"
							views={['year', 'month']}
							format="MM/yy"
							value={datesLocal.end}
							InputProps={{ classes: { root: classes.inputRoot } }}
							onChange={onChangeEndDate}
							autoOk
						/>
					</MuiPickersUtilsProvider>
				</Box>
				<Box>
					<IconButton
						type="submit"
						style={{ color: '#fff' }}
						component="button"
					>
						{!changed ? <CheckIcon /> : <CheckBoxIcon />}
					</IconButton>
				</Box>
			</Box>
		</form>
	);
};

export default SelectBetweenMonths;
