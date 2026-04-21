'use client';

import { useState, useEffect, useRef } from 'react';

// ═══════════════════════════════════════════════════
// CONTADOR CONSISTENTE — mesmo número em todas as páginas
// Base: 2340 pais em 21/04/2026, sobe 2-5 por dia (determinístico)
// ═══════════════════════════════════════════════════
function getMemberCount(): number {
  const baseDate = new Date('2026-04-21');
  const today = new Date();
  const diffDays = Math.floor((today.getTime() - baseDate.getTime()) / (1000 * 60 * 60 * 24));
  
  let count = 2340;
  for (let i = 0; i < Math.max(0, diffDays); i++) {
    // Pseudo-random determinístico baseado no dia
    const seed = (i * 11 + 17) % 19;
    count += (seed % 4) + 2; // 2, 3, 4 ou 5 por dia
  }
  return count;
}

// ═══════════════════════════════════════════════════
// DEPOIMENTOS DE PAIS
// ═══════════════════════════════════════════════════
const testimonials = [
  {
    name: 'María G.',
    location: 'Madrid, España',
    avatar: '👩🏻',
    text: 'Mi hijo cambió completamente. Ahora duerme mejor, está más tranquilo en la escuela y sus maestros notaron la diferencia. ¡Gracias La Onda Tranquila!',
    rating: 5,
    time: 'hace 3 días',
  },
  {
    name: 'Laura M.',
    location: 'Buenos Aires, Argentina',
    avatar: '👩🏽',
    text: 'Como madre de dos niños, esto fue lo mejor que encontré. Los audios son mágicos, mi hija los pide cada noche antes de dormir.',
    rating: 5,
    time: 'hace 1 semana',
  },
  {
    name: 'Carmen L.',
    location: 'Bogotá, Colombia',
    avatar: '👩🏾',
    text: 'Mi hijo tenía ansiedad y no sabía cómo ayudarlo. Con La Onda Tranquila veo resultados reales. Es increíble lo que la neuroacústica puede hacer.',
    rating: 5,
    time: 'hace 5 días',
  },
  {
    name: 'Sofía R.',
    location: 'Santiago, Chile',
    avatar: '👩🏻‍🦱',
    text: 'Recomiendo esto a todas mis amigas. Mis hijos están más enfocados, menos irritables y duermen profundamente. Vale cada peso.',
    rating: 5,
    time: 'hace 2 semanas',
  },
  {
    name: 'Patricia V.',
    location: 'Lima, Perú',
    avatar: '👩🏽‍🦱',
    text: 'Como psicóloga, entiendo la ciencia detrás. Los audios de La Onda Tranquila son profesionales y realmente efectivos para calmar a los niños.',
    rating: 5,
    time: 'hace 4 días',
  },
  {
    name: 'Gabriela S.',
    location: 'CDMX, México',
    avatar: '👩🏻‍🦰',
    text: 'Pensé que era solo música relajante, pero es mucho más. Mi hijo tiene TDAH y estos audios lo ayudan a concentrarse. Milagro puro.',
    rating: 5,
    time: 'hace 1 semana',
  },
  {
    name: 'Daniela F.',
    location: 'Medellín, Colombia',
    avatar: '👩🏾‍🦱',
    text: 'Después de probar todo, La Onda Tranquila fue lo que funcionó. Mi hija ahora tiene rutinas de calma y está mucho más feliz.',
    rating: 5,
    time: 'hace 6 días',
  },
  {
    name: 'Alejandra T.',
    location: 'Quito, Ecuador',
    avatar: '👩🏻',
    text: 'Los audios son hermosos, la app es intuitiva y el soporte es excelente. Realmente se nota que fue hecho con amor por padres que entienden.',
    rating: 5,
    time: 'hace 3 semanas',
  },
  {
    name: 'Valentina C.',
    location: 'Caracas, Venezuela',
    avatar: '👩🏽',
    text: 'Mi hijo duerme 8 horas de corrido por primera vez en años. La Onda Tranquila cambió nuestra vida familiar. Gracias infinitas.',
    rating: 5,
    time: 'hace 10 días',
  },
  {
    name: 'Roxana P.',
    location: 'Asunción, Paraguay',
    avatar: '👩🏻‍🦳',
    text: 'Como abuela, recomiendo esto a todos mis hijos. Es la mejor inversión que he hecho para la salud emocional de mis nietos.',
    rating: 5,
    time: 'hace 2 días',
  },
  {
    name: 'Julieta H.',
    location: 'Panamá City, Panamá',
    avatar: '👩🏽‍🦰',
    text: 'Mis tres hijos usan La Onda Tranquila. Cada uno tiene su favorito y todos duermen mejor. ¡Qué descubrimiento increíble!',
    rating: 5,
    time: 'hace 1 semana',
  },
  {
    name: 'Fernanda B.',
    location: 'San José, Costa Rica',
    avatar: '👩🏻',
    text: 'Como educadora, veo el impacto en mis estudiantes. Los que usan La Onda Tranquila están más atentos y menos ansiosos. Recomendación 100%.',
    rating: 5,
    time: 'hace 4 días',
  },
];

// ═══════════════════════════════════════════════════
// COMPONENTE: SOCIAL PROOF COMPACTO
// ═══════════════════════════════════════════════════
export function SocialProofCompact() {
  const [memberCount, setMemberCount] = useState(0);
  const [displayCount, setDisplayCount] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const count = getMemberCount();
    setMemberCount(count);
    setDisplayCount(count);
  }, []);

  useEffect(() => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const scroll = () => {
      container.scrollLeft += 1;
      if (container.scrollLeft >= container.scrollWidth - container.clientWidth) {
        container.scrollLeft = 0;
      }
    };
    const interval = setInterval(scroll, 30);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full">
      {/* Member Count */}
      <div className="text-center mb-8">
        <p className="text-2xl font-bold" style={{ color: '#99A178' }}>
          +{displayCount.toLocaleString()} padres confían en La Onda Tranquila
        </p>
      </div>

      {/* Testimonials Carousel */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto pb-4 scroll-smooth"
        style={{ scrollBehavior: 'smooth' }}
      >
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-80 p-4 rounded-lg"
            style={{
              background: 'rgba(153,161,120,0.1)',
              border: '1px solid rgba(153,161,120,0.2)',
            }}
          >
            {/* Rating */}
            <div className="flex gap-1 mb-3">
              {[...Array(testimonial.rating)].map((_, i) => (
                <span key={i} style={{ color: '#FFD700' }}>★</span>
              ))}
            </div>

            {/* Text */}
            <p className="text-sm mb-4" style={{ color: '#E8D5C4' }}>
              "{testimonial.text}"
            </p>

            {/* Author */}
            <div className="flex items-center gap-3">
              <span className="text-2xl">{testimonial.avatar}</span>
              <div>
                <p className="font-semibold text-sm" style={{ color: '#E8D5C4' }}>
                  {testimonial.name}
                </p>
                <p className="text-xs" style={{ color: '#999' }}>
                  {testimonial.location} • {testimonial.time}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════
// COMPONENTE: SOCIAL PROOF FULL (para dashboard)
// ═══════════════════════════════════════════════════
export function SocialProofFull() {
  const [memberCount, setMemberCount] = useState(0);

  useEffect(() => {
    setMemberCount(getMemberCount());
  }, []);

  return (
    <div className="w-full">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-2" style={{ color: '#E8D5C4' }}>
          Padres que ya transformaron la vida de sus hijos
        </h2>
        <p className="text-lg" style={{ color: '#99A178' }}>
          +{memberCount.toLocaleString()} familias confían en La Onda Tranquila
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="p-6 rounded-lg"
            style={{
              background: 'rgba(153,161,120,0.1)',
              border: '1px solid rgba(153,161,120,0.2)',
            }}
          >
            {/* Rating */}
            <div className="flex gap-1 mb-3">
              {[...Array(testimonial.rating)].map((_, i) => (
                <span key={i} style={{ color: '#FFD700' }}>★</span>
              ))}
            </div>

            {/* Text */}
            <p className="text-sm mb-4" style={{ color: '#E8D5C4' }}>
              "{testimonial.text}"
            </p>

            {/* Author */}
            <div className="flex items-center gap-3 pt-4" style={{ borderTop: '1px solid rgba(153,161,120,0.1)' }}>
              <span className="text-3xl">{testimonial.avatar}</span>
              <div>
                <p className="font-semibold text-sm" style={{ color: '#E8D5C4' }}>
                  {testimonial.name}
                </p>
                <p className="text-xs" style={{ color: '#999' }}>
                  {testimonial.location}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
