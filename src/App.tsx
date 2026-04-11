/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from "motion/react";
import { ShoppingCart, ShieldCheck, Store, ChevronRight, Star, Flame, Trophy, Target, Youtube, MessageSquare, ChevronLeft, ChevronDown, Clock, Zap } from "lucide-react";
import { useState, ReactNode, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useLocation } from "react-router-dom";

interface PriceOption {
  duration: string;
  price: number;
  id: number;
}

interface Product {
  id: string;
  name: string;
  description: string;
  mediaUrls: string[];
  prices: PriceOption[];
  features: string[];
  rating: number;
  color: string;
  icon: ReactNode;
}

const PRODUCTS: Product[] = [
  {
    id: "pato-team-azul",
    name: "Pato Team Azul",
    description: "La mejor herramienta para dominar el campo de batalla con estilo y precisión.",
    mediaUrls: [
      "https://cdn.phototourl.com/free/2026-04-06-ee00520b-7ff7-486e-9ad3-996fb2b8f41a.jpg",
      "https://cdn.phototourl.com/free/2026-04-06-148b3b16-37e7-4d72-be76-7d2d32f56b63.jpg"
    ],
    prices: [
      { id: 1, duration: "3 Días", price: 3 },
      { id: 2, duration: "7 Días", price: 9 },
      { id: 3, duration: "30 Días", price: 15 },
    ],
    features: ["Aimbot Avanzado", "ESP Customizable", "Seguridad Reforzada"],
    rating: 5.0,
    color: "from-blue-500 to-cyan-400",
    icon: <img src="https://cdn.phototourl.com/free/2026-04-06-ee00520b-7ff7-486e-9ad3-996fb2b8f41a.jpg" className="w-full h-full object-cover border-2 border-blue-500 rounded-lg" referrerPolicy="no-referrer" />
  },
  {
    id: "pato-team-verde",
    name: "Pato Team Verde",
    description: "La versión optimizada para máxima fluidez y rendimiento. Domina con el poder del verde.",
    mediaUrls: [
      "https://cdn.phototourl.com/free/2026-04-06-738f499d-d1c2-4bd4-bd76-750092c9eb7d.png",
      "https://cdn.phototourl.com/free/2026-04-06-39004ccb-4017-4ab3-949f-c4262944bf59.jpg"
    ],
    prices: [
      { id: 1, duration: "3 Días", price: 3 },
      { id: 2, duration: "7 Días", price: 9 },
      { id: 3, duration: "30 Días", price: 15 },
    ],
    features: ["Optimización Verde", "ESP Ultra-Rápido", "Bypass Indetectable"],
    rating: 5.0,
    color: "from-emerald-500 to-green-400",
    icon: <img src="https://cdn.phototourl.com/free/2026-04-06-738f499d-d1c2-4bd4-bd76-750092c9eb7d.png" className="w-full h-full object-cover border-2 border-emerald-500 rounded-lg" referrerPolicy="no-referrer" />
  },
  {
    id: "drip",
    name: "Drip Client (Sin Root)",
    description: "Optimizado para dispositivos sin root. Máxima seguridad y fluidez en cada partida.",
    mediaUrls: [
      "https://cdn.phototourl.com/free/2026-03-22-76ea78a1-3c72-4e78-bd4e-76b81dd7683b.jpg",
      "https://cdn.phototourl.com/member/2026-03-22-d125fab5-a77c-40d9-b4d5-3565853aadaa.webp"
    ],
    prices: [
      { id: 1, duration: "1 Día", price: 3 },
      { id: 2, duration: "7 Días", price: 8 },
      { id: 3, duration: "30 Días", price: 15 },
    ],
    features: ["No requiere Root", "Optimización de FPS", "Invisible a Grabaciones"],
    rating: 4.8,
    color: "from-purple-600 to-indigo-500",
    icon: <img src="https://cdn.phototourl.com/free/2026-03-22-5f523836-ad3a-420b-8ed6-f0e8c533b06f.png" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
  },
  {
    id: "hg",
    name: "HG CHEATS",
    description: "La herramienta definitiva para competitivos. Precisión quirúrgica y velocidad extrema.",
    mediaUrls: [
      "https://cdn.phototourl.com/free/2026-03-22-c5cc2a3a-802d-4f73-8851-e91cb13509ca.jpg",
      "https://cdn.phototourl.com/member/2026-03-22-96db9420-7c33-4b78-b946-a212d07bc622.jpg"
    ],
    prices: [
      { id: 1, duration: "1 Día", price: 2 },
      { id: 2, duration: "10 Días", price: 7 },
      { id: 3, duration: "30 Días", price: 11 },
    ],
    features: ["Magic Bullet", "Speed Hack Safe", "Auto Headshot"],
    rating: 5.0,
    color: "from-cyan-600 to-blue-500",
    icon: <img src="https://cdn.phototourl.com/member/2026-03-22-d0720cc9-ac7e-49d7-9f39-05daea467c6d.jpg" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
  },
  {
    id: "cuban",
    name: "Cuban Mods",
    description: "El panel más completo y estable para Free Fire. Incluye Aimbot Pro, ESP Line y Antena.",
    mediaUrls: [
      "https://videotourl.com/videos/1774197053145-3af3060a-762d-4de9-aab1-622c8711c8c3.mp4",
      "https://cdn.phototourl.com/free/2026-03-22-377e4dc7-0d9c-4830-ae84-65d069746d42.jpg"
    ],
    prices: [
      { id: 1, duration: "1 Día", price: 2 },
      { id: 2, duration: "7 Días", price: 6 },
      { id: 3, duration: "30 Días", price: 16 },
    ],
    features: ["Aimbot 100% Real", "ESP Name & Distance", "Bypass Anti-Ban"],
    rating: 4.9,
    color: "from-blue-600 to-indigo-600",
    icon: <img src="https://cdn.phototourl.com/free/2026-03-22-60b7ddc1-4c22-4163-9f82-82242c89014a.png" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
  },
  {
    id: "fluorite",
    name: "Fluorite iOS",
    description: "Para cuenta principal, usuarios con iPhone, seguro.",
    mediaUrls: [
      "https://videotourl.com/videos/1774195663595-62429af7-55ed-4b3c-966a-1233b381cfdf.mp4",
      "https://cdn.phototourl.com/member/2026-03-22-6472f28b-2a7c-4451-b00c-421ac27032cc.jpg"
    ],
    prices: [
      { id: 1, duration: "1 Día", price: 7 },
      { id: 2, duration: "7 Días", price: 22 },
      { id: 3, duration: "30 Días", price: 39 },
    ],
    features: ["Aimbot todo rojo", "Antena", "Para cuentas principales"],
    rating: 5.0,
    color: "from-indigo-500 to-purple-600",
    icon: <img src="https://cdn.phototourl.com/member/2026-03-22-c70c1ffd-fc85-4d42-8b14-f5343865b9ec.png" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
  },
  {
    id: "br-root",
    name: "BR MODS ROOT",
    description: "Diseñado específicamente para dispositivos con acceso root. Control total, Aimbot avanzado y seguridad para tu cuenta principal.",
    mediaUrls: [
      "https://cdn.phototourl.com/member/2026-03-22-2d0942d8-dd8f-48a0-8c91-0368ec3346f8.png",
      "https://cdn.phototourl.com/member/2026-03-22-1a1d3664-575a-4a45-9983-d0bb2891ebf4.png"
    ],
    prices: [
      { id: 1, duration: "1 Día", price: 2 },
      { id: 2, duration: "7 Días", price: 7 },
      { id: 3, duration: "30 Días", price: 12 },
    ],
    features: ["Para usuarios ROOT", "Cuenta Principal", "Aimbot"],
    rating: 5.0,
    color: "from-sky-400 to-blue-600",
    icon: <img src="https://cdn.phototourl.com/member/2026-03-22-fa3fabfb-e050-4a34-9cb4-7ced77c1b500.jpg" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
  },
  {
    id: "proxi-iphone",
    name: "Proxi iPhone",
    description: "La solución definitiva para usuarios de iOS. Rendimiento superior y seguridad inigualable.",
    mediaUrls: [
      "https://cdn.phototourl.com/free/2026-04-06-72ee09c9-926b-409f-b459-e93962fea93e.png",
      "https://cdn.phototourl.com/free/2026-04-06-dbbde1be-29aa-4995-8301-1a4f98da4074.png"
    ],
    prices: [
      { id: 1, duration: "1 Día", price: 4 },
      { id: 2, duration: "7 Días", price: 9 },
      { id: 3, duration: "30 Días", price: 15 },
    ],
    features: ["Optimizado para iOS", "Seguridad Máxima", "Sin Lag"],
    rating: 5.0,
    color: "from-zinc-400 to-zinc-600",
    icon: <img src="https://cdn.phototourl.com/free/2026-04-06-72ee09c9-926b-409f-b459-e93962fea93e.png" className="w-full h-full object-cover border-2 border-zinc-400 rounded-lg" referrerPolicy="no-referrer" />
  },
  {
    id: "ldcloud",
    name: "LDCloud",
    description: "La mejor nube para tus juegos. Rendimiento fluido y acceso desde cualquier lugar.",
    mediaUrls: [
      "https://cdn.phototourl.com/free/2026-04-06-bb437144-e49b-4f83-a2da-10db1926009f.jpg"
    ],
    prices: [
      { id: 1, duration: "1 Día", price: 5 },
      { id: 2, duration: "7 Días", price: 9 },
      { id: 3, duration: "30 Días", price: 18 },
    ],
    features: ["Acceso Remoto", "Sin Lag", "Multi-dispositivo"],
    rating: 5.0,
    color: "from-amber-500 to-orange-400",
    icon: <img src="https://cdn.phototourl.com/free/2026-04-06-bb437144-e49b-4f83-a2da-10db1926009f.jpg" className="w-full h-full object-cover border-2 border-amber-500 rounded-lg" referrerPolicy="no-referrer" />
  },
  {
    id: "diamonds-low-price",
    name: "Diamantes a menos precio",
    description: "Recarga tus diamantes al mejor precio del mercado. Entrega rápida y segura.",
    mediaUrls: [
      "https://cdn.phototourl.com/free/2026-04-06-7eb7ee22-9da8-400b-bcde-11bb98a5c5f3.jpg"
    ],
    prices: [
      { id: 1, duration: "100 💎", price: 0 },
      { id: 2, duration: "310 💎", price: 0 },
      { id: 3, duration: "520 💎", price: 0 },
      { id: 4, duration: "1060 💎", price: 0 },
      { id: 5, duration: "2180 💎", price: 0 },
      { id: 6, duration: "5600 💎", price: 0 },
    ],
    features: ["Entrega Inmediata", "ID de Jugador", "100% Seguro"],
    rating: 5.0,
    color: "from-cyan-400 to-blue-500",
    icon: <img src="https://cdn.phototourl.com/free/2026-04-06-7eb7ee22-9da8-400b-bcde-11bb98a5c5f3.jpg" className="w-full h-full object-cover border-2 border-cyan-400 rounded-lg" referrerPolicy="no-referrer" />
  }
];

const COMING_SOON_PRODUCTS: Partial<Product>[] = [];

function Sparkles() {
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; size: number; duration: number; delay: number; drift: number; color: string; type: 'spark' | 'ember' }[]>([]);

  useEffect(() => {
    const colors = ["#60a5fa", "#7dd3fc", "#22d3ee", "#ffffff", "#93c5fd"];
    const newParticles = Array.from({ length: 120 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: 100,
      size: Math.random() * 2 + 0.5,
      duration: Math.random() * 2 + 1,
      delay: Math.random() * 5,
      drift: (Math.random() - 0.5) * 40,
      color: colors[Math.floor(Math.random() * colors.length)],
      type: Math.random() > 0.7 ? 'spark' : 'ember'
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {/* Neon Underglow - Blue */}
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-sky-400/30 shadow-[0_0_20px_2px_rgba(56,189,248,0.3)] z-20" />
      
      {/* Blue Fire Glow Base */}
      <motion.div 
        animate={{ 
          opacity: [0.1, 0.2, 0.1],
          scaleY: [1, 1.05, 1]
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-sky-400/10 via-sky-500/5 to-transparent blur-[40px] origin-bottom"
      />

      {/* Blue Sparks / Fire Particles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ opacity: 0, y: "100%", x: `${p.x}%` }}
          animate={{ 
            opacity: [0, 1, 0.8, 0],
            y: p.type === 'spark' ? "-40%" : "-10%",
            x: [`${p.x}%`, `${p.x + p.drift}%`],
            scale: [1, 1.5, 0.5],
            rotate: p.type === 'spark' ? [0, 90, 180] : 0
          }}
          transition={{
            duration: p.type === 'spark' ? p.duration * 0.6 : p.duration * 1.5,
            repeat: Infinity,
            delay: p.delay,
            ease: p.type === 'spark' ? "easeOut" : "linear"
          }}
          style={{
            position: "absolute",
            width: p.type === 'spark' ? p.size : p.size * 1.5,
            height: p.type === 'spark' ? p.size * 4 : p.size * 1.5,
            backgroundColor: p.color,
            borderRadius: p.type === 'spark' ? "2px" : "50%",
            boxShadow: `0 0 15px 2px ${p.color}`,
            filter: "blur(0.5px)",
            zIndex: 10
          }}
        />
      ))}

      {/* Extra Bottom Flicker */}
      <div className="absolute bottom-0 left-0 w-full h-full">
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.div
            key={`flicker-${i}`}
            animate={{ 
              opacity: [0, 0.3, 0],
              scale: [0.8, 1.1, 0.9],
              x: [`${i * 20}%`, `${i * 20 + 5}%`, `${i * 20 - 5}%`]
            }}
            transition={{ 
              duration: 0.2 + Math.random() * 0.3, 
              repeat: Infinity, 
              delay: Math.random() 
            }}
            className="absolute bottom-0 w-40 h-40 bg-cyan-500/20 blur-[50px] rounded-full"
            style={{ left: `${i * 20}%` }}
          />
        ))}
      </div>
    </div>
  );
}

function ProductCard({ product, index }: { product: Product; index: number; key?: string }) {
  const [selectedPriceId, setSelectedPriceId] = useState(product.prices[0].id);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isDiamondMenuOpen, setIsDiamondMenuOpen] = useState(false);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % product.mediaUrls.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + product.mediaUrls.length) % product.mediaUrls.length);
  };

  const currentMediaUrl = product.mediaUrls[currentImageIndex];
  const isVideo = currentMediaUrl?.endsWith('.mp4');

  return (
    <div className="group relative">
      {/* Animated Border Glow */}
      <div className={`absolute -inset-[1px] bg-gradient-to-r ${product.color} rounded-[32px] opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-500`} />
      
      <div className={`relative h-full bg-zinc-950 rounded-[31px] overflow-hidden border border-white/5 shadow-2xl transition-all duration-500 ${
        product.id === 'diamonds-low-price' ? 'opacity-75 grayscale-[0.3]' : ''
      }`}>
        <div className="relative aspect-[4/3] overflow-hidden">
          {product.id === 'diamonds-low-price' && (
            <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-[4px]">
              <motion.div 
                initial={{ scale: 0.8 }}
                animate={{ scale: [0.8, 1.1, 1] }}
                className="bg-red-500 text-white px-8 py-3 rounded-full font-black uppercase tracking-[0.2em] text-xs shadow-[0_0_30px_rgba(239,68,68,0.6)] border border-red-400/50 italic"
              >
                En Espera
              </motion.div>
            </div>
          )}
          
          <AnimatePresence mode="wait">
            {isVideo ? (
              <motion.video
                key={currentImageIndex}
                src={currentMediaUrl}
                autoPlay
                muted
                loop
                playsInline
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            ) : (
              <motion.img 
                key={currentImageIndex}
                src={currentMediaUrl} 
                alt={product.name}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
            )}
          </AnimatePresence>

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-80" />
          
          {/* Top Badges */}
          <div className="absolute top-4 left-4 right-4 flex justify-between items-start z-20">
            <div className="flex gap-2">
              <div className="bg-black/60 backdrop-blur-md text-white px-3 py-1.5 rounded-xl text-[10px] font-black flex items-center gap-1.5 border border-white/10">
                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                {product.rating}
              </div>
              {index < 3 && (
                <div className="bg-blue-600/80 backdrop-blur-md text-white px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider border border-blue-400/30">
                  Popular
                </div>
              )}
            </div>
          </div>

          {/* Media Controls */}
          {product.mediaUrls.length > 1 && (
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30">
              <button onClick={prevImage} className="p-2 bg-black/60 backdrop-blur-md rounded-full text-white hover:bg-white hover:text-black transition-all">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button onClick={nextImage} className="p-2 bg-black/60 backdrop-blur-md rounded-full text-white hover:bg-white hover:text-black transition-all">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Product Icon Floating */}
          <div className="absolute bottom-6 left-6 z-20">
            <motion.div 
              whileHover={{ scale: 1.1, rotate: 5 }}
              className={`w-14 h-14 rounded-2xl overflow-hidden shadow-2xl border border-white/20 bg-gradient-to-br ${product.color} p-[1px]`}
            >
              <div className="w-full h-full rounded-[15px] overflow-hidden bg-zinc-900">
                {product.icon}
              </div>
            </motion.div>
          </div>
        </div>

        <div className="p-8">
          <div className="mb-6">
            <h3 className={`text-2xl font-black text-white mb-2 tracking-tighter uppercase italic drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]`}>
              {product.name}
            </h3>
            <p className="text-zinc-500 text-xs font-medium leading-relaxed line-clamp-2 uppercase tracking-wider">
              {product.description}
            </p>
          </div>

          <div className="space-y-4 mb-8">
            {product.features.slice(0, 3).map((feature, idx) => (
              <div key={idx} className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-zinc-400">
                <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${product.color}`} />
                {feature}
              </div>
            ))}
          </div>

          {product.id === 'diamonds-low-price' ? (
            <div className="flex gap-3 relative">
              <div className="flex-1">
                <button disabled className="w-full h-14 bg-zinc-900 border border-white/5 rounded-2xl text-zinc-600 font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-2 cursor-not-allowed">
                  <Clock className="w-4 h-4" />
                  En Espera
                </button>
              </div>
              <button disabled className="flex-[0.6] bg-zinc-900 border border-white/5 rounded-2xl text-zinc-600 font-black uppercase tracking-widest text-[10px] cursor-not-allowed">
                Bloqueado
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-2">
                {product.prices.map((price) => {
                  const isSelected = selectedPriceId === price.id;
                  return (
                    <button
                      key={price.id}
                      onClick={() => setSelectedPriceId(price.id)}
                      className={`relative py-3 rounded-xl border transition-all duration-300 ${
                        isSelected
                          ? "border-white bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                          : "border-white/5 bg-zinc-900/50 text-zinc-500 hover:border-white/20"
                      }`}
                    >
                      <div className="text-[8px] font-black uppercase tracking-tighter mb-0.5">{price.duration}</div>
                      <div className="text-sm font-black">${price.price}</div>
                    </button>
                  );
                })}
              </div>
              
              <a 
                href="https://w.app/2nao9j"
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full h-14 bg-gradient-to-r ${product.color} text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:brightness-110 transition-all active:scale-95 shadow-xl group/btn`}
              >
                <ShoppingCart className="w-4 h-4" />
                Comprar {product.prices.find(p => p.id === selectedPriceId)?.duration}
                <ChevronRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Navbar() {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-black/80 backdrop-blur-xl border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between h-20 items-center">
          <Link to="/" className="flex items-center gap-3">
            <motion.span 
              animate={{ y: [0, -2, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="text-2xl font-black tracking-tighter text-white uppercase italic"
            >
              ALEX STORE
            </motion.span>
          </Link>
          
          <div className="flex items-center gap-6 md:gap-10 text-[10px] md:text-[11px] font-black uppercase tracking-widest">
            <Link to="/" className={`${isActive('/') ? 'text-white' : 'text-zinc-400'} hover:text-white transition-colors`}>Inicio</Link>
            <Link to="/productos" className={`${isActive('/productos') ? 'text-white' : 'text-zinc-400'} hover:text-white transition-colors`}>Productos</Link>
            <Link to="/redes" className={`${isActive('/redes') ? 'text-white' : 'text-zinc-400'} hover:text-white transition-colors`}>Redes</Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

function Inicio() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col bg-black">
      {/* Hero Section */}
      <header className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
        {/* Background with Parallax Effect */}
        <div className="absolute inset-0 z-0">
          <motion.div
            animate={{ 
              scale: [1, 1.02, 1],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="w-full h-full opacity-20 grayscale"
          >
            <img 
              src="https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&q=80&w=1920" 
              alt="Background" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black" />
          
          {/* Moving Grid Background */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:80px_80px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_95%)]" />

          {/* Subtle White Glows */}
          <motion.div 
            animate={{ 
              opacity: [0.05, 0.1, 0.05]
            }}
            transition={{ duration: 10, repeat: Infinity }}
            className="absolute top-1/4 left-1/4 w-[800px] h-[800px] bg-white/5 rounded-full blur-[200px]"
          />
        </div>

        <Sparkles />

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mb-8"
          >
            <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-sky-400/5 border border-sky-400/20 mb-8 backdrop-blur-xl shadow-[0_0_15px_rgba(56,189,248,0.1)]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-300 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-400"></span>
              </span>
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-sky-400/80">SISTEMA OPERATIVO 27/7</span>
            </div>

            <h1 className="text-[10vw] md:text-[8vw] font-black tracking-tighter mb-8 leading-none uppercase italic select-none">
              <motion.span 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="inline-block pr-[0.2em] bg-clip-text text-transparent bg-gradient-to-r from-zinc-300 via-white via-zinc-100 via-sky-200 to-zinc-400 drop-shadow-[0_0_70px_rgba(255,255,255,0.5)]"
              >
                ALEX MODS
              </motion.span>
            </h1>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="relative"
            >
              <p className="text-[11px] md:text-base text-zinc-400 font-black uppercase tracking-[0.8em] mb-12 max-w-2xl mx-auto leading-relaxed">
                EL ARSENAL DEFINITIVO PARA <span className="text-sky-400/80 drop-shadow-[0_0_10px_rgba(56,189,248,0.3)]">JUGADORES DE ÉLITE</span>
              </p>
            </motion.div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <motion.button 
                onClick={() => navigate('/productos')}
                whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(168,85,247,0.4)" }}
                whileTap={{ scale: 0.95 }}
                className="group relative w-full sm:w-64 h-16 overflow-hidden rounded-2xl transition-all"
              >
                <div className="absolute inset-0 bg-purple-600 group-hover:bg-purple-500 transition-colors" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                <div className="absolute inset-0 border border-white/20 rounded-2xl group-hover:border-white/40 transition-colors" />
                <div className="relative w-full h-full flex items-center justify-center gap-4 text-white font-black text-[10px] uppercase tracking-[0.3em]">
                  <ShoppingCart className="w-4 h-4 animate-pulse" />
                  Ver Catálogo
                  <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
                </div>
              </motion.button>
              
              <motion.button 
                onClick={() => navigate('/redes')}
                whileHover={{ scale: 1.05, backgroundColor: "rgba(56,189,248,0.15)" }}
                whileTap={{ scale: 0.95 }}
                className="group relative w-full sm:w-64 h-16 overflow-hidden rounded-2xl transition-all border border-sky-400/30 backdrop-blur-3xl shadow-[0_0_20px_rgba(56,189,248,0.05)]"
              >
                <div className="absolute inset-0 bg-white/5 group-hover:bg-sky-400/10 transition-colors" />
                <div className="relative w-full h-full flex items-center justify-center gap-4 text-white font-black text-[10px] uppercase tracking-[0.3em]">
                  <MessageSquare className="w-4 h-4 text-sky-300 group-hover:scale-110 transition-transform" />
                  Comunidad VIP
                </div>
              </motion.button>
            </div>
          </motion.div>

          {/* Quick Stats - Technical Style */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-5xl mx-auto">
            {[
              { label: "Usuarios", value: "+500", icon: <Trophy className="w-5 h-5" /> },
              { label: "Seguridad", value: "100%", icon: <ShieldCheck className="w-5 h-5" /> },
              { label: "Soporte", value: "24/7", icon: <MessageSquare className="w-5 h-5" /> },
              { label: "Entrega", value: "Instant", icon: <Flame className="w-5 h-5" /> }
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + i * 0.1, type: "spring", stiffness: 100 }}
                className="p-8 rounded-3xl bg-zinc-900/60 border-2 border-white/5 backdrop-blur-xl hover:border-sky-500/40 hover:shadow-[0_0_30px_rgba(56,189,248,0.15)] transition-all group relative overflow-hidden"
              >
                <div className="flex flex-col items-center gap-4">
                  <div className="text-sky-400 group-hover:scale-125 group-hover:rotate-12 transition-transform duration-500">
                    {stat.icon}
                  </div>
                  <div className="text-3xl font-black text-white italic tracking-tighter drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">{stat.value}</div>
                  <div className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 group-hover:text-sky-300 transition-colors">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Decorative Character Image - Adjusted size and position to avoid overlap */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 0.3, x: 0 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute bottom-0 right-0 z-0 pointer-events-none select-none hidden xl:block"
        >
          <div className="relative">
            <motion.img 
              src="https://cdn.phototourl.com/member/2026-03-22-b41643a3-faf3-47eb-b93b-121c16732043.png" 
              alt="Character" 
              className="w-[550px] h-auto drop-shadow-[0_0_80px_rgba(56,189,248,0.1)]"
              animate={{ 
                y: [0, -15, 0],
              }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
              referrerPolicy="no-referrer"
            />
            {/* Scanning Laser Effect - Blue */}
            <motion.div 
              animate={{ top: ["0%", "100%", "0%"] }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              className="absolute left-0 w-full h-px bg-sky-400/10 z-10"
            />
          </div>
        </motion.div>
      </header>

      {/* CTA Section - Immersive Cinematic Style */}
      <section className="py-12 pb-24 relative overflow-hidden bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            whileHover={{ scale: 1.005 }}
            className="relative p-12 md:p-24 rounded-[60px] bg-gradient-to-br from-zinc-950 to-black border border-white/5 overflow-hidden text-center group"
          >
            {/* Background Atmosphere */}
            <div className="absolute inset-0 z-0">
              <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(56,189,248,0.03)_0%,transparent_70%)]" />
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5" />
            </div>
            
            <div className="relative z-10 space-y-12">
              <h2 className="text-6xl md:text-9xl font-black text-white uppercase italic tracking-tighter leading-[0.8] drop-shadow-[0_0_50px_rgba(56,189,248,0.3)]">
                ÚNETE A LA <br /> <span className="text-sky-400 group-hover:text-white transition-all duration-700">ÉLITE</span>
              </h2>
              
              <p className="text-zinc-400 text-sm md:text-xl font-bold uppercase tracking-[1em] max-w-2xl mx-auto">
                NO TE CONFORMES CON JUGAR. <br /> <span className="text-white">EMPIEZA A GANAR.</span>
              </p>
              
              <div className="pt-8">
                <motion.button 
                  onClick={() => navigate('/productos')}
                  whileHover={{ scale: 1.1, boxShadow: "0 0 60px rgba(56,189,248,0.4)" }}
                  whileTap={{ scale: 0.9 }}
                  className="group relative px-20 py-8 overflow-hidden rounded-2xl transition-all"
                >
                  <div className="absolute inset-0 bg-sky-500 group-hover:bg-sky-400 transition-colors" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  <span className="relative z-10 flex items-center gap-4 text-white font-black text-xs uppercase tracking-[0.5em]">
                    Ver Catálogo
                    <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-2" />
                  </span>
                </motion.button>
              </div>
            </div>

            {/* Decorative tech lines */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-sky-400/10 to-transparent" />
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-sky-400/10 to-transparent" />
          </motion.div>
        </div>
      </section>
    </div>
  );
}

function Productos() {
  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      {/* Immersive Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-600/10 rounded-full blur-[120px] animate-pulse delay-700" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_70%)]" />
      </div>

      <main className="max-w-7xl mx-auto px-6 py-32 relative z-10">
        <div className="text-center mb-32 relative">
          <div className="inline-block mb-8">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-blue-500" />
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-blue-400">Elite Selection</span>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-blue-500" />
            </div>
            <h2 className="text-6xl md:text-9xl font-black tracking-tighter uppercase italic bg-clip-text text-transparent bg-gradient-to-b from-white via-zinc-400 to-zinc-800 drop-shadow-[0_0_50px_rgba(255,255,255,0.2)]">
              CATÁLOGO <span className="text-white">PREMIUM</span>
            </h2>
          </div>
          <p className="text-[12px] font-black uppercase tracking-[0.6em] text-zinc-500 italic max-w-2xl mx-auto leading-relaxed opacity-80">
            Herramientas de élite diseñadas para dominar cada campo de batalla con precisión absoluta
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-32">
          {PRODUCTS.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>

        {/* WhatsApp Support Section - Enhanced */}
        <div className="mb-32 text-center">
          <div className="inline-flex flex-col items-center gap-10 p-12 md:p-24 bg-zinc-950 border border-white/5 rounded-[64px] relative overflow-hidden group shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/10 to-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="w-24 h-24 bg-emerald-500/10 rounded-[32px] flex items-center justify-center border border-emerald-500/20 relative z-10 shadow-[0_0_40px_rgba(16,185,129,0.1)]"
            >
              <MessageSquare className="w-10 h-10 text-emerald-400" />
            </motion.div>
            
            <div className="relative z-10 space-y-6">
              <h3 className="text-3xl md:text-6xl font-black text-white uppercase italic tracking-tighter leading-none">
                ¿NO ENCUENTRAS LO QUE <span className="text-zinc-500">BUSCAS?</span>
              </h3>
              <p className="text-zinc-400 text-sm md:text-lg font-medium uppercase tracking-[0.3em] max-w-xl mx-auto">
                Si no está tu producto disponible pregunte por aquí y te ayudaremos de inmediato.
              </p>
              
              <div className="pt-6">
                <a 
                  href="https://w.app/f7pkkf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-6 bg-emerald-500 text-black px-16 py-7 rounded-2xl font-black text-sm uppercase tracking-[0.3em] hover:scale-105 active:scale-95 transition-all shadow-[0_0_50px_rgba(16,185,129,0.4)] group/wa"
                >
                  <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" 
                    alt="WhatsApp" 
                    className="w-6 h-6"
                    referrerPolicy="no-referrer"
                  />
                  Preguntar por WhatsApp
                  <ChevronRight className="w-5 h-5 transition-transform group-hover/wa:translate-x-2" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Section: Disponibles Pronto - Enhanced */}
        {COMING_SOON_PRODUCTS.length > 0 && (
          <div className="mt-48">
            <div className="text-center mb-24 relative">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-zinc-500/5 rounded-full blur-3xl" />
              <h3 className="text-4xl md:text-7xl font-black tracking-tighter uppercase italic mb-6 text-zinc-700 relative z-10">
                DISPONIBLES <span className="text-zinc-800">PRONTO</span>
              </h3>
              <div className="w-32 h-1 bg-gradient-to-r from-transparent via-zinc-800 to-transparent mx-auto rounded-full" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 opacity-40 hover:opacity-100 transition-opacity duration-700">
              {COMING_SOON_PRODUCTS.map((product, index) => (
                <div 
                  key={product.id}
                  className="bg-zinc-950/50 rounded-[40px] overflow-hidden border border-white/5 p-10 relative group transition-all duration-500 hover:bg-zinc-900/50"
                >
                  <div className="absolute top-6 right-6 bg-zinc-900 text-zinc-500 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-white/5">
                    Próximamente
                  </div>
                  
                  <div className="mb-8">
                    <div className={`w-20 h-20 rounded-3xl bg-gradient-to-br ${product.color} p-5 mb-8 shadow-2xl group-hover:scale-110 transition-transform duration-500`}>
                      {product.icon}
                    </div>
                    <h4 className="text-3xl font-black text-white mb-3 uppercase italic tracking-tighter">{product.name}</h4>
                    <p className="text-zinc-500 text-sm leading-relaxed font-medium uppercase tracking-wider">{product.description}</p>
                  </div>

                  <div className="space-y-4 mb-10">
                    {product.features?.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-4 text-[10px] font-black text-zinc-600 uppercase tracking-widest">
                        <div className="w-1.5 h-1.5 rounded-full bg-zinc-800" />
                        {feature}
                      </div>
                    ))}
                  </div>

                  <div className="w-full py-5 bg-zinc-900/50 rounded-2xl text-zinc-700 font-black text-xs uppercase tracking-[0.3em] text-center border border-white/5">
                    En Desarrollo
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

function Redes() {
  const DiscordIcon = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.419-2.157 2.419zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.419-2.157 2.419z"/>
    </svg>
  );

  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      {/* Immersive Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_30%,rgba(79,70,229,0.15)_0%,transparent_50%)]" />
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_70%,rgba(16,185,129,0.1)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      <main className="max-w-7xl mx-auto px-6 py-32 relative z-10">
        <div className="text-center mb-32 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block mb-8"
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-indigo-500" />
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-indigo-400">Connect With Us</span>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-indigo-500" />
            </div>
            <h2 className="text-6xl md:text-9xl font-black tracking-tighter uppercase italic bg-clip-text text-transparent bg-gradient-to-b from-white via-zinc-400 to-zinc-800 drop-shadow-[0_0_50px_rgba(255,255,255,0.2)]">
              NUESTRAS <span className="text-white">REDES</span>
            </h2>
          </motion.div>
          <p className="text-[12px] font-black uppercase tracking-[0.6em] text-zinc-500 italic max-w-2xl mx-auto leading-relaxed opacity-80">
            Únete a nuestra comunidad de élite y mantente al día con las últimas actualizaciones
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-32">
          {[
            { 
              name: "TikTok", 
              icon: <img src="https://cdn.phototourl.com/member/2026-03-23-6aff48f7-acdb-4dc4-9038-75d96031bff8.png" className="w-12 h-12 object-contain" referrerPolicy="no-referrer" />, 
              color: "from-cyan-500/20 to-pink-500/20", 
              glow: "group-hover:shadow-[0_0_40px_rgba(34,211,238,0.3)]",
              borderColor: "border-cyan-500/30",
              link: "https://www.tiktok.com/@alexmodsstore?_r=1&_t=ZS-94v26mzvM4w",
              handle: "@alexmodsstore"
            },
            { 
              name: "WhatsApp", 
              icon: <img src="https://cdn.phototourl.com/member/2026-03-23-1e2a11e1-06e3-48b5-b453-d187da391138.png" className="w-12 h-12 object-contain" referrerPolicy="no-referrer" />, 
              color: "from-emerald-500/20 to-green-600/20", 
              glow: "group-hover:shadow-[0_0_40px_rgba(16,185,129,0.3)]",
              borderColor: "border-emerald-500/30",
              link: "https://whatsapp.com/channel/0029Vb7tFdmBA1f7ZQBU3T3u",
              handle: "Canal Oficial"
            },
            { 
              name: "YouTube", 
              icon: <Youtube className="w-10 h-10 text-red-500" />, 
              color: "from-red-500/20 to-red-700/20", 
              glow: "group-hover:shadow-[0_0_40px_rgba(239,68,68,0.3)]",
              borderColor: "border-red-500/30",
              link: "https://youtube.com/@alexmods13?si=7WPy3G44pcofK6W6",
              handle: "@alexmods13"
            },
            { 
              name: "Discord", 
              icon: <DiscordIcon className="w-10 h-10 text-indigo-400" />, 
              color: "from-indigo-500/20 to-blue-600/20", 
              glow: "group-hover:shadow-[0_0_40px_rgba(99,102,241,0.3)]",
              borderColor: "border-indigo-500/30",
              link: "#",
              handle: "Comunidad VIP"
            }
          ].map((social, i) => (
            <motion.a
              key={i}
              href={social.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, scale: 1.02 }}
              className={`group relative p-10 bg-zinc-900/40 backdrop-blur-xl border ${social.borderColor} rounded-[40px] flex flex-col items-center gap-8 transition-all duration-500 ${social.glow} overflow-hidden`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${social.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              
              <div className="relative z-10 w-24 h-24 bg-black/40 rounded-3xl flex items-center justify-center border border-white/5 shadow-2xl group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                {social.icon}
              </div>
              
              <div className="relative z-10 text-center">
                <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter mb-1">{social.name}</h3>
                <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest">{social.handle}</p>
              </div>

              <div className="relative z-10 mt-4 flex items-center gap-2 text-[10px] font-black text-white/40 uppercase tracking-[0.3em] group-hover:text-white transition-colors">
                Seguir <ChevronRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
              </div>
            </motion.a>
          ))}
        </div>

        {/* Support Section - Enhanced Mission Control Style */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="absolute inset-0 bg-indigo-500/5 blur-[100px] rounded-full" />
          <div className="bg-zinc-950 border border-white/5 rounded-[64px] p-12 md:p-24 text-center relative overflow-hidden shadow-2xl group">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-30" />
            
            <div className="relative z-10 space-y-10">
              <div className="inline-flex items-center gap-4 px-6 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-[10px] font-black text-indigo-400 uppercase tracking-[0.4em] mb-4">
                <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                Soporte en Línea
              </div>
              
              <h2 className="text-4xl md:text-7xl font-black text-white uppercase italic tracking-tighter leading-none">
                ¿NECESITAS AYUDA <span className="text-zinc-600">DIRECTA?</span>
              </h2>
              
              <p className="text-zinc-400 text-sm md:text-lg font-medium uppercase tracking-[0.3em] max-w-xl mx-auto leading-relaxed">
                Nuestro equipo de soporte técnico está disponible para resolver cualquier duda o inconveniente.
              </p>
              
              <div className="pt-6">
                <a 
                  href="https://w.app/fnqtaz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-6 bg-white text-black px-16 py-7 rounded-2xl font-black text-sm uppercase tracking-[0.3em] hover:scale-105 active:scale-95 transition-all shadow-[0_0_50px_rgba(255,255,255,0.2)] group/support"
                >
                  <MessageSquare className="w-6 h-6" />
                  Contactar Soporte
                  <ChevronRight className="w-5 h-5 transition-transform group-hover/support:translate-x-2" />
                </a>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute bottom-10 left-10 text-[8px] font-mono text-zinc-800 uppercase tracking-widest hidden md:block">
              System Status: Operational // Support ID: AS-2026
            </div>
            <div className="absolute top-10 right-10 text-[8px] font-mono text-zinc-800 uppercase tracking-widest hidden md:block">
              Latency: 12ms // Region: Global
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}

export default function App() {
  const [recentPurchase, setRecentPurchase] = useState<{ user: string; item: string } | null>(null);

  useEffect(() => {
    const names = [
      "Carlos", "Juan", "Diego", "Andrés", "Luis", "Miguel", "Javier", "Fernando", "Ricardo", "Gabriel",
      "Santi", "Mateo", "Kevin", "Alex", "Nico", "Dani", "Lucas", "Hugo", "Enzo", "Leo",
      "GamerPro", "EliteSniper", "ShadowPlayer", "GhostMod", "SniperElite", "ProGamer", "MasterFF", "UltraPlayer"
    ];
    
    // Filtrar productos: Pato Team Verde, Pato Team Azul, Drip, Fluorite y otros, menos diamantes
    const validProducts = PRODUCTS.filter(p => p.id !== 'diamonds-low-price').map(p => p.name);
    
    const intervals = [10000, 5000, 15000];
    let currentIndex = 0;
    let timeoutId: NodeJS.Timeout;

    const showNotification = () => {
      const randomName = names[Math.floor(Math.random() * names.length)] + "***";
      const randomProduct = validProducts[Math.floor(Math.random() * validProducts.length)];
      setRecentPurchase({ user: randomName, item: randomProduct });
      
      // Ocultar después de 3 segundos para que no se solapen en el intervalo de 5s
      setTimeout(() => setRecentPurchase(null), 3000);

      // Programar la siguiente notificación con el siguiente intervalo
      const nextInterval = intervals[currentIndex];
      currentIndex = (currentIndex + 1) % intervals.length;
      timeoutId = setTimeout(showNotification, nextInterval);
    };

    // Iniciar el ciclo
    timeoutId = setTimeout(showNotification, 2000);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-black font-sans text-white selection:bg-white selection:text-black">
        <Navbar />
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/redes" element={<Redes />} />
        </Routes>

        {/* Live Activity Feed - Global */}
        <AnimatePresence>
          {recentPurchase && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="fixed bottom-12 left-6 z-50 p-4 bg-zinc-950/95 border border-white/10 rounded-xl backdrop-blur-xl shadow-2xl flex items-center gap-3"
            >
              <div className="w-8 h-8 rounded-full bg-sky-400/10 flex items-center justify-center">
                <ShoppingCart className="w-4 h-4 text-sky-400" />
              </div>
              <div>
                <p className="text-[7px] font-black text-zinc-500 uppercase tracking-widest mb-0.5">Actividad Reciente</p>
                <p className="text-[10px] font-bold text-white uppercase tracking-tight">
                  <span className="text-sky-300">{recentPurchase.user}</span> adquirió <span className="italic text-zinc-400">{recentPurchase.item}</span>
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <footer className="bg-black border-t border-zinc-900 py-12">
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-600">
            <div className="flex items-center gap-3">
              <motion.span
                animate={{ y: [0, -1, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              >
                ALEX STORE © 2026
              </motion.span>
            </div>
            <div className="flex gap-8">
              <a href="#" className="hover:text-white transition-colors">Términos</a>
              <a href="#" className="hover:text-white transition-colors">Privacidad</a>
              <a href="#" className="hover:text-white transition-colors">Cookies</a>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}
