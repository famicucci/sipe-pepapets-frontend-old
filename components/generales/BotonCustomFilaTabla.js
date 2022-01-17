import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
	root: {
		backgroundColor: (props) => props.backGroundColor,
		'&:hover': {
			backgroundColor: (props) => props.backGroundColorHover,
		},
		borderRadius: '5px',
		fontSize: theme.typography.pxToRem(11),
	},
}));

const BotonCustomFilaTabla = (props) => {
	const classes = useStyles(props);

	const onClick = (e) => {
		props.tochangestate();
		// setAnchorEl(event.currentTarget);
	};

	return (
		<Button
			className={classes.root}
			variant="contained"
			color="primary"
			disableRipple
			onClick={onClick}
			disabled={props.disabled ? props.disabled : false}
		>
			{props.children}
		</Button>
	);
};

export default BotonCustomFilaTabla;
