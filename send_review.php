<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Логируем получение данных
    error_log("Получены данные отзыва: " . print_r($_POST, true));
    
    // Получаем данные из формы
    $name = htmlspecialchars($_POST['name']);
    $rating = htmlspecialchars($_POST['rating']);
    $review = htmlspecialchars($_POST['review']);
    
    // Email администратора
    $to = "zaiczevil32@gmail.com";
    
    // Тема письма
    $subject = "Новый отзыв на сайте";
    
    // Формируем текст письма
    $message = "Получен новый отзыв:\n\n";
    $message .= "Имя: " . $name . "\n";
    $message .= "Оценка: " . $rating . " звезд(ы)\n";
    $message .= "Отзыв:\n" . $review . "\n";
    $message .= "\nДата: " . date("d.m.Y H:i:s") . "\n";
    
    // Заголовки письма
    $headers = "From: noreply@uncle-bogdan.ru\r\n";
    $headers .= "Reply-To: noreply@uncle-bogdan.ru\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();
    
    // Отправляем письмо
    if(mail($to, $subject, $message, $headers)) {
        error_log("Отзыв успешно отправлен");
        echo json_encode(["status" => "success", "message" => "Отзыв отправлен"]);
    } else {
        error_log("Ошибка отправки отзыва");
        echo json_encode(["status" => "error", "message" => "Ошибка отправки"]);
    }
}
?> 