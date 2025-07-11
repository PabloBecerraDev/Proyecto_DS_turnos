import React, { useState } from 'react';
import { Clock, Users, Smartphone, CheckCircle, Star, ArrowRight, Phone, Mail, MapPin } from 'lucide-react';
import Navbar from '../../components/navbar/navbar';


const VirtualQueueLanding = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e:any) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <>
    <Navbar />
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative container mx-auto px-6 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-6 py-2 mb-8">
              <Clock className="w-5 h-5 mr-2" />
              <span className="text-sm font-medium">Sistema de Turnos Inteligente</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
              Elimina las Filas
              <br />
              <span className="text-yellow-300">Para Siempre</span>
            </h1>
            
            <p className="text-xl md:text-2xl mb-10 text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Revoluciona la experiencia de tus clientes con nuestro sistema de turnos virtuales. 
              Gestión inteligente, tiempo real y máxima eficiencia.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-purple-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-xl flex items-center justify-center">
                Comenzar Gratis
                <ArrowRight className="ml-2 w-5 h-5" />
              </button>
              
            </div>
          </div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-yellow-300/20 rounded-full blur-xl animate-pulse delay-1000"></div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              ¿Por qué elegir nuestro sistema?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Optimiza tu negocio con tecnología de vanguardia y mejora la satisfacción del cliente
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="group p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Smartphone className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">100% Digital</h3>
              <p className="text-gray-600 leading-relaxed">
                Tus clientes reservan turnos desde cualquier dispositivo, en cualquier momento y lugar.
              </p>
            </div>

            <div className="group p-8 rounded-2xl bg-gradient-to-br from-purple-50 to-purple-100 hover:from-purple-100 hover:to-purple-200 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Gestión Inteligente</h3>
              <p className="text-gray-600 leading-relaxed">
                Algoritmos avanzados que optimizan los tiempos de espera y maximizan la eficiencia.
              </p>
            </div>

            <div className="group p-8 rounded-2xl bg-gradient-to-br from-green-50 to-green-100 hover:from-green-100 hover:to-green-200 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Tiempo Real</h3>
              <p className="text-gray-600 leading-relaxed">
                Notificaciones instantáneas y seguimiento en vivo del estado de cada turno.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-r from-gray-50 to-gray-100">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-800 mb-8">
                Transforma tu negocio hoy
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Reduce tiempos de espera hasta 70%</h3>
                    <p className="text-gray-600">Los clientes conocen su posición exacta y tiempo estimado de atención.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Aumenta la satisfacción del cliente</h3>
                    <p className="text-gray-600">Experiencia sin estrés que mejora la percepción de tu marca.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Optimiza recursos y personal</h3>
                    <p className="text-gray-600">Análisis detallados para mejorar la eficiencia operacional.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white rounded-3xl p-8 shadow-2xl">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-gray-800">Dashboard en Vivo</h3>
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
                    <span className="font-semibold text-gray-700">Clientes en cola</span>
                    <span className="text-2xl font-bold text-blue-600">12</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
                    <span className="font-semibold text-gray-700">Tiempo promedio</span>
                    <span className="text-2xl font-bold text-green-600">8 min</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-purple-50 rounded-lg">
                    <span className="font-semibold text-gray-700">Atendidos hoy</span>
                    <span className="text-2xl font-bold text-purple-600">156</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Lo que dicen nuestros clientes
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-6 italic">
                "Increíble cómo cambió la experiencia de nuestros pacientes. Ya no hay aglomeraciones en la sala de espera."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                  M
                </div>
                <div className="ml-4">
                  <p className="font-semibold text-gray-800">Dr. María González</p>
                  <p className="text-sm text-gray-600">Clínica Dental</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-2xl">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-6 italic">
                "Nuestros clientes están más felices y nosotros somos más eficientes. Una inversión que vale la pena."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                  J
                </div>
                <div className="ml-4">
                  <p className="font-semibold text-gray-800">Juan Pérez</p>
                  <p className="text-sm text-gray-600">Banco Central</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-2xl">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-6 italic">
                "Fácil de implementar y los resultados se vieron inmediatamente. Recomendado 100%."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold">
                  A
                </div>
                <div className="ml-4">
                  <p className="font-semibold text-gray-800">Ana López</p>
                  <p className="text-sm text-gray-600">Farmacia Plus</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            ¿Listo para comenzar?
          </h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto text-blue-100">
            Únete a cientos de empresas que ya transformaron su atención al cliente
          </p>
          
          <div className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Tu email corporativo"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-6 py-4 rounded-full text-gray-800 focus:outline-none focus:ring-4 focus:ring-white/30"
              />
              <button
                onClick={handleSubmit}
                className="bg-white text-purple-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-300"
              >
                {isSubmitted ? '¡Enviado!' : 'Empezar'}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                TurnoVirtual
              </h3>
              <p className="text-gray-400">
                Revolucionando la gestión de turnos con tecnología inteligente.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Producto</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Características</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Precios</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Demo</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Empresa</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Sobre nosotros</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contacto</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Contacto</h4>
              <div className="space-y-2 text-gray-400">
                <div className="flex items-center">
                  <Phone className="w-4 h-4 mr-2" />
                  <span>+57 300 123 4567</span>
                </div>
                <div className="flex items-center">
                  <Mail className="w-4 h-4 mr-2" />
                  <span>info@turnovirtual.com</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span>Cali, Colombia</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Q Manager. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
    </>
  );
};

export default VirtualQueueLanding;