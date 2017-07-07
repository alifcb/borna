
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
		pictureSource=navigator.camera.PictureSourceType;
       destinationType=navigator.camera.DestinationType;
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

document.addEventListener('deviceready', onDeviceBase, false);
document.addEventListener("offline", onOffline, false);
document.addEventListener("online", onOnline, false);
  function onOffline() {
document.getElementById('online').value=0;
}	
  function onOnline() {
document.getElementById('online').value=1;
}	
////////////////////////////////////
function onDeviceBase() {

var db = window.openDatabase("Database", "1.0", "Cordova borna", 200000);
db.transaction(table, errorCB, successCB);
}
// end onDeviceBase

function table(tx){    
//tx.executeSql('DROP TABLE IF EXISTS yadavari');
//tx.executeSql('DROP TABLE IF EXISTS settings');
tx.executeSql('CREATE TABLE IF NOT EXISTS cars(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, id_car INTEGER, name text,comment text,bime text,pic text,direct text,company INTEGER,flag INTEGER,fav INTEGER)');
tx.executeSql('CREATE TABLE IF NOT EXISTS settings(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, title text,valuem text)');
tx.executeSql('CREATE TABLE IF NOT EXISTS books(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, id_book INTEGER,links text,direct text,flag INTEGER)');
tx.executeSql('CREATE TABLE IF NOT EXISTS yadavari(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, name text,date text,tell text,flag INTEGER)');

}

///////////////////////////////////////error db
function errorCB(err) {
	console.log("Error processing SQLm: "+err.message);
}
///////////////////////////////////// هرچیزی که می خواهد در ابتدا استارت بخورد در این قسمت قرار بگیرد
function successCB() {
var db = window.openDatabase("Database", "1.0", "Cordova borna", 200000);
db.transaction(flag_one, errorSE);
}

//////////////////////////////////// مرحله سنجش فلگ بار اول
function flag_one(tx) {
tx.executeSql('SELECT * FROM settings where title="last_car"', [], again_car, errorSE);
}

function errorSE() {  
 // alert('kjh');
$.getJSON("company.json", function(json) {
var long=json.cars.length;		
//alert(long);
var dbs = window.openDatabase("Database", "1.0", "Cordova borna", 200000);
dbs.transaction (function(tx){nenter_car(tx,long);},errOUT);	
 
function nenter_car(tx,nter) {//alert('number'+nter);
tx.executeSql('INSERT INTO settings(title,valuem) values("last_car",'+nter+')');
}

for(i = 0; i < json.cars.length; i++) {
insert_cars(json.cars[i].ids, json.cars[i].name, json.cars[i].pic,json.cars[i].direct, json.cars[i].flag);
}  


function insert_cars(id,name,pic,direct,flag) {
var dbs = window.openDatabase("Database", "1.0", "Cordova borna", 200000);
dbs.transaction (function(tx){inserts_cars(tx,id,name,pic,direct,flag);}, errOUT);
}

function inserts_cars(tx,id,name,pic,direct,flag) {
//alert(id+name+pic+direct);
tx.executeSql('INSERT INTO cars(id_car,name,direct,pic,flag,fav) values('+id+', "'+name+'","'+direct+'", "'+pic+'",'+flag+',0)');
}
function succOUT() {
  alert('best');
}
function errOUT(err) {
  alert('eerr-'+err.message);
}
});

///////////////////////// اپدیت  آیتم های قدیم

function again_car(tx, results) {
//alert('car');
var counts=results.rows.item(0).valuem;
//alert(counts);
var x=0;

$.getJSON("company.json", function(json) {
for(i = counts; i < json.cars.length; i++) {
x=x+1;
insert_car(json.cars[i].ids, json.cars[i].name,json.cars[i].direct,  json.cars[i].comment, json.cars[i].flag);
if(x==1){up_last_car(json.cars.length);}
}
for(i = 0; i < counts; i++) {
	//alert(json.cars[i].name);
up_flag_car(json.cars[i].ids, json.cars[i].name,json.cars[i].direct, json.cars[i].comment, json.cars[i].flag);
}
});
}
///////////////////////////////  ثبت آیتم های جدید
function insert_car(id,name,pic,direct,flag) {
var dbs = window.openDatabase("Database", "1.0", "Cordova borna", 200000);
dbs.transaction (function(tx){insert_to_car(tx,id,name,pic,direct,flag);}, errorCB );	 
}

function insert_to_car(tx,id,name,pic,direct,flag) {
tx.executeSql('INSERT INTO cars(ids,name,pic,direct,flag,fav) values('+id+', "'+name+'","'+pic+'","'+direct+'", '+flag+',0)');
}

}


///////////////////////// اپدیت  آیتم های قدیم

function up_flag_car(id,name,pic,bime,direct,company,comment,flag){
var dbs = window.openDatabase("Database", "1.0", "Cordova borna", 200000);
dbs.transaction (function(tx){up_function_car(tx,id,name,pic,bime,direct,company,comment,flag);}, testcard,errorCB );	 
}

function testcard() {
}

function up_function_car(tx,id,name,pic,bime,direct,company,comment,flag) {//alert(name);
tx.executeSql("UPDATE cars SET name='"+name+"',comment='"+comment+"',company="+company+",pic='"+pic+"',bime='"+bime+"',direct='"+direct+"',flag="+flag+" where id_car="+id+"", [], testcard, errorCB );
}
////////// اپدیت تعداد ایتم های موجود در دیتا بیس محلی
function up_last_car(number) {
var dbs = window.openDatabase("Database", "1.0", "Cordova borna", 200000);
dbs.transaction (function(tx){up_exe_car(tx,number);}, errorCB );	 
}

function up_exe_car(tx,number) {
tx.executeSql("UPDATE settings SET valuem='" +number+"' where title='last_car'", [],errorCB );
}


////////////////////////////////////////////
$( document ).on("swipeleft swiperight", ".ui-content", function( e ) {
// We check if there is no open panel on the page because otherwise
// a swipe to close the left panel would also open the right panel (and v.v.).
// We do this by checking the data that the framework stores on the page element (panel: open).
if ($.mobile.activePage.jqmData( "panel" ) !== "open") {
if ( e.type === "swipeleft"  ) {
$( "#myPanel" ).panel( "open" );
$( "#myPanel2" ).panel( "open" );
$( "#myPanel3" ).panel( "open" );
} else if ( e.type === "swiperight" ) {
$( "#myPanel" ).panel( "close" );
$( "#myPanel2" ).panel( "close" );
$( "#myPanel3" ).panel( "close" );
}
}
});


 

document.addEventListener("backbutton", function(e){
       if($.mobile.activePage.is('#sherkat')){
           e.preventDefault();
           navigator.app.exitApp();
       }
       else if($.mobile.activePage.is('#mashinha')){
  $.mobile.changePage( "#sherkat", { transition: "fade"} );
       }
       else {
           navigator.app.backHistory()
       }
    }, false);

function exitFromApp()
{
  navigator.app.exitApp();
}
//////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
// Called when a photo is successfully retrieved
//
function onPhotoURISuccessx0(imageURI) {
  var largeImage = document.getElementById('largeImagex0');
  largeImage.style.display = 'inline';
  largeImage.src = imageURI;
}
// A button will call this function
//
function getPhotox0(source) {

  // Retrieve image file location from specified source
  navigator.camera.getPicture(onPhotoURISuccessx0, onFail, { quality: 50,
	destinationType: destinationType.FILE_URI,
	sourceType: source });
}
///////////////////////////
function onPhotoURISuccessf(imageURI) {
  var largeImage = document.getElementById('largeImage0');
  largeImage.style.display = 'inline';
  largeImage.src = imageURI;
}
// A button will call this function
//
function getPhotof(source) {

  // Retrieve image file location from specified source
  navigator.camera.getPicture(onPhotoURISuccessf, onFail, { quality: 50,
	destinationType: destinationType.FILE_URI,
	sourceType: source });
}
//////////////////////////////////////////////////////////////////////////////////////
function onPhotoURISuccessy(imageURI) {
  var largeImage = document.getElementById('largeImage1');
  largeImage.style.display = 'inline';
  largeImage.src = imageURI;
}
// A button will call this function
//
function getPhotoy(source) {
  // Retrieve image file location from specified source
  navigator.camera.getPicture(onPhotoURISuccessy, onFail, { quality: 50,
	destinationType: destinationType.FILE_URI,
	sourceType: source });
}//
/////////////////////////////////////////////////////////////////////////////////////
function onPhotoURISuccessd(imageURI) {
  var largeImage = document.getElementById('largeImage2');
  largeImage.style.display = 'inline';
  largeImage.src = imageURI;
}
// A button will call this function
//
function getPhotod(source) {
  // Retrieve image file location from specified source
  navigator.camera.getPicture(onPhotoURISuccessd, onFail, { quality: 50,
	destinationType: destinationType.FILE_URI,
	sourceType: source });
}///////////////////////////////////////////////////////////////////////////////////////
function onPhotoURISuccesss(imageURI) {
  var largeImage = document.getElementById('largeImage3');
  largeImage.style.display = 'inline';
  largeImage.src = imageURI;
}
// A button will call this function
//
function getPhotos(source) {
  // Retrieve image file location from specified source
  navigator.camera.getPicture(onPhotoURISuccesss, onFail, { quality: 50,
	destinationType: destinationType.FILE_URI,
	sourceType: source });
}
// Called if something bad happens.
///////////////////////////////////////////////////////////////////////////////////////
function onFail(message) {
  alert('خطا: ' + message);
}

///////////////////
if (typeof jQuery == 'undefined') {
  console.log("Notice :You Have To Add Jquery Befor Using This Library");
}else{
  $(document).on("click",".toast_material",function(){
    if($('.toast_open').length){
      $('.toast_material').removeClass("fadeInUp");
      $('.toast_material').addClass("fadeOutDown");
      setTimeout(function() {
        $('.toast_material').remove();
      }, 800);
    }
  });
}
function isset(variable) {
    if (typeof variable !== "undefined" && variable !== null) {
        return true;
    } else {
        return false;
    }
}
function Toast_Material(options){
  if(isset(options.position)){
    if(options.position == "right" || options.position == "left"){
      var positionStyle = options.position + ":16px";
    }
    else if(options.position == "center"){
      var positionStyle="";
      $(document).ready(function(){
        $('.toast_material').css({'left': '50%'});
        $(".toast_material").css({'margin-left': -$(".toast_material").outerWidth() / 2 + 'px'});
      });
    }   
  }
  else{
    var positionStyle = "left : 16px";
  }
  if(isset(options.align)){
    var alignStyle = options.align;
    if(alignStyle == "right"){
      var directionStyle = "rtl";
    }
    else if(alignStyle == "left"){
      var directionStyle = "ltr";
    }
    else if(alignStyle == "center"){
      var directionStyle = "ltr";
    }
  }
  else{
    var alignStyle = "left";
    var directionStyle = "ltr";
  }
  if(isset(options.content)){
    var contentText = options.content;
  }
  else{
    var contentText = "";
  }
  if(isset(options.updown)){
    var heightStyle = options.updown + ":15px;";
  }
  else{
    var heightStyle = "bottom : 15px";
  }
  if($('.toast_material').length){
    if($('.toast_open').length){
      $('.toast_material').addClass("animated fadeOutDown");
    }
    else{
      $('.toast_material').remove();
    } 
    $('body').append('<div class="toast_material toast_open animated fadeInUp" style="'+ positionStyle +';text-align:'+ alignStyle +';'+ heightStyle +'"><p style="direction:'+ directionStyle +'">'+ contentText +'</p></div>');
    setTimeout(function() {
      $('.toast_material').removeClass("fadeInUp");
      $('.toast_material').addClass("fadeOutDown");
    }, 3000);
  }
  else{
    console.log(heightStyle);
    $('body').append('<div class="toast_material toast_open animated fadeInUp" style="'+ positionStyle +';text-align:'+ alignStyle +';'+ heightStyle +'"><p style="direction:'+ directionStyle +'">'+ contentText +'</p></div>');
    setTimeout(function() {
      $('.toast_material').removeClass("fadeInUp");
      $('.toast_material').addClass("fadeOutDown");
    }, 3000);
  }
};
///////////////////////////////////////////////////////////////////////////////////////////////////////

var captureSuccessi= function(mediaFiles) {
    var i, path, len;
    for (i = 0, len = mediaFiles.length; i < len; i += 1) {
        path = mediaFiles[i].fullPath;
		 document.getElementById('imeagv').value=path;
		 document.getElementById('imload2').src=path;
		// alert(path);
        // do something interesting with the file
    }
};
var captureSuccessv= function(mediaFiles) {
    var i, path, len;
    for (i = 0, len = mediaFiles.length; i < len; i += 1) {
        path = mediaFiles[i].fullPath;
		 document.getElementById('videov').value=path;
         //document.getElementById('viload').src=path;
    }
};
// capture error callback
var captureError = function(error) {
    navigator.notification.alert('Error code: ' + error.code, null, 'Capture Error');
};
function videoca(){
// start video capture
navigator.device.capture.captureVideo(captureSuccessv, captureError, {limit:1, quality: 0 , duration: 30 });
}
function imageca(){
// start image capture
navigator.device.capture.captureImage(captureSuccessi, captureError, {limit:1});
}
///////////////////////
document.addEventListener("deviceready", glocation, false);
    function glocation() {//alert('yes');
     navigator.geolocation.getCurrentPosition(onSuccessdd, onErroeer,{ timeout: 10000 });
    }
	
	  var onSuccessdd = function(position) {//alert('yes');
                document.getElementById('lato').value=position.coords.latitude;
	            document.getElementById('long').value=position.coords.longitude;
				document.getElementById('gpsno').style.display='none';
				document.getElementById('gpsyes').style.display='block';
	
    };
    function onErroeer(error) {
        //alert('code: '    + error.code    + '\n' +'message: ' + error.message + '\n');
    }
//////////////////////////////////////////////////
function FormatNumber(id1,id2)
{
	document.getElementById(id2).innerHTML = FormatNumberBy3(document.getElementById(id1).value);
}
function FormatNumberBy3(num, decpoint, sep) {
  // check for missing parameters and use defaults if so
  if (arguments.length == 2) {
    sep = ",";
  }
  if (arguments.length == 1) {
    sep = ",";
    decpoint = ".";
  }
  // need a string for operations
  num = num.toString();
  // separate the whole number and the fraction if possible
  a = num.split(decpoint);
  x = a[0]; // decimal
  y = a[1]; // fraction
  z = "";


  if (typeof(x) != "undefined") {
    // reverse the digits. regexp works from left to right.
    for (i=x.length-1;i>=0;i--)
      z += x.charAt(i);
    // add seperators. but undo the trailing one, if there
    z = z.replace(/(\d{3})/g, "$1" + sep);
    if (z.slice(-sep.length) == sep)
      z = z.slice(0, -sep.length);
    x = "";
    // reverse again to get back the number
    for (i=z.length-1;i>=0;i--)
      x += z.charAt(i);
    // add the fraction back in, if it was there
    if (typeof(y) != "undefined" && y.length > 0)
      x += decpoint + y;
  }
  return x;
}