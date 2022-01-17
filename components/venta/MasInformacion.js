import React, { useContext, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import SelectPtoVenta from './SelectPtoVenta';
import { Grid } from '@material-ui/core';
import InputBordeInferior from '../generales/inputs/InputBordeInferior';
import AccordionActions from '@material-ui/core/AccordionActions';
import Divider from '@material-ui/core/Divider';
import EditarOrdenesContext from '../../context/ventas/editarordenes/EditarOrdenesContext';
import IconButton from '@material-ui/core/IconButton';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined';
import ItemInfoConLabel from '../generales/ItemInfoConLabel';
import GlobalDataContext from '../../context/globalData/GlobalDataContext';
import clsx from 'clsx';
import SaveIcon from '@material-ui/icons/Save';
import { syncOrdersTN } from '../../config/globalVariables';

const useStyles = makeStyles((theme) => ({
	form: { width: '100%' },
	heading: {
		fontSize: theme.typography.pxToRem(15),
		fontWeight: theme.typography.fontWeightRegular,
	},
	saveButton: { color: theme.palette.success.dark },
}));

const MasInformacion = () => {
	const classes = useStyles();

	const { salePoints, getSalePoints } = useContext(GlobalDataContext);
	const { filaActiva, modificarOrden } = useContext(EditarOrdenesContext);

	const [expanded, setExpanded] = useState({ expanded: false });
	const [edit, setEdit] = useState(false);
	const [edited, setEdited] = useState(false);

	const [masInformacion, setMasInformacion] = useState({
		PtoVentaId: filaActiva.PtoVenta.id,
		observaciones: filaActiva.observaciones,
		ordenEcommerce: filaActiva.ordenEcommerce,
	});

	useEffect(() => {
		if (!salePoints) getSalePoints();
	}, []);

	const onChangePtoVenta = (value) => {
		setMasInformacion({
			...masInformacion,
			PtoVentaId: value,
		});
		setEdited(true);
	};

	const onChangeNroEcommerce = (name, value) => {
		setMasInformacion({
			...masInformacion,
			ordenEcommerce: value,
		});
		setEdited(true);
	};

	const onChangeNota = (name, value) => {
		setMasInformacion({
			...masInformacion,
			observaciones: value,
		});
		setEdited(true);
	};

	const onSubmit = (e) => {
		e.preventDefault();

		modificarOrden(filaActiva.id, masInformacion);

		setExpanded({ expanded: false });
		setEdit(false);
		setEdited(false);
	};

	const onClickSummary = () => {
		if (expanded.expanded === true) {
			setExpanded({ expanded: false });
		} else if (expanded.expanded === false) {
			setExpanded({ expanded: true });
		}
	};

	const getSalePointDescripction = (salePointId, salePoints) => {
		const r = salePoints.find((x) => x.id === salePointId);
		if (r) return r.descripcion;
	};

	const onClickEdit = () => {
		setEdit(true);
	};

	const items = [
		{
			id: 1,
			label: 'Pto. Venta',
			contenido: salePoints
				? getSalePointDescripction(masInformacion.PtoVentaId, salePoints)
				: null,
			ancho: 6,
		},
		{
			id: 2,
			label: 'Nº Orden Ecommerce',
			contenido: masInformacion.ordenEcommerce,
			ancho: 6,
		},
		{
			id: 3,
			label: 'Nota',
			contenido: masInformacion.observaciones,
			ancho: 12,
		},
	];

	return (
		<Accordion {...expanded}>
			<AccordionSummary
				expandIcon={<ExpandMoreIcon />}
				onClick={onClickSummary}
			>
				<Typography className={classes.heading}>Más información</Typography>
			</AccordionSummary>
			<AccordionDetails>
				{!edit ? (
					<Grid container spacing={2}>
						{items.map((x) => (
							<ItemInfoConLabel
								key={x.id}
								label={x.label}
								contenido={x.contenido}
								ancho={x.ancho}
							/>
						))}
					</Grid>
				) : (
					<form
						className={classes.form}
						id="form-mas-informacion"
						onSubmit={onSubmit}
					>
						<Grid container spacing={1}>
							<Grid item xs={3}>
								<SelectPtoVenta
									ptoVenta={masInformacion.PtoVentaId}
									handlePtoVenta={onChangePtoVenta}
								/>
							</Grid>
							{!syncOrdersTN ? (
								<InputBordeInferior
									label="Nº Ecommerce"
									name="nroEcommerce"
									placeholder="Escribe el identificador aquí.."
									ancho={9}
									initialvalue={masInformacion.ordenEcommerce}
									tochangestate={onChangeNroEcommerce}
								/>
							) : (
								<ItemInfoConLabel
									key={items[1]['id']}
									label={items[1]['label']}
									contenido={items[1]['contenido']}
									ancho={items[1]['ancho']}
								/>
							)}
							<InputBordeInferior
								label="Nota"
								name="nota"
								placeholder="Escribe la nota aquí..."
								ancho={12}
								initialvalue={masInformacion.observaciones}
								tochangestate={onChangeNota}
							/>
						</Grid>
					</form>
				)}
			</AccordionDetails>
			<Divider />
			{!filaActiva.Factura ? (
				<AccordionActions>
					<IconButton size="small" onClick={onClickEdit}>
						<EditOutlinedIcon />
					</IconButton>
					<IconButton size="small" type="submit" form="form-mas-informacion">
						{!edited ? (
							<SaveOutlinedIcon />
						) : (
							<SaveIcon
								className={clsx({
									[classes.saveButton]: edited,
								})}
							/>
						)}
					</IconButton>
				</AccordionActions>
			) : null}
		</Accordion>
	);
};

export default MasInformacion;
