import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import StockContext from '../../context/stock/stockContext';
import TablaStockProducto from './TablaStockProducto';

const useStyles = makeStyles((theme) => ({
	modal: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	paper: {
		backgroundColor: theme.palette.background.paper,
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
		maxWidth: 550,
		borderRadius: '5px',
	},
}));

const ModalStockProducto = () => {
	const classes = useStyles();

	const { openModal, productoActivo, handleClose } = useContext(StockContext);

	if (Object.entries(productoActivo).length === 0) return null;

	return (
		<Modal
			className={classes.modal}
			open={openModal}
			onClose={() => {
				handleClose();
			}}
			closeAfterTransition
			BackdropComponent={Backdrop}
			BackdropProps={{
				timeout: 500,
			}}
		>
			<Fade in={openModal}>
				<div className={classes.paper}>
					<h2 align="center">
						{Object.entries(productoActivo).length !== 0
							? productoActivo[0]['ProductoCodigo']
							: null}
					</h2>
					<p align="center">
						{Object.entries(productoActivo).length !== 0
							? productoActivo[0]['Producto.descripcion']
							: null}
					</p>
					<TablaStockProducto />
				</div>
			</Fade>
		</Modal>
	);
};

export default ModalStockProducto;
