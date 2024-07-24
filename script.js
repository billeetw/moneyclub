document.addEventListener("DOMContentLoaded", function() {
    loadJSON();
});

function loadJSON() {
    fetch('data.json')
        .then(response => response.json())
        .then(json => {
            window.data = json;
            console.log("Data loaded:", window.data);
            initCompanySizeSelector();
        })
        .catch(error => console.error('Error loading JSON:', error));
}

function initCompanySizeSelector() {
    const companySizeSelect = document.getElementById("company-size-input");
    Object.keys(window.data["公司规模"]).forEach(size => {
        let option = document.createElement("option");
        option.value = size;
        option.text = size;
        companySizeSelect.appendChild(option);
    });
}

function submitCompanySize() {
    const companySize = document.getElementById("company-size-input").value;
    const workTypeSelect = document.getElementById("work-type-input");
    workTypeSelect.innerHTML = '';
    Object.keys(window.data["公司规模"][companySize]).forEach(workType => {
        let option = document.createElement("option");
        option.value = workType;
        option.text = workType;
        workTypeSelect.appendChild(option);
    });
    document.getElementById("work-type-section").classList.remove("hidden");
}

function submitWorkType() {
    const companySize = document.getElementById("company-size-input").value;
    const workType = document.getElementById("work-type-input").value;
    const jobLevelSelect = document.getElementById("job-level-input");
    jobLevelSelect.innerHTML = '';
    Object.keys(window.data["公司规模"][companySize][workType]).forEach(jobLevel => {
        let option = document.createElement("option");
        option.value = jobLevel;
        option.text = jobLevel;
        jobLevelSelect.appendChild(option);
    });
    document.getElementById("job-level-section").classList.remove("hidden");
}

function submitJobLevel() {
    const companySize = document.getElementById("company-size-input").value;
    const workType = document.getElementById("work-type-input").value;
    const jobLevel = document.getElementById("job-level-input").value;
    const challengeSelect = document.getElementById("challenge-input");
    challengeSelect.innerHTML = '';
    window.data["公司规模"][companySize][workType][jobLevel].forEach(challenge => {
        let option = document.createElement("option");
        option.value = challenge["挑战"];
        option.text = challenge["挑战"];
        challengeSelect.appendChild(option);
    });
    document.getElementById("challenge-section").classList.remove("hidden");
}

function submitChallenge() {
    const companySize = document.getElementById("company-size-input").value;
    const workType = document.getElementById("work-type-input").value;
    const jobLevel = document.getElementById("job-level-input").value;
    const challengeName = document.getElementById("challenge-input").value;
    const challenge = window.data["公司规模"][companySize][workType][jobLevel].find(ch => ch["挑战"] === challengeName);
    const resultSection = document.getElementById("result-section");
    if (challenge) {
        resultSection.innerHTML = `<p><strong>挑战：</strong>${challenge["挑战"]}</p>
                                   <p><strong>风险：</strong>${challenge["风险"]}</p>
                                   <p><strong>建议：</strong>${challenge["建议"].join('<br>')}</p>`;
        resultSection.classList.remove("hidden");
    } else {
        resultSection.innerHTML = `<p>未找到对应挑战的详细反馈，请检查数据文件或选择其他挑战。</p>`;
    }
}
