document.addEventListener('DOMContentLoaded', () => {
    const welcomeMessage = document.getElementById('welcome-message');
    if (welcomeMessage) {
        const originalText = welcomeMessage.textContent;
        welcomeMessage.textContent = '';

        let i = 0;
        function typeWriter() {
            if (i < originalText.length) {
                welcomeMessage.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 120); // A slightly faster, more natural typing speed
            } else {
                // Create and append the blinking cursor only when typing is done
                const cursor = document.createElement('span');
                cursor.className = 'blinking-cursor';
                welcomeMessage.parentNode.appendChild(cursor);
            }
        }

        typeWriter();
    }
});
