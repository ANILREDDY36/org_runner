// Email id validation function.
function validateEmail(email) { 
    // var re = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    var re = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
   // /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function validatePhoneNumber(phone_no) { 
    var re = /^(8|9|7)[0-9]{9}$/;
     return re.test(phone_no);
}

function getAllIds(class_name) {
  temp = $('.' + class_name);
  ids = {};
     for ( i = 0; i < temp.length; i++) {
      if (temp[i].checked == true) {
      	  ids[temp[i]["id"]] = $(".cls_"+class_name+"_"+temp[i]["id"]).val();
	  }
	}
  return ids;
}

function selectAllMapping(class_name) {
	 $("#select_all").change(function(){  //"select all" change 
    var status = this.checked; // "select all" checked status
    $('.' + class_name).each(function(){ //iterate all listed checkbox items
        this.checked = status; //change ".checkbox" checked status
    });
});
}
function updateAllMapping(controller_name, action_name, class_name){
	var data_hash = getAllIds(class_name);
	if(jQuery.isEmptyObject(data_hash)){
		alert("please select a record!")
		return false;
	}
	  url_path = "/"+ controller_name +"/" + action_name
	  $.ajax({
	    url : url_path,
	    data: {
	      data_hash: data_hash
	    },
	    success : function(result) {

	   }
	})
}

$(function() {
	$(".date_picker").datepicker({ 
	    format: 'yyyy-mm-dd',
	});
});
 $(function() {
    $(".datetimepicker").datetimepicker({
      pickDate: false,
      format: "hh:mm", 
      pick24HourFormat: true,
      pickSeconds: false,
    });
  });

  function filterDashbordData(controller_name, action_name, status){
    if(status == "pie_chart"){
      var asset_id = $("#asset_id").val();
      var from_date = $("#pie_chart_from_date").val();
      var to_date = $("#pie_chart_to_date").val();
      url_path = "/"+ controller_name +"/" + action_name +"?asset_id=" + asset_id + "&from_date=" + from_date + "&to_date=" + to_date +"&status=" + status
    }else{
      var service_id = $("#service_id").val();
      var from_date = $("#from_date").val();
      var to_date = $("#to_date").val();
      url_path = "/"+ controller_name +"/" + action_name +"?service_id=" + service_id + "&from_date=" + from_date + "&to_date=" + to_date +"&status=" + status
    }
    $.ajax({
      url : url_path,
      success : function(result) {

     }
  })
 }
 
 function loadStatesBasedOnCountries(id_value, list_name){
  url_path = "/accounts/load_states_based_on_countries?"+list_name+"="+id_value;
  $.ajax({
      url: url_path,
      success: function(result) {

     }
  })
 }
 
 function loadStatesBasedOnCountriesForBranch(id_value, list_name){
  url_path = "/branches/load_states_based_on_countries?"+list_name+"="+id_value;
  $.ajax({
      url: url_path,
      success: function(result) {

     }
  })
 }

 function load_states_based_on_countries(id_value, list_name){
  url_path = "/sys_destinations/load_states_based_on_countries?"+list_name+"="+id_value;
  $.ajax({
      url: url_path,
      success: function(result) {

     }
  })
 }
 

 function loadStatesBasedOnCountriesForUsers(id_value, list_name){
  url_path = "/admin_users/load_states_based_on_countries?"+list_name+"="+id_value;
  $.ajax({
      url: url_path,
      success: function(result) {

     }
  })
 }

 function getServicesOrVehiclesList(option){
  if (option==1) {
    $("#services_filter").hide();
    $("#services_list_id").val(0);
    $("#vehicles_filter").show();
  }else{
    $("#vehicles_filter").hide();
    $("#vehicles_list_id").val(0);
    $("#services_filter").show();
  }
 }

 function confirmSignOut() {
   var retVal = confirm("Are you sure?");
    if (retVal == true) { 
        window.location.href = "/users/sign_out";
        return true;
    } else {
        return false;
    }
}

function latLongVal(e,id){
  if(e.keyCode == 8 || e.keyCode == 37 || e.keyCode == 39 || e.keyCode == 9 || e.keyCode == 13 || (e.which == 118 && e.ctrlKey)){
    return true;
  }
  var length = (id == "lat_long_radius") ? 10 : 15
  var value = $("#"+id).val();
  var code = (e.keyCode ? e.keyCode : e.which);
  var reg = new RegExp('^[0-9.]+$');
  var cur_val = e.key;
  if(cur_val.match(reg) == null){
    alert("invalid character");
    return false;
  }
  if(code != 46){
    if(value.indexOf(".") == -1){
      if(value.length == 5){
        alert("please enter dot(.) here");
        return false;
      }
    }
    else{
         if(value.indexOf(".") != -1){
          left = value.split(".")[0].length
          right = value.split(".")[1].length
         var caretpos = document.getElementById(id).selectionStart;
                if(left == 5 && caretpos <= 5){
              alert("Only five character allow before dot(.)");
              return false; 
                     } 
                      }
                    }
    if(value.length == length){
      return false;
    }
  }else{
    value += "."
    if ((value.split('.').length-1) == 2){
      alert("you have given dot(.) already");
      return false;
  }
  }
}

function phoneNumberVal(e,id,phone_no_length){
  var value = $("#"+id).val();
  if(e.keyCode == 8 || e.keyCode == 37 || e.keyCode == 39 || e.keyCode == 9 || e.keyCode == 13){
    return true;
  }
  if(value.length == phone_no_length){
    return false;
  }
  var reg = new RegExp('^[0-9]+$');
  var cur_val = e.key;
  if(cur_val.match(reg) == null){
    return false;
  }
}

function showStatusAlert(status,device_status){
  if (status == "active" ){
    alert("You can't delete the record with active status.");    
  }
  else{
    if (status == "inactive" && device_status == "true"){
    alert("you can't delete record since it's using by active users!")
    }
  } 
}

function subdomainVal(e,id){
  var value = $("#"+id).val();
  var reg = new RegExp('^[a-zA-Z0-9.]+$');
  var code = (e.keyCode ? e.keyCode : e.which);
  var cur_val = e.key;
  if(cur_val.match(reg) == null){
    return false;
  }
if(code == 46){
  value += "."
  if ((value.split('.').length-1) == 2){
      alert("you have given dot(.) already");
      return false;
  }
}
}

function getDuration(controller_name, action_name, dep_id,duration_id){
   var dep_time = $("#"+dep_id).val();
   var duration = $("#"+duration_id).val();
   if (dep_time == "" && duration != ""){
    alert("Please select departure time");
    return false;
   }
    url_path = "/"+ controller_name +"/" + action_name + "?dep_time=" +dep_time + "&duration=" + duration
    $.ajax({
      url : url_path,
      success : function(result) {

     }
  })
}


function onlyNumbers(evt){
    var e = evt
    if (window.event) { // IE
        var charCode = e.keyCode;
    }
    else 
        if (e.which) { // Safari 4, Firefox 3.0.4
            var charCode = e.which;
        }
    if (charCode == 46 || charCode == 9) 
        return true;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) 
        return false;
    return true;
}

function smsNumbersValidation(evt){
  var e = evt
    if (window.event) { // IE
        var charCode = e.keyCode;
    }
    else 
        if (e.which) { // Safari 4, Firefox 3.0.4
            var charCode = e.which;
        }
    if ($("#sms_mobile_numbers").attr("id") == "sms_mobile_numbers"){
      allow_char = 44
      if(charCode == allow_char){
        return true;
      }
    }
    if (charCode > 31 && (charCode < 48 || charCode > 57)) 
        return false;
      return true;
}
function getLiveUpdate() {
    url_path = "/dashboard/get_live_update/"
    $.ajax({
      url : url_path,
      success : function(result) {

     }
  })
}

function gpsStatusFilter(e){
  var gps_val = e.value
  var location = window.location
  var path = "/asset_holders?";
  path = (location.search.split("&")[0] == "?deleted=true") ? path+"deleted=true&" : path;
  window.location.replace(path+"gps_val="+gps_val+"");
}

function feedbackForFilter(e) {
  var feedback_for = e.value
  var location = window.location
  var path = "/accounts/feedback_index?";
  window.location.replace(path+"feedback_for="+feedback_for+"");
}

function showAuditForModelName(model){
 	url_path = '/audits/show_audit_for_model?is_return=true&'+'model='+model.val();
	$.ajax({
		url: url_path,
		dataType: "text",
		success: function(result){
			$("#audit_list_id").html(result);
			$('#form-indicator-audit').hide();
		}
    });
}
  $( document ).ready(function() {
   $(".alert").fadeOut(5000);
  });

  function validatePincode(){
    var pin_code = $("#user_pin_code").val();
    if(pin_code.length != 6){
      alert("pincode must have 6 digits!")
      return false;
    }
  }

  function assetsStatusFilter(e){
    var running_status = e.value
    var location = window.location
    var path = "/asset_holders?";
    path = (location.search.split("&")[0] == "?deleted=true") ? path+"deleted=true&" : path;
    window.location.replace(path+"running_status="+running_status+"");
}

function handle_selected_report(){
  var subdomain = $('#report_id')[0].dataset['subdomain']
  if(subdomain == "sys"){
    var OPERATOR_ACCOUNT_USAGE_REPORT = 1;
    var PRODUCT_USAGE_REPORT = 2;
  }
  else
  {
    var SMS_TRACKERS_REPORT = 1;
    var SERVICES_TRACKING_REPORT = 2;
    var FEEDBACK_REPORT = 3;
    var TRACKING_LINK_ACCESS_REPORT = 4;
    var BUS_HALT_REPORT = 5;
  }    
  report_type = $('#report_id').val() * 1.0;
  help_info_message = "";
  $("#btn_text_span").html("Run Report");
  $("#report_stage_type_div").hide();
  $("#report_date_range_div").hide();
  $("#services_track_date_div").hide();
  $("#feedback_for_div").hide();
  $("#export_btn_div").hide();
  $("#run_report_div").show();
  $("#services_list_div").hide();
  $("#report_operators_div").hide();
  $("#report_dates_div").hide();
  $("#div_stage_type_halt").hide();  
  $("#report_service_id").find("option").eq(0).remove();   
  if (report_type == SMS_TRACKERS_REPORT){
    help_info_message = "Here, you can see sms trackers report."
    $("#report_date_range_div").show();
    $("#services_list_div").show();
    $("#report_service_id").prepend("<option value='*' selected='selected'>*</option>")
  }
  else if(report_type == SERVICES_TRACKING_REPORT){
    help_info_message = "Shows service trip details for selected service by travel date."
    $("#report_stage_type_div").show();
    $("#services_track_date_div").show();
    $("#btn_text_span").html("Export to CSV")
    $("#run_report_div").hide();
    $("#export_btn_div").show();
    $("#services_list_div").show();
    $("#link_stage_type_halt").attr("onclick","servicesTrackReportClick(); return false;");
    $("#report_service_id").prepend("<option value='*' selected='selected'>*</option>")
  }
  else if(report_type == FEEDBACK_REPORT){
    help_info_message = "Here you can see feedback report."
    $("#feedback_for_div").show();
    $("#report_date_range_div").show();
    $("#services_list_div").hide();
  }
  else if(report_type == TRACKING_LINK_ACCESS_REPORT){
    help_info_message = "Here you can see tracking link access report."
    $("#report_date_range_div").show();
    $("#services_list_div").show();
    $("#report_service_id").prepend("<option value='*' selected='selected'>*</option>")
  }
  else if(report_type == PRODUCT_USAGE_REPORT){
    help_info_message = "Here you can see product usage report."
    $("#services_list_div").hide();
    $("#report_operators_div").hide();
    $("#report_date_range_div").hide();
    $("#report_dates_div").show();
  }
  else if(report_type == OPERATOR_ACCOUNT_USAGE_REPORT){
    help_info_message = "Here you can see operator account usage report."
    $("#report_date_range_div").show();
    $("#services_list_div").hide();
    $("#report_operators_div").show();
    $("#report_date_range_div").hide();
  }
  else if(report_type == BUS_HALT_REPORT){
    help_info_message = "Here you can see bus halt report."
    $("#services_list_div").show();
    $("#services_track_date_div").show();
    //$("#link_stage_type_halt").attr("onclick","servicesTrackReportClick('halt'); return false;");
  }
  if(help_info_message != ""){
    $("#report_help_info").html(help_info_message);
    $("#report_help_info").show();
  }
}

function servicesTrackReportClick(stage_type){
  var report_id_val = $("#report_id").val();
  var service_id_val = $("#report_service_id").val();
  var service_name_num = $("#report_service_id option:selected").text();  
  var stage_type_val = $("#report_stage_type").val();
  if (stage_type != null){
    var excel_name = "Bus Halt Report.xls"
  }
  else
  {     
    var excel_name = "Services Tracking Excel.xls"
  }
    var stage_type_name = $("#report_stage_type option:selected").text();
  var date_val = $("#report_selected_date").val();
  var url_path = "reports/services_tracking_xls?report_id="+report_id_val+"&service_id="+service_id_val+"&stage_type="+stage_type_val+"&date="+date_val;
  $.ajax({
    url: url_path,
    success: function(data) {
      if (data != undefined) {
        var blob=new Blob([data]);
        var link=document.createElement('a');
        link.href=window.URL.createObjectURL(blob);
        var service_name_condition = "";
        if (service_name_num == "*"){
          service_name_condition = "Services";
        }else{
          service_name_condition = service_name_num;
        }
        if (stage_type_name == "--ALL--"){
          excel_name = service_name_condition+" on "+date_val+".xls";
        }else{
          excel_name = service_name_condition+" "+stage_type_name+" Details on "+date_val+".xls";
        }
        link.download=excel_name;
        link.click();
        if ($("#report_error_div") != undefined) {
          $("#report_error_div").html('');
          $("#report_error_div").hide();
        }
      }
      else{
        $("#report_error_div").html("There is no report for this data");
        $("#report_error_div").show();
        $("#report_results").html("");
      }
    }
  });
}

function validateAddMobileNumbers(){
  var mobile_numbers = $("#sms_mobile_numbers").val();
  data = true
  if (mobile_numbers.length != 10){
    mobile_numbers_arr = mobile_numbers.split(',');
    $.each(mobile_numbers_arr, function(key, value){
      if(value.length != 10 ){
        data = false;
      }
    });
  }
  if(data == false){
    alert("Every number should have 10 character and seperated by comma(,)");
    return false;
  }
}

function trackingAccessReport(service_id, pnr_number,date){
 url_path = "reports/tracking_link_access_by?service_id=" + service_id + "&pnr_number=" + pnr_number + "&date=" + date
    $.ajax({
      url : url_path,
      success : function(result) {

     }
  })
}

  function getInvoice(account_id){
    var from_date = $("#from_date").val();
    var to_date = $("#to_date").val();
    if(from_date == "" || to_date == ""){
      alert("Please select From date and To date");
      return false;
    }
      url_path = "/accounts/get_invoice?from_date="+from_date+"&to_date="+to_date + "&account_id=" + account_id;
      $.ajax({
          url: url_path,
          success: function(result) {

         }
      })
   }

   function Generate_Invoice(account_id, invoice_id, net_amount, is_from){
    var from_date = $("#from_date").val();
    var to_date = $("#to_date").val();
    if(net_amount == '0.0'){
      alert("Net Amount should be graeater than Zero!");
      return false;
    }
    url_path = "/accounts/generate_invoice?from_date="+from_date+"&to_date="+to_date + "&account_id=" + account_id + "&id=" + invoice_id + "&is_from=" + is_from;
      $.ajax({
          url: url_path,
          success: function(result) {

         }
      })
   }

   function sendInvoiceEmail(account_id,from_date,to_date,invoice_id){
    url_path = "/accounts/send_invoice_mail?from_date="+from_date+"&to_date="+to_date + "&account_id=" + account_id  + "&id=" + invoice_id;
      $.ajax({
          url: url_path,
          success: function(result) {

         }
      })
   } 
    function getAllIds(class_name) {
    temp = $('.' + class_name);
    ids = [];
       for ( i = 0; i < temp.length; i++) {
        if (temp[i].checked == true) {
          ids.push(parseInt(temp[i]["value"]));
      }
    }
    return ids;
  }

// var checkboxClick = function(){
//   $(".cancal_service").click(function(){
//     var canc_ser_ids = getAllIds('cancal_service');
//     var checked_id = getCheckedId('cancal_service');
//      localStorage.setItem('canc_ser_ids',canc_ser_ids);
//      url_path = "/service_trips/cancel_service_ids?canc_ser_id="+checked_id;
//       $.ajax({
//           url: url_path,
//           success: function(result) {

//          }
//       })
//   })
// }

  function getCheckedId(class_name) {
    temp = $('.' + class_name);
    var id = parseInt(temp[0]["value"]);
    return id;
  }
  var checkboxClick = function(){
  $(".cancal_service").click(function(){
    var canc_ser_ids = getAllIds('cancal_service');
    var checked_id = getCheckedId('cancal_service');
     localStorage.setItem('canc_ser_ids',canc_ser_ids);
    if ($(this).is(':checked')) {
      var message = "Are you sure, Do you want to change the running status?"
    }else{
      var message = "Are you sure, Do you want to cancel the trip?"
    }
            var retVal = confirm(message);
      if (retVal == true) { 
         url_path = "/service_trips/cancel_service_ids?canc_ser_id="+checked_id;
          $.ajax({
          url: url_path,
          success: function(result) {
         }
      })
        return true;
    } else {
        return false;
    }
  })
}

function switchAccount(event_obj){
  selected_account_id = event_obj.value;
  if (selected_account_id != undefined) {
    url_path = "/accounts/switch_account?selected_account_id="+selected_account_id;
    $.ajax({
      url: url_path,
      success: function(result){
        if(result != undefined){
          window.open(result.redirect_to_url, '_blank');
        }
      }
    });
  }
}


function placeLatLongMapping(place_id){
  var lat_long = $("#lat_long_id").val();
    var stage_lat_long = lat_long.split(",")
    var stage_latitude = parseFloat(stage_lat_long[0])
    var stage_longitude = parseFloat(stage_lat_long[1])
    if(stage_latitude > 0 && stage_latitude > 0){
    var radius = $("#update_stage_radius").val();
    url_path = "/places/update_place_lat_long_mapping?lat_long="+lat_long + "&radius=" +radius + "&place_id="+place_id;
    $.ajax({
      url: url_path,
      success: function(result){
       window.location.reload();
      }
    });
  }
    else{
      alert("latitude and longitude are not correct");
    }
}