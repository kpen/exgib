var EColor=[]; //The array of elements color
var NElements=[]; //the array of the names such as "polygons", "lines", "textes "
var MElements=[]; //the array of the_arrays_of_points (I have to keep it in memory)=MEle[msss[[x,y],[x,y],[x,y]]]
var Elements=[]; //all the drawn elements (as polylines, etc)
var eLcount=0;

function DRW(){
  draw.viewbox(ESX-kf*wTH/2,ESY-kf*hTH/2,wTH*kf, hTH*kf);
}
////////////////////////////////////////////////////////////////////
$( document ).ready(function() {


	wT = $( document ).width();	
	hT = $( document ).height();
	
	wTH=Math.round((wT/100)*89);
	hTH=Math.round((hT/100)*89);

	ESX=wTH/2;
	ESY=hTH/2;
	kf=1;

  

 draw = SVG('drawing').size(wTH, hTH);
	var image = draw.image('../imgs/img2348.JPG')
//	draw3.image('favicon.png').loaded(function(loader) {
//  this.size(loader.width, loader.height)
//})
////////draw3.image('./imgs/ind_101.png');
 
 
 

 DRW();

// - - - - - - - - - - - - - - - - - - - - - - - - - 
  
	setTimeout(function(){v_teek();},200);
//------------prevent the browser from sleep-------------------
 var noSleep = new NoSleep();
 noSleep.enable(); // keep the screen on!
//------------prevent...---------------------------------------	
	}) //document-ready
	
	function v_teek(){
	Vopen();
	setTimeout(function(){v_teek();},200);
}
//-------------------------------------------------------
function Vopen(){
/*clear the SVG-area*/	
var delLimit = eLcount;


	var data="prm1=1";
			//console.log("READ");
			
    $.ajax({
      type: "POST",
      dataType: "json",
      url: "read101.php", //Relative or absolute path to response.php file
      data: data,
      success: function(data) {
		  console.log("READ_SUCCESS");
		  var T = data["param1"].split(" ");
		  var Le23 = T.length;
		  console.log("ReadLength= "+Le23);
		  
			NElements=[]; //the array of the names such as "polygons", "lines", "textes "
			MElements=[]; //the array of the_arrays_of_points (I have to keep it in memory)=MEle[msss[[x,y],[x,y],[x,y]]]
			
				for (var i=0; i<eLcount; i++){ 		Elements[i].remove(); 	}
			
			eLcount=0;
		        Elements.length = 0
		  
		  for (var i=0; i<Le23-2; ){
			  //if (eLcount<delLimit){Elements[eLcount].remove();}
			  if (T[i]== 101){
				  NElements[eLcount]="polyline";
				  var Le25 = T[i+1];
				  //console.log("ReadLe25="+Le25);
				  msss = [];
					for (var n=0; n<Le25; n++){
						msss[n]=[T[i+1+1+n*2],T[i+1+1+n*2+1]];
					}
					
					//MElements[eLcount]=msss;
					//Elements[eLcount++] = draw.polyline(msss).fill('none').stroke({ width: 1 });
					
Elements[eLcount++] = draw.polyline(msss)
              .fill('none')
              .stroke({ width: 12, color:'#555' });
			Elements[eLcount++] = draw.polyline(msss)
              .fill('none')
              .stroke({ width: 8, color:'#f4e970' });
			  
					i+=1+1+Le25*2;
				  }
				else if (T[i]==102) { /*
					//NElements[eLcount]="polyline";
				  var Le25 = T[i+1];
				  //console.log("ReadLe25="+Le25);
				  msss = [];
					for (var n=0; n<Le25; n++){
						msss[n]=[T[i+1+1+n*2],T[i+1+1+n*2+1]];
					}
					
					MElements[eLcount]=msss;
					var R23=parseInt(T[i+2+Le25*2+0]);
					var G23=parseInt(T[i+2+Le25*2+1]);
					var B23=parseInt(T[i+2+Le25*2+2]);
					//console.log("R"+R23+" G"+G23+" B"+B23+"..."+TxtColor(R23,G23,B23));
					EColor[eLcount]=[R23,G23,B23];
					Elements[eLcount++] = draw.polygon(msss).fill(TxtColor(R23,G23,B23));
					i+=1+1+Le25*2+3;*/
				} 
				else {i++;}
				 //console.log("nextNum["+i+"]="+T[i]);
		  } //for i<L23
		 // for (var i=eLcount; i<delLimit; i++){Elements[i].remove();}
      //  $(".the-return").html(
      //    "Param 1: " + data["param1"] + "<br />Param 2: " + data["param2"] + "<br />Param 3: " + data["param3"]); 
      }
    });//ajax-success
	
	DRW();
}