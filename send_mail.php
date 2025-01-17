<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Получаем данные из формы
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $phone = htmlspecialchars($_POST['phone']);
    $subject = htmlspecialchars($_POST['subject']);
    $message = htmlspecialchars($_POST['message']);
    
    // Преобразуем тему обращения в читаемый вид
    $subject_text = "";
    switch($subject) {
        case "question":
            $subject_text = "Вопрос";
            break;
        case "suggestion":
            $subject_text = "Предложение";
            break;
        case "complaint":
            $subject_text = "Жалоба";
            break;
        case "other":
            $subject_text = "Другое";
            break;
    }
    
    $to = "zaiczevil32@gmail.com";
    $email_subject = "Новое сообщение с сайта: " . $subject_text;
    
    // Формируем тело письма
    $body = "Получено новое сообщение с сайта:\n\n";
    $body .= "Имя: " . $name . "\n";
    $body .= "Email: " . $email . "\n";
    $body .= "Телефон: " . $phone . "\n";
    $body .= "Тема: " . $subject_text . "\n";
    $body .= "Сообщение:\n" . $message . "\n";
    
    // Заголовки письма
    $headers = "From: " . $email . "\r\n";
    $headers .= "Reply-To: " . $email . "\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();
    
    // Отправляем письмо
    if(mail($to, $email_subject, $body, $headers)) {
        echo json_encode(["status" => "success", "message" => "Сообщение успешно отправлено"]);
    } else {
        echo json_encode(["status" => "error", "message" => "Ошибка при отправке сообщения"]);
    }
}
?>
