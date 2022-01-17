import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';
import SelectBordeInferior from '../generales/inputs/SelectBordeInferior';
import InputBordeInferior from '../generales/inputs/InputBordeInferior';

const useStyles = makeStyles((theme) => ({
	heading: {
		fontSize: theme.typography.pxToRem(15),
		fontWeight: theme.typography.fontWeightRegular,
	},
}));

const inputObservaciones = {
	name: 'observaciones',
	label: 'Nombre Local / Observaciones',
	placeholder: 'Nombre Local / Observaciones',
	ancho: 6,
	required: false,
};

const inputMascota = {
	name: 'mascota',
	label: 'Mascota',
	placeholder: 'Mascota',
	ancho: 6,
	required: false,
};

// label, ancho, valores, descripcionValores
const selectTipo = {
	name: 'tipo',
	label: 'Tipo',
	ancho: 6,
	data: [
		{ id: 10, descripcion: 'Minorista' },
		{ id: 20, descripcion: 'Mayorista' },
	],
	valDefault: 10,
};

const selectCondIVA = {
	name: 'condIva',
	label: 'Condicion frente a IVA',
	ancho: 6,
	data: [
		{ id: 10, descripcion: 'Consumidor Final' },
		{ id: 20, descripcion: 'Monotributista' },
		{ id: 30, descripcion: 'Responsable Inscripto' },
	],
	valDefault: 10,
};

const MoreDataCreateOrEditClient = (props) => {
	const classes = useStyles();

	const getIdTipo = () => {
		let id;
		const r = selectTipo.data.find((x) => x.descripcion === props.cliente.tipo);
		if (r) id = r.id;
		else id = 10;
		return id;
	};

	const getIdCondIVA = () => {
		let id;
		const r = selectCondIVA.data.find(
			(x) => x.descripcion === props.cliente.condIva
		);
		if (r) id = r.id;
		else id = 10;
		return id;
	};

	const onChangeSelectTipo = (name, value) => {
		let type = selectTipo.data.find((x) => x.id === value);
		type && (type = type.descripcion);

		props.onChangeAtributo(name, type);
	};

	const onChangeSelectCondIVA = (name, value) => {
		let condIva = selectCondIVA.data.find((x) => x.id === value);
		condIva && (condIva = condIva.descripcion);

		props.onChangeAtributo(name, condIva);
	};

	return (
		<Accordion>
			<AccordionSummary
				expandIcon={<ExpandMoreIcon />}
				aria-controls="panel1a-content"
				id="panel1a-header"
			>
				<Typography className={classes.heading}>Más Datos</Typography>
			</AccordionSummary>
			<AccordionDetails>
				<Grid container spacing={2}>
					<InputBordeInferior
						label={inputObservaciones.label}
						name={inputObservaciones.name}
						placeholder={inputObservaciones.placeholder}
						ancho={inputObservaciones.ancho}
						required={inputObservaciones.required}
						initialvalue={props.cliente.observaciones}
						tochangestate={props.onChangeAtributo}
					/>
					<InputBordeInferior
						label={inputMascota.label}
						name={inputMascota.name}
						placeholder={inputMascota.placeholder}
						ancho={inputMascota.ancho}
						required={inputMascota.required}
						initialvalue={props.cliente.mascota}
						tochangestate={props.onChangeAtributo}
					/>
					<SelectBordeInferior
						name={selectTipo.name}
						label={selectTipo.label}
						ancho={selectTipo.ancho}
						data={selectTipo.data}
						initialvalue={getIdTipo()}
						tochangestate={onChangeSelectTipo}
					/>
					<SelectBordeInferior
						name={selectCondIVA.name}
						label={selectCondIVA.label}
						ancho={selectCondIVA.ancho}
						data={selectCondIVA.data}
						initialvalue={getIdCondIVA()}
						tochangestate={onChangeSelectCondIVA}
					/>
				</Grid>
			</AccordionDetails>
		</Accordion>
	);
};

export default MoreDataCreateOrEditClient;
