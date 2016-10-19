function Start(){;;}
 var Lmx = 0
 var Lmy = 0
var pressed = false
var tmp_dash

// -  -  -  -for selection function -  -  -  -  -
var mssel=[];
var mssel7=0;
// -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -

var Deleted=[];
var EColor=[]; //The array of elements color
var NElements=[]; //the array of the names such as "polygons", "lines", "textes "
var MElements=[]; //the array of the_arrays_of_points (I have to keep it in memory)=MEle[msss[[x,y],[x,y],[x,y]]]
var Elements=[]; //all the drawn elements (as polylines, etc)
var eLcount=0;

var lines=[]; //all the lines (made of two points each).. the lines of a polyline
var licount=0;
var msss=[]; //all the points of a polyline or a polygone... just points
var mscount=0;
var mspart=0

var draw;
var polyline;
var wT, hT, wTH, hTH;
var ESX, ESY, kf;
var Lkf=1;

var RGB = [15,15,7];
var polygon23;

var drawTimer = null

//---M-a-k-s---
function DRW(){
  draw.viewbox(ESX-kf*wTH/2,ESY-kf*hTH/2,wTH*kf, hTH*kf);
}
//---M-a-k-s---
function TxtColor(R,G,B){
	var Txt="#";
		if (R<=15){Txt=Txt+'0'+R.toString(16);} else {Txt=Txt+R.toString(16);}
		if (G<=15){Txt=Txt+'0'+G.toString(16);} else {Txt=Txt+G.toString(16);}
		if (B<=15){Txt=Txt+'0'+B.toString(16);} else {Txt=Txt+B.toString(16);}		
	return Txt;
}
//---M-a-k-s---
var D_blink = "#000000";
function Blink() {
	if (D_blink == "#000000"){D_blink="#FFFFFF";}
	else {D_blink = "#000000";}
	return D_blink;
	
}
//---M-a-k-s---
function touchEvents(){
//-------------------------------------------------------------------
    document.body.addEventListener('touchmove', function(event) {
		G_move(event.changedTouches[0].pageX,event.changedTouches[0].pageY);
        event.preventDefault();
    }, false);
//-------------------------------------------------------------------
	document.body.addEventListener('touchstart', function(event) {
		G_Down(event.changedTouches[0].pageX,event.changedTouches[0].pageY);
		event.preventDefault();
    }, false);
 //-------------------------------------------------------------------
 	 document.body.addEventListener('touchend', function(event) {
		G_up(event.changedTouches[0].pageX,event.changedTouches[0].pageY);
        event.preventDefault();
    }, false);
 //-------------------------------------------------------------------	
 	 document.body.addEventListener('mousedown', function(event) {
		G_Down(event.pageX,event.pageY);
        event.preventDefault();
    }, false);
 //-------------------------------------------------------------------	
	 document.body.addEventListener('mouseup', function(event) {
		 G_up(event.pageX,event.pageY);
        event.preventDefault();
    }, false);
 //-------------------------------------------------------------------	
	document.body.addEventListener('mousemove', function(event) {
		G_move(event.pageX,event.pageY);
		event.preventDefault();
    }, false);
 //------------------------------------------------------------------- 
 

  //-------------------------------------------------------------------
function G_Down(x,y){
  //console.log("DOWN="+x)
  mscount = 0
  mspart = 0
  msss.length=0
  	Lmx = clcX(x)
  	Lmy = clcY(y)
	msss[mscount++] = [clcX(x),clcY(y)]
	pressed = true
  drawTimer = setInterval(DrawSome,100)
}
 //-------------------------------------------------------------------

 //-------------------------------------------------------------------
function G_up(x,y){
     if (pressed){
	   if (tmp_dash){
		   lines[licount++]=tmp_dash
		   var x23 = clcX(x)
		   var y23 = clcY(y)
		   msss[mscount++] = [x23,y23];
		   //console.log("xy23="+x23+"  "+y23);
		   tmp_dash = 0;
	   }
	   for (var k=0; k<licount; k++){lines[k].remove();}
	   licount=0;
     if (mscount > 1) {
			var i = eLcount ////del me immediately
			Deleted[eLcount] = 0;
			NElements[eLcount] = 'polyline';
       			Elements[eLcount] = draw.polyline(msss)
              .fill('none')
              .stroke({ width: 12, color:'#555' });
			Elements[eLcount] = draw.polyline(msss)
              .fill('none')
              .stroke({ width: 8, color:'#f4e970' });
			MElements[eLcount++] = msss.slice();	 
			console.log(i+"#0#polyline"+MElements[i][1][0]);
			if (i >0){console.log(i+"#00#polyline"+MElements[i-1][1][0]);}
     }
   }
  clearInterval(drawTimer)
	pressed = false
}
 //-------------------------------------------------------------------
 }
//---M-a-k-s---
function Document_Ready(){;;}
////////////////////////////////////////////////////////////////////
$( document ).ready(function() {

 touchEvents(); 
 
    window.onresize = function() {
      $(document.body).width(window.innerWidth).height(window.innerHeight);
    }
 //-------------------------------------------------------------------
    $(function() {
      window.onresize();
    });
 //-------------------------------------------------------------------	
	wT = $( document ).width();	
	hT = $( document ).height();
	
	wTH=Math.round((wT/100)*89);
	hTH=Math.round((hT/100)*89);

	ESX=wTH/2;
	ESY=hTH/2;
	kf=1;


	draw = SVG('drawing').size(wTH, hTH);
	var image = draw.image('../imgs/img2348.JPG')
 
	DRW();
  
 //////////////////trying the new menu///////////////
// - - - - - - - - - - - - - - - - - - - - - - - - - 

}) ;//document-ready
//---M-a-k-s---
function open_file(){
	var data="prm1=1";
			console.log("READ");
			
    $.ajax({
      type: "POST",
      dataType: "json",
      url: "read101.php", //Relative or absolute path to response.php file
      data: data,
      success: function(data) { dispatch_opened_file(data) }
    });
	DrawMode();
}
//---M-a-k-s---
function dispatch_opened_file (data) {
	//console.log("READ_SUCCESS");
	var T = data["param1"].split(" ");
	var Le23 = T.length;
	//console.log("ReadLength= "+Le23);
		  
	NElements.length=0 //the array of the names such as "polygons", "lines", "textes "
	MElements.length=0 //the array of the_arrays_of_points (I have to keep it in memory)=MEle[msss[[x,y],[x,y],[x,y]]]
	Elements.length=0 //all the drawn elements (as polylines, etc)
	eLcount=0;
		  
	for (var i=0; i<Le23-2; ){
		if (T[i]== 101){
			NElements[eLcount]="polyline";
			var Le25 = T[i+1];
			//console.log("ReadLe25="+Le25);
			msss.length = 0
				for (var n=0; n<Le25; n++){
					msss[n]=[T[i+1+1+n*2],T[i+1+1+n*2+1]];
					}
					
			MElements[eLcount]=msss.slice();
            Deleted[eLcount]=0
			Elements[eLcount++] = draw.polyline(msss).fill('none').stroke({ width: 1 });
			i+=1+1+Le25*2;
			}
		else if (T[i]==102) {
			NElements[eLcount]="polygon";
			var Le25 = T[i+1];
				  //console.log("ReadLe25="+Le25);
			msss.length = 0
			for (var n=0; n<Le25; n++){
					msss[n]=[T[i+1+1+n*2],T[i+1+1+n*2+1]];
					}
					
			MElements[eLcount]=msss.slice();
			var R23=parseInt(T[i+2+Le25*2+0]);
			var G23=parseInt(T[i+2+Le25*2+1]);
			var B23=parseInt(T[i+2+Le25*2+2]);
			//console.log("R"+R23+" G"+G23+" B"+B23+"..."+TxtColor(R23,G23,B23));
			EColor[eLcount]=[R23,G23,B23];
            Deleted[eLcount]=0
			Elements[eLcount++] = draw.polygon(msss).fill(TxtColor(R23,G23,B23));
			i+=1+1+Le25*2+3;
			} 
		else {i++;}
				 //console.log("nextNum["+i+"]="+T[i]);
		}
  
}
//---M-a-k-s---
function save_file(){
var T=[]; var cT=0;
var Le23 = MElements.length;
	for (var i=0; i< Le23; i++){
		var Le25=MElements[i].length;
		if (Deleted[i]==0){
//   -   -   -   -   -   -   -   -   -   -
			if (NElements[i] == 'polyline'){   
			console.log("##polyline");
					T[cT++]=101;
					T[cT++]=Le25+0;
					for (var n=0; n<Le25; n++){
						T[cT++]=MElements[i][n][0]; //X_of_the_point
						T[cT++]=MElements[i][n][1]; //Y_of_the_point
					}
			}
//   -   -   -   -   -   -   -   -   -   -
			if (NElements[i] == 'polygon'){  
			console.log("##polygon");			
					T[cT++]=102;
					T[cT++]=Le25+0;
					for (var n=0; n<Le25; n++){
						T[cT++]=MElements[i][n][0]; //X_of_the_point
						T[cT++]=MElements[i][n][1]; //Y_of_the_point
					}
					T[cT++]=EColor[i][0]; T[cT++]=EColor[i][1]; T[cT++]=EColor[i][2];
			}			
//   -   -   -   -   -   -   -   -   -   -			
			
		} // if Deleted[i]==0;
	} //for .. Le23 .. MElements
//  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -

function SENDfirst(a23){
	if (a23 >=cT)return;
	var i23=a23;
		var data="prm1=";
			for (var i=0; (i<100)&&(i23<cT); i++){
				data+=T[i23++]+"+"; //toString(T[i23++])+"+";
				
			}
			console.log("SENDfirst"+data);
			
    $.ajax({
      type: "POST",
      dataType: "json",
      url: "firstwrite101.php", //Relative or absolute path to response.php file
      data: data,
      success: function(data) {
		  SENDnext(i23);
      }
    });

}
//  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
//  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -

function SENDnext(a23){
	if (a23 >=cT){	SENDlast(); return;}
	var i23=a23;
		var data="prm1=";
			for (var i=0; (i<100)&&(i23<cT); i++){
				data+=T[i23++]+"+"; //toString(T[i23++])+"+";
				
			}
			console.log("SENDnext="+data);
			
    $.ajax({
      type: "POST",
      dataType: "json",
      url: "nextwrite101.php", //Relative or absolute path to response.php file
      data: data,
      success: function(data) {
		  SENDnext(i23);
      }
    });
}
//  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
//  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -

function SENDlast(a23){
	/////if (a23 >=cT)return;
	var i23=a23;
		var data="prm1=333"; //it won't be written in lastwrite101.php'
		/*	for (var i=0; (i<100)&&(i23<cT); i++){
				data+=T[i23++]+"+"; //toString(T[i23++])+"+";
				
			}*/
			console.log("SENDlast"+data);
			
    $.ajax({
      type: "POST",
      dataType: "json",
      url: "lastwrite101.php", //Relative or absolute path to response.php file
      data: data,
      success: function(data) {
		  ;//actually, SENDlast->lastwrite101.php - only closes and renames the fresh file 
      }
    });
}
//  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
	SENDfirst(0);
	DrawMode();
}
//---M-a-k-s---
function reDraw(){
  draw.clear()
  var eLcount=0
  var Le23 = MElements.length;
  console.log("MElements.length = "+ Le23)
	for (var i=0; i< Le23; i++){
		//var Le25=MElements[i].length;
		if (Deleted[i]==0){
//   -   -   -   -   -   -   -   -   -   -
			if (NElements[i] == 'polyline'){   
              console.log(i+"#2#polyline"+MElements[i][1][0]);
               Elements[i] = draw.polyline(MElements[i]).fill('none').stroke({ width: 3 });
			//
			}
//   -   -   -   -   -   -   -   -   -   -
			if (NElements[i] == 'polygon'){  
			console.log("#2#polygon"+i);			

               Elements[eLcount] = draw.polygon(MElements[i]).fill('#999').stroke({ width: 3 });
			}			
//   -   -   -   -   -   -   -   -   -   -			
			eLcount++
		} // if Deleted[i]==0;
	} //for .. Le23 .. MElements
}
//---M-a-k-s---
function clcX(x){return Math.round(ESX+(x-wTH/2)*kf);}
function clcY(y){return Math.round(ESY+(y-hTH/2)*kf);}

//---M-a-k-s---
function needSplinting(xx,yy){
    if (Math.sqrt(Math.pow((Lmx-xx),2)+Math.pow((Lmy-yy),2)) > 12)
	{return true;}
	else {return false;}
}
//---M-a-k-s---
function G_move(x,y){
	if (pressed){
    //  console.log("MOVE="+clcX(x))
    	var xx = clcX(x); 
		var yy = clcY(y);
		msss[mscount] = [xx,yy];
		if (needSplinting(xx,yy)) {
          Lmx=xx
          Lmy=yy
          mscount++ //remember current point (for possible polygon)
	}
	else {
	 /* if (tmp_dash) { tmp_dash.remove() }
	  tmp_dash = draw.line(Lmx, Lmy, xx, yy).fill('none')
	  .stroke({ width: 2, color: (D_blink)}); ;;*/
	}
      
      
    }
} 
//---M-a-k-s---
function DrawSome() {

  var t23 = mscount-mspart
if (t23>2){
    console.log(msss[mspart] + "..." +msss[mscount-1])
		ms23 = msss.slice(mspart,(mscount))
 
			Elements[eLcount] = draw.polyline(ms23).fill('none').stroke({ width: 3 });
		mspart = mscount-1	
	}
}
//---M-a-k-s---
var T=[]; var cT=0;
function saveFile(){

var Le23 = MElements.length;
	for (var i=0; i< Le23; i++){
		var Le25=MElements[i].length;
		if (Deleted[i]==0){
//   -   -   -   -   -   -   -   -   -   -
			if (NElements[i] == 'polyline'){   
			console.log("##polyline");
					T[cT++]=101;
					T[cT++]=Le25+0;
					for (var n=0; n<Le25; n++){
						T[cT++]=MElements[i][n][0]; //X_of_the_point
						T[cT++]=MElements[i][n][1]; //Y_of_the_point
					}
			}
//   -   -   -   -   -   -   -   -   -   -
			if (NElements[i] == 'polygon'){  
			console.log("##polygon");			
					T[cT++]=102;
					T[cT++]=Le25+0;
					for (var n=0; n<Le25; n++){
						T[cT++]=MElements[i][n][0]; //X_of_the_point
						T[cT++]=MElements[i][n][1]; //Y_of_the_point
					}
					T[cT++]=EColor[i][0]; T[cT++]=EColor[i][1]; T[cT++]=EColor[i][2];
			}			
//   -   -   -   -   -   -   -   -   -   -			
			
		} // if Deleted[i]==0;
	} //for .. Le23 .. MElements
//  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -


//  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
//  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -

//  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
//  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -


//  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
	SENDfirst(0);
	
}
//---M-a-k-s---
function SENDfirst(a23){
	if (a23 >=cT)return;
	var i23=a23;
		var data="prm1=";
			for (var i=0; (i<100)&&(i23<cT); i++){
				data+=T[i23++]+"+"; //toString(T[i23++])+"+";
				
			}
			console.log("SENDfirst"+data);
			
    $.ajax({
      type: "POST",
      dataType: "json",
      url: "firstwrite101.php", //Relative or absolute path to response.php file
      data: data,
      success: function(data) {
		  SENDnext(i23);
      }
    });

}
//---M-a-k-s---

function SENDnext(a23){
	if (a23 >=cT){	SENDlast(); return;}
	var i23=a23;
		var data="prm1=";
			for (var i=0; (i<100)&&(i23<cT); i++){
				data+=T[i23++]+"+"; //toString(T[i23++])+"+";
				
			}
			console.log("SENDnext="+data);
			
    $.ajax({
      type: "POST",
      dataType: "json",
      url: "nextwrite101.php", //Relative or absolute path to response.php file
      data: data,
      success: function(data) {
		  SENDnext(i23);
      }
    });
}
//---M-a-k-s---
function SENDlast(a23){
	/////if (a23 >=cT)return;
	var i23=a23;
		var data="prm1=333"; //it won't be written in lastwrite101.php'
		/*	for (var i=0; (i<100)&&(i23<cT); i++){
				data+=T[i23++]+"+"; //toString(T[i23++])+"+";
				
			}*/
			console.log("SENDlast"+data);
			
    $.ajax({
      type: "POST",
      dataType: "json",
      url: "lastwrite101.php", //Relative or absolute path to response.php file
      data: data,
      success: function(data) {
		  ;//actually, SENDlast->lastwrite101.php - only closes and renames the fresh file 
      }
    });
}
//---M-a-k-s---
