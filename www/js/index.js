/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
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

/////////slider 

  
 
///////////////////////// CANVAS!!
// <script>
    
   // Variables for referencing the canvas and 2dcanvas context
    var canvas,ctx;
    
  var coloring;
  
  function updateColor(colorAmount) {
    var c = document.getElementById("color").value;
    coloring = c;
  } 
  
 var s; 

$(function() {
    $( "#slider" ).slider({
      value:1,
      min: 1,
      max: 15,
      step: 1,
      slide: function( event, ui ) {
        // $( "#amount" ).val( "s" + ui.value );
         var x = ui.value;
         s= x;
         console.log(s);
      }
    });
    // $( "#amount" ).val( "s" + $( "#slider" ).slider( "value" ) );
     
  });


  /*
function updateSlider(slideAmount) {
  var x = document.getElementById("slider").value;
    s = x;
    console.log(s);
  }
*/
  
  
    // Variables to keep track of the mouse position and left-button status 
    var mouseX,mouseY,mouseDown=0;
    // Variables to keep track of the touch position
    var touchX,touchY;
    // Keep track of the old/last position when drawing a line
    // We set it to -1 at the start to indicate that we don't have a good value for it yet
    var lastX,lastY=-1;
    // Draws a line between the specified position on the supplied canvas name
    // Parameters are: A canvas context, the x position, the y position, the size of the dot
    function drawLine(ctx,x,y,s) {
        // If lastX is not set, set lastX and lastY to the current position 
        if (lastX==-1) {
            lastX=x;
      lastY=y;
        }
        // Let's use black by setting RGB values to 0, and 255 alpha (completely opaque)
        r=0; g=0; b=0; a=255;
        // Select a fill style
        // ctx.strokeStyle = "rgba("+r+","+g+","+b+","+(a/255)+")";
        ctx.strokeStyle = coloring;
        // Set the line "cap" style to round, so lines at different angles can join into each other
        ctx.lineCap = "round";
        //ctx.lineJoin = "round";
        // Draw a filled line
        ctx.beginPath();
  // First, move to the old (previous) position
  ctx.moveTo(lastX,lastY);
  // Now draw a line to the current touch/pointer position
  ctx.lineTo(x,y);
        // Set the line thickness and draw the line
        ctx.lineWidth = s;
        ctx.stroke();
        ctx.closePath();
  // Update the last position to reference the current position
  lastX=x;
  lastY=y;
    } 
    // Clear the canvas context using the canvas width and height
    function clearCanvas(canvas,ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    // Keep track of the mouse button being pressed and draw a dot at current location
    function sketchpad_mouseDown() {
        mouseDown=1;
        drawLine(ctx,mouseX,mouseY,s);
    }
    // Keep track of the mouse button being released
    function sketchpad_mouseUp() {
        mouseDown=0;
        // Reset lastX and lastY to -1 to indicate that they are now invalid, since we have lifted the "pen"
        lastX=-1;
        lastY=-1;
    }
    // Keep track of the mouse position and draw a dot if mouse button is currently pressed
    function sketchpad_mouseMove(e) { 
        // Update the mouse co-ordinates when moved
        getMousePos(e);
        // Draw a dot if the mouse button is currently being pressed
        if (mouseDown==1) {
            drawLine(ctx,mouseX,mouseY,s);
        }
    }
    // Get the current mouse position relative to the top-left of the canvas
    function getMousePos(e) {
        if (!e)
            var e = event;
        if (e.offsetX) {
            mouseX = e.offsetX;
            mouseY = e.offsetY;
        }
        else if (e.layerX) {
            mouseX = e.layerX;
            mouseY = e.layerY;
        }
     }
    // Draw something when a touch start is detected
    function sketchpad_touchStart() {
        // Update the touch co-ordinates
        getTouchPos();
        drawLine(ctx,touchX,touchY,s);
        // Prevents an additional mousedown event being triggered
        event.preventDefault();
    }
    function sketchpad_touchEnd() {
        // Reset lastX and lastY to -1 to indicate that they are now invalid, since we have lifted the "pen"
        lastX=-1;
        lastY=-1;
    }
    // Draw something and prevent the default scrolling when touch movement is detected
    function sketchpad_touchMove(e) { 
        // Update the touch co-ordinates
        getTouchPos(e);
        // During a touchmove event, unlike a mousemove event, we don't need to check if the touch is engaged, since there will always be contact with the screen by definition.
        
        drawLine(ctx,touchX,touchY,s); 
        // Prevent a scrolling action as a result of this touchmove triggering.
        event.preventDefault();
    }
    // Get the touch position relative to the top-left of the canvas
    // When we get the raw values of pageX and pageY below, they take into account the scrolling on the page
    // but not the position relative to our target div. We'll adjust them using "target.offsetLeft" and
    // "target.offsetTop" to get the correct values in relation to the top left of the canvas.
    function getTouchPos(e) {
        if (!e)
            var e = event;
           //  "onmousedown" = true;
        if(e.touches) {
            if (e.touches.length == 1) { // Only deal with one finger
                var touch = e.touches[0]; // Get the information for finger #1
                touchX=touch.pageX-touch.target.offsetLeft;
                touchY=touch.pageY-touch.target.offsetTop;
                console.log(e.touches);
                
            }
        }
    }
  
  //erases with the same size stroke  
  function myEraser(){
  
      ctx.globalCompositeOperation = "destination-out";
      ctx.strokeStyle = "rgba(0,0,0,1)";
      // drawLine(ctx,touchX,touchY,s);
   }
   
   //goes back to the proportties of marker 
   function myMarker(){
  
      // ctx.globalCompositeOperation = "destination-out";
      ctx.globalCompositeOperation = "source-over";
      ctx.strokeStyle = c;
      var c = document.getElementById("color").value;
   }
   
    // Clear the canvas context using the canvas width and height
    function clearCanvas(canvas,ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    // Set-up the canvas and add our event handlers after the page has loaded
    function init() {
      
      
        // Get the specific canvas element from the HTML document
        canvas = document.getElementById('can');
        // If the browser supports the canvas tag, get the 2d drawing context for this canvas
        if (canvas.getContext)
            ctx = canvas.getContext('2d');
        // Check that we have a valid context to draw on/with before adding event handlers
        if (ctx) {
            // React to mouse events on the canvas, and mouseup on the entire document
            canvas.addEventListener('mousedown', sketchpad_mouseDown, false);
            canvas.addEventListener('mousemove', sketchpad_mouseMove, false);
            window.addEventListener('mouseup', sketchpad_mouseUp, false);
            // React to touch events on the canvas
            canvas.addEventListener('touchstart', sketchpad_touchStart, false);
            canvas.addEventListener('touchend', sketchpad_touchEnd, false);
            canvas.addEventListener('touchmove', sketchpad_touchMove, false);
        }
    }
   //  </script>

////////////////////////


$(document).on("pagecreate","#section1",function(){
  $("#section1").on("swipeleft",function(){
    console.log("section1 left"); 
    $.mobile.changePage("#section2",{transition:"slide"});
       
  }); 
  
  
  
  
});


$(document).on("pagecreate","#section2",function(){
  $("#section2").on("swiperight",function(){
    $.mobile.changePage("#section1",{transition:"slide", reverse:true
      
    });
    

  }); 
  
  console.log("section2 right"); 
});


$(document).on("pagecreate","#section2",function(){
  $("#section2").on("swipeleft",function(){
    $.mobile.changePage("#section3",{transition:"slide", 
      
    });

  });  
});


$(document).on("pagecreate","#section3",function(){
  $("#section3").on("swiperight",function(){
    $.mobile.changePage("#section2",{transition:"slide", reverse:true
      
    });
  });  
});

$(document).on("pagecreate","#section3",function(){
  $("#section3").on("swipeleft",function(){
    $.mobile.changePage("#section4",{transition:"slide",
      
    });
  });  
});

$(document).on("pagecreate","#section4",function(){
  $("#section4").on("swiperight",function(){
    $.mobile.changePage("#section3",{transition:"slide", reverse:true
      
    });
  });  
});

$(document).on("pagecreate","#section4",function(){
  $("#section4").on("swipeleft",function(){
    $.mobile.changePage("#section5",{transition:"slide", 
      
    });
  });  
});

$(document).on("pagecreate","#section5",function(){
  $("#section5").on("swiperight",function(){
    $.mobile.changePage("#section4",{transition:"slide", reverse:true
      
      
    });
  });  
});
////////////////////////////////////////////////////external panel

var panel = '<div data-role="panel" class="panel" id="mypanel" data-position="right" data-display="overlay" data-position-fixed="true" ></div>';

$(document).one('pagebeforecreate', function () {
 // <html> 
 // <ul data-role="listview" data-inset="true">
 //            <li data-role="list-divider">List view</li>
 //            <li data-icon="home">item</li>
 //            <li data-icon="home">item</li>
 //            <li data-icon="home">item</li>
 //        </ul>
 //  </html>
  $.mobile.pageContainer.prepend(panel);
  $("#mypanel").panel().listview();
  $("#mypanel").listview();
  $('#section2').append($("#mypanel"))
     
});




//slider
      function showValue(newValue)
      {
    y=newValue;

    }
    
/////draggable img

 
  
    
////////////////save picture 


function save(dataURL){
  alert("do you want to save?");
  // console.log(dataURL);

    window.canvas2ImagePlugin.saveImageDataToLibrary(
        function(msg){//the file of the images
            console.log(msg);
          $('#mypanel').prepend('<div class= "dragImg"><img id="theImg" class="theImg" height= "100%" width= "100%" src="'+msg+'"/></div>');//path of new images and appending them to panel 
            
 
 
 $(function(){  
 //Make every clone image unique.  
   var counts = [0];
    var resizeOpts = { 
      handles: "all" ,autoHide:false
    };    
   $(".dragImg").draggable({
                         helper: "clone",
                         
                         //Create counter
                         start: function() { counts[0]++; }
                        });

$("#dropHere").droppable({
       drop: function(e, ui){
               if(ui.draggable.hasClass("dragImg")) {
                 
                 var newUI = $('<div id="wrapper">');
                 newUI.append(ui.draggable.children('img').eq(0).clone());
                 //ui.draggable.remove();
                 


                 
                 /*
                   
                   */
                 
     //$(this).append($(ui.helper).clone().css('z-index','999999'));
  $(this).append(newUI);
     console.log("clone dropped");
   
   //Pointing to the dragImg class in dropHere and add new class.
         newUI.addClass("item-"+counts[0]);
         newUI.css('position','absolute');
         newUI.css('display','block');
         newUI.css('top','20px');
         newUI.css('left','300px');
         newUI.css('z-index','999999');
         make_draggable(newUI);
         // newUI.addClass("imgSize-"+counts[0]);
                
   //Remove the current class (ui-draggable and dragImg)
         //$("#dropHere .item-"+counts[0]).removeClass("dragImg");
         //$("#dropHere .item-"+counts[0]).removeClass("ui-draggable");
         $("#dropHere .dragImg").removeClass("ui-draggable-dragging");
        
        // var newElement = $(this).children()
        // newElement = newElement[0];
        // newElement.id = 'drawing-'+Math.floor((Math.random() * 10000) + 1);
        createHammerTime(newUI);


// $(".item-"+counts[0]).tap(function() {
// $(this).remove(); 
// });
// console.log("about to make resizable"); 
//make_draggable($("item-"+counts[0])); 
// newUI.resizable(resizeOpts);
// $("imgSize-"+counts[0]).resizable(resizeOpts);

// console.log("making resizable");

// console.log($("imgSize-"+counts[0]));
      



      }
        var el = document.createElement("div");
        
        
        
      }
      
      });






var zIndex = 0;
function make_draggable(elements)
{ 
  elements.draggable({
    containment:'parent',
    start:function(e,ui){ ui.helper.css('z-index',++zIndex); },
    stop:function(e,ui){
    }
  });

   
}    
if (touchStart, touchmove, touchend == true){
  event.preventDefault();
}

    
   });  
       
    
        },
        
        function(err){
            console.log(err);
            
        },
       
        document.getElementById('can')
    );

      alert("hi");
}




function createHammerTime(element){



console.log('adding hammertime for elemet ' + element);

var hammertime = Hammer(element, {
        transform_always_block: true,
        transform_min_scale: 1,
        drag_block_horizontal: true,
        drag_block_vertical: true,
        drag_min_distance: 0
    });
 
    var posX=0, posY=0,
    lastPosX=0, lastPosY=0,
    bufferX=0, bufferY=0,
        scale=1, last_scale,
        rotation= 1, last_rotation, dragReady=0;
 
    hammertime.on('touch transform', function(ev) {
        console.log(ev.type);
        console.log(event.target);
        element = event.target;
        if(event.target.id=="wrapper") return;
        else manageMultitouch(ev,element);
    });  


  function manageMultitouch(ev,element){

    switch(ev.type) {
      case 'touch':
          last_scale = scale;
          last_rotation = rotation;

          break;

      case 'drag':
            posX = ev.gesture.deltaX + lastPosX;
            posY = ev.gesture.deltaY + lastPosY;
          break;

      case 'transform':
          rotation = last_rotation + ev.gesture.rotation;
          scale = Math.max(1, Math.min(last_scale * ev.gesture.scale, 10));
          break;

      case 'dragend':
        lastPosX = posX;
        lastPosY = posY;
        break;
        }

        // var transform =
        //         "translate3d("+posX+"px,"+posY+"px, 0) " +
        //         "scale3d("+scale+","+scale+", 0) " +
        //         "rotate("+rotation+"deg) ";

        var transform =
                "translate3d("+posX+"px,"+posY+"px, 0) " +
                "scale3d("+scale+","+scale+", 1) " +
                "rotate("+rotation+"deg) ";

        element.style.transform = transform;
        element.style.oTransform = transform;
        element.style.msTransform = transform;
        element.style.mozTransform = transform;
        element.style.webkitTransform = transform;
        //$(event.target).parent().css( "z-index", "999999" );

        // to change the css of the image, deal with element
        // to change the css of the wrapper div, use event.target.parent()
  }
}


