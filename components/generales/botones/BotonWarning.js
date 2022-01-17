import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const ColorButton = withStyles((theme) => ({
	root: {
		color: theme.palette.getContrastText(theme.palette.warning.main),
		backgroundColor: theme.palette.warning.main,
		'&:hover': {
			backgroundColor: theme.palette.warning.dark,
		},
		margin: theme.spacing(1),
	},
}))(Button);

const BotonWarning = (props) => {
	return (
		<ColorButton
			type={props.type}
			form={props.form}
			variant="contained"
			{...props}
		>
			{props.contenido}
		</ColorButton>
	);
};

export default BotonWarning;
