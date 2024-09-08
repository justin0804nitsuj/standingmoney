function login() {
    const username = document.getElementById('username').value;
    if (username) {
        // 取得登入次數，從 localStorage 中獲取或初始化為 0
        let loginCount = localStorage.getItem(`${username}_loginCount`) || 0;
        loginCount++;
        localStorage.setItem(`${username}_loginCount`, loginCount);

        // 向伺服器發送請求以更新總來訪人次
        fetch('/api/visits', { method: 'POST' })
            .then(response => response.json())
            .then(data => {
                const encodedUsername = encodeURIComponent(username);
                window.location.href = `https://movingmoney-pro-bug.vercel.app/main.html?username=${encodedUsername}&loginCount=${loginCount}&totalvisited=${data.totalVisits}`;
            })
            .catch(error => console.error('Error updating total visits:', error));
    } else {
        alert("請輸入姓名");
    }
}

function getParameterByName(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

function displayWelcomeMessage() {
    const username = getParameterByName('username');
    const loginCount = getParameterByName('loginCount');
    const totalVisits = getParameterByName('totalvisited');
    
    if (username) {
        document.getElementById('welcome-message').textContent = `已成功登入 名稱為 ${username}`;
        document.getElementById('login-count').textContent = `這是您第 ${loginCount} 次登入`;
        document.getElementById('total-visited').textContent = `總來訪人次：${totalvisited}`;
    } else {
        document.getElementById('welcome-message').textContent = `未提供姓名`;
    }
}