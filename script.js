// Données mobiles optimisées avec images
const mobileDemarches = [
    {
        id: 1,
        title: "Acte de naissance",
        category: "etat-civil",
        description: "Demande d'extrait d'acte de naissance avec filiation",
        icon: "fa-baby",
        delay: "3-5 jours",
        popular: true,
        cost: "Gratuit",
        bgClass: "service-bg-naissance"
    },
    {
        id: 2,
        title: "Acte de mariage",
        category: "etat-civil",
        description: "Extrait ou copie intégrale d'acte de mariage",
        icon: "fa-ring",
        delay: "3-5 jours",
        popular: true,
        cost: "Gratuit",
        bgClass: "service-bg-mariage"
    },
    {
        id: 3,
        title: "Carte d'identité",
        category: "etat-civil",
        description: "Renouvellement ou première demande de CNI",
        icon: "fa-id-card",
        delay: "15 jours",
        popular: true,
        cost: "25€",
        bgClass: "service-bg-cni"
    },
    {
        id: 4,
        title: "Permis de construire",
        category: "urbanisme",
        description: "Dépôt de demande de permis de construire",
        icon: "fa-home",
        delay: "2-3 mois",
        popular: false,
        cost: "Selon surface",
        bgClass: "service-bg-permis"
    },
    {
        id: 5,
        title: "Attestation de domicile",
        category: "divers",
        description: "Justificatif de résidence pour démarches",
        icon: "fa-file-signature",
        delay: "24h",
        popular: true,
        cost: "Gratuit",
        bgClass: "service-bg-domicile"
    },
    {
        id: 6,
        title: "Certificat d'urbanisme",
        category: "urbanisme",
        description: "Demande de certificat d'information",
        icon: "fa-file-contract",
        delay: "1 mois",
        popular: false,
        cost: "Gratuit",
        bgClass: "service-bg-urbanisme"
    },
    {
        id: 7,
        title: "Acte de décès",
        category: "etat-civil",
        description: "Demande d'extrait d'acte de décès",
        icon: "fa-cross",
        delay: "3-5 jours",
        popular: false,
        cost: "Gratuit",
        bgClass: "service-bg-deces"
    },
    {
        id: 8,
        title: "Déclaration de travaux",
        category: "urbanisme",
        description: "Déclaration préalable de travaux",
        icon: "fa-tools",
        delay: "1 mois",
        popular: false,
        cost: "Gratuit",
        bgClass: "service-bg-travaux"
    }
];

const mobileActualites = [
    {
        id: 1,
        title: "Nouveau plan de circulation",
        category: "communique",
        date: "15 Juin 2023",
        important: true,
        summary: "Mise en place d'un nouveau plan de circulation dans le centre-ville",
        bgClass: "news-bg-1"
    },
    {
        id: 2,
        title: "Consultation citoyenne",
        category: "communique",
        date: "10 Juin 2023",
        important: false,
        summary: "Participez à l'aménagement du parc municipal",
        bgClass: "news-bg-2"
    },
    {
        id: 3,
        title: "Équipements sportifs",
        category: "travaux",
        date: "5 Juin 2023",
        important: false,
        summary: "Inauguration des nouveaux équipements sportifs",
        bgClass: "news-bg-3"
    },
    {
        id: 4,
        title: "Festival des cultures",
        category: "evenement",
        date: "1 Juillet 2023",
        important: false,
        summary: "5ème édition du festival des cultures locales",
        bgClass: "news-bg-4"
    },
    {
        id: 5,
        title: "Modernisation éclairage",
        category: "travaux",
        date: "28 Mai 2023",
        important: false,
        summary: "Installation de 5000 lampadaires LED",
        bgClass: "news-bg-5"
    }
];

// Données pour le chat
const chatMessages = [
    {
        id: 1,
        type: "text",
        content: "Bonjour ! Je suis l'agent municipal. Comment puis-je vous aider aujourd'hui ?",
        sender: "agent",
        time: "14:30",
        date: "Aujourd'hui"
    }
];

const audioMessages = [
    {
        id: "audio1",
        duration: 45,
        url: "#",
        sender: "agent",
        time: "14:25",
        date: "Aujourd'hui"
    }
];

const fileMessages = [
    {
        id: "file1",
        name: "Formulaire_demarche.pdf",
        type: "pdf",
        size: "1.2MB",
        sender: "agent",
        time: "14:20",
        date: "Aujourd'hui"
    }
];

// État de l'application
let currentPage = 'accueil';
let isLoggedIn = false;
let currentUser = null;
let isMenuOpen = false;
let isDarkMode = false;
let isHighContrast = false;
let carouselCurrentSlide = 0;
let carouselInterval = null;
let idleTimeout = null;

// État du chat
let isRecording = false;
let recordingStartTime = null;
let recordingTimerInterval = null;
let currentAudio = null;
let isAudioPlaying = false;

// Initialisation
document.addEventListener('DOMContentLoaded', function() {
    initMobileNavigation();
    initBottomNav();
    initThemeToggle();
    initSearch();
    initDemarches();
    initActualites();
    initLogin();
    initModal();
    initCarousel();
    initAccordions();
    initEventListeners();
    initChat();
    initGeolocation();
    initServiceWorker();
    
    showPage('accueil');
    loadInitialData();
    checkSystemTheme();
    startIdleTimer();
    
    // Empêcher le swipe horizontal sur le contenu principal
    preventHorizontalScroll();
    
    // Cache les données pour le mode hors ligne
    saveOfflineData();
});

// Initialisation du chat
function initChat() {
    const chatInput = document.getElementById('chatTextInput');
    const sendBtn = document.getElementById('sendBtn');
    const attachmentBtn = document.getElementById('attachmentBtn');
    const voiceBtn = document.getElementById('voiceBtn');
    const attachmentMenu = document.getElementById('attachmentMenu');
    const recordingIndicator = document.getElementById('recordingIndicator');
    
    // Redimensionner automatiquement la zone de texte
    chatInput.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = (this.scrollHeight) + 'px';
    });
    
    // Envoyer le message avec Enter (sans Shift)
    chatInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendChatMessage();
        }
    });
    
    // Bouton d'envoi
    sendBtn.addEventListener('click', sendChatMessage);
    
    // Menu des pièces jointes
    attachmentBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        attachmentMenu.classList.toggle('active');
    });
    
    // Fermer le menu des pièces jointes en cliquant ailleurs
    document.addEventListener('click', function() {
        attachmentMenu.classList.remove('active');
    });
    
    // Enregistrement audio
    let isVoiceButtonPressed = false;
    let voiceButtonStartY = 0;
    
    voiceBtn.addEventListener('mousedown', startRecording);
    voiceBtn.addEventListener('touchstart', startRecording);
    
    document.addEventListener('mouseup', stopRecording);
    document.addEventListener('touchend', stopRecording);
    
    // Gestion du glissement pour annuler
    voiceBtn.addEventListener('touchmove', function(e) {
        if (isRecording) {
            const touch = e.touches[0];
            const deltaY = touch.clientY - voiceButtonStartY;
            
            if (deltaY > 50) {
                // Glissement vers le bas > annulation
                cancelRecording();
            }
        }
    });
    
    function startRecording(e) {
        e.preventDefault();
        isVoiceButtonPressed = true;
        voiceButtonStartY = e.type === 'touchstart' ? e.touches[0].clientY : e.clientY;
        
        // Démarrer l'enregistrement après 0.5 seconde d'appui
        setTimeout(() => {
            if (isVoiceButtonPressed) {
                startAudioRecording();
            }
        }, 500);
    }
    
    function stopRecording(e) {
        if (isRecording && isVoiceButtonPressed) {
            e.preventDefault();
            stopAudioRecording();
        }
        isVoiceButtonPressed = false;
    }
    
    function cancelRecording() {
        if (isRecording) {
            stopAudioRecording(true);
            isVoiceButtonPressed = false;
        }
    }
    
    // Charger les messages existants
    loadChatMessages();
}

function startAudioRecording() {
    if (isRecording) return;
    
    isRecording = true;
    recordingStartTime = Date.now();
    document.getElementById('voiceBtn').classList.add('recording');
    document.getElementById('recordingIndicator').classList.add('active');
    
    // Mettre à jour le timer
    updateRecordingTimer();
    recordingTimerInterval = setInterval(updateRecordingTimer, 1000);
    
    // Simuler l'enregistrement audio (dans un vrai projet, utiliser l'API Web Audio)
    console.log("Début de l'enregistrement audio...");
}

function stopAudioRecording(cancelled = false) {
    if (!isRecording) return;
    
    isRecording = false;
    clearInterval(recordingTimerInterval);
    document.getElementById('voiceBtn').classList.remove('recording');
    document.getElementById('recordingIndicator').classList.remove('active');
    
    const recordingDuration = Math.floor((Date.now() - recordingStartTime) / 1000);
    
    if (!cancelled && recordingDuration >= 1) {
        // Créer un message audio simulé
        const audioMessage = {
            id: 'audio_' + Date.now(),
            type: 'audio',
            duration: recordingDuration,
            sender: 'user',
            time: getCurrentTime(),
            date: 'Aujourd\'hui'
        };
        
        addMessageToChat(audioMessage);
        
        // Simuler une réponse après 2 secondes
        setTimeout(() => {
            const agentResponse = {
                id: Date.now(),
                type: 'text',
                content: getAgentResponse('Message audio reçu'),
                sender: 'agent',
                time: getCurrentTime(),
                date: 'Aujourd\'hui'
            };
            addMessageToChat(agentResponse);
        }, 2000);
    }
    
    console.log("Fin de l'enregistrement audio. Durée:", recordingDuration, "secondes");
}

function updateRecordingTimer() {
    if (!isRecording || !recordingStartTime) return;
    
    const elapsedSeconds = Math.floor((Date.now() - recordingStartTime) / 1000);
    const minutes = Math.floor(elapsedSeconds / 60).toString().padStart(2, '0');
    const seconds = (elapsedSeconds % 60).toString().padStart(2, '0');
    
    document.getElementById('recordingTimer').textContent = `${minutes}:${seconds}`;
    
    // Arrêter après 2 minutes
    if (elapsedSeconds >= 120) {
        stopAudioRecording();
    }
}

function sendChatMessage() {
    const chatInput = document.getElementById('chatTextInput');
    const message = chatInput.value.trim();
    
    if (!message) return;
    
    // Créer le message
    const userMessage = {
        id: Date.now(),
        type: 'text',
        content: message,
        sender: 'user',
        time: getCurrentTime(),
        date: 'Aujourd\'hui'
    };
    
    // Ajouter le message à l'interface
    addMessageToChat(userMessage);
    
    // Effacer le champ de saisie
    chatInput.value = '';
    chatInput.style.height = 'auto';
    
    // Simuler une réponse de l'agent après 1-3 secondes
    setTimeout(() => {
        const agentResponse = {
            id: Date.now() + 1,
            type: 'text',
            content: getAgentResponse(message),
            sender: 'agent',
            time: getCurrentTime(),
            date: 'Aujourd\'hui'
        };
        addMessageToChat(agentResponse);
    }, 1000 + Math.random() * 2000);
}

function getAgentResponse(message) {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('bonjour') || lowerMessage.includes('salut')) {
        return "Bonjour ! Comment puis-je vous aider aujourd'hui ?";
    } else if (lowerMessage.includes('merci')) {
        return "Je vous en prie ! N'hésitez pas si vous avez d'autres questions.";
    } else if (lowerMessage.includes('acte') && lowerMessage.includes('naissance')) {
        return "Pour un acte de naissance, vous pouvez faire la demande en ligne. Délai de traitement : 3-5 jours. Souhaitez-vous que je vous guide ?";
    } else if (lowerMessage.includes('cni') || lowerMessage.includes('carte d\'identité')) {
        return "Le renouvellement de la CNI prend environ 15 jours. Vous avez besoin de 2 photos d'identité et d'un justificatif de domicile.";
    } else if (lowerMessage.includes('urgence')) {
        return "Pour les urgences, composez le 1300 pour la police, le 18 pour les pompiers, ou le 15 pour l'hôpital.";
    } else if (lowerMessage.includes('rendez-vous')) {
        return "Vous pouvez prendre rendez-vous en ligne avec les services municipaux. Quel service vous intéresse ?";
    } else if (lowerMessage.includes('horaire')) {
        return "La mairie est ouverte du lundi au vendredi de 8h à 17h, et le samedi de 9h à 12h.";
    } else if (lowerMessage.includes('formulaire') || lowerMessage.includes('document')) {
        return "Je peux vous envoyer le formulaire nécessaire. Quel document recherchez-vous ?";
    } else {
        const responses = [
            "Je comprends votre demande. Je vais vérifier cela pour vous.",
            "Pouvez-vous me donner plus de détails sur votre situation ?",
            "Je peux vous orienter vers le service compétent. Quel est exactement votre besoin ?",
            "Pour cette question, je vous recommande de consulter la section dédiée sur notre portail.",
            "Je note votre demande et la transmets au service concerné. On vous recontactera sous 24h.",
            "Avez-vous déjà consulté notre FAQ ? Vous y trouverez peut-être une réponse rapide."
        ];
        return responses[Math.floor(Math.random() * responses.length)];
    }
}

function addMessageToChat(message) {
    const container = document.getElementById('chatMessagesContainer');
    const messageElement = createMessageElement(message);
    
    container.appendChild(messageElement);
    
    // Scroll vers le bas
    setTimeout(() => {
        container.scrollTop = container.scrollHeight;
    }, 100);
    
    // Sauvegarder le message
    chatMessages.push(message);
}

function createMessageElement(message) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${message.sender === 'user' ? 'sent' : 'received'}`;
    
    if (message.type === 'text') {
        messageDiv.innerHTML = `
            <div class="message-bubble">${message.content}</div>
            <div class="message-time">${message.time}</div>
        `;
    } else if (message.type === 'audio') {
        messageDiv.innerHTML = `
            <div class="message-audio">
                <div class="audio-player">
                    <button class="audio-play-btn" onclick="playAudio('${message.id}')">
                        <i class="fas fa-play"></i>
                    </button>
                    <div class="audio-progress">
                        <div class="audio-progress-bar" id="progress-${message.id}"></div>
                    </div>
                    <div class="audio-duration">${formatDuration(message.duration)}</div>
                </div>
            </div>
            <div class="message-time">${message.time}</div>
        `;
    } else if (message.type === 'file') {
        messageDiv.innerHTML = `
            <div class="message-file" onclick="downloadFile('${message.id}')">
                <div class="message-file-icon">
                    <i class="fas fa-file-pdf"></i>
                </div>
                <div class="message-file-info">
                    <div class="message-file-name">${message.name}</div>
                    <div class="message-file-size">${message.size}</div>
                </div>
            </div>
            <div class="message-time">${message.time}</div>
        `;
    }
    
    return messageDiv;
}

function loadChatMessages() {
    const container = document.getElementById('chatMessagesContainer');
    container.innerHTML = '';
    
    // Ajouter les messages existants
    chatMessages.forEach(message => {
        const messageElement = createMessageElement(message);
        container.appendChild(messageElement);
    });
    
    // Ajouter des messages audio et fichiers de démonstration
    audioMessages.forEach(audio => {
        const audioElement = createMessageElement({
            ...audio,
            type: 'audio'
        });
        container.appendChild(audioElement);
    });
    
    fileMessages.forEach(file => {
        const fileElement = createMessageElement({
            ...file,
            type: 'file'
        });
        container.appendChild(fileElement);
    });
    
    // Scroll vers le bas
    setTimeout(() => {
        container.scrollTop = container.scrollHeight;
    }, 100);
}

function getCurrentTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
}

function formatDuration(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// Fonctions pour les pièces jointes
function attachFile(type) {
    const input = document.createElement('input');
    
    if (type === 'image') {
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = function(e) {
            const file = e.target.files[0];
            if (file) {
                sendFileMessage(file);
            }
        };
    } else if (type === 'document') {
        input.type = 'file';
        input.accept = '.pdf,.doc,.docx,.txt,.jpg,.png';
        input.onchange = function(e) {
            const file = e.target.files[0];
            if (file) {
                sendFileMessage(file);
            }
        };
    } else if (type === 'camera') {
        // Dans un vrai projet, utiliser l'API camera
        alert("Fonctionnalité caméra - En développement");
        return;
    }
    
    input.click();
    document.getElementById('attachmentMenu').classList.remove('active');
}

function sendFileMessage(file) {
    const fileMessage = {
        id: 'file_' + Date.now(),
        type: 'file',
        name: file.name,
        size: formatFileSize(file.size),
        sender: 'user',
        time: getCurrentTime(),
        date: 'Aujourd\'hui'
    };
    
    addMessageToChat(fileMessage);
    
    // Simuler une réponse après 2 secondes
    setTimeout(() => {
        const agentResponse = {
            id: Date.now(),
            type: 'text',
            content: "Fichier reçu. Je vais le transférer au service concerné.",
            sender: 'agent',
            time: getCurrentTime(),
            date: 'Aujourd\'hui'
        };
        addMessageToChat(agentResponse);
    }, 2000);
}

function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}

// Fonctions pour la lecture audio
window.playAudio = function(audioId) {
    if (isAudioPlaying && currentAudio === audioId) {
        stopAudio();
        return;
    }
    
    if (isAudioPlaying) {
        stopAudio();
    }
    
    isAudioPlaying = true;
    currentAudio = audioId;
    
    const playBtn = document.querySelector(`button[onclick="playAudio('${audioId}')"]`);
    if (playBtn) {
        playBtn.innerHTML = '<i class="fas fa-pause"></i>';
    }
    
    // Simuler la lecture audio
    const progressBar = document.getElementById(`progress-${audioId}`);
    if (progressBar) {
        let progress = 0;
        const interval = setInterval(() => {
            if (progress >= 100) {
                clearInterval(interval);
                stopAudio();
                return;
            }
            progress += 1;
            progressBar.style.width = progress + '%';
        }, 300); // 30 secondes pour un audio de 45 secondes
        
        // Stocker l'interval pour pouvoir l'arrêter
        window.currentAudioInterval = interval;
    }
};

function stopAudio() {
    isAudioPlaying = false;
    
    if (window.currentAudioInterval) {
        clearInterval(window.currentAudioInterval);
        window.currentAudioInterval = null;
    }
    
    if (currentAudio) {
        const playBtn = document.querySelector(`button[onclick="playAudio('${currentAudio}')"]`);
        if (playBtn) {
            playBtn.innerHTML = '<i class="fas fa-play"></i>';
        }
        
        const progressBar = document.getElementById(`progress-${currentAudio}`);
        if (progressBar) {
            progressBar.style.width = '0%';
        }
        
        currentAudio = null;
    }
}

window.downloadFile = function(fileId) {
    // Simuler le téléchargement
    const file = fileMessages.find(f => f.id === fileId) || 
                 audioMessages.find(a => a.id === fileId) ||
                 chatMessages.find(m => m.id === fileId);
    
    if (file) {
        alert(`Téléchargement de "${file.name || 'fichier'}" démarré`);
    }
};

// Navigation mobile
function initMobileNavigation() {
    const menuToggle = document.getElementById('menuToggle');
    const closeNav = document.getElementById('closeNav');
    const navOverlay = document.getElementById('navOverlay');
    const mobileNav = document.getElementById('mobileNav');
    const navLinks = document.querySelectorAll('.nav-link');
    
    menuToggle.addEventListener('click', () => {
        toggleMenu(true);
    });
    
    closeNav.addEventListener('click', () => {
        toggleMenu(false);
    });
    
    navOverlay.addEventListener('click', () => {
        toggleMenu(false);
    });
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const page = link.getAttribute('data-page');
            showPage(page);
            toggleMenu(false);
            updateActiveNav(page);
        });
    });
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && isMenuOpen) {
            toggleMenu(false);
        }
    });
}

function toggleMenu(open) {
    const mobileNav = document.getElementById('mobileNav');
    const navOverlay = document.getElementById('navOverlay');
    const menuToggle = document.getElementById('menuToggle');
    
    isMenuOpen = open;
    
    if (open) {
        mobileNav.classList.add('active');
        navOverlay.classList.add('active');
        menuToggle.classList.add('active');
        document.body.style.overflow = 'hidden';
    } else {
        mobileNav.classList.remove('active');
        navOverlay.classList.remove('active');
        menuToggle.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Navigation inférieure FIXÉE
function initBottomNav() {
    const navButtons = document.querySelectorAll('.nav-button');
    
    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            const page = button.getAttribute('data-page');
            
            if (page === 'mairie') {
                showMoreMenu();
                return;
            }
            
            showPage(page);
            updateActiveNav(page);
        });
    });
}

function showMoreMenu() {
    const menuHtml = `
        <div style="position: fixed; bottom: 80px; right: var(--space-md); background: var(--card-bg); border-radius: var(--radius-md); box-shadow: var(--shadow-lg); z-index: 2000; min-width: 200px; border: 1px solid var(--border-color);">
            <div style="padding: var(--space-sm);">
                <button class="more-menu-item" data-page="mairie" style="display: flex; align-items: center; gap: var(--space-md); padding: var(--space-lg); width: 100%; border: none; background: none; color: var(--text-primary); font-family: inherit; font-size: var(--text-base); cursor: pointer; border-radius: var(--radius-sm); transition: background-color 0.2s ease;">
                    <i class="fas fa-landmark"></i>
                    <span>La Mairie</span>
                </button>
                <button class="more-menu-item" data-page="contact" style="display: flex; align-items: center; gap: var(--space-md); padding: var(--space-lg); width: 100%; border: none; background: none; color: var(--text-primary); font-family: inherit; font-size: var(--text-base); cursor: pointer; border-radius: var(--radius-sm); transition: background-color 0.2s ease;">
                    <i class="fas fa-phone"></i>
                    <span>Contact</span>
                </button>
                <button class="more-menu-item" id="themeMenuBtn" style="display: flex; align-items: center; gap: var(--space-md); padding: var(--space-lg); width: 100%; border: none; background: none; color: var(--text-primary); font-family: inherit; font-size: var(--text-base); cursor: pointer; border-radius: var(--radius-sm); transition: background-color 0.2s ease;">
                    <i class="fas ${isDarkMode ? 'fa-sun' : 'fa-moon'}"></i>
                    <span>Thème ${isDarkMode ? 'clair' : 'sombre'}</span>
                </button>
                <button class="more-menu-item" id="contrastMenuBtn" style="display: flex; align-items: center; gap: var(--space-md); padding: var(--space-lg); width: 100%; border: none; background: none; color: var(--text-primary); font-family: inherit; font-size: var(--text-base); cursor: pointer; border-radius: var(--radius-sm); transition: background-color 0.2s ease;">
                    <i class="fas fa-adjust"></i>
                    <span>${isHighContrast ? 'Normal' : 'Haut contraste'}</span>
                </button>
            </div>
        </div>
    `;
    
    const overlay = document.createElement('div');
    overlay.style.cssText = 'position: fixed; top: 0; left: 0; right: 0; bottom: 0; z-index: 1999;';
    overlay.innerHTML = menuHtml;
    
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay || e.target.closest('.more-menu-item')) {
            const button = e.target.closest('.more-menu-item');
            if (button) {
                if (button.id === 'themeMenuBtn') {
                    toggleTheme();
                } else if (button.id === 'contrastMenuBtn') {
                    toggleHighContrast();
                } else if (button.dataset.page) {
                    const page = button.dataset.page;
                    showPage(page);
                    updateActiveNav(page);
                }
            }
            document.body.removeChild(overlay);
        }
    });
    
    document.body.appendChild(overlay);
}

// Thème sombre/clair
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const contrastToggle = document.getElementById('contrastToggle');
    
    themeToggle.addEventListener('click', () => {
        toggleTheme();
    });
    
    contrastToggle?.addEventListener('click', () => {
        toggleHighContrast();
    });
}

function toggleTheme() {
    isDarkMode = !isDarkMode;
    
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
        document.getElementById('themeToggle').innerHTML = '<i class="fas fa-sun"></i>';
        localStorage.setItem('theme', 'dark');
    } else {
        document.body.classList.remove('dark-mode');
        document.getElementById('themeToggle').innerHTML = '<i class="fas fa-moon"></i>';
        localStorage.setItem('theme', 'light');
    }
}

function toggleHighContrast() {
    isHighContrast = !isHighContrast;
    
    if (isHighContrast) {
        document.body.classList.add('high-contrast');
        localStorage.setItem('contrast', 'high');
    } else {
        document.body.classList.remove('high-contrast');
        localStorage.setItem('contrast', 'normal');
    }
}

function checkSystemTheme() {
    const savedTheme = localStorage.getItem('theme');
    const savedContrast = localStorage.getItem('contrast');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark.matches)) {
        isDarkMode = true;
        document.body.classList.add('dark-mode');
        document.getElementById('themeToggle').innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        document.getElementById('themeToggle').innerHTML = '<i class="fas fa-moon"></i>';
    }
    
    if (savedContrast === 'high') {
        isHighContrast = true;
        document.body.classList.add('high-contrast');
    }
}

// Recherche
function initSearch() {
    const searchInput = document.getElementById('globalSearch');
    
    if (searchInput) {
        searchInput.addEventListener('input', debounce((e) => {
            searchServices(e.target.value);
        }, 300));
    }
}

function searchServices(query) {
    if (!query.trim()) return;
    
    const results = [...mobileDemarches, ...mobileActualites].filter(item =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.description?.toLowerCase().includes(query.toLowerCase()) ||
        item.summary?.toLowerCase().includes(query.toLowerCase())
    );
    
    if (results.length > 0) {
        const resultsHtml = results.map(item => `
            <div class="card" style="margin: var(--space-md); cursor: pointer;" onclick="showSearchResult(${item.id}, '${item.description ? 'demarche' : 'actualite'}')">
                <h4>${item.title}</h4>
                <p style="color: var(--text-secondary); font-size: var(--text-sm);">
                    ${item.description || item.summary}
                </p>
                <span class="badge ${item.description ? 'badge-info' : 'badge-success'}">
                    ${item.description ? 'Service' : 'Actualité'}
                </span>
            </div>
        `).join('');
        
        const modalContent = `
            <div>
                <h4 style="margin-bottom: var(--space-lg); color: var(--primary-blue);">
                    <i class="fas fa-search"></i> Résultats pour "${query}"
                </h4>
                ${resultsHtml}
            </div>
        `;
        
        openCustomModal("Recherche", modalContent);
    }
}

window.showSearchResult = function(id, type) {
    if (type === 'demarche') {
        const demarche = mobileDemarches.find(d => d.id === id);
        if (demarche) {
            openDemarcheModal(demarche);
        }
    } else {
        const actualite = mobileActualites.find(a => a.id === id);
        if (actualite) {
            showNewsDetail(id);
        }
    }
};

// Affichage des pages
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    const page = document.getElementById(pageId);
    if (page) {
        page.classList.add('active');
        currentPage = pageId;
        window.scrollTo(0, 0);
        
        // Si on affiche la page de chat, recharger les messages
        if (pageId === 'chat') {
            loadChatMessages();
        }
    }
}

function updateActiveNav(pageId) {
    document.querySelectorAll('.nav-button').forEach(button => {
        button.classList.remove('active');
        if (button.getAttribute('data-page') === pageId) {
            button.classList.add('active');
        }
    });
    
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-page') === pageId) {
            link.classList.add('active');
        }
    });
}

// Initialisation des démarches
function initDemarches() {
    const tabs = document.querySelectorAll('#demarcheTabs .tab');
    const demarcheList = document.getElementById('demarcheList');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            const category = tab.getAttribute('data-category');
            renderDemarches(category);
        });
    });
    
    document.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('click', function() {
            const demarcheType = this.getAttribute('data-demarche');
            showPage('demarches');
            updateActiveNav('demarches');
            
            setTimeout(() => {
                const targetTab = document.querySelector(`.tab[data-category="${getCategoryFromType(demarcheType)}"]`);
                if (targetTab) {
                    tabs.forEach(t => t.classList.remove('active'));
                    targetTab.classList.add('active');
                    renderDemarches(getCategoryFromType(demarcheType));
                }
            }, 100);
        });
    });
    
    document.getElementById('quickDemarche')?.addEventListener('click', () => {
        showPage('demarches');
        updateActiveNav('demarches');
    });
    
    document.getElementById('contactHero')?.addEventListener('click', () => {
        showPage('contact');
        updateActiveNav('contact');
    });
}

function getCategoryFromType(type) {
    switch(type) {
        case 'naissance':
        case 'mariage':
        case 'cni':
            return 'etat-civil';
        case 'domicile':
            return 'divers';
        default:
            return 'all';
    }
}

function renderDemarches(category) {
    const demarcheList = document.getElementById('demarcheList');
    if (!demarcheList) return;
    
    let filtered = category === 'all' 
        ? mobileDemarches 
        : mobileDemarches.filter(d => d.category === category);
    
    let html = '';
    filtered.forEach(demarche => {
        html += `
            <div class="demarche-item" data-id="${demarche.id}">
                <div class="demarche-icon">
                    <i class="fas ${demarche.icon}"></i>
                </div>
                <div class="demarche-content">
                    <div class="demarche-title">${demarche.title}</div>
                    <p style="color: var(--text-secondary); font-size: var(--text-sm); margin-bottom: var(--space-xs);">${demarche.description}</p>
                    <div class="demarche-meta">
                        <span><i class="fas fa-clock"></i> ${demarche.delay}</span>
                        <span><i class="fas fa-euro-sign"></i> ${demarche.cost}</span>
                        ${demarche.popular ? '<span class="badge badge-success">Populaire</span>' : ''}
                    </div>
                </div>
            </div>
        `;
    });
    
    demarcheList.innerHTML = html;
    
    document.querySelectorAll('.demarche-item').forEach(item => {
        item.addEventListener('click', function() {
            const id = parseInt(this.getAttribute('data-id'));
            const demarche = mobileDemarches.find(d => d.id === id);
            openDemarcheModal(demarche);
        });
    });
}

// Initialisation des actualités
function initActualites() {
    const filters = document.querySelectorAll('#actualites .tab');
    
    filters.forEach(filter => {
        filter.addEventListener('click', () => {
            filters.forEach(f => f.classList.remove('active'));
            filter.classList.add('active');
            
            const category = filter.getAttribute('data-filter');
            renderActualites(category);
        });
    });
    
    renderActualites('all');
}

function renderActualites(category) {
    const list = document.getElementById('actualitesList');
    if (!list) return;
    
    let filtered = category === 'all' 
        ? mobileActualites 
        : mobileActualites.filter(a => a.category === category);
    
    let html = '';
    filtered.forEach(news => {
        html += `
            <div class="news-card ${news.bgClass}">
                <div class="news-content">
                    <div class="news-meta">
                        <span>${news.date}</span>
                        ${news.important ? '<span class="badge" style="background: rgba(255,255,255,0.2); color: white;">Important</span>' : ''}
                    </div>
                    <h3 class="news-title">${news.title}</h3>
                    <p style="opacity: 0.9; margin-bottom: var(--space-md);">${news.summary}</p>
                    <button class="btn btn-outline btn-small" onclick="showNewsDetail(${news.id})" style="color: white; border-color: white;">
                        <i class="fas fa-arrow-right"></i>
                        <span>Lire la suite</span>
                    </button>
                </div>
            </div>
        `;
    });
    
    list.innerHTML = html;
}

// Initialisation du carousel
function initCarousel() {
    const track = document.getElementById('carouselTrack');
    const indicators = document.getElementById('carouselIndicators');
    
    if (!track || !indicators) return;
    
    let html = '';
    let indicatorsHtml = '';
    
    mobileActualites.slice(0, 3).forEach((news, index) => {
        html += `
            <div class="carousel-slide">
                <div class="news-card ${news.bgClass}">
                    <div class="news-content">
                        <div class="news-meta">
                            <span>${news.date}</span>
                            ${news.important ? '<span class="badge" style="background: rgba(255,255,255,0.2); color: white;">Important</span>' : ''}
                        </div>
                        <h3 class="news-title">${news.title}</h3>
                        <p style="opacity: 0.9;">${news.summary}</p>
                    </div>
                </div>
            </div>
        `;
        
        indicatorsHtml += `
            <button class="carousel-indicator ${index === 0 ? 'active' : ''}" data-index="${index}"></button>
        `;
    });
    
    track.innerHTML = html;
    indicators.innerHTML = indicatorsHtml;
    
    // Configuration du carousel
    const slides = document.querySelectorAll('.carousel-slide');
    const indicatorButtons = document.querySelectorAll('.carousel-indicator');
    
    indicatorButtons.forEach(button => {
        button.addEventListener('click', () => {
            const index = parseInt(button.getAttribute('data-index'));
            goToSlide(index);
        });
    });
    
    // Auto-play
    startCarousel();
    
    // Pause au hover/touch
    track.addEventListener('mouseenter', stopCarousel);
    track.addEventListener('touchstart', stopCarousel);
    track.addEventListener('mouseleave', startCarousel);
}

function goToSlide(index) {
    const track = document.getElementById('carouselTrack');
    const slides = document.querySelectorAll('.carousel-slide');
    const indicators = document.querySelectorAll('.carousel-indicator');
    
    if (!track || slides.length === 0) return;
    
    carouselCurrentSlide = index;
    track.style.transform = `translateX(-${index * (slides[0].offsetWidth + 16)}px)`;
    
    indicators.forEach((indicator, i) => {
        indicator.classList.toggle('active', i === index);
    });
}

function nextSlide() {
    const slides = document.querySelectorAll('.carousel-slide');
    carouselCurrentSlide = (carouselCurrentSlide + 1) % slides.length;
    goToSlide(carouselCurrentSlide);
}

function startCarousel() {
    if (carouselInterval) clearInterval(carouselInterval);
    carouselInterval = setInterval(nextSlide, 5000);
}

function stopCarousel() {
    if (carouselInterval) {
        clearInterval(carouselInterval);
        carouselInterval = null;
    }
}

// Initialisation de la connexion
function initLogin() {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const showRegister = document.getElementById('showRegister');
    const showLogin = document.getElementById('showLogin');
    const mobileLogin = document.getElementById('mobileLogin');
    const logoutBtn = document.getElementById('logoutBtn');
    const newRequestBtn = document.getElementById('newRequest');
    
    // Modification: Le bouton "Se connecter" montre directement le formulaire
    mobileLogin?.addEventListener('click', () => {
        showPage('espace');
        updateActiveNav('espace');
        document.getElementById('registerSection').style.display = 'none';
        document.getElementById('dashboardSection').style.display = 'none';
        document.getElementById('loginSection').style.display = 'block';
    });
    
    loginForm?.addEventListener('submit', function(e) {
        e.preventDefault();
        handleLogin();
    });
    
    registerForm?.addEventListener('submit', function(e) {
        e.preventDefault();
        handleRegister();
    });
    
    showRegister?.addEventListener('click', (e) => {
        e.preventDefault();
        document.getElementById('loginSection').style.display = 'none';
        document.getElementById('registerSection').style.display = 'block';
    });
    
    showLogin?.addEventListener('click', (e) => {
        e.preventDefault();
        document.getElementById('registerSection').style.display = 'none';
        document.getElementById('loginSection').style.display = 'block';
    });
    
    logoutBtn?.addEventListener('click', () => {
        handleLogout();
    });
    
    newRequestBtn?.addEventListener('click', () => {
        showPage('demarches');
        updateActiveNav('demarches');
    });
}

function handleLogin() {
    currentUser = {
        name: "Jean Librevillois",
        email: "jean@exemple.com"
    };
    isLoggedIn = true;
    
    document.getElementById('loginSection').style.display = 'none';
    document.getElementById('dashboardSection').style.display = 'block';
    document.getElementById('userName').textContent = currentUser.name;
    document.getElementById('navUserName').textContent = currentUser.name;
    document.getElementById('navUserStatus').textContent = "Compte actif";
    
    // Réinitialiser le timer d'inactivité
    resetIdleTimer();
}

function handleRegister() {
    const nameInput = document.querySelector('#registerForm input[type="text"]');
    const emailInput = document.querySelector('#registerForm input[type="email"]');
    
    currentUser = {
        name: nameInput?.value || "Nouveau citoyen",
        email: emailInput?.value || "nouveau@exemple.com"
    };
    
    isLoggedIn = true;
    
    document.getElementById('registerSection').style.display = 'none';
    document.getElementById('dashboardSection').style.display = 'block';
    document.getElementById('userName').textContent = currentUser.name;
    document.getElementById('navUserName').textContent = currentUser.name;
    document.getElementById('navUserStatus').textContent = "Nouveau compte";
    
    // Réinitialiser le timer d'inactivité
    resetIdleTimer();
}

function handleLogout() {
    currentUser = null;
    isLoggedIn = false;
    
    document.getElementById('dashboardSection').style.display = 'none';
    document.getElementById('loginSection').style.display = 'block';
    
    document.getElementById('loginForm')?.reset();
    document.getElementById('registerForm')?.reset();
    
    document.getElementById('navUserName').textContent = "Citoyen Libreville";
    document.getElementById('navUserStatus').textContent = "Connectez-vous pour vos démarches";
    
    // Arrêter le timer d'inactivité
    clearTimeout(idleTimeout);
}

// Initialisation de la modal
function initModal() {
    const modal = document.getElementById('demarcheModal');
    const closeModal = document.getElementById('closeModal');
    
    closeModal?.addEventListener('click', () => {
        modal.classList.remove('active');
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            modal.classList.remove('active');
        }
    });
}

function openDemarcheModal(demarche) {
    const modal = document.getElementById('demarcheModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');
    
    modalTitle.textContent = demarche.title;
    
    modalBody.innerHTML = `
        <div style="margin-bottom: var(--space-xl);">
            <div style="display: flex; align-items: center; gap: var(--space-md); margin-bottom: var(--space-lg);">
                <div class="service-icon" style="width: 56px; height: 56px; background: var(--light-bg);">
                    <i class="fas ${demarche.icon}"></i>
                </div>
                <div>
                    <h3 style="font-size: var(--text-xl); font-weight: 600; margin-bottom: var(--space-xs);">${demarche.title}</h3>
                    <p style="color: var(--text-secondary);">${demarche.description}</p>
                </div>
            </div>
            
            <div style="background: var(--light-bg); padding: var(--space-lg); border-radius: var(--radius-md); margin-bottom: var(--space-lg);">
                <h4 style="margin-bottom: var(--space-md); color: var(--primary-blue);">
                    <i class="fas fa-info-circle"></i> Informations
                </h4>
                <div style="display: grid; gap: var(--space-md);">
                    <div style="display: flex; justify-content: space-between;">
                        <span style="color: var(--text-secondary);">Délai :</span>
                        <span style="font-weight: 600;">${demarche.delay}</span>
                    </div>
                    <div style="display: flex; justify-content: space-between;">
                        <span style="color: var(--text-secondary);">Coût :</span>
                        <span style="font-weight: 600;">${demarche.cost}</span>
                    </div>
                    <div style="display: flex; justify-content: space-between;">
                        <span style="color: var(--text-secondary);">Documents requis :</span>
                        <span style="font-weight: 600;">2-3</span>
                    </div>
                </div>
            </div>
            
            <div style="text-align: center;">
                ${isLoggedIn ? 
                    `<button class="btn btn-primary" onclick="startDemarche(${demarche.id})" style="margin-bottom: var(--space-md);">
                        <i class="fas fa-play"></i>
                        <span>Commencer la démarche</span>
                    </button>` : 
                    `<div style="margin-bottom: var(--space-lg);">
                        <p style="color: var(--warning-yellow); margin-bottom: var(--space-md);">
                            <i class="fas fa-info-circle"></i> Connectez-vous pour continuer
                        </p>
                        <button class="btn btn-primary" onclick="showPage('espace'); updateActiveNav('espace');">
                            <i class="fas fa-sign-in-alt"></i>
                            <span>Se connecter</span>
                        </button>
                    </div>`
                }
                <button class="btn btn-outline" onclick="downloadForm(${demarche.id})">
                    <i class="fas fa-download"></i>
                    <span>Télécharger le formulaire</span>
                </button>
            </div>
        </div>
    `;
    
    modal.classList.add('active');
}

// Initialisation des accordéons
function initAccordions() {
    const accordions = document.querySelectorAll('.accordion-header');
    
    accordions.forEach(accordion => {
        accordion.addEventListener('click', function() {
            const item = this.parentElement;
            item.classList.toggle('active');
        });
    });
}

// Urgences
window.callEmergency = function(type) {
    let number, service;
    
    switch(type) {
        case 'police':
            number = '1300';
            service = 'Police';
            break;
        case 'pompiers':
            number = '18';
            service = 'Pompiers';
            break;
        case 'hopital':
            number = '15';
            service = 'Hôpital';
            break;
        default:
            number = '1300';
            service = 'Urgence';
    }
    
    const modalContent = `
        <div style="text-align: center; padding: var(--space-xl) 0;">
            <div style="width: 80px; height: 80px; background: var(--danger-red); border-radius: var(--radius-full); display: flex; align-items: center; justify-content: center; color: white; font-size: var(--text-2xl); margin: 0 auto var(--space-lg);">
                <i class="fas fa-phone-alt"></i>
            </div>
            
            <h3 style="margin-bottom: var(--space-sm);">Appel d'urgence</h3>
            <p style="color: var(--text-secondary); margin-bottom: var(--space-xl);">Vous allez appeler le ${service}</p>
            
            <div style="font-size: var(--text-3xl); font-weight: 700; color: var(--danger-red); margin-bottom: var(--space-xl);">
                ${number}
            </div>
            
            <div style="display: flex; gap: var(--space-md);">
                <button class="btn btn-primary" onclick="window.location.href='tel:${number}'; document.getElementById('demarcheModal').classList.remove('active');" style="flex: 1;">
                    <i class="fas fa-phone"></i>
                    <span>Appeler</span>
                </button>
                <button class="btn btn-outline" onclick="document.getElementById('demarcheModal').classList.remove('active')" style="flex: 1;">
                    <i class="fas fa-times"></i>
                    <span>Annuler</span>
                </button>
            </div>
        </div>
    `;
    
    openCustomModal("Appel d'urgence", modalContent);
};

window.callContact = function(number) {
    window.location.href = `tel:${number}`;
};

// Géolocalisation
function initGeolocation() {
    if ('geolocation' in navigator) {
        document.getElementById('navUrgence')?.addEventListener('click', () => {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    console.log("Position envoyée:", latitude, longitude);
                },
                (error) => {
                    console.warn('Géolocalisation non disponible');
                }
            );
        });
    }
}

// Service Worker pour PWA
function initServiceWorker() {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js').then(() => {
                console.log('Service Worker enregistré');
            }).catch(err => {
                console.log('Erreur Service Worker:', err);
            });
        });
    }
}

// Mode hors ligne
function saveOfflineData() {
    localStorage.setItem('cachedDemarches', JSON.stringify(mobileDemarches));
    localStorage.setItem('cachedActualites', JSON.stringify(mobileActualites));
}

function loadOfflineData() {
    if (!navigator.onLine) {
        const cachedDemarches = localStorage.getItem('cachedDemarches');
        const cachedActualites = localStorage.getItem('cachedActualites');
        
        if (cachedDemarches) {
            // Utiliser les données en cache
        }
    }
}

// Timer d'inactivité
function startIdleTimer() {
    resetIdleTimer();
}

function resetIdleTimer() {
    clearTimeout(idleTimeout);
    if (isLoggedIn) {
        idleTimeout = setTimeout(() => {
            handleLogout();
        }, 30 * 60 * 1000); // 30 minutes
    }
}

// Événements pour le timer d'inactivité
['mousemove', 'keypress', 'click', 'scroll', 'touchstart'].forEach(event => {
    document.addEventListener(event, resetIdleTimer);
});

// Événements généraux
function initEventListeners() {
    document.getElementById('navUrgence')?.addEventListener('click', () => {
        toggleMenu(false);
    });
    
    // Détection de la connexion
    window.addEventListener('online', () => {
        // Pas de notification
    });

    window.addEventListener('offline', () => {
        loadOfflineData();
    });
}

// Empêcher le swipe horizontal sur le contenu
function preventHorizontalScroll() {
    const mainContent = document.querySelector('.main-content');
    let startX = 0;
    let startY = 0;
    
    mainContent.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
    }, { passive: true });
    
    mainContent.addEventListener('touchmove', (e) => {
        if (!startX || !startY) return;
        
        const diffX = e.touches[0].clientX - startX;
        const diffY = e.touches[0].clientY - startY;
        
        // Si le mouvement horizontal est plus grand que vertical, empêcher le scroll
        if (Math.abs(diffX) > Math.abs(diffY)) {
            e.preventDefault();
        }
    }, { passive: false });
}

// Fonctions utilitaires
function openCustomModal(title, content) {
    const modal = document.getElementById('demarcheModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');
    
    modalTitle.textContent = title;
    modalBody.innerHTML = content;
    modal.classList.add('active');
}

window.showNewsDetail = function(newsId) {
    const news = mobileActualites.find(n => n.id === newsId);
    if (!news) return;
    
    const modal = document.getElementById('demarcheModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');
    
    modalTitle.textContent = news.title;
    modalBody.innerHTML = `
        <div>
            <div class="news-card ${news.bgClass}" style="margin-bottom: var(--space-lg); min-height: 200px;">
                <div class="news-content">
                    <div class="news-meta">
                        <span>${news.date}</span>
                        ${news.important ? '<span class="badge" style="background: rgba(255,255,255,0.2); color: white;">Important</span>' : ''}
                    </div>
                    <h3 class="news-title">${news.title}</h3>
                </div>
            </div>
            
            <div style="margin-bottom: var(--space-xl);">
                <h4 style="margin-bottom: var(--space-md); color: var(--primary-blue);">Détails</h4>
                <p>${news.summary}. Tous les détails complets sont disponibles sur le site officiel de la mairie. Cette information est régulièrement mise à jour.</p>
            </div>
            
            <div style="text-align: center;">
                <button class="btn btn-primary" onclick="shareNews(${newsId})">
                    <i class="fas fa-share"></i>
                    <span>Partager</span>
                </button>
            </div>
        </div>
    `;
    
    modal.classList.add('active');
};

window.startDemarche = function(demarcheId) {
    const demarche = mobileDemarches.find(d => d.id === demarcheId);
    
    document.getElementById('demarcheModal').classList.remove('active');
    showPage('espace');
    updateActiveNav('espace');
};

window.downloadForm = function(demarcheId) {
    const demarche = mobileDemarches.find(d => d.id === demarcheId);
    document.getElementById('demarcheModal').classList.remove('active');
};

window.shareNews = function(newsId) {
    const news = mobileActualites.find(n => n.id === newsId);
    
    if (navigator.share) {
        navigator.share({
            title: news.title,
            text: `Actualité de la Mairie de Libreville : ${news.title}`,
            url: window.location.href
        });
    }
};

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Fonctions utilitaires
function loadInitialData() {
    setTimeout(() => {
        renderDemarches('all');
        renderActualites('all');
    }, 100);
}

window.sendEmail = function() {
    window.location.href = 'mailto:mairie@libreville.gab';
};

window.openDirections = function() {
    const address = encodeURIComponent('Place de l\'Indépendance, Libreville, Gabon');
    window.open(`https://www.google.com/maps/search/?api=1&query=${address}`, '_blank');
};
