import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useRouter } from 'next/router';
import SpinnerPantalla from '../components/generales/SpinnerPantalla';

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.primary.main,
	},
	link: {
		margin: theme.spacing(3, 0, 2),
	},
}));

export default function Home() {
	const router = useRouter();
	const classes = useStyles();

	useEffect(() => {
		router.push('/login');
	}, []);

	return <SpinnerPantalla />;
}
