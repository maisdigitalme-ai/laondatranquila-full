'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { SocialProofCompact } from './SocialProof';
import Image from 'next/image';

export default function LoginClient() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Credenciales incorrectas');
        return;
      }

      router.push('/dashboard');
    } catch {
      setError('Error al conectar. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#1C2630' }}>
      {/* Hero Banner */}
      <div
        className="relative w-full h-64 md:h-80 overflow-hidden"
        style={{
          backgroundImage: `url('https://d2xsxph8kpxj0f.cloudfront.net/310519663569528159/JCTqQGJs24eXyavTAzvSY7/onda-tranquila-hero-banner-6YtjwXpofYRFbKco2fPMQS.webp')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Overlay gradient */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(28,38,48,0.3), rgba(28,38,48,0.8))' }} />
        
        {/* Logo and Title */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <div className="mb-4">
            <h1
              className="text-5xl md:text-6xl font-bold mb-2"
              style={{ fontFamily: 'var(--font-playfair)', color: 'white', textShadow: '0 4px 20px rgba(0,0,0,0.5)' }}
            >
              La Onda Tranquila
            </h1>
            <p className="text-sm md:text-base tracking-widest uppercase" style={{ color: '#E8D5C4' }}>
              Calma, Paz y Bienestar para Niños
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Left: Illustration */}
        <div className="hidden md:flex md:w-1/2 items-center justify-center p-8" style={{ background: 'linear-gradient(135deg, #1C2630 0%, #2A3139 100%)' }}>
          <div className="relative w-full max-w-md h-96">
            <img
              src="/manus-storage/IMG_16548_f8f1c3e0.png"
              alt="La Onda Tranquila Logo"
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Right: Login Form */}
        <div className="w-full md:w-1/2 flex flex-col items-center justify-center px-6 py-12">
          <div className="w-full max-w-sm">
            {/* Form Header */}
            <div className="text-center mb-8">
              <h2
                className="text-3xl font-bold mb-2"
                style={{ fontFamily: 'var(--font-playfair)', color: 'white' }}
              >
                Inicia Sesión
              </h2>
              <p className="text-sm" style={{ color: '#999' }}>
                Accede a tu área de membresía
              </p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email Input */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#E8D5C4' }}>
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@email.com"
                  className="w-full px-4 py-3 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2"
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(153,161,120,0.3)',
                    focusRing: '2px solid rgba(153,161,120,0.5)',
                  }}
                  required
                />
              </div>

              {/* Password Input */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#E8D5C4' }}>
                  Contraseña
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••"
                    className="w-full px-4 py-3 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2"
                    style={{
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(153,161,120,0.3)',
                    }}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm"
                    style={{ color: '#99A178' }}
                  >
                    {showPassword ? 'Ocultar' : 'Ver'}
                  </button>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div
                  className="text-sm px-4 py-3 rounded-lg"
                  style={{ background: 'rgba(230,100,100,0.1)', border: '1px solid rgba(230,100,100,0.3)', color: '#FF6B6B' }}
                >
                  {error}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-lg font-semibold text-white transition-all duration-300 hover:opacity-90 disabled:opacity-50"
                style={{
                  background: 'linear-gradient(135deg, #99A178 0%, #7A8A5E 100%)',
                  cursor: loading ? 'not-allowed' : 'pointer',
                }}
              >
                {loading ? 'Cargando...' : 'Acceder'}
              </button>
            </form>

            {/* Divider */}
            <div className="my-6 flex items-center">
              <div className="flex-1" style={{ borderTop: '1px solid rgba(153,161,120,0.2)' }} />
              <span className="px-3 text-xs" style={{ color: '#666' }}>O</span>
              <div className="flex-1" style={{ borderTop: '1px solid rgba(153,161,120,0.2)' }} />
            </div>

            {/* Sign Up Link */}
            <p className="text-center text-sm" style={{ color: '#999' }}>
              ¿No tienes cuenta?{' '}
              <a href="#" className="font-semibold hover:underline" style={{ color: '#99A178' }}>
                Regístrate aquí
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Social Proof Section */}
      <div className="w-full px-6 py-12" style={{ background: 'rgba(42,49,57,0.5)' }}>
        <div className="max-w-6xl mx-auto">
          <h3 className="text-center text-lg font-semibold mb-8" style={{ color: '#E8D5C4' }}>
            ✨ Padres que ya confían en La Onda Tranquila
          </h3>
          <SocialProofCompact />
        </div>
      </div>

      {/* Footer */}
      <div className="w-full px-6 py-6 text-center text-xs" style={{ background: '#0F1419', color: '#666' }}>
        <p>© 2025 La Onda Tranquila. Todos los derechos reservados.</p>
      </div>
    </div>
  );
}
