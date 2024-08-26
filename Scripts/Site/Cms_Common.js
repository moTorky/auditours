$(document).ready(function () {
    var size = 2;
    if ($(window).width() > 500) {
        size = 2;
    }
    else {
        size = 1;
    }

    //$.datepicker.setDefaults({
    //    showWeek: false, firstDay: 1, dateFormat: 'dd-M-yy',
    //    //monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    //    changeYear: true, defaultDate: +7, changeMonth: true
    //});
    if (IsArabic == 1) {
        setDatePickerinArabic();
    }

    $(".datepicker1").datepicker({
        numberOfMonths: size, showOn: "both",
        yearRange: "-80:+0",
        buttonImage: "/content/site/imagescustomize/icon5.png",
        buttonImageOnly: true,
        minDate: new Date(),
        onSelect: function (selectedDate) {
            $(".datepicker1").val(selectedDate);
        },
        onClose: function (date) {
            //focus on next tab by sabir
            $(this).focus();
            var inputs = $(this).closest('form').find(':input');
            inputs.eq(inputs.index(this) + 1).focus();
        }
    });

    $(".fromDate").datepicker({
        defaultDate: "-80:+02",
        showOn: "both",
        numberOfMonths: size,
        //buttonImage: "/content/site/imagescustomize/icon5.png",
        buttonImageOnly: true,
        minDate: new Date(), changeYear: false, changeMonth: false,
        onSelect: function (selectedDate) {

            $(".fromDate").val(selectedDate);
            //$(".toDate").datepicker("option", "minDate", selectedDate);
            $(".ToDate").datepicker("option", "minDate", selectedDate);
            $(".toDate1").datepicker("option", "minDate", selectedDate);
            $(".toDate2").datepicker("option", "minDate", selectedDate);
            $(".toDate3").datepicker("option", "minDate", selectedDate);
            //$(".toDate4").datepicker("option", "minDate", selectedDate);
            //$(".toDate5").datepicker("option", "minDate", selectedDate);

        },
        onClose: function (date) {
            //focus on next tab by sabir
            $(this).focus();
            //$(".toDate1").focus();
            var inputs = $(this).closest('form').find(':input:visible');
            inputs.eq(inputs.index(this) + 1).focus();

        }
    });
    $(".ToDate").datepicker({
        defaultDate: "-80:+02",
        showOn: "both",
        numberOfMonths: size,
        buttonImageOnly: true,
        minDate: new Date(), changeYear: false, changeMonth: false,
        onSelect: function (selectedDate) {
            $(".ToDate").val(selectedDate);
        },
        onClose: function (date) {


        }
    });
    $(".fromDate,.ToDate,.toDate1,.toDate2,.toDate3,.toDate4,.toDate5,.datepicker1").change(function () {
        try {
            if ($(this).val() != '') {
                $.datepicker.parseDate('dd-M-yy', $(this).val());
            }
        }
        catch (e) {
            $(this).val(''); return false;
        }
    });

    //$(".toDate").datepicker({
    //    defaultDate: "-80:+02",
    //    showOn: "both",
    //    numberOfMonths: size,
    //    //buttonImage: "/content/site/imagescustomize/icon5.png",
    //    buttonImageOnly: true,
    //    minDate: new Date(), changeYear: false, changeMonth: false,
    //    onSelect: function (selectedDate) {
    //        $(".fromDate").datepicker("option", "maxDate", selectedDate);
    //        $(".toDate").datepicker("hide");

    //    }
    //});

    $(".toDate1").datepicker({
        defaultDate: "-80:+02",
        showOn: "both",
        numberOfMonths: size,
        //buttonImage: "/content/site/imagescustomize/icon5.png",
        buttonImageOnly: true,
        minDate: new Date(), changeYear: false, changeMonth: false,
        onSelect: function (selectedDate) {
            $(".toDate2").datepicker("option", "minDate", selectedDate);
            $(".fromDate").datepicker("option", "maxDate", selectedDate);
            //$(".toDate1").datepicker("hide");
            var inputs = $(".toDate1").closest('form').find(':input');
            inputs.eq(inputs.index(".toDate1") + 1).focus();

        }
    });

    $(".toDate2").datepicker({
        defaultDate: "-80:+02",
        showOn: "both",
        numberOfMonths: size,
        //buttonImage: "/content/site/imagescustomize/icon5.png",
        buttonImageOnly: true,
        minDate: new Date(), changeYear: false, changeMonth: false,
        onSelect: function (selectedDate) {
            $(".toDate3").datepicker("option", "minDate", selectedDate);
            $(".toDate1").datepicker("option", "maxDate", selectedDate);
            $(".toDate2").datepicker("hide");

        },
        onClose: function (date) {
            //focus on next tab by sabir
            $(this).focus();
            var inputs = $(this).closest('form').find(':input');
            inputs.eq(inputs.index(this) + 1).focus();
        }
    });

    $(".toDate3").datepicker({
        defaultDate: "-80:+02",
        showOn: "both",
        numberOfMonths: size,
        //buttonImage: "/content/site/imagescustomize/icon5.png",
        buttonImageOnly: true,
        minDate: new Date(), changeYear: false, changeMonth: false,
        onSelect: function (selectedDate) {
            $(".toDate4").datepicker("option", "minDate", selectedDate);
            $(".toDate2").datepicker("option", "maxDate", selectedDate);
            $(".toDate3").datepicker("hide");

        }
    });

    $(".toDate4").datepicker({
        defaultDate: "-80:+02",
        showOn: "both",
        numberOfMonths: size,
        //buttonImage: "/content/site/imagescustomize/icon5.png",
        buttonImageOnly: true,
        minDate: new Date(), changeYear: false, changeMonth: false,
        onSelect: function (selectedDate) {
            $(".toDate5").datepicker("option", "minDate", selectedDate);
            $(".toDate3").datepicker("option", "maxDate", selectedDate);
            $(".toDate4").datepicker("hide");

        }
    });

    $(".toDate5").datepicker({
        defaultDate: "-80:+02",
        showOn: "both",
        numberOfMonths: size,
        //buttonImage: "/content/site/imagescustomize/icon5.png",
        buttonImageOnly: true,
        minDate: new Date(), changeYear: false, changeMonth: false,
        onSelect: function (selectedDate) {
            $(".toDate4").datepicker("option", "maxDate", selectedDate);
            $(".toDate5").datepicker("hide");

        }
    });

    $('input[type="radio"]').on("change", function () {
        if ($('input:radio[name=optFlightType]:checked').val() == 'RoundTrip') {
            $("body").addClass("RoundTrip").removeClass("OneWay");
            $("body").removeClass("MultiLeg").removeClass("Nomad");
            $("#dvLocation").show();
            $("#dvLocation_dt").show();
            $("#dvArrivalDate").show();
            $("#dvLocation1").hide();
            $("#dvLocation1_dt").hide();
            $("#dvLocation2").hide();
            $("#dvLocation2_dt").hide();
            $("#dvLocation3").hide();
            $("#dvLocation3_dt").hide();
            $("#dvLocation4").hide();
            $("#dvLocation4_dt").hide();
            $("#dvLocation5").hide();
            $("#dvLocation5_dt").hide();
        }
        else if ($('input:radio[name=optFlightType]:checked').val() == 'OneWay') {
            $("body").addClass("OneWay").removeClass("RoundTrip");
            $("body").removeClass("MultiLeg").removeClass("Nomad");
            $("#dvLocation").show();
            $("#dvLocation_dt").show();
            $("#dvArrivalDate").hide();
            $("#dvLocation1").hide();
            $("#dvLocation1_dt").hide();
            $("#dvLocation2").hide();
            $("#dvLocation2_dt").hide();
            $("#dvLocation3").hide();
            $("#dvLocation3_dt").hide();
            $("#dvLocation4").hide();
            $("#dvLocation4_dt").hide();
            $("#dvLocation5").hide();
            $("#dvLocation5_dt").hide();
        }
        else if ($('input:radio[name=optFlightType]:checked').val() == 'MultiLeg') {
            var searchUrl = domainurl;
            $("body").addClass("MultiLeg").removeClass("OneWay");
            $("body").removeClass("RoundTrip").removeClass("Nomad");
            $("#dvLocation").hide();
            $("#dvLocation_dt").hide();
            $("#dvLocation1").show();
            $("#dvLocation1_dt").show();
            $("#dvLocation2").show();
            $("#dvLocation2_dt").show();
            $("#dvLocation3").show();
            $("#dvLocation3_dt").show();
            //searchUrl += "Flight/Search?FlightType=M";
            //window.location.href = searchUrl;
        }
        else if ($('input:radio[name=optFlightType]:checked').val() == 'Nomad') {
            var searchUrl = domainurl;
            $("body").addClass("Nomad").removeClass("OneWay");
            $("body").removeClass("RoundTrip");
            $("body").removeClass("MultiLeg");
            $("#dvLocation").hide();
            $("#dvLocation_dt").hide();
            $("#dvLocation1").hide();
            $("#dvLocation1_dt").hide();
            $("#dvLocation2").hide();
            $("#dvLocation2_dt").hide();
            $("#dvLocation3").hide();
            $("#dvLocation3_dt").hide();
            $("#dvLocation4").hide();
            $("#dvLocation4_dt").hide();
            $("#dvLocation5").hide();
            $("#dvLocation5_dt").hide();
            //searchUrl += "Flight/Search?FlightType=M";
            //window.location.href = searchUrl;
        }

    });
    $('input[type="radio"]').trigger("change");//on firsttime load

    //As datepicker blur event does not recognize current selected value i have use this.handled onselect event of datepicker
    $(".checkin").datepicker({

        defaultDate: "-80:+02",
        showOn: "both",
        numberOfMonths: size,
        buttonImage: "/content/site/imagescustomize/icon5.png",
        minDate: new Date(), changeYear: false, changeMonth: false,
        buttonImageOnly: true,

        onSelect: function (selectedDate) {
            $(".checkin").val(selectedDate);
            $(".checkout").datepicker("option", "minDate", selectedDate);

            if ($('#CheckOutDate').val() == "") {
                var date2 = $('#CheckInDate').datepicker('getDate');
                date2.setDate(date2.getDate() + 1);
                $("#CheckOutDate").datepicker("setDate", date2);
                var endDate = $('#CheckOutDate').datepicker('getDate');
                // $("#Night").val(daydiff(startDate, endDate));
            }

            if ($('#CheckOutDate').val() != "") {
                var startDate = $('#CheckInDate').datepicker('getDate');
                var endDate = $('#CheckOutDate').datepicker('getDate');
                //$("#Night").val(daydiff(parseDate($('#CheckInDate').val()), parseDate($('#CheckOutDate').val())));
                // $("#Night").val(daydiff(startDate, endDate));
            }

        },
        onClose: function (date) {
            //focus on next tab by sabir
            $(this).focus();
            var inputs = $(this).closest('form').find(':input');
            inputs.eq(inputs.index(this) + 1).focus();
        }
    });


    //As datepicker blur event does not recognize current selected value i have use this.handled onselect event of datepicker
    $(".checkout").datepicker({
        defaultDate: "-80:+02",
        showOn: "both",
        numberOfMonths: size,
        //minDate: new Date(),
        minDate: new Date(), changeYear: false, changeMonth: false,
        buttonImage: "/content/site/imagescustomize/icon5.png",
        buttonImageOnly: true,
        onSelect: function (selectedDate) {
            $(".checkin").datepicker("option", "maxDate", selectedDate);
            if ($('#CheckInDate').val() != "") {
                var startDate = $('#CheckInDate').datepicker('getDate');
                var endDate = $('#CheckOutDate').datepicker('getDate');
                //$("#Night").val(daydiff(parseDate($('#CheckInDate').val()), parseDate($('#CheckOutDate').val())));
                //  $("#Night").val(daydiff(startDate, endDate));
            }

            //focus on next tab by sabir
            $(this).focus();
            var inputs = $(this).closest('form').find(':input');
            inputs.eq(inputs.index(this) + 1).focus();
        }
    });

    $(".fromDate_ins").datepicker({
        defaultDate: "-80:+02",
        showOn: "both",
        numberOfMonths: size,
        //buttonImage: "/content/site/imagescustomize/icon5.png",
        buttonImageOnly: true,
        minDate: new Date(), changeYear: false, changeMonth: false,
        onSelect: function (selectedDate) {
            $(".fromDate_ins").val(selectedDate);
            $(".toDate_ins").datepicker("option", "minDate", selectedDate);

        },
        onClose: function (date) {
            //focus on next tab by sabir
            //$(this).focus();
            $(".toDate_ins").focus();
            var inputs = $(this).closest('form').find(':input');
            inputs.eq(inputs.index(this) + 1).focus();

        }
    });
    $(".fromDate_ins,.toDate_ins").change(function () {
        try {
            if ($(this).val() != '') {
                $.datepicker.parseDate('dd-M-yy', $(this).val());
            }
        }
        catch (e) {
            $(this).val(''); return false;
        }
    });

    $(".toDate_ins").datepicker({
        defaultDate: "-80:+02",
        showOn: "both",
        numberOfMonths: size,
        //buttonImage: "/content/site/imagescustomize/icon5.png",
        buttonImageOnly: true,
        minDate: new Date(), changeYear: false, changeMonth: false,
        onSelect: function (selectedDate) {
            $(".fromDate_ins").datepicker("option", "maxDate", selectedDate);
            $(".toDate_ins").datepicker("hide");

        }
    });

    // blur event of checkin textbox to handle textbox visibility


    $('#CheckOutDate').blur(function () {
        if ($('#CheckInDate').val() != "") {
            var startDate = $('#CheckInDate').datepicker('getDate');
            var endDate = $('#CheckOutDate').datepicker('getDate');
            //$("#Night").val(daydiff(parseDate($('#CheckInDate').val()), parseDate($('#CheckOutDate').val())));
            //  $("#Night").val(daydiff(startDate, endDate));
        }

    });


    //blur event of night to set date
    $('#Night').blur(function () {
        var date2 = $('.checkin').datepicker('getDate', '+1d');
        var night = 0;
        night = parseInt($('#Night').val());
        date2.setDate(date2.getDate() + night);
        $('.checkout').datepicker('setDate', date2);
    });


    function setDatePickerinArabic() {
        $.datepicker.regional['ar'] = {
            monthNames: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو',
                'يوليو', 'أغسطس', 'سبتمبر', 'اكتوبر', 'نوفمبر', 'ديسمبر'],
            monthNamesShort: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
            //monthNamesShort: ['كانون الثاني', 'شباط', 'آذار', 'نيسان', 'آذار', 'حزيران','تموز', 'اغسطس', 'سبتمبر ', 'تشرين الأول', 'تشرين الثاني', 'كانون الأول'],
            dayNames: ['السبت', 'الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة'],
            dayNamesShort: ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'],
            dayNamesMin: ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'],
            firstDay: 0,
            prevText: '&#x3c;السابق', prevStatus: '',
            prevJumpText: '&#x3c;&#x3c;', prevJumpStatus: '',
            nextText: 'التالي&#x3e;', nextStatus: '',
            nextJumpText: '&#x3e;&#x3e;', nextJumpStatus: '',
            currentText: 'اليوم', currentStatus: '',
            todayText: 'اليوم', todayStatus: '',
            clearText: '-', clearStatus: '',
            closeText: 'إغلاق', closeStatus: '',
            yearStatus: '', monthStatus: '',
            weekText: 'أسبوع', weekStatus: '',
            dayStatus: 'DD d MM',
            defaultStatus: '',
            isRTL: true
        };
        $.datepicker.setDefaults($.datepicker.regional['ar']);
    }

});

function RetriveCode(location) {
    location = location.trim();
    var location1 = location.split(",");
    location = location1[location1.length - 1];
    return location.trim();
}

function RetriveName(location) {
    location = location.trim();
    var location1 = location.split(",");
    location = location1[0].trim() + ", " + location1[1].trim();
    return location.trim();
}
function AddMaxValue(Id) {
    //debugger;
    var maxValue = 9;

    var value = 1;

    var TotalSelectedAdult = $('#txtPaxType_0__Qty').val();
    var TotalSelectedChild = $('#txtPaxType_1__Qty').val();
    var TotalSelectedInfant = $('#txtPaxType_2__Qty').val();

    if ($("#txt" + Id).val() !== "") {
        value = parseInt($("#txt" + Id).val());
        if (Id == 'PaxType_0__Qty') {
            if (value < parseInt(maxValue - TotalSelectedChild)) {
                value = value + 1;
            }
        }
        else if (Id == 'PaxType_1__Qty') {
            if (value < parseInt(maxValue - TotalSelectedAdult)) {
                value = value + 1;
            }
        }
        else if (Id == 'PaxType_2__Qty') {
            if (value < parseInt(TotalSelectedAdult)) {
                value = value + 1;
            }
        }
    }
    $("#" + Id).val(value.toString());
    $("#txt" + Id).val(value.toString());

}
function MinusMinValue(Id, minValue) {
    //debugger;
    var value = minValue;

    var TotalSelectedAdult = $('#txtPaxType_0__Qty').val();
    var TotalSelectedChild = $('#txtPaxType_1__Qty').val();
    var TotalSelectedInfant = $('#txtPaxType_2__Qty').val();

    if ($("#txt" + Id).val() !== "") {
        value = parseInt($("#txt" + Id).val());
        if (Id == 'PaxType_0__Qty') {
            if (value > minValue) {
                value = value - 1;
            }
            if (value < TotalSelectedInfant) {
                $("#PaxType_2__Qty").val(value.toString());
                $("#txtPaxType_2__Qty").val(value.toString());
            }
        }
        else {
            if (value > minValue) {
                value = value - 1;
            }
        }
    }
    $("#" + Id).val(value.toString());
    $("#txt" + Id).val(value.toString());

}
function AddValue1(Id, maxValue) {
    var value = 1;

    if ($("#txt" + Id).val() !== "") {
        value = parseInt($("#txt" + Id).val());
        if (value < maxValue) {
            value = value + 1;
        }
    }
    $("#" + Id).val(value.toString());
    $("#txt" + Id).val(value.toString());

    //var value = $('#txtoptChildren_hotel').val();

    //if (value == '0') {
    //    $("#dvChild").hide();
    //}
    //else {
    //    $("#dvChild").show();
    //}
    //if (value == '1') {
    //    $("#dvChild1").show();
    //    $("#dvChild2").hide();
    //    $("#dvChild3").hide();
    //    $("#dvChild4").hide();
    //}
    //else if (value == '2') {
    //    $("#txtdvChild1").show();
    //    $("#dvChild2").show();
    //    $("#dvChild3").hide();
    //    $("#dvChild4").hide();
    //}
    //else if (value == '3') {
    //    $("#dvChild1").show();
    //    $("#dvChild2").show();
    //    $("#dvChild3").show();
    //    $("#dvChild4").hide();
    //}
    //else if (value == '4') {
    //    $("#dvChild1").show();
    //    $("#dvChild2").show();
    //    $("#dvChild3").show();
    //    $("#dvChild4").show();
    //}
}
function MinusValue1(Id, minValue) {
    var value = minValue;
    if ($("#txt" + Id).val() !== "") {
        value = parseInt($("#txt" + Id).val());
        if (value > minValue) { value = value - 1; }
    }
    $("#" + Id).val(value.toString());
    $("#txt" + Id).val(value.toString());
}




