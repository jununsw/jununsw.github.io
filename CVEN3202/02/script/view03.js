/***************************************************************************/
/*                                                                         */
/*  This obfuscated code was created by Javascript Obfuscator Free Version.*/
/*  Javascript Obfuscator Free Version can be downloaded here              */
/*  http://javascriptobfuscator.com                                        */
/*                                                                         */
/***************************************************************************/
var _$_5fa4=["\x66\x6F\x6E\x74\x53\x69\x7A\x65","\x69\x6E\x66\x6F\x62\x6F\x78","\x4F\x70\x74\x69\x6F\x6E\x73","\x6D\x61\x69\x6E\x2D\x70\x6C\x6F\x74","\x69\x6E\x69\x74\x42\x6F\x61\x72\x64","\x4A\x53\x58\x47\x72\x61\x70\x68","\x72\x61\x6E\x64\x6F\x6D","\x70\x6F\x77","\x73\x71\x72\x74","\x23\x30\x30\x62\x66\x66\x66","\x70\x75\x73\x68","\x23\x30\x30\x30\x30\x38\x30","\x72\x65\x64","\x73\x65\x67\x6D\x65\x6E\x74","\x62\x6C\x61\x63\x6B","\x63\x72\x65\x61\x74\x65","\x74\x72\x61\x6E\x73\x70\x61\x72\x65\x6E\x74","\x67\x72\x65\x65\x6E","\x70\x6F\x6C\x79\x67\x6F\x6E","\x67\x72\x65\x79","\x73\x65\x74\x41\x74\x74\x72\x69\x62\x75\x74\x65","\x66\x6F\x72\x45\x61\x63\x68","\x76\x65\x72\x74\x69\x63\x65\x73","\x62\x6F\x72\x64\x65\x72\x73"];JXG[_$_5fa4[2]][_$_5fa4[1]][_$_5fa4[0]]= 0;var board=JXG[_$_5fa4[5]][_$_5fa4[4]](_$_5fa4[3],{boundingbox:[0,650,1000,0],showNavigation:false,keepaspectratio:true,showCopyright:false,axis:false});var leftStart=200;var bottomStart=20;var maxHeight=550;var height=Math[_$_5fa4[6]]()* 150+ 380;var thickness=Math[_$_5fa4[6]]()* 30+ 30;var b=250;var a=Math[_$_5fa4[7]](height- 300,2)/ (-b);var k=a/ 2/ Math[_$_5fa4[8]](-a* (500- b));k= -1/ k;var topStart=500+ (maxHeight- height)/ k;var linelist=[];linelist[_$_5fa4[10]](createCustomCurve(board,function(_0x104B6){return _0x104B6+ 500},function(_0x104B6){return Math[_$_5fa4[8]](a* (_0x104B6- b))+ 300},250,_$_5fa4[9]));linelist[_$_5fa4[10]](createCustomCurve(board,function(_0x104B6){if(_0x104B6< 300- bottomStart){return leftStart}else {if(_0x104B6< 300- bottomStart+ 950- leftStart){return leftStart+ (_0x104B6- (300- bottomStart))}else {return 950}}},function(_0x104B6){if(_0x104B6< 300- bottomStart){return 300- _0x104B6}else {if(_0x104B6< 300- bottomStart+ 950- leftStart){return bottomStart}else {return bottomStart+ (_0x104B6- (300- bottomStart+ 950- leftStart))}}},300- thickness- bottomStart+ 300- bottomStart+ 950- leftStart,_$_5fa4[11]));linelist[_$_5fa4[10]](createCustomCurve(board,function(_0x104B6){return 500- _0x104B6},function(_0x104B6){if(_0x104B6< (height- 300)/ k){return height- _0x104B6* k}else {return 300}},500- leftStart,_$_5fa4[12]));linelist[_$_5fa4[10]](createCustomCurve(board,function(_0x104B6){if(_0x104B6< 100){return 750- _0x104B6}else {if(_0x104B6< 100+ thickness){return 650}else {return 650+ (_0x104B6- thickness- 100)}}},function(_0x104B6){if(_0x104B6< 100){return 300}else {if(_0x104B6< 100+ thickness){return 300- (_0x104B6- 100)}else {return 300- thickness}}},400+ thickness,_$_5fa4[12]));var net=createFlowNet(board,linelist);board[_$_5fa4[15]](_$_5fa4[13],[[500,height],[topStart,maxHeight]],{strokecolor:_$_5fa4[14],highlight:false,fixed:true});board[_$_5fa4[15]](_$_5fa4[13],[[650,maxHeight],[topStart,maxHeight]],{strokecolor:_$_5fa4[14],highlight:false,fixed:true});board[_$_5fa4[15]](_$_5fa4[13],[[650,maxHeight],[850,300- thickness]],{strokecolor:_$_5fa4[14],highlight:false,fixed:true});board[_$_5fa4[15]](_$_5fa4[13],[[650+ 100,300],[650+ (maxHeight- 300)/ ((maxHeight- 300+ thickness)/ (850- 650)),300]],{strokecolor:_$_5fa4[16],highlight:false,fixed:true});board[_$_5fa4[15]](_$_5fa4[13],[[500,height],[leftStart,height]],{strokecolor:_$_5fa4[17],strokewidth:2,dash:2,highlight:false,fixed:true});board[_$_5fa4[15]](_$_5fa4[13],[[950,300],[650+ (maxHeight- 300)/ ((maxHeight- 300+ thickness)/ (850- 650)),300]],{strokecolor:_$_5fa4[17],strokewidth:2,dash:2,highlight:false,fixed:true});var shadow=board[_$_5fa4[15]](_$_5fa4[18],[[650,300],[650+ (maxHeight- 300)/ ((maxHeight- 300+ thickness)/ (850- 650)),300],[850,300- thickness],[650,300- thickness]],{fillColor:_$_5fa4[19],highlight:false});shadow[_$_5fa4[22]][_$_5fa4[21]](function(_0x10429){_0x10429[_$_5fa4[20]]({visible:false})});shadow[_$_5fa4[23]][_$_5fa4[21]](function(_0x10429){_0x10429[_$_5fa4[20]]({visible:false})})