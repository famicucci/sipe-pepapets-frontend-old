import React, { useState, useContext, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Copyright from './Copyright';
import AlertaLogin from './AlertaLogin';
import AuthContext from '../../context/autenticacion/authContext';
import { useRouter } from 'next/router';

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

function Login() {
	const classes = useStyles();
	const router = useRouter();
	const [usuario, setUsuario] = useState({
		nombreUsuario: '',
		password: '',
	});
	const [alerta, setAlerta] = useState({
		estado: false,
		msj: null,
	});

	const authContext = useContext(AuthContext);
	const { iniciarSesion, autenticado, mensaje } = authContext;

	useEffect(() => {
		if (autenticado) {
			router.replace('/precios');
		}
		if (mensaje) {
			setAlerta({
				estado: true,
				msj: 'Nombre de usuario o contraseña incorrectos',
			});
		}
	}, [autenticado, mensaje]);

	// extraer de usuario
	const { nombreUsuario, password } = usuario;

	const onChange = (e) => {
		setUsuario({
			...usuario,
			[e.target.name]: e.target.value,
		});
		setAlerta({
			estado: false,
			msj: null,
		});
	};

	const onSubmit = (e) => {
		e.preventDefault();

		// Validar que no haya campos vacíos
		if (nombreUsuario.trim() === '' || password.trim() === '') {
			setAlerta({ estado: true, msj: 'Todos los campos son obligatorios' });
			return;
		}

		setAlerta({
			estado: false,
			msj: null,
		});

		iniciarSesion({ usuario: nombreUsuario, password: password });
	};

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Sip-e 2
				</Typography>
				<form className={classes.form} noValidate onSubmit={onSubmit}>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						id="nombreUsuario"
						label="Usuario"
						name="nombreUsuario"
						autoComplete="nombreUsuario"
						autoFocus
						value={nombreUsuario}
						onChange={onChange}
					/>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						name="password"
						label="Contraseña"
						type="password"
						id="password"
						autoComplete="current-password"
						value={password}
						onChange={onChange}
					/>

					{alerta.estado ? <AlertaLogin msj={alerta.msj} /> : null}

					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
					>
						Ingresar
					</Button>
					<Grid container>
						{/* <Grid item xs>
							<Link href="#" variant="body2">
								Forgot password?
							</Link>
						</Grid> */}
					</Grid>
				</form>
			</div>
			<Box mt={8}>
				<Copyright />
			</Box>
		</Container>
	);
}

export default Login;
