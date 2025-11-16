// FastAPI-Depends Navigation and Quiz Script

// Sound Effects System
class SoundEffects {
    constructor() {
        this.audioContext = null;
        this.enabled = true;
        this.initAudio();
    }

    initAudio() {
        try {
            window.AudioContext = window.AudioContext || window.webkitAudioContext;
            this.audioContext = new AudioContext();
        } catch (e) {
            console.log('Web Audio API not supported');
            this.enabled = false;
        }
    }

    playSound(frequency, duration, type = 'sine') {
        if (!this.enabled || !this.audioContext) return;

        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);

        oscillator.frequency.value = frequency;
        oscillator.type = type;

        gainNode.gain.setValueAtTime(0.3, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);

        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + duration);
    }

    playCorrect() {
        this.playSound(523.25, 0.1); // C5
        setTimeout(() => this.playSound(659.25, 0.1), 100); // E5
        setTimeout(() => this.playSound(783.99, 0.1), 200); // G5
    }

    playIncorrect() {
        this.playSound(220, 0.2, 'sawtooth'); // A3
        setTimeout(() => this.playSound(165, 0.3, 'sawtooth'), 200); // E3
    }

    playClick() {
        this.playSound(440, 0.05); // A4
    }

    playComplete() {
        this.playSound(523.25, 0.1); // C5
        setTimeout(() => this.playSound(659.25, 0.1), 100); // E5
        setTimeout(() => this.playSound(783.99, 0.1), 200); // G5
        setTimeout(() => this.playSound(1046.50, 0.2), 300); // C6
    }
}

// Initialize sound effects
const sounds = new SoundEffects();

// Sidebar functionality
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.querySelector('.main-content');
    const toggleBtn = document.querySelector('.sidebar-toggle');
    
    sidebar.classList.toggle('hidden');
    mainContent.classList.toggle('full-width');
    toggleBtn.classList.toggle('sidebar-open');
}

// Navigation active state
function setActive(element) {
    // Remove active class from all items
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    // Add active class to clicked element
    element.classList.add('active');
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Quiz Data
const quizQuestions = [
    // Beginner Level
    {
        question: "¿Qué hace el parámetro `use_cache=True` por defecto en FastAPI Depends?",
        options: [
            "Guarda el resultado en Redis",
            "Cachea el resultado dentro del mismo request",
            "Almacena respuestas en memoria para siempre",
            "Desactiva todas las dependencias"
        ],
        correct: 1,
        level: "beginner"
    },
    {
        question: "¿Cuándo se ejecuta el código después de `yield` en una dependencia?",
        options: [
            "Antes de la llamada a la API",
            "Durante la ejecución de la API",
            "Después de que la API termina, incluso si falla",
            "Nunca se ejecuta"
        ],
        correct: 2,
        level: "beginner"
    },
    {
        question: "¿Qué método se usa para sobrescribir dependencias durante el testing?",
        options: [
            "app.mock_dependencies",
            "app.dependency_overrides",
            "app.replace_dependencies",
            "app.test_dependencies"
        ],
        correct: 1,
        level: "beginner"
    },
    {
        question: "¿Qué es `TestClient` en FastAPI?",
        options: [
            "Un cliente HTTP real para producción",
            "Un cliente de testing que simula peticiones HTTP",
            "Una base de datos de prueba",
            "Un servidor de desarrollo"
        ],
        correct: 1,
        level: "beginner"
    },
    {
        question: "¿Cuál es el propósito principal del patrón `yield` en dependencias?",
        options: [
            "Mejorar el rendimiento",
            "Manejar recursos que necesitan limpieza (setup/teardown)",
            "Crear caché automático",
            "Paralelizar ejecución"
        ],
        correct: 1,
        level: "beginner"
    },

    // Intermediate Level
    {
        question: "Si tienes `use_cache=False`, ¿cuántas veces se ejecutará la dependencia en el mismo request?",
        options: [
            "0 veces",
            "1 vez",
            "Cada vez que se llame",
            "Infinitas veces"
        ],
        correct: 2,
        level: "intermediate"
    },
    {
        question: "¿Qué sucede si una dependencia con `yield` lanza una excepción antes del yield?",
        options: [
            "El código después del yield se ejecuta igual",
            "La API continúa normalmente",
            "La excepción se propaga y el código después del yield NO se ejecuta",
            "FastAPI ignora la excepción"
        ],
        correct: 2,
        level: "intermediate"
    },
    {
        question: "¿Dónde se inyectan las dependencias cuando usas una clase como dependencia?",
        options: [
            "En el método `__call__`",
            "En el método `__init__`",
            "En cualquier método público",
            "En el constructor de la API"
        ],
        correct: 1,
        level: "intermediate"
    },
    {
        question: "¿Qué diferencia hay entre dependencias en firma vs en decorador?",
        options: [
            "No hay diferencia",
            "Las del decorador se ejecutan pero su valor no se pasa a la función",
            "Las del decorador son más rápidas",
            "Las del decorador solo funcionan con GET"
        ],
        correct: 1,
        level: "intermediate"
    },
    {
        question: "¿Cuál es un caso de uso avanzado para `use_cache=False`?",
        options: [
            "Siempre para mejorar rendimiento",
            "Para obtener una transacción completamente nueva y aislada",
            "Para conectar a bases de datos diferentes",
            "Para evitar inyección SQL"
        ],
        correct: 1,
        level: "intermediate"
    },

    // Advanced Level
    {
        question: "¿Qué patrón avanzado puedes implementar haciendo una clase 'callable'?",
        options: [
            "Crear dependencias configurables y reutilizables",
            "Mejorar el rendimiento automáticamente",
            "Conectar a múltiples bases de datos",
            "Generar documentación automáticamente"
        ],
        correct: 0,
        level: "advanced"
    },
    {
        question: "¿Cómo se comporta `dependency_overrides` con múltiples tests?",
        options: [
            "Los overrides persisten entre tests",
            "Debes limpiar los overrides después de cada test",
            "No se puede usar en múltiples tests",
            "Los overrides se resetean automáticamente"
        ],
        correct: 1,
        level: "advanced"
    },
    {
        question: "¿Qué sucede si tienes dependencias anidadas con diferentes valores de `use_cache`?",
        options: [
            "FastAPI usa siempre el último valor",
            "Cada dependencia respeta su propio valor de use_cache",
            "Todas se cachean o ninguna se cachea",
            "Ocurre un error de ejecución"
        ],
        correct: 1,
        level: "advanced"
    },
    {
        question: "¿Cuál es la ventaja principal de usar `dependency_overrides`?",
        options: [
            "Mejora el rendimiento en producción",
            "Permite testing aislado sin dependencias externas",
            "Reduce el tamaño del código",
            "Aumenta la seguridad"
        ],
        correct: 1,
        level: "advanced"
    },
    {
        question: "¿Qué puedes lograr combinando clases como dependencias con `yield`?",
        options: [
            "Solo inyección básica",
            "Patrones complejos como transacciones automáticas con contexto",
            "Mejoras de rendimiento automáticas",
            "Conexiones a bases de datos ilimitadas"
        ],
        correct: 1,
        level: "advanced"
    }
];

// Quiz State
let currentQuestion = 0;
let score = 0;
let answers = [];
let selectedOption = null;
let isRandomized = false;
let originalQuestions = [...quizQuestions];

// Quiz Functions
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

function toggleRandomization() {
    isRandomized = !isRandomized;
    if (isRandomized) {
        quizQuestions = shuffleArray(originalQuestions);
        document.getElementById('randomize-btn').innerHTML = '🎲 Order: Random';
    } else {
        quizQuestions = [...originalQuestions];
        document.getElementById('randomize-btn').innerHTML = '🎲 Order: Sequential';
    }
    restartQuiz();
    sounds.playClick();
}

function loadQuestion() {
    const question = quizQuestions[currentQuestion];
    document.getElementById('question').textContent = question.question;
    
    // Add level indicator
    const levelText = question.level === 'beginner' ? '🟢 Principiante' :
                     question.level === 'intermediate' ? '🟡 Intermedio' : '🔴 Avanzado';
    document.getElementById('question').innerHTML += ` <span class="level-indicator">${levelText}</span>`;
    
    const optionsContainer = document.getElementById('options');
    optionsContainer.innerHTML = '';
    
    question.options.forEach((option, index) => {
        const optionDiv = document.createElement('div');
        optionDiv.className = 'option';
        optionDiv.textContent = option;
        optionDiv.onclick = () => selectOption(index);
        optionsContainer.appendChild(optionDiv);
    });
    
    updateScore();
    updateButtons();
    updateProgress();
    
    // Reset selected option
    selectedOption = null;
    document.getElementById('submit-btn').disabled = true;
    
    // Add fade-in animation
    document.querySelector('.quiz-container').classList.add('fade-in');
}

function selectOption(index) {
    sounds.playClick();
    
    // Remove previous selection
    document.querySelectorAll('.option').forEach(option => {
        option.classList.remove('selected');
    });
    
    // Add selection to clicked option
    document.querySelectorAll('.option')[index].classList.add('selected');
    selectedOption = index;
    document.getElementById('submit-btn').disabled = false;
}

function submitAnswer() {
    if (selectedOption === null) return;
    
    const question = quizQuestions[currentQuestion];
    const options = document.querySelectorAll('.option');
    
    // Show correct/incorrect
    const isCorrect = selectedOption === question.correct;
    options[selectedOption].classList.add(isCorrect ? 'correct' : 'incorrect');
    
    if (isCorrect) {
        score++;
        sounds.playCorrect();
    } else {
        sounds.playIncorrect();
        // Show the correct answer
        options[question.correct].classList.add('correct');
    }
    
    answers[currentQuestion] = selectedOption;
    
    // Disable options and submit button
    options.forEach(option => {
        option.style.pointerEvents = 'none';
    });
    document.getElementById('submit-btn').disabled = true;
    
    // Enable next button or show results
    if (currentQuestion < quizQuestions.length - 1) {
        setTimeout(() => {
            document.getElementById('next-btn').disabled = false;
        }, 500);
    } else {
        setTimeout(showResults, 1500);
    }
}

function nextQuestion() {
    if (currentQuestion < quizQuestions.length - 1) {
        currentQuestion++;
        loadQuestion();
    }
}

function previousQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        loadQuestion();
        sounds.playClick();
    }
}

function updateScore() {
    document.getElementById('score').textContent = `Question ${currentQuestion + 1} of ${quizQuestions.length}`;
}

function updateButtons() {
    document.getElementById('prev-btn').disabled = currentQuestion === 0;
    document.getElementById('next-btn').disabled = currentQuestion === quizQuestions.length - 1;
}

function updateProgress() {
    const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;
    document.getElementById('progress-fill').style.width = progress + '%';
}

function showResults() {
    sounds.playComplete();
    const percentage = Math.round((score / quizQuestions.length) * 100);
    document.getElementById('quiz-content').classList.add('hidden');
    document.getElementById('result-container').classList.remove('hidden');
    document.getElementById('final-score').textContent = `${score}/${quizQuestions.length}`;
    
    // Disable all quiz control buttons when showing results
    document.getElementById('prev-btn').disabled = true;
    document.getElementById('next-btn').disabled = true;
    document.getElementById('submit-btn').disabled = true;
    
    let message = '';
    if (percentage >= 90) {
        message = '🏆 ¡Excelente! Eres un experto en FastAPI Depends!';
    } else if (percentage >= 70) {
        message = '🎉 ¡Gran trabajo! Conoces bien FastAPI Depends!';
    } else if (percentage >= 50) {
        message = '👍 ¡Buen esfuerzo! Sigue aprendiendo sobre FastAPI Depends!';
    } else {
        message = '📚 ¡Sigue estudiando! FastAPI Depends es una herramienta poderosa!';
    }
    
    document.getElementById('result-message').textContent = message;
}

function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    answers = [];
    selectedOption = null;
    
    document.getElementById('quiz-content').classList.remove('hidden');
    document.getElementById('result-container').classList.add('hidden');
    
    sounds.playClick();
    loadQuestion();
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Set first nav-item as active on page load
    const firstNavItem = document.querySelector('.nav-item');
    if (firstNavItem) {
        firstNavItem.classList.add('active');
    }
    
    // Initialize smooth scrolling
    initSmoothScrolling();
    
    // Initialize quiz if on quiz page
    if (document.getElementById('quiz-content')) {
        loadQuestion();
    }
    
    // Initialize highlight.js if available
    if (typeof hljs !== 'undefined') {
        hljs.highlightAll();
    }
});
