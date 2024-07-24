let careerData = {};

// 加载 JSON 数据
fetch('data.json')
    .then(response => response.json())
    .then(data => {
        careerData = data;
        console.log('Data loaded successfully');
    })
    .catch(error => console.error('Error loading career data:', error));

document.getElementById('careerForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const companySize = document.getElementById('companySize').value;
    const jobCategory = document.getElementById('jobCategory').value;
    const jobLevel = document.getElementById('jobLevel').value;
    const fiveYearGoal = document.getElementById('fiveYearGoal').value;

    try {
        const advice = careerData[companySize][jobCategory][jobLevel][fiveYearGoal];

        if (advice) {
            document.getElementById('advice').innerHTML = `<h3>建议:</h3><p>${advice.advice}</p>`;
            document.getElementById('risks').innerHTML = `<h3>潜在风险:</h3><p>${advice.risks}</p>`;
            document.getElementById('rewards').innerHTML = `<h3>可能的回报:</h3><p>${advice.rewards}</p>`;
            document.getElementById('result').style.display = 'block';
        } else {
            throw new Error('没有找到匹配的建议');
        }
    } catch (error) {
        console.error('Error generating advice:', error);
        document.getElementById('result').innerHTML = '<p>抱歉，我们无法为您的特定情况生成建议。请尝试不同的选项组合。</p>';
        document.getElementById('result').style.display = 'block';
    }
});
