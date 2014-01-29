var _ancho;
var _alto;
var _margenTop=265;
var _agregado=60;
var _scrollsTime;
var myScrollColumna1;
var myScrollColumna2;
var myScrollColumna3;
var myScrollFullFest;
var myScrollMusicaVivo;
var myScrollPlaylist;
var _menuH;
var _menuPlaylistH;
var _currentDerecha="multimedia";
var _tiempoCambia;
var _publiNum=0;
var _festivalActivo=false;
var _cntFestivales=0;
var _festivalID;
var _festSeAmplio=false;

var _tituloNovedades='<div class="columna-titulo amarillo">NOVEDADES</div><div class="columna-icono"><img src="img/iconoNovedades.png" alt=""></div><div class="columna-linea bg-amarillo"></div><div class="clearfix"></div>';

var _tituloFestivales='<div class="columna-titulo violeta">FESTIVALES</div><div class="columna-icono"><img src="img/iconoCalendario.png" alt=""></div><div class="columna-linea bg-violeta"></div><div class="clearfix"></div>';

var _tituloMultimedia='<div class="columna-titulo celeste">MULTIMEDIA</div><div class="columna-icono"><img src="img/iconoMultimedia.png" alt=""></div><div class="columna-linea bg-celeste"></div><div class="clearfix"></div>';

var _tituloPublicaciones='<div class="columna-titulo rojo">PUBLICACIONES</div><div class="columna-icono"><img src="img/iconoPublicaciones.png" alt=""></div><div class="columna-linea bg-rojo"></div><div class="clearfix"></div>';

var _tituloFestivalesAmp='<div class="columna-titulo titulo-chico blanco">VERANO EN LA CIUDAD</div><div class="columna-icono fest-nav-down"></div><div class="columna-icono fest-nav-up"></div><div class="columna-linea bg-blanco"></div><div class="clearfix"></div>';

var _novedades;
var _festivales;
var _multimedia;
var _publicaciones;
var _festivalesAmp;

// Internet Explorer
window.onload = function()
{
     document.onselectstart = function()
     {
          return false;
     } 
// Firefox
     document.onmousedown = function()
     {
          return false;
     }
}

myScrollColumna1 = new IScroll('#wrapper_columna_1', 
	{click:true, mouseWheel: true, scrollX: false, scrollY: true, preventDefault: false });
myScrollColumna2 = new IScroll('#wrapper_columna_2', 
	{click:true, mouseWheel: true, scrollX: false, scrollY: true, preventDefault: false });
myScrollColumna3 = new IScroll('#wrapper_columna_3', 
	{click:true, mouseWheel: true, scrollX: false, scrollY: true, preventDefault: false });
////////////////////////////////////////////////////////////////////////////////////////////
myScrollFullFest = new IScroll('#wrapperFestFull', 
	{click:true, mouseWheel: true, scrollX: false, scrollY: true, preventDefault: false });
myScrollMusicaVivo = new IScroll('#wrapperMusicaVivo', 
	{click:true, mouseWheel: true, scrollX: false, scrollY: true, preventDefault: false });
myScrollPlaylist = new IScroll('#wrapperPlaylist', 
	{click:true, mouseWheel: true, scrollX: false, scrollY: true, preventDefault: false });


jQuery(document).ready(function($) {
	document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
	_tiempoCambia=setTimeout('cambiaDerecha()',5000);

	$('#progItems').isotope({
	  // options
	  itemSelector : '.item',
	  layoutMode : 'fitRows',
	  animationOptions: {
	     duration: 200,
	     easing: 'easeOut',
	     queue: false
	   }
	  //cornerStampSelector: '.item-escenarios'
	});

	armaNovedades();
	armaFestivales();	
	armaPublicaciones();
	armaMultimedia();
	armaFestivalesAmp();

	$("#titulo_columna_1").html(_tituloNovedades);
	$("#scroller_columna_1").html(_novedades);

	$("#titulo_columna_2").html(_tituloFestivales);
	$("#scroller_columna_2").html(_festivales);

	$("#titulo_columna_3").html(_tituloPublicaciones);
	$("#scroller_columna_3").html(_publicaciones);

	ColumasRefresh();

	tamano();
	botonera();
});

window.onresize = function(event) {	
	tamano();	
	//console.log(_ancho+' - '+_alto);
}

function tamano(){
	if(_ancho > 611 && _ancho < 959){
		_margenTop=295;
	} else if(_ancho < 611){
		_margenTop=260;
	}else{
		_margenTop=260;	
	}	
	clearInterval(_scrollsTime);
	_ancho=window.innerWidth;
	_alto=window.innerHeight;
	_menuH=$(".menuTop").height();
	_menuPlaylistH=$("#topPlaylist").height();	
	/////////////////////////////////////////////////////////////////////////////////////
	$("#scrollerMusicaVivo").height($(".cnt-musica-vivo").height()+_agregado);
	$("#scrollerPlaylist").height($(".cnt-arma-playlist").height()+_agregado);
	////////////////////////////////////////////////////////////////////////		
	$(".sitio-cnt").height(_alto-_menuH);
	$("#wrapper_columna_1").height(_alto-_margenTop);
	$("#wrapper_columna_2").height(_alto-_margenTop);
	$("#wrapper_columna_3").height(_alto-_margenTop);
	console.log(_alto-_margenTop);
	////////////////////////////////////////////////////
	$("#wrapperFestFull").height(_alto);
	$("#wrapperMusicaVivo").height(_alto-(_menuPlaylistH));
	$("#wrapperPlaylist").height(_alto-(_menuPlaylistH));
	wrapperMusicaVivo
	_scrollsTime=setTimeout('ScrollsRefresh()', 500);
}

function botonera(){
	$.each(($(".botonera li")), function(a) {		 
		 $(this).on('click', function(event) {
		 	event.preventDefault();
		 	selecciona($(this).prop('id'));
		 });
	});
}

function selecciona(btn){
	for(var a=0; a<10; a++){
 		if(btn==('btn'+a)){
 			$('#btn'+a).addClass('btn-selected');
 			$('#btn'+a).children('.triangulo').addClass('triangulo-selected');
 		}else{
 			$('#btn'+a).removeClass('btn-selected');
 			$('#btn'+a).children('.triangulo').removeClass('triangulo-selected');
 		}
 	}
 	if(btn=="btn0"){
		TweenLite.to(festFull, 1, {css:{marginTop:'0%'}, ease:Power3.easeOut, delay:0});
		$('.cnt-fest-full ul').isotope({filter: '.musica'});
	}else if(btn=="btn1"){
		TweenLite.to(festFull, 1, {css:{marginTop:'0%'}, ease:Power3.easeOut, delay:0});
		$('.cnt-fest-full ul').isotope({filter: '.teatro'});
	}else if(btn=="btn2"){
		TweenLite.to(festFull, 1, {css:{marginTop:'0%'}, ease:Power3.easeOut, delay:0});
		$('.cnt-fest-full ul').isotope({filter: '.cine'});
	}else if(btn=="btn3"){
		TweenLite.to(festFull, 1, {css:{marginTop:'0%'}, ease:Power3.easeOut, delay:0});
		$('.cnt-fest-full ul').isotope({filter: '.danza'});
	}else if(btn=="btn4"){
		TweenLite.to(festFull, 1, {css:{marginTop:'0%'}, ease:Power3.easeOut, delay:0});
		$('.cnt-fest-full ul').isotope({filter: '.infantil'});
	}else if(btn=="btn5"){
		TweenLite.to(festFull, 1, {css:{marginTop:'0%'}, ease:Power3.easeOut, delay:0});
		$('.cnt-fest-full ul').isotope({filter: '.jovenes'});
	}else if(btn=="btn6"){
		TweenLite.to(festFull, 1, {css:{marginTop:'0%'}, ease:Power3.easeOut, delay:0});
		$('.cnt-fest-full ul').isotope({filter: '.tango'});
	}else if(btn=="btn7"){
		TweenLite.to(festFull, 1, {css:{marginTop:'0%'}, ease:Power3.easeOut, delay:0});
		$('.cnt-fest-full ul').isotope({filter: '.educacion'});
	}else if(btn=="btn8"){
		TweenLite.to(festFull, 1, {css:{marginTop:'0%'}, ease:Power3.easeOut, delay:0});
		$('.cnt-fest-full ul').isotope({filter: '.circo'});
	}else if(btn=="btn9"){
		TweenLite.to(festFull, 1, {css:{marginTop:'0%'}, ease:Power3.easeOut, delay:0});
		$('.cnt-fest-full ul').isotope({filter: '*'});
	}
	_scrollsTime=setTimeout('ScrollsRefresh()', 1500);
}
////////////////////////////////////////////////////
function deselecciona(){
	$.each(($(".botonera li")), function(a) {		 
		 $(this).removeClass('btn-selected');
 		 $(this).children('.triangulo').removeClass('triangulo-selected');
	});
}
//////////////////////////////////////////////////
$("#cerrarFest").on('click', function(e) {
 	TweenLite.to(festFull, 1, {css:{marginTop:'-100%'}, ease:Power3.easeInOut, delay:0, onComplete: deselecciona});
});

$("#cerrarPlaylist").on('click', function(e) {
 	$("#playList").hide();
});

///////////////////////////////////////////////////

function cambiaDerecha(){
	TweenLite.to(columna_3, 1, {css:{marginLeft:'50px', opacity:0}, ease:Power3.easeInOut, delay:0, onComplete:escondeCurrent});	
}

function escondeCurrent(){
	clearTimeout(_tiempoCambia);
	if(_currentDerecha=="publicaciones"){

		$("#titulo_columna_3").html(_tituloPublicaciones);
		$("#scroller_columna_3").html(_publicaciones);
		TweenLite.to(columna_3, 2, {css:{marginLeft:'3%', opacity:1}, ease:Power3.easeInOut, delay:0});
		_currentDerecha="multimedia";

	}else if(_currentDerecha=="multimedia"){

		$("#titulo_columna_3").html(_tituloMultimedia);	
		$("#scroller_columna_3").html(_multimedia);		
		TweenLite.to(columna_3, 2, {css:{marginLeft:'3%', opacity:1}, ease:Power3.easeInOut, delay:0});
		if(_festivalActivo){
			_currentDerecha="novedades";
		}else{
			_currentDerecha="publicaciones";
		}
	} else if(_currentDerecha=="novedades"){

		$("#titulo_columna_3").html(_tituloNovedades);	
		$("#scroller_columna_3").html(_novedades);		
		TweenLite.to(columna_3, 2, {css:{marginLeft:'3%', opacity:1}, ease:Power3.easeInOut, delay:0});
		_currentDerecha="publicaciones";
	}
	_tiempoCambia=setTimeout('cambiaDerecha()',5000);
	_scrollsTime=setTimeout('ScrollsRefresh()', 500);
}

/* ////////////////////////// */

$("#columna_3").on('mouseover , touchstart', function(e) {
 	clearTimeout(_tiempoCambia);
});

$("#columna_3").on('mouseout , touchend', function(e) {
 	_tiempoCambia=setTimeout('cambiaDerecha()',5000);
});

/* ////////////////////////// */
/* ////////////////////////// */
/* ////////////////////////// */
function armaNovedades(){
	_novedades='';

	_novedades='<div class="co-novedades-cnt"><div class="co-novedades-sub amarillo">BAFICI ANIMADO</div><div class="co-novedades-icono" id="galVideos"></div><div class="co-novedades-icono" id="galImg"></div><div class="co-novedades-vergal"><img src="img/txtVerGaleria.png" alt=""></div><div class="clearfix"></div></div><div class="co-novedades-titulo blanco">Fin de fiesta con el mejor resultado</div><img src="img/lineaNoticia.png" width="100%" height="auto" alt=""><div class="co-novedades-texto blanco">Concluyó la segunda edición del Festival con un saldo muy positivo en términos de convocatoria de público y del nivel artístico expresado en la selección.</div><div class="co-novedades-ver"><img src="img/btnVerNota.png" alt=""></div>';

	for(var a=0; a<5; a++){
		_novedades=_novedades+'<div class="co-novedad-cnt"><div class="co-ver-mas"></div><div class="co-novedad-imagen" style="background-image: url(\'img/oso.jpg\');"></div><div class="co-novedad-textos"><div class="co-novedad-titulo amarillo">bafici animado</div><div class="co-novedad-texto blanco">Fin de fiesta con el mejor resultado</div></div><div class="clearfix"></div></div>';
	}
}
/* ////////////////////////// */
/* ////////////////////////// */
/* ////////////////////////// */
function armaFestivales(){
	_festivales='';

	_festivales='<div class="cnt-festivales"><div class="img-festival vigente" id="fest0"><div class="name">a</div><div class="fest-mas-info"></div></div><div class="img-festival" id="fest1"><div class="name">b</div><div class="fest-cartel">Faltan 15 días</div></div><div class="img-festival" id="fest2"><div class="name">b</div><div class="fest-te-convoca"></div></div><div class="img-festival" id="fest3"><div class="name">bb</div><div class="fest-te-convoca"></div></div><div class="img-festival" id="fest4"><div class="name">b</div><div class="fest-te-convoca"></div></div><div class="img-festival" id="fest5"><div class="name">b</div><div class="fest-cartel">Faltan 30 días</div></div><div class="img-festival" id="fest6"><div class="name">b</div><div class="fest-cartel">Faltan 60 días</div></div><div class="img-festival" id="fest7"><div class="name">b</div><div class="fest-te-convoca"></div></div><div class="img-festival" id="fest8"><div class="name">b</div><div class="fest-cartel">Faltan 90 días</div></div><div class="img-festival" id="fest9"><div class="name">b</div><div class="fest-cartel">Faltan 150 días</div></div><div class="img-festival" id="fest10"><div class="name">b</div><div class="fest-te-convoca"></div></div><div class="img-festival" id="fest11"><div class="name">b</div><div class="fest-te-convoca"></div></div></div>';
}

/* ////////////////////////// */
/* ////////////////////////// */
/* ////////////////////////// */
function armaPublicaciones(){
	_publicaciones='';

	_publicaciones='<div class="cnt-publicaciones">';

	for(var a=0; a<10; a++){
		if(_publiNum==2){
			_publicaciones=_publicaciones+'<div class="item-publi no-margin"><div class="item-publi-img" style="background-image: url(\'img/publi_1.jpg\');"><div class="item-publi-ico"></div></div><div class="item-publi-titulo rojo">CIUDANZA</div><div class="item-publi-texto">Esto es un título simulado para ver cómo queda.</div></div>';
			_publiNum=0;
		}else{
			_publicaciones=_publicaciones+'<div class="item-publi"><div class="item-publi-img" style="background-image: url(\'img/publi_2.jpg\');"><div class="item-publi-ico"></div></div><div class="item-publi-titulo rojo">CIUDANZA</div><div class="item-publi-texto">Esto es un título simulado para ver cómo queda.</div></div>';
			_publiNum++;
		}
		
	}

	_publicaciones=_publicaciones+'<div class="clearfix"></div></div>';
}

/* ////////////////////////// */
/* ////////////////////////// */
/* ////////////////////////// */

function armaMultimedia(){
	_multimedia='';

	_multimedia='<div class="cnt-multimedia">';

	for(var a=0; a<10; a++){
		_multimedia=_multimedia+'<div class="item-multimedia" style="background-image: url(\'img/multi_1.jpg\');"><div class="item-multimedia-titulo celeste">BAFICI ANIMADO</div><div class="item-multimedia-video"></div></div><div class="item-multimedia" style="background-image: url(\'img/multi_2.jpg\');"><div class="item-multimedia-titulo celeste">BAFICI ANIMADO</div><div class="item-multimedia-mas"></div></div>';
	}

	_multimedia=_multimedia+'<div class="clearfix"></div></div>';
}

/* ////////////////////////// */
/* ////////////////////////// */
/* ////////////////////////// */

function armaFestivalesAmp(){
	_festivalesAmp='';

	_festivalesAmp='<div class="co-novedades-cnt"><div class="evento-amp-tab no-left blanco">ACERCA DE</div><div class="evento-amp-tab blanco">DIRECTOR ARTISTICO</div><div class="evento-amp-tab evento-amp-tab-select blanco">PRENSA</div><div class="evento-amp-tab blanco">EDICIONES ANTERIORES</div><div class="clearfix"></div></div><div class="co-novedades-titulo blanco">OFICINA DE PRENSA</div><div class="fest-amp-texto blanco"><a href="mailto:prensa@festivales.gob.ar">prensa@festivales.gob.ar</a><br>+54 11 4393-4670 Int: 125<br>Av. Roque Sáenz Peña 832 6º piso<br>C1035AAQ - Buenos Aires - Argentina<br><a href="www.buenosaires.gob.ar/festivales">www.buenosaires.gob.ar/festivales</a></div><div class="menu-download"><div class="download-tab download-tab-select no-left">GACETILLAS</div><div class="download-tab">LOGOS INSTITUCIONALES</div><div class="download-tab">CLIPPING</div></div><div class="download-listado">';

	for(var a=0; a<10; a++){
		_festivalesAmp=_festivalesAmp+'<div class="download-listado-item"><i class="clip-icon"></i><div class="download-listado-item-texto">15 BAFICI - Premiación 15 BAFICI</div><div class="clearfix"></div></div>';
	}

	_festivalesAmp=_festivalesAmp+'<div class="clearfix"></div>';
}
////////////////////////////////////////////////////

function ampliaFestival(id){
	_festivalID=id;
	if(_festSeAmplio){
		muestraFestival();
	}else{
		clearTimeout(_tiempoCambia);
		TweenLite.to(columna_1, 1, {css:{marginLeft:'50px', opacity:0}, ease:Power3.easeInOut, delay:0});
		TweenLite.to(columna_2, 1, {css:{marginLeft:'50px', opacity:0}, ease:Power3.easeInOut, delay:0});
		TweenLite.to(columna_3, 1, {css:{marginLeft:'50px', opacity:0}, ease:Power3.easeInOut, delay:0, onComplete:muestraFestival});
	}
	TweenLite.to(festFull, 1, {css:{marginTop:'-100%'}, ease:Power3.easeInOut, delay:0, onComplete: deselecciona});		
}

function muestraFestival(){
	_festivalActivo=true;
	_currentDerecha="publicaciones";
	$("#titulo_columna_1").html(_tituloFestivales);
	$("#scroller_columna_1").html(_festivales);

	$("#titulo_columna_2").html(_tituloFestivalesAmp);
	$("#scroller_columna_2").html(_festivalesAmp);

	$("#titulo_columna_3").html(_tituloNovedades);
	$("#scroller_columna_3").html(_novedades);

	for(var a=0; a<_cntFestivales; a++){
		if(_festivalID==('fest'+a)){
 			$('#fest'+a).addClass('vigente');
 			$('#fest'+a).addClass('img-festival-selected');
 			$('#fest'+a).children('.name').html('a');
 			if($('#fest'+a).children('.fest-mas-info')){
 				$('#fest'+a).children('.fest-mas-info').addClass('fest-mas-info-selected');
 			}
 			if($('#fest'+a).children('.fest-te-convoca')){
 				$('#fest'+a).children('.fest-te-convoca').addClass('fest-te-convoca-selected');
 			}
 			if($('#fest'+a).children('.fest-cartel')){
 				$('#fest'+a).children('.fest-cartel').addClass('fest-cartel-selected');
 			}
 			//console.log($('#fest'+a));
 		}else{
 			$('#fest'+a).removeClass('vigente');
 			$('#fest'+a).removeClass('img-festival-selected');
 			$('#fest'+a).children('.name').html('b');
 			if($('#fest'+a).children('.fest-mas-info')){
 				$('#fest'+a).children('.fest-mas-info').removeClass('fest-mas-info-selected');
 			}
 			if($('#fest'+a).children('.fest-te-convoca')){
 				$('#fest'+a).children('.fest-te-convoca').removeClass('fest-te-convoca-selected');
 			}
 			if($('#fest'+a).children('.fest-cartel')){
 				$('#fest'+a).children('.fest-cartel').removeClass('fest-cartel-selected');
 			}
 		}
 		//console.log('fest'+a);
	}

	ColumasRefresh();
	if(_festSeAmplio){
		
	}else{		
		_festSeAmplio=true;		
		TweenLite.to(columna_1, 1, {css:{marginLeft:'3%', opacity:1}, ease:Power3.easeInOut, delay:0.1});
		TweenLite.to(columna_2, 1, {css:{marginLeft:'3%', opacity:1}, ease:Power3.easeInOut, delay:0.5});
		TweenLite.to(columna_3, 1, {css:{marginLeft:'3%', opacity:1}, ease:Power3.easeInOut, delay:0.8});
		_tiempoCambia=setTimeout('cambiaDerecha()',5000);
	}	
	myScrollColumna1.scrollTo(0,0,500);
	myScrollColumna2.scrollTo(0,0,500);
	myScrollColumna3.scrollTo(0,0,500);	
	_scrollsTime=setTimeout('ScrollsRefresh()', 500);
}
////////////////////////////////////////////////////

function ColumasRefresh(){

	$(".cnt-festivales .img-festival").each(function(){
		$(this).on('click', function(event) {
		 	event.preventDefault();
		 	ampliaFestival($(this).prop('id'));
		});
		_cntFestivales++;
	});

	$('.cnt-festivales').isotope({
	  itemSelector : '.img-festival',
	  getSortData : {
	    name : function ($elem) {
	      return $elem.find('.name').text();
	    }
	  }
	});

	$('.cnt-festivales').isotope({ sortBy : 'name' });
}

///////////////////////////////////////////////////
function ScrollsRefresh(){
	myScrollColumna1.refresh();
	myScrollColumna2.refresh();
	myScrollColumna3.refresh();
	myScrollFullFest.refresh();
	myScrollMusicaVivo.refresh();
	myScrollPlaylist.refresh();
}