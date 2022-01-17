import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import BotonVerMas from '../generales/BotonVerMas';
import CollapseTablaDetalleOrden from './CollapseTablaDetalleOrden';
import TableRow from '@material-ui/core/TableRow';
import HomeWorkIcon from '@material-ui/icons/HomeWork';
import BotonTippyHoverTabla from '../generales/BotonTippyHoverTabla';

const useStyles = makeStyles((theme) => ({
	regalo: {
		color: (props) => (props.pu === 0 ? theme.palette.success.main : null),
	},
	iconProduction: { marginLeft: theme.spacing(1) },
}));

const FilaDetalleOrden = (props) => {
	const { fila } = props;
	const classes = useStyles({ pu: parseFloat(fila.pu) });

	const [open, setOpen] = useState(false);
	const [production, setProduction] = useState(false);

	useEffect(() => {
		fila.ptosStockOrigen.some((x) => x.PtoStockId === 0) && setProduction(true);
	}, []);

	return (
		<>
			<TableRow>
				<TableCell className={classes.regalo} align="center">
					{fila.ProductoCodigo}
				</TableCell>
				<TableCell className={classes.regalo} align="left">
					{fila.descripcion}
					{production ? (
						<span className={classes.iconProduction}>
							<BotonTippyHoverTabla
								icono={<HomeWorkIcon />}
								contenidoTippy="Producto a pedido o en producción"
							/>
						</span>
					) : null}
				</TableCell>
				<TableCell className={classes.regalo} align="center">
					{fila.cantidad}
				</TableCell>
				<TableCell className={classes.regalo} align="center">
					<BotonVerMas setOpen={setOpen} open={open} />
				</TableCell>
			</TableRow>
			<CollapseTablaDetalleOrden
				open={open}
				ptosStockOrigen={fila.ptosStockOrigen}
			/>
		</>
	);
};

export default FilaDetalleOrden;
