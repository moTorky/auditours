function loadFlightHistory() {
    var storageB2C_FlightHistory = localStorage.getItem('B2C_FlightHistory');
    if (storageB2C_FlightHistory != null) {
        var B2C_FlightrecentSearch = JSON.parse(localStorage.getItem('B2C_FlightHistory'));
        var htmldata = '';
        var _index = 0;
        if (B2C_FlightrecentSearch != undefined && B2C_FlightrecentSearch.length > 0) {
            FillLastFightSearch(B2C_FlightrecentSearch.length - 1);
            for (var elementdata = 0; elementdata <= B2C_FlightrecentSearch.length - 1; elementdata++) {
                var flightdata = B2C_FlightrecentSearch[elementdata];
                if (new Date(flightdata['FareLocations[0].DepartureOn']) < new Date()) {
                    B2C_FlightrecentSearch.splice(elementdata, 1);
                }
            }
        }
        if (B2C_FlightrecentSearch != undefined && B2C_FlightrecentSearch.length > 0) {
            for (var i = B2C_FlightrecentSearch.length - 1; i >= 0; i--) {
                if (B2C_FlightrecentSearch[i] != undefined) {
                    var flightdata = B2C_FlightrecentSearch[i];
                    var genratehtml1 = "<div class='col-xs-12 col-sm-6 col-md-4 col-lg-4 Recenttab'>" +
                        "<div class='recent-selectiontrip'>" + flightdata.FlightType + "</div>"
                    var genratehtml2 = "";
                    var genratehtml3 = "";
                    if (flightdata.FlightType == "OneWay" || flightdata.FlightType == "MultiCity") {
                        genratehtml2 = "<div class='recent-city'>" +
                            flightdata['FareLocations[0].DepartureLocation'].split(',')[0] + " To " +
                            flightdata['FareLocations[0].ArrivalLocation'].split(',')[0] + "</div>"

                        genratehtml3 = "<div class='recent-date'>" + flightdata['FareLocations[0].DepartureOn'] + "</div>"
                    }
                    else if (flightdata.FlightType == "RoundTrip") {
                        genratehtml2 = "<div class='recent-city'>" +
                            flightdata['FareLocations[0].DepartureLocation'].split(',')[0] + " To " +
                            flightdata['FareLocations[0].ArrivalLocation'].split(',')[0] + "</div>"

                        genratehtml3 = "<div class='recent-date'>" + flightdata['FareLocations[0].DepartureOn'] +
                            " - " + flightdata['FareLocations[0].ArrivalOn'] + "</div>"
                    }

                    var genratehtml = genratehtml1 + genratehtml2 + genratehtml3 +
                        "<div class='recent-class'>" + flightdata.Class + " - " +
                        parseInt(parseInt(flightdata['PaxType[0].Qty']) + parseInt(flightdata['PaxType[1].Qty']) + parseInt(flightdata['PaxType[2].Qty'])) + " traveler" + "</div>" +
                        "<div class='flightrecent-button' onclick='SearchFlightfromHistory(" + i + ")'>" + "Search" + "</div>" +
                        "</div>"
                    _index++;
                    htmldata += genratehtml;
                }
            }
        }
        localStorage.setItem('B2C_FlightHistory', JSON.stringify(B2C_FlightrecentSearch));
        $('#recentflight-data').html(htmldata);
    }
}

function SearchFlightfromHistory(_sid) {
    localStorage.setItem("Mode", "Flight.SearchingFlights");
    $("#loader-page").show();
    FillLastFightSearch(_sid);
    GenerateContent();
}

function FillLastFightSearch(flightindex) {
    var B2C_FlightrecentSearch = "";
    if (localStorage.getItem('B2C_FlightHistory') != null) {
        if (JSON.parse(localStorage.getItem('B2C_FlightHistory')) != '') {
            B2C_FlightrecentSearch = JSON.parse(localStorage.getItem('B2C_FlightHistory'));
        }
    }
    else {
        B2C_FlightrecentSearch = null;
    }

    if (B2C_FlightrecentSearch != null & B2C_FlightrecentSearch != undefined && B2C_FlightrecentSearch.length > 0) {
        var lastflight = B2C_FlightrecentSearch[flightindex];
        if (lastflight.Class != "") {
            $("#Class").val(lastflight.Class);
            $("#Class").trigger("change");
        }

        if (lastflight.DirectFlightsOnly == 'true') {
            $("#DirectFlightsOnly").prop('checked', true);
        }
        if (lastflight.Flight_CouponCode != "") {
            $("#Flight_CouponCode").val(lastflight.Flight_CouponCode)
        }
        if (lastflight['PaxType[0].Qty'] != 0) {
            setDropDown('PaxType_0__Qty', lastflight['PaxType[0].Qty'], '9');
            TotalPassanger();
        }
        if (lastflight['PaxType[1].Qty'] != 0) {
            setDropDown('PaxType_1__Qty', lastflight['PaxType[0].Qty'], '9');
            TotalPassanger();
        }
        if (lastflight['PaxType[2].Qty'] != 0) {
            setDropDown('PaxType_2__Qty', lastflight['PaxType[0].Qty'], '9');
            TotalPassanger();
        }
        if (lastflight.FlightType == "OneWay") {
            $("input[name=FlightType][value=OneWay]").prop('checked', true);
            OneWay();
            $('[name="FareLocations[0].DepartureLocation"]').val(lastflight['FareLocations[0].DepartureLocation']);
            $('[name="FareLocations[0].ArrivalLocation"]').val(lastflight['FareLocations[0].ArrivalLocation']);
            $('[name="FareLocations[0].DepartureOn"]').val(lastflight['FareLocations[0].DepartureOn']);
        }
        if (lastflight.FlightType == "RoundTrip") {
            $("input[name=FlightType][value=RoundTrip]").prop('checked', true);
            RoundTrip()
            $('[name="FareLocations[0].DepartureLocation"]').val(lastflight['FareLocations[0].DepartureLocation']);
            $('[name="FareLocations[0].DepartureOn"]').val(lastflight['FareLocations[0].DepartureOn']);
            $('[name="FareLocations[0].ArrivalLocation"]').val(lastflight['FareLocations[0].ArrivalLocation']);
            $('[name="FareLocations[0].ArrivalOn"]').val(lastflight['FareLocations[0].ArrivalOn']);
        }
        if (lastflight.FlightType == "MultiCity") {
            $("input[name=FlightType][value=MultiCity]").prop('checked', true);
            MultiCity()
            if (lastflight['FareLocations[1].DepartureOn'] != "") {
                $('[name="FareLocations[1].DepartureLocation"]').val(lastflight['FareLocations[1].DepartureLocation']);
                $('[name="FareLocations[1].ArrivalLocation"]').val(lastflight['FareLocations[1].ArrivalLocation']);
                $('[name="FareLocations[1].DepartureOn"]').val(lastflight['FareLocations[1].DepartureOn']);
            }
            if (lastflight['FareLocations[2].DepartureOn'] != "") {
                ManageSegment(2, '+')
                $('[name="FareLocations[2].DepartureLocation"]').val(lastflight['FareLocations[2].DepartureLocation']);
                $('[name="FareLocations[2].ArrivalLocation"]').val(lastflight['FareLocations[2].ArrivalLocation']);
                $('[name="FareLocations[2].DepartureOn"]').val(lastflight['FareLocations[2].DepartureOn']);
            }
            if (lastflight['FareLocations[3].DepartureOn'] != "") {
                ManageSegment(3, '+')
                $('[name="FareLocations[3].DepartureLocation"]').val(lastflight['FareLocations[3].DepartureLocation']);
                $('[name="FareLocations[3].ArrivalLocation"]').val(lastflight['FareLocations[3].ArrivalLocation']);
                $('[name="FareLocations[3].DepartureOn"]').val(lastflight['FareLocations[3].DepartureOn']);
            }
            if (lastflight['FareLocations[4].DepartureOn'] != "") {
                ManageSegment(4, '+')
                $('[name="FareLocations[4].DepartureLocation"]').val(lastflight['FareLocations[4].DepartureLocation']);
                $('[name="FareLocations[4].ArrivalLocation"]').val(lastflight['FareLocations[4].ArrivalLocation']);
                $('[name="FareLocations[4].DepartureOn"]').val(lastflight['FareLocations[4].DepartureOn']);
            }
            if (lastflight['FareLocations[5].DepartureOn'] != "") {
                ManageSegment(5, '+')
                $('[name="FareLocations[5].DepartureLocation"]').val(lastflight['FareLocations[5].DepartureLocation']);
                $('[name="FareLocations[5].ArrivalLocation"]').val(lastflight['FareLocations[5].ArrivalLocation']);
                $('[name="FareLocations[5].DepartureOn"]').val(lastflight['FareLocations[5].DepartureOn']);
            }
            if (lastflight['FareLocations[6].DepartureOn'] != "") {
                ManageSegment(6, '+')
                $('[name="FareLocations[6].DepartureLocation"]').val(lastflight['FareLocations[6].DepartureLocation']);
                $('[name="FareLocations[6].ArrivalLocation"]').val(lastflight['FareLocations[6].ArrivalLocation']);
                $('[name="FareLocations[6].DepartureOn"]').val(lastflight['FareLocations[6].DepartureOn']);
            }
        }
    }
}

function ManageSegment(Index, Action) {
    if (Action == '+') {
        $("#add-multicity" + Index).hide();
        $("#add-multicity" + (Index + 1)).parent().show();
        $("#add-multicity" + (Index + 1)).show();
    } else if (Action == '-') {
        $("#add-multicity" + Index).parent().hide();
        $("#add-multicity" + (Index - 1)).parent().show();
        $("#add-multicity" + (Index - 1)).show();
        $("#add-multicity" + Index).parent().find('input:text').val('');
        $("#add-multicity" + Index).parent().find('select').val('');
    }
    else {
        for (var i = Index; i <= 6; i++) {
            // $("#add-multicity" + i).hide();
            $("#add-multicity" + i).parent().hide();
        }
    }
}
//Nomad
//<<
function ManageNomadSegment(Index, Action) {
    if (Action == '+') {
        $("#add-nomad" + Index).hide();
        $("#add-nomad" + (Index + 1)).parent().show();
        $("#add-nomad" + (Index + 1)).show();

    } else if (Action == '-') {
        $("#add-nomad" + Index).parent().hide();
        $("#add-nomad" + (Index - 1)).parent().show();
        $("#add-nomad" + (Index - 1)).show();
        $("#FareLocations_" + (Index - 1) + "__ToArrivalCity").val('');
        $("#txtFareLocations_" + (Index - 1) + "__MinToNights").val('3');
        $("#txtFareLocations_" + (Index - 1) + "__MaxToNights").val('5');
        //$("#add-nomad" + Index).parent().find('input:text').val('');
        //$("#add-nomad" + Index).parent().find('select').val('');
    }
    else {
        for (var i = Index; i <= 11; i++) {
            $("#add-nomad" + i).hide();
            $("#add-nomad" + i).parent().hide();
        }
    }
}

function ChangeNumberOfMinToNights(CurrentIndex) {
    var MinToNights = $('#txtFareLocations_' + CurrentIndex + '__MinToNights').val();
    var MaxToNights = $('#txtFareLocations_' + CurrentIndex + '__MaxToNights').val();
    if (parseInt(MinToNights) > parseInt(MaxToNights)) {
        $('#txtFareLocations_' + CurrentIndex + '__MaxToNights').val(MinToNights);
    }
}
function ChangeNumberOfMaxToNights(CurrentIndex) {
    var MinToNights = $('#txtFareLocations_' + CurrentIndex + '__MinToNights').val();
    var MaxToNights = $('#txtFareLocations_' + CurrentIndex + '__MaxToNights').val();
    if (parseInt(MinToNights) > parseInt(MaxToNights)) {
        -
        $('#txtFareLocations_' + CurrentIndex + '__MinToNights').val(MaxToNights);
    }
}
var CaptchaCount = 0;

function Airlines() {
    var Flights = $("#IncludeAirlines").val();
    $("#air-lines").load("Flight/Home/AirLines/?AirlinesData=" + Flights).dialog("open");
}

function getQuerystring(key, default_) {
    if (default_ == null) default_ = "";
    key = key.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regex = new RegExp("[\\?&]" + key + "=([^&#]*)");
    var qs = regex.exec(window.location.href);

    if (qs == null)
        return default_;
    else
        return qs[1];
}

function ChangeOrder(element) {
    if (element.val() != "") {
        $.post("/Flight/Home/FetchSelectedOrder", { OrderNo: element.val() },
            function (data) {
                if (data != "") {

                    if (data.OneWay != null && data.OneWay == true) {
                        $('input:radio[name=FlightType]:nth(1)').attr('checked', true);
                        OneWay();
                    }
                    if (data.AirFromCity1 != null) {
                        $("#FareLocations_" + 0 + "__DepartureLocation").val(data.AirFromCity1);
                    }
                    if (data.AirToCity1 != null) {
                        $("#FareLocations_" + 0 + "__ArrivalLocation").val(data.AirToCity1);
                    }
                    if (data.DepartureDate1 != null) {
                        $("#FareLocations_" + 0 + "__DepartureOn").datepicker('setDate', new Date(parseInt(data.DepartureDate1.substr(6))));
                    } else {
                        $("#FareLocations_" + 0 + "__DepartureOn").val('');
                    }
                    if (data.DepartureTime1 != null) {
                        $("#FareLocations_" + 0 + "__DepartureTime").val(data.DepartureTime1);
                    }
                    //-------------Extra-----------
                    if (data.Class != null) {
                        $('#Class').val(data.Class);
                    }
                    if (data.Adult != null) {
                        $("#PaxType_0__Qty").val(data.Adult)
                    }
                    if (data.Child != null) {
                        $("#PaxType_1__Qty").val(data.Child)
                    }
                    if (data.Infant != null) {
                        $("#PaxType_2__Qty").val(data.Infant)
                    }
                    if (data.Preferredairline != null) {
                        $("#IncludeAirlines").val(data.Preferredairline);
                    }
                    if (data.Directflightsonly != null && data.Directflightsonly == true) {
                        $("#DirectFlightsOnly").prop("checked", true);
                    }

                    //----------RoundTrip----------------
                    if (data.RoundTrip != null && data.RoundTrip == true) {
                        $('input:radio[name=FlightType]:nth(0)').attr('checked', true);
                        RoundTrip();

                        if (data.ReturnDate != null) {
                            $("#FareLocations_" + 0 + "__ArrivalOn").datepicker('setDate', new Date(parseInt(data.ReturnDate.substr(6))));
                        } else {
                            $("#FareLocations_" + 0 + "__ArrivalOn").val('');
                        }

                        if (data.ReturnTime != null) {
                            $("#FareLocations_" + 0 + "__ArrivalTime").val(data.ReturnTime);
                        }
                    }

                    //----------MultiCity----------------
                    if (data.MultiCity != null && data.MultiCity == true) {
                        $('input:radio[name=FlightType]:nth(2)').attr('checked', true);
                        MultiCity();

                        if (data.AirFromCity2 != null) {
                            $("#FareLocations_" + 1 + "__DepartureLocation").val(data.AirFromCity2);
                        }
                        if (data.AirToCity1 != null) {
                            $("#FareLocations_" + 1 + "__ArrivalLocation").val(data.AirToCity2);
                        }
                        if (data.DepartureDate2 != null) {
                            $("#FareLocations_" + 1 + "__DepartureOn").datepicker('setDate', new Date(parseInt(data.DepartureDate2.substr(6))));
                        } else {
                            $("#FareLocations_" + 1 + "__DepartureOn").val('');
                        }
                        if (data.DepartureTime2 != null) {
                            $("#FareLocations_" + 1 + "__DepartureTime").val(data.DepartureTime2);
                        }
                        if (data.AirFromCity3 != null) {
                            $("#FareLocations_" + 2 + "__DepartureLocation").val(data.AirFromCity3);
                        }
                        if (data.AirToCity3 != null) {
                            $("#FareLocations_" + 2 + "__ArrivalLocation").val(data.AirToCity3);
                        }
                        if (data.DepartureDate3 != null) {
                            $("#FareLocations_" + 2 + "__DepartureOn").datepicker('setDate', new Date(parseInt(data.DepartureDate3.substr(6))));
                        } else {
                            $("#FareLocations_" + 2 + "__DepartureOn").val('');
                        }
                        if (data.DepartureTime3 != null) {
                            $("#FareLocations_" + 2 + "__DepartureTime").val(data.DepartureTime3);
                        }
                        if (data.AirFromCity4 != null) {
                            $("#FareLocations_" + 3 + "__DepartureLocation").val(data.AirFromCity4);
                        }
                        if (data.AirToCity4 != null) {
                            $("#FareLocations_" + 3 + "__ArrivalLocation").val(data.AirToCity4);
                        }
                        if (data.DepartureDate4 != null) {
                            $("#FareLocations_" + 3 + "__DepartureOn").datepicker('setDate', new Date(parseInt(data.DepartureDate4.substr(6))));
                        } else {
                            $("#FareLocations_" + 3 + "__DepartureOn").val('');
                        }
                        if (data.DepartureTime4 != null) {
                            $("#FareLocations_" + 3 + "__DepartureTime").val(data.DepartureTime4);
                        }
                        if (data.AirFromCity5 != null) {
                            $("#FareLocations_" + 4 + "__DepartureLocation").val(data.AirFromCity5);
                        }
                        if (data.AirToCity5 != null) {
                            $("#FareLocations_" + 4 + "__ArrivalLocation").val(data.AirToCity5);
                        }
                        if (data.DepartureDate5 != null) {
                            $("#FareLocations_" + 4 + "__DepartureOn").datepicker('setDate', new Date(parseInt(data.DepartureDate5.substr(6))));
                        } else {
                            $("#FareLocations_" + 4 + "__DepartureOn").val('');
                        }
                        if (data.DepartureTime5 != null) {
                            $("#FareLocations_" + 4 + "__DepartureTime").val(data.DepartureTime5);
                        }
                    }

                    Search();
                }
            }, "json");

    } else {


    }
}
function SelectTopDestination(element) {
    //console.log( $(element).parent());
    //console.log(element);
    var parentId = $(element).parent().attr('id');
    // console.log($(element).data('id'));
    var CityCode = $(element).data('id');
    var Location = $(element).data('val');
    var CurrentIndex = parentId.split('_')[1];
    var txtArrivalId = "#FareLocations_" + CurrentIndex + "__ArrivalLocation";

    $(txtArrivalId).val(Location);
    var TopDestinationId = "#FareLocations_" + CurrentIndex + "__ArrivalTopDest";
    var DepartureTextId = "#FareLocations_" + CurrentIndex + "__DepartureLocation";
    var DepartureValue = $(DepartureTextId).val();
    $(TopDestinationId + " a").each(function () {
        var e = $(this);
        if (e.data('id') == CityCode) {
            $(this).hide();
            //console.log("Found");
        }
        else {
            if (DepartureValue != "") {
                var ArrivalAirportCode = DepartureValue.substring(DepartureValue.indexOf('(') + 1, DepartureValue.indexOf(')'));
                if (e.data('id') == ArrivalAirportCode) {
                    $(this).hide();
                }
                else {
                    $(this).show();
                }
            }
            else {
                $(this).show();
            }
        }

    });
    ChangeDestinaton(element);
    //$(element).hide();

}
function ChangeDestinaton(element) {

    var CurrentId = element.id;
    var CurrentIndex = CurrentId.split('_')[1];
    var DepartureTextId = "#FareLocations_" + CurrentIndex + "__DepartureLocation";

    var CurrentValue = $(DepartureTextId).val();
    var ArrivalVal = $("#" + CurrentId).val();

    if (CurrentValue != "") {
        var AirPortCode = "";
        try {
            AirPortCode = CurrentValue.substring(CurrentValue.indexOf('(') + 1, CurrentValue.indexOf(')'));
        } catch (e) {

        }

        if (ArrivalVal == "") {
            GetTopDestination(AirPortCode, "#FareLocations_" + CurrentIndex + "__ArrivalTopDest");
        }
        var TopDestinationId = "#FareLocations_" + CurrentIndex + "__ArrivalTopDest";
        $(TopDestinationId + " a").each(function () {
            var e = $(this);
            if (e.data('id') == AirPortCode) {
                $(this).hide();
                //console.log("Found");
            }
            else {
                if (ArrivalVal != "") {

                    var ArrivalAirportCode = "";
                    try {
                        ArrivalAirportCode = ArrivalVal.substring(ArrivalVal.indexOf('(') + 1, ArrivalVal.indexOf(')'));
                    } catch (e) {

                    }
                    if (e.data('id') == ArrivalAirportCode) {
                        $(this).hide();
                    }
                    else {
                        $(this).show();
                    }
                }
                else {
                    $(this).show();
                }
            }

        });
        $("#FareLocations_" + CurrentIndex + "__FormInputTopDest").addClass("open");
    }
    else {

    }


    //console.log(CurrentId);
}
function GetTopDestination(AirportCode, resetId) {
    $.post("/Flight/Home/GetTopDestination", { LanguageId: "0", AirportCode: AirportCode }, function (data) {

        if (data.IsSuccess == 'true') {
            var DestinationList = data.Data;
            var List = "";
            for (var i = 0; i < DestinationList.length; i++) {
                if (resetId == "") {
                    List += "<a href='' data-id='" + DestinationList[i].AirportCode + "' data-val='" + DestinationList[i].Destination + "' onclick='SelectTopDestination(this);'>" + DestinationList[i].CityName + "</a>";
                }
                else {
                    if (AirportCode != DestinationList[i].AirportCode) {
                        List += "<a href='' data-id='" + DestinationList[i].AirportCode + "' data-val='" + DestinationList[i].Destination + "' onclick='SelectTopDestination(this);'>" + DestinationList[i].CityName + "</a>";
                    }
                    else {

                        List += "<a href='' data-id='" + DestinationList[i].AirportCode + "' data-val='" + DestinationList[i].Destination + "' onclick='SelectTopDestination(this);'  style='display: none;'>" + DestinationList[i].CityName + "</a>";
                    }
                }
            }
            List += "<div class='c'></div>";
            if (resetId == "") {
                $("#FareLocations_0__ArrivalTopDest").html(List);
                $("#FareLocations_1__ArrivalTopDest").html(List);
                $("#FareLocations_2__ArrivalTopDest").html(List);
                $("#FareLocations_3__ArrivalTopDest").html(List);
                $("#FareLocations_4__ArrivalTopDest").html(List);
                $("#FareLocations_5__ArrivalTopDest").html(List);
            }
            else {
                $(resetId).html(List);
            }
        }
    });
}

function CheckForValidation() {
    var retValue = "Suceess";
    var totalAdultChild = parseInt($("#PaxType_0__Qty").val()) + parseInt($("#PaxType_1__Qty").val());
    if ($("#PaxType_0__Qty").val() < $("#PaxType_2__Qty").val()) {
        retValue = '@Resources.GetResourceString("Flight.Error.InfantNumber")';
        return retValue;
    } else if (totalAdultChild >= 9) {
        retValue = '@Resources.GetResourceString("Flight.Error.TotalPax")';
    }
    else if (Number($("#PaxType_0__Qty").val()) + Number($("#PaxType_1__Qty").val()) == 0) {
        retValue = '@Resources.GetResourceString("Flight.Error.Paxnumber")';
    }
    else if (Number($("#PaxType_0__Qty").val()) == 0) {
        retValue = '@Resources.GetResourceString("Flight.Error.paxadult")';
    }
    return retValue;
}

function ValidateQueryString() {

    var res = "";
    if (getQuerystring('FlightType', '') == '') {
        //$("#FlightType").addClass("input-validation-error");
        //return false;
        res += "Please Select Flight Type.</ br>";
    }
    if (getQuerystring('Class', '') == '') {
        //$("#Class").addClass("input-validation-error");
        //return false;
        res += "Please Select Class.</ br>";
    }
    var origin = getQuerystring('origin_1', '');
    if (origin == '') {
        //$("#Class").addClass("input-validation-error");
        //return false;
        res += "Please Select DepartureLocation.</ br>";
    } else {
        //var str_arr = origin.split(',');
        //if (str_arr.length != 2) {
        //    res += "Please Origin Properly.</ br>";
        //} else {
        //    for (i = 0; i < str_arr.length; i++) {
        //        if ($.trim(str_arr[i]) == "" && i == 0) {
        //            res += "Please Select Origin City.</ br>";
        //        } else if ($.trim(str_arr[i]) == "" && i == 1) {
        //            res += "Please Select Origin Country.</ br>";
        //        }
        //    }
        //}
        if ($("#FareLocations_" + 0 + "__DepartureLocation").val() == "No Match Found") {
            res += "DepartureLocation does not exist.</ br>";
        }
    }
    var Dest = getQuerystring('Dest_1', '');
    if (Dest == '') {
        res += "Please Select ArrivalLocation.</ br>";
    } else {
        //var str_arr = Dest.split(',');
        //if (str_arr.length < 2) {
        //    res += "Please Dest Properly.</ br>";
        //} else {
        //    for (i = 0; i < str_arr.length; i++) {
        //        if ($.trim(str_arr[i]) == "" && i == 0) {
        //            res += "Please Select Dest City.</ br>";
        //        } else if ($.trim(str_arr[i]) == "" && i == 1) {
        //            res += "Please Select Dest Country.</ br>";
        //        }
        //    }
        //}
        if ($("#FareLocations_" + 0 + "__ArrivalLocation").val() == "No Match Found") {
            res += "ArrivalLocation does not exist.</ br>";
        }
    }


    var deptDate = getQuerystring('deptdate_1', '');
    if (deptDate == '') {
        res += "Please select departure date.</ br>";
    } 
        var retdate = getQuerystring('retdate', '');
    if (retdate == '') {
        //return false;
        //res += "Please select return Date.</ br>";
    }

        return res;

}