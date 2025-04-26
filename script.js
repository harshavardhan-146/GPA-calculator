const yearSelect = document.getElementById('yearSelect');
const degreeSelect = document.getElementById('degreeSelect');
const branchSelect = document.getElementById('branchSelect');
const groupSelect = document.getElementById('groupSelect');
const subjectInputs = document.getElementById('subjectInputs');
const calculateGPA = document.getElementById('calculateGPA');
const gpaOutput = document.getElementById('gpaOutput');

const step2 = document.getElementById('step2');
const step3 = document.getElementById('step3');
const step4 = document.getElementById('step4');
const subjectsDiv = document.getElementById('subjects');
const resultDiv = document.getElementById('result');
const messageDiv = document.getElementById('message');
const messageText = document.getElementById('messageText');

const subjects = {
    CSE: {
        A: [
            { name: 'Data Structures', credits: 4 },
            { name: 'Maths', credits: 3 },
            { name: 'EEE', credits: 3 },
            { name: 'Physics', credits: 3 },
            { name: 'Ethics', credits: 2 },
            { name: 'English', credits: 2 },
            { name: 'Entrepreneur Mindset', credits: 2 }
        ],
        B: [
            { name: 'Data Structures', credits: 4 },
            { name: 'Maths', credits: 3 },
            { name: 'EEE', credits: 3 },
            { name: 'Economics', credits: 3 },
            { name: 'Environmental Science', credits: 2 },
            { name: 'English', credits: 2 },
            { name: 'Entrepreneur Mindset', credits: 2 }
        ]
    },
    ECE: [
        { name: 'Electrical Circuits', credits: 4 },
        { name: 'Microelectronics', credits: 4 },
        { name: 'Maths', credits: 3 },
        { name: 'Economics', credits: 3 },
        { name: 'English', credits: 2 },
        { name: 'Entrepreneur Mindset', credits: 2 },
        { name: 'Environmental Science', credits: 2 }
    ]
};

yearSelect.addEventListener('change', () => {
    if (yearSelect.value === '1st') {
        step2.classList.remove('hidden');
        hideMessage();
    } else {
        showMessage('Coming Soon');
        resetSteps();
    }
});

degreeSelect.addEventListener('change', () => {
    if (degreeSelect.value === 'B.Tech') {
        step3.classList.remove('hidden');
        hideMessage();
    } else {
        showMessage('Coming Soon');
        resetSteps();
    }
});

branchSelect.addEventListener('change', () => {
    const branch = branchSelect.value;
    if (branch === 'CSE') {
        step4.classList.remove('hidden');
        hideMessage();
    } else if (branch === 'ECE') {
        displaySubjects(subjects.ECE);
        hideMessage();
    } else {
        showMessage('Coming Soon');
        resetSteps();
    }
});

groupSelect.addEventListener('change', () => {
    const group = groupSelect.value;
    if (group) {
        displaySubjects(subjects.CSE[group]);
    }
});

function displaySubjects(subjectList) {
    subjectInputs.innerHTML = '';
    subjectList.forEach(subject => {
        const div = document.createElement('div');
        div.classList.add('form-group');
        div.innerHTML = `
            <label>${subject.name} (${subject.credits} credits): </label>
            <input type="number" min="0" max="10" step="1" data-credits="${subject.credits}" class="gradeInput">
        `;
        subjectInputs.appendChild(div);
    });
    subjectsDiv.classList.remove('hidden');
}

calculateGPA.addEventListener('click', () => {
    const gradeInputs = document.querySelectorAll('.gradeInput');
    let totalCredits = 0;
    let weightedSum = 0;

    gradeInputs.forEach(input => {
        const grade = parseFloat(input.value);
        const credits = parseInt(input.dataset.credits);
        if (!isNaN(grade)) {
            weightedSum += grade * credits;
            totalCredits += credits;
        }
    });

    const gpa = (totalCredits > 0) ? (weightedSum / totalCredits).toFixed(2) : 0;
    gpaOutput.textContent = `Your GPA is: ${gpa}`;
    resultDiv.classList.remove('hidden');
});

function showMessage(msg) {
    messageText.textContent = msg;
    messageDiv.classList.remove('hidden');
}

function hideMessage() {
    messageText.textContent = '';
    messageDiv.classList.add('hidden');
}

function resetSteps() {
    step2.classList.add('hidden');
    step3.classList.add('hidden');
    step4.classList.add('hidden');
    subjectsDiv.classList.add('hidden');
    resultDiv.classList.add('hidden');
    hideMessage();
}
