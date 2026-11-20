String.prototype.trimLeft = function(charlist) {
  if (charlist === undefined)
	charlist = "\s";
  return this.replace(new RegExp("^[" + charlist + "]+"), "");
};
String.prototype.trimRight = function(charlist) {
  if (charlist === undefined)
	charlist = "\s";
  return this.replace(new RegExp("[" + charlist + "]+$"), "");
};
/**
 * return a form data as javascript object
 */
function getFormData(form){
    var out = {};
    var s_data = $(form).serializeArray();
    //transform into simple data/value object
    for(var i = 0; i<s_data.length; i++){
        var record = s_data[i];
        out[record.name] = record.value;
    }
    return out;
}
/**
 * convert simple string separated by comma into array
 */
function valToArray(val) {
	if(val){
		if(Array.isArray(val)){
			return val;
		}
		else{
			return val.split(",");
		}
	}
	else{
		return [];
	}
};
/**
 * simple debounce function for ajax loading on user typing
 */
function debounce(fn, delay) {
  var timer = null;
  return function () {
	var context = this, args = arguments;
	clearTimeout(timer);
	timer = setTimeout(function () {
	  fn.apply(context, args);
	}, delay);
  };
}
/**
 * merge two object
 */
function extend(obj, src) {
	for (var key in src) {
		if (src.hasOwnProperty(key)) obj[key] = src[key];
	}
	return obj;
}
/**
 * check if a string is a valid url
 */
function isURL(str) {
	return /^(?:\w+:)?\/\/([^\s\.]+\.\S{2}|localhost[\:?\d]*)\S*$/.test(str); 
}
//return the absolute url of a path with query string 
function setPathLink(path , queryObj){
	var queryStr = "";
	if(queryObj){
		var str = [];
		for(var k in queryObj){
			var v = queryObj[k]
			if (queryObj.hasOwnProperty(k) && v !== '') {
				str.push(encodeURIComponent(k) + "=" + encodeURIComponent(v));
			} 
		}
		var qs = str.join("&");
		if(path.indexOf('?') > 0){
			queryStr = '&' + qs;  
		}
		else{
			queryStr = '?' + qs;  
		}
	}
	if(!isURL(path)){
		return url = siteAddr + path + queryStr;
	}
	else{
		return url =  path + queryStr;
	}
}
function showToastSuccess(msg){
	var flashAlert = $('<div class="alert alert-success animated bounce fixed-alert bottom-left"><button type="button" class="close" data-dismiss="alert">&times;</button>' + msg + '</div>');
	$('body').append(flashAlert);
	window.setTimeout(function(){
		flashAlert.remove();
	},3000);
}
function showToastDanger(msg){
	var flashAlert = $('<div class="alert alert-danger animated bounce fixed-alert bottom-left"><button type="button" class="close" data-dismiss="alert">&times;</button>' + msg + '</div>');
	$('body').append(flashAlert);
	window.setTimeout(function(){
		flashAlert.remove();
	},3000);
}
/**
 * generate random hexadecimal color
 */
function randomColor() {
	var letters = '0123456789ABCDEF';
	var color = '#';
	for (var i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 16)];
	}
	return color;
}
var pageLoadingIndicator = $('#page-loading-indicator').html(); //loding indicator used for ajax load content
var pageSavingIndicator = $('#page-saving-indicator').html(); //saving indicator used for ajax submit form
var inlineLoadingIndicator = $('#inline-loading-indicator').html(); //inline loading indicator
$(document).ready(function() {
	//hides page flash msg after page navigate.
	var elem=$('#flashmsgholder');
	if(elem.length>0){
		var duration=elem.attr("data-show-duration");
		if(duration>0){
			window.setTimeout(function(){
				elem.fadeOut();
			},duration)
		}
	}
});
/**
 * Table toggle select all records
 */
$(document).on('click', '.toggle-check-all', function(){
	var p = $(this).closest('table').find('.optioncheck');
	p.prop("checked",$(this).prop("checked"));
});
/**
 * Table select a record 
 */
$(document).on('click', '.optioncheck, .toggle-check-all', function(){
	var sel_ids =$(this).closest('.page').find("input.optioncheck:checkbox:checked").map(function(){
	  return $(this).val();
	}).get();
	if(sel_ids.length>0){
		 $(this).closest('.page-content').find('.btn-delete-selected').removeClass('d-none');
	}
	else{
		$(this).closest('.page-content').find('.btn-delete-selected').addClass('d-none');
	}
});
/**
 * Table delete selected record
 */
$(document).on('click', '.btn-delete-selected', function(e){
	var recordDeleteMsg = $(this).data("prompt-msg");
	var displayStyle = $(this).data("display-style");
	if(!recordDeleteMsg){
		recordDeleteMsg = "Are you sure you want to delete selected records?";
	}
	var sel_ids =$(this).closest('.page-content').find("input.optioncheck:checkbox:checked").map(function(){
	  return $(this).val();
	}).get();
	if(sel_ids.length>0){
		var url = $(this).data('url');
		url = url.replace("{sel_ids}",sel_ids);
		if(displayStyle == 'confirm'){
			if(confirm(recordDeleteMsg)){
				window.location = url;
			}
			else{
				e.preventDefault();
			}
		}
		else if(displayStyle == 'modal'){
			$('#delete-record-modal-msg').html(recordDeleteMsg);
			$('#delete-record-modal-confirm').modal('show');
			$('#delete-record-modal-btn').attr('href', url);
			var ajaxpage = $(this).closest(".ajax-page");
			$('#delete-record-modal-btn').data("ajax-page", ajaxpage);
			e.preventDefault();
		}
		else{
			window.location = url;
		}
	}
	else{
		alert('No Record Selected');
	}
});
/**
 * page delete record action button
 */
$(document).on('click', '.record-delete-btn', function(e){
	var recordDeleteMsg = $(this).data("prompt-msg");
	var displayStyle = $(this).data("display-style");
	if(!recordDeleteMsg){
		recordDeleteMsg="Are you sure you want to delete this record?";
	}
	if(displayStyle == 'confirm'){
		if(!confirm(recordDeleteMsg)){
			e.preventDefault();
		}
	}
	else if(displayStyle == 'modal'){
		$('#delete-record-modal-msg').html(recordDeleteMsg);
		$('#delete-record-modal-confirm').modal('show');
		$('#delete-record-modal-btn').attr('href', $(this).attr('href'));
		var ajaxpage = $(this).closest(".ajax-page");
		$('#delete-record-modal-btn').data("ajax-page", ajaxpage);
		e.preventDefault();
	}
});
/**
 * modal confirm delete action
 */
$(document).on( "click", "#delete-record-modal-btn", function(e) {
	var ajaxpage = $(this).data('ajax-page');
	//if ajaxpage is present then delete using ajax else continue with delete navigation
	if(ajaxpage.length){
		e.preventDefault();
		var deleteUrl = $(this).attr('href');
		$('#delete-record-modal-msg').html(inlineLoadingIndicator);
		$.ajax({
			url: deleteUrl,
			type: "get",
			success: function(msg) {
				showToastSuccess(msg);
				var pageUrl = ajaxpage.data("page-url");
				loadPageData(ajaxpage, pageUrl); //reload page data
				$('#delete-record-modal-confirm').modal('hide'); //close modal
			},
			error: function( xhr, err ) {
				showToastDanger(xhr.statusText);
			}
		});
	}
});
/**
 * remove uploaded file action on edit page
 */
$(document).on('click', '.removeEditUploadFile', function(e){
	 // hidden input that contains all the file
	var holder = $(this).closest(".uploaded-file-holder");
	var inputid = $(this).attr("data-input");
	var inputControl = $(inputid);
	var filepath = $(this).attr('data-file');
	var filenum = $(this).attr('data-file-num');
	var srcTxt = inputControl.val();
	if(srcTxt){
		var arrSrc = srcTxt.split(",");
		arrSrc.forEach(function(src,index){
			if(src == filepath){
				arrSrc.splice(index,1);
			}
		});
		holder.find("#file-holder-"+filenum).remove();
		var ty = arrSrc.join(",");
		inputControl.val(ty);
	}
});
/**
 * custom btn to close a popover view
 */
$(document).on("click", ".popover .close-btn, .popover .close" , function(){
	$(this).parents(".popover").popover('hide');
});
/**
 * Display a page in popover component
*/
$(document).on('click', '.open-page-popover', function(e){
	$('.open-page-popover').not(this).popover('hide'); // hide other popover
	e.preventDefault();
});
/**
 * toggle a new table row and open a page link in the view
 */
$(document).on('click', '.open-page-inline', function(e){
	e.preventDefault();
	var dataURL = $(this).attr('href');
	if($(this).closest('tr').length != 0){
		var tbRow = $(this).closest('tr');
		var loaded = tbRow.attr('loaded');
		var colspan = tbRow.children('td,th').length;
		if(!loaded){
			tbRow.attr('loaded', true);
			var newRow = $('<tr class="child-row"><td colspan="' + colspan + '"><div class="row justify-content-center"><div class="col-md-6"><div class="content reset-grids inline-page">' + pageLoadingIndicator + '</div></div></div></td></tr>');
			tbRow.after(newRow); 
			newRow.find('.content').load(dataURL, function(responseText, status, req){
				if(status == 'error'){
					tbRow.removeAttr('loaded');
				}
			});
		}
		else{
			tbRow.next().toggle();	
		}
	}
	else{
		var container = $(this).closest('.inline-page');
		var loaded = container.attr('loaded');
		var page = container.find('.page-content');
		if(!loaded){
			container.attr('loaded', true);
			page.html(pageLoadingIndicator).load(dataURL, function(responseText, status, req){
				if(status == 'error'){
					container.removeAttr('loaded');
				}
			});
		}
		page.toggleClass('d-none');
	}
});
$(document).on('change', '.custom-file-input', function(){
	var fileName = $(this).val().split('\\').pop();
	$(this).siblings('.custom-file-label').addClass('selected').html(fileName);
});
/**
 * Refresh captcha image
*/
$(document).on('click', '[data-captcha]', function(e){
	var url = $(this).data("captcha");
	var img = $(this).find("img");
	img.attr("src", url + "?" + new Date().getTime());
});
/**
 * remove table row in a multi-table form
 */
$(document).on('click', '.btn-remove-table-row', function(e){
	var tableBody = $(this).closest('table').find("tbody");
	var rowCount = tableBody.find('tr.input-row:last').index() + 1
	var minRow = $(this).closest('table').data("minrow");
	if(rowCount > minRow){
		$(this).closest("tr.input-row").remove();
	}
});
/**
 * add new table row in a multi-table form
 */
$(document).on('click', '.btn-add-table-row', function(e){
	var tableBody = $(this).closest('table').find("tbody");
	var rowCount = tableBody.find('tr.input-row:last').index() + 1
	var maxRow = $(this).closest('table').data("maxrow");
	if(rowCount < maxRow){
		var templateId = $(this).data("template");
		var trTemplate = $(templateId).html();
		var nextRow = parseInt(rowCount) + 1;
		trTemplate = trTemplate.replace(/row1/ig, "row" +  nextRow);
		var trNew = $(trTemplate);
		tableBody.append(trNew);
	}
	initFormPlugins(); //rebind form plugin to the new controls
});
/**
 * check if a form is valid and set set form controls validity status 
 */
$(document).on('submit', 'form.needs-validation, form.multi-form', function(event){
	if(!validateForm($(this))){
		event.preventDefault();
		event.stopPropagation();
	}
});
/**
 * validate password confirmation
 */
$(document).on('input', '.password-confirm', function(event){
	var inputElem =  $(this)
	var value = inputElem.val();
	var match = $(inputElem.data("match")).val();
	if(value !== match){
		inputElem.removeClass('is-valid').addClass('is-invalid');
		inputElem[0].setCustomValidity("Password do not match");
	}
	else{
		inputElem.removeClass('is-invalid').addClass('is-valid');
		inputElem[0].setCustomValidity("");
	}
});
/**
 * validate password confirmation
 */
$(document).on('input', 'input.password', function(event){
	var inputElem =  $(this)
	var value = inputElem.val();
	var confirmPassword = inputElem.closest("form").find(".password-confirm");
	if(confirmPassword.length){
		var match = confirmPassword.val();
		if(value !== match){
			confirmPassword.removeClass('is-valid').addClass('is-invalid');
			confirmPassword[0].setCustomValidity("Password do not match");
		}
		else{
			confirmPassword.removeClass('is-invalid').addClass('is-valid');
			confirmPassword[0].setCustomValidity("");
		}
	}
});
/**
 * validate form fields and display validation feedback 
 */
function validateForm(formElem){
	formElem.addClass('was-validated');
	formElem.find("input:required:invalid").parents('.dropzone').css("borderColor", "red");
	formElem.find("input:required:invalid").parents('.custom-file').find('.custom-file-label').css("borderColor", "red");
	formElem.find("textarea:required:invalid").parents('.form-group,.input-row').find('.note-editor').css("borderColor", "red");
	var confirmPasswordElem = formElem.find("input.password-confirm");
	if(confirmPasswordElem.length){
		var value = confirmPasswordElem.val();
		var match = $(confirmPasswordElem.data("match")).val();
		if(value !== match){
			confirmPasswordElem.removeClass('is-valid').addClass('is-invalid');
			confirmPasswordElem[0].setCustomValidity("Password do not match");
		}
		else{
			confirmPasswordElem.removeClass('is-invalid').addClass('is-valid');
			confirmPasswordElem[0].setCustomValidity("");
		}
	}
	var form = formElem[0];
	if(!form.checkValidity()){
		return false
	}
	return true;
}
/**
 * submit a form using ajax
 */
$(document).on('click', '.ajax-page a.export-link-btn', function(e){
	var page = $(this).closest('.ajax-page');
	var format = $(this).data("format");
	var pageUrl = page.data('page-url');
	var url = new Url(pageUrl);
	url.query.format = format;
	var link = url.toString();
	$(this).attr("href", link);
});
/**
 * submit a form using ajax
 */
$(document).on('submit', '.ajax-page form.page-form', function(e){
	var formElem = $(this);
	if(validateForm(formElem)){
		var savingIndicator  = formElem.find('.form-ajax-status');
		savingIndicator.html(pageSavingIndicator);
		savingIndicator.show();
		$.ajax({
			url: formElem.attr('action'),
			type: formElem.attr('method'),
			data: formElem.serialize(),
			success: function(msg) {
				savingIndicator.hide();
				showToastSuccess(msg);
				var ajaxpage = formElem.closest('.ajax-page');
				var pageUrl = ajaxpage.data("page-url");
				loadPageData(ajaxpage, pageUrl);
				formElem.closest('.modal').modal('toggle'); //close the modal
				formElem[0].reset();
				formElem.removeClass('was-validated');
			},
			error: function( xhr, err ) {
				savingIndicator.hide();
				showToastDanger( xhr.statusText );
			}
		});
	}
	e.preventDefault();
	e.stopPropagation();
});
/**
 * submit a form using ajax and refresh the ajax-page
 */
$(document).on('submit', '#main-page-modal form.page-form', function(e){
	var formElem = $(this);
	if(validateForm(formElem)){
		var savingIndicator  = formElem.find('.form-ajax-status');
		savingIndicator.html(pageSavingIndicator);
		savingIndicator.show();
		$.ajax({
			url: formElem.attr('action'),
			type: formElem.attr('method'),
			data: formElem.serialize(),
			success: function(msg) {
				savingIndicator.hide();
				showToastSuccess(msg);
				var ajaxpage = formElem.closest('.modal').data('ajax-page');
				if(ajaxpage.length){
					var pageUrl = ajaxpage.data("page-url");
					loadPageData(ajaxpage, pageUrl);
					$('#main-page-modal').modal('hide');
				}
			},
			error: function( xhr, err ) {
				savingIndicator.hide();
				showToastDanger(xhr.statusText);
			}
		}); 
	}
	e.preventDefault();
	e.stopPropagation();
});
/**
 * open content in a modal view
 */
$(document).on('click', '.open-page-modal', function(e){
	e.preventDefault();
	var dataURL = $(this).attr('href');
	var modal = $(this).next('.modal');
	modal.modal({show:true});
	modal.find('.modal-body').html(pageLoadingIndicator).load(dataURL);
});
/**
 * open page in modal view
 */
$(document).on('click', 'a.page-modal', function(e){
	e.preventDefault();
	var dataURL = $(this).attr('href');
	var ajaxpage = $(this).closest('.ajax-page');
	var modal = $('#main-page-modal');
	modal.data('ajax-page', ajaxpage);
	modal.modal({show:true});
	modal.find('.modal-body').html(pageLoadingIndicator).load(dataURL, function(responseText, status, req){
		if(status == 'error'){
			$(this).html(responseText);
		}
	});
});
/**
 * check if value already exit in a database table for validation
 */
$(document).on('blur', '.ctrl-check-duplicate', function(){
	var inputElem = $(this)
	var val = inputElem.val();
	var apiUrl = inputElem.data("url");
	var elemCheckStatus = inputElem.closest('.form-group').find('.check-status');
	var loadingMsg = inputElem.data('loading-msg');
	var availableMsg = inputElem.data('available-msg');
	var notAvailableMsg = inputElem.data('unavailable-msg');
	elemCheckStatus.html('<small class="text-muted">' + loadingMsg + '</small>');
	if(val){
		$.ajax({
			url : setPathLink(apiUrl + val),
			success : function(result) {
				if(result == true) {
					inputElem.addClass('is-invalid');
					inputElem[0].setCustomValidity(notAvailableMsg);
					elemCheckStatus.html('<small class="text-danger">' + notAvailableMsg + '</small>');
				}
				else{ 
					inputElem.removeClass('is-invalid').addClass('is-valid');
					inputElem[0].setCustomValidity('');
					elemCheckStatus.html('<small class="text-success">' + availableMsg + '</small>');
				}
			},
			error : function(err) {
				elemCheckStatus.html('');
				console.log(err);
			}
		});
	}
	else{
		elemCheckStatus.html('');
		inputElem.removeClass('is-valid').removeClass('is-valid');
	}
});
/**
 * populate another select control when a control value changes
 */
$(document).on('change', '[data-load-select-options]', function(e){
	var elem = $(this);
	var elementType =  elem.prop('tagName').toLowerCase();
	var selectedVal = "";
	if(elementType == 'input'){
		var arrSelectedVals = [];
		elem.closest('.form-group, .input-row').find("input:checked").each(function(){
			arrSelectedVals.push(elem.val());
		});
		selectedVal = arrSelectedVals.toString();
	}
	else{
		selectedVal = elem.val().toString();
	}
	var targetFields =  elem.data('load-select-options');
	var arrFields = targetFields.split(",");
	arrFields.forEach(function(field){
		//if placed in a multiple table row, populate only the field in the same row
		var targetElem;
		var tableRow = elem.closest(".input-row");
		if(tableRow.length){
			targetElem = tableRow.find("select[id*=ctrl-" + field + "], input[id*=ctrl-" + field + "]");
		}
		else{
			targetElem = $("#ctrl-" + field);
		}
		var path = targetElem.data('load-path') + '/' + encodeURIComponent(selectedVal);
		targetElem.html('<option value="">Loading...</option>');
		var placeholder = targetElem.attr('placeholder') || 'Select a value...';
		$.ajax({
			type: 'GET',
			url: path,
			dataType: 'json',
			success: function(data){
				if(targetElem.hasClass('selectize')){
					targetElem.each(function() {
						if (this.selectize) {
							this.selectize.clear();
							this.selectize.clearOptions();
							for (var i = 0; i < data.length; i++) {
								this.selectize.addOption({value:data[i].value, text: data[i].label });
							}
						}
					}); 
				}
				else{
					var options = '<option value="">' + placeholder +  '</option>';
					for (var i = 0; i < data.length; i++) {
						options += '<option value="' + data[i].value + '">' + data[i].label + '</option>';
					}
					targetElem.html(options);
				}
			},
			error: function(data) {
				var options = '<option value="">' + placeholder +  '</option>';
				targetElem.html(options);
			},
		});
	})
});
/**
 * populate another input check/radio control when a control value changes
 */
$(document).on('change', '[data-load-check-options]', function(e){
	var elem = $(this);
	var elementType = elem.prop('tagName').toLowerCase();
	var selectedVal = "";
	if(elementType == 'input'){
		var arrSelectedVals = [];
		elem.closest('.form-group').find("input:checked").each(function(){
			arrSelectedVals.push(elem.val());
		});
		selectedVal = arrSelectedVals.toString();
	}
	else{
		selectedVal = elem.val().toString();
	}
	var targetFields =  elem.data('load-check-options');
	var arrFields = targetFields.split(",");
	arrFields.forEach(function(field){
		var targetOptionsHolder;
		var templateHtml = $("#" + field + "-option-template").html();
		//if placed in a multiple table row, populate only the field in the same row
		var tableRow = elem.closest(".input-row");
		if(tableRow.length){
			targetOptionsHolder = tableRow.find("#" + field + "-options-holder");
			var rowIndex = tableRow.index() + 1;
			//update input name to the current table row
			templateHtml = templateHtml.replace(/row1/ig, "row" + rowIndex);
		}
		else{
			targetOptionsHolder = $("#" + field + "-options-holder");
		}
		var path = targetOptionsHolder.data('load-path') + '/' + encodeURIComponent(selectedVal);
		targetOptionsHolder.html(inlineLoadingIndicator);
		$.ajax({
			type: 'GET',
			url: path,
			dataType: 'json',
			success: function (data){
				targetOptionsHolder.html("");
				for (var i = 0; i < data.length; i++) {
					var option = $(templateHtml);
					option.find('input').val(data[i].value);
					option.find('.input-label-text').html(data[i].label);
					targetOptionsHolder.append(option);
				}
			},
			error: function (data) {
				targetOptionsHolder.html('...');
			},
		});
	})
});
/**
 * for multi checkbox, validate if a value is checked
 */
$('.form-group').on("click",'input:checkbox',function(){          
	var name = $(this).attr('name');
	var checkElem = $('input[name="'+name+'"]:checked');
    var min = 1 //minumum number of boxes to be checked for this form-group
    if(checkElem.length < min){
        $('input[name="'+name+'"]').prop('required',true);
    }
    else{
        $('input[name="'+name+'"]').prop('required',false);
    }
});
/**
 * close ajax drop down search
 */
$(document).on('click', '.close-search', function(e){
	var parent = $(this).closest('.search-input');
	parent.find('.holder').hide();
});
$(document).on('keyup', 'input.ajax-dropdown-search', debounce(function(){
	var searchText = $(this).val();
	searchText = searchText.trim();
	var parent = $(this).closest('.search-input');
	if(searchText){
		var pageUrl = $(this).data('page');
		var url = new Url(pageUrl);
		url.query.search = searchText;
		parent.find('.holder').show();
		parent.find('.search-result').html(inlineLoadingIndicator).load(url.toString());
	}
	else{
		parent.find('.holder').hide();
	}
},500));
$(document).on('keyup', 'input.ajax-page-search', debounce(function(){
	var searchText = $(this).val();
	searchText = searchText.trim();
	var pageID = $(this).data('page-id');
	var pageDataHolder = $('#page-data-' + pageID);
	var pageSearchResultHolder = $('#search-data-' + pageID);
	if(searchText){
		var pageUrl = $(this).data('page');
		var url = new Url(pageUrl);
		url.query.search = searchText;
		pageSearchResultHolder.show();
		pageSearchResultHolder.html(inlineLoadingIndicator).load(url.toString());
		pageDataHolder.hide();
	}
	else{
		pageDataHolder.show();
		pageSearchResultHolder.hide();
	}
},500));
/**
 * toggle password visibility
 */
$(document).on('click', '.btn-toggle-password', function(){
	var input = $(this).closest(".form-group").find("input");
	var inputType = input.attr("type");
	if(inputType == "password"){
		input.attr("type", "text");
	}
	else{
		input.attr("type", "password");
	}
});
/**
 * replace failed images with better looking image
 */
$(window).bind('load', function(){
	$('img').each(function() {
		if((typeof this.naturalWidth != "undefined" && this.naturalWidth == 0 ) || this.readyState == 'uninitialized' ) {
			var noImgSrc = setPathLink('assets/images/no-image-available.png');
			$(this).attr('src', noImgSrc);
		}
	}); 
	}
);
/**
 * ajax page navigation
 */
$(document).on('submit', 'form.ajax-pagination-form', function(event){
	var formdata = getFormData($(this));
	var currentPage =  parseInt(formdata.limit_start);
	var limitCount = parseInt(formdata.limit_count);
	if(currentPage && limitCount){
		var pager = $(this).find(".ajax-pagination");
		var totalRecords = parseInt(pager.data("total-records"));
		var recordPosition = Math.min((currentPage * limitCount), totalRecords);
		var newTotalPage = Math.ceil(totalRecords / limitCount);
		var page = $(this).closest(".ajax-page");
		var pageUrl = page.data("page-url");
		var url = new Url(pageUrl);
		url.query.limit_start = currentPage;
		url.query.limit_count = limitCount;
		var path = url.toString();
		page.data("page-url", path); //update page link
		pager.twbsPagination("changeTotalPages", newTotalPage, currentPage); //load page
		$(this).find(".record-position").html(recordPosition);
		$(this).find(".total-page").html(newTotalPage);
		var pageOptions = "";
		for(var i = 1; i <= newTotalPage; i++){
			pageOptions = pageOptions + '<option value="'+ i +'">' + i + '</option>';
		}
		$(this).find(".page-num").html(pageOptions);
		$(this).find(".page-num").val(currentPage);
	}
	event.preventDefault();
});
/**
 * ajax list page filter
 */
$(document).on('submit', '.ajax-page form.filter-form', function(event){
	var formdata = getFormData($(this));
	var page = $(this).closest(".ajax-page");
	var pageUrl = $(this).attr("action");
	var url = new Url(pageUrl);
	extend(url.query, formdata);
	var filterUrl = url.toString();
	loadPageData(page, filterUrl);
	page.data("page-url", filterUrl); //update page link
	event.preventDefault();
});
/**
 * ajax sort table header
 */
$(document).on('click', '.ajax-page .th-sort-link', function(event){
	var page = $(this).closest(".ajax-page");
	var pageUrl = page.data("page-url");
	var url = new Url(pageUrl);
	var orderby = $(this).data("orderby");
	var ordertype = (page.data("ordertype") || "").toLowerCase();
	ordertype = (ordertype == "asc" ? "desc" : "asc");
	url.query.orderby = orderby;
	url.query.ordertype = ordertype;
	url.query.limit_start = 1;
	page.data("ordertype", ordertype);
	page.find("a.th-sort-link").closest("th").removeClass("sortedby");
	$(this).closest("th").addClass("sortedby");
	if(ordertype === "desc"){
		$(this).parent().find(".sort-icon").addClass("inverse")
	}
	else{
		$(this).parent().find(".sort-icon").removeClass("inverse")
	}
	var path = url.toString();
	page.data("page-url", path); //update page link
	var pager = page.find(".ajax-pagination");
	pager.twbsPagination("show", 1); //load page
	event.preventDefault();
});
var scrollLoad = true;
/**
 * Infinite page load. Append to page list instead of replacing it.
 */
function appendPageData(ajaxPage){
	var pageUrl = ajaxPage.data("page-url");
	var loading;
	var url = new Url(pageUrl);
	var currentPage = parseInt(url.query.limit_start) || 1;
	url.query.limit_start = currentPage + 1;
	var pageUrl = url.toString();
	if(ajaxPage.data("display-type") == "table"){//if page type is tabular
		loading = $('<tr class=""><td class="text-center p-3" colspan="100">' + inlineLoadingIndicator + '</td></tr>');
	}
	else{
		loading = $('<div class="text-center p-3 col-12">' + inlineLoadingIndicator + '</div>');
	}
	var pageBody = ajaxPage.find("table tbody .page-data, .page-content .page-data").first()
	if(pageBody.find('.no-record-found').length === 0){	
		pageBody.append(loading);
		$.ajax({
			url: pageUrl,
			success : function(result) {
				scrollLoad = true;
				ajaxPage.data("load-completed", true);
				pageBody.append(result);
				loading.remove();
			},
			error : function(err) {
				scrollLoad = true;
				loading.remove();
			}
		});
		ajaxPage.data("page-url", pageUrl); //update page link
	}
	else{
		scrollLoad = true;
	}
}
/**
 * infinite load more button
 */
$(document).on('click', '.ajax-page .btn-load-more', function(event){
	var ajaxPage = $(this).closest(".ajax-page");
	appendPageData(ajaxPage)
});
/**
 * perform infinite page load records on window scroll
 */
$(window).scroll(function () { 
	if (scrollLoad && $(window).scrollTop() >= $(document).height() - $(window).height() - 100) {
		scrollLoad = false; //prevent multiple loads
		var ajaxPage = $('.ajax-page.infinite-scroll').first();
		appendPageData(ajaxPage);
	}
});
/**
 * perform infinite page load records on page scroll. 
 * Page must have height and overflow:auto|scroll css properties
 */
$('.ajax-page.infinite-scroll').bind('scroll', function(){
	if($(this).scrollTop() + $(this).innerHeight() >= $(this)[0].scrollHeight){
		scrollLoad = false;//prevent multiple load
		var ajaxPage = $(this);
		appendPageData(ajaxPage);
	}
});
$(function(){
	var navTopHeight = $('#topbar').outerHeight();
	document.body.style.paddingTop = navTopHeight + 'px';
});
/* >>> DASH-DATA-JS-START ==== Ambil data penjualan dari halaman Penjualan (tanpa PHP) ====
   Untuk mengganti nanti: hapus dari DASH-DATA-JS-START sampai DASH-DATA-JS-END. */
(function () {
  var names = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];
  function pad(n) { return (n < 10 ? '0' : '') + n; }
  function keyOf(d) { return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()); }
  function num(t) {
    var s = String(t || '').replace(/[^0-9\-]/g, '');
    return (s === '' || s === '-') ? 0 : parseInt(s, 10);
  }
  function dateKey(t) {
    t = String(t || '').trim();
    var m = t.match(/(\d{4})-(\d{2})-(\d{2})/);
    if (m) return m[1] + '-' + m[2] + '-' + m[3];
    var d = new Date(t);
    return isNaN(d.getTime()) ? null : keyOf(d);
  }
  function emptyData(note) {
    var now = new Date(), labels = [], keys = [], zero = [];
    for (var i = 6; i >= 0; i--) {
      var d = new Date(now.getFullYear(), now.getMonth(), now.getDate() - i);
      labels.push(names[d.getDay()]);
      keys.push(keyOf(d));
      zero.push(0);
    }
    return { labels: labels, keys: keys, penjualan: zero.slice(), modal: zero.slice(), hasModal: false, note: note };
  }
  function parse(html) {
    var out = emptyData('Data langsung dari database');
    var doc = new DOMParser().parseFromString(html, 'text/html');
    var table = doc.querySelector('table');
    if (!table) { out.note = 'Tabel di halaman Penjualan tidak ditemukan'; return out; }
    var heads = [].map.call(table.querySelectorAll('thead th'), function (th) {
      return th.textContent.trim().toLowerCase();
    });
    function col(word) {
      for (var i = 0; i < heads.length; i++) { if (heads[i].indexOf(word) > -1) return i; }
      return -1;
    }
    var cDate = col('tanggal'), cTotal = col('total'), cJenis = col('jenis'),
        cQty = col('jumlah'), cPokok = col('pokok');
    if (cDate < 0 || cTotal < 0) { out.note = 'Kolom Tanggal/Total tidak ada di halaman Penjualan'; return out; }
    out.hasModal = (cPokok > -1 && cQty > -1);
    if (!out.hasModal) out.note = 'Modal belum terbaca (kolom Harga Pokok tidak tampil di halaman Penjualan)';
    [].forEach.call(table.querySelectorAll('tbody tr'), function (tr) {
      var td = tr.children;
      if (td.length <= cTotal || td.length <= cDate) return;
      if (cJenis > -1 && td[cJenis] && td[cJenis].textContent.toLowerCase().indexOf('penjualan') < 0) return;
      var i = out.keys.indexOf(dateKey(td[cDate].textContent));
      if (i < 0) return;
      out.penjualan[i] += num(td[cTotal].textContent);
      if (out.hasModal) out.modal[i] += num(td[cQty].textContent) * num(td[cPokok].textContent);
    });
    console.log('DASH data:', out);
    return out;
  }
  var cache = null;
  window.dashLoad = function (cb) {
    if (!cache) {
      var base = (typeof siteAddr !== 'undefined') ? siteAddr : '/';
      var url = base + 'sales?limit=1000&orderby=tanggal&ordertype=DESC';
      cache = new Promise(function (resolve) {
        var done = false;
        function fin(d) { if (!done) { done = true; resolve(d); } }
        setTimeout(function () { fin(emptyData('Data belum bisa dimuat (waktu habis)')); }, 8000);
        fetch(url, { credentials: 'same-origin' })
          .then(function (r) { if (!r.ok) throw new Error(r.status); return r.text(); })
          .then(function (html) { fin(parse(html)); })
          .catch(function () { fin(emptyData('Data belum bisa dimuat dari halaman Penjualan')); });
      });
    }
    cache.then(cb);
  };
})();
/* <<< DASH-DATA-JS-END */
/* >>> DASH-JS-START ==== Kartu dashboard (hanya untuk body.home-index) ====
   Untuk mengganti nanti: hapus dari DASH-JS-START sampai DASH-JS-END. */
$(function () {
  if (!document.body.classList.contains('home-index')) return;
  if (document.querySelector('.hd-section')) return;
  var base = (typeof siteAddr !== 'undefined') ? siteAddr : '/';
  // Stok Masuk & Pengeluaran hanya untuk admin.
  // Menu sidebar sudah dibatasi dari server, jadi kalau linknya tidak ada = bukan admin.
  var isAdmin = !!document.querySelector('#topbar a[href*="purchases"], #topbar a[href*="expenses"]');
  var adminCards = isAdmin ?
        '<a class="hd-card hd-navy" href="' + base + 'purchases">' +
          '<div class="hd-icon">🚚</div><h3>Stok Masuk</h3>' +
          '<p>Pembelian barang dari supplier</p><span class="hd-open">Buka →</span></a>' +
        '<a class="hd-card hd-green" href="' + base + 'expenses">' +
          '<div class="hd-icon">💸</div><h3>Pengeluaran</h3>' +
          '<p>Biaya listrik, gaji, dan kebutuhan toko</p><span class="hd-open">Buka →</span></a>'
      : '';
  var html =
    '<div class="hd-section">' +
      '<h2 class="hd-title">Akses Cepat</h2>' +
      '<div class="hd-grid">' +
        '<a class="hd-card hd-orange" href="' + base + 'products">' +
          '<div class="hd-icon">📦</div><h3>Data Barang</h3>' +
          '<p>Katalog barang, harga, dan stok</p><span class="hd-open">Buka →</span></a>' +
        '<a class="hd-card hd-blue" href="' + base + 'sales">' +
          '<div class="hd-icon">🛒</div><h3>Penjualan</h3>' +
          '<p>Catat barang keluar dan lihat penjualan</p><span class="hd-open">Buka →</span></a>' +
        adminCards +
      '</div>' +
    '</div>' +
    '<div class="hd-section">' +
      '<h2 class="hd-title">Panduan Alur Toko</h2>' +
      '<div class="hd-steps">' +
        '<div class="hd-step" style="--c:#1f6fff"><div class="hd-emoji">📥</div>' +
          '<div><h5>Stok Masuk</h5><p>Barang dibeli dari supplier dan dicatat. Stok bertambah otomatis dan harga beli ikut diperbarui.</p></div></div>' +
        '<div class="hd-step" style="--c:#f2b400"><div class="hd-emoji">🛍️</div>' +
          '<div><h5>Barang Keluar</h5><p>Penjualan, barang rusak, atau pemakaian sendiri dicatat di sini. Stok berkurang otomatis.</p></div></div>' +
        '<div class="hd-step" style="--c:#1f9a5f"><div class="hd-emoji">💸</div>' +
          '<div><h5>Pengeluaran</h5><p>Biaya toko di luar belanja barang dicatat supaya laba rugi bisa dihitung.</p></div></div>' +
      '</div>' +
      '<div class="hd-flow"><span>📥 Stok Masuk ➜ 🛍️ Barang Keluar ➜ 💸 Pengeluaran</span></div>' +
    '</div>';
  $('#page-content').append(html);
});
/* <<< DASH-JS-END */
/* >>> LANDING-INFO-JS-START ==== Profil, produk, kontak & lokasi (hanya body.index-index) ====
   Untuk mengganti nanti: hapus dari LANDING-INFO-JS-START sampai LANDING-INFO-JS-END. */
(function () {
  function buildLanding() {
    try {
      if (!document.body || !document.body.classList.contains('index-index')) return;
      if (document.querySelector('.lp-wrap')) return;
      var host = document.getElementById('page-content');
      if (!host) { console.warn('LANDING: #page-content tidak ditemukan'); return; }
      var waNumber = '6287780415794';
      var waText   = 'Halo Toko Enny Plastik, saya mau tanya stok barang.';
      var waLink   = 'https://wa.me/' + waNumber + '?text=' + encodeURIComponent(waText);
      var mapsLink = 'https://maps.app.goo.gl/5AqLtL2ywgKVgPuQ8';
      var address  = '2J2G+7CX, Ciptomulyo, Kec. Sukun, Kota Malang, Jawa Timur 65117';
      var embedSrc = 'https://www.google.com/maps?q=' + encodeURIComponent(address) + '&output=embed';
      var products = [
        ['🛍️', 'Plastik Kantong Kresek', 'Kantong plastik untuk belanja dan kemasan sehari-hari.', '#e8832a'],
        ['🥤', 'Sedotan', 'Sedotan untuk berbagai kebutuhan minuman.', '#1f6fff'],
        ['📦', 'Kardus', 'Kardus untuk kemasan dan pengiriman barang.', '#27548a'],
        ['🧻', 'Tisu', 'Tisu untuk kebutuhan rumah, warung, dan usaha.', '#1f9a5f'],
        ['🧋', 'Cup Minuman', 'Cup untuk jualan es, kopi, dan minuman kekinian.', '#f2b400'],
        ['🍱', 'Thinwall', 'Wadah makanan praktis untuk bekal dan usaha kuliner.', '#e8832a'],
        ['➕', 'Dan Lainnya', 'Masih banyak barang lain, tanyakan stoknya lewat WhatsApp.', '#1f6fff']
      ];
      var productHtml = products.map(function (p) {
        return '<div class="lp-product" style="--c:' + p[3] + '">' +
                 '<div class="em">' + p[0] + '</div><h4>' + p[1] + '</h4><p>' + p[2] + '</p></div>';
      }).join('');
      var html =
        '<section class="lp-wrap" id="tentang">' +
          '<h3 class="lp-title">Tentang Kami</h3>' +
          '<div class="lp-about">' +
            '<div class="lp-card">' +
              '<p><strong>Toko Enny Plastik</strong> berdiri sejak <strong>2015</strong> di Kota Malang dan dikelola langsung oleh Ibu Enny.</p>' +
              '<p>Kami menyediakan berbagai kebutuhan plastik dan kemasan dengan harga yang bersahabat, dilayani dengan ramah supaya pelanggan nyaman setiap kali berbelanja.</p>' +
            '</div>' +
            '<div class="lp-badges">' +
              '<div class="lp-badge" style="--c:#e8832a"><div class="em">📅</div><div><b>Sejak 2015</b><span>Melayani pelanggan di Malang</span></div></div>' +
              '<div class="lp-badge" style="--c:#1f6fff"><div class="em">💰</div><div><b>Harga Murah</b><span>Terjangkau untuk semua kalangan</span></div></div>' +
              '<div class="lp-badge" style="--c:#1f9a5f"><div class="em">😊</div><div><b>Pelayanan Ramah</b><span>Nyaman dan tidak ribet</span></div></div>' +
            '</div>' +
          '</div>' +
        '</section>' +
        '<section class="lp-wrap" id="produk">' +
          '<h3 class="lp-title">Produk Kami</h3>' +
          '<div class="lp-products">' + productHtml + '</div>' +
        '</section>' +
        '<section class="lp-wrap" id="kontak">' +
          '<h3 class="lp-title">Kontak &amp; Lokasi</h3>' +
          '<div class="lp-contact">' +
            '<div class="lp-card lp-info">' +
              '<div class="lp-row"><div class="ic">💬</div><div><small>WhatsApp</small>0877-8041-5794</div></div>' +
              '<div class="lp-row"><div class="ic">🕔</div><div><small>Jam Buka</small>05.30 – 12.00 WIB</div></div>' +
              '<div class="lp-row"><div class="ic">📍</div><div><small>Alamat</small>' + address + '</div></div>' +
              '<div class="lp-actions">' +
                '<a class="lp-btn lp-btn-wa" href="' + waLink + '" target="_blank" rel="noopener">💬 Chat WhatsApp</a>' +
                '<a class="lp-btn lp-btn-map" href="' + mapsLink + '" target="_blank" rel="noopener">🗺️ Buka di Maps</a>' +
              '</div>' +
            '</div>' +
            '<div class="lp-map"><iframe src="' + embedSrc + '" loading="lazy" allowfullscreen referrerpolicy="no-referrer-when-downgrade" title="Lokasi Toko Enny Plastik"></iframe></div>' +
          '</div>' +
        '</section>' +
        '<a class="lp-float" href="' + waLink + '" target="_blank" rel="noopener">💬 Chat WhatsApp</a>';
      host.insertAdjacentHTML('beforeend', html);
      console.log('LANDING: bagian info berhasil dibuat');
    } catch (e) {
      console.error('LANDING error:', e);
    }
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', buildLanding);
  } else {
    buildLanding();
  }
})();
/* <<< LANDING-INFO-JS-END */
/* >>> DASH-CHART-JS-START ==== Grafik penjualan dashboard (hanya body.home-index) ====
   Untuk mengganti nanti: hapus dari DASH-CHART-JS-START sampai DASH-CHART-JS-END. */
$(function () {
  if (!document.body.classList.contains('home-index')) return;
  if (document.querySelector('.hd-chart')) return;
  dashLoad(function (D) {
    var chartTitle = 'Penjualan 7 Hari Terakhir';
    var chartNote  = D.note;
    var labels = D.labels;
    var values = D.penjualan;
    function rp(n) { return 'Rp ' + Math.round(n).toLocaleString('id-ID'); }
    function short(n) {
      if (n === 0) return '0';
      return n >= 1000000 ? (n / 1000000).toFixed(1).replace('.', ',') + ' jt' : Math.round(n / 1000) + ' rb';
    }
    function niceStep(x) {
      var m = Math.pow(10, Math.floor(Math.log(x) / Math.LN10));
      var n = x / m;
      return (n <= 1 ? 1 : n <= 2 ? 2 : n <= 2.5 ? 2.5 : n <= 5 ? 5 : 10) * m;
    }
    var total = values.reduce(function (a, b) { return a + b; }, 0);
    var avg   = total / values.length;
    var maxV  = Math.max.apply(null, values);
    var maxI  = values.indexOf(maxV);
    if (maxV <= 0) maxV = 1;
    var W = 700, H = 300, padL = 58, padR = 16, padT = 28, padB = 38;
    var innerW = W - padL - padR, innerH = H - padT - padB;
    var step = niceStep(maxV / 4), axisMax = step * 4;
    var svg = '<svg class="hd-chart-svg" viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="' + chartTitle + '">' +
      '<defs>' +
        '<linearGradient id="hdGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f5a649"/><stop offset="1" stop-color="#e8832a"/></linearGradient>' +
        '<linearGradient id="hdGradMax" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3a8bff"/><stop offset="1" stop-color="#14305a"/></linearGradient>' +
      '</defs>';
    for (var i = 0; i <= 4; i++) {
      var gy = padT + innerH - (i / 4) * innerH;
      svg += '<line x1="' + padL + '" y1="' + gy + '" x2="' + (W - padR) + '" y2="' + gy + '" stroke="#e3e9f2" stroke-width="1"' + (i ? ' stroke-dasharray="4 4"' : '') + '/>' +
             '<text x="' + (padL - 10) + '" y="' + (gy + 4) + '" text-anchor="end" font-size="12" font-weight="700" fill="#6c7c93">' + short(step * i) + '</text>';
    }
    var bw = innerW / values.length, barW = bw * 0.56;
    values.forEach(function (v, idx) {
      var h = (v / axisMax) * innerH;
      var x = padL + idx * bw + (bw - barW) / 2;
      var y = padT + innerH - h;
      svg += '<rect class="bar" x="' + x + '" y="' + y + '" width="' + barW + '" height="' + Math.max(h, 0) + '" rx="8" fill="url(#' + (idx === maxI ? 'hdGradMax' : 'hdGrad') + ')">' +
               '<title>' + labels[idx] + ': ' + rp(v) + '</title></rect>' +
             '<text x="' + (x + barW / 2) + '" y="' + (y - 8) + '" text-anchor="middle" font-size="12" font-weight="800" fill="#14305a">' + short(v) + '</text>' +
             '<text x="' + (x + barW / 2) + '" y="' + (H - padB + 22) + '" text-anchor="middle" font-size="13" font-weight="700" fill="#4f6178">' + labels[idx] + '</text>';
    });
    svg += '</svg>';
    var html =
      '<div class="hd-section hd-chart">' +
        '<h2 class="hd-title">Grafik Penjualan</h2>' +
        '<div class="hd-chart-card">' +
          '<div class="hd-chart-head"><h5>' + chartTitle + '</h5><span class="hd-chart-note">' + chartNote + '</span></div>' +
          '<div class="hd-stats">' +
            '<div class="hd-stat" style="--c:#e8832a"><small>Total penjualan</small><b>' + rp(total) + '</b></div>' +
            '<div class="hd-stat" style="--c:#1f6fff"><small>Rata-rata per hari</small><b>' + rp(avg) + '</b></div>' +
            '<div class="hd-stat" style="--c:#1f9a5f"><small>Hari tertinggi</small><b>' + labels[maxI] + ' · ' + rp(values[maxI]) + '</b></div>' +
          '</div>' +
          svg +
        '</div>' +
      '</div>';
    var first = document.querySelector('.hd-section');
    if (first) {
      first.insertAdjacentHTML('afterend', html);
    } else {
      var host = document.getElementById('page-content');
      if (host) host.insertAdjacentHTML('beforeend', html);
    }
  });
});
/* <<< DASH-CHART-JS-END */
/* >>> DASH-WELCOME-JS-START ==== Banner welcome + grafik laba rugi (hanya body.home-index) ====
   Untuk mengganti nanti: hapus dari DASH-WELCOME-JS-START sampai DASH-WELCOME-JS-END. */
$(function () {
  if (!document.body.classList.contains('home-index')) return;
  if (document.querySelector('.hd-welcome')) return;
  dashLoad(function (D) {
    var labels      = D.labels;
    var penjualan   = D.penjualan;
    var pengeluaran = D.modal;
    var dataNote    = D.note;
    function rp(n) { return (n < 0 ? '-' : '') + 'Rp ' + Math.round(Math.abs(n)).toLocaleString('id-ID'); }
    function short(n) {
      var s = n < 0 ? '-' : '';
      n = Math.abs(n);
      if (n === 0) return '0';
      return s + (n >= 1000000 ? (n / 1000000).toFixed(1).replace('.', ',') + ' jt' : Math.round(n / 1000) + ' rb');
    }
    function niceStep(x) {
      var m = Math.pow(10, Math.floor(Math.log(x) / Math.LN10));
      var n = x / m;
      return (n <= 1 ? 1 : n <= 2 ? 2 : n <= 2.5 ? 2.5 : n <= 5 ? 5 : 10) * m;
    }
    var last = penjualan.length - 1;
    var todayIncome = penjualan[last];
    var todayExpense = pengeluaran[last];
    var todayProfit = todayIncome - todayExpense;
    /* nama pengguna dari sidebar ("Hi Kasir !") */
    var who = 'Kasir';
    var nameEl = document.querySelector('#topbar .navbar-nav.ml-auto .nav-link span:not(.avatar-icon)');
    if (nameEl) {
      var m = nameEl.textContent.match(/Hi\s+(.+?)\s*!/i);
      if (m) who = m[1];
    }
    /* ---------- Banner Welcome ---------- */
    var welcome =
      '<div class="hd-welcome">' +
        '<span class="hw-float">🛍️</span><span class="hw-float">🪙</span><span class="hw-float">📦</span><span class="hw-float">✨</span>' +
        '<div class="hw-left">' +
          '<h2><span class="hw-greet">Selamat datang</span>, ' + who + '! <span class="hw-wave">👋</span></h2>' +
          '<div class="hw-meta">' +
            '<span class="hw-pill">📅 <span class="hw-date"></span></span>' +
            '<span class="hw-pill">🕒 <span class="hw-h">00</span><span class="hw-colon">:</span><span class="hw-mi">00</span><span class="hw-colon">:</span><span class="hw-s">00</span> WIB</span>' +
          '</div>' +
        '</div>' +
        '<div class="hw-right">' +
          '<div class="hw-mascot">🛍️</div>' +
          '<div class="hw-income"><small>Penghasilan hari ini</small><b class="hw-money">Rp 0</b></div>' +
        '</div>' +
      '</div>';
    var first = document.querySelector('.hd-section');
    if (first) first.insertAdjacentHTML('beforebegin', welcome);
    else $('#page-content').append(welcome);
    /* jam, tanggal, dan sapaan */
    var hari = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    var bulan = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
    function two(n) { return (n < 10 ? '0' : '') + n; }
    function tick() {
      var d = new Date();
      var h = d.getHours();
      var sapa = h < 11 ? 'Selamat pagi' : h < 15 ? 'Selamat siang' : h < 18 ? 'Selamat sore' : 'Selamat malam';
      var q = function (c) { return document.querySelector('.hd-welcome ' + c); };
      if (!q('.hw-s')) return;
      q('.hw-greet').textContent = sapa;
      q('.hw-date').textContent = hari[d.getDay()] + ', ' + d.getDate() + ' ' + bulan[d.getMonth()] + ' ' + d.getFullYear();
      q('.hw-h').textContent = two(h);
      q('.hw-mi').textContent = two(d.getMinutes());
      q('.hw-s').textContent = two(d.getSeconds());
    }
    tick();
    setInterval(tick, 1000);
    /* angka penghasilan naik dari 0 */
    (function countUp() {
      var el = document.querySelector('.hw-money');
      if (!el) return;
      var t0 = null, dur = 1300;
      function frame(t) {
        if (t0 === null) t0 = t;
        var p = Math.min((t - t0) / dur, 1);
        var e = 1 - Math.pow(1 - p, 3);
        el.textContent = rp(todayIncome * e);
        if (p < 1) requestAnimationFrame(frame);
      }
      requestAnimationFrame(frame);
    })();
    /* ---------- Grafik Laba Rugi (khusus admin) ---------- */
    var isAdmin = !!document.querySelector('#topbar a[href*="purchases"], #topbar a[href*="expenses"]');
    if (!isAdmin) return;
    var laba = penjualan.map(function (v, i) { return v - pengeluaran[i]; });
    var hi = Math.max.apply(null, penjualan.concat(pengeluaran));
    var lo = Math.min.apply(null, laba.concat([0]));
    if (hi <= 0) hi = 1;
    var step = niceStep((hi - lo) / 4);
    var axisMax = Math.ceil(hi / step) * step;
    var axisMin = Math.floor(lo / step) * step;
    var range = axisMax - axisMin;
    var W = 700, H = 320, padL = 58, padR = 16, padT = 30, padB = 38;
    var innerW = W - padL - padR, innerH = H - padT - padB;
    function Y(v) { return padT + innerH * (1 - (v - axisMin) / range); }
    var svg = '<svg class="hd-chart-svg" viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="Grafik laba rugi">';
    for (var t = axisMin; t <= axisMax + step / 1000; t += step) {
      var gy = Y(t);
      svg += '<line x1="' + padL + '" y1="' + gy + '" x2="' + (W - padR) + '" y2="' + gy + '" stroke="' + (Math.abs(t) < step / 1000 ? '#9fb0c8' : '#e3e9f2') + '" stroke-width="1"' + (Math.abs(t) < step / 1000 ? '' : ' stroke-dasharray="4 4"') + '/>' +
             '<text x="' + (padL - 10) + '" y="' + (gy + 4) + '" text-anchor="end" font-size="12" font-weight="700" fill="#6c7c93">' + short(t) + '</text>';
    }
    var n = penjualan.length, bw = innerW / n, barW = bw * 0.26, gap = 4;
    var y0 = Y(0);
    function bar(x, v, color, delay) {
      var yv = Y(v), top = Math.min(y0, yv), h = Math.abs(y0 - yv);
      return '<rect class="hl-bar' + (v < 0 ? ' neg' : '') + '" style="animation-delay:' + delay + 's" x="' + x + '" y="' + top + '" width="' + barW + '" height="' + h + '" rx="6" fill="' + color + '"><title>' + rp(v) + '</title></rect>';
    }
    var pts = [];
    for (var i = 0; i < n; i++) {
      var x1 = padL + i * bw + (bw - 2 * barW - gap) / 2;
      var x2 = x1 + barW + gap;
      svg += bar(x1, penjualan[i], '#1f6fff', i * 0.08) + bar(x2, pengeluaran[i], '#e8832a', i * 0.08 + 0.04);
      svg += '<text x="' + (padL + i * bw + bw / 2) + '" y="' + (H - padB + 22) + '" text-anchor="middle" font-size="13" font-weight="' + (i === last ? 900 : 700) + '" fill="' + (i === last ? '#e8832a' : '#4f6178') + '">' + labels[i] + '</text>';
      pts.push([padL + i * bw + bw / 2, Y(laba[i])]);
    }
    svg += '<path class="hl-line" pathLength="1" d="M' + pts.map(function (p) { return p[0] + ' ' + p[1]; }).join(' L') + '" fill="none" stroke="#1f9a5f" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>';
    pts.forEach(function (p, idx) {
      svg += '<circle class="hl-dot" style="animation-delay:' + (0.6 + idx * 0.15) + 's" cx="' + p[0] + '" cy="' + p[1] + '" r="5.5" fill="#fff" stroke="' + (laba[idx] >= 0 ? '#1f9a5f' : '#e5484d') + '" stroke-width="3"><title>' + labels[idx] + ' – ' + (laba[idx] >= 0 ? 'Laba ' : 'Rugi ') + rp(Math.abs(laba[idx])) + '</title></circle>';
    });
    svg += '</svg>';
    var up = todayProfit >= 0;
    var html =
      '<div class="hd-section hd-laba">' +
        '<h2 class="hd-title">Grafik Laba Rugi</h2>' +
        '<div class="hd-chart-card">' +
          '<div class="hd-chart-head"><h5>Penjualan, Modal Barang &amp; Laba Kotor 7 Hari Terakhir</h5><span class="hd-chart-note">' + dataNote + '</span></div>' +
          '<div class="hd-stats">' +
            '<div class="hd-stat" style="--c:#1f6fff"><small>Penghasilan hari ini</small><b>' + rp(todayIncome) + '</b></div>' +
            '<div class="hd-stat" style="--c:#e8832a"><small>Modal barang hari ini</small><b>' + rp(todayExpense) + '</b></div>' +
            '<div class="hd-stat" style="--c:' + (up ? '#1f9a5f' : '#e5484d') + '"><small>' + (up ? 'Laba hari ini' : 'Rugi hari ini') + '</small><b class="' + (up ? 'up' : 'down') + '">' + rp(Math.abs(todayProfit)) + '</b><span class="em">' + (up ? '🤑' : '😢') + '</span></div>' +
          '</div>' +
          '<div class="hl-legend">' +
            '<span style="--c:#1f6fff"><i></i>Penjualan</span>' +
            '<span style="--c:#e8832a"><i></i>Modal Barang</span>' +
            '<span style="--c:#1f9a5f"><i class="line"></i>Laba / Rugi</span>' +
          '</div>' +
          svg +
        '</div>' +
      '</div>';
    var chart = document.querySelector('.hd-chart');
    if (chart) chart.insertAdjacentHTML('afterend', html);
    else $('#page-content').append(html);
  });
});
/* <<< DASH-WELCOME-JS-END */
/* >>> STOK-JS-START ==== Pengingat stok (hijau/kuning/merah) di tabel barang ====
   Untuk mengganti nanti: hapus dari STOK-JS-START sampai STOK-JS-END. */
(function () {
  var BATAS_HAMPIR = 1.5;   // kuning kalau stok <= stok minimum x 1,5 (ubah angka ini kalau mau)
  var logged = false;
  function num(t) { return parseFloat(String(t || '').replace(/[^0-9.\-]/g, '')); }
  function paint() {
    var found = 0, firstCell = null;
    [].forEach.call(document.querySelectorAll('tr'), function (tr) {
      var a = tr.querySelector('td.td-stok'), b = tr.querySelector('td.td-stok_minimum');
      if (!a || !b) return;
      var st = num(a.textContent), mn = num(b.textContent);
      if (isNaN(st) || isNaN(mn)) return;
      var cls, tip;
      if (st < mn)                      { cls = 'stok-kurang'; tip = 'Stok kurang dari minimum, segera restok'; }
      else if (st <= mn * BATAS_HAMPIR) { cls = 'stok-hampir'; tip = 'Stok mendekati minimum'; }
      else                              { cls = 'stok-aman';   tip = 'Stok aman'; }
      var el = a.querySelector('span, a');
      if (!el) {
        el = document.createElement('span');
        while (a.firstChild) el.appendChild(a.firstChild);
        a.appendChild(el);
      }
      el.classList.remove('stok-aman', 'stok-hampir', 'stok-kurang');
      el.classList.add('stok-badge', cls);
      el.title = tip;
      found++;
      if (!firstCell) firstCell = a;
    });
    /* keterangan warna di atas tabel (sekali saja) */
    if (firstCell) {
      var tbl = firstCell.closest('table');
      var holder = tbl && tbl.parentNode;
      if (holder && !holder.querySelector('.stok-legend')) {
        var lg = document.createElement('div');
        lg.className = 'stok-legend';
        lg.innerHTML = '<span>✅ Aman</span><span>⚠️ Mendekati stok minimum</span><span>🚨 Kurang dari stok minimum, segera restok</span>';
        holder.insertBefore(lg, tbl);
      }
    }
    if (!logged) { console.log('STOK: ' + found + ' baris diberi warna'); logged = true; }
  }
  function start() {
    paint();
    var timer = null;
    var host = document.getElementById('page-content') || document.body;
    new MutationObserver(function () { clearTimeout(timer); timer = setTimeout(paint, 120); })
      .observe(host, { childList: true, subtree: true, characterData: true });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();
/* <<< STOK-JS-END */
/* >>> NAMA-JS-START ==== Dropdown & kolom relasi tampil nama, bukan ID (semua tabel) ====
   Untuk mengganti nanti: hapus dari NAMA-JS-START sampai NAMA-JS-END. */
(function () {
  var base = (typeof siteAddr !== 'undefined') ? siteAddr : '/';
  var cache = {};   // nama halaman -> Promise({id: nama})
  function controllerOf(field) {            // 'id_category' -> 'categories', 'id_product' -> 'products'
    var n = String(field).replace(/^id_/, '');
    return n === 'category' ? 'categories' : n + 's';
  }
  function currentController() {
    return location.href.replace(base, '').split(/[\/?#]/)[0].toLowerCase();
  }
  function loadMap(ctrl) {
    if (!cache[ctrl]) {
      cache[ctrl] = fetch(base + ctrl + '?limit=500', { credentials: 'same-origin' })
        .then(function (r) { if (!r.ok) throw 0; return r.text(); })
        .then(function (html) {
          var map = {};
          var doc = new DOMParser().parseFromString(html, 'text/html');
          [].forEach.call(doc.querySelectorAll('tbody tr'), function (tr) {
            var id = null, cb = tr.querySelector('input.optioncheck');
            if (cb) id = cb.value;
            if (!id) {
              var a = tr.querySelector('a[href*="/view/"], a[href*="/edit/"]');
              var m = a && a.getAttribute('href').match(/\/(?:view|edit)\/(\d+)/);
              if (m) id = m[1];
            }
            if (!id) return;
            var cell = null;
            [].some.call(tr.querySelectorAll('td'), function (td) {
              if (/(^|\s)td-(nama|name|username|judul|title)/.test(td.className)) { cell = td; return true; }
              return false;
            });
            if (!cell) cell = tr.querySelector('td');
            if (!cell) return;
            var el = cell.querySelector('[data-value]');
            var name = (el ? el.getAttribute('data-value') : cell.textContent).replace(/\s+/g, ' ').trim();
            if (name) map[id] = name;
          });
          return map;
        })
        .catch(function () { return {}; });
    }
    return cache[ctrl];
  }
  function apply() {
    var cur = currentController();
    /* 1) dropdown di form */
    [].forEach.call(document.querySelectorAll('select[name^="id_"]'), function (sel) {
      var ctrl = controllerOf(sel.name);
      if (ctrl === cur) return;
      loadMap(ctrl).then(function (map) {
        [].forEach.call(sel.options, function (o) {
          if (o.value && map[o.value] && o.textContent !== map[o.value]) o.textContent = map[o.value];
        });
      });
    });
    /* 2) kolom tabel yang masih berisi angka ID polos */
    [].forEach.call(document.querySelectorAll('table td[class*="td-id_"]'), function (td) {
      if (td.getAttribute('data-nama-done')) return;
      var m = td.className.match(/td-(id_[a-z0-9_]+)/);
      if (!m) return;
      var ctrl = controllerOf(m[1]);
      if (ctrl === cur) return;
      var txt = td.textContent.trim();
      if (!/^\d+$/.test(txt) || td.children.length) return;
      td.setAttribute('data-nama-done', '1');
      loadMap(ctrl).then(function (map) { if (map[txt]) td.textContent = map[txt]; });
    });
  }
  var timer = null;
  function later() { clearTimeout(timer); timer = setTimeout(apply, 150); }
  function start() {
    apply();
    new MutationObserver(later).observe(document.body, { childList: true, subtree: true });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();
/* <<< NAMA-JS-END */
/* >>> CARI-JS-START ==== Dropdown relasi bisa diketik/dicari (Id Product, Id User, dll) ====
   Untuk mengganti nanti: hapus dari CARI-JS-START sampai CARI-JS-END. */
(function () {
  var uid = 0;
  function build(sel) {
    if (sel.getAttribute('data-cari') || sel.multiple) return;
    sel.setAttribute('data-cari', '1');
    var listId = 'cari-list-' + (++uid);
    var inp = document.createElement('input');
    inp.type = 'text';
    inp.className = 'form-control cari-input';
    inp.placeholder = '🔍 Ketik untuk mencari...';
    inp.setAttribute('autocomplete', 'off');
    inp.setAttribute('list', listId);
    var dl = document.createElement('datalist');
    dl.id = listId;
    sel.parentNode.classList.add('cari-wrap');
    sel.parentNode.insertBefore(inp, sel);
    sel.parentNode.insertBefore(dl, sel);
    sel.classList.add('cari-hidden');
    sel.tabIndex = -1;
    function labelOf() {
      var o = sel.options[sel.selectedIndex];
      return (o && o.value) ? o.textContent.trim() : '';
    }
    function fillList() {
      dl.innerHTML = '';
      [].forEach.call(sel.options, function (o) {
        if (!o.value) return;
        var x = document.createElement('option');
        x.value = o.textContent.trim();
        dl.appendChild(x);
      });
    }
    function showCurrent() { inp.value = labelOf(); }
    function pick() {
      var v = inp.value.trim().toLowerCase(), found = null, partial = [];
      if (!v) return;
      [].forEach.call(sel.options, function (o) {
        if (!o.value) return;
        var t = o.textContent.trim().toLowerCase();
        if (t === v) found = o;
        else if (t.indexOf(v) > -1) partial.push(o);
      });
      if (!found && partial.length === 1) found = partial[0];
      if (found) {
        if (sel.value !== found.value) {
          sel.value = found.value;
          sel.dispatchEvent(new Event('change', { bubbles: true }));
        }
        inp.classList.remove('is-invalid');
      }
    }
    inp.addEventListener('focus', function () { fillList(); inp.value = ''; });   /* kosongkan supaya semua pilihan muncul */
    inp.addEventListener('input', pick);
    inp.addEventListener('change', pick);
    inp.addEventListener('blur', function () { pick(); showCurrent(); });
    inp.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') { e.preventDefault(); pick(); }
    });
    sel.addEventListener('invalid', function () { inp.classList.add('is-invalid'); });
    /* kalau nama di dropdown berubah (mis. ID diganti nama), tampilan ikut diperbarui */
    new MutationObserver(function () {
      fillList();
      if (document.activeElement !== inp) showCurrent();
    }).observe(sel, { childList: true, subtree: true, characterData: true });
    fillList();
    showCurrent();
  }
  function scan() {
    [].forEach.call(document.querySelectorAll('select[name^="id_"]'), build);
  }
  var timer = null;
  function later() { clearTimeout(timer); timer = setTimeout(scan, 150); }
  function start() {
    scan();
    new MutationObserver(later).observe(document.body, { childList: true, subtree: true });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();
/* <<< CARI-JS-END */
/* >>> RESTOK-JS-START ==== Daftar barang yang perlu distok di dashboard (hanya body.home-index) ====
   Untuk mengganti nanti: hapus dari RESTOK-JS-START sampai RESTOK-JS-END. */
$(function () {
  if (!document.body.classList.contains('home-index')) return;
  if (document.querySelector('.hd-restok')) return;
  var BATAS_HAMPIR = 1.5;   // kuning kalau stok <= stok minimum x 1,5 (sama dengan warna di halaman Products)
  var base = (typeof siteAddr !== 'undefined') ? siteAddr : '/';
  var isAdmin = !!document.querySelector('#topbar a[href*="purchases"], #topbar a[href*="expenses"]');
  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
  function val(td) {
    if (!td) return '';
    var e = td.querySelector('[data-value]');
    return (e ? e.getAttribute('data-value') : td.textContent).replace(/\s+/g, ' ').trim();
  }
  function num(t) {
    var n = parseFloat(String(t).replace(',', '.').replace(/[^0-9.\-]/g, ''));
    return isNaN(n) ? null : n;
  }
  function fmt(n) { return String(Math.round(n * 100) / 100).replace('.', ','); }
  function render(items, note) {
    var kurang = items.filter(function (x) { return x.status === 'red'; });
    var hampir = items.filter(function (x) { return x.status === 'yellow'; });
    var body;
    if (note) {
      body = '<p class="hr-note">' + esc(note) + '</p>';
    } else if (!items.length) {
      body = '<div class="hr-empty"><div class="big">🎉</div><h5>Semua stok aman</h5><p>Belum ada barang yang perlu dibeli saat ini.</p></div>';
    } else {
      body = '<div class="hr-grid">' + items.map(function (x) {
        return '<div class="hr-item ' + x.status + '">' +
          '<div class="hr-top"><div><h5 class="hr-name">' + esc(x.nama) + '</h5>' +
            '<span class="hr-code">' + (x.kode ? 'Kode ' + esc(x.kode) : '') + '</span></div>' +
            '<div class="hr-emoji">' + (x.status === 'red' ? '🚨' : '⚠️') + '</div></div>' +
          '<div class="hr-nums"><b>' + fmt(x.stok) + '</b><span>stok · minimum ' + fmt(x.min) + ' ' + esc(x.satuan) + '</span></div>' +
          '<span class="hr-tag">' + (x.status === 'red' ? 'Kurang ' + fmt(x.min - x.stok) + ' ' + esc(x.satuan) : 'Mendekati minimum') + '</span>' +
          (x.kategori ? '<span class="hr-cat">' + esc(x.kategori) + '</span>' : '') +
        '</div>';
      }).join('') + '</div>';
    }
    var html =
      '<div class="hd-section hd-restok">' +
        '<h2 class="hd-title">Barang yang Perlu Distok</h2>' +
        '<div class="hr-card">' +
          '<div class="hr-head">' +
            '<div class="hr-sum">' +
              '<span class="hr-pill red">🚨 ' + kurang.length + ' barang kurang dari minimum</span>' +
              '<span class="hr-pill yellow">⚠️ ' + hampir.length + ' mendekati minimum</span>' +
            '</div>' +
            '<div class="hr-actions">' +
              (isAdmin ? '<a class="hr-btn main" href="' + base + 'purchases/add">📥 Catat Stok Masuk</a>' : '') +
              '<a class="hr-btn soft" href="' + base + 'products">Lihat Data Barang →</a>' +
            '</div>' +
          '</div>' +
          body +
        '</div>' +
      '</div>';
    var panduan = null;
    [].forEach.call(document.querySelectorAll('.hd-section'), function (s) {
      if (s.querySelector('.hd-steps')) panduan = s;
    });
    if (panduan) panduan.insertAdjacentHTML('beforebegin', html);
    else $('#page-content').append(html);
  }
  fetch(base + 'products?limit=500', { credentials: 'same-origin' })
    .then(function (r) { if (!r.ok) throw 0; return r.text(); })
    .then(function (html) {
      var doc = new DOMParser().parseFromString(html, 'text/html');
      var items = [], rows = 0;
      [].forEach.call(doc.querySelectorAll('tbody tr'), function (tr) {
        var cs = tr.querySelector('td.td-stok'), cm = tr.querySelector('td.td-stok_minimum');
        if (!cs || !cm) return;
        rows++;
        var st = num(val(cs)), mn = num(val(cm));
        if (st === null || mn === null) return;
        var status = st < mn ? 'red' : (st <= mn * BATAS_HAMPIR ? 'yellow' : null);
        if (!status) return;
        items.push({
          status: status, stok: st, min: mn,
          nama: val(tr.querySelector('td.td-nama_barang')) || '(tanpa nama)',
          kode: val(tr.querySelector('td.td-kode_barang')),
          satuan: val(tr.querySelector('td.td-satuan')),
          kategori: val(tr.querySelector('td.td-id_category'))
        });
      });
      /* yang paling kurang di atas */
      items.sort(function (a, b) {
        if (a.status !== b.status) return a.status === 'red' ? -1 : 1;
        return (a.stok - a.min) - (b.stok - b.min);
      });
      render(items, rows ? '' : 'Data barang belum terbaca dari halaman Data Barang.');
    })
    .catch(function () { render([], 'Data barang belum bisa dimuat dari halaman Data Barang.'); });
});
/* <<< RESTOK-JS-END */
/* >>> LOGO-JS-START ==== Ganti logo P jadi kantong plastik beranimasi ====
   Untuk mengganti nanti: hapus dari LOGO-JS-START sampai LOGO-JS-END. */
(function () {
  var svg =
    '<span class="tp-logo" aria-hidden="true">' +
    '<svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">' +
      '<defs>' +
        '<linearGradient id="tpG" x1="0" y1="0" x2="0" y2="1">' +
          '<stop offset="0" stop-color="#ffc067"/><stop offset="1" stop-color="#e8832a"/>' +
        '</linearGradient>' +
        '<clipPath id="tpClip"><path d="M10 15H38L42 43Q42.3 46 39.5 46H8.5Q5.7 46 6 43Z"/></clipPath>' +
      '</defs>' +
      '<g class="tp-bag">' +
        /* pegangan kresek */
        '<path d="M15 16C14 5 22 5 22 16" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round"/>' +
        '<path d="M26 16C26 5 34 5 33 16" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round"/>' +
        /* badan kantong */
        '<g class="tp-body">' +
          '<path d="M10 15H38L42 43Q42.3 46 39.5 46H8.5Q5.7 46 6 43Z" fill="url(#tpG)"/>' +
          '<path d="M14 22L13 40M24 20V42M34 22L35 40" stroke="#fff" stroke-opacity=".28" stroke-width="1.6" stroke-linecap="round" fill="none"/>' +
          '<g clip-path="url(#tpClip)"><rect class="tp-shine" x="0" y="8" width="9" height="42" fill="#fff" fill-opacity=".55"/></g>' +
        '</g>' +
      '</g>' +
      /* bintang berkedip */
      '<path class="tp-star" d="M42 6l1.4 3.2L46.6 10.6 43.4 12 42 15.2 40.6 12 37.4 10.6 40.6 9.2z" fill="#fff"/>' +
      '<path class="tp-star s2" d="M5 22l1 2.3L8.3 25.3 6 26.3 5 28.6 4 26.3 1.7 25.3 4 24.3z" fill="#ffd9a3"/>' +
    '</svg></span>';
  function swap() {
    var img = document.querySelector('#topbar .navbar-brand img');
    if (!img || document.querySelector('.tp-logo')) return;
    img.insertAdjacentHTML('beforebegin', svg);
    img.style.display = 'none';
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', swap);
  else swap();
})();
/* <<< LOGO-JS-END */