import React, { useState, useEffect, useContext, createContext } from 'react';
import { Formik, Field, ErrorMessage } from 'formik';
import axios from "@/api/axios.js";

// --- Dependencias simuladas para Formik ---

// 1. Hook de Autenticación (Basado en el contexto proporcionado por el usuario)
// Se asume que 'signupRequest' y 'signinRequest' son funciones asíncronas
const AuthContext = createContext();
const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within an AuthProvider");
    return context;
};

// 2. Componente de Botón (Shadcn/ui Style Adaptado)
const Button = ({ children, onClick, type = 'button', variant = 'default', className = '', disabled = false }) => {
    let baseClasses = 'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 shadow-sm';
    
    let variantClasses = '';
    
    switch (variant) {
        case 'primary':
            variantClasses = 'bg-blue-600 text-white hover:bg-blue-700 shadow-xl focus-visible:ring-blue-500';
            break;
        case 'link':
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
            disabled={disabled}
        >
            {children}
        </button>
    );
};

// 3. Función de Validación Manual (Reemplazando yup por necesidad del archivo único)
const validateRegistration = values => {
    const errors = {};
    if (!values.name) {
        errors.name = 'El nombre es requerido';
    }

    if (!values.email) {
        errors.email = 'El correo electrónico es requerido';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Dirección de correo inválida';
    }

    if (!values.password) {
        errors.password = 'La contraseña es requerida';
    } else if (values.password.length < 6) {
        errors.password = 'Debe tener al menos 6 caracteres';
    }

    if (!values.confirmPassword) {
        errors.confirmPassword = 'La confirmación es requerida';
    } else if (values.password !== values.confirmPassword) {
        errors.confirmPassword = 'Las contraseñas no coinciden';
    }

    return errors;
};


// 4. Componente principal del formulario
const Register = () => {
    // Definición de la URL de la imagen de fondo: Usando gradiente de color sólido por seguridad
    const backgroundStyle = {
        backgroundImage: 'linear-gradient(rgba(30, 58, 138, 0.7), rgba(15, 23, 42, 0.9))',
    };

    // Usando el hook de Auth (simulado) para acceder a la función signup y errores
    // NOTA: Para que este código funcione completamente en un entorno real,
    // se necesita el proveedor de contexto (AuthProvider) envolviendo el componente App
    // y las implementaciones reales de 'signupRequest'
    const { signup, errors: authErrors, loading } = {
        signup: async (userData) => { 
            console.log("Simulación de registro con Formik. Datos:", userData);
            // Simulación de éxito/error de la API
            await new Promise(resolve => setTimeout(resolve, 1000));
            if (userData.email === 'error@test.com') {
                throw new Error("El correo ya está registrado.");
            }
            setLocalSuccessMsg("¡Registro exitoso! Redirigiendo...");
            setLocalErrorMsg('');
        },
        errors: [], // Errores del contexto global (aunque usaremos el local para demo)
        loading: false
    };

    const [localSuccessMsg, setLocalSuccessMsg] = useState('');
    const [localErrorMsg, setLocalErrorMsg] = useState('');

    useEffect(() => {
        // Limpiar mensajes locales después de un tiempo
        if (localSuccessMsg || localErrorMsg) {
            const timer = setTimeout(() => {
                setLocalSuccessMsg('');
                setLocalErrorMsg('');
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [localSuccessMsg, localErrorMsg]);

    // Estilo de Input con colores azules en el focus
    const inputClasses = "flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 \
                         ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium \
                         placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 \
                         focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 \
                         dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:placeholder:text-gray-400";
                         
    // Estilo de Label consistente
    const labelClasses = "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1";

    // Estilo de error de Formik
    const errorClasses = "text-xs text-red-500 mt-1";

    const initialValues = {
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    };

    return (
        // Contenedor principal
        <div className="relative min-h-screen flex items-center justify-center font-sans p-4">
            
            {/* BLOQUE DE FONDO DE PANTALLA COMPLETA CON AZUL */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
                style={backgroundStyle}
            />
            {/* ------------------------------------------- */}

            {/* Contenedor del Formulario (Card Style Shadcn) */}
            <div className="w-full max-w-md p-6 sm:p-8 space-y-6 bg-white rounded-xl border border-gray-200 shadow-2xl dark:bg-gray-900 relative z-10">
                
                {/* Header Card */}
                <div className="text-center pb-4 border-b border-gray-100 dark:border-gray-700">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Crea tu Cuenta
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        Únete a la comunidad de Merca Emprende hoy.
                    </p>
                </div>

                {/* Mensajes de feedback */}
                {localSuccessMsg && (
                    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-md relative" role="alert">
                        <span className="block sm:inline">{localSuccessMsg}</span>
                    </div>
                )}
                {(localErrorMsg || authErrors.length > 0) && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md relative" role="alert">
                        <p className="font-bold">Error de Registro</p>
                        <span className="block sm:inline">{localErrorMsg || authErrors[0]}</span>
                    </div>
                )}

                
                <Formik
                    initialValues={initialValues}
                    validate={validateRegistration}
                    onSubmit={async (values, { setSubmitting }) => {
                        try {
                            setLocalSuccessMsg('');
                            setLocalErrorMsg('');
                            // Llamada a la función signup del AuthContext
                            await signup(values);
                            setSubmitting(false);
                        } catch (err) {
                            setLocalErrorMsg(err.message || "Fallo el registro.");
                            setSubmitting(false);
                        }
                    }}
                >
                    {({ handleSubmit, isSubmitting }) => (
                        <form className="space-y-4" onSubmit={handleSubmit}>
                            {/* Campo: Nombre Completo */}
                            <div>
                                <label htmlFor="name" className={labelClasses}>Nombre Completo</label>
                                <Field id="name" name="name" type="text" autoComplete="name" className={inputClasses} placeholder="Tu Nombre" />
                                <ErrorMessage name="name" component="div" className={errorClasses} />
                            </div>
                            
                            {/* Campo: Correo Electrónico */}
                            <div>
                                <label htmlFor="email" className={labelClasses}>Correo Electrónico</label>
                                <Field id="email" name="email" type="email" autoComplete="email" className={inputClasses} placeholder="tu@ejemplo.com" />
                                <ErrorMessage name="email" component="div" className={errorClasses} />
                            </div>
                            
                            {/* Campo: Contraseña */}
                            <div>
                                <label htmlFor="password" className={labelClasses}>Contraseña</label>
                                <Field id="password" name="password" type="password" autoComplete="new-password" className={inputClasses} placeholder="••••••••" />
                                <ErrorMessage name="password" component="div" className={errorClasses} />
                            </div>
                            
                            {/* Campo: Confirmar Contraseña */}
                            <div>
                                <label htmlFor="confirmPassword" className={labelClasses}>Confirmar Contraseña</label>
                                <Field id="confirmPassword" name="confirmPassword" type="password" autoComplete="new-password" className={inputClasses} placeholder="••••••••" />
                                <ErrorMessage name="confirmPassword" component="div" className={errorClasses} />
                            </div>
                            
                            {/* Botón de Registro (Footer Card) */}
                            <div className="pt-2">
                                <Button
                                    type="submit"
                                    variant="primary"
                                    className="w-full h-11 text-base shadow-xl bg-blue-600 hover:bg-blue-700"
                                    disabled={isSubmitting || loading}
                                >
                                    {isSubmitting || loading ? 'Registrando...' : 'Registrarse'}
                                </Button>
                            </div>
                        </form>
                    )}
                </Formik>
                
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

export const signupRequest = async (user) => {
  return axios.post(`/auth/signup`, user);
};

export default Register;