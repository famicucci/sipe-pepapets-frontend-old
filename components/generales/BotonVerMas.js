import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { IconButton } from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';

const useStyles = makeStyles((theme) => ({
	root: {
		'& > *': {
			margin: (props) => (props.margin ? theme.spacing(props.margin) : 0),
		},
	},
}));

const BotonVerMas = ({ setOpen, open, margin }) => {
	const classes = useStyles({ margin });

	return (
		<div className={classes.root}>
			<IconButton
				size="small"
				onClick={() => {
					setOpen(!open);
				}}
			>
				{!open ? (
					<ArrowDropDownIcon fontSize="default" fontSize="small" />
				) : (
					<ArrowDropUpIcon fontSize="default" fontSize="small" />
				)}
			</IconButton>
		</div>
	);
};

export default BotonVerMas;
