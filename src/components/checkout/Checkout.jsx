import React, { useState, useMemo, useEffect } from 'react';
import { useCart } from '../../context/CartContext';
import { Link, useLocation } from 'react-router-dom';
import './Checkout.css';
import {
  FaTicketAlt,
  FaShoppingBag,
  FaTrash,
  FaLock,
  FaCheck,
  FaShoppingCart,
  FaMapMarkerAlt,
  FaArrowLeft,
} from 'react-icons/fa';
import { SiMercadopago } from 'react-icons/si';
import ShippingForm from './ShippingForm/ShippingForm';
import { Wallet } from '@mercadopago/sdk-react';
import { useAuth } from '../../hooks/useAuth';

const Checkout = () => {
  const { cartItems, removeFromCart, addToCart, decreaseQuantity, getTotalPrice, clearCart } = useCart();
  const [currentStep, setCurrentStep] = useState('cart');
  const [shippingDetails, setShippingDetails] = useState(null);

  const [preferenceId, setPreferenceId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const location = useLocation();
  const { user: currentUser } = useAuth();
  const userId = currentUser?.uid;

  const hasProducts = useMemo(() => cartItems.some(item => item.type !== 'plan'), [cartItems]);
  const steps = hasProducts ? ['cart', 'shipping', 'payment', 'confirmation'] : ['cart', 'payment', 'confirmation'];

  const handleProceedFromCart = () => {
    if (hasProducts) {
      setCurrentStep('shipping');
    }
    else {
      setCurrentStep('payment');
    }
  };

  const handleCreatePreference = async () => {
    if (cartItems.length === 0) {
      console.error("El carrito está vacío. No se puede crear la preferencia.");
      return;
    }
    setIsLoading(true);
    try {
      const mpItems = cartItems.map(item => ({
        title: item.name,
        quantity: item.quantity,
        unit_price: item.price,
      }));

      if (shippingCost > 0) {
        mpItems.push({
          title: 'Costo de Envío',
          quantity: 1,
          unit_price: shippingCost,
        });
      }

      if (taxes > 0) {
        mpItems.push({
          title: 'Impuestos (16%)',
          quantity: 1,
          unit_price: taxes,
        });
      }

      const currentPlanInCart = cartItems.find(item => item.type === 'plan');

      if (!userId) {
        console.error("User ID no disponible. No se puede crear la preferencia de pago.");
        setIsLoading(false);
        return;
      }

      const planId = currentPlanInCart ? currentPlanInCart.id : undefined; // Use undefined instead of null

      const preference = {
        items: mpItems,
        payer: {
          email: currentUser?.email || 'test_user_12345@testuser.com',
          name: shippingDetails?.fullName || currentUser?.displayName || 'Comprador'
        },
        metadata: {
          userId: userId,
          ...(planId && { planId: planId }), // Only include planId if it exists
        }
      };

      const response = await fetch('http://localhost:3001/create_preference', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(preference),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error from backend creating preference:', errorData);
        setIsLoading(false);
        return;
      }

      const { id } = await response.json();

      if (id) {
        setPreferenceId(id);
      }
    } catch (error) {
      console.error('Error al crear la preferencia:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoBack = () => {
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex > 0) {
      setPreferenceId(null);
      setCurrentStep(steps[currentIndex - 1]);
    }
  };

  const handleShippingSubmit = (data) => {
    setShippingDetails(data);
    setCurrentStep('payment');
  };

  const handleAddToCart = (product) => {
    const isPlan = product.id.startsWith('plan_');
    if (isPlan) {
      const existingPlan = cartItems.find(item => item.type === 'plan');
      if (existingPlan) {
        removeFromCart(existingPlan.id);
      }
      addToCart({ ...product, type: 'plan', quantity: 1 });
    } else {
      addToCart(product);
    }
  };

  const subtotal = getTotalPrice();
  const shippingCost = hasProducts ? 5.00 : 0;
  const taxes = subtotal * 0.16;
  const total = subtotal + shippingCost + taxes;

  const getProgressWidth = () => {
    const currentStepIndex = steps.indexOf(currentStep);
    if (currentStepIndex <= 0) return '0%';
    if (currentStep === 'confirmation') return '100%';
    const percentage = (currentStepIndex / (steps.length - 2)) * 100;
    return `${percentage}%`;
  };

  const getStepNumber = (stepName) => {
    const stepIndex = steps.indexOf(stepName);
    const currentIndex = steps.indexOf(currentStep);
    return stepIndex < currentIndex ? <FaCheck /> : (stepIndex + 1).toString();
  }

  const getStepStatus = (stepName) => {
    const currentIndex = steps.indexOf(currentStep);
    const stepIndex = steps.indexOf(stepName);
    if (stepIndex < currentIndex) return 'completed';
    if (stepIndex === currentIndex) return 'active';
    return 'pending';
  }

  const titles = {
    cart: 'Tu Carrito',
    shipping: 'Información de envío',
    payment: 'Realizar Pago',
    confirmation: '¡Pedido Confirmado!'
  }

  const subtitles = {
    cart: 'Revisa tus productos y completa tu compra.',
    shipping: 'Completa tus datos para realizar el envío.',
    payment: 'Selecciona tu método de pago preferido.',
    confirmation: 'Gracias por tu compra.'
  }

  return (
    <div className="font-montserrat">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2 slide-in">{titles[currentStep]}</h1>
        <p className="text-gray-400 mb-8 slide-in">{subtitles[currentStep]}</p>

        {currentStep !== 'cart' && (
          <button className="cursor-pointer duration-200 hover:scale-125 active:scale-100" title="Go Back" onClick={handleGoBack}>
            <FaArrowLeft /> Volver
          </button>
        )}

        {currentStep !== 'confirmation' && (
          <div className="mb-10 slide-in hidden md:block">
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: getProgressWidth() }}></div>
            </div>
            <div className="flex justify-between">
              {steps.filter(s => s !== 'confirmation').map((step) => (
                <div key={step} className={`step ${getStepStatus(step)}`}>
                  <div className="step-number">{getStepNumber(step)}</div>
                  <div className="step-label">{step.charAt(0).toUpperCase() + step.slice(1)}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6 slide-in" style={{ animationDelay: '0.1s' }}>
            {currentStep === 'cart' && (
              <>
                {cartItems.length > 0 ? (
                  cartItems.map(item => (
                    <div key={item.id} className="card rounded-xl p-4 md:p-6">
                      <div className="flex flex-col md:flex-row items-center">
                        <div className="w-full md:w-24 h-24 bg-Gym ProyectGray rounded-lg flex items-center justify-center mb-4 md:mb-0">
                          {item.type === 'plan' ? <FaTicketAlt className="h-12 w-12 text-Gym ProyectYellow" /> : <FaShoppingBag className="h-12 w-12 text-Gym ProyectYellow" />}
                        </div>
                        <div className="flex-1 md:ml-6 text-center md:text-left">
                          <h3 className="font-bold text-lg">{item.name}</h3>
                          <p className="text-gray-400 text-sm mb-2">{item.description}</p>
                          {item.type !== 'plan' && (
                            <div className="flex items-center justify-center md:justify-start">
                              <div className="flex items-center">
                                <button className="quantity-btn" onClick={() => decreaseQuantity(item.id)}>-</button>
                                <input type="text" value={item.quantity} readOnly className="quantity-input mx-2" />
                                <button className="quantity-btn" onClick={() => handleAddToCart(item)}>+</button>
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="mt-4 md:mt-0 md:ml-6 flex flex-col items-center">
                          <span className="text-Gym ProyectYellow font-bold text-xl mb-2">${(item.price * item.quantity).toFixed(2)}</span>
                          <button className="text-red-400 hover:text-red-300 text-sm flex items-center" onClick={() => removeFromCart(item.id)}>
                            <FaTrash className="h-4 w-4 mr-1" />
                            Eliminar
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="card rounded-xl p-6 text-center">
                    <FaShoppingCart className="mx-auto text-gray-500 text-5xl mb-4" />
                    <h3 className="text-xl font-bold mb-2">Tu carrito está vacío</h3>
                    <p className="text-gray-400 mb-4">Añade productos o planes para continuar.</p>
                    <Link to="/usuario/tienda" className="bg-Gym ProyectYellow text-Gym ProyectBlack px-6 py-2 rounded-lg font-medium hover:bg-Gym ProyectDarkYellow transition">
                      Ir a la Tienda
                    </Link>
                  </div>
                )}
              </>
            )}

            {currentStep === 'shipping' && (
              <ShippingForm onShippingSubmit={handleShippingSubmit} />
            )}

            {currentStep === 'payment' && (
              <div className="card rounded-xl p-6 text-center">
                <SiMercadopago className="mx-auto text-sky-500 text-6xl mb-4" />
                <h3 className="text-xl font-bold mb-2">Confirmar Pago</h3>
                <p className="text-gray-400 mb-4">Estás a punto de pagar con Mercado Pago.</p>
                {shippingDetails && (
                  <div className="text-left bg-Gym ProyectGray p-4 rounded-lg mb-6">
                    <h4 className="font-bold mb-2 flex items-center"><FaMapMarkerAlt className="mr-2 text-Gym ProyectYellow" />Enviar a:</h4>
                    <p className="text-sm text-gray-300">{shippingDetails.fullName}</p>
                    <p className="text-sm text-gray-300">{shippingDetails.address}</p>
                    <p className="text-sm text-gray-300">{shippingDetails.city}, {shippingDetails.state} {shippingDetails.postalCode}</p>
                  </div>
                )}
                <div id="wallet_container">
                  {isLoading && <p>Cargando...</p>}
                  {preferenceId ? (
                    <Wallet initialization={{ preferenceId }} />
                  ) : (
                    <button
                      onClick={handleCreatePreference}
                      className="w-full bg-Gym ProyectYellow text-Gym ProyectBlack py-3 rounded-lg font-bold hover:bg-Gym ProyectDarkYellow transition btn-hover pulse"
                      disabled={isLoading}
                    >
                      Pagar
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="slide-in" style={{ animationDelay: '0.2s' }}>
            <div className="card rounded-xl p-6 sticky top-6">
              <h2 className="text-xl font-bold mb-6">Resumen de Compra</h2>

              <div className="space-y-3 mb-6">
                {cartItems.map(item => (
                  <div key={item.id} className="flex justify-between">
                    <span className="text-gray-400">{item.name} (x{item.quantity})</span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-400">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                {hasProducts && (
                  <div className="flex justify-between">
                    <span className="text-gray-400">Envío</span>
                    <span>${shippingCost.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-400">Impuestos (16%)</span>
                  <span>${taxes.toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-700 pt-3 flex justify-between">
                  <span className="font-bold">Total</span>
                  <span className="text-Gym ProyectYellow font-bold text-xl">${total.toFixed(2)}</span>
                </div>
              </div>

              {currentStep === 'cart' && (
                <button
                  className="w-full bg-Gym ProyectYellow text-Gym ProyectBlack py-3 rounded-lg font-bold hover:bg-Gym ProyectDarkYellow transition btn-hover pulse disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={handleProceedFromCart}
                  disabled={cartItems.length === 0}>
                  {hasProducts ? 'Continuar a Envío' : 'Continuar a Pago'}
                </button>
              )}

              {currentStep === 'shipping' && (
                <div className="flex items-center gap-4">
                  <button
                    className="w-full bg-gray-600 text-white py-3 rounded-lg font-bold hover:bg-gray-500 transition"
                    onClick={handleGoBack}>
                    Volver
                  </button>
                  <div className="w-full text-center text-gray-400 text-sm">
                    Completa el formulario de envío para continuar con el pago.
                  </div>
                </div>
              )}
              
              <div className="mt-6 text-center">
                <p className="text-xs text-gray-400 flex items-center justify-center"><FaLock className="h-4 w-4 mr-1" /> Pago seguro garantizado</p>
              </div>
            </div>
          </div>
        </div>
      </main>


    </div>
  );
};

export default Checkout;
