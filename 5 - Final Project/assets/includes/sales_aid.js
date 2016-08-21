/*  JavaScript Document  */

var eventType = 'touchstart';
var isiPad = navigator.userAgent.indexOf('iPad') != -1;

/* IScroll */
var myScroll;
function loaded(){
	myScroll = new IScroll('#scroll',{checkDOMChanges:true});
}
document.addEventListener('DOMContentLoaded', loaded, false);
/* /IScroll */


$(document).ready(function(){

	checkDevice();
	setOrientationListener();
	window.setTimeout(startMap,2500);
		
	$('nav a').on(eventType, function(){
		var pageToLoad = $(this).attr('data-file');
		changePage(pageToLoad);
		$('nav a').removeClass('selected');
		$(this).addClass('selected');
	});
	
	$('nav a:nth-child(1)').trigger(eventType);
	
	$('.logo_gourmet').on(eventType, function(){
		$('nav a:nth-child(1)').trigger(eventType);
	});

});

function checkiPadStandAlone(){
	if(window.navigator.standalone == false){
		$('.page').css('display','none');
		$('body').css('background-color','#f7d9a1').append('<img src="assets/images/add_to_homescreen.png">');
	}
}

function checkDevice(){
	if(window.isiPad){
		checkiPadStandAlone();
	}else{
		$('.page').css('display','none');
		$('body').css('background-color','#f7d9a1').append('<a href="mailto:?subject=Check%20out%20this%20eSales%20Aid%20Web%20App%20for%20iPad&amp;body=Add%20this%20Web%20App%20to%20Your%20iPad%20by%20visiting:%20http://yoursite.com/ipad_web_app/"><img src="assets/images/non_ipad_message.png"></a>');
	}
}

function startMap(){
	var latlng = new google.maps.LatLng(39.952614, -75.163991); 
	var myOptions = {zoom: 16, center: latlng, mapTypeId: google.maps.MapTypeId.ROADMAP}; 
	var map = new google.maps.Map(document.getElementById('map_canvas'),myOptions); 
	var marker = new google.maps.Marker({
		position: latlng, 
		map: map,
		title:'Office Location'
	});
}


function changePage(fileName){
	$('.content_container').animate({opacity:0}, 500, function(){
		// check for home page
		if (fileName == 'home.html?v=1'){
			$('.page').addClass('home');
		}else{
			$('.page').removeClass('home');
		}
		// check for contact us
		if (fileName == 'contact_us.html?v=1'){
			$('.page').addClass('contact_us');
			$('.map_container').removeClass('off').addClass('on');
		}else{
			$('.page').removeClass('contact_us');
			$('.map_container').removeClass('on').addClass('off');
		}
		// load content
	    $('.content_loading_container').load('assets/content/'+fileName, function(){
			myScroll.refresh();
			$('.content_container').delay(250).animate({opacity:1}, 500);
		});	
	
	});
}



function setOrientationListener(){
	rotationInterval = setInterval( function(){ updateOrientation(); }, 500 );
}

function updateOrientation(){
	if($('body').width() < 1024){
		$('.page').removeClass('landscape').addClass('portrait');
	}else{
		$('.page').removeClass('portrait').addClass('landscape');	
	}
}

