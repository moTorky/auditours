$(document).ready(function () {
    var size = 2;
    var IsArabic = 0;
    if ($(window).width() > 500) {
        size = 2;
    }
    else {
        size = 1;
    }
    $('.IsNumber').keypress(function (event) {
        return isNumber(event, this)
    });
    $.datepicker.setDefaults({ showWeek: false, firstDay: 1, dateFormat: 'dd-M-yy', monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], changeYear: true, defaultDate: +7, changeMonth: true });

    if (IsArabic == 1) {
        setDatePickerinArabic();
    }
    $(".datepicker").datepicker({
        numberOfMonths: size, showOn: "both",
        yearRange: "-80:+02",
        buttonImage: "/content/site/imagescustomize/icon5.png",
        buttonImageOnly: true,
        minDate: new Date()
    });

    $(".filterdatepicker").datepicker({
        numberOfMonths: size, showOn: "both",
        yearRange: "-80:+0",
        //buttonImage: "/content/site/images/icon5.png",
        buttonImageOnly: true,
    });


    $(".birthdatepicker").datepicker({
        numberOfMonths: 1, showOn: "both",
        maxDate: new Date(),
        yearRange: "-150:+0",
        buttonImage: "/content/site/imagescustomize/icon5.png",
        buttonImageOnly: true,
    });
    $(".infbirthdatepicker").datepicker({
        numberOfMonths: 1, showOn: "both",
        minDate: "-730D",
        maxDate: new Date(),
        yearRange: "-2:+0",
        buttonImage: "/content/site/imagescustomize/icon5.png",
        buttonImageOnly: true,
    });
    /*Comment by shailesh as per video bugs*/
    /*$(".docIssueDate").datepicker({
        numberOfMonths: size, showOn: "both",
        maxDate: new Date(),
        minDate: '-10Y',
        buttonImage: "/content/site/imagescustomize/icon5.png",
        buttonImageOnly: true,
    });*/
    $(".docIssueDate").datepicker({
        numberOfMonths: 1, showOn: "both",
        maxDate: new Date(),
        minDate: '-10Y',
        buttonImage: "/content/site/imagescustomize/icon5.png",
        buttonImageOnly: true,
    });
    $(".ADTbirthdatepicker").datepicker({
        numberOfMonths: 1, showOn: "both",
        maxDate: new Date(),
        yearRange: "-150:+0",
        buttonImage: "/content/site/imagescustomize/icon5.png",
        buttonImageOnly: true,
    });

    $(".CHLbirthdatepicker").datepicker({
        numberOfMonths: 1, showOn: "both",
        maxDate: new Date(),
        yearRange: "-80:+0",
        buttonImage: "/content/site/imagescustomize/icon5.png",
        buttonImageOnly: true,

    });

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
    $(".expiredatepicker").datepicker({
        numberOfMonths: 1, showOn: "both",
        yearRange: "-0:2040",
        buttonImage: "/content/site/imagescustomize/icon5.png",
        buttonImageOnly: true,
        minDate: new Date(),
        onClose: function (date) {
            //focus on next tab by sabir
            $(this).focus();
            var inputs = $(this).closest('form').find(':input');
            inputs.eq(inputs.index(this) + 1).focus();
        }
    });
    /*Old Code comment by shailesh*/
    /* $(".expiredatepicker").datepicker({
         numberOfMonths: size, showOn: "both",
         yearRange: "-0:2040",
         buttonImage: "/content/site/imagescustomize/icon5.png",
         buttonImageOnly: true,
         minDate: new Date(),
         onClose: function (date) {
             //focus on next tab by sabir
             $(this).focus();
             var inputs = $(this).closest('form').find(':input');
             inputs.eq(inputs.index(this) + 1).focus();
         }
     });*/


    $(".datepicker").datepicker("option", "showAnim", "drop");
    $(".datepicker1").datepicker("option", "showAnim", "drop");

    $('.isMobile').keypress(function (event) {
        return isMobile(event, this)
    });

    var renderItem = function (ul, item) {
       
        var val = item.value;
        //ul.addClass("flightautocomplete");
        if (item.value.toString().indexOf("-") > -1)
            //val = '<b>' + val + '</b>';
            val = val;
        return $("<li></li>")
            .data("item.autocomplete", item)
            .append("<a>" + val + "</a>")
            .appendTo(ul)
            //.addClass("flightautocomplete")
            .addClass("autoclass")
            .addClass("ui-corner-all");
    };

    autocompleteOptions = {
        source: function (request, response) {
            $.ajax({
                url: '/Flight/Home/GetLocationList',
                data: { "term": request.term },
                type: "POST",
                success: function (data) {
                    response($.map(data, function (item) {
                        return item;
                    }))
                },
                error: function (response) {
                    alert(response.responseText);
                },
                failure: function (response) {
                    alert(response.responseText);
                }
            });
        },
        search: function () { $(this).addClass('working'); },
        open: function () { $(this).removeClass('working'); },
        autoFocus: true,
        change: function (event, ui) {
            //console.log(event.target.id);
            if (!ui.item) {
               
                var airtriptype = $("input[name=FlightType]:checked").val();
                airtriptype = airtriptype.replace(' ', '').toLowerCase();
                if (airtriptype == "multicity") {
                    textboxid = $(this).attr('id');
                    pax = textboxid.split("_");
                    if (pax[3] == "DepartureLocation") {
                        if ($(this).val() != $("#FareLocations_" + (paxno - 1) + "__ArrivalLocation").val()) {
                            //alert();
                            $(this).val('');
                            $(this).prop('placeholder', str_NoMatchFound);
                            $(this).removeClass('working');
                        }
                    }
                    else {
                        var CurrentTextboxId = event.target.id;
                        var CurrentValue = $("#" + CurrentTextboxId).val();
                        var AirportCode = CurrentValue.substring(CurrentValue.indexOf('('), CurrentValue.indexOf(')') + 1);
                      
                        if (AirportCode != "") {

                        }
                        else {
                            $(this).val('');
                            $(this).prop('placeholder', str_NoMatchFound);
                            
                            $(this).removeClass('working');
                        }
                       
                       /* $(this).val('');
                        $(this).prop('placeholder', str_NoMatchFound);
                        $(this).removeClass('working');*/
                    }
                }
                else {
                    var CurrentTextboxId = event.target.id;
                    var CurrentValue = $("#" + CurrentTextboxId).val();
                    var AirportCode = CurrentValue.substring(CurrentValue.indexOf('('), CurrentValue.indexOf(')') + 1);
                   
                    if ( AirportCode != "") {

                    }
                    else {
                        $(this).val('');
                        $(this).prop('placeholder', str_NoMatchFound);
                        $(this).removeClass('working');
                    }
                    //if (CurrentValue.substring())
                    
                }
            }
        },
        minLength: 2,
        select: function (event, ui) {
            //debugger;
            if (ui.item.id != 0) {
                if (ui.item.value.indexOf(str_NoMatchFound) < 0) {
                    //debugger;
                    //var x = "<span id=\"spnAir\">" + ui.item.value + "<i onclick='closeAirline(" + ui.item.value + ");'>X</i></span>";
                    //$(this).append(x);
                    //this.innerHTML = x;
                    this.value = ui.item.value;
                    if (event.keyCode != 9) {
                        if (checklocationlist($(this).attr('id')) == "n") {
                            var inputs = $(this).closest('form').find(':input:visible');
                            
                           // $("#" + inputs.eq(inputs.index(this) + 1)[0].id).focus();
                           // $("#" + inputs.eq(inputs.index(this) + 1)[0].id).trigger("click");
                            var CurrentId = inputs.eq(inputs.index(this) + 1)[0].id;
                            var CurrentIndex = CurrentId.split('_')[1];
                            var TopDestinationId = "#FareLocations_" + CurrentIndex + "__ArrivalTopDest";
                           
                           
                            if ($(TopDestinationId).length > 0) {
                               
                                //  $("#FareLocations_" + CurrentIndex + "__FormInputTopDest").addClass("open");
                                //GetTopDestination()
                               
                                ChangeDestinaton(this);
                            }
                                inputs.eq(inputs.index(this) + 1).focus();

                          
                        }
                    }
                } else {
                    this.value = '';
                }
            }
            return false;
        },
        focus: function () {
            // prevent value inserted on focus
            return false;
        }
    };

    //$(".paxName").change(function () {
    //    var regex1 = RegExp('^[ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿ A-Za-z]{2,50}$');
    //    regex1.test($(this).val());
    //});
    $(".locationlist").click(function () {
        $(this).select();
    });
    $(".locationlist").each(function (i) {
        $(this).autocomplete(autocompleteOptions).data("autocomplete")._renderItem = renderItem;
    });

    //$(".locationlist").change(function (i) {
    //    //alert($(this).attr("id"));
    //    var cv = $(this).val();
    //    alert(cv);
    //    if (cv != '') {
    //        var id = $(this).attr("id");
    //        var index = id.split('_')[1];
    //        var ci = "";
    //        if (id.indexOf('ArrivalLocation') > 0) {
    //            ci = '#FareLocations_' + index + '__DepartureLocation';
    //        }
    //        else {
    //            ci = '#FareLocations_' + index + '__ArrivalLocation';
    //        }
    //        var cmv = $(ci).val();
    //        alert(cmv);
    //        if (cmv != '' && cmv == cv) {
    //            alert('Departure and Arrival location is same');
    //            $(this).val('');
    //        }
    //    }
    //});
    $(".paxList").autocomplete({
        source: "/Flight/Home/GetPaxListWithPNR",
        search: function () { $(this).addClass('working'); },
        open: function () { $(this).removeClass('working'); },
        change: function (event, ui) {
            if (!ui.item) {
                $(this).val('');
                $(this).prop('placeholder', str_NoMatchFound);
                $(this).removeClass('working');
            }
        },
        minLength: 3,
        select: function (event, ui) {
            if (ui.item.id != 0) {
                if (ui.item.value.indexOf(str_NoMatchFound) < 0) {
                    this.value = ui.item.value;
                    if (event.keyCode != 9) {
                        var inputs = $(this).closest('form').find(':input');
                        inputs.eq(inputs.index(this) + 1).focus();
                    }
                } else {
                    this.value = '';
                }
            }
            return false;
        },
        focus: function () {
            // prevent value inserted on focus
            return false;
        }
    });
    $(".hotellocationlist").click(function () {
        $(this).select();
    });
    $(".hotellocationlist").autocomplete({
        source: "/Hotel/Home/GetLocationList",
        search: function () { $(this).addClass('working'); },
        open: function () { $(this).removeClass('working'); },
        autoFocus: true,
        change: function (event, ui) {
            if (!ui.item) {
                $(this).val('');
                $(this).prop('placeholder', str_NoMatchFound);
                $(this).removeClass('working');
            }
        },
        minLength: 2,
        select: function (event, ui) {
            if (ui.item.id != 0) {
                if (ui.item.value.indexOf(str_NoMatchFound) < 0) {
                    this.value = ui.item.value;
                    if (event.keyCode != 9) {
                        var inputs = $(this).closest('form').find(':input');
                        inputs.eq(inputs.index(this) + 1).focus();
                    }
                } else {
                    this.value = '';
                }
            }
            return false;
        },
        focus: function () {
            // prevent value inserted on focus
            return false;
        }
    });

    $(".travellerslist").autocomplete({
        source: "/Package/Home/GetTravellerList",
        search: function () { $(this).addClass('working'); },
        open: function () { $(this).removeClass('working'); },
        change: function (event, ui) {
            if (!ui.item) {
                //$(this).val('');
                //$(this).prop('placeholder',str_NoMatchFound);
                $(this).removeClass('working');
            }
        },
        minLength: 2,
        select: function (event, ui) {
            if (ui.item.id != 0) {
                if (ui.item.value.indexOf(str_NoMatchFound) < 0) {
                    this.value = ui.item.value;
                    if (event.keyCode != 9) {
                        var inputs = $(this).closest('form').find(':input');
                        inputs.eq(inputs.index(this) + 1).focus();
                    }
                }
                else {
                    this.value = '';
                }
            }
            else {
                $(this).removeClass('working');
            }
            return false;
        },
        focus: function () {
            // prevent value inserted on focus
            return false;
        }
    });

    $(".packagelocationlist").autocomplete({
        source: "/Package/Home/GetPackageDestinationList",
        search: function () { $(this).addClass('working'); },
        open: function () { $(this).removeClass('working'); },
        change: function (event, ui) {
            if (!ui.item) {
                $(this).val('');
                $(this).prop('placeholder', str_NoMatchFound);
                $(this).removeClass('working');
            }
        },
        minLength: 2,
        select: function (event, ui) {
            if (ui.item.id != 0) {
                if (ui.item.value.indexOf(str_NoMatchFound) < 0) {
                    this.value = ui.item.value;
                    if (event.keyCode != 9) {
                        var inputs = $(this).closest('form').find(':input');
                        inputs.eq(inputs.index(this) + 1).focus();
                    }
                } else {
                    this.value = '';
                }
            }
            return false;
        },
        focus: function () {
            // prevent value inserted on focus
            return false;
        }
    });


    $(".carlocationlist").autocomplete({
        source: "/Car/Home/GetLocationList",
        search: function () { $(this).addClass('working'); },
        open: function () { $(this).removeClass('working'); },
        change: function (event, ui) {
            if (!ui.item) {
                $(this).val('');
                $(this).prop('placeholder', str_NoMatchFound);
                $(this).removeClass('working');
            }
        },
        minLength: 2,
        select: function (event, ui) {
            if (ui.item.id != 0) {
                if (ui.item.value.indexOf(str_NoMatchFound) < 0) {
                    this.value = ui.item.value;
                    if (event.keyCode != 9) {
                        var inputs = $(this).closest('form').find(':input');
                        inputs.eq(inputs.index(this) + 1).focus();
                    }
                } else {
                    this.value = '';
                }
            }
            return false;
        },
        focus: function () {
            // prevent value inserted on focus
            return false;
        }
    });

    $(".close").click(
        function () {
            $(this).slideUp(500);
            return false;
        }
    );

    // date range validator

    $(".from").datepicker({        
        defaultDate: "-80:+02",
        showOn: "both",
        numberOfMonths: size,
        buttonImage: "/content/site/imagescustomize/icon5.png",
        buttonImageOnly: true,
        minDate: new Date(), changeYear: false, changeMonth: false,
        onSelect: function (selectedDate) {
            debugger;
            $(".from").val(selectedDate);
            $(".nomadto").datepicker("option", "minDate", selectedDate);
            $(".to1").datepicker("option", "minDate", selectedDate);
            $(".to2").datepicker("option", "minDate", selectedDate);
            $(".to3").datepicker("option", "minDate", selectedDate);
        },
        onClose: function (date) {
            //focus on next tab by sabir            
            $(this).focus();
            var inputs = $(this).closest('form').find(':input:visible');
            inputs.eq(inputs.index(this) + 1).focus();
            console.log(inputs.index(this) + 1);
        }
    });
    $(".nomadto").datepicker({
        defaultDate: "-80:+02",
        showOn: "both",
        numberOfMonths: size,
        buttonImage: "/content/site/imagescustomize/icon5.png",
        buttonImageOnly: true,
        minDate: new Date(), changeYear: false, changeMonth: false,
        onSelect: function (selectedDate) {
            $(".nomadto").val(selectedDate);
        },
        onClose: function (date) {


        }
    });
    $(".from,.nomadto,.to,.to1,.to2,.to3,.to4,.to5,.birthdatepicker,.infbirthdatepicker,.ADTbirthdatepicker,.CHLbirthdatepicker,.datepicker1").change(function () {
        try {
            if ($(this).val() != '') {
                $.datepicker.parseDate('dd-M-yy', $(this).val());
            }
        }
        catch (e) {
            $(this).val(''); return false;
        }
    });
    $(".to1").datepicker({
        defaultDate: "-80:+02",
        showOn: "both",
        numberOfMonths: size,
        minDate: new Date(),
        buttonImage: "/content/site/imagescustomize/icon5.png",
        changeYear: false,
        changeMonth: false,
        buttonImageOnly: true,
        onSelect: function (selectedDate) {
            $(".to2").datepicker("option", "minDate", selectedDate);
            //$(".to3").datepicker("option", "minDate", selectedDate);
            $(".from").datepicker("option", "maxDate", selectedDate);
            //focus on next tab by sabir
           // $(this).focus();
            var inputs = $(this).closest('form').find(':input');
            inputs.eq(inputs.index(this) + 1).focus();
        }
    });
    $(".to2").datepicker({
        defaultDate: "-80:+02",
        showOn: "both",
        numberOfMonths: size,
        minDate: new Date(),
        buttonImage: "/content/site/imagescustomize/icon5.png",
        buttonImageOnly: true,
        onSelect: function (selectedDate) {
            $(".to3").datepicker("option", "minDate", selectedDate);
            $(".to1").datepicker("option", "maxDate", selectedDate);
            // $(".from").datepicker("option", "maxDate", selectedDate);

        },
        onClose: function (date) {
            //focus on next tab by sabir
            $(this).focus();
            var inputs = $(this).closest('form').find(':input');
            inputs.eq(inputs.index(this) + 1).focus();
        }
    });
    $(".to3").datepicker({
        defaultDate: "-80:+02",
        showOn: "both",
        numberOfMonths: size,
        minDate: new Date(),
        buttonImage: "/content/site/imagescustomize/icon5.png",
        buttonImageOnly: true,
        onSelect: function (selectedDate) {
            //$(".to4").datepicker("option", "minDate", selectedDate);
            $(".to1").datepicker("option", "maxDate", selectedDate);
            $(".to2").datepicker("option", "maxDate", selectedDate);
            //$(".from").datepicker("option", "maxDate", selectedDate);

        },
        onClose: function (date) {
            //focus on next tab by sabir
            $(this).focus();
            var inputs = $(this).closest('form').find(':input');
            inputs.eq(inputs.index(this) + 1).focus();
        }
    });
    $(".to4").datepicker({
        defaultDate: "-80:+02",
        showOn: "both",
        numberOfMonths: size,
        minDate: new Date(),
        buttonImage: "/content/site/imagescustomize/icon5.png",
        buttonImageOnly: true,
        onSelect: function (selectedDate) {
            $(".to5 ").datepicker("option", "minDate", selectedDate);
            //$(".to1").datepicker("option", "maxDate", selectedDate);
            //$(".to2").datepicker("option", "maxDate", selectedDate);
            $(".to3").datepicker("option", "maxDate", selectedDate);
            //$(".from").datepicker("option", "maxDate", selectedDate);
        },
        onClose: function (date) {
            //focus on next tab by sabir
            $(this).focus();
            var inputs = $(this).closest('form').find(':input');
            inputs.eq(inputs.index(this) + 1).focus();
        }
    });
    $(".to5").datepicker({
        defaultDate: "-80:+02",
        showOn: "both",
        numberOfMonths: size,
        minDate: new Date(),
        buttonImage: "/content/site/imagescustomize/icon5.png",
        buttonImageOnly: true,
        onSelect: function (selectedDate) {
            //$(".to1").datepicker("option", "maxDate", selectedDate);
            //$(".to2").datepicker("option", "maxDate", selectedDate);
            //$(".to3").datepicker("option", "maxDate", selectedDate);
            $(".to4").datepicker("option", "maxDate", selectedDate);
            //$(".from").datepicker("option", "maxDate", selectedDate);

        },
        onClose: function (date) {
            //focus on next tab by sabir
            $(this).focus();
            var inputs = $(this).closest('form').find(':input');
            inputs.eq(inputs.index(this) + 1).focus();
        }
    });

    $('[data-toggle="tooltip"]').tooltip();



});

function ChangeExternalUrl(IsExternalAccess, OriginUrl, LanId) {
    var SearchStr = '';
    var FinalHref = '';
    //if ('@(Session[En_Session.IsExternalAccess.ToString()]!=null && (bool)Session[En_Session.IsExternalAccess.ToString()]==true)' == 'True')
    if (IsExternalAccess) {
        //alert('Ok1');
        var myUrl = window.location.href.toLowerCase();
        //var OriginUrl = OriginUrl; //'@(Session[En_Session.OriginUrl.ToString()]!=null ? Session[En_Session.OriginUrl.ToString()] : "")'; //getQuerystring('OriginUrl', '');
        var CurrUrl = window.location.origin;
        // var LanId = LanId; //'@Session[En_Session.LanguageId.ToString()]';
        if (OriginUrl !== '') {
            $("a[id^='MainMenu']").each(function () {
                //debugger;
                if ($(this)[0].href.length > 0 && $(this)[0].href.toLowerCase().indexOf("/flight") > 0) { //&& myUrl.indexOf("/flight") == -1) {
                    $(this).attr('href', OriginUrl + "/Home?type=flight&LanguageId=" + LanId);
                }
                if ($(this)[0].href.length > 0 && $(this)[0].href.toLowerCase().indexOf("/hotel") > 0) {//&& myUrl.indexOf("/hotel") == -1) {
                    $(this).attr('href', OriginUrl + "/Home?type=hotel&LanguageId=" + LanId);
                }
                if ($(this)[0].href.length > 0 && $(this)[0].href.toLowerCase().indexOf("/insurance") > 0) { //&& myUrl.indexOf("/insurance") == -1) {
                    $(this).attr('href', OriginUrl + "/Home?type=insurance&LanguageId=" + LanId);
                }
                if ($(this)[0].href.length > 0 && $(this)[0].href.toLowerCase().indexOf("/meetgreet") > 0) { // && myUrl.indexOf("/meetgreet") == -1) {
                    $(this).attr('href', OriginUrl + "/Home?type=meetgreet&LanguageId=" + LanId);
                }
            });
            $("a[id^='TempMenu']").each(function () {
                ////$(this)[0].href = $(this).href.replace(CurrUrl, OriginUrl);
                //CurrUrl = ($(this)[0].pathname).substring(1, ($(this)[0].pathname).length);
                //$(this).attr('href', OriginUrl + "/Home?type=" + CurrUrl + "&LanguageId=" + LanId);
                //CurrUrl = ($(this)[0].pathname).substring(1, ($(this)[0].pathname).length);
                //$(this).attr('href', OriginUrl + "/" + CurrUrl + "?LanguageId=" + LanId);
                if (OriginUrl != '') {
                    CurrUrl = ($(this)[0].pathname).substring(1, ($(this)[0].pathname).length);
                    SearchStr = getQuerystring1($(this)[0].href, 'LanguageId', '0');
                    FinalHref = OriginUrl + "/" + CurrUrl;
                    if (SearchStr == '0') {
                        FinalHref = FinalHref + "?LanguageId=" + LanId;
                    } else {
                        FinalHref = FinalHref + $(this)[0].search;
                    }
                } else {
                    FinalHref = $(this)[0].href;
                }
                $(this).attr('href', FinalHref);

            });
        }
    } else {
        
        myUrl = window.location.href.toLowerCase();
        OriginUrl = OriginUrl; //'@(Session[En_Session.OriginUrl.ToString()]!=null ? Session[En_Session.OriginUrl.ToString()] : "")'; //getQuerystring('OriginUrl', '');
        CurrUrl = window.location.origin;
        LanId = LanId;
        $("a[id^='TempMenu']").each(function () {
        
            ////$(this)[0].href = $(this).href.replace(CurrUrl, OriginUrl);
            ////CurrUrl = ($(this)[0].pathname).substring(1, ($(this)[0].pathname).length);
            //CurrUrl = getQuerystring1($(this)[0].href, 'type', 'Home');
            //$(this).attr('href', OriginUrl + "/Home?type=" + CurrUrl + "&LanguageId=" + LanId);
            //$(this).attr('href', OriginUrl + "/" + CurrUrl + "?LanguageId=" + LanId);
            if (OriginUrl != '') {
                CurrUrl = ($(this)[0].pathname).substring(1, ($(this)[0].pathname).length);
                SearchStr = getQuerystring1($(this)[0].href, 'LanguageId', '0');
                FinalHref = OriginUrl + "/" + CurrUrl;
                if (SearchStr == '0') {
                    FinalHref = FinalHref + "?LanguageId=" + LanId;
                } else {
                    FinalHref = FinalHref + $(this)[0].search;
                }
            } else {
                FinalHref = $(this)[0].href;
            }
           $(this).attr('href', FinalHref);

        });

    }

}

function getQuerystring1(linkhref, key, default_) {
    
    if (default_ === null) default_ = "";
    key = key.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regex = new RegExp("[\\?&]" + key + "=([^&#]*)");
    var qs = regex.exec(linkhref);

    if (qs === null)
        return default_;
    else
        return qs[1];
}

function clearForm(form, ApplyTBValidation) {
    if (ApplyTBValidation) {
        $("#" + form).find(':input').each(function () {
            var type = this.type;
            var nm = this.name;
            var tag = this.tagName.toLowerCase(); // normalize case
            if (type === 'text') //|| type == 'password' || tag == 'textarea')
                $(this).attr('disabled', true);
            else if (type === 'checkbox' || type == 'radio')
                $(this).attr("disabled", true);
            else if (tag === 'select')
                if (nm !== 'ReportName') {
                    //this.selectedIndex = -1; 
                    $(this).attr("disabled", true);
                }
        });
    }
};


function setErrorToolTip(errorclassName) {
    if (errorclassName == '') {
        $('.field-validation-error').each(function () {
            $(this).attr('title', $(this).text());
            $(this).text("");
        });
    }
    else {
        $('.error').each(function () {
            $(this).attr('title', $(this).text());
            $(this).text("");
        });
    }
    return false;
}

//set validation on blur
function setValidationOnBlur() {
    $('input').blur(function () {
        var res = $(this).next("span.field-validation-error:first");
        res.attr('title', res.text());
        res.text("");
    });
}

//Captcha Functions

function RefreshCaptcha() {
    $("#CaptchaValue").val('');
    $("#imgCaptcha").attr('src', $("#imgCaptcha").attr('src') + '?' + Math.random());
}

function ShowCaptcha() {
    $("#dvCaptcha").show();
    $('#dvCaptcha :input').attr('disabled', false);
}

function HideCaptcha() {
    $("#dvCaptcha").hide();
    $('#dvCaptcha :input').attr('disabled', true);
}

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

function SetDigitMasking(control) {
    $(control).keypress(function (e) {
        if (CheckForDigit(e) == "false") {
            return false;
        }
        return true;
    });


}
function CheckForDigit(e) {
    var charCode = e.which ? e.which : e.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return "false";
    }
}

function isNumber(evt, element) {
    var Allowchar = [8, 37, 39, 46, 9];
    var charCode = (evt.which) ? evt.which : evt.keyCode;

    if (Allowchar.indexOf(charCode) > -1)
        return true;
    else if ((charCode < 48 || charCode > 57))
        return false;

    return true;
}

function setTextBox(Id) {
    $("#txt" + Id).val($("#" + Id).val());
}
//MOBILE TO DESKTOP
function setDropDown(Id, minValue, maxValue) {
    var Value = parseInt($("#txt" + Id).val());
    if (Value >= minValue && Value <= maxValue) {
        $("#" + Id).val($("#txt" + Id).val());
    } else if (Value > maxValue) {
        $("#" + Id).val(maxValue.toString());
        $("#txt" + Id).val(maxValue.toString());
    }
    else {
        $("#" + Id).val(minValue.toString());
        $("#txt" + Id).val(minValue.toString());
    }
}
function AddValue(Id, maxValue) {
    var value = 1;
    if ($("#txt" + Id).val() !== "") {
         value = parseInt($("#txt" + Id).val());
        if (value < maxValue) { value = value + 1; }
    }
    $("#" + Id).val(value.toString());
    $("#txt" + Id).val(value.toString());
}
function MinusValue(Id, minValue) {
    var value = minValue;
    if ($("#txt" + Id).val() !== "") {
         value = parseInt($("#txt" + Id).val());
        if (value > minValue) { value = value - 1; }
    }
    $("#" + Id).val(value.toString());
    $("#txt" + Id).val(value.toString());
}
function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function validatePassword(password) {
    var re = /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8,}$/;
    return re.test(password);
}

//function OpenFlightLowFareCalendar() {

//    var vartitle = "Flight Low Fare Calendar";
//    $('#dvFlightLowFareCalendar').html("");
//    //$('#dvFlightLowFareCalendar').block({ message: null });
//    $("#dvFlightLowFareCalendar").load('/Flight/Home/GetFlightLowFareCalendar/', function () {
//        //$("#dvFlightLowFareCalendar").dialog("close");
//    }).dialog({
//        width: 1200, position: [($(window).width() / 2) - (1000 / 2), 10],
//        autoOpen: true, title: vartitle,
//        resizable: true, modal: true,
//        position: top
//    });
//    $("#dvFlightLowFareCalendar").dialog("open");

//    $("#dvFlightLowFareCalendar").parent().addClass("FlightCalendar_dialog_box");
//}

//use for new bootstrap popup
function OpenFlightLowFareCalendar() {

    var vartitle = "Flight Low Fare Calendar";
    $('#dvBBody').html("");
    $('#dvBBody').block({ message: null });

    $('#dvBTitle').html(vartitle);
    $("#dvBBody").load('/Flight/Home/GetFlightLowFareCalendar/', function () {
        $("#dvBBody").unblock();
    });
    $('#dvBPopup').modal({ show: 'true' });
    $('#dvBPopup .modal-dialog').addClass("FlightCalendar_dialog_box");
}
function setAirResultObjfromMultiAirResult(Type) {
    var status = true;
    $.ajax({
        cache: false,
        type: 'POST',
        async: false,
        url: "/Flight/Home/setAirResultObjfromMultiAirResult",
        data: { "Type": Type },
        success: function (data) {
            status = data.status;
        }
    });
    return status;
}

function isMobile(evt, element) {  //eg +921365241 this way work by sabir
    var charCode = (evt.which) ? evt.which : evt.keyCode
    alert(charCode);
    if (evt.keyCode === 9 || evt.keyCode === 39 || evt.keyCode === 37 || evt.keyCode === 8 || evt.keyCode === 46)//TAB //37 leftarrow //39 right arrow
        return true;
    else if (charCode === 43 && $(element).val().indexOf('+') === -1)// “+” CHECK +, AND ONLY ONE.
        return true;
    else if ((charCode >= 48 && charCode <= 57))
        return true;
    return false;
}
/*BACK BUTTON IN MOBILE WORKING BY SABIR*/
function goBack() {
    window.history.back();
}
function getBlockDivName() {
    var b = "#dvbodyTab";
    if ($("#dvBPopup.modal-in").length > 0) {
        b = "#dvBBody";
    }
    return b;
}
function checkMandatoryField() {
    var r = true;
    $(".compfld").each(function () {
        var v = $(".compfld");
        if (v.val() === '') {
            v.addClass('input-validation-error');
            r = false;
        } else {
            v.removeClass('input-validation-error');
        }
    });
    return r;
}
function checklocationlist(id) {
    var i = id.split('_')[1];
    var dv = $('#FareLocations_' + i + '__DepartureLocation').val();
    var av = $('#FareLocations_' + i + '__ArrivalLocation').val();

    if (dv !== '' && dv === av && dv !== undefined && av !== undefined) {
        alert('From City and To City are same');
        $("#" + id).val('');
        return "";
    }
    return "n";

}


function IsValidDate(dateString, dateFormat) {

    //var regEx = /^\d{2}-\d{2}-\d{4}$/;
    //return dateString.match(regEx) != null;

    //var regEx = /^\d{2}-[A-z]{3}-\d{4}$/;
    //return dateString.match(regEx) != null;

    var regEx = "";
    if (dateFormat === "dd-mm-yyyy") {
        regEx = /^\d{2}-\d{2}-\d{4}$/;
    } else if (dateFormat === "dd-MMM-yyyy") {
        regEx = /^\d{2}-[A-z]{3}-\d{4}$/;
    }
    //alert(dateString.match(regEx));
    return dateString.match(regEx) !== null;

}

function SetCurrentStage(Mode, Type) {
    debugger;
    if (Mode == "Add") {
        if (Type == "Login") {
            sessionStorage.setItem("LoginStatus", "true");
        }
        sessionStorage.setItem("CurrentRequest", window.location.pathname);
    }
    else {
        sessionStorage.removeItem("LoginStatus");
        sessionStorage.removeItem("CurrentRequest");
    }
}
function VerifyCurrentStage() {
    var currentRq = window.location.pathname;
    var LoginStatus = sessionStorage.getItem("LoginStatus");
    if (LoginStatus != null) {
        if (LoginStatus == "true") {
            sessionStorage.setItem("CurrentRequest", window.location.pathname);
        }
    }
    else {
        if (currentRq.toLocaleLowerCase().indexOf("/login") == -1) {
            if (window.location.href.toLocaleLowerCase().indexOf("reservation") == -1 && window.location.href.toLocaleLowerCase().indexOf("pdf") == -1 && window.location.href.toLocaleLowerCase().indexOf("salesslips") == -1 && window.location.href.toLocaleLowerCase().indexOf("masterpnr") == -1) {
                $.post("/Home/AutoLogOut", null,
                    function (url) {
                        if (url != "") {
                            window.location = url;
                        }
                    });
            }

        }
    }
}
function RemoveTextDataOnClose(element) {
    var id = $(element).attr("data-controlid");
    $("[id$=" + id + "]").val("");
    $("[id$=" + id + "]").focus();
}
function AutoGenrateAltTag() {
    $("img").each(function (i) {
        var altTag = $(this).attr("alt");
        if (altTag != undefined) {
            if (altTag == "") {
                var src = $(this).attr("src");
                if (src != undefined) {
                    var srcPaths = src.split('/');
                    var fileNames = srcPaths[srcPaths.length - 1];
                    var altTagText = fileNames.substr(0, fileNames.indexOf('.'));
                    $(this).attr("alt", altTagText);
                }
            }
        }
        else {
            var src = $(this).attr("src");
            if (src != undefined) {
                var srcPaths = src.split('/');
                var fileNames = srcPaths[srcPaths.length - 1];
                var altTagText = fileNames.substr(0, fileNames.indexOf('.'));
                $(this).attr("alt", altTagText);
            }
        }

    });
}
function separator(numb) {
    if(numb != undefined)
    {
    var str = numb.toString().split(".");
    str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return str.join(".");
    }

    return "";
}
/*----jQuery goTop--27Dec vipul----*/

(function ($) {
    $.fn.goTop = function (options) {

        $.fn.goTop.defaults = {
            container: '',
            appear: 200,
            scrolltime: 800,
            src: "fas fa-chevron-up",
            width: 45,
            place: "right",
            fadein: 500,
            fadeout: 500,
            opacity: 0.5,
            marginX: 2,
            marginY: 2,
            zIndex: 9
        };

        var opts = $.extend({}, $.fn.goTop.defaults, options);

        return this.each(function () {
            var g = $(this);
            g.html("<a id='goTopAnchor'><span id='goTopSpan' /></a>");

            var ga = g.children('a');
            var gs = ga.children('span');

            var css = {
                "position": "fixed",
                "display": "block",
                "width": "'" + opts.width + "px'",
                "z-index": opts.zIndex,
                "bottom": opts.marginY + "%"
            };

            css[opts.place === "left" ? "left" : "right"] = opts.marginX + "%";

            g.css(css);

            //opacity
            ga.css("opacity", opts.opacity);
            gs.addClass(opts.src);
            gs.css("font-size", opts.width);
            gs.hide();

            //appear, fadein, fadeout
            $(function () {
                $(opts.container || window).scroll(function () {
                    if ($(this).scrollTop() > opts.appear) {
                        gs.fadeIn(opts.fadein);
                    }
                    else {
                        gs.fadeOut(opts.fadeout);
                    }
                });

                //hover effect
                $(ga).hover(function () {
                    $(this).css("opacity", "1.0");
                    $(this).css("cursor", "pointer");
                }, function () {
                    $(this).css("opacity", opts.opacity);
                });

                //scrolltime
                $(ga).click(function () {
                    $('body,html').animate({
                        scrollTop: 0
                    }, opts.scrolltime);
                    return false;
                });
            });
        });
    };
})(jQuery);