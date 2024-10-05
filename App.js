document.addEventListener("DOMContentLoaded", function() {
    
    const currentPage = window.location.pathname.split('/').pop();
    
    
    document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const currentPage = window.location.pathname.split('/').pop();
    
    document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
});


function showConfirmation(event) {
    event.preventDefault(); 

    Swal.fire({
        title: 'Success!',
        text: 'Form berhasil dikirim',
        icon: 'success',
        confirmButtonText: 'OK'
    }).then((result) => {
        if (result.isConfirmed) {
            window.location.href = 'index.html'; 
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', showConfirmation);
    }
});

let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
    // Mencegah prompt default
    e.preventDefault();
    // Simpan event untuk dipicu nanti
    deferredPrompt = e;
    
    // Tampilkan tombol install
    const installButton = document.getElementById('install-button');
    installButton.style.display = 'block'; // Tampilkan tombol
});

document.getElementById('install-button').addEventListener('click', (e) => {
    // Sembunyikan tombol
    const installButton = document.getElementById('install-button');
    installButton.style.display = 'none';

    // Tampilkan prompt install
    deferredPrompt.prompt();
    
    // Tunggu respons dari pengguna
    deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
            console.log('Pengguna menerima prompt A2HS');
        } else {
            console.log('Pengguna menolak prompt A2HS');
        }
        deferredPrompt = null; // Kosongkan variabel deferredPrompt
    });
});


if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js').then((registration) => {
            console.log('Service Worker registered with scope:', registration.scope);
        }).catch((error) => {
            console.error('Service Worker registration failed:', error);
        });
    });
}






