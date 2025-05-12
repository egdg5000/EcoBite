
function validatePassword(password) {
    return {
        length: password.length >= 8,
        uppercase: /[A-Z]/.test(password),
        lowercase: /[a-z]/.test(password),
        number: /\d/.test(password),
    };
}
    
const passwordInput = document.getElementById('new-password');
const confirmPasswordInput = document.getElementById('confirm-password');
const passwordReqs = {
    length: document.getElementById('length'),
    uppercase: document.getElementById('uppercase'),
    lowercase: document.getElementById('lowercase'),
    number: document.getElementById('number')
};
const matchMessage = document.getElementById('match-message');
const submitButton = document.querySelector('button');

passwordInput.addEventListener('input', () => {
    const validation = validatePassword(passwordInput.value);
    let allValid = true;

    for (let key in validation) {
        if (validation[key]) {
            passwordReqs[key].style.color = "green";
            passwordReqs[key].style.fontWeight = "bold";
        } else {
            passwordReqs[key].style.color = "red";
            passwordReqs[key].style.fontWeight = "normal";
            allValid = false;
        }
    }
    if (passwordInput.value === confirmPasswordInput.value) {
        matchMessage.textContent = "Wachtwoorden komen overeen!";
        matchMessage.style.color = "green";
    } else {
        matchMessage.textContent = "Wachtwoorden komen niet overeen!";
        matchMessage.style.color = "red";
    }

    submitButton.disabled = !allValid || passwordInput.value !== confirmPasswordInput.value;
});

confirmPasswordInput.addEventListener('input', () => {
    if (passwordInput.value === confirmPasswordInput.value) {
        matchMessage.textContent = "Wachtwoorden komen overeen!";
        matchMessage.style.color = "green";
    } else {
        matchMessage.textContent = "Wachtwoorden komen niet overeen!";
        matchMessage.style.color = "red";
    }
    submitButton.disabled = passwordInput.value !== confirmPasswordInput.value;
});

document.getElementById('reset-form').addEventListener('submit', async function(event) {
    event.preventDefault();
    const newPassword = document.getElementById('new-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const message = document.getElementById('message');

    if (!validatePassword(newPassword)) {
        message.textContent = "Wachtwoord moet minstens één hoofdletter, één kleine letter en één cijfer bevatten en minstens 8 tekens lang zijn.";
        message.style.color = "red";
        return;
    } else {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');
        const body = JSON.stringify({
            password: newPassword,
            token: token,
        })
        const response = await fetch('https://edg5000.com/recovery', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body
        });
        const data = await response.json();
        if (data.success) {
            message.textContent = 'Wachtwoord succesvol gereset!';
            message.style.color = "green";
        } 
        else { 
            switch (data.message) {
                case 'Token not found':
                    message.textContent = 'Deze link is niet meer geldig.';
                    message.style.color = "red";
                    break;
                case 'Same password already exist':
                    message.textContent = 'Hetzelfde wachtwoord bestaat al.';
                    message.style.color = "red";
                    break;
                default:
                    console.error(data.message);
                    message.textContent = 'Er is iets misgegaan';
                    message.style.color = "red";
            }
        }
    }
});
