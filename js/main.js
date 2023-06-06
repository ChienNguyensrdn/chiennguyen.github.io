//
// This is The Scripts used for Simply Theme
// 
function messageBox(m,t){
    var clr = (t=="success"?"#24D055":(t=="warning"?"#ff773e":"#D83535"))
    $("#histaff-message").attr("style","--ms-clr:"+clr+";animation:message;animation-duration: 4s;animation-iteration-count: 1;");
    $("#histaff-message").html("<p>"+m+"</p>");
    setTimeout(function(){
        $("#histaff-message").removeAttr("style");
    },4000);
}
function getComboboxData(a,u,m,v){
    var _url = window.location.origin +'/'+u;
    $(a).empty();
    if(m =='GET'){
        $.ajax({
            url: _url,
            type: 'GET'
        })
        .done(function(s) {
            if(s.status =="success"){
                s.data.forEach(function(data){
                    var option = new Option(data.nameVn, data.id, false, false);
                    $(a).append(option);
                });
                $(a).val(v).trigger('change');
            }
        })
        .fail(function() {
            console.log("error");
        });
    }
    else if(m=="POST"){
        $.ajax({
            url: u,
            type: m,
            data: v,
            dataType: 'json'
        })
        .done(function(s) {
            if(s.status =="success"){
                s.data.forEach(function(data){
                    var option = new Option(data.nameVn, data.id, false, false);
                    $(a).append(option);
                });
                $(a).val('').trigger('change');
            }
        })
        .fail(function() {
            console.log("error");
        });
    }
}
function main() {

    (function () {
        'use strict'
        //Script
        //-----------------------------------
        var _uri = window.location.origin;
        jQuery(document).ready(function ($) {

            $.ajaxSetup({
                beforeSend: function(xhr) {
                    xhr.setRequestHeader("Content-Type", "application/json");
                }
            });
            $('body').find('select').each(function(index, el) {
                $(this).select2();                
            });

            $("#file-btn").click(function(e){
                $("#candidate-image").click();
            });

            $("#candidate-image").change(function(e){
                var file = e.target.files[0];
                if (file != undefined) {
                    var src = URL.createObjectURL(file);
                    $(".histaff-upload-image").css("background-image","url('"+ src +"')")
                    $(".histaff-upload-image i").addClass('hidden');
                }
                else{
                    $(".histaff-upload-image").css("background-image","none")
                }
            });

            $("#uploadCV").click(function(event) {
                event.preventDefault();
                $("#candidate-cv").click();
            });

            //Get combo data
            
            getComboboxData($("#candidate-nation"),"candidate-form/nations","GET",null);
        });

        jQuery(window).scroll(function () {
            var info = $("#histaff-info").offset().top;
            var education = $("#histaff-education").offset().top;
            var recruitment = $("#histaff-recruitment").offset().top;
            var workExp = $("#histaff-work-exp").offset().top;
            var other = $("#histaff-other").offset().top;
            var top = $(window).scrollTop() + 500;

            if (top >= info && top < education) {
                $("#side-bar-info").addClass('active');
                $("#side-bar-education,#side-bar-recruitment,#side-bar-work,#side-bar-other").removeClass('active');
            }
            else if(top >= education && top < recruitment){
                $("#side-bar-education").addClass('active');
                $("#side-bar-info,#side-bar-recruitment,#side-bar-work,#side-bar-other").removeClass('active');
            }
            else if(top >= recruitment && top < workExp){
                $("#side-bar-recruitment").addClass('active');
                $("#side-bar-info,#side-bar-education,#side-bar-work,#side-bar-other").removeClass('active');
            }
            else if(top >= workExp && top < other){
                $("#side-bar-work").addClass('active');
                $("#side-bar-info,#side-bar-education,#side-bar-recruitment,#side-bar-other").removeClass('active');
            }
            else if(top >= other){
                $("#side-bar-other").addClass('active');
                $("#side-bar-info,#side-bar-education,#side-bar-recruitment,#side-bar-work").removeClass('active');
            }
        });

        jQuery(window).load(function () {
            $(document).on('change',"#candidate-nation",function(){
                var v = $("#candidate-nation").val();
                getComboboxData($("#candidate-idPlace"),"candidate-form/provinces/nation/"+(v==null?-1:v),"GET",null);
                getComboboxData($("#candidate-perProvince"),"candidate-form/provinces/nation/"+(v==null?-1:v),"GET",null);
                getComboboxData($("#candidate-navProvince"),"candidate-form/provinces/nation/"+(v==null?-1:v),"GET",null);
            });

            $(document).on('change',"#candidate-perProvince",function(){
                var v = $("#candidate-perProvince").val();
                getComboboxData($("#candidate-perDistrict"),"candidate-form/districts/province/"+(v==null?-1:v),"GET",null);
            });
            
            $(document).on('change',"#candidate-navProvince",function(){
                var v = $("#candidate-navProvince").val();
                getComboboxData($("#candidate-navDistrict"),"candidate-form/districts/province/"+(v==null?-1:v),"GET",null);
            });

            $("#candidate-copyPer").change(function(){
                if(this.checked){
                    $("#candidate-navAddress").val($("#candidate-perAddress").val());
                    $("#candidate-navProvince").val($("#candidate-perProvince").val()).trigger('change');
                    getComboboxData($("#candidate-navDistrict"),"candidate-form/districts/province/"+$("#candidate-navProvince").val(),"GET",$("#candidate-perDistrict").val());
                    $("#candidate-navWard").val($("#candidate-perWard").val()).trigger('change');


                }
                else{
                    $("#candidate-navAddress").val(null);
                    $("#candidate-navProvince").val(null).trigger('change');
                    $("#candidate-navDistrict").val(null).trigger('change');
                    $("#candidate-navWard").val(null).trigger('change');
                }
            });

        });

    }());

}
main();