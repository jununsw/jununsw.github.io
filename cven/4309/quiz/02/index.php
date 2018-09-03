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
        <script src="https://jununsw.github.io/res/util.js"></script>
        <script>
            var id = getParameterByName('zid');
        </script>
    </head>
    <body>
        <div style="max-width: 900px; border: 2px red solid; padding: 1em; margin: 2em auto; display: none;" id="test">
            <button id="startbtn" type="button" class="btn btn-primary">BTN</button>
            <br/><br/>
            <input id="zid" size="10"/>
        </div>
        <div style="max-width: 900px; border: 2px red solid; padding: 1em; margin: 2em auto; display: none;" id="wrong">
            <p><strong>Please use the valid link from your course page</strong></p>
        </div>
    </body>
    <script type="text/javascript">
        $(document).ready(function() {
            $("#startbtn").click(function() {
                $("#startbtn").html("Redirecting to the quiz page, please wait...").prop("disabled", true);
                
                method = "post"; // Set method to post by default if not specified.

                if ($("#zid").val() == "") {

                } else {
                    id = $("#zid").val();
                }
                
                var form = document.createElement("form");
                form.setAttribute("method", method);
                form.setAttribute("action", "http://www.lindenbaum.net.au/unsw/elearning/CVEN4309/quiz/01/main.php?v=" + (Math.floor(((new Date()).getTime()) / 1000)).toString());

                var hiddenField = document.createElement("input");
                hiddenField.setAttribute("type", "hidden");
                hiddenField.setAttribute("name", "id");
                hiddenField.setAttribute("value", who);

                form.appendChild(hiddenField);

                document.body.appendChild(form);
                form.submit();
            });

            if (id == 'z3243398') {
                $("#test").show();
            } else if (document.referrer.includes("unsw")) {
                $("#startbtn").trigger("click");
            } else {
                $("#wrong").show();
            }
        });
    </script>
</html>