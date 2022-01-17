import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';
import InputBordeInferior from '../generales/inputs/InputBordeInferior';

const useStyles = makeStyles((theme) => ({
	heading: {
		fontSize: theme.typography.pxToRem(15),
		fontWeight: theme.typography.fontWeightRegular,
	},
}));

const inputNombre = {
	name: 'nombre',
	label: 'Nombre',
	placeholder: 'Nombre',
	ancho: 6,
	required: true,
};

const inputApellido = {
	name: 'apellido',
	label: 'Apellido',
	placeholder: 'Apellido',
	ancho: 6,
	required: true,
};

const inputRazonSocial = {
	name: 'razonSocial',
	label: 'Razon Social',
	placeholder: 'Razon Social',
	ancho: 6,
	required: false,
};

const inputDniCuitCuil = {
	name: 'dni',
	label: 'DNI/CUIL/CUIT',
	placeholder: 'DNI/CUIL/CUIT',
	ancho: 6,
	required: false,
};

const DataCreateOrEditClient = (props) => {
	const classes = useStyles();

	return (
		<Accordion defaultExpanded>
			<AccordionSummary expandIcon={<ExpandMoreIcon />}>
				<Typography className={classes.heading}>Datos</Typography>
			</AccordionSummary>
			<AccordionDetails>
				<Grid container spacing={2}>
					<InputBordeInferior
						label={inputNombre.label}
						name={inputNombre.name}
						placeholder={inputNombre.placeholder}
						ancho={inputNombre.ancho}
						initialvalue={props.cliente.nombre}
						required={inputNombre.required}
						tochangestate={props.onChangeAtributo}
					/>
					<InputBordeInferior
						label={inputApellido.label}
						name={inputApellido.name}
						placeholder={inputApellido.placeholder}
						ancho={inputApellido.ancho}
						required={inputApellido.required}
						initialvalue={props.cliente.apellido}
						tochangestate={props.onChangeAtributo}
					/>
					<InputBordeInferior
						label={inputRazonSocial.label}
						name={inputRazonSocial.name}
						placeholder={inputRazonSocial.placeholder}
						ancho={inputRazonSocial.ancho}
						required={inputRazonSocial.required}
						initialvalue={props.cliente.razonSocial}
						tochangestate={props.onChangeAtributo}
					/>
					<InputBordeInferior
						label={inputDniCuitCuil.label}
						name={inputDniCuitCuil.name}
						placeholder={inputDniCuitCuil.placeholder}
						ancho={inputDniCuitCuil.ancho}
						required={inputDniCuitCuil.required}
						initialvalue={props.cliente.dni}
						tochangestate={props.onChangeAtributo}
					/>
				</Grid>
			</AccordionDetails>
		</Accordion>
	);
};

export default DataCreateOrEditClient;
