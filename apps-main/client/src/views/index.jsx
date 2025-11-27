// LandingPage.jsx
import React, { useState, useEffect } from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from '@/components/ui/navigation-menu';
import pageContent from '@/data/pageContent.json';

const LandingPage = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('register');
  const [entrepreneurView, setEntrepreneurView] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#0F172A] text-[#F8FAFF]">
      {/* Header */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#0F172A]/95 backdrop-blur-md border-b border-[#1E3A8A]/50 py-2' 
          : 'bg-transparent py-4'
      }`}>
        <div className="container mx-auto px-4 flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <img 
              src="/assets/logo.png" 
              alt="Merca Emprende" 
              className="h-8 w-auto"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://placehold.co/120x32/1E3A8A/00E5FF?text=MERCA+EMPREnde";
              }}
            />
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent text-[#F8FAFF] hover:text-[#00E5FF]">
                    Servicios
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      {pageContent.sections.map((section) => (
                        <li key={section.id}>
                          <NavigationMenuLink asChild>
                            <a
                              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-[#1E3A8A] hover:text-[#00E5FF]"
                              href={`#${section.id}`}
                            >
                              <div className="text-sm font-medium leading-none">
                                {section.title}
                              </div>
                              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                {section.desc}
                              </p>
                            </a>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            
            <a href="#features" className="text-[#F8FAFF] hover:text-[#00E5FF] transition-colors font-medium">
              Características
            </a>
            <a href="#testimonials" className="text-[#F8FAFF] hover:text-[#00E5FF] transition-colors font-medium">
              Testimonios
            </a>
          </nav>

          {/* CTA Buttons */}
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              className="text-[#F8FAFF] hover:text-[#00E5FF] hover:bg-[#1E3A8A]/50"
              onClick={() => {
                setModalType('login');
                setIsModalOpen(true);
              }}
            >
              Iniciar Sesión
            </Button>
            <a href="/register"
              className="bg-gradient-to-r from-[#3B82F6] to-[#00E5FF] hover:from-[#2563EB] hover:to-[#00B8D4] text-white shadow-lg shadow-[#00E5FF]/20 border-0 px-6 py-2 rounded-full font-medium transition-all duration-300 hover:shadow-[#00E5FF]/30"
            >
              Registrarse
            </a>
          </div>
        </div>
      </header>

      {/* Hero Carousel */}
      <section className="relative h-screen min-h-[80vh] overflow-hidden">
        <Carousel className="h-full w-full">
          <CarouselContent>
            {pageContent.heroSlides.map((slide, index) => (
              <CarouselItem key={slide.id} className="h-screen min-h-[80vh]">
                <div className="relative h-full w-full flex items-center justify-center">
                  {/* Background Image with Gradient Overlay */}
                  <div 
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{
                      backgroundImage: `linear-gradient(180deg, rgba(30,58,138,0.85) 0%, rgba(15,23,42,0.95) 100%), url('${slide.image}')`
                    }}
                  />
                  
                  {/* Neon Shapes */}
                  <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#00E5FF] rounded-full opacity-10 blur-3xl"></div>
                    <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#3B82F6] rounded-full opacity-10 blur-3xl"></div>
                  </div>

                  {/* Content */}
                  <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
                    <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
                      {slide.title}
                    </h1>
                    <p className="text-xl md:text-2xl text-[#F8FAFF]/90 mb-8 max-w-2xl mx-auto">
                      {slide.subtitle}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Button 
                        size="lg"
                        className="bg-gradient-to-r from-[#3B82F6] to-[#00E5FF] hover:from-[#2563EB] hover:to-[#00B8D4] text-white text-lg px-8 py-6 shadow-lg shadow-[#00E5FF]/30"
                      >
                        {slide.ctaPrimary.label}
                      </Button>
                      <Button 
                        variant="outline" 
                        size="lg"
                        className="border-[#00E5FF] text-[#00E5FF] hover:bg-[#00E5FF] hover:text-[#0F172A] text-lg px-8 py-6"
                      >
                        {slide.ctaSecondary.label}
                      </Button>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-4 text-[#00E5FF] border-[#00E5FF] hover:bg-[#00E5FF] hover:text-[#0F172A]" />
          <CarouselNext className="right-4 text-[#00E5FF] border-[#00E5FF] hover:bg-[#00E5FF] hover:text-[#0F172A]" />
        </Carousel>
      </section>

      {/* Main Content Sections */}
      <main>
        {/* Inventariado Section */}
        <section id="inventariado" className="py-20 bg-[#0F172A]">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[#3B82F6] to-[#00E5FF] bg-clip-text text-transparent">
                Inventariado
              </h2>
              <p className="text-xl text-[#F8FAFF]/80 max-w-2xl mx-auto">
                Controla y optimiza tu inventario con herramientas inteligentes
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {pageContent.sections.find(s => s.id === 'inventariado')?.items.map((item, index) => (
                <Card key={index} className="bg-[#1E293B] border-[#334155] hover:border-[#00E5FF] transition-all duration-300 hover:scale-105 group">
                  <CardHeader>
                    <CardTitle className="text-[#00E5FF] group-hover:text-[#60A5FA] transition-colors">
                      {item.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-[#F8FAFF]/80">
                      {item.desc}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Sistema Inventariado */}
        <section id="sistema-inventariado" className="py-20 bg-gradient-to-br from-[#1E3A8A] to-[#0F172A]">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  Sistema <span className="text-[#00E5FF]">Inventariado</span>
                </h2>
                <p className="text-xl text-[#F8FAFF]/80 mb-8">
                  Sistema integral para gestionar productos, lotes y movimientos de inventario de manera eficiente.
                </p>
                <div className="space-y-4">
                  {['Control en tiempo real', 'Reportes automáticos', 'Alertas de stock', 'Análisis de rotación'].map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-[#00E5FF] rounded-full"></div>
                      <span className="text-lg">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative">
                <img 
                  src="/assets/system.jpg" 
                  alt="Sistema Inventariado"
                  className="rounded-lg shadow-2xl shadow-[#00E5FF]/20"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://placehold.co/600x400/1E3A8A/00E5FF?text=Sistema+Inventariado";
                  }}
                />
                <div className="absolute -inset-4 bg-gradient-to-r from-[#00E5FF] to-[#3B82F6] rounded-lg opacity-20 blur-xl -z-10"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Marketplace Section */}
        <section id="marketplace" className="py-20 bg-[#0F172A]">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[#3B82F6] to-[#00E5FF] bg-clip-text text-transparent">
                Marketplace
              </h2>
              <p className="text-xl text-[#F8FAFF]/80 mb-8">
                Tu vitrina digital para llegar a más clientes
              </p>
              
              {/* Entrepreneur Toggle */}
              <div className="flex justify-center mb-8">
                <div className="bg-[#1E293B] rounded-lg p-1 flex">
                  <button
                    onClick={() => setEntrepreneurView(false)}
                    className={`px-6 py-2 rounded-md transition-all ${
                      !entrepreneurView 
                        ? 'bg-[#00E5FF] text-[#0F172A] shadow-lg shadow-[#00E5FF]/30' 
                        : 'text-[#F8FAFF] hover:text-[#00E5FF]'
                    }`}
                  >
                    Vista Cliente
                  </button>
                  <button
                    onClick={() => setEntrepreneurView(true)}
                    className={`px-6 py-2 rounded-md transition-all ${
                      entrepreneurView 
                        ? 'bg-[#00E5FF] text-[#0F172A] shadow-lg shadow-[#00E5FF]/30' 
                        : 'text-[#F8FAFF] hover:text-[#00E5FF]'
                    }`}
                  >
                    Vista Emprendedor
                  </button>
                </div>
              </div>
            </div>

            {entrepreneurView ? (
              /* Entrepreneur View */
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-3xl font-bold mb-4 text-[#00E5FF]">
                    Panel de Emprendedor
                  </h3>
                  <p className="text-lg text-[#F8FAFF]/80 mb-6">
                    Gestiona tus productos, ventas y analítica desde un solo lugar.
                  </p>
                  <div className="space-y-4">
                    {['Dashboard de ventas', 'Gestión de productos', 'Estadísticas en tiempo real', 'Herramientas de marketing'].map((feature, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-[#00E5FF] rounded-full"></div>
                        <span className="text-lg">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <Button className="mt-6 bg-gradient-to-r from-[#3B82F6] to-[#00E5FF] hover:from-[#2563EB] hover:to-[#00B8D4]">
                    Acceder al Dashboard
                  </Button>
                </div>
                <div className="relative">
                  <img 
                    src="/assets/entrepreneur-dashboard.jpg" 
                    alt="Dashboard Emprendedor"
                    className="rounded-lg shadow-2xl"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://placehold.co/600x400/1E3A8A/00E5FF?text=Dashboard+Emprendedor";
                    }}
                  />
                </div>
              </div>
            ) : (
              /* Public Marketing View */
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div className="relative">
                  <img 
                    src="/assets/marketplace.jpg" 
                    alt="Marketplace"
                    className="rounded-lg shadow-2xl"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://placehold.co/600x400/1E3A8A/00E5FF?text=Marketplace";
                    }}
                  />
                </div>
                <div>
                  <h3 className="text-3xl font-bold mb-4">
                    Descubre Productos Únicos
                  </h3>
                  <p className="text-lg text-[#F8FAFF]/80 mb-6">
                    Explora una amplia variedad de productos de emprendedores venezolanos. 
                    Encuentra artículos únicos y apoya el comercio local.
                  </p>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    {['Productos Artesanales', 'Tecnología', 'Moda', 'Hogar'].map((category, index) => (
                      <div key={index} className="text-center p-4 bg-[#1E293B] rounded-lg hover:bg-[#00E5FF]/10 transition-colors">
                        <span className="text-[#00E5FF] font-medium">{category}</span>
                      </div>
                    ))}
                  </div>
                  <Button className="bg-gradient-to-r from-[#3B82F6] to-[#00E5FF] hover:from-[#2563EB] hover:to-[#00B8D4]">
                    Explorar Marketplace
                  </Button>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* 4 Special Topics Band */}
        <section className="py-20 bg-gradient-to-r from-[#1E3A8A] to-[#0F172A]">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Finanzas Card */}
              <Card className="bg-[#1E293B]/50 backdrop-blur-sm border-[#334155] hover:border-[#00E5FF] hover:shadow-2xl hover:shadow-[#00E5FF]/20 transition-all duration-300 group">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-br from-[#3B82F6] to-[#00E5FF] rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <span className="text-2xl">💰</span>
                  </div>
                  <CardTitle className="text-[#00E5FF]">Finanzas</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-[#F8FAFF]/80 mb-4">
                    Calculadoras financieras, opciones de financiamiento y gestión de micocréditos.
                  </CardDescription>
                  <Button variant="outline" className="w-full border-[#00E5FF] text-[#00E5FF] hover:bg-[#00E5FF] hover:text-[#0F172A]">
                    Ver Herramientas
                  </Button>
                </CardContent>
              </Card>

              {/* Formación Card */}
              <Card className="bg-[#1E293B]/50 backdrop-blur-sm border-[#334155] hover:border-[#00E5FF] hover:shadow-2xl hover:shadow-[#00E5FF]/20 transition-all duration-300 group">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-br from-[#3B82F6] to-[#00E5FF] rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <span className="text-2xl">🎓</span>
                  </div>
                  <CardTitle className="text-[#00E5FF]">Formación</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-[#F8FAFF]/80 mb-4">
                    Cursos, diplomados y talleres para desarrollar tus habilidades empresariales.
                  </CardDescription>
                  <Button variant="outline" className="w-full border-[#00E5FF] text-[#00E5FF] hover:bg-[#00E5FF] hover:text-[#0F172A]">
                    Ver Cursos
                  </Button>
                </CardContent>
              </Card>

              {/* Formalización Card */}
              <Card className="bg-[#1E293B]/50 backdrop-blur-sm border-[#334155] hover:border-[#00E5FF] hover:shadow-2xl hover:shadow-[#00E5FF]/20 transition-all duration-300 group">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-br from-[#3B82F6] to-[#00E5FF] rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <span className="text-2xl">📋</span>
                  </div>
                  <CardTitle className="text-[#00E5FF]">Formalización</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-[#F8FAFF]/80 mb-4">
                    Asesoría legal y documentos para formalizar tu emprendimiento correctamente.
                  </CardDescription>
                  <Button variant="outline" className="w-full border-[#00E5FF] text-[#00E5FF] hover:bg-[#00E5FF] hover:text-[#0F172A]">
                    Comenzar
                  </Button>
                </CardContent>
              </Card>

              {/* Ferias Card */}
              <Card className="bg-[#1E293B]/50 backdrop-blur-sm border-[#334155] hover:border-[#00E5FF] hover:shadow-2xl hover:shadow-[#00E5FF]/20 transition-all duration-300 group">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-br from-[#3B82F6] to-[#00E5FF] rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <span className="text-2xl">🎪</span>
                  </div>
                  <CardTitle className="text-[#00E5FF]">Ferias</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-[#F8FAFF]/80 mb-4">
                    Eventos y ferias para exhibir tus productos y conectar con clientes.
                  </CardDescription>
                  <Button variant="outline" className="w-full border-[#00E5FF] text-[#00E5FF] hover:bg-[#00E5FF] hover:text-[#0F172A]">
                    Ver Eventos
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#0A0F1C] py-12 border-t border-[#1E3A8A]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <img 
                src="/assets/logo.png" 
                alt="Merca Emprende" 
                className="h-8 w-auto mb-4"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://placehold.co/120x32/1E3A8A/00E5FF?text=MERCA+EMPREnde";
                }}
              />
              <p className="text-[#F8FAFF]/60">
                Impulsando emprendedores venezolanos hacia el éxito.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-[#00E5FF]">Servicios</h4>
              <ul className="space-y-2 text-[#F8FAFF]/60">
                <li><a href="#inventariado" className="hover:text-[#00E5FF] transition-colors">Inventariado</a></li>
                <li><a href="#marketplace" className="hover:text-[#00E5FF] transition-colors">Marketplace</a></li>
                <li><a href="#formacion" className="hover:text-[#00E5FF] transition-colors">Formación</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-[#00E5FF]">Recursos</h4>
              <ul className="space-y-2 text-[#F8FAFF]/60">
                <li><a href="#" className="hover:text-[#00E5FF] transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-[#00E5FF] transition-colors">Documentación</a></li>
                <li><a href="#" className="hover:text-[#00E5FF] transition-colors">Soporte</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-[#00E5FF]">Legal</h4>
              <ul className="space-y-2 text-[#F8FAFF]/60">
                <li><a href="#" className="hover:text-[#00E5FF] transition-colors">Términos</a></li>
                <li><a href="#" className="hover:text-[#00E5FF] transition-colors">Privacidad</a></li>
                <li><a href="#" className="hover:text-[#00E5FF] transition-colors">Cookies</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-[#1E3A8A] mt-8 pt-8 text-center text-[#F8FAFF]/60">
            <p>&copy; {new Date().getFullYear()} Merca Emprende. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>

      {/* Auth Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="bg-[#1E293B] border-[#334155] text-[#F8FAFF]">
          <DialogHeader>
            <DialogTitle className="text-2xl text-[#00E5FF]">
              {modalType === 'register' ? 'Crear Cuenta' : 'Iniciar Sesión'}
            </DialogTitle>
            <DialogDescription className="text-[#F8FAFF]/80">
              {modalType === 'register' 
                ? 'Únete a Merca Emprende y comienza a hacer crecer tu negocio.' 
                : 'Accede a tu cuenta para gestionar tu emprendimiento.'}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input 
                type="email" 
                className="w-full px-3 py-2 bg-[#0F172A] border border-[#334155] rounded-md focus:outline-none focus:ring-2 focus:ring-[#00E5FF] focus:border-transparent"
                placeholder="tu@email.com"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Contraseña</label>
              <input 
                type="password" 
                className="w-full px-3 py-2 bg-[#0F172A] border border-[#334155] rounded-md focus:outline-none focus:ring-2 focus:ring-[#00E5FF] focus:border-transparent"
                placeholder="••••••••"
              />
            </div>
            
            {modalType === 'register' && (
              <div>
                <label className="block text-sm font-medium mb-2">Confirmar Contraseña</label>
                <input 
                  type="password" 
                  className="w-full px-3 py-2 bg-[#0F172A] border border-[#334155] rounded-md focus:outline-none focus:ring-2 focus:ring-[#00E5FF] focus:border-transparent"
                  placeholder="••••••••"
                />
              </div>
            )}
            
            <Button className="w-full bg-gradient-to-r from-[#3B82F6] to-[#00E5FF] hover:from-[#2563EB] hover:to-[#00B8D4]">
              {modalType === 'register' ? 'Registrarse' : 'Iniciar Sesión'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LandingPage;