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

const inputEmail = {
	name: 'email',
	label: 'Email',
	placeholder: 'Email',
	ancho: 6,
	required: true,
};
const inputCelular = {
	name: 'celular',
	label: 'Celular',
	placeholder: 'Celular',
	ancho: 6,
	required: false,
};
const inputInstagram = {
	name: 'instagram',
	label: 'Instagram',
	placeholder: 'Instagram',
	ancho: 6,
	required: false,
};
const inputFacebook = {
	name: 'facebook',
	label: 'Facebook',
	placeholder: 'Facebook',
	ancho: 6,
	required: false,
};

const ContactCreateOrEditClient = (props) => {
	const classes = useStyles();

	return (
		<Accordion>
			<AccordionSummary
				expandIcon={<ExpandMoreIcon />}
				aria-controls="panel1a-content"
				id="panel1a-header"
			>
				<Typography className={classes.heading}>Contacto</Typography>
			</AccordionSummary>
			<AccordionDetails>
				<Grid container spacing={2}>
					<InputBordeInferior
						label={inputEmail.label}
						name={inputEmail.name}
						placeholder={inputEmail.placeholder}
						ancho={inputEmail.ancho}
						required={inputEmail.required}
						initialvalue={props.cliente.email}
						tochangestate={props.onChangeAtributo}
					/>
					<InputBordeInferior
						label={inputCelular.label}
						name={inputCelular.name}
						placeholder={inputCelular.placeholder}
						ancho={inputCelular.ancho}
						required={inputCelular.required}
						initialvalue={props.cliente.celular}
						tochangestate={props.onChangeAtributo}
					/>
					<InputBordeInferior
						label={inputInstagram.label}
						name={inputInstagram.name}
						placeholder={inputInstagram.placeholder}
						ancho={inputInstagram.ancho}
						required={inputInstagram.required}
						initialvalue={props.cliente.instagram}
						tochangestate={props.onChangeAtributo}
					/>
					<InputBordeInferior
						label={inputFacebook.label}
						name={inputFacebook.name}
						placeholder={inputFacebook.placeholder}
						ancho={inputFacebook.ancho}
						required={inputFacebook.required}
						initialvalue={props.cliente.facebook}
						tochangestate={props.onChangeAtributo}
					/>
				</Grid>
			</AccordionDetails>
		</Accordion>
	);
};

export default ContactCreateOrEditClient;
