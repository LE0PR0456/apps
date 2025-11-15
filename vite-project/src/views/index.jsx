import React, { useState } from 'react';

// --- Assets ficticios (simulando rutas de un proyecto real) ---
const LOGO_IMAGE_PATH = '../src/assets/img/marca.png'; 
const BACKGROUND_IMAGE_PATH = '../src/assets/img/fondo.png'; 

// --- Componente de Botón (Shadcn/ui Style) ---
const Button = ({ children, onClick, variant = 'default', className = '' }) => {
    let baseClasses = 'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 shadow-md';
    
    let variantClasses = '';
    
    switch (variant) {
        case 'primary':
            // CTA principal - Azul principal
            variantClasses = 'bg-blue-600 text-white hover:bg-blue-700 ring-4 ring-blue-300 ring-opacity-50 text-lg px-8 py-3';
            break;
        case 'secondary':
            // Botón secundario - Azul más oscuro
            variantClasses = 'bg-blue-800 text-white hover:bg-blue-900 shadow-lg';
            break;
        case 'ghost':
            // Enlace estilo ghost - Azul claro
            variantClasses = 'text-blue-100 hover:bg-blue-700/50';
            break;
        default:
            variantClasses = 'bg-gray-700 text-white hover:bg-gray-800';
    }

    return (
        <button
            onClick={onClick}
            className={`${baseClasses} ${variantClasses} ${className}`}
        >
            {children}
        </button>
    );
};

// --- Componente Modal / Diálogo (Shadcn/ui Style) ---
const Dialog = ({ isVisible, message, onClose }) => {
    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 transition-opacity duration-300">
            <div 
                className="bg-white p-6 rounded-lg border shadow-2xl max-w-sm w-full text-center 
                           transform scale-100 opacity-100 animate-in fade-in-90 zoom-in-90"
            >
                <h3 className="text-xl font-bold text-gray-800 mb-2">Acción Requerida</h3>
                <p className="text-gray-600 mb-6">{message}</p>
                
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

const LandingPageTailwind = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    const handleCtaClick = () => {
        setModalMessage('Has iniciado el proceso. Redireccionando a la página de inicio.');
        setIsModalVisible(true);
    };

    const handleCloseModal = () => {
        setIsModalVisible(false);
    };

    // --- Componente de Cabecera (Header) ---
    const Header = () => (
        <header className="bg-blue-700/90 backdrop-blur-sm p-4 relative z-20 shadow-lg border-b border-blue-800"> 
            <nav className="container mx-auto flex justify-between items-center">
                
                {/* Logo */}
                <div className="flex items-center space-x-2">
                    <img 
                        src={LOGO_IMAGE_PATH} 
                        alt="Logo Merca Emprende" 
                        className="h-8 w-auto object-contain rounded-sm" 
                        onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/100x32/1E40AF/white?text=MERCA" }}
                    />
                </div>

                {/* Botones de Acción */}
                <div className='flex items-center space-x-3'>
                    <a 
                        href="/login" 
                        className="text-white text-sm font-semibold hover:opacity-80 px-2 py-1 transition duration-150"
                    >
                        Iniciar Sesión
                    </a>
                    
                    <Button 
                        onClick={() => setModalMessage('Inicia tu registro. ¡Bienvenido!') & setIsModalVisible(true)}
                        variant="secondary"
                        className="text-sm"
                    >
                        Registrarse
                    </Button>
                </div>
            </nav>
        </header>
    );

    // --- Componente de Contenido Principal (Main/Hero) ---
    const MainContent = () => (
        <main className="flex-grow bg-transparent relative z-20 flex items-center justify-center"> 
            <div className="container mx-auto px-6 text-center flex flex-col items-center justify-center py-20"> 
                
                {/* Títulos */}
                <h2 className="text-6xl font-extrabold text-white mb-4 shadow-text-xl tracking-tight leading-tight max-w-4xl">
                    Impulsa tu Negocio con Merca <span className="text-blue-300">Emprende</span>
                </h2>
                
                <p className="text-xl text-gray-200 mb-10 max-w-2xl mx-auto shadow-text-md">
                    Descubre herramientas, conéctate con socios y haz crecer tu marca de manera exponencial.
                </p>
                
                {/* Botón CTA principal */}
                <Button 
                    onClick={handleCtaClick}
                    variant="primary"
                    className="transform hover:scale-[1.02] transition duration-300"
                >
                    ¡Comenzar Ahora!
                </Button>
            </div>
        </main>
    );

    // --- Componente de Pie de Página (Footer) ---
    const Footer = () => (
        <footer className="bg-gray-900 text-white p-6 relative z-20 shadow-inner border-t border-gray-800">
            <div className="container mx-auto text-center">
                <p className="text-sm text-gray-400">
                    &copy; {new Date().getFullYear()} Merca Emprende. Derechos Reservados.
                </p>
                <div className="mt-2 text-xs text-gray-500 space-x-4">
                    <a href="/privacidad" className="hover:text-gray-300 transition">Política de Privacidad</a>
                    <a href="/terminos" className="hover:text-gray-300 transition">Términos de Servicio</a>
                </div>
            </div>
        </footer>
    );
    
    return (
        <div className="font-sans flex flex-col min-h-screen relative bg-gray-50">
            
            {/* FONDO CON NUEVA PALETA AZUL */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat z-10"
                style={{ 
                    backgroundImage: `linear-gradient(to bottom, rgba(30, 58, 138, 0.7) 0%, rgba(15, 23, 42, 0.9) 100%), url('${BACKGROUND_IMAGE_PATH}')`,
                }}
                onError={() => console.log("Error al cargar la imagen de fondo")}
            >
            </div>

            {/* Contenido */}
            <div className="flex flex-col min-h-screen relative z-20">
                <Header />
                <MainContent />
                <Footer />
            </div>

            {/* Modal */}
            <Dialog 
                isVisible={isModalVisible} 
                message={modalMessage} 
                onClose={handleCloseModal} 
            />
            
            {/* Estilos CSS para la sombra de texto */}
            <style jsx="true">{`
                .shadow-text-xl {
                    text-shadow: 3px 3px 6px rgba(0, 0, 0, 0.9);
                }
                .shadow-text-md {
                    text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.8);
                }
            `}</style>
        </div>
    );
};

export default LandingPageTailwind;