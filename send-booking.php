<?php
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    exit;
}

/* =========================
   HONEYPOT CHECK
========================= */
if (!empty($_POST['website'])) {
    exit; // bot detected
}

/* =========================
   SANITIZE INPUTS
========================= */
function clean($value) {
    return htmlspecialchars(trim($value), ENT_QUOTES, 'UTF-8');
}

$place    = clean($_POST['place'] ?? '');
$checkin  = clean($_POST['checkin'] ?? '');
$checkout = clean($_POST['checkout'] ?? '');
$guests   = clean($_POST['guests'] ?? '');
$name     = clean($_POST['name'] ?? '');
$contact  = clean($_POST['contact'] ?? '');
$email    = clean($_POST['email'] ?? '');
$location = clean($_POST['location'] ?? '');
$messageText = clean($_POST['message'] ?? '');

/* =========================
   VALIDATION
========================= */
if (
    empty($place) || empty($checkin) || empty($checkout) ||
    empty($name) || empty($contact) || empty($email)
) {
    exit("Required fields missing.");
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    exit("Invalid email address.");
}

/* =========================
   PREVENT HEADER INJECTION
========================= */
if (preg_match("/\r|\n/", $email) || preg_match("/\r|\n/", $name)) {
    exit("Invalid input.");
}

/* =========================
   EMAIL SETUP
========================= */
$to = "contact@ayurdestination.com";
$subject = "New Booking Enquiry - $place";

$body = "
NEW BOOKING ENQUIRY

Place: $place
Check-in: $checkin
Check-out: $checkout
Guests: $guests

CONTACT DETAILS
Name: $name
Contact: $contact
Email: $email
Location: $location

MESSAGE
$messageText
";

$headers  = "From: Ayur Destination <no-reply@ayurdestination.com>\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

/* =========================
   SEND MAIL
========================= */
if (mail($to, $subject, $body, $headers)) {
    header("Location: thank-you.html");
    exit;
} else {
    exit("Mail sending failed.");
}
