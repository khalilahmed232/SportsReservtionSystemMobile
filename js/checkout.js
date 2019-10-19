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