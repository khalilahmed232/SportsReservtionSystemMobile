var Booking = {
    name: 'No Stadium Selected',
    id: '0',
    updateTitle: function () {
        $('title').text(this.name + ' - Sports Reservation Centre');
    },
    updateNav: function () {
        $('.main-nav>div').text(this.name);
    },
    findDetails: function () {
        this.id = Util.GetURLParameter('stadiumId');
        stadium = SportsReserv.stadia.find(x => x.id == this.id);
        // this.id = stadium.id;
        this.name = stadium.name;
    },
    slots: [],
    populateSlots: function () {
        var fromHrs = $(".from-filter-button").text();
        var toHrs = $(".to-filter-button").text();
        var startTime = fromHrs + ':00';
        var endTime = toHrs + ':00';
        this.slots = [];
        var fromTime = moment(startTime, ['h:m a', 'H:m']);
        var finalEndTime = moment(endTime, ['h:m a', 'H:m']);
        toTime = fromTime.clone().add(this.slotRange, 'minutes');
        Booking.showDates(moment());
        var day = $('.selected-date').find(".day").text().trim();
        var month = $('.selected-date').find(".month").text().trim();
        var year = $('.selected-date').find(".year").text().trim();

        var url = corsproxy + backendUrl + "/DispatcherServlets?court="
            + Booking.id + "&date=" + year + "-" + moment().month(month).format("M") + "-" + day;

        $.ajax({
            url: url,
            type: 'get',
            success: function (data, textStatus, jQxhr) {
                var data2 = JSON.parse(data);
                console.log(data);
                console.log(data2);
                console.log("success");
                while (toTime.isBefore(finalEndTime)) {
                    toTime = fromTime.clone().add(Booking.slotRange, 'minutes');
                    if (isSlotAvailable(fromTime, data2)) {
                        Booking.slots.push({
                            slot: fromTime.format('HH:mm') + ' - ' + toTime.format('HH:mm'),
                            available: true
                        });
                    }
                    else {
                        Booking.slots.push({
                            slot: fromTime.format('HH:mm') + ' - ' + toTime.format('HH:mm'),
                            available: false
                        });
                    }

                    fromTime.add(60, 'minutes');
                }
                Booking.showAllSlots();
            },
            error: function (jqXhr, textStatus, errorThrown) {
                console.log(errorThrown);
                console.log("failed");
                alert("An error occurred while checking out");
            }
        });


    },
    slotRange: 15,
    updateSlotRange: function (slotRange) {
        this.slotRange = slotRange;
    },
    showAllSlots: function () {
        $(".all-slots").empty();
        this.slots.forEach(function (val, index) {
            if (val.available) {
                $(".all-slots").append(`
            <div class="slot available">${val.slot}</div>
            `);
            }
            else {
                $(".all-slots").append(`
                <div class="slot">${val.slot}</div>
                `);
            }
            // if (index % 4 == 3) {
            //     $(".all-slots").append(`
            //     <hr width='100%'>`);
            // }
        });

        $(".slot").on("click", function () {
            var day = $('.selected-date').find(".day").text();
            var month = $('.selected-date').find(".month").text();
            var year = $('.selected-date').find(".year").text();
            var slotTime = $(this).text();
            window.location = 'checkout.html?stadiumId=' + Booking.id
                + '&selectedDate=' + day + '-' + month + '-' + year + ''
                + '&selectedSlot=' + slotTime.trim()
                + '&sportId=' + Util.GetURLParameter('sportId');
        });
    },
    showDates: function (selectedDate) {
        var index = 0;
        var missing = 0;
        $('.available-dates').empty();
        $('.available-dates').append(`<div class="offset-date">
        </div>`);
        selectedDate = selectedDate.add(-2, 'days');
        var endDay = selectedDate.clone().add(4, 'days');
        while (selectedDate.isSameOrBefore(endDay)) {
            var day = selectedDate.date();
            var month = selectedDate.format("MMM");
            var week = selectedDate.format("ddd");
            var year = selectedDate.year();
            var selectedDateClass = "";

            var today = moment();
            if (selectedDate.isBefore(today, 'day')) {
                // if (day < today.date()) {
                selectedDateClass += 'before-today ';
                missing += 1;
            }
            if (missing > 0) {
                var width = missing * 20;
                $(".offset-date").css("width", width + "%");
            }

            if (index == 2) {
                selectedDateClass += 'selected-date ';
            }
            $('.available-dates').append(
                `<div class="single-date ${selectedDateClass}" >
    <div class="month">${month}</div>
    <div class="day">${day}</div>
    <div class="weekday">${week}</div>
    <div class="year">${year}</div>
            </div > `);
            selectedDate = selectedDate.add(1, 'days');
            index = index + 1;
        }
        $(".single-date").off("click");
        $(".single-date").on("click", singleDateClickFun);
    }
}

$().ready(function () {
    Booking.findDetails();
    Booking.updateTitle();
    Booking.updateNav();
    $(".time-range").on('click', timeRangeClickFun);
    $(".time-range:first").click();
    Booking.showDates(moment());
    $(".single-date").on("click", singleDateClickFun);


    $(".filter-button").on("click", function () {
        var fromHrs = $(".from-filter-button").text();
        var toHrs = $(".to-filter-button").text();
        $('.filter-all-hours').empty();
        var start = 0;
        var end = 24;
        var isFromHrs = $(this).hasClass('from-filter-button');
        if (isFromHrs) {
            end = toHrs;
        }
        else {
            start = fromHrs;
        }

        for (var i = start; i <= end; i++) {
            $('.filter-all-hours').append(` <div class="hour">${i}</div>`);
        }
        $('.hour').on("click", function () {
            if (isFromHrs) {
                $(".from-filter-button").text($(this).text());
            } else {
                $(".to-filter-button").text($(this).text());
            }
            $('.hour').off("click");
            $('.filter-all-hours').empty();
            Booking.populateSlots();

        });
    });
});

function timeRangeClickFun() {
    var timeRange = $(this).text().trim();
    $('.selected').removeClass('selected');
    $(this).addClass('selected');
    Booking.updateSlotRange(timeRange);
    Booking.populateSlots();
}

function singleDateClickFun() {
    var day = $(this).find(".day").text();
    var month = $(this).find(".month").text();
    var year = $(this).find(".year").text();
    var selectedDateStr = day + ':' + month + ':' + year;
    var selectedDate = moment(selectedDateStr, 'DD:MMM:YYYY');
    Booking.showDates(selectedDate);
}

function isSlotAvailable(toTimeSlot, allBookedSlots) {
    console.log(toTimeSlot.format('hh:mm:ss A'));
    for (var i = 0; i < allBookedSlots.length; i++) {
        if (toTimeSlot.format('hh:mm:ss A') == allBookedSlots[i]) {
            return false;
        }
    }
    return true;
}