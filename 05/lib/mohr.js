//Holds the global stress variables
function Stress(x,y,xy, p1, p2, h, t, ap, at) {
	this.x = parseFloat(x);		//The input sigma_x value
	this.y = parseFloat(y);		//The input sigma_y value
	this.xy = parseFloat(xy);	//The input tau_xy value

	this.p1 = parseFloat(p1);	//The calculated principal stress (1) value
	this.p2 = parseFloat(p2);	//The calculated principal stress (2) value
	this.h = parseFloat(h);		//The calculated hydrostatic stress value
	this.t = parseFloat(t);		//The calculated maximum shear value

	this.ap = parseFloat(ap);	//The angle at which the principal stresses occur
	this.at = parseFloat(at);	//The angle at which the max shear stresses occur
}

var main = function () {
	// Initial Stress parameters
	var Sx = 5.e1;
	var Sy = 0.e1;
	var Txy = 1.e1;
	var P1 = 0.e1;
	var P2 = 0.e1;
	var H = 0.e1;
	var T = 0.e1;
	var AP = 1.e1;
	var AT = 0.e1;

	// Define stress
	stress = new Stress(Sx,Sy,Txy,P1,P2,H,T,AP,AT);

	// Stress calculations
	calcStress = function(stress) {
		var Sx = stress.x, Sy = stress.y, Txy = stress.xy;	//Input stresses (3 off)
		var P1 = stress.p1, P2 = stress.p2, H = stress.h, T = stress.t;	//Output stresses (4 off, 2 principal and 2 at max shear)
		var AP = stress.ap, AT = stress.AT;			//Angles (2 off, @ principal and @ max shear)
		var halfDif = (Sx - Sy) / 2;
		stress.t = Math.sqrt(Txy * Txy + halfDif * halfDif);
		stress.h = (Sx + Sy) / 2.;
		stress.p1 = stress.h + stress.t;
		stress.p2 = stress.h - stress.t;
		stress.ap = Math.atan(stress.xy / halfDif) / 2 * 180 / Math.PI;
		stress.at = stress.ap + 45;
	}
	calcStress(stress);

	// Establish SVG elements
	var inElDiv = $('#inElementContainer') // SVG container for inputElement
	var mohrDiv = $('#mohrContainer') // SVG container for section
	var pDiv = $('#principalContainer') // SVG container for inputElement
	var sDiv = $('#shearContainer') // SVG container for section
	
	//Width and height of the 4 graphic elements
	var wInEl = 300
	var hInEl = 300
	var wMohr = 400
	var hMohr = 300
	var wPEl = 300
	var hPEl = 300
	var wTEl = 300
	var hTEl = 300

	var svgInElementCanvas = SVG('inElementContainer').size(wInEl,hInEl)	// SVG for input Element

	var svgCanvas = SVG('mohrContainer').size(wMohr,hMohr) // SVG for section
	var svgGroup = svgCanvas.group().flip('y',hMohr/2.) // Create a parent group with a new RH coordinate system 
	var svgMohrCanvas = svgGroup.nested() // Nest a full-size SVG inside group

	var svgPrincipalCanvas = SVG('principalContainer').size(wPEl,hPEl)	// SVG for input Element
	var svgShearCanvas = SVG('shearContainer').size(wTEl,hTEl)	// SVG for input Element

	function drawInElem() { 	// Create and draw input Element (inElement) in the 1st Div
		//Establish the box size and placing variables
		var boxOuter = Math.min(wInEl, hInEl);	//Change this to refer to the Div to make this section responsive
		var boxCenter = boxOuter / 2;
		var boxSize = boxOuter * 0.4;
		var boxGap = boxSize * 0.2;
		var arrowLen = boxGap * 0.3;
		var boxNear = (boxCenter-boxGap-boxSize/2), boxFar = (boxCenter+boxGap+boxSize/2);
		var arrowTrans = boxOuter * 0.25;

		//Blank the canvas, define arrow
		svgInElementCanvas.clear();
		var endArrow = svgInElementCanvas.marker(8, 5, function(add) {
			add.path('M 8 2.5 L 0 0 L 0 5 Z')
		})
		//Title for the canvas
		var text = svgInElementCanvas.text(function(add) {
			  add.tspan('Input Stress').x(0).y(20).font("weight", "bold");
			  add.tspan('State').x(0).y(40).font("weight", "bold");
		});

		//Draw the centre blue box
		svgInBox = svgInElementCanvas.rect(boxSize,boxSize).translate(boxCenter-boxSize/2,boxCenter-boxSize/2).fill('rgb(0,162,232)').stroke({color:'black',width:2})

		// Establish the arrow length variables (based on stresses from sliders)
		var Sx = stress.x, Sy = stress.y, Txy = stress.xy;
			//Note: Calculated values aren't required for display in the input element
		var xArrowLen = arrowLen + (boxFar - boxNear) / 400 * Math.abs(Sx);
		var yArrowLen = arrowLen + (boxFar - boxNear) / 400 * Math.abs(Sy);
		var tArrowLen = arrowLen + (boxFar - boxNear) / 400 * Math.abs(Txy);

		// Draw the Sigma_x Stress Arrows
		if (Sx == 0) {
			//No Arrows to draw - no stress in this direction
		} else {
			var text = svgInElementCanvas.text(function(add) {
				  add.tspan('\u03C3x').x(boxCenter+arrowTrans+20).y(boxCenter-5)
				  add.tspan(Sx.toFixed(1) + 'MPa').x(boxCenter+arrowTrans+2).y(boxCenter+14)
			});
			if (Sx > 0) {
				//Stress is positive. Draw arrows accordingly
				svgArrow = svgInElementCanvas.line(boxFar,boxCenter,boxFar+xArrowLen,boxCenter).stroke({color:'black',width:2})
				svgArrow.marker('end', endArrow)
				svgArrow = svgInElementCanvas.line(boxNear,boxCenter,boxNear-xArrowLen,boxCenter).stroke({color:'black',width:2})
				svgArrow.marker('end', endArrow)
			} else {
				//Stress is negative. Draw arrows accordingly
				svgArrow = svgInElementCanvas.line(boxFar+xArrowLen,boxCenter,boxFar,boxCenter).stroke({color:'black',width:2})
				svgArrow.marker('end', endArrow)
				svgArrow = svgInElementCanvas.line(boxNear-xArrowLen,boxCenter,boxNear,boxCenter).stroke({color:'black',width:2})
				svgArrow.marker('end', endArrow)
			}
		}

		// Draw the Sigma_y Stress Arrows
		if (Sy == 0) {
			//No Arrows to draw - no stress in this direction
		} else {
			var text = svgInElementCanvas.text(function(add) {
				add.tspan('\u03C3y').x(boxCenter+5).y(boxCenter-arrowTrans-40)
				add.tspan(Sy.toFixed(1) + 'MPa').x(boxCenter+5).y(boxCenter-arrowTrans-20)
			});
			if (Sy > 0) {
				//Stress is positive. Draw arrows accordingly
				svgArrow = svgInElementCanvas.line(boxCenter,boxFar,boxCenter,boxFar+yArrowLen).stroke({color:'black',width:2})
				svgArrow.marker('end', endArrow)
				svgArrow = svgInElementCanvas.line(boxCenter,boxNear,boxCenter,boxNear-yArrowLen).stroke({color:'black',width:2})
				svgArrow.marker('end', endArrow)

			} else {
				svgArrow = svgInElementCanvas.line(boxCenter,boxFar+yArrowLen,boxCenter,boxFar).stroke({color:'black',width:2})
				svgArrow.marker('end', endArrow)
				svgArrow = svgInElementCanvas.line(boxCenter,boxNear-yArrowLen,boxCenter,boxNear).stroke({color:'black',width:2})
				svgArrow.marker('end', endArrow)
			}
		}
		
		// Draw the Shear Stress Arrows
		if (Txy == 0) {
			//No Arrows to draw - no stress in this direction
		} else {
			var text = svgInElementCanvas.text(function(add) {
				  add.tspan('\u03C4xy').x(boxCenter+arrowTrans+3).y(boxCenter-arrowTrans-5)
				add.tspan(Txy.toFixed(1) + 'MPa').x(boxCenter+arrowTrans+3).y(boxCenter-arrowTrans+15)
			});
			if (Txy > 0) {
				//Stress is positive. Draw arrows accordingly
				svgArrow = svgInElementCanvas.line(boxCenter,boxCenter+tArrowLen,boxCenter,boxCenter-tArrowLen).translate(arrowTrans,0).rotate(0).stroke({color:'black',width:2})
				svgArrow.marker('end', endArrow)
				svgArrow = svgInElementCanvas.line(boxCenter,boxCenter-tArrowLen,boxCenter,boxCenter+tArrowLen).translate(arrowTrans,0).rotate(90,boxCenter-arrowTrans,boxCenter).stroke({color:'black',width:2})
				svgArrow.marker('end', endArrow)
				svgArrow = svgInElementCanvas.line(boxCenter,boxCenter+tArrowLen,boxCenter,boxCenter-tArrowLen).translate(arrowTrans,0).rotate(180,boxCenter-arrowTrans,boxCenter).stroke({color:'black',width:2})
				svgArrow.marker('end', endArrow)
				svgArrow = svgInElementCanvas.line(boxCenter,boxCenter-tArrowLen,boxCenter,boxCenter+tArrowLen).translate(arrowTrans,0).rotate(270,boxCenter-arrowTrans,boxCenter).stroke({color:'black',width:2})
				svgArrow.marker('end', endArrow)
			} else {
				//Stress is negative. Draw arrows accordingly
				svgArrow = svgInElementCanvas.line(boxCenter,boxCenter-tArrowLen,boxCenter,boxCenter+tArrowLen).translate(arrowTrans,0).rotate(0).stroke({color:'black',width:2})
				svgArrow.marker('end', endArrow)
				svgArrow = svgInElementCanvas.line(boxCenter,boxCenter+tArrowLen,boxCenter,boxCenter-tArrowLen).translate(arrowTrans,0).rotate(90,boxCenter-arrowTrans,boxCenter).stroke({color:'black',width:2})
				svgArrow.marker('end', endArrow)
				svgArrow = svgInElementCanvas.line(boxCenter,boxCenter-tArrowLen,boxCenter,boxCenter+tArrowLen).translate(arrowTrans,0).rotate(180,boxCenter-arrowTrans,boxCenter).stroke({color:'black',width:2})
				svgArrow.marker('end', endArrow)
				svgArrow = svgInElementCanvas.line(boxCenter,boxCenter+tArrowLen,boxCenter,boxCenter-tArrowLen).translate(arrowTrans,0).rotate(270,boxCenter-arrowTrans,boxCenter).stroke({color:'black',width:2})
				svgArrow.marker('end', endArrow)
			}
		}
	}
	drawInElem();
	
	// Draw the Mohr's Circle in the 2nd Div
	//svgMohrCanvas.viewbox(0,0,wMohr,hMohr)

	function drawCircle() {	//Draw Mohr's Circle on the centre canvas
		//Establish variables
		var Sx = stress.x, Sy = stress.y, Txy = stress.xy;
		var Sx = stress.x, Sy = stress.y, Txy = stress.xy;	//Input stresses (3 off)
		var P1 = stress.p1, P2 = stress.p2, H = stress.h, T = stress.t;	//Output stresses (4 off, 2 principal and 2 at max shear)
		var AP = stress.ap, AT = stress.AT;			//Angles (2 off, @ principal and @ max shear)

		var halfDif = (Sx - Sy) / 2;

		//Blank the canvas ready to draw on
		svgMohrCanvas.clear();
		
		//Title for the canvas & Axis labels
		var text = svgMohrCanvas.text(function(add) {
			  add.tspan('Mohr\'s Circle').x(0).y(20).font("weight", "bold");
		}).flip('y',hMohr/2);
		var text = svgMohrCanvas.text(function(add) {
			  add.tspan('\u03C3').x(wMohr-15).y(hMohr/2+15)
			  add.tspan('\u03C4').x(wMohr/2+8).y(hMohr-8)
		}).flip('y',hMohr/2);

		//Draw Circle on the centre canvas
		svgCentroid = svgMohrCanvas.circle().radius(T).translate(wMohr/2+H,hMohr/2).fill('rgba(34,177,76,0.25)').stroke({color:'black',width:1})

		//Draw horizontal and vertical Axes
		svgLine = svgMohrCanvas.line(0,hMohr/2,wMohr,hMohr/2).stroke({color:'black',width:1})
		svgLine = svgMohrCanvas.line(wMohr/2,0,wMohr/2,hMohr).stroke({color:'black',width:1})

		//Draw Axis Scale Marks
		for (i=1;i<wMohr/20;i++) {	//Loop through the width of the frame
			if (i/5 == (i/5).toFixed(0)) {	//Long lines every 5
				//Positive tick
				svgLine = svgMohrCanvas.line(wMohr/2+i*10,hMohr/2+4,wMohr/2+i*10,hMohr/2-4).stroke({color:'black',width:1})
				//Negative tick
				svgLine = svgMohrCanvas.line(wMohr/2-i*10,hMohr/2+4,wMohr/2-i*10,hMohr/2-4).stroke({color:'black',width:1})
				var text = svgMohrCanvas.text(function(add) {
					  add.tspan(i*10).x(wMohr/2+i*10-10).y(hMohr/2+15)
					  add.tspan(-i*10).x(wMohr/2-i*10-20).y(hMohr/2+15)
				}).flip('y',hMohr/2);
			} else {
				svgLine = svgMohrCanvas.line(wMohr/2+i*10,hMohr/2+2,wMohr/2+i*10,hMohr/2-2).stroke({color:'black',width:1})	//Positive tick
				svgLine = svgMohrCanvas.line(wMohr/2-i*10,hMohr/2+2,wMohr/2-i*10,hMohr/2-2).stroke({color:'black',width:1})	//Negative tick
			}
		}
		for (i=1;i<hMohr/20;i++) {	//Loop through the height of the frame
			if (i/5 == (i/5).toFixed(0)) {	//Long lines every 5
				svgLine = svgMohrCanvas.line(wMohr/2+4,hMohr/2+i*10,wMohr/2-4,hMohr/2+i*10).stroke({color:'black',width:1})	//Positive tick
				svgLine = svgMohrCanvas.line(wMohr/2+4,hMohr/2-i*10,wMohr/2-4,hMohr/2-i*10).stroke({color:'black',width:1})	//Negative tick
				var text = svgMohrCanvas.text(function(add) {
					  add.tspan(i*10).x(wMohr/2+4).y(hMohr/2+i*10+4)
					  add.tspan(-i*10).x(wMohr/2+4).y(hMohr/2-i*10+4)
				}).flip('y',hMohr/2);
			} else {
				svgLine = svgMohrCanvas.line(wMohr/2+2,hMohr/2+i*10,wMohr/2-2,hMohr/2+i*10).stroke({color:'black',width:1})	//Positive tick
				svgLine = svgMohrCanvas.line(wMohr/2+2,hMohr/2-i*10,wMohr/2-2,hMohr/2-i*10).stroke({color:'black',width:1})	//Negative tick
			}
		}

		//Draw line showing 'zero' angle on the centre canvas
		svgLine = svgMohrCanvas.line(wMohr/2+H,hMohr/2,wMohr/2+H+halfDif,hMohr/2-Txy).stroke({color:'rgb(0,162,232)',width:2})
		svgLine = svgMohrCanvas.circle().radius(2).translate(wMohr/2+H-halfDif,hMohr/2+Txy).fill('rgb(0,162,232)').stroke({color:'rgb(0,162,232)',width:1})
		//Draw line showing principal stresses on the centre canvas
		svgLine = svgMohrCanvas.line(wMohr/2+H,hMohr/2,wMohr/2+H+T,hMohr/2).stroke({color:'rgb(255,127,39)',width:2})
		svgLine = svgMohrCanvas.circle().radius(2).translate(wMohr/2+H-T,hMohr/2).fill('rgb(255,127,39)').stroke({color:'rgb(255,127,39)',width:1})
		//Draw line showing max shear stresses on the centre canvas
		svgLine = svgMohrCanvas.line(wMohr/2+H,hMohr/2,wMohr/2+H,hMohr/2+T).stroke({color:'rgb(255,242,0)',width:2})
		svgLine = svgMohrCanvas.circle().radius(2).translate(wMohr/2+H,hMohr/2-T).fill('rgb(255,242,0)').stroke({color:'rgb(255,242,0)',width:1})
	}
	drawCircle();

	function drawPrincipal() { 	// Create and draw the Element showing the Principal Stresses
		//Import the required stresses
		var Sx = stress.x, Sy = stress.y, Txy = stress.xy;
		var P1 = stress.p1, P2 = stress.p2, H = stress.h, T = stress.t;
		var AP = stress.ap, AT = stress.at;
		//Establish the box size and placing variables
		var boxOuter = Math.min(wPEl, hPEl);	//Change this to refer to the Div to make this section responsive
		var boxCenter = boxOuter / 2;
		var boxSize = boxOuter * 0.4;
		var boxBorder = (boxOuter - boxSize)/2;
		var boxGap = boxOuter * 0.08;
		var arrowLen = boxGap * 0.3;
		var boxNear = (boxBorder-boxGap), boxFar = (boxBorder+boxSize+boxGap);
		var arrowTrans = boxOuter * 0.25;

		//Blank the canvas, define arrow
		svgPrincipalCanvas.clear();
		var endArrow = svgPrincipalCanvas.marker(8, 5, function(add) {
			add.path('M 8 2.5 L 0 0 L 0 5 Z')
		})

		//Title for the canvas
		var text = svgPrincipalCanvas.text(function(add) {
			  add.tspan('Principal').x(0).y(20).font("weight", "bold");
			  add.tspan('Stresses').x(0).y(40).font("weight", "bold");
		});

		//Draw the centre orange box
		svgInBox = svgPrincipalCanvas.rect(boxSize,boxSize).translate(boxBorder,boxBorder).rotate(-AP).fill('rgb(255,127,39)').stroke({color:'black',width:2})

		// Establish the arrow length variables (based on stresses from sliders)
		var xArrowLen = arrowLen + (boxFar - boxNear) / 400 * Math.abs(P1);
		var yArrowLen = arrowLen + (boxFar - boxNear) / 400 * Math.abs(P2);

		// Draw the First Principal Stress Arrows
		if (P1 == 0) {
			//No Arrows to draw - no stress in this direction
		} else {
			var text = svgPrincipalCanvas.text(function(add) {
				  add.tspan('\u03C31').x(boxCenter+arrowTrans+20).y(boxCenter-5)
				  add.tspan(P1.toFixed(1) + 'MPa').x(boxCenter+arrowTrans+2).y(boxCenter+14)
			}).rotate(-AP,boxCenter,boxCenter);
			if (P1 > 0) {
				//Stress is positive. Draw arrows accordingly
				svgArrow = svgPrincipalCanvas.line(boxCenter-xArrowLen,boxCenter,boxCenter,boxCenter).translate(boxCenter,0).rotate(-AP,0,boxCenter).stroke({color:'black',width:2})
				svgArrow.marker('end', endArrow)
				svgArrow = svgPrincipalCanvas.line(boxCenter-xArrowLen,boxCenter,boxCenter,boxCenter).translate(boxCenter,0).rotate(180-AP,0,boxCenter).stroke({color:'black',width:2})
				svgArrow.marker('end', endArrow)
			} else {
				//Stress is negative. Draw arrows accordingly
				svgArrow = svgPrincipalCanvas.line(boxCenter,boxCenter,boxCenter-xArrowLen,boxCenter).translate(boxCenter,0).rotate(-AP,0,boxCenter).stroke({color:'black',width:2})
				svgArrow.marker('end', endArrow)
				svgArrow = svgPrincipalCanvas.line(boxCenter,boxCenter,boxCenter-xArrowLen,boxCenter).translate(boxCenter,0).rotate(180-AP,0,boxCenter).stroke({color:'black',width:2})
				svgArrow.marker('end', endArrow)
			}
		}

		// Draw the Second Principal Stress Arrows
		if (P2 == 0) {
			//No Arrows to draw - no stress in this direction
		} else {
			var text = svgPrincipalCanvas.text(function(add) {
				add.tspan('\u03C32').x(boxCenter+5).y(boxCenter-arrowTrans-40)
				add.tspan(P2.toFixed(1) + 'MPa').x(boxCenter+5).y(boxCenter-arrowTrans-20)
			}).rotate(-AP,boxCenter,boxCenter);
			if (P2 > 0) {
				//Stress is positive. Draw arrows accordingly
				svgArrow = svgPrincipalCanvas.line(boxCenter-yArrowLen,boxCenter,boxCenter,boxCenter).translate(boxCenter,0).rotate(90-AP,0,boxCenter).stroke({color:'black',width:2})
				svgArrow.marker('end', endArrow)
				svgArrow = svgPrincipalCanvas.line(boxCenter-yArrowLen,boxCenter,boxCenter,boxCenter).translate(boxCenter,0).rotate(270-AP,0,boxCenter).stroke({color:'black',width:2})
				svgArrow.marker('end', endArrow)
			} else {
				//Stress is negative. Draw arrows accordingly
				svgArrow = svgPrincipalCanvas.line(boxCenter,boxCenter,boxCenter-yArrowLen,boxCenter).translate(boxCenter,0).rotate(90-AP,0,boxCenter).stroke({color:'black',width:2})
				svgArrow.marker('end', endArrow)
				svgArrow = svgPrincipalCanvas.line(boxCenter,boxCenter,boxCenter-yArrowLen,boxCenter).translate(boxCenter,0).rotate(270-AP,0,boxCenter).stroke({color:'black',width:2})
				svgArrow.marker('end', endArrow)
			}
		}

		//Draw the angle indicator
		if (AP == 0) {
			//No angle to report - leave blank
		} else {
			if (AP > 0) {
				//Rotational angle is positive, position angle indicator and text as required.
				var xTrans=Math.sqrt(Math.sqrt((Math.max(Math.min(20/Math.sin(AP/57.296),boxSize),boxSize*Math.sin(AP/57.296)))/boxSize));
				var text = svgPrincipalCanvas.text(function(add) {
					add.tspan(AP.toFixed(1) + '\u00B0').x(boxCenter-boxSize*(0.5-xTrans)).y(boxCenter+boxSize/2+xTrans/4*Math.sin(AP/57.296)+5)
				});
				angleLine = svgPrincipalCanvas.line(boxCenter-boxSize/2,boxCenter+boxSize/2,boxCenter-boxSize/2+boxSize*Math.cos(AP/57.296),boxCenter+boxSize/2+boxSize*Math.sin(AP/57.296)).translate(0,0).rotate(-AP,boxCenter,boxCenter).stroke({color:'black',width:1})
			} else {
				//Rotational angle is negative, position angle indicator and text as required.
				var xTrans=Math.sqrt(Math.sqrt((Math.max(Math.min(20/Math.sin(-AP/57.296),boxSize),boxSize*Math.sin(-AP/57.296)))/boxSize));
				var text = svgPrincipalCanvas.text(function(add) {
					add.tspan(-AP.toFixed(1) + '\u00B0').x(boxCenter-boxSize*(0.5-xTrans)).y(boxCenter-boxSize/2+xTrans/4*Math.sin(AP/57.296)+5)
				});
				angleLine = svgPrincipalCanvas.line(boxCenter-boxSize/2,boxCenter-boxSize/2,boxCenter-boxSize/2+boxSize*Math.cos(AP/57.296),boxCenter-boxSize/2+boxSize*Math.sin(AP/57.296)).translate(0,0).rotate(-AP,boxCenter,boxCenter).stroke({color:'black',width:1})
			}
		}
	}
	drawPrincipal();

	function drawShear() { 	// Create and draw the Element showing the Shear Stresses
		//Import the required stresses
		var Sx = stress.x, Sy = stress.y, Txy = stress.xy;
		var P1 = stress.p1, P2 = stress.p2, H = stress.h, T = stress.t;
		var AP = stress.ap, AT = stress.at;
		//Establish the box size and placing variables
		var boxOuter = 300;	//Change this to refer to the Div to make this section responsive
		var boxCenter = boxOuter / 2;
		var boxSize = boxOuter * 0.4;
		var boxBorder = (boxOuter - boxSize)/2;
		var boxGap = boxOuter * 0.08;
		var arrowLen = boxGap * 0.3;
		var boxNear = (boxBorder-boxGap), boxFar = (boxBorder+boxSize+boxGap);
		var arrowTrans = boxOuter * 0.25;

		//Blank the canvas, define arrow
		svgShearCanvas.clear();
		var endArrow = svgShearCanvas.marker(8, 5, function(add) {
			add.path('M 8 2.5 L 0 0 L 0 5 Z')
		})

		//Title for the canvas
		var text = svgShearCanvas.text(function(add) {
			  add.tspan('Max Shear').x(0).y(20).font("weight", "bold");
			  add.tspan('Stresses').x(0).y(40).font("weight", "bold");
		});

		//Draw the centre yellow box
		svgInBox = svgShearCanvas.rect(boxSize,boxSize).translate(boxBorder,boxBorder).rotate(-AT).fill('rgb(255,242,0)').stroke({color:'black',width:2})

		// Establish the arrow length variable (based on stresses from sliders)
		var hArrowLen = arrowLen + (boxFar - boxNear) / 200 * Math.abs(H);
		var tArrowLen = arrowLen + (boxFar - boxNear) / 300 * Math.abs(T);

		// Draw the First Principal Stress Arrows
		if (H == 0) {
			//No Arrows to draw - no stress in this direction
		} else {
			var text = svgShearCanvas.text(function(add) {
				  add.tspan('\u03C3avg').x(boxCenter+arrowTrans+20).y(boxCenter-5)
				  add.tspan(H.toFixed(1) + 'MPa').x(boxCenter+arrowTrans+2).y(boxCenter+14)
			}).rotate(-AT,boxCenter,boxCenter);
			if (H > 0) {
				//Stress is positive. Draw arrows accordingly
				svgArrow = svgShearCanvas.line(boxCenter-hArrowLen,boxCenter,boxCenter,boxCenter).translate(boxCenter,0).rotate(-AT,0,boxCenter).stroke({color:'black',width:2})
				svgArrow.marker('end', endArrow)
				svgArrow = svgShearCanvas.line(boxCenter-hArrowLen,boxCenter,boxCenter,boxCenter).translate(boxCenter,0).rotate(180-AT,0,boxCenter).stroke({color:'black',width:2})
				svgArrow.marker('end', endArrow)
				svgArrow = svgShearCanvas.line(boxCenter-hArrowLen,boxCenter,boxCenter,boxCenter).translate(boxCenter,0).rotate(90-AT,0,boxCenter).stroke({color:'black',width:2})
				svgArrow.marker('end', endArrow)
				svgArrow = svgShearCanvas.line(boxCenter-hArrowLen,boxCenter,boxCenter,boxCenter).translate(boxCenter,0).rotate(270-AT,0,boxCenter).stroke({color:'black',width:2})
				svgArrow.marker('end', endArrow)
			} else {
				//Stress is negative. Draw arrows accordingly
				svgArrow = svgShearCanvas.line(boxCenter,boxCenter,boxCenter-hArrowLen,boxCenter).translate(boxCenter,0).rotate(-AT,0,boxCenter).stroke({color:'black',width:2})
				svgArrow.marker('end', endArrow)
				svgArrow = svgShearCanvas.line(boxCenter,boxCenter,boxCenter-hArrowLen,boxCenter).translate(boxCenter,0).rotate(180-AT,0,boxCenter).stroke({color:'black',width:2})
				svgArrow.marker('end', endArrow)
				svgArrow = svgShearCanvas.line(boxCenter,boxCenter,boxCenter-hArrowLen,boxCenter).translate(boxCenter,0).rotate(90-AT,0,boxCenter).stroke({color:'black',width:2})
				svgArrow.marker('end', endArrow)
				svgArrow = svgShearCanvas.line(boxCenter,boxCenter,boxCenter-hArrowLen,boxCenter).translate(boxCenter,0).rotate(270-AT,0,boxCenter).stroke({color:'black',width:2})
				svgArrow.marker('end', endArrow)
			}
		}

		// Draw the Shear Stress Arrows
		if (T == 0) {
			//No Arrows to draw - no stress in this direction
		} else {
			var text = svgShearCanvas.text(function(add) {
				  add.tspan('\u03C4max').x(boxCenter+arrowTrans+3).y(boxCenter-arrowTrans-5)
				add.tspan(T.toFixed(1) + 'MPa').x(boxCenter+arrowTrans+3).y(boxCenter-arrowTrans+15)
			}).rotate(-AT,boxCenter,boxCenter);
			if (T > 0) {
				//Stress is positive. Draw arrows accordingly
				svgArrow = svgShearCanvas.line(boxCenter+arrowTrans,boxCenter-tArrowLen,boxCenter+arrowTrans,boxCenter+tArrowLen).rotate(0-AT,boxCenter,boxCenter).stroke({color:'black',width:2})
				svgArrow.marker('end', endArrow)
				svgArrow = svgShearCanvas.line(boxCenter+arrowTrans,boxCenter+tArrowLen,boxCenter+arrowTrans,boxCenter-tArrowLen).rotate(90-AT,boxCenter,boxCenter).stroke({color:'black',width:2})
				svgArrow.marker('end', endArrow)
				svgArrow = svgShearCanvas.line(boxCenter+arrowTrans,boxCenter-tArrowLen,boxCenter+arrowTrans,boxCenter+tArrowLen).rotate(180-AT,boxCenter,boxCenter).stroke({color:'black',width:2})
				svgArrow.marker('end', endArrow)
				svgArrow = svgShearCanvas.line(boxCenter+arrowTrans,boxCenter+tArrowLen,boxCenter+arrowTrans,boxCenter-tArrowLen).rotate(270-AT,boxCenter,boxCenter).stroke({color:'black',width:2})
				svgArrow.marker('end', endArrow)
			} //else {
				//Stress is negative. Draw arrows accordingly
				//svgArrow = svgShearCanvas.line(boxCenter,boxCenter+tArrowLen,boxCenter,boxCenter-tArrowLen).translate(arrowTrans,0).rotate(0).stroke({color:'black',width:2})
				//svgArrow.marker('end', endArrow)
				//svgArrow = svgShearCanvas.line(boxCenter,boxCenter+tArrowLen,boxCenter,boxCenter-tArrowLen).translate(arrowTrans,0).rotate(90,boxCenter-arrowTrans,boxCenter).stroke({color:'black',width:2})
				//svgArrow.marker('end', endArrow)
				//svgArrow = svgShearCanvas.line(boxCenter,boxCenter+tArrowLen,boxCenter,boxCenter-tArrowLen).translate(arrowTrans,0).rotate(180,boxCenter-arrowTrans,boxCenter).stroke({color:'black',width:2})
				//svgArrow.marker('end', endArrow)
				//svgArrow = svgShearCanvas.line(boxCenter,boxCenter+tArrowLen,boxCenter,boxCenter-tArrowLen).translate(arrowTrans,0).rotate(270,boxCenter-arrowTrans,boxCenter).stroke({color:'black',width:2})
				//svgArrow.marker('end', endArrow)
			//}
		}

		//Draw the angle indicator
		if (AT == 0) {
			//No angle to report - leave blank
		} else {
			if (AT > 0) {
				//Rotational angle is positive, position angle indicator and text as required.
				var xTrans=Math.sqrt(Math.sqrt((Math.max(Math.min(20/Math.sin(AT/57.296),boxSize),boxSize*Math.sin(AT/57.296)))/boxSize));
				var text = svgShearCanvas.text(function(add) {
					add.tspan(AT.toFixed(1) + '\u00B0').x(boxCenter-boxSize*(0.5-xTrans)).y(boxCenter+boxSize/2+xTrans/4*Math.sin(AT/57.296)+5)
				});
				angleLine = svgShearCanvas.line(boxCenter-boxSize/2,boxCenter+boxSize/2,boxCenter-boxSize/2+boxSize*Math.cos(AT/57.296),boxCenter+boxSize/2+boxSize*Math.sin(AT/57.296)).translate(0,0).rotate(-AT,boxCenter,boxCenter).stroke({color:'black',width:1})
			} else {
				//Rotational angle is negative, position angle indicator and text as required.
				var xTrans=Math.sqrt(Math.sqrt((Math.max(Math.min(20/Math.sin(-AT/57.296),boxSize),boxSize*Math.sin(-AT/57.296)))/boxSize));
				var text = svgShearCanvas.text(function(add) {
					add.tspan(-AT.toFixed(1) + '\u00B0').x(boxCenter-boxSize*(0.5-xTrans)).y(boxCenter-boxSize/2+xTrans/4*Math.sin(AT/57.296)+5)
				});
				angleLine = svgShearCanvas.line(boxCenter-boxSize/2,boxCenter-boxSize/2,boxCenter-boxSize/2+boxSize*Math.cos(AT/57.296),boxCenter-boxSize/2+boxSize*Math.sin(AT/57.296)).translate(0,0).rotate(-AT,boxCenter,boxCenter).stroke({color:'black',width:1})
			}
		}
	}
	drawShear();

	// Set up page elements
    sXSlider = $('#sX .slider').slider({
		min: -1.e2,
		max: 1.e2,
		step: 1.e0,
		create: function(event, ui) {
			$(this).slider('value',stress.x);
			$('#sX .sliderValue').html(stress.x.toFixed(1) + "MPa");
		},
		slide: function(event,ui){
			$('#sX .sliderValue').html(ui.value.toFixed(1) + "MPa")
			stress.x = ui.value
			calcStress(stress);
			drawCircle();
			drawInElem();
			drawPrincipal();
			drawShear();
		}
	});

    sYSlider = $('#sY .slider').slider({
		min: -1.e2,
		max: 1.e2,
		step: 1.e0,
		create: function(event, ui) {
			$(this).slider('value',stress.y);
			$('#sY .sliderValue').html(stress.y.toFixed(1) + "MPa");
		},
		slide: function(event,ui){
			$('#sY .sliderValue').html(ui.value.toFixed(1) + "MPa")
			stress.y = ui.value
			calcStress(stress);
			drawCircle();
			drawInElem();
			drawPrincipal();
			drawShear();
		}
	});
    
    tZSlider = $('#tZ .slider').slider({
		min: -1.e2,
		max: 1.e2,
		step: 1.e0,
		create: function(event, ui) {
			$(this).slider('value',stress.xy);
			$('#tZ .sliderValue').html(stress.xy.toFixed(1) + "MPa");
		},
		slide: function(event,ui){
			$('#tZ .sliderValue').html(ui.value.toFixed(1) + "MPa")
			stress.xy = ui.value
			calcStress(stress);
			drawCircle();
			drawInElem();
			drawPrincipal();
			drawShear();
		}
	});
}

$(document).ready(main);
