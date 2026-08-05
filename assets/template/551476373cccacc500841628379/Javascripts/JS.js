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

function is_expand_text(btn, contentid) {
  const content = document.getElementById(contentid);
  const isExpanded = content.classList.toggle('is-tabs-vertical-body-expanded');
  
  if (isExpanded) {
    btn.remove();
  }
}