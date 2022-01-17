import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper';
import {
	Box,
	Typography,
	Divider,
	IconButton,
	Menu,
	MenuItem,
} from '@material-ui/core';
import MoreVert from '@material-ui/icons/MoreVert';

const useStyles = makeStyles((theme) => ({
	modal: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	paper: {
		backgroundColor: theme.palette.background.paper,
		boxShadow: theme.shadows[5],
		width: (props) => (props.width ? props.width : 600),
		borderRadius: '10px',
		padding: (props) => (props.padding ? props.padding : null),
	},
	contenido: { marginLeft: theme.spacing(2), marginRight: theme.spacing(2) },
	dividerSuperior: {
		marginTop: theme.spacing(1),
		marginBottom: theme.spacing(1),
	},
	dividerInferior: {
		marginBottom: theme.spacing(1),
		marginTop: theme.spacing(3),
	},
	footer: {
		marginLeft: theme.spacing(2),
	},
	grow: {
		flexGrow: 1,
	},
}));

const ModalCentrado = (props) => {
	const classes = useStyles(props);

	const [anchorEl, setAnchorEl] = useState(null);

	const handleClickMenu = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<Modal
			className={classes.modal}
			open={props.openModal}
			onClose={() => {
				props.handleClose();
			}}
			closeAfterTransition
			BackdropComponent={Backdrop}
			BackdropProps={{
				timeout: 500,
			}}
		>
			<Fade in={props.openModal}>
				<Paper className={classes.paper}>
					<Box
						display="flex"
						justifyContent="flex-center"
						alignItems="flex-end"
					>
						<Typography variant="h5" align="left">
							{props.titulo}
						</Typography>
						<div className={classes.grow} />
						{props.morevertactions ? (
							<Box>
								<IconButton size="small" onClick={handleClickMenu}>
									<MoreVert />
								</IconButton>
								<Menu
									anchorEl={anchorEl}
									keepMounted
									open={Boolean(anchorEl)}
									onClose={handleClose}
								>
									{props.morevertactions.map((x, i) => (
										<MenuItem
											key={i}
											onClick={() => {
												x.function();
												handleClose();
											}}
											{...x.status}
										>
											{x.content}
										</MenuItem>
									))}
								</Menu>
							</Box>
						) : null}
					</Box>
					<Divider className={classes.dividerSuperior} variant="fullWidth" />
					<Box className={classes.contenido}>{props.children}</Box>
					{props.footer ? (
						<>
							<Divider
								className={classes.dividerInferior}
								variant="fullWidth"
							/>
							<Box className={classes.footer}>{props.footer}</Box>
						</>
					) : null}
				</Paper>
			</Fade>
		</Modal>
	);
};

export default ModalCentrado;
