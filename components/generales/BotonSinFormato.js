import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const BootstrapButton = withStyles((theme) => ({
	root: {
		fontSize: theme.typography.pxToRem(12),
		lineHeight: 1.5,
		border: 'none',
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
		'&:hover': {
			backgroundColor: 'transparent',
			borderColor: 'transparent',
			boxShadow: 'none',
		},
	},
}))(Button);

const BotonSinFormato = (props) => {
	return (
		<BootstrapButton variant="outlined" {...props}>
			{props.children}
		</BootstrapButton>
	);
};

export default BotonSinFormato;
