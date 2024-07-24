let data;

function loadJSON() {
    fetch('data.json')
    .then(response => response.json())
    .then(json => {
        data = json;
        console.log('Data loaded:', data);
        document.getElementById("question-section").classList.remove("hidden");
    })
    .catch(error => console.error('Error loading JSON:', error));
}

function submitJobLevel() {
    const jobLevel = document.getElementById("job-level-input").value;
    const challengeSelect = document.getElementById("challenge-input");
    challengeSelect.innerHTML = '';

    let challenges = data.challenges["中型公司"]["產品開發"][jobLevel];
    challenges.forEach(challenge => {
        let option = document.createElement("option");
        option.value = challenge;
        option.text = challenge;
        challengeSelect.appendChild(option);
    });

    document.getElementById("challenge-section").classList.remove("hidden");
}

function submitChallenge() {
    const challenge = document.getElementById("challenge-input").value;
    const feedback = data.feedback[challenge];
    const resultSection = document.getElementById("result-section");

    if (feedback) {
        resultSection.innerHTML = `<p><strong>挑战：</strong>${challenge}</p>
                                   <p><strong>风险：</strong>${feedback["風險"]}</p>
                                   <p><strong>建议：</strong>${feedback["建议"].join('<br>')}</p>`;
        resultSection.classList.remove("hidden");
    } else {
        resultSection.innerHTML = `<p>未找到对应挑战的详细反馈，请检查数据文件或选择其他挑战。</p>`;
    }
}

document.addEventListener("DOMContentLoaded", loadJSON);
