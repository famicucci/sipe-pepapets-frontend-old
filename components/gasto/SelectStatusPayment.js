import React, { useState, useContext } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import GastoContext from '../../context/gasto/GastoContext';

const BootstrapButton = withStyles((theme) => ({
	root: {
		boxShadow: 'none',
		textTransform: 'none',
		fontSize: theme.typography.pxToRem(14),
		padding: '4px 6px',
		border: '1px solid',
		borderRadius: '5px',
		lineHeight: 1.5,
		fontFamily: [
			'-apple-system',
			'BlinkMacSystemFont',
			'"Segoe UI"',
			'Roboto',
			'"Helvetica Neue"',
			'Arial',
			'sans-serif',
			'"Apple Color Emoji"',
			'"Segoe UI Emoji"',
			'"Segoe UI Symbol"',
		].join(','),
	},
}))(Button);

const useStyles = makeStyles((theme) => ({
	statusPaymentButton: {
		border: (props) =>
			props.content === 'Pago'
				? `1px solid ${theme.palette.success.dark}`
				: `1px solid ${theme.palette.error.dark}`,
		color: (props) =>
			props.content === 'Pago'
				? `${theme.palette.success.dark}`
				: `${theme.palette.error.dark}`,
	},
	statusPaymentMenuPaid: {
		color: theme.palette.success.dark,
		fontWeight: 'bold',
	},
	statusPaymentMenuNotPaid: {
		color: theme.palette.error.dark,
		fontWeight: 'bold',
	},
}));

const SelectStatusPayment = (props) => {
	const { expenseId, content } = props;
	const classes = useStyles({ content });

	const { handleStatusPayment } = useContext(GastoContext);
	const [anchorEl, setAnchorEl] = useState(null);

	const statusPayments = [
		{ id: 1, descripcion: 'Pago' },
		{ id: 2, descripcion: 'Pendiente' },
	];

	const handleClickBoton = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClickItem = (expenseId, statusPayment) => {
		handleStatusPayment(expenseId, statusPayment);
		setAnchorEl(null);
	};

	const handleClose = (event) => {
		setAnchorEl(null);
	};

	return (
		<div>
			<BootstrapButton
				className={classes.statusPaymentButton}
				variant="outlined"
				disableRipple
				onClick={handleClickBoton}
			>
				{content}
			</BootstrapButton>
			<Menu
				id="simple-menu"
				anchorEl={anchorEl}
				keepMounted
				open={Boolean(anchorEl)}
				onClose={handleClose}
			>
				{statusPayments.map((x) => (
					<MenuItem
						key={x.id}
						value={x.id}
						onClick={() => {
							handleClickItem(expenseId, x.descripcion);
						}}
					>
						<span
							className={
								x.id === 1
									? classes.statusPaymentMenuPaid
									: classes.statusPaymentMenuNotPaid
							}
						>
							{x.descripcion}
						</span>
					</MenuItem>
				))}
			</Menu>
		</div>
	);
};

export default SelectStatusPayment;
