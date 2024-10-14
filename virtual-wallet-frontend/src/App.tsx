import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ClientRegister from './components/ClientRegister';
import WalletRecharge from './components/WalletRecharge';
import MakePayment from './components/MakePayment';
import CheckBalance from './components/CheckBalance';

const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Router>
        {/* Navbar */}
        <nav className="bg-blue-500 p-4 text-white">
          <ul className="flex gap-4 justify-center">
            <li>
              <Link className="hover:underline" to="/">Inicio</Link>
            </li>
            <li>
              <Link className="hover:underline" to="/register">Registrar Cliente</Link>
            </li>
            <li>
              <Link className="hover:underline" to="/recharge">Recargar Billetera</Link>
            </li>
            <li>
              <Link className="hover:underline" to="/payment">Hacer Pago</Link>
            </li>
            <li>
              <Link className="hover:underline" to="/balance">Consultar Saldo</Link>
            </li>
          </ul>
        </nav>

        {/* Main Content */}
        <div className="flex-grow p-6 bg-emerald-200">
          <Routes>
            <Route 
              path="/" 
              element={
                <div className="text-center">
                  <h1 className="text-3xl mb-6">Bienvenido a la Billetera Virtual</h1>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Cards */}
                    <Link to="/register" className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition">
                      <div className="aspect-w-16 aspect-h-9">
                        <img src="/analisis.png" alt="Registrar Cliente" className="object-cover w-full h-full rounded-t-md" />
                      </div>
                      <h2 className="text-xl font-semibold mt-2">Registrar Cliente</h2>
                      <p className="text-gray-600">Agrega nuevos clientes de forma sencilla.</p>
                    </Link>
                    <Link to="/recharge" className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition">
                      <div className="aspect-w-16 aspect-h-9">
                        <img src="/billetera.png" alt="Recargar Billetera" className="object-cover w-full h-full rounded-t-md" />
                      </div>
                      <h2 className="text-xl font-semibold mt-2">Recargar Billetera</h2>
                      <p className="text-gray-600">Realiza recargas a tu cuenta virtual.</p>
                    </Link>
                    <Link to="/payment" className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition">
                      <div className="aspect-w-16 aspect-h-9">
                        <img src="/compensacion-de-trabajadores.png" alt="Hacer Pago" className="object-cover w-full h-full rounded-t-md" />
                      </div>
                      <h2 className="text-xl font-semibold mt-2">Hacer Pago</h2>
                      <p className="text-gray-600">Realiza pagos a otros usuarios.</p>
                    </Link>
                    <Link to="/balance" className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition">
                      <div className="aspect-w-16 aspect-h-9">
                        <img src="/prestamo.png" alt="Consultar Saldo" className="object-cover w-full h-full rounded-t-md" />
                      </div>
                      <h2 className="text-xl font-semibold mt-2">Consultar Saldo</h2>
                      <p className="text-gray-600">Verifica el saldo disponible en tu cuenta.</p>
                    </Link>
                  </div>
                </div>
              } 
            />
            <Route path="/register" element={<ClientRegister />} />
            <Route path="/recharge" element={<WalletRecharge />} />
            <Route path="/payment" element={<MakePayment />} />
            <Route path="/balance" element={<CheckBalance />} />
          </Routes>
        </div>

        {/* Footer */}
        <footer className="bg-blue-500 p-4 text-white text-center">
          <p>Develop with Love ❤️ By Francisco Herrera</p>
        </footer>
      </Router>
    </div>
  );
};

export default App;
