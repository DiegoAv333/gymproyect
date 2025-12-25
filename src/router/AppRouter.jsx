import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoadingIndicator from '../components/ui/LoadingIndicator/LoadingIndicator';
import GuestRoute from './GuestRoute';
import ProtectedRoute from './ProtectedRoute';
import NotFound from '../pages/NotFound';
import Unauthorized from '../pages/Unauthorized';

// Import layouts
import MainLayout from '../layouts/MainLayout';
import UsuarioLayout from '../layouts/UsuarioLayout';
import VentasLayout from '../layouts/VentasLayout';
import AdminLayout from '../layouts/AdminLayout';

// Import page/component lazy loaders
import { lazy } from 'react';

const Home = lazy(() => import('../components/home/Home'));
const Planes = lazy(() => import('../components/planes/Planes'));
const Servicios = lazy(() => import('../components/servicios/Servicios'));
const ClaseDetail = lazy(() => import('../components/servicios/ClaseDetail/ClaseDetail'));
const Tienda = lazy(() => import('../components/tienda/Tienda'));
const ProductDetail = lazy(() => import('../components/tienda/productDetail/ProductDetail'));
const PageLogin = lazy(() => import('../components/PageLogin/PageLogin'));
const UserDashboard = lazy(() => import('../components/Usuario/UserDashboard/UserDashboard'));
const Checkout = lazy(() => import('../components/checkout/Checkout'));
const SalesDashboard = lazy(() => import('../components/Ventas/SalesDashboard/SalesDashboard'));
const AdminDashboard = lazy(() => import('../components/Administracion/AdminDashboard'));
const Miembros = lazy(() => import('../components/Administracion/Miembros'));
const Clases = lazy(() => import('../components/Administracion/Clases'));
const Suscripciones = lazy(() => import('../components/Administracion/Suscripciones'));
const PlanesManagement = lazy(() => import('../components/Administracion/PlanesManagement'));
const Finanzas = lazy(() => import('../components/Administracion/Finanzas'));
const Reportes = lazy(() => import('../components/Administracion/Reportes'));
const ProductManagement = lazy(() => import('../components/Ventas/ProductManagement/ProductManagement'));
const SalesSummary = lazy(() => import('../components/Ventas/SalesSummary/SalesSummary'));
const StockManagement = lazy(() => import('../components/Ventas/StockView/StockView'));
const PlanActual = lazy(() => import('../components/Usuario/PlanActual/PlanActual'));
const Configuration = lazy(() => import('../components/Usuario/Configuration/Configuration'));
const PaymentSuccess = lazy(() => import('../components/mp-checks/payment-success/PaymentSuccess'));
const ClasesUsuario = lazy(() => import('../components/Usuario/Clases/ClasesUsuario'));

const AppRouter = () => {
    return (
        <Suspense fallback={<LoadingIndicator />}>
            <Routes>
                {/* Rutas Públicas */}
                <Route element={<GuestRoute />}>
                    <Route path="/login" element={<PageLogin />} />
                    <Route path="/" element={<MainLayout />}>
                        <Route index element={<Home />} />
                        <Route path="planes" element={<Planes />} />
                        <Route path="servicios" element={<Servicios />} />
                        <Route path="servicios/:slug" element={<ClaseDetail />} />
                    </Route>
                </Route>

                {/* Rutas de Usuario */}
                <Route element={<ProtectedRoute allowedRoles={['Usuario', 'SIN_ROL']} />}>
                    <Route path="/usuario" element={<UsuarioLayout />}>
                        <Route index element={<UserDashboard />} />
                        <Route path="tienda" element={<Tienda />} />
                        <Route path="producto/:productId" element={<ProductDetail />} />
                        <Route path="plan-actual" element={<PlanActual />} />
                        <Route path="checkout" element={<Checkout />} />
                        <Route path="configuracion" element={<Configuration />} />
                        <Route path="clases" element={<ClasesUsuario />} />
                    </Route>
                </Route>

                <Route path="/usuario/payment-success" element={<PaymentSuccess />} />

                {/* Rutas de Ventas */}
                <Route element={<ProtectedRoute allowedRoles={['Ventas']} />}>
                    <Route path="/ventas" element={<SalesDashboard />}>
                        <Route index element={<Navigate to="dashboard" replace />} />
                        <Route path='dashboard' element={<SalesSummary />} />
                        <Route path='products' element={<ProductManagement />} />
                        <Route path='stock' element={<StockManagement />} />
                    </Route>
                </Route>

                {/* Rutas de Admin */}
                <Route element={<ProtectedRoute allowedRoles={['Admin']} />}>
                    <Route path="/admin" element={<AdminLayout />}>
                        <Route index element={<AdminDashboard />} />
                        <Route path="miembros" element={<Miembros />} />
                        <Route path="clases" element={<Clases />} />
                        <Route path="suscripciones" element={<Suscripciones />} />
                        <Route path="planes" element={<PlanesManagement />} />
                        <Route path="productos" element={<ProductManagement />} />
                        <Route path="finanzas" element={<Finanzas />} />
                        <Route path="reportes" element={<Reportes />} />
                        <Route path="configuracion" element={<Configuration />} />
                    </Route>
                </Route>

                {/* Rutas de error */}
                <Route path="/unauthorized" element={<Unauthorized />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Suspense>
    );
};

export default AppRouter;