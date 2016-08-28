
// JavaScript Document
var App = angular.module('App', ['ngSanitize'] );

App.controller('CenterCTRL', function ($scope,todoServicez,$http) {
	
$http.get("company.json").then(function(response) {
	$scope.company = response.data.items;
});

$scope.comp_id = function (ides) {
	//alert(ides);
	$http.get("company.json").then(function(response) {
	$scope.cars = response.data.cars;
	  $scope.pageid=ides;
});	
}
////////////////////////////////////////
$scope.showfaver = function () {
//faver  
todoServicez.getfaver().then(function(items)
{//alert(items[0].ids);
	$scope.myfaver = items;
});

};
$scope.faver = function (faver,id_var) 
{
	//alert(id_var);
if(faver==1){
 $scope.iconslike="img/likeoff.png";
$scope.efaver=0;
Toast_Material({ content : "با موفقیت از لیست علاقه مندی ها حذف شد", updown:"bottom", position:"center", align:"center" });	
favt=0;}else{
$scope.iconslike="img/heart.png";
$scope.efaver=1;
Toast_Material({ content : "با موفقیت در لیست علاقه مندی ها ثبت شد", updown:"bottom", position:"center", align:"center" });	
favt=1;}
todoServicez.faverat(id_var,favt);

};
///////////////////////////////////////////////////
$scope.cars_id = function (ides) {
var  ides;
	$http.get("company.json").then(function(response) {
	$scope.carm = response.data.cars;
	$scope.carid=ides;	
		 //alert($scope.carm[0].name);
 	$scope.picmi = response.data.pics;
	$scope.caridp=ides;	
var i;
var src='images/not-found.png';
//alert($scope.carid);
/////////////////////////////////////////////////////////////
todoServicez.sherm(ides).then(function(items)
{ 
//alert(items[0].fav);
$scope.efaver=items[0].fav;
if(items[0].fav){
$scope.efaver=items[0].fav;
	$scope.iconslike="img/heart.png";
	}else{
		$scope.efaver=items[0].fav;
		$scope.iconslike="img/likeoff.png";
}

	 
});

///////////////////////////////




//////////////////////////////////////////////////////////// آیا فیور هست
//todoServicez.iffav(ides).then(function(items)
//{
//
//if(items[0].fav==1){
//$scope.iconslike="img/heart.png";
//	}else{
//$scope.iconslike="img/likeoff.png";
//	}
//});
///////////////////////////////////////////////////////////////////
x=0;
$('#owl-demo .five img').attr('src', src);
$('#owl-demo .four img').attr('src', src);
$('#owl-demo .three img').attr('src', src);
$('#owl-demo .two img').attr('src', src);
$('#owl-demo .one img').attr('src', src);
////////////
$('#myfive img').attr('src', src);
$('#myfour img').attr('src', src);
$('#mythree img').attr('src', src);
$('#mytwo img').attr('src', src);
$('#myone img').attr('src', src);
 
for(i = 0; i < response.data.pics.length; i++) {
if(response.data.pics[i].id_car==ides){//alert(response.data.pics[i].id_car);
       src=response.data.pics[i].direct+response.data.pics[i].pic ;
x=x+1;
switch(x) {
    case 1:
$('#owl-demo .one img').attr('src', src);
$('#myone img').attr('src', src);
        break;
    case 2:
$('#owl-demo .two img').attr('src', src);
$('#mytwo img').attr('src', src);
        break;
     case 3:
$('#owl-demo .three img').attr('src', src);
$('#mythree img').attr('src', src);
        break;
    case 4:
$('#owl-demo .four img').attr('src', src);
$('#owl-demo .five img').attr('src', src);
$('#myfour img').attr('src', src);
   
        break;		
    case 5:
$('#owl-demo .five img').attr('src', src);
$('#myfive img').attr('src', src);
        break;			
}
}
}
	  });

}

///////////////////////////////////////////////////ersal form tamas
$scope.forms = {};	
$scope.forms.text="";
$scope.forms.email="";
$scope.forms.name="";

 $scope.sendform = function () {
	names=$scope.forms.name;
	emails=$scope.forms.email;
	texts=$scope.forms.text; 
if(texts==""){
Toast_Material({ content : "لطفا جهت ارسال پیام فیلد ها را کامل کنید", updown:"bottom", position:"center", align:"center" });	
		return 0;}
	
  $http({
  method  : 'POST',
  url     : 'http://www.shahreroya.ir/apis/book/manage/code.php',
  data    : $.param({name: names, email:emails, text:texts}),  // pass in data as strings
  headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
 })
.success(function(data) {
$scope.forms.text="";
$scope.forms.email="";
$scope.forms.name="";
Toast_Material({ content : "پیام شما با موفقیت به پشتیبانی ارسال شد", updown:"bottom", position:"center", align:"center" });	
  });
 }
////////////////////////////////////////////////////////////////////////// 	
$scope.randoms = Math.floor(Math.random() * 2) + 1  ;
$scope.mylan = function (lan) {

todoServicez.show_alert().then(function(items)
{ 
var len = items.length;

for (var i=0; i<len; i++){
//alert(items[i].valuem);
todoServicez.up_alert(items[i].ids);
}
});
 
}; 

///////////////////////////////////////////////// ارسال تصویر
 $scope.users = {};	
$scope.sendform = function(urlpic) {
online=document.getElementById('online').value;

$scope.user.company='no';
//var laImage = document.getElementById('largeImage0').src;	
if(!$scope.user.company || !$scope.user.cars){

Toast_Material({ content : "لطفا  نام خودرو را وارد کنید!", updown:"bottom", position:"center", align:"center" });	

}else
if(online==0){
Toast_Material({ content : "اتصال به اینترنت برقرار نیست!", updown:"bottom", position:"center", align:"center" });	
}else
{	

$scope.btshow=true;
document.getElementById('shoo').value='در حال ارسال ...';
  document.getElementById('shoso').style.display="none";
Toast_Material({ content : "برنامه در حال ارسال اطلاعات می باشد لطفا منتظر بمانید!", updown:"bottom", position:"center", align:"center" });	
$scope.disa=true;
for(var i = 0; i < 4; i++){
var d = new Date();	
namefile=d.getTime()+'.jpg';
var largeImage = document.getElementById('largeImage'+i);

imageURI=largeImage.src;
//alert(imageURI);
if(i==3){ends='end'}else{ends='no'}
todoServicez.UserImg(imageURI,namefile,ends).then(function(items)
{
//alert(items);
if(items=='end' || items=='not'){
$scope.btshow=false;	
$scope.user.cars="";
Toast_Material({ content : "ارسال به اتمام رسید!", updown:"bottom", position:"center", align:"center" });
 document.getElementById('largeImage0').src="";
document.getElementById('largeImage2').src="";
document.getElementById('largeImage3').src="";
 document.getElementById('largeImage1').src="";

document.getElementById('shoo').value='ارسال';
  document.getElementById('shoso').style.display="block";
}
});
 
  $http({
  method  : 'POST',
  url     : 'http://www.borna-grp.ir/sabt_kh.php',
  data    : $.param({company: $scope.user.company, cars:$scope.user.cars, photo:namefile}),  // pass in data as strings
  headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
 })
  .success(function(data) {
   // alert(data.items[0].cell);
  });
};
}
}
/////////////////////////////////////////////////////////ورود به سیستم

interd=document.getElementById('inter').value;
online=document.getElementById('online').value;
if(interd==1){
navigator.notification.confirm("آیا می خواهید از برنامه خارج شوید؟ ", onConfirm, "خروج از برنامه!", "بله,خیر"); 
    // Prompt the user with the choice
function onConfirm(button) {
    if(button==2){//If User selected No, then we just do nothing
        return;
    }else{
        navigator.app.exitApp();// Otherwise we quit the app.
  }
}}else
if(online==0 && interd==0){
    $.mobile.changePage( "#online", { transition: "slideup"} );
} 
$scope.go = function ( path ) {$location.path( path );};

todoServicez.idreg().then(function(items)
{
	$scope.regiser = items;
	if($scope.regiser){
    $.mobile.changePage( "#sherkat", { transition: "slideup"} );
	document.getElementById('inter').value=1;
	return 0;
	}
});

$scope.trustSrc = function(src) {
return $sce.trustAsResourceUrl(src);
}
$scope.movie = {src:"http://www.borna-grp.ir/req.php", title:"واریز به حساب"};
/////////////////////////////////////////////////////////////////////
$scope.user = {};
$scope.sabtcode = function() {
online=document.getElementById('online').value;
if(online==0 && interd==0){
    $.mobile.changePage( "#online", { transition: "slideup"} );
}

var uid = device.uuid;

  $http({
  method  : 'POST',
  url     : 'http://www.borna-grp.ir/sabt_kh.php',
  data    : $.param({name: $scope.user.fname, mname:$scope.user.name,userid:uid, codes:$scope.user.code}),  // pass in data as strings
  headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
 })
  .success(function(data) {
//alert(data.items[0].cell);
if(data.items[0].cell!=''){
todoServicez.insertcod(data.items[0].cell);
    $.mobile.changePage( "#sherkat", { transition: "slideup"} );
}else{
alert('کد خرید وارد شده صحیح نمی باشد');
}
  });
};


});



App.service('todoServicez', function($q) 
{
this.sherm = function(para)
  {  //alert(para);
   var idcom=para;
	  var deferred, result = [];
	  deferred = $q.defer();
	  var db = window.openDatabase("Database", "1.0", "Cordova borna", 200000);
	  db.transaction(function(tx) 
	  { tx.executeSql("select * from cars where id_car="+idcom, [], function(tx, res) 
		  { 
			  for(var i = 0; i < res.rows.length; i++)
			  {//alert(res.rows.item(i).fav);
		  result.push({id : res.rows.item(i).id_car, name : res.rows.item(i).name, pic: res.rows.item(i).pic,fav : res.rows.item(i).fav, direct: res.rows.item(i).direct})
		  }
		  deferred.resolve(result);
		});
	  });
	  return deferred.promise;
    },
this.iffav = function(para)
{   var idcom=para;
//alert(idcom);
var deferred, result = [];
deferred = $q.defer();
var db = window.openDatabase("Database", "1.0", "Cordova borna", 200000);
db.transaction(function(tx) 
{ tx.executeSql("select fav from cars where id_car="+idcom, [], function(tx, res) 
  { 
	  for(var i = 0; i < res.rows.length; i++)
	  {
  result.push({fav : res.rows.item(i).fav})
  }
  deferred.resolve(result);
});
});
return deferred.promise;
},

this.faverat = function(idss,fave) 
    {//alert(idss+fave);
		var db = window.openDatabase("Database", "1.0", "Cordova borna", 200000);
        db.transaction(function(tx) 
        {
return tx.executeSql("UPDATE cars SET fav="+fave+" where id_car="+idss , [], function(tx, res) 
            {
                return true;
            });
        });
        return false;
    },
this.UserImg=function(imageURI,file_name,counts){
         	var deferred, result = [];
            var deferred = $q.defer();
			var options = new FileUploadOptions();
			options.fileKey="file";
			options.fileName=imageURI.substr(imageURI.lastIndexOf('/')+1);
			var params = {};
			params.value1 = file_name;
			params.value2  = counts;
			options.params = params;
			var ft = new FileTransfer();
			ft.upload(imageURI, encodeURI('http://www.borna-grp.ir/sabt_kh.php'),
				function(r){
					//console.log("Code = " + r.responseCode);
					//alert("Response = " + r.response);
					//console.log("Sent = " + r.bytesSent);
					deferred.resolve(r.response);

				},
				function(error){
					//alert("An error has occurred: Code = " + error.code);
					//console.error("upload error source " + error.source);
					//console.error("upload error target " + error.target);
					deferred.reject(error);

				}, options);

              return deferred.promise;
               },	
             this.idreg = function()
						{  
						var deferred, result = [];
						deferred = $q.defer();
						var db = window.openDatabase("Database", "1.0", "Cordova borna", 200000);
						db.transaction(function(tx) 
						{ tx.executeSql("SELECT * FROM settings where title='id_reg'", [], function(tx, res) 
						{ 
						result=res.rows.item(0).valuem;
						deferred.resolve(result);
						});
						});
						return deferred.promise;
						},
		this.insertcod = function(idss) 
		{
		var db = window.openDatabase("Database", "1.0", "Cordova borna", 200000);
        db.transaction(function(tx) 
        {
            return tx.executeSql('INSERT INTO settings(title,valuem) values("id_reg","'+idss+'")' , [], function(tx, res) 
            {
                return true;
            });
        });
        return false;
    }		
this.getfaver = function()
  {   
	  var deferred, result = [];
	  deferred = $q.defer();
	  var db = window.openDatabase("Database", "1.0", "Cordova borna", 200000);
	  db.transaction(function(tx) 
	  {
	   tx.executeSql("select DISTINCT id_car,name,pic,direct from cars where fav=1", [], function(tx, res) 
		  {//alert(res.rows.length);
		for(var i = 0; i < res.rows.length; i++)
		{
		  result.push({ids : res.rows.item(i).id_car, name : res.rows.item(i).name, pic: res.rows.item(i).pic,fav : res.rows.item(i).fav, direct: res.rows.item(i).direct})
		}
		  deferred.resolve(result);
		});
	  });
	  return deferred.promise;
    },
this.show_alert = function()
  {   
	  var deferred, result = [];
	  deferred = $q.defer();
	  var db = window.openDatabase("Database", "1.0", "Cordova borna", 200000);
	  db.transaction(function(tx) 
	  { tx.executeSql("select * from settings where uptime=0 and flag=1", [], function(tx, res) 
		  {
		for(var i = 0; i < res.rows.length; i++)
		{
		  result.push({ids : res.rows.item(i).ids,title : res.rows.item(i).title, valuem : res.rows.item(i).valuem,flag : res.rows.item(i).flag, type : res.rows.item(i).type})
		}
		  deferred.resolve(result);
		});
	  });
	  return deferred.promise;
    },
	this.up_alert = function(idss)
  {  // alert(idss);
	 var db = window.openDatabase("Database", "1.0", "Cordova borna", 200000);
        db.transaction(function(tx) 
        {
            return tx.executeSql("UPDATE settings SET uptime=1 where ids="+idss , [], function(tx, res) 
            {
                return true;
            });
        });
        return false;
    }
});