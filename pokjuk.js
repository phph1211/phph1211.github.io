const video = document.getElementById('mtVideo');
const countdownElement = document.getElementById('countdown');
const randomNumbersElement = document.getElementById('randomNumbers');
const startButton = document.getElementById('startButton');
const duration = 6000; 

startButton.addEventListener('click', () => {
    startCountdown();
    startButton.style.display = 'none'; 
    video.style.display = 'none'; 
});

function startCountdown() {
    let count = 9; 
    const countdownInterval = setInterval(() => {
        if (count > 0) {
            countdownElement.innerText = count;
            countdownElement.classList.add('scale-up'); // 애니메이션 효과 추가
            setTimeout(() => {
                countdownElement.classList.remove('scale-up'); // 애니메이션 클래스 제거
            }, 300); // 애니메이션 시간과 동일하게 설정

            count--;
        } else {
            clearInterval(countdownInterval);
            countdownElement.style.display = 'none';
            generateRandomNumbers();
            video.style.display = 'block'; 
            video.play();

            setInterval(() => {
                video.currentTime = 0; 
                video.play(); 
                setTimeout(() => {
                    video.pause(); 
                }, duration);
            }, duration + 100); 
        }
    }, 1100); 
}

function generateRandomNumbers() {
    const randomNumbers = new Set();
    while (randomNumbers.size < 3) {
        const randomNumber = Math.floor(Math.random() * (294 - 174 + 1)) + 174;
        randomNumbers.add(randomNumber);
    }
    randomNumbersElement.classList.add('grow');
    randomNumbersElement.style.opacity = '1';
    randomNumbersElement.innerText = "🎊축하합니다🎊  \n" + Array.from(randomNumbers).join(', '); // 랜덤 숫자 표시

    // 랜덤 숫자가 보이도록 애니메이션 추가

    setTimeout(() => {
        randomNumbersElement.classList.remove('grow');
    }, 500); // 애니메이션이 끝나는 시간
}
