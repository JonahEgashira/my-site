const welcomeMessage = document.getElementById('welcome-message');
const originalText = welcomeMessage.textContent;
welcomeMessage.textContent = '';

let i = 0;
function typeWriter() {
    if (i < originalText.length) {
        welcomeMessage.textContent += originalText.charAt(i);
        i++;
        setTimeout(typeWriter, 150);
    } else {
        // Optional: Add a blinking cursor at the end
        welcomeMessage.style.borderRight = '2px solid #0071e3';
        setInterval(() => {
            welcomeMessage.style.borderRightColor = 
                welcomeMessage.style.borderRightColor === 'transparent' 
                ? '#0071e3' 
                : 'transparent';
        }, 500);
    }
}

typeWriter();
