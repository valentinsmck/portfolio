import React, { useState, useEffect, useRef } from 'react';
import {
    Code,
    Database,
    Terminal,
    Cpu,
    Globe,
    Server,
    Layout,
    BookOpen,
    Github,
    Linkedin,
    Mail,
    ExternalLink,
    Menu,
    X,
    ChevronRight,
    Search,
    Monitor,
    FileText,
    FileUser
} from 'lucide-react';

// --- COMPOSANT PARTICLES (Fait maison pour la performance) ---
const ParticlesBackground = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        // Configuration
        let particles = [];
        const particleCount = 70; // Nombre de particules
        const connectionDistance = 150; // Distance pour les lignes

        // Resize du canvas
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        // Classe Particule
        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.vx = (Math.random() - 0.5) * 0.5; // Vitesse X lente
                this.vy = (Math.random() - 0.5) * 0.5; // Vitesse Y lente
                this.size = Math.random() * 2 + 1;
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                // Rebondir sur les bords
                if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
                if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(56, 189, 248, 0.5)'; // Bleu cyan clair
                ctx.fill();
            }
        }

        // Initialisation
        const init = () => {
            particles = [];
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }
        };

        // Boucle d'animation
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Mise à jour et dessin des points
            particles.forEach(particle => {
                particle.update();
                particle.draw();
            });

            // Dessin des lignes (constellation)
            particles.forEach((a, index) => {
                for (let i = index + 1; i < particles.length; i++) {
                    const b = particles[i];
                    const dx = a.x - b.x;
                    const dy = a.y - b.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < connectionDistance) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(56, 189, 248, ${0.15 - distance / connectionDistance * 0.15})`; // Ligne très subtile
                        ctx.lineWidth = 1;
                        ctx.moveTo(a.x, a.y);
                        ctx.lineTo(b.x, b.y);
                        ctx.stroke();
                    }
                }
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        init();
        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed top-0 left-0 w-full h-full -z-10 bg-slate-950 pointer-events-none"
        />
    );
};

// --- COMPOSANT PRINCIPAL ---
const Portfolio = () => {
    const [activeTab, setActiveTab] = useState('accueil');
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Données de navigation
    const navItems = [
        { id: 'accueil', label: 'Accueil' },
        { id: 'projets', label: 'Projets' },
        { id: 'veille', label: 'Veille' },
        { id: 'competences', label: 'Compétences' },
    ];

    // Données des langages & frameworks (Logos SVG)
    const languages = [
        { name: 'HTML', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
        { name: 'CSS', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
        { name: 'PHP', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg' },
        { name: 'Java', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
        { name: 'JavaScript', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
        { name: 'SQL', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
        { name: 'Laravel', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg' },
        { name: 'Python', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
    ];

    // Données de l'environnement de travail (Logos SVG)
    const tools = [
        { name: 'Windows 10/11', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/windows8/windows8-original.svg' },
        { name: 'Linux Debian', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/debian/debian-original.svg' },
        { name: 'Linux Ubuntu', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ubuntu/ubuntu-original.svg' },
        { name: 'IntelliJ IDEA', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/intellij/intellij-original.svg' },
        { name: 'PHPStorm', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/phpstorm/phpstorm-original.svg' },
        { name: 'WebStorm', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/webstorm/webstorm-original.svg' },
        { name: 'Git', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
        { name: 'GitHub', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg', invert: true }, // Invert pour fond noir
        { name: 'VS Code', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg' },
        { name: 'Figma', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg' },
        { name: 'VMware', logo: 'https://cdn.simpleicons.org/vmware/white' }, // Utilisation de SimpleIcons pour VMware
    ];

    // Données des projets (Mock)
    const projects = [
        {
            id: 1,
            title: 'Gestion de Parc',
            desc: 'Application lourde en Java pour gérer un parc informatique.',
            image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
            link: '/docs/projet-parc.pdf'
        },
        {
            id: 2,
            title: 'Site E-commerce',
            desc: 'Site web dynamique PHP/MySQL avec panier et administration.',
            image: 'https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
            link: '/docs/projet-ecommerce.pdf'
        },
        {
            id: 3,
            title: 'GLPI Deployment',
            desc: 'Mise en place d\'un serveur GLPI sur une machine virtuelle Debian.',
            image: 'https://images.unsplash.com/photo-1558494949-ef526b0042a0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
            link: '/docs/documentation-glpi.pdf'
        },
        {
            id: 4,
            title: 'App Mobile Android',
            desc: 'Application de suivi de tâches réalisée sous Android Studio.',
            image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
            link: '/docs/app-mobile.pdf'
        },
    ];

    // Données de la veille (Mock)
    const veilleItems = [
        {
            id: 1,
            title: "L'IA Générative dans le code",
            date: "15 Déc 2024",
            summary: "Analyse de l'impact de Copilot et ChatGPT sur la productivité des développeurs juniors.",
            tags: ["Intelligence Artificielle", "Dev", "Futur"]
        },
        {
            id: 2,
            title: "Cybersécurité : Zero Trust",
            date: "02 Nov 2024",
            summary: "Pourquoi l'architecture Zero Trust devient la norme dans les entreprises modernes.",
            tags: ["Sécurité", "Réseau", "Entreprise"]
        },
        {
            id: 3,
            title: "L'évolution de Java 21",
            date: "10 Oct 2024",
            summary: "Les nouveautés majeures : Virtual Threads et Pattern Matching.",
            tags: ["Langage", "Java", "Backend"]
        }
    ];

    const renderContent = () => {
        switch (activeTab) {
            case 'accueil':
                return (
                    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center animate-fadeIn space-y-8 z-10">
                        <div className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-400 rounded-full blur opacity-50 group-hover:opacity-100 transition duration-1000"></div>
                            <div className="relative w-32 h-32 md:w-48 md:h-48 bg-slate-900 rounded-full flex items-center justify-center border-2 border-slate-700 overflow-hidden shadow-2xl">
                                {/* Placeholder pour photo étudiant */}
                                <span className="text-4xl text-blue-500"><Code size={64} /></span>
                            </div>
                        </div>

                        <div className="space-y-4 max-w-2xl px-4 backdrop-blur-sm bg-slate-900/30 p-6 rounded-2xl border border-slate-800/50">
                            <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-cyan-400 to-white pb-2">
                                Étudiant BTS SIO
                            </h1>
                            <p className="text-xl md:text-2xl text-slate-300 font-light tracking-wide">
                                Option SLAM
                            </p>
                            <p className="text-slate-400 leading-relaxed font-medium">
                                Développement d'applications • Administration Système • Cybersécurité
                            </p>
                        </div>

                        <div className="flex space-x-4 mt-8">
                            <a
                                href="/docs/tableau-synthese.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-bold transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(37,99,235,0.5)] flex items-center border border-blue-400 cursor-pointer no-underline"
                            >
                                Tableau synthèse <FileText className="ml-2" size={20} />
                            </a>
                            <a
                                href="/docs/mon-cv.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-8 py-3 bg-transparent hover:bg-slate-800/80 text-blue-400 border border-blue-500/50 rounded-lg font-medium transition-all backdrop-blur-md flex items-center justify-center gap-2 cursor-pointer no-underline"
                            >
                                Mon CV <FileUser size={20} />
                            </a>
                        </div>
                    </div>
                );

            case 'projets':
                return (
                    <div className="animate-fadeIn p-4">
                        <h2 className="text-3xl font-bold text-white mb-8 border-l-4 border-blue-500 pl-4 bg-gradient-to-r from-slate-900/80 to-transparent py-2 backdrop-blur-sm">Mes Projets</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {projects.map((project) => (
                                <div key={project.id} className="group relative bg-slate-900/80 backdrop-blur-md rounded-2xl overflow-hidden hover:shadow-[0_0_30px_rgba(59,130,246,0.2)] transition-all duration-300 border border-slate-700/50 hover:border-blue-500/50 aspect-square flex flex-col">
                                    {/* Image Background with Overlay */}
                                    <div className="h-1/2 overflow-hidden relative border-b border-slate-700/50">
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent z-10"></div>
                                        <img
                                            src={project.image}
                                            alt={project.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                                        />
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 p-6 flex flex-col justify-between z-20">
                                        <div>
                                            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">{project.title}</h3>
                                            <p className="text-slate-400 text-sm line-clamp-3">{project.desc}</p>
                                        </div>
                                        <a
                                            href={project.link}
                                            className="mt-4 w-full py-2 bg-slate-800 hover:bg-blue-600 text-white text-center rounded-lg transition-all text-sm font-semibold flex items-center justify-center gap-2 border border-slate-700 hover:border-blue-500 shadow-lg"
                                        >
                                            Accéder au dossier <ExternalLink size={14} />
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );

            case 'veille':
                return (
                    <div className="animate-fadeIn p-4 max-w-4xl mx-auto">
                        <div className="flex justify-between items-end mb-8 border-b border-slate-700/50 pb-4 bg-slate-900/50 p-4 rounded-t-xl backdrop-blur-sm">
                            <div>
                                <h2 className="text-3xl font-bold text-white border-l-4 border-blue-500 pl-4">Veille Technologique</h2>
                                <p className="text-slate-400 mt-2 pl-4">Sujet : <span className="text-blue-400 font-semibold">Intelligence Artificielle & Dev</span></p>
                            </div>
                            <Search className="text-blue-500 mb-2 opacity-80" />
                        </div>

                        <div className="space-y-6">
                            {veilleItems.map((item) => (
                                <div key={item.id} className="bg-slate-900/60 backdrop-blur-md p-6 rounded-xl border border-slate-700/50 hover:border-blue-500/50 transition-all hover:bg-slate-800/80 group">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                                        <h3 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors">{item.title}</h3>
                                        <span className="text-sm text-blue-400 font-mono bg-blue-900/20 border border-blue-900/50 px-3 py-1 rounded mt-2 md:mt-0 w-fit">{item.date}</span>
                                    </div>
                                    <p className="text-slate-300 mb-4">{item.summary}</p>
                                    <div className="flex flex-wrap gap-2">
                                        {item.tags.map((tag, idx) => (
                                            <span key={idx} className="text-xs text-slate-400 bg-slate-950 px-3 py-1 rounded-full border border-slate-800 group-hover:border-blue-500/30 transition-colors">
                        #{tag}
                      </span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );

            case 'competences':
                return (
                    <div className="animate-fadeIn p-4">
                        <h2 className="text-3xl font-bold text-white mb-8 border-l-4 border-blue-500 pl-4 bg-gradient-to-r from-slate-900/80 to-transparent py-2 backdrop-blur-sm">Langages & Frameworks</h2>

                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 mb-12">
                            {languages.map((lang, index) => (
                                <div key={index} className="bg-slate-900/60 backdrop-blur-md rounded-xl p-6 flex flex-col items-center justify-center text-center gap-4 hover:bg-slate-800/80 border border-slate-700/50 hover:border-blue-500 transition-all group cursor-default shadow-lg hover:shadow-blue-900/20">
                                    <div className="p-4 rounded-full bg-slate-950 border border-slate-800 group-hover:scale-110 transition-transform duration-300 shadow-[0_0_15px_rgba(0,0,0,0.5)]">
                                        <img src={lang.logo} alt={lang.name} className="w-12 h-12" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-white group-hover:text-blue-300 transition-colors">{lang.name}</h3>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-12 bg-slate-900/40 backdrop-blur-md border border-slate-700/50 rounded-xl p-8 relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50"></div>
                            <h3 className="text-xl font-bold text-white mb-6 text-center">Environnement de travail</h3>
                            <div className="flex flex-wrap justify-center gap-4">
                                {tools.map((tool, index) => (
                                    <div key={index} className="px-4 py-3 bg-slate-950/80 border border-slate-800 rounded-lg flex items-center gap-3 hover:border-blue-500/50 transition-colors group">
                      <span className="group-hover:scale-110 transition-transform duration-200">
                        <img
                            src={tool.logo}
                            alt={tool.name}
                            className={`w-5 h-5 ${tool.invert ? 'invert' : ''}`}
                        />
                      </span>
                                        <span className="text-slate-300 text-sm font-medium">{tool.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen text-slate-200 font-sans selection:bg-blue-500 selection:text-white relative">
            {/* Background Particles */}
            <ParticlesBackground />

            {/* Navigation Bar */}
            <nav className="fixed top-0 w-full bg-slate-950/80 backdrop-blur-lg border-b border-slate-800 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent hover:opacity-80 transition-opacity cursor-pointer">
                  PORTFOLIO.
                </span>
                            </div>
                        </div>

                        {/* Desktop Menu */}
                        <div className="hidden md:block">
                            <div className="ml-10 flex items-baseline space-x-4">
                                {navItems.map((item) => (
                                    <button
                                        key={item.id}
                                        onClick={() => setActiveTab(item.id)}
                                        className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                                            activeTab === item.id
                                                ? 'text-white bg-blue-600/20 border border-blue-500/50 shadow-[0_0_10px_rgba(37,99,235,0.2)]'
                                                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                                        }`}
                                    >
                                        {item.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Mobile menu button */}
                        <div className="md:hidden">
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none"
                            >
                                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden bg-slate-950 border-b border-slate-800">
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                            {navItems.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => {
                                        setActiveTab(item.id);
                                        setIsMenuOpen(false);
                                    }}
                                    className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${
                                        activeTab === item.id
                                            ? 'text-white bg-blue-600'
                                            : 'text-slate-300 hover:text-white hover:bg-slate-800'
                                    }`}
                                >
                                    {item.label}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </nav>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12 relative z-10">
                {renderContent()}
            </main>

            {/* Footer */}
            <footer className="bg-slate-950/90 backdrop-blur-md border-t border-slate-800 py-8 mt-auto relative z-10">
                <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-slate-500 text-sm">© 2024 - Étudiant BTS SIO</p>
                    <div className="flex space-x-6">
                        <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors"><Github size={20} /></a>
                        <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors"><Linkedin size={20} /></a>
                        <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors"><Mail size={20} /></a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Portfolio;