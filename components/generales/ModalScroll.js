import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
	modal: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'flex-start',
		overflowY: 'scroll',
		paddingTop: 100,
		paddingBottom: 60,
	},
	paper: {
		backgroundColor: theme.palette.background.paper,
		boxShadow: theme.shadows[5],
		maxWidth: 800,
		borderRadius: '10px',
		padding: (props) => (props.padding ? theme.spacing(props.padding) : null),
		paddingBottom: (props) =>
			props.paddingBottom ? theme.spacing(props.paddingBottom) : null,
	},
}));

const ModalScroll = (props) => {
	const classes = useStyles(props);

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
				<Paper className={classes.paper}>{props.children}</Paper>
			</Fade>
		</Modal>
	);
};

export default ModalScroll;
