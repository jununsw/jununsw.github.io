<?php

header('Expires: Sun, 01 Jan 2014 00:00:00 GMT');
header('Cache-Control: no-store, no-cache, must-revalidate');
header('Cache-Control: post-check=0, pre-check=0', FALSE);
header('Pragma: no-cache');

// connect to database to see if it is a new attempt
if (!isset($_GET["id"])) {
    die("Cannot obtain your id, probably due to your network connection, please close the tab and re-try");
} else {
    $zid = $_GET["id"];
}

?>

<!doctype html>
<html lang="en">
    <head>
        <meta charset="utf-8"/>
        <meta name="description" content="Teaching and learning module"/>
        <meta name="keywords" content=""/>
        <meta name="author" content="Dr Xiaojun Chen"/>
        
        <title>Quiz 01</title>
        <link rel="shortcut icon" href="http://www.lindenbaum.net.au/unsw/util/favicon.ico" type="image/vnd.microsoft.icon"/>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>
        <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>
        
        <script>
            var who = '<?php echo $zid; ?>';
        </script>
    </head>
    <body>
        <div style="max-width: 900px; border: 2px red solid; padding: 1em; margin: 2em auto;">
            <p>
                <strong>IMPORTANT NOTICE:</strong><br/><br/>You can have <strong>ONLY ONE</strong> chance to attempt the quiz. By Clicking the button below, you start your attempt. Please ensure your network condition is good and stable since you do not have a second chance to attempt the quiz unless special permission is granted by the instructor.
            </p>
            <p>
                A timer is set and shown in the upper right during the quiz. When the time is up, you cannot edit your answers anymore. Your quiz <strong>WILL NOT</strong> be automatically submitted when the time is up, so you must click the submit button yourself.
            </p>
            <p>
                <strong style="color: red;">Warning: Any re-attempt will overwrite your previous record. Do not re-attempt without your instructor's permission.</strong>
            </p>
            <p>
                Are you sure to start the quiz now? (If you are not ready, you can close your tab / browser)
            </p>
            <button id="startbtn" type="button" class="btn btn-primary">Yes, I want to attempt the quiz now!</button>
            <br/><br/>
            <p>
                By clicking the buttom above, you will be redirected to the page to verify your student id and then the quiz will start.
            </p>
        </div>
    </body>
    <script type="text/javascript">
        $(document).ready(function() {
            $("#startbtn").click(function() {
                $("#startbtn").html("Redirecting to the quiz page, please wait...").prop("disabled", true);
                
                method = "post"; // Set method to post by default if not specified.
                
                var form = document.createElement("form");
                form.setAttribute("method", method);
                form.setAttribute("action", "main.php?v=" + (Math.floor(((new Date()).getTime()) / 1000)).toString());

                var hiddenField = document.createElement("input");
                hiddenField.setAttribute("type", "hidden");
                hiddenField.setAttribute("name", "id");
                hiddenField.setAttribute("value", who);

                form.appendChild(hiddenField);

                document.body.appendChild(form);
                form.submit();
            });
        });
    </script>
</html>