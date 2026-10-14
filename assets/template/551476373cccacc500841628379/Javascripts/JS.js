function loaded(){
	$('form').attr('autocomplete','off');
	$('input').attr('autocomplete','off');
	$('input').attr('autocapitalize','none');
	if(document.getElementById('is-screen-protector')){
		is_hide('is-screen-protector');
	}
	/*
	if(top.location.href!=self.location.href){
		top.location.href=self.location.href;
	}
	*/
}

function getOffset(el){
	var _x=0;
	var _y=0;
	while(el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)){
		_x+=el.offsetLeft-el.scrollLeft;
		_y+=el.offsetTop-el.scrollTop;
		el=el.offsetParent;
	}
	return {top:_y,left:_x};
}

function dropMenu(){
	var position=0;
	if(document.getElementById('is-menu')){
		if(document.getElementById('is-header')){
			position=position+document.getElementById('is-header').offsetHeight;
			if(position==0){
				var logo=document.getElementById('is-menu-logo');
				if(logo){
					logo.style.cssText+=';display:block !important;';
				}
			}
		}else{
			var logo=document.getElementById('is-menu-logo');
			if(logo){
				logo.style.cssText+=';display:block !important;';
			}
		}
		if(document.getElementById('is-admin')){
			position=position+document.getElementById('is-admin').offsetHeight;
		}
		var scroll=window.pageYOffset;
		var e=document.getElementById("is-menu");
		if(scroll>=position){
			e.className="is-menu is-menu-snap";
			document.getElementById('is-middle').style.paddingTop=e.offsetHeight+'px';
		}else if(scroll<position){
			e.className="is-menu";
			document.getElementById('is-middle').style.paddingTop='0px';
		}
	}
}

function toggleMenu(){	
	is_toggle('is-menu-mobile');
	setTimeout(function(){
		dropMenu();
	},1000);
}

$(document).ready(function(){
	loaded();
	dropMenu();
	var options={
		animateThreshold:100,
		scrollPollInterval:20
	}
	$('.aniview').AniView(options);
});

window.onscroll=function(oEvent){
	dropMenu();
}

window.onresize=function(){
	dropMenu();
}

function backgroundSequence(){
	window.clearTimeout();
	var bgImageContainer=document.getElementById("video");
	var k=0;
	if(bgImageArray.length==1){
		bgImageContainer.style.backgroundImage="url("+bgImageArray[0]+")";
	}else{
		if(bgImageContainer.style.backgroundPositionY=="0%"){
			bgImageContainer.style.backgroundPositionY="100%";
		}else{
			bgImageContainer.style.backgroundPositionY="0%";
		}
		for(i=0;i<bgImageArray.length;i++){
			if(bgImageContainer.style.backgroundPositionY=="0%"){
				bgImageContainer.style.backgroundPositionY="100%";
			}else{
				bgImageContainer.style.backgroundPositionY="0%";
			}
			setTimeout(function(){
				bgImageContainer.style.backgroundImage="url("+bgImageArray[k]+")";
				if(bgImageContainer.style.backgroundPositionY=="0%"){
					bgImageContainer.style.backgroundPositionY="100%";
				}else{
					bgImageContainer.style.backgroundPositionY="0%";
				}
				if((k+1)===bgImageArray.length){
					setTimeout(function(){
						backgroundSequence()
					},(secs*1000))
				}else{
					k++;
				}
			},(secs*1000)*i)
		}
	}
}












document.addEventListener('contextmenu', function(event) {
    event.preventDefault();
});

document.addEventListener('copy', function(event) {
    event.preventDefault();
});

function is_toggle_all(cb,Form,InputName,Type){
		var val = cb.checked;
		var FormName = Form.name;
		var frm = document.forms[FormName];
		var len = frm.elements.length;
		var i=0;
		for( i=0 ; i<len ; i++){
			if(Type=='id'){
				if (frm.elements[i].id==InputName){
					frm.elements[i].checked=val;
				}
			}else{
				if (frm.elements[i].name==InputName){
					frm.elements[i].checked=val;
				}
			}
		}
	}

	function is_print_content(id){
		is_print_document(document.getElementById(id).innerHTML);
	}

	function is_reload_src(id){
		var obj = document.getElementById(id);
		var src = obj.src;
		var date = new Date();
		obj.src = src + '?v=' + date.getTime();
		return false;
	}

	function is_change_src(id,url){
		var obj = document.getElementById(id);
		var src = obj.src;
		var pos = src.indexOf('?');
		if (pos >= 0){
			src = src.substr(0, pos);
		}
		var date = new Date();
		obj.src = url + '?v=' + date.getTime();
		return false;
	}

	function is_file_uploader(PHP_Script,element,param,preview,Call_Function){
		var uploader = new qq.FileUploader({
			element: document.getElementById(element),
			action: PHP_Script,
			debug: false,
			params: {
				Param: param
			},
			onComplete: function(id, fileName, responseJSON){
				if(preview!="" && preview!=undefined){
					is_reload_src(preview);
				}
				if(Call_Function!="" && Call_Function!=undefined){
					setTimeout(function(){window[Call_Function]();},250);
				}
			}
		});
	}

	function is_change_class(ID,class_name){
		if(document.getElementById(ID)==null){
			$(ID).attr('class',class_name);
		}else{
			$("#"+ID).attr('class',class_name);
		}
	}

	function is_go_to(URL){
		window.location = URL;
	}

	function is_loader(toggle){
		if(toggle=='on' || toggle==1){
			is_change_text('is-loading-text','Please Wait');
			is_show('is-loading-screen');
		}else{
			is_hide('is-loading-screen');
		}
	}

	function is_ajax_call_post(Form,Method,Button,Result,Target,Progress_Bar,Processing_Message,Disable_Scroll,Disable_Loader,Call_Function,Silent){

		if(Disable_Loader!=1){
			is_loader(1);
		}

		if(Progress_Bar!=''){
			is_show(Progress_Bar);
		}

		if(Button!=''){
			var Button = document.getElementById(Button);
			var Button_Before = Button.value;
			Button.value = Processing_Message;
		}

		$.ajax({
			url: Target,
			type: "POST",
			data: $('#'+Form).serialize(),
			dataType: "html",
			timeout: 0,
			success: function(returnData){
				if(Silent!=1){
					if (document.getElementById(Result)==null){
						$(Result).html(returnData);
					}else{
						$('#'+Result).html(returnData);
					}
				}

				if(Progress_Bar!=''){
					is_hide(Progress_Bar);
				}

				if(Button!=''){
					Button.value = Button_Before;
				}

				if(Disable_Scroll!=true){
					setTimeout(function(){
						if(document.getElementById(Result)){
							is_scroll_to(Result);
						}
					}, 1000);
				}

				if(Disable_Loader!=1){
					is_loader(0);
				}

				if(Call_Function!="" && Call_Function!=undefined){
					setTimeout(function(){window[Call_Function]();},250);
				}
			},
			error: function(e){
				//alert('Couldn\'t request the page');
			}
		});
	}

	function is_ajax_call_get(Result,Target,Disable_Scroll,Disable_Loader,Call_Function,Silent){
		if(Disable_Loader!=1){
			is_loader(1);
		}

		$.ajax({
			url: Target,
			type: "get",
			dataType: "html",
			timeout: 0,
			success: function(returnData){
				if(Silent!=1){
					if (document.getElementById(Result)==null){
						$(Result).html(returnData);
					}else{
						$('#'+Result).html(returnData);
					}
				}

				if(Disable_Scroll!=true){
					setTimeout(function(){
						if(document.getElementById(Result)){
							is_scroll_to(Result);
						}
					}, 1000);
				}

				if(Disable_Loader!=1){
					is_loader(0);
				}

				if(Call_Function!="" && Call_Function!=undefined){
					setTimeout(function(){window[Call_Function]();},250);
				}
			},
			error: function(e){
				//alert('Couldn\'t request the page');
			}
		});
	}

	function is_scroll_to(Result){
		if (document.getElementById(Result)==null){
			$('html,body').animate({scrollTop: ($(Result).offset().top-150)},'slow');
		}else{
			$('html,body').animate({scrollTop: ($("#"+Result).offset().top-150)},'slow');
		}
	}

	function is_sign_out(){
		is_show('is-logout-screen');
	}

	function is_sign_in(){
		is_show('is-login-screen');
	}

	function is_admin(){

		document.getElementById('is-modal-title').innerHTML='Select Portal';
		is_ajax_call_get('is-modal-body','../../1/admin/Content/administration?page=239',1,0);
		is_modal_open();
	}

	function is_switch(){

		is_go_to('.');
	}

	function is_modal_open(class_name){
		if(class_name!=""){
			class_name=' '+class_name;
		}
		is_change_class('is-modal','is-modal'+class_name);
		is_show('is-modal');
	}

	function is_modal_close(){
		is_hide('is-modal');
		document.getElementById('is-modal-body').innerHTML='';
		is_change_class('is-modal','');
	}

	function is_show(Result){
		if (document.getElementById(Result)==null){
			$(Result).show();
		}else{
			$('#'+Result).show();
		}
	}

	function is_hide(Result){
		if (document.getElementById(Result)==null){
			$(Result).hide();
		}else{
			$('#'+Result).hide();
		}
	}

	function is_toggle(Result){
		if (document.getElementById(Result)==null){
			$(Result).fadeToggle('slow');
		}else{
			$('#'+Result).fadeToggle('slow');
		}
	}

	function is_toggle_accordion(toggle,content,type,disable_scroll){
		var menu=document.getElementById(content);
		if(menu.style.display=="none"){
			is_change_class(toggle,"is-title is-accordion-open");
			is_show(content);
		}else if(menu.style.display!="none"){
			is_change_class(toggle,"is-title");
			is_hide(content);
		}
		if(disable_scroll!=1){
			is_scroll_to(toggle);
		}
	}

	function is_change_text(Result,Text){
		if (document.getElementById(Result)==null){
			$(Result).html(Text);
		}else{
			$('#'+Result).html(Text);
		}
	}

	function is_get_cookie(name){
		const value = `; ${document.cookie}`;
		const parts = value.split(`; ${name}=`);
		if(parts.length===2){
			return parts.pop().split(';').shift();
		}else{
			return false;
		}
	}

	function is_expand_text(btn, contentid, expandedclass='is-tabs-vertical-body-expanded') {
		const content = document.getElementById(contentid);
		const isExpanded = content.classList.toggle(expandedclass);
		
		if (isExpanded) {
			btn.remove();
		}
	}
	
	document.addEventListener('touchstart', function () {}, false);