const courseGroup = { 'TEC': 6, 'Projet': 6, 'RSX2': 6, 'GL': 4, 'JSFS': 5, 'Logique': 2, 'LAAS': 3, 'ARCHI': 3, 'PDS': 4, 'Découverte': 6 };
const optionChoices = ['BIOINFO', 'PP', 'II2D', 'META', 'MAL', 'PDM'];
const BASE_URL = 'https://fstlillecs-s6-2425-agenda.vercel.app/generate?'

const generateCourseDropdowns = (courseGroup) => {
    const container = document.querySelector('.choice');
    Object.entries(courseGroup).forEach(([course, maxOptions]) => {
        const label = document.createElement('label');
        label.textContent = course + ': ';
        label.value = course;
        const select = document.createElement('select');

        const noneOption = document.createElement('option');
        noneOption.value = 'none';
        noneOption.textContent = 'none';
        select.appendChild(noneOption);

        if (course === 'Découverte') {
            optionChoices.forEach(choice => {
                const opt = document.createElement('option');
                opt.value = choice;
                opt.textContent = choice;
                select.appendChild(opt);
            })
        } else {
            for (let i = 1; i <= maxOptions; i++) {
                const option = document.createElement('option');
                option.value = i;
                option.textContent = 'G' + i;
                select.appendChild(option);
            }
        }

        select.addEventListener('change', updateQueryString);

        label.appendChild(select);
        container.appendChild(label);
    })
}

const generateQueryString = () => {
    const selects = document.querySelectorAll('.choice select');
    const params = [];

    selects.forEach(select => {
        const course = select.labels[0].value;
        const value = select.value;
        if (value !== 'none') {
            params.push(`${course === 'Découverte' ? 'optionChoice' : course}=${value}`);
        }
    });

    return params.join('&');
}

const updateQueryString = () => {
    const textArea = document.getElementById("result");
    params = generateQueryString();
    textArea.value = BASE_URL + params;
}

const copyTextArea = () => {
    var copyText = document.getElementById("result");
    navigator.clipboard.writeText(copyText.value);
    alert("ICS generation link has been copied to clipboard");
}

const downloadICS = () => {
    var url = document.getElementById("result").value;
    window.open(url);
}

document.addEventListener('DOMContentLoaded', () => {
    generateCourseDropdowns(courseGroup);
});
