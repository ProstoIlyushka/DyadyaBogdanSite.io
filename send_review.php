<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Получаем данные из формы
    $name = htmlspecialchars($_POST['name']);
    $rating = htmlspecialchars($_POST['rating']);
    $review = htmlspecialchars($_POST['review']);
    
    // Email администратора
    $to = "ваша_реальная_почта@example.com";
    
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
        // Успешная отправка
        $response = [
            "status" => "success",
            "message" => "Спасибо за ваш отзыв! Он будет опубликован после модерации."
        ];
    } else {
        // Ошибка отправки
        $response = [
            "status" => "error",
            "message" => "Произошла ошибка при отправке отзыва. Пожалуйста, попробуйте позже."
        ];
    }
    
    // Отправляем ответ в формате JSON
    header('Content-Type: application/json');
    echo json_encode($response);
}
?> 