let companySize, workType, jobLevel, data;

function loadJSON(callback) {
    const xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', 'data.json', true); // 确保路径正确
    xobj.onreadystatechange = function () {
        if (xobj.readyState === 4) {
            if (xobj.status === 200) {
                callback(JSON.parse(xobj.responseText));
            } else {
                console.error('Failed to load JSON file:', xobj.status);
            }
        }
    };
    xobj.send(null);
}

function initialize() {
    loadJSON(function(response) {
        data = response;
        console.log('Data loaded:', data); // 确认数据已加载
        if (data && data.challenges) {
            document.getElementById("question-section").classList.remove("hidden");
        } else {
            console.error('Data is not loaded correctly or data structure is incorrect');
        }
    });
}

function submitAnswer() {
    companySize = document.getElementById("user-input").value;
    console.log('Selected company size:', companySize); // 调试信息
    document.getElementById("question-section").classList.add("hidden");
    document.getElementById("work-type-section").classList.remove("hidden");
}

function submitWorkType() {
    workType = document.getElementById("work-type-input").value;
    console.log('Selected work type:', workType); // 调试信息
    document.getElementById("work-type-section").classList.add("hidden");
    document.getElementById("job-level-section").classList.remove("hidden");
}

function submitJobLevel() {
    jobLevel = document.getElementById("job-level-input").value;
    console.log('Selected job level:', jobLevel); // 调试信息
    document.getElementById("job-level-section").classList.add("hidden");

    // 显示挑战选项
    const challengeSelect = document.getElementById("challenge-input");
    challengeSelect.innerHTML = '';

    console.log('Data:', data);
    console.log('Challenges:', data ? data.challenges : 'data is undefined');
    console.log('Company Size:', companySize);
    console.log('Work Type:', workType);
    console.log('Job Level:', jobLevel);

    if (data && data.challenges && data.challenges[companySize] && data.challenges[companySize][workType] && data.challenges[companySize][workType][jobLevel]) {
        data.challenges[companySize][workType][jobLevel].forEach((challenge) => {
            const option = document.createElement("option");
            option.value = challenge;
            option.text = challenge;
            challengeSelect.appendChild(option);
        });
    } else {
        console.error('No challenges found for the selected options');
    }

    document.getElementById("challenge-section").classList.remove("hidden");
}

function submitChallenge() {
    const challenge = document.getElementById("challenge-input").value;
    const resultSection = document.getElementById("result-section");
    const reloadButton = document.getElementById("reload-button");

    console.log('Selected challenge:', challenge); // 调试信息
    console.log('Feedback data:', data.feedback); // 调试信息

    if (data.feedback[challenge]) {
        const userFeedback = data.feedback[challenge];
        resultSection.innerHTML = `
            <p><strong>挑战：</strong> ${challenge}</p>
            <p><strong>风险：</strong> ${userFeedback["風險"]}</p>
            <p><strong>建议：</strong> ${userFeedback["建議"].join('<br>')}</p>
        `;
    } else {
        resultSection.innerHTML = `<p>无法找到对应的反馈，请重新选择。</p>`;
        console.error('No feedback found for the selected challenge');
    }

    resultSection.classList.remove("hidden");
    reloadButton.classList.remove("hidden");
}

function reloadPage() {
    location.reload();
}

document.addEventListener("DOMContentLoaded", initialize);
