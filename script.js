let companySize, workType, jobLevel, data;

function loadJSON(callback) {
    const xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', 'data.json', true); // 確保路徑正確
    xobj.onreadystatechange = function () {
        if (xobj.readyState === 4 && xobj.status === "200") {
            callback(JSON.parse(xobj.responseText));
        }
    };
    xobj.send(null);
}

function initialize() {
    loadJSON(function (response) {
        data = response;
        document.getElementById("question-section").classList.remove("hidden");
    });
}

function submitAnswer() {
    companySize = document.getElementById("user-input").value;
    document.getElementById("question-section").classList.add("hidden");
    document.getElementById("work-type-section").classList.remove("hidden");
}

function submitWorkType() {
    workType = document.getElementById("work-type-input").value;
    document.getElementById("work-type-section").classList.add("hidden");
    document.getElementById("job-level-section").classList.remove("hidden");
}

function submitJobLevel() {
    jobLevel = document.getElementById("job-level-input").value;
    document.getElementById("job-level-section").classList.add("hidden");

    // 顯示挑戰選項
    const challengeSelect = document.getElementById("challenge-input");
    challengeSelect.innerHTML = '';
    if (data.challenges[companySize] && data.challenges[companySize][workType] && data.challenges[companySize][workType][jobLevel]) {
        data.challenges[companySize][workType][jobLevel].forEach((challenge) => {
            const option = document.createElement("option");
            option.value = challenge;
            option.text = challenge;
            challengeSelect.appendChild(option);
        });
    } else {
        const option = document.createElement("option");
        option.value = "";
        option.text = "無法找到對應的挑戰";
        challengeSelect.appendChild(option);
    }

    document.getElementById("challenge-section").classList.remove("hidden");
}

function submitChallenge() {
    const challenge = document.getElementById("challenge-input").value;
    const resultSection = document.getElementById("result-section");
    const reloadButton = document.getElementById("reload-button");

    if (data.feedback[challenge]) {
        const userFeedback = data.feedback[challenge];
        resultSection.innerHTML = `
            <p><strong>挑戰：</strong> ${challenge}</p>
            <p><strong>風險：</strong> ${userFeedback["風險"]}</p>
            <p><strong>建議：</strong> ${userFeedback["建議"].join('<br>')}</p>
        `;
    } else {
        resultSection.innerHTML = `<p>無法找到對應的反饋，請重新選擇。</p>`;
    }

    resultSection.classList.remove("hidden");
    reloadButton.classList.remove("hidden");
}

function reloadPage() {
    location.reload();
}

document.addEventListener("DOMContentLoaded", initialize);
