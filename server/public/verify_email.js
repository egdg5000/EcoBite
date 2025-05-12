
const urlParams = new URLSearchParams(window.location.search);
const token = urlParams.get('token');

fetch(`https://edg5000.com/verify`, {
    method: 'POST',
    credentials: 'include',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token })
}).then(response => response.json())
    .then(data => {
    if (data.success){
        document.querySelector('.title').innerText = "Email Geverifieerd!";
        document.querySelector('.loading').style.display = "none";
        document.querySelector('.checkmark').style.display = "block";
        document.querySelector('.message').innerText = "Uw email is successvol geverifieerd. U kunt deze pagina sluiten.";
    } else {
        document.querySelector('.title').innerText = "Verificatie mislukt.";
        document.querySelector('.loading').style.display = "none";
        switch (data.message) {
            case 'Invalid token':
                document.querySelector('.message').innerText = 'Token is niet geldig';
                break;
            case 'E-mail already verified':
                document.querySelector('.message').innerText = 'Deze e-mail is al geverifieerd.';
                break;
            case 'Verification token expired':
                document.querySelector('.message').innerText = 'De verificatielink is verlopen';
                break;
            default:
                document.querySelector('.message').innerText = data.message;
        }
    }
    }).catch(error => {
        console.error(error);
        document.querySelector('.title').innerText = "Verificatie mislukt.";
        document.querySelector('.loading').style.display = "none";
        document.querySelector('.message').innerText = "Er is iets misgegaan. Probeer het later opnieuw.";
    });
