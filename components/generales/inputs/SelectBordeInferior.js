import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
	formControl: {
		width: '100%',
		marginTop: (props) =>
			props.marginTop ? theme.spacing(props.marginTop) : theme.spacing(0),
		minWidth: 100,
	},
	selectEmpty: {
		marginTop: theme.spacing(0),
	},
}));

const SelectBordeInferior = (props) => {
	const { name, label, ancho, data, placeholder, tochangestate } = props;
	let { initialvalue } = props;
	const classes = useStyles({ marginTop: props.marginTop });

	const [valor, setValor] = useState(initialvalue);

	const handleChange = (e) => {
		setValor(e.target.value);

		if (props.getDescription) {
			const description = getDescription(e.target.value);
			tochangestate(e.target.name, description);
		} else tochangestate(e.target.name, e.target.value);
	};

	const getDescription = (id) => {
		const r = data.find((x) => x.id === id);
		if (r) return r.descripcion;
	};

	return (
		<Grid item xs={ancho}>
			<FormControl className={classes.formControl}>
				<InputLabel shrink>{label}</InputLabel>
				{data ? (
					<Select
						name={name}
						value={valor}
						onChange={handleChange}
						displayEmpty
						className={classes.selectEmpty}
					>
						{
							(initialvalue = 'none' ? (
								<MenuItem value="none" disabled>
									<Typography color="textSecondary">{placeholder}</Typography>
								</MenuItem>
							) : null)
						}
						{data.map((x) => (
							<MenuItem key={x.id} value={x.id}>
								{x.descripcion}
							</MenuItem>
						))}
					</Select>
				) : null}
			</FormControl>
		</Grid>
	);
};

export default SelectBordeInferior;
