function showAlert(btn) {
    btn.siblings(".alert").show();
    btn.siblings(".alert").find(".span-text").html(btn.siblings("input").val());
}


function cancelById() {
    var bookingId = $("#bookingId").val();
    var url = corsproxy + backendUrl + "/CancelBooking?booking_id=" + bookingId;
    $.ajax({
        url: url,
        type: 'get',
        success: function (data, textStatus, jQxhr) {
            alert(data);
            console.log(data);
            console.log("success");
        },
        error: function (jqXhr, textStatus, errorThrown) {
            console.log(errorThrown);
            console.log("failed");
            alert("An error occurred while checking out");
        }
    });
}


function cancelByDate() {
    var cancelDate = $("#cancelDate").val();
    var url = corsproxy + backendUrl + "/CancelOnDate?date=" + cancelDate;
    $.ajax({
        url: url,
        type: 'get',
        success: function (data, textStatus, jQxhr) {
            alert(data);
            console.log(data);
            console.log("success");
        },
        error: function (jqXhr, textStatus, errorThrown) {
            console.log(errorThrown);
            console.log("failed");
            alert("An error occurred while checking out");
        }
    });
}

function broadcastMessage() {
    var message = $("#message").val();
    var url = corsproxy + backendUrl + "/BroadCast?message=" + message;
    $.ajax({
        url: url,
        type: 'get',
        success: function (data, textStatus, jQxhr) {
            alert(data);
            console.log(data);
            console.log("success");
        },
        error: function (jqXhr, textStatus, errorThrown) {
            console.log(errorThrown);
            console.log("failed");
            alert("An error occurred while checking out");
        }
    });
}
function gotoIndex() {
    window.location = "index.html";
}