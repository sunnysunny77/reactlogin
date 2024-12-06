<!DOCTYPE html>
<html>
<body>
<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_REQUEST["name"];
    $tel = $_REQUEST["tel"];
    $email = $_REQUEST["email"];
    $text = $_REQUEST["text"];
    $to_email = "shlooby07@gmail.com";
    $subject = "New Enquiry Message";
    $headers = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";  

    $contactus = "
    <html>
    <p>You have a message from the enquiry page on your website:</p>
    <b>Name: </b>".$name."
    <br><b>Phone: </b>".$tel."
    <br><b>Email: </b>".$email."
    <br><b>Text: </b>".$text."
    </html>";
    $contactus  = wordwrap($contactus ,70);
    $mail = mail($to_email,$subject,$contactus,$headers);
    if (!$mail) {
      echo print_r(error_get_last()['message']);
    } else {
      echo "Thanks sent to mail";
    }
}
?>

</body>
</html>