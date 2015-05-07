
    var ratio = [];
    var labell = [];
    var ovi = {};
    var timerV;
    var mycanvas = "";
    var myhalfcanvas ="";
    var rflag;

function mainI()
 { 
 if (rflag == 1) {stopRefresh();}
 if ($("#inj187") != null)
 {
 	$("#inj187").remove();
 }
    clickCount = [];
    aggrPC = [];
    ratio = [];
    labell = [];
    ovi = {};
    timerV;
    mycanvas = "";
    myhalfcanvas = "";
    ovi.structure = {
        pyObj: function(obj) {
            this.obj = obj;
            this.stack = [];            
            var temp = [];            
            $(this.obj).contents().each(function(index) {
                temp.push({val:this.__data__.y,tstamp:this.__data__.x});
            });
            this.stack = temp;
            this.getStack = function() {
                return this.stack
            };
        }};


    if ($(".gridster") != null)
    {
    url = "https://cdn.rawgit.com/avinash8526/Chartjs_modified/master/chartjsM.js";
    $.getScript(url, function() {
        console.log("Charjsloaded");
        mycanvas = '<li class="ng-scope gs-w" id="inj187" data-col="1" data-row="11" data-sizex="12" data-sizey="4" style="display: list-item;"><script>function removeMe(){$("#inj187").remove();}function refreshChart(){mainI();console.log("Chart Reloaded at "+new Date($.now()));}</script><dashboard-panel><div id="canvasP" class="panel panel-default ng-scope" ng-switch="" on="panel.type" ng-if="savedObj || error">  <div class="panel-heading">    <span class="panel-title ng-binding">Price Change Ratio</span>    <div class="btn-group">  <a ng-show="!appEmbedded" onclick="continousrefresh()" class=""><i id="spinG" class="fa fa-circle-o-notch"></i></a>     <a ng-show="!appEmbedded" onclick="refreshChart()" class=""><i class="fa fa-refresh"></i></a>      <a ng-show="!appEmbedded" onclick="removeMe()" class=""><i class="fa fa-times"></i></a>    </div>    <div class="clearfix"></div>  </div>  <canvas id="myChart" width="900"height="400" style="padding:5px;" class="panel panel-default ng-scope" ></canvas>  </dashboard-panel><span class="gs-resize-handle gs-resize-handle-both"></span><span class="gs-resize-handle gs-resize-handle-both"></span><span class="gs-resize-handle gs-resize-handle-both"></span><span class="gs-resize-handle gs-resize-handle-both"></span></li>';
        myhalfcanvas = '<canvas id="myChart" width="900"height="400" style="padding:5px;" class="panel panel-default ng-scope" ></canvas>';
        loadCanvasdata();
    	});
 	$("html, body").animate({ scrollTop: $(document).height() }, 1000);
	}
	else
	{
		alert("Grid Node not found, cannot inject JS. Try refreshing..");
	}
	}
    function loadCanvasdata(load){
        count = 0;
        maxTries = 10;
        if (typeof(load)==='undefined') {load = "complete";}
        
        if (window.jQuery) {
            maushi();
            while(true)
            {
                try{
                    a = $('.series.0');
                   // b = $(".y-axis-div");
                    break;
                }
                catch (e) {  
                    console.log("I am Inside catch");      
                    if (++count == maxTries) throw e.message;
                }
            }
            
            if (a != "" && a != undefined) {
                
                    a1 = new ovi.structure.pyObj(a[1]);
                    a2 = new ovi.structure.pyObj(a[2]);
                    imin = 0 ;
                    imax = 0 ;
                    Xlabmax = 0;
                    if (a[1].childNodes.length > 0 && a[2].childNodes.length > 0)
                    {

                        imin = a[1].childNodes.length; 
                        imax = a[2].childNodes.length;

                    for (i = 0; i < imin ;i++)
                     {
                        ai = a1.getStack()[i];
                        for(j=0 ; j< imax ;j++)
                        {
                            aj = a2.getStack()[j];
                            if(ai.tstamp == aj.tstamp && aj.val !=0 )
                            {
                                ratio.push(((ai.val/aj.val)*100).toFixed(2));
                                labell.push(new Date(ai.tstamp).toString().substr(11,22));
                            }
                        }
                        
                    }
                    Xlabmax = parseInt((labell.length/3).toFixed(0));
                    data = {labels: labell,datasets: [{label: "Price Change/ Clicks Ratio",fillColor: "rgba(87, 193, 123, 1)",strokeColor: "rgba(87, 193, 123, 1)",highlightFill: "rgba(154, 218, 176, 1)",highlightStroke: "rgba(154, 218, 176, 1)",data: ratio}]};
                    if(load == "complete")
                    {
                        $(".gridster").append(mycanvas);
                    }
                    else{
                        $("#canvasP").append(myhalfcanvas);
                    }
                    
                    ctx = document.getElementById("myChart").getContext("2d");
                    myNewChart = new Chart(ctx).Bar(data, {barValueSpacing: 1,barDatasetSpacing: 1,scaleShowGridLines: false,showXLabels: 5});
                    }
                    else {alert("There is no data in one of the dash board, cannot calculate ratio..Exiting..")}
                 
            }
            else{ alert("It seems there is no data either in aggregated dash or click count, please select appropriate time period and reload this plugin");}
        } else{
            alert("Jquery Not Found");
        }

    }
    function continousrefresh()
    {
        if($( "#spinG" ).hasClass( "fa-spin" ))
        {
            stopRefresh();
           
        }
        else{
            $("#spinG").addClass( "fa-spin" );            
            timerV = setInterval(refresher, 5000);
        }
        
        
    }
    function refresher() {
        rflag =1;
        console.log("I am inside refresher");  
        $( "#myChart" ).remove();    
        half = "half";       
        loadCanvasdata(half);        
    }
    function maushi(){

        ratio = [];
        labell = [];
    }
    function stopRefresh(){
        rflag = 0;
        $( "#spinG" ).removeClass( "fa-spin" );
        clearInterval(timerV);
    }


	if (window.jQuery) {
	$( document ).ready(function() {
     mainI();
	});}


