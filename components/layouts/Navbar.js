import React, { useContext } from 'react';
import clsx from 'clsx';
import { makeStyles, AppBar, Toolbar, IconButton } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MoreIcon from '@material-ui/icons/MoreVert';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PersonIcon from '@material-ui/icons/Person';
import Logo from './Logo';
import Buscador from '../generales/Buscador';
import SelectListasPrecio from '../precio/SelectListasPrecio';
import SelectPuntoStock from '../stock/SelectPuntoStock';
import BotonModoCargaVenta from '../venta/BotonModoCargaVenta';
import BotonNuevoCliente from '../cliente/BotonNuevoCliente';
import BotonNuevoGasto from '../gasto/BotonNuevoGasto';
import EtiquetaModificarOrden from '../venta/EtiquetaModificarOrden';

import AuthContext from '../../context/autenticacion/authContext';
import BarraHerramientasContext from '../../context/barraHerramientas/barraHerramientasContext';
import StockContext from '../../context/stock/stockContext';
import SelectBetweenMonths from '../generales/SelectBetweenMonths';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
	menuButton: {
		marginRight: theme.spacing(2),
	},
	grow: {
		flexGrow: 1,
	},
	appBar: {
		transition: theme.transitions.create(['margin', 'width'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
	},
	appBarShift: {
		width: `calc(100% - ${drawerWidth}px)`,
		marginLeft: drawerWidth,
		transition: theme.transitions.create(['margin', 'width'], {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	sectionDesktop: {
		display: 'none',
		[theme.breakpoints.up('md')]: {
			display: 'flex',
		},
	},
	sectionMobile: {
		display: 'flex',
		[theme.breakpoints.up('md')]: {
			display: 'none',
		},
	},
	hide: {
		display: 'none',
	},
}));

const Navbar = (props) => {
	const classes = useStyles();

	// setea barra de herramientas
	const {
		buscador,
		selectListaPrecio,
		selectPtoStock,
		botonModoCargaVenta,
		botonNuevoCliente,
		botonNuevoGasto,
		selectBetweenMonths,
		etiquetaModificarOrden,
	} = useContext(BarraHerramientasContext);
	const { usuario, cerrarSesion } = useContext(AuthContext);
	const { ptoStock, handlePtoStock } = useContext(StockContext);

	const [anchorEl, setAnchorEl] = React.useState(null);
	const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

	const isMenuOpen = Boolean(anchorEl);
	const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

	const handleProfileMenuOpen = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMobileMenuClose = () => {
		setMobileMoreAnchorEl(null);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
		handleMobileMenuClose();
	};

	const handleMobileMenuOpen = (event) => {
		setMobileMoreAnchorEl(event.currentTarget);
	};

	const menuId = 'primary-search-account-menu';
	const renderMenu = (
		<Menu
			anchorEl={anchorEl}
			anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
			id={menuId}
			keepMounted
			transformOrigin={{ vertical: 'top', horizontal: 'right' }}
			open={isMenuOpen}
			onClose={handleMenuClose}
		>
			<MenuItem onClick={handleMenuClose}>
				<IconButton color="inherit">
					<PersonIcon />
				</IconButton>
				{usuario ? <p>{usuario.usuario}</p> : null}
			</MenuItem>
			<MenuItem
				onClick={() => {
					cerrarSesion();
				}}
			>
				<IconButton
					aria-label="account of current user"
					aria-controls="primary-search-account-menu"
					aria-haspopup="true"
					color="inherit"
				>
					<ExitToAppIcon />
				</IconButton>
				<p>Salir</p>
			</MenuItem>
		</Menu>
	);

	const mobileMenuId = 'primary-search-account-menu-mobile';
	const renderMobileMenu = (
		<Menu
			anchorEl={mobileMoreAnchorEl}
			anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
			id={mobileMenuId}
			keepMounted
			transformOrigin={{ vertical: 'top', horizontal: 'right' }}
			open={isMobileMenuOpen}
			onClose={handleMobileMenuClose}
		>
			<MenuItem>
				<IconButton color="inherit">
					<PersonIcon />
				</IconButton>
				<p>mi perfil</p>
			</MenuItem>
			<MenuItem onClick={handleProfileMenuOpen}>
				<IconButton
					aria-label="account of current user"
					aria-controls="primary-search-account-menu"
					aria-haspopup="true"
					color="inherit"
				>
					<ExitToAppIcon />
				</IconButton>
				<p>Salir</p>
			</MenuItem>
		</Menu>
	);

	return (
		<>
			<AppBar
				position="fixed"
				className={clsx(classes.appBar, {
					[classes.appBarShift]: props.abrir,
				})}
			>
				<Toolbar>
					{props.abrir ? null : (
						<>
							<IconButton
								color="inherit"
								aria-label="menu"
								onClick={() => {
									props.toggleMenu();
								}}
								edge="start"
								className={clsx(
									classes.menuButton,
									props.abrir && classes.hide
								)}
							>
								<MenuIcon />
							</IconButton>
							<Logo color="inherit" />
						</>
					)}
					{buscador ? <Buscador /> : null}
					{selectListaPrecio ? <SelectListasPrecio /> : null}
					{selectPtoStock ? (
						<SelectPuntoStock
							ptoStock={ptoStock}
							handlePtoStock={handlePtoStock}
						/>
					) : null}
					{botonModoCargaVenta ? <BotonModoCargaVenta /> : null}
					{botonNuevoCliente ? <BotonNuevoCliente /> : null}
					{etiquetaModificarOrden ? <EtiquetaModificarOrden /> : null}
					{selectBetweenMonths ? <SelectBetweenMonths /> : null}
					{botonNuevoGasto ? <BotonNuevoGasto /> : null}

					<div className={classes.grow} />

					<div className={classes.sectionDesktop}>
						<IconButton
							edge="end"
							aria-label="account of current user"
							aria-controls={menuId}
							aria-haspopup="true"
							onClick={handleProfileMenuOpen}
							color="inherit"
						>
							<AccountCircle />
						</IconButton>
					</div>

					<div className={classes.sectionMobile}>
						<IconButton
							aria-label="show more"
							aria-controls={mobileMenuId}
							aria-haspopup="true"
							onClick={handleMobileMenuOpen}
							color="inherit"
						>
							<MoreIcon />
						</IconButton>
					</div>
				</Toolbar>
			</AppBar>
			{renderMobileMenu}
			{renderMenu}
		</>
	);
};

export default Navbar;
