import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
		'& > * + *': {
			marginTop: theme.spacing(2),
		},
	},
	texto: {
		color: 'red',
	},
}));

const AlertaLogin = (props) => {
	const { msj } = props;

	const classes = useStyles();

	return (
		<div className={classes.root}>
			<Alert severity="error" className={classes.texto}>
				{msj}
			</Alert>
		</div>
	);
};

export default AlertaLogin;
