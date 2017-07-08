
// JavaScript Document
var App = angular.module('App', ['ngSanitize'] );

App.controller('CenterCTRL', function ($scope,todoServicez,$http) {
$scope.logosazman="logo-razi.png";	//logo sazman
	
//////////////////////////////////////////// show company	
$http.get("company.json").then(function(response) {
	$scope.company = response.data.items;
});

/////////////////check update
var update=document.getElementById('update').value;
if(update==0){
	document.getElementById('update').value=1;
	$http.get("company.json").then(function(response) {
    $scope.vup=response.data.setting[0].value;
	//alert($scope.vup);
});
 $http.get("http://borna-grp.ir/api.php?setting=update").then(function(response) {
  $scope.iup=response.data.setting[0].value;
  //alert($scope.iup);
if($scope.iup>$scope.vup){//alert('fjf');
	document.getElementById('uppo').style.display='block';
	}
});
}  
/////////////////////////////////////////tell cell
$scope.tellb = function (tells) {
  document.location.href = 'tel:'+tells;
};
/////////////////////////////////////////tell cell
$scope.smsb = function (sms) {
  document.location.href = 'sms:'+sms;
};
//////////////////////////////////////show book
$scope.books = function (ides) {
 var bookid=document.getElementById('bookid').value;
	//alert(bookid);
	document.getElementById('loadii').style.display='none';
if(bookid==0){
	    document.getElementById('bookid').value=1;
		document.getElementById('loadii').style.display='block';
	$http.get("http://borna-grp.ir/api.php?books=3").then(function(response) {
	$scope.mbooks = response.data.books;
	
	 	document.getElementById('loadii').style.display='none';
});	
}
};

$scope.dowbooks = function (URL,File_Name,ids) {
todoServicez.dbook(ids).then(function(items)
{ 
if(items!==0){
	window.open("file:///storage/sdcard0/borna/pdf/"+File_Name, '_system', '');
}else{


var Onlins=document.getElementById('online').value;
if(Onlins==0){
Toast_Material({ content : "اتصال شما به اینترنت برقرار نیست !!", updown:"bottom", position:"center", align:"center" });	
return 0;
}

Toast_Material({ content : "دریافت فایل کتاب آغاز شد", updown:"bottom", position:"center", align:"center" });	

document.getElementById('bloader'+ids).style.visibility="visible";
var urls=URL+File_Name;
//alert(urls);
var fileTransfer = new FileTransfer();
var uri = encodeURI(urls);
fileTransfer.download(
uri,
"file:///storage/sdcard0/borna/pdf/"+File_Name,
function(entt) {
},
function(error) {
	todoServicez.downbook(ids);
  console.log("upload error code" + error.message);
},
false,
{
  headers: {
	  "Authorization": "Basic dGVzdHVzZXJuYW1lOnRlc3RwYXNzd29yZA=="
  }
}
);
fileTransfer.onprogress = function(progressEvent) {
		if (progressEvent.lengthComputable) {
			var perc=0;
			perc = Math.floor(progressEvent.loaded / progressEvent.total * 100);
			
			document.getElementById('bloader'+ids).innerHTML=perc+'%';
			if(perc==100){
				todoServicez.upbook(ids);
				window.open("file:///storage/sdcard0/borna/pdf/"+File_Name, '_system', '');
				document.getElementById('bloader'+ids).style.visibility="hidden";
				document.getElementById('bloader'+ids).style.display='none';
				}
			//statusDom.innerHTML = perc + "% loaded...";
		} else {
			
		}
	};

	}
});

};

/////////////////////////////////show links - pyvand ha
$scope.linkss = function (ides) {
 	//document.getElementById('loadivc').style.display='block';
	$http.get("http://borna-grp.ir/api.php?id_link=3").then(function(response) {
	$scope.links = response.data.links;
	//alert(response.data.shobe[0].ids);
	document.getElementById('loadivc').style.display='none';
});	
};
///////////////////////////////show car	
$scope.comp_id = function (ides) {
	//alert(ides);
	$http.get("company.json").then(function(response) {
	$scope.cars = response.data.cars;
	  $scope.pageid=ides;
});	
};

/////////////////////////////////show khodro
$scope.khodro = function (ides) {
//alert(ides);
	    document.getElementById('shobeid').value=1;
		document.getElementById('loadik').style.display='block';
	$http.get("ghate.json").then(function(response) {
    $scope.ghate=response.data.items;
			document.getElementById('loadik').style.display='none';
});	

};
$scope.khods = function (ides) {
	 document.getElementById('idghate').value=ides;	
	for(var i=1; i<=30 ;i++){ 
     document.getElementById('khodro'+i).style.display='none';		
	}
	var view=document.getElementById('khodro'+ides).style.display;	
	
	$http.get("ghate.json").then(function(response) {
	$scope.des = response.data.des;
	  $scope.desid=ides;
});	
if(view=='none'){
     document.getElementById('khodro'+ides).style.display='block';		
		}else{
     document.getElementById('khodro'+ides).style.display='none';		
	}

};
 
/////////////////////////////////show marakez
$scope.markaz = function (ides) {
		var shobeid=document.getElementById('shobeid').value;
if(shobeid==0){
	    document.getElementById('shobeid').value=1;
			document.getElementById('loadim').style.display='block';
	$http.get("http://borna-grp.ir/api.php?id=3&type=1").then(function(response) {
	$scope.shobe = response.data.shobe;
	//alert(response.data.shobe[0].ids);
			document.getElementById('loadim').style.display='none';
});	
}
};
///////////////////////////////// show shobe
$scope.shob = function (ides) {
	var view=document.getElementById('shob'+ides).style.display;
	if(view=='none'){
document.getElementById('shob'+ides).style.display='block';		
		}else{
document.getElementById('shob'+ides).style.display='none';		
	}

};

$scope.bazdid = function (ides) {
	  var bazdidid=document.getElementById('bazdidid').value;
	  if(bazdidid==0){
		  document.getElementById('bazdidid').value=1;
		  document.getElementById('loadiv').style.display='block';
			$http.get("http://borna-grp.ir/api.php?id=3&type=2").then(function(response) {
			$scope.mbazdid = response.data.shobe;
			document.getElementById('loadiv').style.display='none';
	  });	
	  }
};
$scope.mbaz = function (ides) {
	//alert(ides);
	var view=document.getElementById('bazdid'+ides).style.display;
	if(view=='none'){
     document.getElementById('bazdid'+ides).style.display='block';		
		}else{
     document.getElementById('bazdid'+ides).style.display='none';		
	}

};

//////////////////////////////////////noeen daste khodro
$scope.noeevn = function () {
	var value = document.getElementById('groh').value; 
	document.getElementById('loadingo').style.display="block";
	 document.getElementById('noeevn').style.display='none';	
 $http.get("http://borna-grp.ir/api.php?onevan="+value).then(function(response) {
	$scope.noeencar = response.data.onevan;
	//alert($scope.noeencar );
});	
 $http({
  method  : 'POST',
  url     : 'http://www.borna-grp.ir/api.php',
  data    : $.param({usedid:value}),  // pass in data as strings
  headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
 })
  .success(function(response) {
	 $scope.usedn=response.usedid;
	 	document.getElementById('loadingo').style.display="none";
 	document.getElementById('noeevn').style.display="block";
  });
};
//////////////////////////////////////noeen daste khodro baray hagh bime 2
$scope.noeevn2 = function () {
	var value = document.getElementById('groh2').value; 
	document.getElementById('loadingo2').style.display="block";
	 document.getElementById('noeevn2').style.display='none';	
 $http.get("http://borna-grp.ir/api.php?onevan="+value).then(function(response) {
	$scope.noeencar = response.data.onevan;
	//alert($scope.noeencar );
});	
 $http({
  method  : 'POST',
  url     : 'http://www.borna-grp.ir/api.php',
  data    : $.param({usedid:value}),  // pass in data as strings
  headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
 })
  .success(function(response) {
	 $scope.usedn=response.usedid;
	 	document.getElementById('loadingo2').style.display="none";
 	document.getElementById('noeevn2').style.display="block";
  });
};
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
 $('#owl-demo .one').css("display", "inline"); 
$('#owl-demo .one img').attr('src', src);
$('#myone img').attr('src', src);
        break;
    case 2:
	 $('#owl-demo .two').css("display", "inline"); 
$('#owl-demo .two img').attr('src', src);
$('#mytwo img').attr('src', src);
        break;
     case 3:
	  $('#owl-demo .three').css("display", "inline"); 
$('#owl-demo .three img').attr('src', src);
$('#mythree img').attr('src', src);
        break;
    case 4:
	 $('#owl-demo .four').css("display", "inline"); 
$('#owl-demo .four img').attr('src', src);
$('#myfour img').attr('src', src);
   
        break;		
    case 5:

 $('#owl-demo .five').css("display", "inline"); 
 $('#owl-demo .five img').attr('src', src);
$('#myfive img').attr('src', src);
        break;			
}
}
}
	  });

};

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
 };
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
///////////////////////////////////////////////// محاسبه بیمه شخص ثالث
 $scope.bime = {};	
 
  $scope.showso = function() {
	if($scope.bime.yes){
		document.getElementById('showitme').style.display='block';
	}else{
         document.getElementById('showitme').style.display='none';	
	}
 };
 

$scope.mohasebe = function(salo) {
	if($scope.bime.yes){
		document.getElementById('showitme').style.display='block';
	}else{
         document.getElementById('showitme').style.display='none';	
	}
 var dateb=document.getElementById('datepp').value;
 
$scope.caridm =($scope.caridp)-10000;
//alert($scope.caridm);
var online=document.getElementById('online').value;
 //alert($scope.bime.sal);
//var laImage = document.getElementById('largeImage0').src;	
if(!$scope.bime.sal){

Toast_Material({ content : "لطفا  تمام فیلد های موجود را تکمیل نمایید.", updown:"bottom", position:"center", align:"center" });	

}else
if(online==0){
Toast_Material({ content : "اتصال به اینترنت برقرار نیست!", updown:"bottom", position:"center", align:"center" });	
}else
{	

document.getElementById('showri').innerHTML='در حال محاسبه ...';
Toast_Material({ content : "برنامه در حال ارسال اطلاعات می باشد لطفا منتظر بمانید!", updown:"bottom", position:"center", align:"center" });	
  $http({
  method  : 'POST',
  url     : 'http://www.borna-grp.ir/api.php',
  data    : $.param({used:$scope.bime.used,yes:$scope.bime.yes,sefr:$scope.bime.sefr,idcar:$scope.caridm,engh:dateb,sal:$scope.bime.sal,sabe_m:$scope.bime.mali,sabe_s:$scope.bime.sarn}),  // pass in data as strings
  headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
 })
  .success(function(response) {
   document.getElementById('showri').innerHTML='مبلغ حق بیمه : '+response.hbimes[0].mablagh+' ریال ';
  Toast_Material({ content : "محاسبه به اتمام رسید", updown:"bottom", position:"center", align:"center" });

  });

}

};

 
$scope.used = function(idtype) {
	document.getElementById('loading').style.display="block";
		document.getElementById('showmm').style.display="none";
$scope.idtype=idtype;
var online=document.getElementById('online').value;

if(online==0){
Toast_Material({ content : "اتصال به اینترنت برقرار نیست!", updown:"bottom", position:"center", align:"center" });	
}else
{	// alert(idtype);
 $http({
  method  : 'POST',
  url     : 'http://www.borna-grp.ir/api.php',
  data    : $.param({usedid:$scope.idtype}),  // pass in data as strings
  headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
 })
  .success(function(response) {
	 $scope.usedn=response.usedid;
 	document.getElementById('showmm').style.display="block";
		document.getElementById('loading').style.display="none";
  });

}

};

$scope.wopen = function(links) {
	//alert(links);
 window.open(links, '_system', '');
};
  
///////////////////////////////////////////////// محاسبه بیمه شخص ثالث 2
 $scope.bime2 = {};	
 
  $scope.showso2 = function() {
	if($scope.bime2.yes){
		document.getElementById('showitme2').style.display='block';
	}else{
         document.getElementById('showitme2').style.display='none';	
	}
 };
 

$scope.mohasebe2 = function(salo) {
	
	if($scope.bime2.yes){
		document.getElementById('showitme2').style.display='block';
	}else{
         document.getElementById('showitme2').style.display='none';	
	}
 var dateb=document.getElementById('datepp2').value;
 
//alert($scope.caridm);
var online=document.getElementById('online').value;
 // alert($scope.bime2.sefr);
//var laImage = document.getElementById('largeImage0').src;	
if(!$scope.bime2.sal){

Toast_Material({ content : "لطفا  تمام فیلد های موجود را تکمیل نمایید.", updown:"bottom", position:"center", align:"center" });	

}else
if(online==0){
Toast_Material({ content : "اتصال به اینترنت برقرار نیست!", updown:"bottom", position:"center", align:"center" });	
}else
{	

document.getElementById('showri2').innerHTML='در حال محاسبه ...';
Toast_Material({ content : "برنامه در حال ارسال اطلاعات می باشد لطفا منتظر بمانید!", updown:"bottom", position:"center", align:"center" });	
  $http({
  method  : 'POST',
  url     : 'http://www.borna-grp.ir/api.php',
  data    : $.param({used:$scope.bime2.used,yes:$scope.bime2.yes,sefr:$scope.bime2.sefr,noee:$scope.bime2.noee,engh:dateb,sal:$scope.bime2.sal,sabe_m:$scope.bime2.mali,sabe_s:$scope.bime2.sarn}),  // pass in data as strings
  headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
 })
  .success(function(response) {
	//  alert(response);
   document.getElementById('showri2').innerHTML='مبلغ حق بیمه : '+response.hbimes[0].mablagh+' ریال ';
  Toast_Material({ content : "محاسبه به اتمام رسید", updown:"bottom", position:"center", align:"center" });

  });

}

};
///////////////////////////////////////// لیست رشته ها
$scope.list_kar = function (ides) {
	//alert(ides);
	$http.get("http://www.borna-grp.ir/api.php?id_reshte=1").then(function(response) {
	$scope.noeen = response.data.reshteha;
	   
});	
};

  ///////////////////////////////////////////////// محاسبه کارمزد
 $scope.karmozd = {};	
$scope.karmozd = function(salo) {
 
var online=document.getElementById('online').value;
 
if(!$scope.karmozd.reshte){

Toast_Material({ content : "لطفا  تمام فیلد های موجود را تکمیل نمایید.", updown:"bottom", position:"center", align:"center" });	

}else
if(online==0){
Toast_Material({ content : "اتصال به اینترنت برقرار نیست!", updown:"bottom", position:"center", align:"center" });	
}else
{	

document.getElementById('showri3').innerHTML='در حال محاسبه ...';
Toast_Material({ content : "برنامه در حال ارسال اطلاعات می باشد لطفا منتظر بمانید!", updown:"bottom", position:"center", align:"center" });	
  $http({
  method  : 'POST',
  url     : 'http://www.borna-grp.ir/api.php',
  data    : $.param({noe:$scope.karmozd.noe,moaref:$scope.karmozd.moaref,hagh:$scope.karmozd.hagh,karmozd:$scope.karmozd.reshte }),  // pass in data as strings
  headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
 })
  .success(function(response) {
   document.getElementById('showri3').innerHTML='مبلغ کارمزد: '+response.karmozd[0].mablagh+' ریال ';
  Toast_Material({ content : "محاسبه به اتمام رسید", updown:"bottom", position:"center", align:"center" });

  });

}

};
///////////////////////////////////////////////// ثبت یاداوری ها
 $scope.yad = {};	
  $scope.yadavariw = function() {
 
var name=$scope.yad.name;
var date= document.getElementById('sheew').innerHTML;
var tell=$scope.yad.tell;	

  
if(!$scope.yad.name){
Toast_Material({ content : "لطفا  تمام فیلد های موجود را تکمیل نمایید.", updown:"bottom", position:"center", align:"center" });
return 0;	
}
Toast_Material({ content : "برنامه در حال ارسال اطلاعات می باشد لطفا منتظر بمانید!", updown:"bottom", position:"center", align:"center" });	
todoServicez.yadavar(name,date,tell);
Toast_Material({ content : "ثبت با موفقیت انجام شد", updown:"bottom", position:"center", align:"center" });
$scope.yad.name="";
$scope.yad.dates="";
$scope.yad.tell="";	
};
 
 //////////////////////////////////////// نمایش لیست یادآوری ها
$scope.list_yad = function () {
//faver  
todoServicez.list_yad().then(function(items)
{//alert(items[0].ids);
	$scope.listyadc = items;
});
};
///////////////////////////////// show list yad avari
$scope.listy = function (ides) {
	var view=document.getElementById('listy'+ides).style.display;
	if(view=='none'){
document.getElementById('listy'+ides).style.display='block';		
		}else{
document.getElementById('listy'+ides).style.display='none';		
	}

};
///////////////////////////////////////////////// نمایش نقشه گوگل
$scope.google = function(addr) {
	$scope.ahobeadd=addr;
  $.mobile.changePage( "#google", { transition: "slideup"} );

};  
/////////////////////////////////////////////////////////////////////////ersal form sabt bimegozar
$scope.khodr = {};	

$scope.khodro_one = function () {
var fname=$scope.khodr.fname;
var lname=$scope.khodr.lname;
var sex=$scope.khodr.sexx; 
var tell=$scope.khodr.tell;
var cella=$scope.khodr.cell;
var address=$scope.khodr.address; 
var type=$scope.khodr.type;
var eqtesadi=$scope.khodr.eqtesadi;
var shmeli=$scope.khodr.shmeli;
var codemeli=$scope.khodr.codemeli; 
var date= document.getElementById('kh_tavalod').value;
if(sex==undefined){sex=0;}
if(type==undefined){type=0;}
var cell = cella.toString();
if(cell.length==11){}else{Toast_Material({ content : "لطفا شماره تلفن همراه را صحیح وارد نمایید", updown:"bottom", position:"center", align:"center" });	
 return 0;} 
if(codemeli==undefined  || codemeli==''){codemeli=0;}else{
var codemelic = codemeli.toString();	
var codd=$scope.Codemeli(codemelic);
if(codd==false){Toast_Material({ content : "لطفا کد ملی را صحیح وارد نمایید", updown:"bottom", position:"center", align:"center" });	
 return 0;}
}
if(shmeli==undefined){shmeli=0;}
if(eqtesadi==undefined){eqtesadi=0;}
if(fname==undefined || lname==undefined || tell==undefined || address==undefined){
 Toast_Material({ content : "لطفا جهت ارسال فیلد ها را کامل کنید", updown:"bottom", position:"center", align:"center" });	
 return 0;} 
Toast_Material({ content : "در حال ارسال اطلاعات لطفا منتظر بمانید", updown:"bottom", position:"center", align:"center" });		
  $http({
  method  : 'POST',
  url     : 'http://www.borna-grp.ir/sabt_kh.php',
  data    : $.param({fname: fname, lname:lname, tell:tell,cell: cell, address:address, type:type,sex: sex, codemeli:codemeli, date:date,shmeli:shmeli,eqtesadi: eqtesadi}),  // pass in data as strings
  headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
 })
.success(function(data) {
document.getElementById('bimgozar').value=data;
$scope.khodr ={};
 $.mobile.changePage( "#khodros", { transition: "slideup"} );
 Toast_Material({ content : "ثبت با موفقیت ارسال به بخش بعدی", updown:"bottom", position:"center", align:"center" });	
  });
 };
 $scope.Codemeli = function (input) {
    if (!/^\d{10}$/.test(input)
|| input=='0000000000'
|| input=='1111111111'
|| input=='2222222222'
|| input=='3333333333'
|| input=='4444444444'
|| input=='5555555555'
|| input=='6666666666'
|| input=='7777777777'
|| input=='8888888888'
|| input=='9999999999')
        return false;
    var check = parseInt(input[9]);
    var sum = 0;
    var i;
    for (i = 0; i < 9; ++i) {
        sum += parseInt(input[i]) * (10 - i);
    }
    sum %= 11;
    return (sum < 2 && check == sum) || (sum >= 2 && check + sum == 11);
}
 
 /////////////////////////////////////////////////////////////////////////ersal form sabt khodro
$scope.khodro_two = function () {
var shahr=$scope.khodr.shahr;
var sal=$scope.khodr.sal;
var sh_mot=$scope.khodr.sh_mot; 
var ma_shm=$scope.khodr.ma_shm;
var sh_sha=$scope.khodr.sh_sha;
var ma_sha=$scope.khodr.ma_sha; 
var zarfiat=$scope.khodr.zarfiat;
var groh=$scope.khodr.groh;
var noee=$scope.khodr.noee; 
var used=$scope.khodr.used;
var rang=$scope.khodr.rang;
var keshvar=$scope.khodr.keshvar; 
var id_bg= document.getElementById('bimgozar').value;

if(sal==undefined || sh_mot==undefined || sh_sha==undefined || zarfiat==undefined){
Toast_Material({ content : "لطفا جهت ارسال فیلد ها را کامل کنید", updown:"bottom", position:"center", align:"center" });	
 return 0;}
Toast_Material({ content : "در حال ارسال اطلاعات لطفا منتظر بمانید", updown:"bottom", position:"center", align:"center" });		
  $http({
  method  : 'POST',
  url     : 'http://www.borna-grp.ir/sabt_kh.php',
  data    : $.param({shahr: shahr, sal:sal, sh_mot:sh_mot,ma_shm: ma_shm, sh_sha:sh_sha, ma_sha:ma_sha,zarfiat: zarfiat, groh:groh, noee:noee,used: used, rang:rang, keshvar:keshvar,id_bg: id_bg}),  // pass in data as strings
  headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
 })
.success(function(data) {
$scope.khodr ={};
$scope.khodro(1);
$.mobile.changePage( "#khodro", { transition: "slideup"} );
Toast_Material({ content : "ثبت با موفقیت ارسال به بخش بعدی", updown:"bottom", position:"center", align:"center" });	
  });
 };

/////////////////////////////////////////////////////////////////////////ersal form sabt ghate
$scope.ghate = {};	

$scope.khodro_seven = function (ides) {
var vaziat=$scope.ghate.vaziat;
var khesarat=$scope.ghate.khesarat;
var text=$scope.ghate.texte; 
var radio=$scope.ghate.radio;
var check=$scope.ghate.check;
var ids=document.getElementById('idghate').value; 
var id_bg= document.getElementById('bimgozar').value;
if(!check){check=0; }else{check=1;}
if(!radio){radio=0;}
if(text==undefined){text='';}
if(khesarat=="" ){
Toast_Material({ content : "لطفا جهت ارسال فیلد ها را کامل کنید", updown:"bottom", position:"center", align:"center" });	
 return 0;}
Toast_Material({ content : "در حال ارسال اطلاعات لطفا منتظر بمانید", updown:"bottom", position:"center", align:"center" });	
  $http({
  method  : 'POST',
  url     : 'http://www.borna-grp.ir/sabt_kh.php',
  data    : $.param({vaziat: vaziat, khesarat:khesarat, text:text,radio: radio,ids:ids, check:check,id_bg: id_bg }),  // pass in data as strings
  headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
 })
.success(function(data) {
 $scope.ghate.texte="";
 $scope.ghate.khesarat="";
document.getElementById('khshow'+ides).style.display='none';	
Toast_Material({ content : "ثبت با موفقیت ارسال به بخش بعدی", updown:"bottom", position:"center", align:"center" });	
  });
 };
  
  /////////////////////////////////////////////////////////////////////////ersal form sabt vaziat

$scope.khodro_three = function () {
var va_ez=$scope.khodr.va_ez;
var ghva=$scope.khodr.ghva;
var va_vz=$scope.khodr.va_vz; 
var khesarat=$scope.khodr.khesarat;
var id_bg= document.getElementById('bimgozar').value;
if(ghva==undefined || khesarat==undefined ){
Toast_Material({ content : "لطفا جهت ارسال فیلد ها را کامل کنید", updown:"bottom", position:"center", align:"center" });	
 return 0;}
	Toast_Material({ content : "در حال ارسال اطلاعات لطفا منتظر بمانید", updown:"bottom", position:"center", align:"center" });	
  $http({
  method  : 'POST',
  url     : 'http://www.borna-grp.ir/sabt_kh.php',
  data    : $.param({va_ez: va_ez, ghva:ghva, va_vz:va_vz,khesarat: khesarat,id_bg: id_bg}),  // pass in data as strings
  headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
 })
.success(function(data) {
 $scope.khodr ={};
Toast_Material({ content : "ثبت با موفقیت ارسال به بخش بعدی", updown:"bottom", position:"center", align:"center" });	
  });
 };
 
   /////////////////////////////////////////////////////////////////////////ersal form sabt soti
$scope.soti = {};	
$scope.khodro_four = function () {
var nooe=$scope.soti.nooe;
var noee=$scope.soti.noee;
var keshvar=$scope.soti.keshvar; 
var name=$scope.soti.name;
var shomare=$scope.soti.shomare;
var ghymat=$scope.soti.ghymat;
var tba=$scope.soti.tba; 
var tbe=$scope.soti.tbe;
var wate=$scope.soti.wate;
var markb=$scope.soti.markb;
var ghymatb=$scope.soti.ghymatb; 
var id_bg= document.getElementById('bimgozar').value;
if(ghymatb==undefined || tbe==undefined || name==undefined || shomare==undefined){
Toast_Material({ content : "لطفا جهت ارسال فیلد ها را کامل کنید", updown:"bottom", position:"center", align:"center" });	
 return 0;}
	Toast_Material({ content : "در حال ارسال اطلاعات لطفا منتظر بمانید", updown:"bottom", position:"center", align:"center" });		
  $http({
  method  : 'POST',
  url     : 'http://www.borna-grp.ir/sabt_kh.php',
  data    : $.param({nooe: nooe, noee:noee, keshvar:keshvar,name: name,shomare: shomare, ghymat:ghymat, tba:tba,tbe: tbe,wate:wate, markb:markb,ghymatb: ghymatb,id_bg: id_bg}),  // pass in data as strings
  headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
 })
.success(function(data) {
	$scope.soti = {};	
$.mobile.changePage( "#akss", { transition: "slideup"} );
Toast_Material({ content : "ثبت با موفقیت ارسال به بخش بعدی", updown:"bottom", position:"center", align:"center" });	
  });
 };
    /////////////////////////////////////////////////////////////////////////ersal form sabt tasvir
$scope.tasvir = {};	
$scope.khodro_five = function () {
var nooe=$scope.tasvir.nooe;
var name='test';
var id_bg= document.getElementById('bimgozar').value;
var d = new Date();	
nameimage=d.getTime()+'.jpg';
namevideo=d.getTime()+'.mp4';
evv=parseInt(nooe)-1;
var Videofild = $scope.tasvir.video;;
var Imagefild= document.getElementById('imeagv').value;
var Videofild= document.getElementById('videov').value;
document.getElementById('grohw2').options[evv].disabled = true;
 if(Imagefild!=0){document.getElementById('imload').src='img/ajax-loader.gif';todoServicez.UserImg(Imagefild,nameimage,'end').then(function(items){document.getElementById('imload').src='';
  //$.mobile.changePage( "#nahai", { transition: "slideup"} );
Toast_Material({ content : "ثبت با موفقیت انجام شد بازگشت به ابتدا", updown:"bottom", position:"center", align:"center" });
 });
}
 if(Videofild!=0){document.getElementById('viload').src='img/ajax-loader.gif';todoServicez.UserImg(Videofild,namevideo,'end').then(function(items){document.getElementById('viload').src='';});}

//if( name==undefined  ){
//Toast_Material({ content : "لطفا جهت ارسال فیلد ها را کامل کنید", updown:"bottom", position:"center", align:"center" });	
// return 0;}
 Toast_Material({ content : "در حال ارسال اطلاعات لطفا منتظر بمانید", updown:"bottom", position:"center", align:"center" });	
  $http({
  method  : 'POST',
  url     : 'http://www.borna-grp.ir/sabt_kh.php',
  data    : $.param({nooe: nooe, namet: name,photo:nameimage,video:namevideo,id_bg: id_bg}),  // pass in data as strings
  headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
 })
.success(function(data) {
	$scope.tasvir = {};	
	
  });
 };
    /////////////////////////////////////////////////////////////////////////ersal form sabt soti
$scope.end = {};	
$scope.khodro_six = function () {
var gheymat=$scope.end.gheymat;
var arzeshv=$scope.end.arzeshv;
//var ghva=$scope.end.ghva;
var address=$scope.end.address;
var d = new Date();	
var date=d.getTime();
var good=$scope.end.good; 
var ghva= document.getElementById('pricer').value;
var lato= document.getElementById('lato').value;
var long= document.getElementById('long').value;
//alert(lato);
var id_bg= document.getElementById('bimgozar').value;
if(gheymat==undefined || arzeshv==undefined  ){
Toast_Material({ content : "لطفا جهت ارسال فیلد ها را کامل کنید", updown:"bottom", position:"center", align:"center" });	
 return 0;}
 if(lato==undefined  || long==undefined  ){
Toast_Material({ content : "لطفا جی پی اس گوشی خود را روشن کنید.", updown:"bottom", position:"center", align:"center" });	
 return 0;}
 Toast_Material({ content : "در حال ارسال اطلاعات لطفا منتظر بمانید", updown:"bottom", position:"center", align:"center" });	
  $http({
  method  : 'POST',
  url     : 'http://www.borna-grp.ir/sabt_kh.php',
  data    : $.param({gheymat: gheymat, arzeshv:arzeshv, ghva:ghva,address: address,long:long,lato:lato, date:date, good:good, id_bg: id_bg}),  // pass in data as strings
  headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
 })
.success(function(data) {
	$scope.end = {};
$.mobile.changePage( "#bimegozar", { transition: "slideup"} );
Toast_Material({ content : "ثبت با موفقیت ارسال به بخش بعدی", updown:"bottom", position:"center", align:"center" });	
  });
 };
///////////////////////////////////////////////// ارسال تصویر
 $scope.users = {};	
$scope.sendform = function(urlpic) {
online=document.getElementById('online').value;

$scope.user.company='no';
//var laImage = document.getElementById('largeImage0').src;	
//alert(laImage);
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
if(items=='end' ){
$scope.btshow=false;	
$scope.user.cars="";
Toast_Material({ content : "ارسال تصاویر به اتمام رسید!", updown:"bottom", position:"center", align:"center" });
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
} 
}
};
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
    $.mobile.changePage( "#onlinee", { transition: "slideup"} );
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
    $.mobile.changePage( "#onlinee", { transition: "slideup"} );
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
this.dbook = function(para)
  {  // alert(para);
	  var deferred, result = [];
	  deferred = $q.defer();
	  var db = window.openDatabase("Database", "1.0", "Cordova borna", 200000);
	  db.transaction(function(tx) 
	  { tx.executeSql("SELECT id_book FROM books where id_book='"+para+"'", [], function(tx, res) 
	  { //alert(res.rows.length);
	  if(res.rows.length==0){result=0;

	  }else{result=res.rows.item(0).id_book;}
	  //alert(result);
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
	//alert(imageURI+file_name+counts);
         	var deferred, result = [];
             deferred = $q.defer();
			var options = new FileUploadOptions();
			options.fileKey="filed";
			options.fileName=imageURI.substr(imageURI.lastIndexOf('/')+1);
			options.mimeType = "image/jpeg";
			console.log(options.fileName);
			var params = {};
			params.valuee = file_name;
			params.valuee2  = counts;
			options.params = params;
		    options.chunkedMode = false;
			var ftd = new FileTransfer();
			ftd.upload(imageURI, encodeURI('http://www.borna-grp.ir/sabt_kh.php'),
				function(r){
				//console.log("Code = " + r.responseCode);
				// alert("Response = " + r.response);
				//console.log("Sent = " + r.bytesSent);
					 deferred.resolve(r.response);

				},
				function(error){
					//alert("An error has occurred: Code = " + error.code);
					// console.error("upload error source " + error.source);
					// console.error("upload error target " + error.target);
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
    },	
this.yadavar = function(name,date,tell) 
		{
		var db = window.openDatabase("Database", "1.0", "Cordova borna", 200000);
        db.transaction(function(tx) 
        {
            return tx.executeSql('INSERT INTO yadavari(name,date,tell) values("'+name+'","'+date+'","'+tell+'")' , [], function(tx, res) 
            {
                return true;
            });
        });
        return false;
    },	
this.list_yad = function()
  {   
	  var deferred, result = [];
	  deferred = $q.defer();
	  var db = window.openDatabase("Database", "1.0", "Cordova borna", 200000);
	  db.transaction(function(tx) 
	  {
	   tx.executeSql("select DISTINCT * from yadavari order by date DESC", [], function(tx, res) 
		  {//alert(res.rows.length);
		for(var i = 0; i < res.rows.length; i++)
		{
		  result.push({ids : res.rows.item(i).id, name : res.rows.item(i).name, tell: res.rows.item(i).tell,date : res.rows.item(i).date });
		}
		  deferred.resolve(result);
		});
	  });
	  return deferred.promise;
    },			
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
this.downbook = function(idss) 
    {//alert(idss+fave);
		var db = window.openDatabase("Database", "1.0", "Cordova borna", 200000);
        db.transaction(function(tx) 
        {
            return tx.executeSql("DELETE FROM `books` WHERE id_book="+idss , [], function(tx, res) 
            {
                return true;
            });
        });
        return false;
    },
this.upbook = function(idss) 
    {//alert(idss+fave);
		var db = window.openDatabase("Database", "1.0", "Cordova borna", 200000);
        db.transaction(function(tx) 
        {
            return tx.executeSql('INSERT INTO books(id_book) values("'+idss+'")' , [], function(tx, res) 
            {
                return true;
            });
        });
        return false;
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