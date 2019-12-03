var Checkout = {
    populateCheckoutDetails: function () {
        $(".date.value").text(Util.GetURLParameter('selectedDate'));
        $(".slot.value").text(Util.GetURLParameter('selectedSlot'));
        var stadiumId = Util.GetURLParameter('stadiumId');
        var stadium = SportsReserv.stadia.find(x => x.id == stadiumId);
        $(".stadium-name.value").text(stadium.name);
        $(".address1.value").text(stadium.addressLine1);
        $(".address2.value").text(stadium.city + ", " + stadium.state + ", " + stadium.zipCode);
        var sportId = Util.GetURLParameter('sportId');
        var sport = SportsReserv.sports.find(x => x.id == sportId);
        $(".sport-name").text(sport.name);
    }
};


$().ready(function () {
    Checkout.populateCheckoutDetails();
});

function submitCheckoutDetails() {
    console.log("hello");
    var url = corsproxy + backendUrl + '/RegisterCourt'
        + '?courtid=' + Util.GetURLParameter('stadiumId')
        + '&book_date=' + moment(Util.GetURLParameter('selectedDate'), 'DD-MMM-YYYY').format('YYYY-MM-DD')
        + '&book_time=' + Util.GetURLParameter('selectedSlot').substring(0, 5) + ':00'
        + '&firstName="' + $("#firstName").val() + '"'
        + '&lastName="' + $("#lastName").val() + '"'
        + '&emailid="' + $("#email").val() + '"';

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
    return false;
}