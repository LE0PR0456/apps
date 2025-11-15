import React, { useState } from 'react';

// URL de la imagen de fondo (la que has estado usando)
const BACKGROUND_IMAGE_PATH = '../src/assets/img/fondo.png'; 

// --- Componente de Botón (Shadcn/ui Style Adaptado de Register.jsx) ---
const Button = ({ children, onClick, type = 'button', variant = 'default', className = '' }) => {
    let baseClasses = 'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 shadow-sm';
    
    let variantClasses = '';
    
    switch (variant) {
        case 'primary':
            // Botón principal de acción - AZUL
            variantClasses = 'bg-blue-600 text-white hover:bg-blue-700 shadow-xl focus-visible:ring-blue-500';
            break;
        case 'secondary':
            // Botón secundario - AZUL OSCURO
            variantClasses = 'bg-blue-800 text-white hover:bg-blue-900 shadow-lg';
            break;
        case 'link':
            // Enlaces como texto - AZUL VISIBLE sobre fondo blanco
            variantClasses = 'text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 shadow-none p-0 h-auto underline-offset-4 hover:underline';
            break;
        default:
            variantClasses = 'bg-gray-700 text-white hover:bg-gray-800';
    }

    return (
        <button
            type={type}
            onClick={onClick}
            className={`${baseClasses} ${variantClasses} ${className}`}
        >
            {children}
        </button>
    );
};

// --- Componente Modal / Diálogo (Adaptado de LandingPageTailwind.jsx) ---
const Dialog = ({ isVisible, message, onClose }) => {
    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 transition-opacity duration-300">
            <div 
                className="bg-white p-6 rounded-lg border shadow-2xl max-w-sm w-full text-center 
                           transform scale-100 opacity-100 animate-in fade-in-90 zoom-in-90 dark:bg-gray-800 dark:border-gray-700"
            >
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">Acción Requerida</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">{message}</p>
                
                <Button 
                    onClick={onClose}
                    variant="primary"
                    className="w-full text-sm"
                >
                    Entendido
                </Button>
            </div>
        </div>
    );
};

const Login = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    // MISMO degradado azul que en landing page y register
    const backgroundStyle = {
        backgroundImage: `linear-gradient(to bottom, rgba(30, 58, 138, 0.7) 0%, rgba(15, 23, 42, 0.9) 100%), url(${BACKGROUND_IMAGE_PATH})`,
    };

    const handleLogin = (e) => {
        e.preventDefault();
        setModalMessage("Simulación de inicio de sesión exitoso. Redireccionando...");
        setIsModalVisible(true);
        console.log("Simulación de inicio de sesión enviada.");
    };
    
    const handleCloseModal = () => {
        setIsModalVisible(false);
    };

    // Estilo de Input con AZUL en el focus
    const inputClasses = "flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 \
                          ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium \
                          placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 \
                          focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 \
                          dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:placeholder:text-gray-400";
                          
    // Estilo de Label consistente
    const labelClasses = "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1";

    return (
        // Contenedor principal
        <div className="relative min-h-screen flex items-center justify-center font-sans">
            
            {/* BLOQUE DE FONDO - MISMO AZUL que landing page y register */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
                style={backgroundStyle}
            />
            {/* ------------------------------------------- */}

            {/* Contenedor del Formulario */}
            <div className="w-full max-w-md p-6 sm:p-8 space-y-6 bg-white rounded-xl border border-gray-200 shadow-2xl dark:bg-gray-900 transition-all duration-300 transform hover:scale-[1.01] relative z-10">
                
                {/* Header Card */}
                <div className="text-center pb-4 border-b border-gray-100 dark:border-gray-700">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                        ¡Bienvenido de Nuevo!
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        Inicia sesión para acceder a tu panel.
                    </p>
                </div>
                
                <form className="space-y-4" onSubmit={handleLogin}>
                    {/* Correo Electrónico */}
                    <div>
                        <label htmlFor="email" className={labelClasses}>Correo Electrónico</label>
                        <input id="email" name="email" type="email" autoComplete="email" required className={inputClasses} placeholder="tu@ejemplo.com" />
                    </div>
                    {/* Contraseña */}
                    <div>
                        <label htmlFor="password" className={labelClasses}>Contraseña</label>
                        <input id="password" name="password" type="password" autoComplete="current-password" required className={inputClasses} placeholder="••••••••" />
                    </div>

                    {/* Opciones Adicionales */}
                    <div className="flex items-center justify-end">
                        {/* Enlace de Olvidaste Contraseña - AHORA VISIBLE */}
                        <a href="#" onClick={(e) => {e.preventDefault(); setModalMessage("Proceso de recuperación de contraseña iniciado."); setIsModalVisible(true);}}>
                            <Button variant="link" className="font-semibold text-sm">
                                ¿Olvidaste tu contraseña?
                            </Button>
                        </a>
                    </div>
                    
                    {/* Botón de Inicio de Sesión - AZUL PRINCIPAL */}
                    <div className="pt-2">
                        <Button
                            type="submit"
                            variant="primary"
                            className="w-full h-11 text-base shadow-xl"
                        >
                            Iniciar Sesión
                        </Button>
                    </div>
                </form>
                
                {/* Enlace de Registro - AHORA VISIBLE */}
                <div className="text-center pt-4 border-t border-gray-100 dark:border-gray-800">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        ¿No tienes una cuenta?{' '}
                        <a href="/register">
                            <Button variant="link" className="inline-block p-0 h-auto font-semibold">
                                Regístrate
                            </Button>
                        </a>
                    </p>
                </div>
            </div>

            {/* Modal de Feedback */}
            <Dialog 
                isVisible={isModalVisible} 
                message={modalMessage} 
                onClose={handleCloseModal} 
            />
        </div>
    );
};

export default Login;