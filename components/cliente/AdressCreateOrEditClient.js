import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';
import InputBordeInferior from '../generales/inputs/InputBordeInferior';
import InputNumberBordeInferior from '../generales/inputs/InputNumberBordeInferior';
import { Box } from '@material-ui/core';
import DireccionesCliente from './DireccionesCliente';

const useStyles = makeStyles((theme) => ({
	heading: {
		fontSize: theme.typography.pxToRem(15),
		fontWeight: theme.typography.fontWeightRegular,
	},
	caja: {
		Width: '100%',
	},
	label: {
		marginBottom: theme.spacing(0),
		marginTop: theme.spacing(0),
		fontSize: theme.typography.pxToRem(12),
	},
}));

const inputCalle = {
	name: 'calle',
	label: 'Calle',
	placeholder: 'Calle',
	ancho: 6,
	required: false,
};
const inputNumero = {
	name: 'numeroCalle',
	label: 'Numero',
	placeholder: 'Numero',
	ancho: 2,
	required: false,
};
const inputPiso = {
	name: 'piso',
	label: 'Piso',
	placeholder: 'Piso',
	ancho: 2,
	required: false,
};
const inputDepto = {
	name: 'depto',
	label: 'Depto.',
	placeholder: 'Depto.',
	ancho: 2,
	required: false,
};
const inputBarrio = {
	name: 'barrio',
	label: 'Barrio',
	placeholder: 'Barrio',
	ancho: 4,
	required: false,
};
const inputCodPostal = {
	name: 'codPostal',
	label: 'C.P.',
	placeholder: 'C.P.',
	ancho: 2,
	required: false,
};
const inputCiudad = {
	name: 'ciudad',
	label: 'Ciudad',
	placeholder: 'Ciudad',
	ancho: 6,
	required: false,
};
const inputProvincia = {
	name: 'provincia',
	label: 'Provincia',
	placeholder: 'Provincia',
	ancho: 6,
	required: false,
};
const inputReferencia = {
	name: 'referencia',
	label: 'Referencia',
	placeholder: 'Referencia',
	ancho: 6,
	required: false,
};

const AdressCreateOrEditClient = (props) => {
	const classes = useStyles();

	return (
		<Accordion>
			<AccordionSummary
				expandIcon={<ExpandMoreIcon />}
				aria-controls="panel1a-content"
				id="panel1a-header"
			>
				<Typography className={classes.heading}>Dirección</Typography>
			</AccordionSummary>
			<AccordionDetails>
				<Grid container spacing={2}>
					{props.type === 'edit' ? (
						<Grid item xs={12}>
							<Box className={classes.caja}>
								<p className={classes.label}>Direcciones</p>
								<DireccionesCliente
									type={props.type}
									direcciones={props.cliente.direcciones}
									deleteAdress={props.deleteAdress}
								/>
							</Box>
						</Grid>
					) : null}
					<InputBordeInferior
						label={inputCalle.label}
						name={inputCalle.name}
						placeholder={inputCalle.placeholder}
						ancho={inputCalle.ancho}
						required={inputCalle.required}
						initialvalue={props.cliente.calle}
						tochangestate={props.onChangeAtributo}
					/>
					<InputNumberBordeInferior
						label={inputNumero.label}
						name={inputNumero.name}
						placeholder={inputNumero.placeholder}
						ancho={inputNumero.ancho}
						required={inputNumero.required}
						initialvalue={props.cliente.numeroCalle}
						tochangestate={props.onChangeAtributo}
					/>
					<InputBordeInferior
						label={inputPiso.label}
						name={inputPiso.name}
						placeholder={inputPiso.placeholder}
						ancho={inputPiso.ancho}
						required={inputPiso.required}
						initialvalue={props.cliente.piso}
						tochangestate={props.onChangeAtributo}
					/>
					<InputBordeInferior
						label={inputDepto.label}
						name={inputDepto.name}
						placeholder={inputDepto.placeholder}
						ancho={inputDepto.ancho}
						required={inputDepto.required}
						initialvalue={props.cliente.depto}
						tochangestate={props.onChangeAtributo}
					/>
					<InputBordeInferior
						label={inputBarrio.label}
						name={inputBarrio.name}
						placeholder={inputBarrio.placeholder}
						ancho={inputBarrio.ancho}
						required={inputBarrio.required}
						initialvalue={props.cliente.barrio}
						tochangestate={props.onChangeAtributo}
					/>
					<InputNumberBordeInferior
						label={inputCodPostal.label}
						name={inputCodPostal.name}
						placeholder={inputCodPostal.placeholder}
						ancho={inputCodPostal.ancho}
						required={inputCodPostal.required}
						initialvalue={props.cliente.codPostal}
						tochangestate={props.onChangeAtributo}
					/>
					<InputBordeInferior
						label={inputCiudad.label}
						name={inputCiudad.name}
						placeholder={inputCiudad.placeholder}
						ancho={inputCiudad.ancho}
						required={inputCiudad.required}
						initialvalue={props.cliente.ciudad}
						tochangestate={props.onChangeAtributo}
					/>
					<InputBordeInferior
						label={inputProvincia.label}
						name={inputProvincia.name}
						placeholder={inputProvincia.placeholder}
						ancho={inputProvincia.ancho}
						required={inputProvincia.required}
						initialvalue={props.cliente.provincia}
						tochangestate={props.onChangeAtributo}
					/>
					<InputBordeInferior
						label={inputReferencia.label}
						name={inputReferencia.name}
						placeholder={inputReferencia.placeholder}
						ancho={inputReferencia.ancho}
						required={inputReferencia.required}
						initialvalue={props.cliente.refDireccion}
						tochangestate={props.onChangeAtributo}
					/>
				</Grid>
			</AccordionDetails>
		</Accordion>
	);
};

export default AdressCreateOrEditClient;
