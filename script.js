let score = 0;
let additionDifficulty = 1;
let subtractionDifficulty = 1;
let multiplicationDifficulty = 1.0;
let divisionDifficulty = 1.0;
let currentOperation = '';
let currentAnswer = 0;
let currentDifficulty = 0.1;
let difficultyIncrement = 0.1;

const scoreChartCtx = document.getElementById('scoreChart').getContext('2d');
const difficultyChartCtx = document.getElementById('difficultyChart').getContext('2d');

const scoreChart = new Chart(scoreChartCtx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Score',
            data: [],
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

const difficultyChart = new Chart(difficultyChartCtx, {
    type: 'bar',
    data: {
        labels: ['+', '-', 'x', '÷'],
        datasets: [{
            label: ' ',
            data: [additionDifficulty, subtractionDifficulty, multiplicationDifficulty, divisionDifficulty],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

function getRandomNumber(difficulty) {
    currentDifficulty = Math.floor(difficulty)
    return Math.floor(Math.random() * (currentDifficulty * 10)) + 1;
}

function generateQuestion() {
    const operations = ['+', '-', '*', '/'];
    currentOperation = operations[Math.floor(Math.random() * operations.length)];

    let num1, num2;
    if (currentOperation === '+') {
        num1 = getRandomNumber(additionDifficulty);
        num2 = getRandomNumber(additionDifficulty);
        currentAnswer = num1 + num2;
    } else if (currentOperation === '-') {
        num1 = getRandomNumber(subtractionDifficulty);
        num2 = getRandomNumber(subtractionDifficulty);
        currentAnswer = num1 - num2;
    } else if (currentOperation === '*') {
        num1 = getRandomNumber(multiplicationDifficulty);
        num2 = getRandomNumber(multiplicationDifficulty);
        currentAnswer = num1 * num2;
    } else if (currentOperation === '/') {
        num2 = getRandomNumber(divisionDifficulty);
        currentAnswer = getRandomNumber(divisionDifficulty);
        num1 = num2 * currentAnswer;
    }

    document.getElementById('question').textContent = `What is ${num1} ${currentOperation} ${num2}?`;
    //document.getElementById('difficulty').textContent = `+ Difficulty: ${additionDifficulty}, Subtraction Difficulty: ${subtractionDifficulty}, Multiplication Difficulty: ${multiplicationDifficulty}, Division Difficulty: ${divisionDifficulty}`;
}

function updateCharts() {
    scoreChart.data.labels.push(scoreChart.data.labels.length + 1);
    scoreChart.data.datasets[0].data.push(score);
    scoreChart.update();

    difficultyChart.data.datasets[0].data = [additionDifficulty, subtractionDifficulty, multiplicationDifficulty, divisionDifficulty];
    difficultyChart.update();
}

function checkAnswer() {
    const userAnswer = parseInt(document.getElementById('answer').value, 10);
    const message = document.getElementById('message');

    if (userAnswer === currentAnswer) {
        //score += 1;
        message.textContent = 'Correct!';
        
        // Increase difficulty
        if (currentOperation === '+') {
	    score += additionDifficulty;
            additionDifficulty += difficultyIncrement;
        } else if (currentOperation === '-') {
	    score += subtractionDifficulty;
            subtractionDifficulty += difficultyIncrement;
        } else if (currentOperation === '*') {
	    score += multiplicationDifficulty;
            multiplicationDifficulty += difficultyIncrement;
        } else if (currentOperation === '/') {
	    score += divisionDifficulty;
            divisionDifficulty += difficultyIncrement;
        }
    } else {
        //score = Math.max(0, score - 1);
        message.textContent = `Incorrect. The correct answer was ${currentAnswer}.`;
        // Decrease difficulty
        if (currentOperation === '+') {
	    score -= additionDifficulty;
            additionDifficulty -= difficultyIncrement;
        } else if (currentOperation === '-') {
	    score -= subtractionDifficulty;
            subtractionDifficulty -= difficultyIncrement;
        } else if (currentOperation === '*') {
	    score -= multiplicationDifficulty;
            multiplicationDifficulty -= difficultyIncrement;
        } else if (currentOperation === '/') {
	    score -= divisionDifficulty;
            divisionDifficulty -= difficultyIncrement;
        }
    }

    document.getElementById('score').textContent = `Score: ${score}`;
    document.getElementById('answer').value = '';
    generateQuestion();
    updateCharts();
}

document.getElementById('submit').addEventListener('click', checkAnswer);

document.getElementById('answer').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        checkAnswer();
    }
});

generateQuestion();

