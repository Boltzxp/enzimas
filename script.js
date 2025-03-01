// Variáveis globais
const board = document.getElementById('board');
const rollDiceButton = document.getElementById('roll-dice');
const questionArea = document.getElementById('question-area');
const questionText = document.getElementById('question-text');
const answerButtons = [
  document.getElementById('answer-1'),
  document.getElementById('answer-2'),
  document.getElementById('answer-3')
];

let playerPosition = 0; // Posição inicial do jogador
const totalCells = 30; // Número total de casas no tabuleiro
const questions = [
  {
    question: "Qual é o papel do ATP na célula?",
    answers: ["Armazenar energia", "Transportar oxigênio", "Sintetizar DNA"],
    correctAnswer: 0
  },
  {
    question: "Qual é o produto final da glicólise?",
    answers: ["Piruvato", "Glicose", "CO2"],
    correctAnswer: 0
  }
];

// Função para criar o tabuleiro
function createBoard() {
  for (let i = 0; i < totalCells; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.textContent = i + 1;
    if (i === 0) cell.classList.add('start');
    if (i === totalCells - 1) cell.classList.add('end');
    board.appendChild(cell);
  }
}

// Função para mover o jogador
function movePlayer(steps) {
  playerPosition += steps;
  if (playerPosition >= totalCells) playerPosition = totalCells - 1;

  // Atualiza a posição do jogador no tabuleiro
  updatePlayerPosition();
}

// Função para atualizar a posição do jogador
function updatePlayerPosition() {
  const cells = document.querySelectorAll('.cell');
  cells.forEach(cell => cell.innerHTML = cell.textContent); // Limpa as células
  cells[playerPosition].innerHTML += '<div class="player"></div>';
}

// Função para exibir uma pergunta
function showQuestion() {
  const randomIndex = Math.floor(Math.random() * questions.length);
  const currentQuestion = questions[randomIndex];

  questionText.textContent = currentQuestion.question;
  answerButtons.forEach((button, index) => {
    button.textContent = currentQuestion.answers[index];
    button.onclick = () => checkAnswer(index, currentQuestion.correctAnswer);
  });

  questionArea.style.display = 'block';
}

// Função para verificar a resposta
function checkAnswer(selectedAnswer, correctAnswer) {
  if (selectedAnswer === correctAnswer) {
    alert("Resposta correta! Avance mais uma casa.");
    movePlayer(1);
  } else {
    alert("Resposta incorreta! Fique onde está.");
  }
  questionArea.style.display = 'none';
}

// Evento de lançar o dado
rollDiceButton.addEventListener('click', () => {
  const diceRoll = Math.floor(Math.random() * 6) + 1; // Gera um número entre 1 e 6
  alert(`Você tirou ${diceRoll} no dado.`);
  movePlayer(diceRoll);

  // Verifica se o jogador caiu em uma casa especial
  if (playerPosition % 5 === 0 && playerPosition !== 0) {
    showQuestion();
  }

  // Verifica se o jogador venceu
  if (playerPosition === totalCells - 1) {
    alert("Parabéns! Você venceu a Corrida Enzimática!");
  }
});

// Inicializa o jogo
createBoard();
updatePlayerPosition();
