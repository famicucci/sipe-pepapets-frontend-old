import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
	margin: {
		margin: theme.spacing(1),
	},
}));

const ColorButton = withStyles((theme) => ({
	root: {
		color: theme.palette.getContrastText(theme.palette.accion.main),
		backgroundColor: theme.palette.accion.main,
		'&:hover': {
			backgroundColor: theme.palette.accion.dark,
		},
	},
}))(Button);

const BotonAccion = (props) => {
	const classes = useStyles();

	return (
		<ColorButton
			variant="contained"
			className={classes.margin}
			onClick={props.onClick}
		>
			{props.children}
		</ColorButton>
	);
};

export default BotonAccion;
