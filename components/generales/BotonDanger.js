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
		color: theme.palette.getContrastText(theme.palette.error.main),
		backgroundColor: theme.palette.error.main,
		'&:hover': {
			backgroundColor: theme.palette.error.dark,
		},
	},
}))(Button);

const BotonDanger = (props) => {
	const classes = useStyles();

	return (
		<ColorButton
			variant="contained"
			className={classes.margin}
			onClick={props.onClick}
		>
			{props.contenido}
		</ColorButton>
	);
};

export default BotonDanger;
