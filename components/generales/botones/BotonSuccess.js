import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const ColorButton = withStyles((theme) => ({
	root: {
		color: theme.palette.getContrastText(theme.palette.success.main),
		backgroundColor: theme.palette.success.main,
		'&:hover': {
			backgroundColor: theme.palette.success.dark,
		},
		margin: theme.spacing(1),
	},
}))(Button);

const BotonSuccess = (props) => {
	return (
		<ColorButton
			type={props.type}
			form={props.envio}
			variant="contained"
			{...props}
		>
			{props.contenido}
		</ColorButton>
	);
};

export default BotonSuccess;
