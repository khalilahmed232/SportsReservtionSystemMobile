$().ready(function () {
    $(".alert").hide();
});
function checkPassword() {

    $("button").empty();
    $("button").addClass("progress-bar-striped");
    $("button").html('Validating Credentials &nbsp; <i class="fas fa-sync fa-spin"></i>');

    var url = corsproxy + backendUrl + "/Admin?username=" + $("#username").val() + "+&password=" + $("#password").val();
    $.ajax({
        url: url,
        type: 'get',
        success: function (data, textStatus, jQxhr) {

            if (data == 'status:"success"') {
                window.location = "admin.html";
            }
            else {
                $("button").removeClass("progress-bar-striped");
                $("button").html('Login Again');
                $(".error-message").empty();
                $(".error-message").html('Username or password is incorrect');
                $(".alert").show();
            }
        },
        error: function (jqXhr, textStatus, errorThrown) {
            console.log(errorThrown);
            console.log("failed");
            $(".error-message").empty();
            $(".error-message").html('Username or password is incorrect');
            $(".alert").show();
        }
    });


}