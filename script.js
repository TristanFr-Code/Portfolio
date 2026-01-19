/* =========================================
   1. CONFIGURATION
   ========================================= */
const config = {
    theme: 'frutiger',
    liquid: {
        turbulence: 0.015,
        displacementScale: 20,
        speed: 0.002
    },
    animation: {
        path: 'https://assets10.lottiefiles.com/packages/lf20_w51pcehl.json', // Robot Animation
        loop: true,
        autoplay: true
    }
};

/* =========================================
   2. DOM ELEMENTS & INITIALIZATION
   ========================================= */
document.addEventListener('DOMContentLoaded', () => {
    initLiquidEffect();
    initLottie();
    highlightActiveLink();
    initMusicPlayer();
    initChatbot();

    if (window.location.pathname.includes('showcase.html')) {
        loadShowcaseData();
    }
});

/* =========================================
   3. DATA LOADING (Showcase)
   ========================================= */
/* =========================================
   3. DATA LOADING (Showcase)
   ========================================= */

// Données intégrées directement pour éviter les problèmes CORS en local (file://)
const SITE_DATA = {
    "showcase": [
        {
            "id": 1,
            "title": "Pack Vitrine",
            "type": "Site Web Professionnel",
            "description": "Un site moderne et responsive pour présenter votre activité. Design sur-mesure, optimisé mobile et SEO local.",
            "image": "assets/formules/frutiger_web.png"
        },
        {
            "id": 2,
            "title": "Pack Automatisation",
            "type": "Site Web + Chatbot IA",
            "description": "Votre site vitrine équipé d'un chatbot intelligent qui répond à vos clients 24h/24 et prend les commandes.",
            "image": "assets/formules/frutiger_chatbot.png"
        },
        {
            "id": 3,
            "title": "Pack Business 360",
            "type": "Site + Chatbot + Assistant Vocal",
            "description": "La solution complète : site web, chatbot écrit ET assistant vocal IA pour ne rater aucun appel ni message.",
            "image": "assets/formules/frutiger_business.png"
        }
    ],
    "ia_formules": [
        {
            "id": 1,
            "title": "Chatbot IA",
            "type": "Assistant Écrit 24/7",
            "description": "Un chatbot intelligent sur votre site qui répond instantanément à vos clients, prend les commandes et qualifie les prospects.",
            "image": "assets/formules/frutiger_chatbot.png",
            "icon": "💬"
        },
        {
            "id": 2,
            "title": "Assistant Vocal IA",
            "type": "Standard Téléphonique Intelligent",
            "description": "Ne ratez plus aucun appel ! Notre IA répond au téléphone, prend les messages et transfère les urgences.",
            "image": "assets/formules/frutiger_vocal.png",
            "icon": "🎙️"
        },
        {
            "id": 3,
            "title": "Agent Prospection",
            "type": "Automatisation Commerciale",
            "description": "Notre IA trouve et qualifie vos prospects automatiquement. Génération de leads sur pilote automatique.",
            "image": "assets/formules/frutiger_prospect.png",
            "icon": "🎯"
        },
        {
            "id": 4,
            "title": "Agent Prise de RDV",
            "type": "Secrétariat Automatisé",
            "description": "Automatisez votre agenda : notre IA gère les prises de rendez-vous, confirmations et rappels sans intervention humaine.",
            "image": "assets/formules/frutiger_calendar.png",
            "icon": "📅"
        }
    ]
};

async function loadShowcaseData() {
    const grid = document.getElementById('showcase-grid');
    const iaGrid = document.getElementById('ia-formules-grid');

    try {
        // Simulation d'un délai pour l'effet (optionnel)
        // await new Promise(r => setTimeout(r, 100));

        const data = SITE_DATA; // Utilisation des données locales

        // Charger les packs web
        if (grid && data.showcase && data.showcase.length > 0) {
            grid.innerHTML = ''; // Clear loading

            data.showcase.forEach(project => {
                const card = document.createElement('div');
                card.className = 'card glass-panel';
                card.innerHTML = `
                    <div style="height: 150px; overflow: hidden; border-radius: 15px; margin-bottom: 20px;">
                        <img src="${project.image}" alt="${project.title}" style="width: 100%; height: 100%; object-fit: cover;">
                    </div>
                    <h3>${project.title}</h3>
                    <p class="highlight" style="font-weight: bold; font-size: 0.9em; text-transform: uppercase;">${project.type}</p>
                    <p>${project.description}</p>
                    <a href="index.html#contact" class="aero-btn" style="margin-top: 15px; padding: 8px 20px; font-size: 0.9rem;">Choisir ce pack</a>
                `;
                grid.appendChild(card);
            });
        } else if (grid) {
            grid.innerHTML = '<p>Aucun projet à afficher pour le moment.</p>';
        }

        // Charger les formules IA
        if (iaGrid && data.ia_formules && data.ia_formules.length > 0) {
            iaGrid.innerHTML = ''; // Clear loading

            data.ia_formules.forEach(formule => {
                const card = document.createElement('div');
                card.className = 'card glass-panel';
                card.innerHTML = `
                    <div style="height: 120px; overflow: hidden; border-radius: 15px; margin-bottom: 15px; position: relative;">
                        <img src="${formule.image}" alt="${formule.title}" style="width: 100%; height: 100%; object-fit: cover;">
                        <div style="position: absolute; top: 10px; left: 10px; font-size: 2rem;">${formule.icon}</div>
                    </div>
                    <h3>${formule.title}</h3>
                    <p class="highlight" style="font-weight: bold; font-size: 0.85em; text-transform: uppercase;">${formule.type}</p>
                    <p style="font-size: 0.95em;">${formule.description}</p>
                    <a href="index.html#contact" class="aero-btn" style="margin-top: 15px; padding: 8px 20px; font-size: 0.9rem;">En savoir plus</a>
                `;
                iaGrid.appendChild(card);
            });
        } else if (iaGrid) {
            iaGrid.innerHTML = '<p>Aucune formule IA à afficher pour le moment.</p>';
        }

    } catch (error) {
        console.error('Erreur chargement données:', error);
        if (grid) grid.innerHTML = '<p>Erreur de chargement des projets. Veuillez réessayer.</p>';
        if (iaGrid) iaGrid.innerHTML = '<p>Erreur de chargement des formules IA.</p>';
    }
}

/* =========================================
   4. LIQUID EFFECT (SVG / GSAP)
   ========================================= */
function initLiquidEffect() {
    const turbulence = document.querySelector('feTurbulence');
    const displacement = document.querySelector('feDisplacementMap');
    const navBar = document.getElementById('navBar');

    if (!turbulence || !displacement || !navBar) return;

    let time = 0;

    function animateLiquid() {
        time += config.liquid.speed;
        const bFx = config.liquid.turbulence + Math.sin(time) * 0.005;
        const bFy = config.liquid.turbulence + Math.cos(time) * 0.005;
        turbulence.setAttribute('baseFrequency', `${bFx} ${bFy}`);
        requestAnimationFrame(animateLiquid);
    }
    animateLiquid();

    // Mouse Interaction
    navBar.addEventListener('mousemove', (e) => {
        const rect = navBar.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const intensity = 10 + (Math.abs(x) / 10);

        gsap.to(displacement, {
            attr: { scale: intensity },
            duration: 0.5,
            ease: "power2.out"
        });
    });

    navBar.addEventListener('mouseleave', () => {
        gsap.to(displacement, {
            attr: { scale: config.liquid.displacementScale },
            duration: 1,
            ease: "elastic.out(1, 0.5)"
        });
    });
}

/* =========================================
   5. MUSIC PLAYER LOGIC (Playlist)
   ========================================= */
function initMusicPlayer() {
    const audio = document.getElementById('bgMusic');
    const player = document.getElementById('musicPlayer');
    const btn = document.getElementById('playPauseBtn');
    const titleEl = document.querySelector('.music-title');

    if (!audio || !player || !btn) return;

    // Playlist de morceaux
    const playlist = [
        { src: 'assets/audio/bg-music.mp3', title: 'Takeshi Abo - Lightgreen' },
        { src: 'assets/audio/Takeshi Abo - The past and now (LEASE).mp3', title: 'Takeshi Abo - The Past and Now' }
    ];

    // Récupérer l'état sauvegardé
    let currentTrack = parseInt(localStorage.getItem('currentTrack') || 0);
    if (currentTrack >= playlist.length) currentTrack = 0;

    // Fonction pour charger un morceau
    function loadTrack(index) {
        if (index >= playlist.length) index = 0;
        currentTrack = index;
        audio.src = playlist[index].src;
        if (titleEl) titleEl.textContent = playlist[index].title;
        localStorage.setItem('currentTrack', index);
    }

    // Charger le morceau actuel
    loadTrack(currentTrack);

    // Persist state across pages
    const isPlaying = localStorage.getItem('musicPlaying') === 'true';
    const currentTime = parseFloat(localStorage.getItem('musicTime') || 0);

    audio.currentTime = currentTime;

    if (isPlaying) {
        const playPromise = audio.play();
        if (playPromise !== undefined) {
            playPromise.then(() => {
                player.classList.add('playing');
                btn.innerText = '⏸';
            }).catch(error => {
                console.log("Autoplay bloqué, attend l'interaction user.");
            });
        }
    } else {
        player.classList.remove('playing');
        btn.innerText = '▶';
    }

    // Quand un morceau se termine, passer au suivant
    audio.addEventListener('ended', () => {
        const nextTrack = (currentTrack + 1) % playlist.length;
        loadTrack(nextTrack);
        localStorage.setItem('musicTime', 0);
        audio.play().then(() => {
            player.classList.add('playing');
            btn.innerText = '⏸';
        }).catch(e => console.error("Erreur lecture:", e));
    });

    btn.addEventListener('click', () => {
        if (audio.paused) {
            audio.play().catch(e => console.error("Erreur lecture:", e));
            player.classList.add('playing');
            btn.innerText = '⏸';
            localStorage.setItem('musicPlaying', 'true');
        } else {
            audio.pause();
            player.classList.remove('playing');
            btn.innerText = '▶';
            localStorage.setItem('musicPlaying', 'false');
        }
    });

    // Bouton morceau suivant
    const nextBtn = document.getElementById('nextTrackBtn');
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            const nextTrack = (currentTrack + 1) % playlist.length;
            loadTrack(nextTrack);
            localStorage.setItem('musicTime', 0);
            audio.play().then(() => {
                player.classList.add('playing');
                btn.innerText = '⏸';
                localStorage.setItem('musicPlaying', 'true');
            }).catch(e => console.error("Erreur lecture:", e));
        });
    }

    // Error handling
    audio.addEventListener('error', (e) => {
        console.error("L'audio n'a pas pu être chargé:", e);
        // Essayer le morceau suivant en cas d'erreur
        const nextTrack = (currentTrack + 1) % playlist.length;
        loadTrack(nextTrack);
    });

    // Save current time before unloading
    window.addEventListener('beforeunload', () => {
        localStorage.setItem('musicTime', audio.currentTime);
    });

    // Update time periodically
    setInterval(() => {
        if (!audio.paused) {
            localStorage.setItem('musicTime', audio.currentTime);
        }
    }, 1000);
}

/* =========================================
   6. UTILS
   ========================================= */
function initLottie() {
    const container = document.getElementById('lottie-animation');
    if (container) {
        bodymovin.loadAnimation({
            container: container,
            renderer: 'svg',
            loop: config.animation.loop,
            autoplay: config.animation.autoplay,
            path: config.animation.path
        });
    }
}

function highlightActiveLink() {
    const links = document.querySelectorAll('.nav-links a');
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';

    links.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (linkPath === currentPath) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

/* =========================================
   7. CHATBOT LOGIC
   ========================================= */
function initChatbot() {
    const chatInput = document.getElementById('chatInput');
    const chatSendBtn = document.getElementById('chatSendBtn');
    const chatMessages = document.getElementById('chatMessages');

    if (!chatInput || !chatSendBtn || !chatMessages) return;

    const N8N_WEBHOOK_URL = 'https://jukesjulesiuj.app.n8n.cloud/webhook/e6408b9d-b962-4dca-a099-0854b2cfd62d';

    // Persistent session ID for memory - stored in localStorage
    let sessionId = localStorage.getItem('horizonweb_session_id');
    if (!sessionId) {
        sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        localStorage.setItem('horizonweb_session_id', sessionId);
    }
    console.log('Session ID:', sessionId);

    // Send message function
    async function sendMessage() {
        const message = chatInput.value.trim();
        if (!message) return;

        // Add user message to chat
        addMessage(message, 'user');
        chatInput.value = '';

        // Show typing indicator
        const typingId = showTypingIndicator();

        try {
            // Send to n8n webhook with AI Agent
            const response = await fetch(N8N_WEBHOOK_URL, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({
                    chatInput: message,
                    message: message,
                    sessionId: sessionId,
                    timestamp: new Date().toISOString(),
                    source: 'horizonweb-chat'
                })
            });

            // Remove typing indicator
            removeTypingIndicator(typingId);

            console.log('Response status:', response.status);
            console.log('Response headers:', response.headers);

            if (response.ok) {
                // Try to parse as JSON first
                const responseText = await response.text();
                console.log('Raw response:', responseText);

                let botMessage = '';

                try {
                    const data = JSON.parse(responseText);
                    console.log('Parsed JSON:', data);

                    // Handle array response (n8n often returns arrays)
                    if (Array.isArray(data) && data.length > 0) {
                        const firstItem = data[0];
                        botMessage = firstItem.output || firstItem.response || firstItem.message || firstItem.text || JSON.stringify(firstItem);
                    }
                    // Handle object response
                    else if (typeof data === 'object' && data !== null) {
                        botMessage = data.output || data.response || data.message || data.text || data.content || '';

                        // Check for nested output
                        if (!botMessage && data.data) {
                            botMessage = data.data.output || data.data.response || data.data.message || '';
                        }

                        if (!botMessage) {
                            botMessage = JSON.stringify(data);
                        }
                    }
                    // Handle string response
                    else if (typeof data === 'string') {
                        botMessage = data;
                    }
                    else {
                        botMessage = responseText;
                    }
                } catch (jsonError) {
                    console.log('Not JSON, using raw text');
                    botMessage = responseText;
                }

                if (botMessage && botMessage.trim() !== '') {
                    addMessage(botMessage, 'bot');
                } else {
                    addMessage("Message reçu ! Notre équipe vous répondra bientôt.", 'bot');
                }
            } else {
                console.error('Erreur HTTP:', response.status, response.statusText);
                const errorText = await response.text();
                console.error('Error body:', errorText);
                addMessage("Désolé, une erreur est survenue. Réessayez ou appelez le 07 67 07 91 14.", 'bot');
            }
        } catch (error) {
            console.error('Erreur chatbot complète:', error);
            console.error('Error name:', error.name);
            console.error('Error message:', error.message);
            removeTypingIndicator(typingId);

            // CORS error or network error
            addMessage("Désolé, je rencontre un problème technique. Appelez-nous au 07 67 07 91 14.", 'bot');
        }
    }

    // Add message to chat
    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;

        const avatar = document.createElement('div');
        avatar.className = 'message-avatar';
        avatar.textContent = sender === 'user' ? '👤' : '🤖';

        const content = document.createElement('div');
        content.className = 'message-content';
        content.textContent = text;

        messageDiv.appendChild(avatar);
        messageDiv.appendChild(content);
        chatMessages.appendChild(messageDiv);

        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Show typing indicator
    function showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message bot-message';
        typingDiv.id = 'typing-indicator-' + Date.now();

        const avatar = document.createElement('div');
        avatar.className = 'message-avatar';
        avatar.textContent = '🤖';

        const indicator = document.createElement('div');
        indicator.className = 'message-content typing-indicator';
        indicator.innerHTML = '<span></span><span></span><span></span>';

        typingDiv.appendChild(avatar);
        typingDiv.appendChild(indicator);
        chatMessages.appendChild(typingDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;

        return typingDiv.id;
    }

    // Remove typing indicator
    function removeTypingIndicator(id) {
        const indicator = document.getElementById(id);
        if (indicator) {
            indicator.remove();
        }
    }

    // Event listeners
    chatSendBtn.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
}

