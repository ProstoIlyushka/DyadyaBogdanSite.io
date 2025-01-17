document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (!menuToggle || !mobileMenu) {
        console.error('Меню или кнопка переключения не найдены!');
        return;
    }

    menuToggle.addEventListener('click', function(e) {
        e.preventDefault(); // Всегда предотвращаем переход
        mobileMenu.classList.toggle('active');
        console.log('Меню переключено'); // Для отладки
    });
});

document.getElementById('feedbackForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    
    fetch('send_mail.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if(data.status === 'success') {
            alert('Сообщение отправлено!');
            this.reset();
        } else {
            alert('Произошла ошибка. Попробуйте позже.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Произошла ошибка. Попробуйте позже.');
    });
});

document.getElementById('reviewForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    
    fetch('send_review.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if(data.status === 'success') {
            alert(data.message);
            this.reset();
        } else {
            alert(data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Произошла ошибка. Пожалуйста, попробуйте позже.');
    });
});
