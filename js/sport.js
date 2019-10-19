var Sport = {
    name: 'No Sport Selected',
    id: '0',
    updateTitle: function () {
        $('title').text(this.name + ' - Sports Reservation Centre');
    },
    updateNav: function () {
        $('.main-nav>div').text(this.name);
    },
    findDetails: function () {
        this.id = Util.GetURLParameter('selectedSport');
        sport = SportsReserv.sports.find(x => x.id == this.id);
        this.id = sport.id;
        this.name = sport.name;
    },
    findStadia: function () {
        this.stadia = SportsReserv.stadia.filter(x => x.sports.includes(this.id));
        console.log(this.stadia);
    },
    addStadia: function () {
        this.stadia.forEach(val => {
            $('.all-stadia').append(`
                <div class="stadium" data-id="${val.id}">
                    <img src="${val.img}" alt="Stadium Image">
                    <h3 class="details">${val.name}</h3>
                    <div class="details"><i class="fas fa-at"></i><a href="mailto:${val.email}"> ${val.email}</a></div>
                    <div class="details"><i class="fas fa-phone fa-flip-horizontal"></i><a href="tel:${val.phone}"> ${val.phone}</a></div>
                    <div class="details">${val.addressLine1}</div>
                    <div class="details">${val.city} ${val.state} - ${val.zipCode}</div>
                </div>`
            );
        });
    }
}

$().ready(function () {
    Sport.findDetails();
    Sport.updateTitle();
    Sport.updateNav();
    Sport.findStadia();
    Sport.addStadia();
    $('.stadium').on('click', function () {
        window.location = 'booking.html'
            + '?stadiumId=' + $(this).attr("data-id")
            + '&sportId=' + Sport.id;
    })
});
