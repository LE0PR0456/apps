import React from 'react';

// URL de la imagen de fondo (la que has estado usando)
const BACKGROUND_IMAGE_PATH = '../src/assets/img/fondo.png'; 

// --- Componente de Botón (Shadcn/ui Style Adaptado) ---
const Button = ({ children, onClick, type = 'button', variant = 'default', className = '' }) => {
    let baseClasses = 'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 shadow-sm';
    
    let variantClasses = '';
    
    switch (variant) {
        case 'primary':
            // Botón principal de acción - Azul principal
            variantClasses = 'bg-blue-600 text-white hover:bg-blue-700 shadow-xl focus-visible:ring-blue-500';
            break;
        case 'link':
            // Enlaces como texto - Azul para enlaces
            variantClasses = 'text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 shadow-none p-0 h-auto';
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

const Register = () => {
    // Definición de la URL de la imagen de fondo con el degradado azul para contraste
    const backgroundStyle = {
        backgroundImage: `linear-gradient(rgba(30, 58, 138, 0.7), rgba(15, 23, 42, 0.9)), url(${BACKGROUND_IMAGE_PATH})`,
    };

    const handleRegistration = (e) => {
        e.preventDefault();
        console.log("Simulación de registro enviada.");
        alert("Simulación de registro exitoso. Revisar la consola."); 
    };

    // Estilo de Input con colores azules en el focus
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
            
            {/* BLOQUE DE FONDO DE PANTALLA COMPLETA CON AZUL */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
                style={backgroundStyle}
            />
            {/* ------------------------------------------- */}

            {/* Contenedor del Formulario (Card Style Shadcn) */}
            <div className="w-full max-w-md p-6 sm:p-8 space-y-6 bg-white rounded-xl border border-gray-200 shadow-2xl dark:bg-gray-900 transition-all duration-300 transform hover:scale-[1.01] relative z-10">
                
                {/* Header Card */}
                <div className="text-center pb-4 border-b border-gray-100 dark:border-gray-700">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Crea tu Cuenta
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        Únete a la comunidad de Merca Emprende hoy.
                    </p>
                </div>
                
                <form className="space-y-4" onSubmit={handleRegistration}>
                    {/* Campos de Input */}
                    <div>
                        <label htmlFor="name" className={labelClasses}>Nombre Completo</label>
                        <input id="name" name="name" type="text" autoComplete="name" required className={inputClasses} placeholder="Tu Nombre" />
                    </div>
                    <div>
                        <label htmlFor="email" className={labelClasses}>Correo Electrónico</label>
                        <input id="email" name="email" type="email" autoComplete="email" required className={inputClasses} placeholder="tu@ejemplo.com" />
                    </div>
                    <div>
                        <label htmlFor="password" className={labelClasses}>Contraseña</label>
                        <input id="password" name="password" type="password" autoComplete="new-password" required className={inputClasses} placeholder="••••••••" />
                    </div>
                    <div>
                        <label htmlFor="confirm-password" className={labelClasses}>Confirmar Contraseña</label>
                        <input id="confirm-password" name="confirm-password" type="password" autoComplete="new-password" required className={inputClasses} placeholder="••••••••" />
                    </div>
                    
                    {/* Botón de Registro (Footer Card) */}
                    <div className="pt-2">
                        <Button
                            type="submit"
                            variant="primary"
                            className="w-full h-11 text-base shadow-xl bg-blue-600 hover:bg-blue-700"
                        >
                            Registrarse
                        </Button>
                    </div>
                </form>
                
                {/* Enlace de Login (Separador) */}
                <div className="text-center pt-4 border-t border-gray-100 dark:border-gray-800">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        ¿Ya tienes una cuenta?{' '}
                        <a href="/login">
                            <Button variant="link" className="inline-block p-0 h-auto font-semibold">
                                Inicia Sesión
                            </Button>
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;