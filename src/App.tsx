import { useState } from "react"
import { AnimatePresence, motion, useScroll, useMotionValueEvent, useTransform } from "motion/react"
import {
  Menu, X, Phone, Home, Handshake,
  Mail, ArrowRight
} from "lucide-react"

import logo_amber from './assets/images/logo_amber.png'

// Assets - Ensure these paths match your project structure
import logo from './assets/images/logo.png'
import heroImg from './assets/images/png-transparent-bg-hero-img.png'
import img from './assets/images/home.png'
import logo_only from './assets/images/logo_estate.png'

const NAV_HEIGHT = 70;
const TOP_BAR_HEIGHT = 45;

const navLinks = [
  { label: "Home", href: "#home", icon: <Home size={15} /> },
  { label: "Project", href: "#project", icon: null },
  { label: "Partners", href: "#partners", icon: <Handshake size={15} /> },
  { label: "Contact", href: "#contact", icon: <Mail size={15} /> },
]

/* ─── TYPES ─────────────────────────────────────────── */
interface NavbarProps {
  setSidebarOpen: (open: boolean) => void;
}

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

/* ─── NOW SELLING TOP BAR ────────────────────────────── */
function NowSellingBar() {
  const { scrollY } = useScroll();
  // Gradually moves the bar up based on scroll
  const y = useTransform(scrollY, [0, TOP_BAR_HEIGHT], [0, -TOP_BAR_HEIGHT]);
  const opacity = useTransform(scrollY, [0, TOP_BAR_HEIGHT], [1, 0]);

  return (
    <motion.div
      style={{ y, opacity, height: TOP_BAR_HEIGHT }}
      className="fixed top-0 left-0 right-0 z-[60] bg-amber-600 text-white flex items-center justify-between px-6 md:px-12 lg:px-20 overflow-hidden"
    >
      <div className="flex items-center gap-3">
        {/* Pulsing Dot */}
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
        </span>
        <p className="text-[0.65rem] md:text-[0.75rem] font-bold tracking-wider uppercase whitespace-nowrap flex items-center gap-2">
          <div className="bg-slate-900/20 p-1.5 px-3 rounded-full">Now Selling</div> <span className="font-medium normal-case opacity-90">Close Range Estate, Wuse II, Abuja</span>
        </p>
      </div>

      <a 
        href="#project" 
        className="text-[0.6rem] md:text-[0.7rem] font-bold uppercase tracking-tighter border-b border-white/40 hover:border-white transition-colors no-underline"
      >
        Learn More
      </a>
    </motion.div>
  );
}

/* ─── NAVBAR (HEADROOM EFFECT) ────────────────────────── */
function Navbar({ setSidebarOpen }: NavbarProps) {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    // Headroom Logic
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
    setScrolled(latest > 50);
  });

  // Adjust the navbar's starting position based on the Top Bar
  const navTop = useTransform(scrollY, [0, TOP_BAR_HEIGHT], [TOP_BAR_HEIGHT, 0]);

  return (
    <motion.header
      style={{ 
        height: `${NAV_HEIGHT}px`,
        top: navTop 
      }}
      variants={{
        visible: { y: 0 },
        hidden: { y: "-150%" }, // Extra offset to clear the top bar
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={`fixed left-0 right-0 z-50 flex items-center justify-between
        px-6 md:px-12 lg:px-20 transition-all duration-500
        ${scrolled
          ? "bg-[#050505]/95 backdrop-blur-lg border-b border-white/5"
          : "bg-transparent"
        }`}
    >
      <a href="#home" className="flex items-center gap-3 no-underline whitespace-nowrap">
        <img src={logo_only} alt="Logo" className="h-8 md:h-9 object-contain" />
        <span className="text-white text-lg md:text-xl font-semibold tracking-wide flex items-center gap-1.5 max-sm:hidden">
          Askariot <span className="text-amber-500">Homes</span> LTD
        </span>
      </a>

      <nav className="hidden lg:flex items-center gap-10">
        {navLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="text-white/70 hover:text-amber-500 text-[0.72rem] font-medium
              tracking-widest uppercase transition-colors duration-300 no-underline"
          >
            {link.label}
          </a>
        ))}
      </nav>

      <div className="flex items-center gap-4">
        <a
          href="#contact"
          className="hidden md:flex items-center gap-2 border border-white
            text-white hover:bg-white hover:text-black px-6 py-2 text-[0.7rem]
            font-bold tracking-widest uppercase transition-all duration-300 no-underline rounded-sm"
        >
          <Phone size={13} />
          Book a Call
        </a>

        <button
          onClick={() => setSidebarOpen(true)}
          className="lg:hidden text-white p-1 bg-transparent border-0 cursor-pointer"
        >
          <Menu size={28} />
        </button>
      </div>
    </motion.header>
  )
}

/* ─── SIDEBAR ─────────────────────────────────────────── */
function Sidebar({ open, onClose }: SidebarProps) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-[200]"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.4 }}
            className="fixed top-0 right-0 bottom-0 z-[300] w-[min(380px,85vw)]
              bg-[#080808] border-l border-white/5 flex flex-col p-10"
          >
            <div className="flex items-center justify-between mb-16">
              <span className="text-white font-serif text-xl font-semibold whitespace-nowrap">
                Askariot Homes <span className="text-amber-500">LTD</span>
              </span>
              <button onClick={onClose} className="text-white bg-transparent border-0 cursor-pointer">
                <X size={24} />
              </button>
            </div>

            <nav className="flex flex-col gap-1">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={onClose}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center justify-between text-white/80 no-underline
                    text-xs font-medium tracking-widest uppercase py-6
                    border-b border-white/5 hover:text-amber-500 transition-colors"
                >
                  <span className="flex items-center gap-3">
                    {link.label}
                  </span>
                  <ArrowRight size={14} className="text-amber-500" />
                </motion.a>
              ))}
            </nav>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}

/* ─── HERO ──────────────────────────────────────────── */
function Hero() {
  return (
    <section
      id="home"
      style={{ paddingTop: `${NAV_HEIGHT + TOP_BAR_HEIGHT - 50}px` }}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-[#050505]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#121212_0%,#050505_100%)] z-[1]" />
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.03 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[2]
          font-serif font-bold text-white select-none whitespace-nowrap brightness-[1000]
          w-9/12 pointer-events-none"
      >
        <img src={logo} alt='arko' />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="absolute bottom-0 right-0 z-[3] hidden lg:block rounded-xl
          lg:w-[55%] xl:w-[45%] max-h-[85vh] pointer-events-none"
      >
        <img
          src={heroImg}
          alt="Luxury Home"
          className="w-full h-auto object-contain object-right-bottom brightness-90 contrast-110"
        />
      </motion.div>

      <div className="relative z-[10] px-6 md:px-16 lg:px-28 w-full">
        <div className="max-w-[750px] mx-auto lg:mx-0 text-center lg:text-left">
          <div className="hidden max-sm:block">
            <img src={logo_amber} alt="Logo" className="h-18 object-contain mb-4" />
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-amber-500 text-[0.7rem] font-bold tracking-[0.4em] uppercase mb-6"
          >
            Redefining Residential Living
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-serif font-bold text-white leading-[1.1] tracking-tight mb-8
              text-[clamp(2.5rem,7vw,5.5rem)]"
          >
            Luxury Homes,<br />
            <span className="text-amber-500 italic font-medium">Thoughtfully Built</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-white/50 leading-relaxed mb-12 max-w-[550px] mx-auto lg:mx-0 text-[clamp(1rem,1.2vw,1.1rem)]"
          >
            From concept to completion, Askariot Homes delivers bespoke residential 
            architecture with precision, elegance, and enduring quality.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row flex-wrap justify-center lg:justify-start gap-5"
          >
            <a href="#project" className="bg-amber-500 text-black px-12 py-4 text-[0.75rem] font-bold tracking-widest uppercase no-underline rounded-sm hover:bg-white hover:text-black transition-all duration-300">
              View Projects
            </a>
            <a href="#about" className="border border-white/10 text-white px-12 py-4 text-[0.75rem] font-bold tracking-widest uppercase no-underline rounded-sm hover:border-amber-500 hover:text-amber-500 transition-all duration-300">
              About Us
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/* ─── ABOUT SECTION ───────────────────────────────────── */
function About() {
  const stats = [
    { value: "15+", label: "Years Experience" },
    { value: "400+", label: "Homes Built" },
    { value: "100%", label: "Precision" },
  ]

  return (
    <section id="about" className="bg-[#080808] py-32 px-6 md:px-16 lg:px-28 relative overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center lg:text-left"
        >
          <span className="text-amber-500 text-[0.7rem] font-bold tracking-widest uppercase mb-4 block">001. The Vision</span>
          <h2 className="font-serif text-4xl md:text-6xl text-white mb-8">Crafting Legacies in <span className="italic text-amber-500">Architecture</span></h2>
          <p className="text-white/50 text-lg leading-relaxed mb-10 max-w-[500px] mx-auto lg:mx-0">
            Founded with a vision to redefine residential living, Askariot Homes LTD
            blends innovative architecture with functional design.
          </p>
          <div className="flex justify-center lg:justify-start gap-12">
            {stats.map((s, i) => (
              <div key={i}>
                <div className="text-3xl font-serif text-white mb-1">{s.value}</div>
                <div className="text-[0.65rem] text-amber-500 uppercase tracking-widest">{s.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative aspect-square bg-[#111] border rounded-2xl border-white/5 overflow-hidden hidden md:block"
        >
           <div className="absolute inset-0 flex items-center justify-center text-white/5 font-serif text-9xl w-full h-full">
           <img src={img} alt="" className="w-full h-full object-cover opacity-80" />
           </div>
           <div className="absolute bottom-10 left-10 border-l-2 border-amber-500 pl-6">
             <p className="text-white italic text-xl">"Building the backdrop of your life."</p>
           </div>
        </motion.div>
      </div>
    </section>
  )
}

/* ─── MAIN APP ────────────────────────────────────────── */
export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="bg-[#050505] min-h-screen text-white selection:bg-amber-500 selection:text-black">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,500;1,600&family=DM+Sans:wght@400;500;700&display=swap');
        .font-serif { font-family: 'Cormorant Garamond', serif !important; }
        body { font-family: 'DM Sans', sans-serif; background: #050505; }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: #050505; }
        ::-webkit-scrollbar-thumb { background: #f59e0b; border-radius: 10px; }
      `}</style>

      <NowSellingBar />
      <Navbar setSidebarOpen={setSidebarOpen} />
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <main>
        <Hero />
        <About />
      </main>

      <footer className="py-20 px-6 border-t border-white/5 text-center">
        <p className="text-white/30 text-xs tracking-widest uppercase">
          © 2026 Askariot Homes LTD. All Rights Reserved.
        </p>
      </footer>
    </div>
  )
}