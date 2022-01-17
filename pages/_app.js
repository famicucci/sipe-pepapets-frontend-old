import '../styles/globals.css';
import MenuProvider from '../context/MenuContext';
import AuthState from '../context/autenticacion/authState';
import BarraHerramientas from '../context/barraHerramientas/barraHerramientasState';
import ClienteState from '../context/clientes/ClienteState';
import VentasState from '../context/ventas/ventasState';
import EditarOrdenesState from '../context/ventas/editarordenes/EditarOrdenesState';
import GlobalDataState from '../context/globalData/GlobalDataState';
import GastoState from '../context/gasto/GastoState';

function MyApp({ Component, pageProps }) {
	return (
		<AuthState>
			<GlobalDataState>
				<MenuProvider>
					<BarraHerramientas>
						<VentasState>
							<EditarOrdenesState>
								<ClienteState>
									<GastoState>
										<Component {...pageProps} />
									</GastoState>
								</ClienteState>
							</EditarOrdenesState>
						</VentasState>
					</BarraHerramientas>
				</MenuProvider>
			</GlobalDataState>
		</AuthState>
	);
}

export default MyApp;
