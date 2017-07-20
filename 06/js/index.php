<?php

    $ref = $_SERVER['HTTP_REFERER'];

    $refData = parse_url($ref);

    $protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off' || $_SERVER['SERVER_PORT'] == 443) ? "https://" : "http://";



    if($refData['host'] !== 'www.civmaster.com.au') {

  

      header('Location: '. $protocol . 'www.civmaster.com.au');

    } else {



      require('../wp-blog-header.php');

      if(!is_user_logged_in()) {

        header('Location: '. $protocol . 'www.civmaster.com.au/login/');

      }

    }

?>

<!DOCTYPE html>

<!--http://structural-analyser.com/-->

<html>

  <head>

      <meta charset="utf-8">

      <title>Frame Online</title>

      <link rel="shortcut icon" type="image/x-icon" href="css/StrianIcon_Transp_48x48.ico"/>

      <meta name="description"  content="Free online structural analysis software for Android and iPad">

      <meta name="keywords"     content="online, structural analysis, android, iPad, free, download">

      <meta name="Authors"       content="Xiaojun Chen, PhD, Lindenbaum Pty Ltd">

      <meta name="apple-mobile-web-app-capable" content="yes">

      <meta id="viewport"       name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no">



      <link href='css/main.css' rel='stylesheet' media="all"/>



      <link rel="stylesheet" type="text/css" href="HTML-KickStart-master/css/fonts/font-awesome-4.2.0/css/font-awesome.css"/>



      <link rel="stylesheet" type="text/css" href="css/kickstart.css" media="all" />

      <link rel="stylesheet" type="text/css" href="css/styleKickStart.css" media="all" /> 



      <!--script src="jquery-ui/js/jquery-1.11.2.js"></script-->

      <!--script src="jquery-ui/js/jquery-1.11.2.js"></script-->

      <script src="libs/pathseg.min.js"></script>

      <script src="jquery-ui/js/jquery-1.11.2.min.js"></script>



      <script src="HTML-KickStart-master/js/kickstart.js"></script>



      <!--script src="jquery-ui/js/jquery-ui-1.11.2.custom.js"></script-->

      <script src="jquery-ui/js/jquery-ui.min.js"></script>



      <script src="jquery-ui/js/jquery.cookie.js"></script>



      <script src="libs/jquery.ui.touch-punch.js"></script>



      <script src="libs/2D.js"></script>



      <!--script src="libs/svg.js"></script-->

      <script src="libs/svg.min.js"></script>



      <!--script src="https://apis.google.com/js/platform.js" async defer></script-->





      <!--script src="libs/waterbug.js"></script-->

  </head>



  <body>

    <noscript><br><b>Javascript required</b><br>This is an online software for structural analysis. Its functionality depends on javascript<br></noscript>



    <div id="sti_svg_canvas" style="overflow:hidden;"> 

    </div>



    <div id="sti_toolbar_bg" >  <!-- TODO XXX to ul je asi k nicemu -->

      <!--ul class="tb-background" >

        <li style="padding:0; height:0px;"> </li>

      </ul-->

    </div>



    <div id="sti_toolbar_hiden" style="display:none;">

    </div>



    <div id="sti_toolbar" >

      <ul class="button-bar" style="display: table; list-style-type: none; " _style="position: fixed; is added by app">

        <!--li id="tool_new" class="disabled"> <a onclick="return toolClicked(event);" >     <i class="fa fa-file-o"></i> New</a></li>

        <li id="tool_open" class="disabled"><a onclick="return toolClicked(event);" >     <i class="fa fa-folder-open-o"></i> Open</a></li>

        <li id="tool_save" class="disabled"><a onclick="return toolClicked(event);" >     <i class="fa fa-save"></i> Save</a></li-->

        <li id="tool_zoom_out" class="disabled"><a onclick="return toolClicked(event);" > <i class="fa fa-search-minus"></i></a></li>

        <li id="tool_zoom_in" class="disabled"> <a onclick="return toolClicked(event);" > <i class="fa fa-search-plus"></i></a></li>

        <li id="tool_select" class="disabled">  <a onclick="return toolClicked(event);" > <i class="fa fa-square-o"></i> De-Select</a></li>

        <li id="tool_escape" class="disabled">  <a onclick="return toolClicked(event);" > <i class="fa fa-remove"></i> Abort</a></li>

        <li id="tool_delete" class="disabled">  <a onclick="return toolClicked(event);" > <i class="fa fa-trash-o"></i> Remove</a></li>



        <li id="tool_delete_break"></li> 



        <li id="tool_sections" class="disabled"><a onclick="return toolClicked(event);">  <i class="fa fa-th-list"></i> Sections</a></li>

        <li id="tool_supports" class="disabled"><a onclick="return toolClicked(event);">  <i class="fa fa-eject"></i> Supports</a></li>

        <li id="tool_hinge" class="disabled">   <a onclick="return toolClicked(event);">  <i class="fa fa-circle-o"></i> Hinges</a></li>

        <li id="tool_load" class="disabled">    <a onclick="return toolClicked(event);">  <i class="fa fa-arrow-down"></i> Loads</a></li>

        <li id="tool_calc" class="disabled">    <a onclick="return toolClicked(event);">  <i class="fa fa-play"></i> Solve</a></li>

        <li id="tool_view" class="disabled">    <a onclick="return toolClicked(event);">  <i class="fa fa-signal"></i> Diagrams</a></li>

        <li id="tool_settings" class="disabled"><a onclick="return toolClicked(event);">  <i class="fa fa-wrench"></i> Settings</a></li>

        <!--li id="tool_tools" class="disabled">   <a onclick="return toolClicked(event);">  <i class="fa fa-caret-down"></i> Tools</a></li-->

        <!--li id="tool_hide_tb" style="background: #ffe8c0; position: fixed; left:auto; right:0;"> <a onclick="return toolClicked(event);" ><i class="fa fa-angle-double-up"></i></a></li-->

      </ul>

    </div>



   <div id="form_load_modify" class="form_main_envelope" style="display:none;width:14em;" >

    <div class="sti_form">

      <div >

        <div class="fa fa-minus" >

        </div>

        <div class="dialogDesc">Modify load</div>

        <div class="bar_qr">

          <div class="fa fa-question" help="help_modify_load" ></div>

          <div class="fa fa-remove" ></div>

        </div>

      </div>

      <div class="form_body" >

        <form class="_vertical" defaultbutton="form_mod_load_apply_btn" >

         <fieldset style="padding-bottom: 0;margin-top: 0.5em; margin-bottom:0.5em;">

           <div id="form_load_modify_sizeC" class="col_12" style=""> <!-- continuous -->

            <label title="Load value" class="col_5" style="text-align:start; margin:0;" for="form_load_modify_valC">Size</label>

            <input title="Load value" onfocusout="modifyLoadFocusOut();" onfocusin="modifyLoadFocusIn();" class="col_4" style="margin:0;" id="form_load_modify_valC" type="text" />

            <label class="col_2" style="text-align:start; margin:0;" for="form_load_modify_valC" id="form_load_modify_C" >kN/m</label>

          </div>

           <div id="form_load_modify_sizeC2" class="col_12" style=""> <!-- continuous end -->

            <label title="End value for non-uniform load" class="col_5" style="text-align:start; margin:0;" for="form_load_modify_valC2">Size<sub>end</sub></label>

            <input title="End value for non-uniform load" onfocusout="modifyLoadFocusOut();" onfocusin="modifyLoadFocusIn();" class="col_4" style="margin:0;" id="form_load_modify_valC2" type="text" />

            <label class="col_2" style="text-align:start; margin:0;" for="form_load_modify_valC2" id="form_load_modify_C2" >kN/m</label>

          </div>

          <div id="form_load_modify_sizeF" class="col_12" style="">

            <label class="col_5" style="text-align:start; margin:0;" for="form_load_modify_valF">Size</label>

            <input onfocusout="modifyLoadFocusOut();" onfocusin="modifyLoadFocusIn();" class="col_4" style="margin:0;" id="form_load_modify_valF" type="text" />

            <label class="col_2" style="text-align:start; margin:0;" for="form_load_modify_valF" id="form_load_modify_F" >kN</label>

          </div>

          <div id="form_load_modify_sizeM" class="col_12" style="">

            <label class="col_5" style="text-align:start; margin:0;" for="form_load_modify_valM">Size</label>

            <input onfocusout="modifyLoadFocusOut();" onfocusin="modifyLoadFocusIn();" class="col_4" style="margin:0;" id="form_load_modify_valM" type="text" />

            <label class="col_2" style="text-align:start; margin:0;" for="form_load_modify_valM" id="form_load_modify_M" >kNm</label>

          </div>

          <div id="form_load_modify_angle" class="col_12" style="">

            <label class="col_5" style="text-align:start; margin:0;" for="form_load_modify_ang" title="Angle of force measured counter-clockwise from top's 0&deg;" >Angle</label>

            <input onfocusout="modifyLoadFocusOut();" onfocusin="modifyLoadFocusIn();" class="col_4" style="margin:0;" id="form_load_modify_ang" type="text" title="Angle of force measured counter-clockwise from top's 0&deg;" />

            <label class="col_2" style="text-align:start; margin:0;" for="form_load_modify_ang">&deg;</label>

          </div>

          <div id="form_load_modify_pos" class="col_12" style="">

            <label title="Position along the beam" class="col_5" style="text-align:start; margin:0;" for="form_load_modify_ps">Position</label>

            <input title="Position along the beam" onfocusout="modifyLoadFocusOut();" onfocusin="modifyLoadFocusIn();" class="col_4" style="margin:0;" id="form_load_modify_ps" type="text" />

            <label class="col_2" style="text-align:start; margin:0;" for="form_load_modify_ps">m</label>

          </div>

          <div id="form_load_modify_start_pos" class="col_12" style="">

            <label title="Start position along the beam" class="col_5" style="text-align:start; margin:0;" for="form_load_modify_pos1">Start pos.</label>

            <input title="Start position along the beam" onfocusout="modifyLoadFocusOut();" onfocusin="modifyLoadFocusIn();" class="col_4" style="margin:0;" id="form_load_modify_pos1" type="text" />

            <label class="col_2" style="text-align:start; margin:0;" for="form_load_modify_pos1">m</label>

          </div>

          <div id="form_load_modify_end_pos" class="col_12" style="">

            <label title="End position along the beam" class="col_5" style="text-align:start; margin:0;" for="form_load_modify_pos2">End pos.</label>

            <input title="End position along the beam" onfocusout="modifyLoadFocusOut();" onfocusin="modifyLoadFocusIn();" class="col_4" style="margin:0;" id="form_load_modify_pos2" type="text" />

            <label class="col_2" style="text-align:start; margin:0;" for="form_load_modify_pos2">m</label>

          </div>

         </fieldset>

          <center>

            <button id="form_mod_load_apply_btn" type="submit">Apply</button>

            <button id="form_mod_load_remove_btn" type="submit">Remove</button>

          </center>

        </form>

      </div>

    </div>

   </div>



   <div id="form_hinge" class="form_main_envelope" style="display:none;width:14em;" >

    <div class="sti_form">

      <div >

        <div class="fa fa-minus">

        </div>

        <div class="dialogDesc">Hinge</div>

        <div class="bar_qr">

          <div class="fa fa-question" help="help_hinges"></div>

          <div class="fa fa-remove" ></div>

        </div>

      </div>

      <div class="form_body">

        <div class="col_12 form_separator" ></div>

        <p>Place or remove hinges within a beam</p>

        <p class="cite"><strong>Bulk mode</strong> (optional):<br> <strong>select</strong> group of beams (eg. of a truss) and apply hinge to the group</p>

        <center>

          <!-- note: the _type="default" attribute serves to app to pickup default button when enter is pressed -->

          <button id="hinge_apply_btn" type="submit" _type="default">Apply</button>

        </center>

      </div>

    </div>

   </div>



   <div id="form_supports" class="form_main_envelope" style="display:none;width:12em;" >

    <div class="sti_form">

      <div >

        <div class="fa fa-minus">

        </div>

        <div class="dialogDesc">Supports</div>

        <div class="bar_qr">

          <div class="fa fa-question" help="help_support"></div>

          <div class="fa fa-remove" ></div>

        </div>

      </div>

      <div class="form_body" style="width:100%;">

        <form class="vertical" >

         <fieldset style="margin-bottom:0.5em;margin-top:0.5em;">

          <input type="radio" name="radio" id="radio_support_pinned" onchange="supportEntryModified();" />

          <label for="radio_support_pinned" class="inline">Pinned</label>

          <br>

          <input type="radio" name="radio" id="radio_support_roller" onchange="supportEntryModified();" />

          <label for="radio_support_roller" class="inline">Roller</label>

          <br>

          <input type="radio" name="radio" id="radio_support_roller_vert" onchange="supportEntryModified();" />

          <label for="radio_support_roller_vert" id="radio_support_roller_vtext" class="inline">Roller&nbsp;vertical</label>

          <br>

          <input type="radio" name="radio" id="radio_support_fixed" onchange="supportEntryModified();" />

          <label for="radio_support_fixed" class="inline">Fixed</label>

          <br>

          <input type="radio" name="radio" id="radio_support_remove" onchange="supportEntryModified();" />

          <label for="radio_support_remove" class="inline">Remove</label>

         </fieldset>

          <center>

         <button id="support_apply_btn" type="submit" _type="default">Apply</button>

          </center>

        </form>

      </div>

    </div>

   </div>



   <div id="form_new" class="form_main_envelope" style="display:none;width:12em;" >

    <div class="sti_form">

      <div >

        <div class="fa fa-minus">

        </div>

        <div class="dialogDesc">New</div>

        <div class="bar_qr">

          <div class="fa fa-question" help="help_new"></div>

          <div class="fa fa-remove" ></div>

        </div>

      </div>

      <div class="form_body" style="width:100%;">

        <div class="col_12 form_separator" ></div>

        <p>Loose&nbsp;everything?</p>

        <center>

          <button id="button_new_ok" type="submit" _type="default" >OK</button>

          <button id="button_new_cancel" type="submit">Cancel</button>

        </center>

      </div>

    </div>

   </div>



   <div id="form_save" class="form_main_envelope" style="display:none;width:12em;" >

    <div class="sti_form">

      <div >

        <div class="fa fa-minus">

        </div>

        <div class="dialogDesc">Save</div>

        <div class="bar_qr">

          <div class="fa fa-question" help="help_save"></div>

          <div class="fa fa-remove" ></div>

        </div>

      </div>

      <div class="form_body">

        <div class="col_12 form_separator" ></div>

        <p>You will loose old backup</p>

        <center>

          <button id="button_save_ok" type="submit" _type="default">Save</button>

          <button id="button_save_cancel" type="submit">Cancel</button>

        </center>

      </div>

    </div>

   </div>



   <div id="form_open" class="form_main_envelope" style="display:none;width:12em;" >

    <div class="sti_form">

      <div >

        <div class="fa fa-minus">

        </div>

        <div class="dialogDesc">Open</div>

        <div class="bar_qr">

          <div class="fa fa-question" help="help_open"></div>

          <div class="fa fa-remove" ></div>

        </div>

      </div>

      <div class="form_body">

        <div class="col_12 form_separator" ></div>

        <div class="col_12" >

          <select class="col_12" id="open_file_menu" _onchange="openFileSelected(this, this.selectedIndex);"><option value="0">-- Choose --</option></select>

        </div>

        <p>The current project will be lost</p>

        <center>

          <button id="button_open_ok" type="submit" _type="default">Load</button>

          <button id="button_open_cancel" type="submit">Cancel</button>

        </center>

      </div>

    </div>

   </div>



  <!-- VIEW DIALOG -->

   <div id="form_view" class="form_main_envelope" style="display:none;width:12em;" >

    <div class="sti_form">

      <div >

        <div class="fa fa-minus">

        </div>

        <div class="dialogDesc">Diagrams</div>

        <div class="bar_qr">

          <div class="fa fa-question" help="help_diagrams"></div>

          <div class="fa fa-remove" ></div>

        </div>

      </div>

      <div class="form_body">

        <ul class="tabs left">

          <li><a href="#tab_view_Main">Main</a></li>

          <li><a href="#tab_view_1m">M</a></li>

          <li><a href="#tab_view_V">V</a></li>

          <li><a href="#tab_view_N">N</a></li>

          <li><a href="#tab_view_d">d</a></li>

        </ul>



        <div id="tab_view_Main" class="tab-content">

          <div class="col_12 label_envelope ">

            <div class="col_3">On</div>

            <div class="col_3">Off</div>

            <div class="col_6"></div>

          </div>



          <div class="col_12 label_envelope ">

            <div class="col_3">

              <input onchange="viewChangedMainAll(this);" id="form_view_on_all" title="on" type="radio" name="radio_show_Main" />

            </div>



            <div class="col_3">

              <input onchange="viewChangedMainAll(this);" id="form_view_off_all" title="off" type="radio" name="radio_show_Main" />

            </div>



            <div class="col_6"><strong>All</strong></div>

          </div>



          <div class="col_12 label_envelope h20">

            <div class="col_3">

              <input onchange="viewChangedMain(this);" id="form_view_on_supports" title="on" type="radio" name="radio_show_Supports" />

            </div>



            <div class="col_3">

              <input onchange="viewChangedMain(this);" id="form_view_off_supports" title="off" type="radio" name="radio_show_Supports" />

            </div>



            <div class="col_6">Supports</div>

          </div>



          <div class="col_12 label_envelope h20">

            <div class="col_3">

              <input onchange="viewChangedMain(this);" id="form_view_on_loads" title="on" type="radio" name="radio_show_Loads" />

            </div>



            <div class="col_3">

              <input onchange="viewChangedMain(this);" id="form_view_off_loads" title="off" type="radio" name="radio_show_Loads" />

            </div>



            <div class="col_6">Loads</div>

          </div>



          <div class="col_12 label_envelope h20">

            <div class="col_3">

              <input onchange="viewChangedMain(this);" id="form_view_on_nodes" title="on" type="radio" name="radio_show_Nodes" />

            </div>



            <div class="col_3">

              <input onchange="viewChangedMain(this);" id="form_view_off_nodes" title="off" type="radio" name="radio_show_Nodes" />

            </div>



            <div class="col_6">Nodes</div>

          </div>



          <div class="col_12 label_envelope h20">

            <div class="col_3">

              <input onchange="viewChangedMain(this);" id="form_view_on_reactions" title="on" type="radio" name="radio_show_Reactions" />

            </div>



            <div class="col_3">

              <input onchange="viewChangedMain(this);" id="form_view_off_reactions" title="off" type="radio" name="radio_show_Reactions" />

            </div>



            <div class="col_6" id="form_view_on_reactions_l"><div style="display:inline-block;border:0;margin:0;padding:0;">Reactions</div></div>

          </div>



          <div class="col_12 label_envelope h20">

            <div class="col_3">

              <input onchange="viewChangedMain(this);" id="form_view_on_grid" title="on" type="radio" name="radio_show_Grid" />

            </div>



            <div class="col_3">

              <input onchange="viewChangedMain(this);" id="form_view_off_grid" title="off" type="radio" name="radio_show_Grid" />

            </div>



            <div class="col_6" id="form_view_on_reactions_l"><div style="display:inline-block;border:0;margin:0;padding:0;">Grid</div></div>

          </div>



          <!--div class="col_12 label_envelope h20">

          </div-->

        </div>



        <div id="tab_view_1m" class="tab-content">

          <div class="col_12 label_envelope ">

            <div class="col_3"><center>On</center></div>

            <div class="col_3"><center>Off</center></div>

            <div class="col_6"></div>

          </div>



          <div class="col_12 label_envelope h20">

            <div class="col_3">

              <center><input onchange="viewChanged(this, event);" id="form_view_on_M" type="radio" title="Turn on" name="radio_show_M" /></center>

            </div>



            <div class="col_3">

              <center><input onchange="viewChanged(this, event);" id="form_view_off_M" type="radio" title="Turn off" name="radio_show_M" /></center>

            </div>



            <div class="col_6" id="form_view_on_reactions_M"><div style="display:inline-block;border:0;margin:0;padding:0;">Diagram</div></div>

          </div>



          <div class="col_12 label_envelope h20" style="margin-bottom: 0.5em;">

            <div class="col_3">

              <center><input onchange="viewChanged(this, event);" id="form_view_on_M_reverse" title="Turn on" type="radio" name="radio_show_M_reverse" /></center>

            </div>



            <div class="col_3">

              <center><input onchange="viewChanged(this, event);" id="form_view_off_M_reverse" title="Turn off" type="radio" name="radio_show_M_reverse" /></center>

            </div>



            <div class="col_6">Reverse</div>

          </div>



          <div class="col_12 h20">

            <div class="col_9 label_envelope" id="tab_view_M_units">Units: kNm</div>

          </div>

          <div class="col_12 label_envelope h20">Zoom:</div>



          <div class="col_12 h20">

            <center>

            <button onclick="zoom_M_minus(event);"    class="small"><i class="fa fa-caret-left"></i></button>

            <input onfocusout="zoomDispInputFocusOut();" onfocusin="zoomDispInputFocusIn();" onchange="zoom_M_entered(event);" class="col_5" id="form_view_scale_M" type="text" style="margin-top:0;" />

            <button onclick="zoom_M_plus(event);"     class="small"><i class="fa fa-caret-right"></i></button>

            </center>

          </div>

        </div>



        <div id="tab_view_V" class="tab-content">

          <div class="col_12 label_envelope ">

            <div class="col_3"><center>On</center></div>

            <div class="col_3"><center>Off</center></div>

            <div class="col_6"></div>

          </div>



          <div class="col_12 label_envelope h20" style="margin-bottom: 0.5em;">

            <div class="col_3">

              <center><input onchange="viewChanged(this, event);" id="form_view_on_V" type="radio" title="Turn on" name="radio_show_V" /></center>

            </div>



            <div class="col_3">

              <center><input onchange="viewChanged(this, event);" id="form_view_off_V" type="radio" title="Turn off" name="radio_show_V" /></center>

            </div>



            <div class="col_6" id="form_view_on_reactions_V"><div style="display:inline-block;border:0;margin:0;padding:0;">Diagram</div></div>

          </div>



          <div class="col_12 h20">

            <div class="col_9 label_envelope" id="tab_view_V_units">Units: kN</div>

          </div>

          <div class="col_12 label_envelope h20">Zoom:</div>



          <div class="col_12 h20">

            <center>

            <button onclick="zoom_V_minus(event);"    class="small"><i class="fa fa-caret-left"></i></button>

            <input  onfocusout="zoomDispInputFocusOut();" onfocusin="zoomDispInputFocusIn();" onchange="zoom_V_entered(event);" class="col_5" id="form_view_scale_V" type="text" style="margin-top:0;" />

            <button onclick="zoom_V_plus(event);"     class="small"><i class="fa fa-caret-right"></i></button>

            </center>

          </div>

        </div>



        <div id="tab_view_N" class="tab-content">

          <div class="col_12 label_envelope ">

            <div class="col_3"><center>On</center></div>

            <div class="col_3"><center>Off</center></div>

            <div class="col_6"></div>

          </div>



          <div class="col_12 label_envelope h20" style="margin-bottom: 0.5em;">

            <div class="col_3">

              <center><input onchange="viewChanged(this, event);" id="form_view_on_N" type="radio" title="Turn on" name="radio_show_N" /></center>

            </div>



            <div class="col_3">

              <center><input onchange="viewChanged(this, event);" id="form_view_off_N" type="radio" title="Turn off" name="radio_show_N" /></center>

            </div>



            <div class="col_6" id="form_view_on_reactions_N"><div style="display:inline-block;border:0;margin:0;padding:0;">Diagram</div></div>

          </div>



          <div class="col_12 h20">

            <div class="col_9 label_envelope" id="tab_view_N_units">Units: kN</div>

          </div>

          <div class="col_12 label_envelope h20">Zoom:</div>



          <div class="col_12 h20">

            <center>

            <button onclick="zoom_N_minus(event);"    class="small"><i class="fa fa-caret-left"></i></button>

            <input  onfocusout="zoomDispInputFocusOut();" onfocusin="zoomDispInputFocusIn();" onchange="zoom_N_entered(event);" class="col_5" id="form_view_scale_N" type="text" style="margin-top:0;" />

            <button onclick="zoom_N_plus(event);"     class="small"><i class="fa fa-caret-right"></i></button>

            </center>

          </div>

        </div>



        <div id="tab_view_d" class="tab-content">

          <div class="col_12 label_envelope ">

            <div class="col_3"><center>On</center></div>

            <div class="col_3"><center>Off</center></div>

            <div class="col_6"></div>

          </div>



          <div class="col_12 label_envelope h20" style="margin-bottom: 0.5em;">

            <div class="col_3">

              <center><input onchange="viewChanged(this, event);" id="form_view_on_d" type="radio" title="Turn on" name="radio_show_d" value="form_view_on_d"/></center>

            </div>



            <div class="col_3">

              <center><input onchange="viewChanged(this, event);" id="form_view_off_d" type="radio" title="Turn off" name="radio_show_d" value="form_view_off_d"/></center>

            </div>



            <div class="col_6" id="form_view_on_reactions_d"><div style="display:inline-block;border:0;margin:0;padding:0;">Diagram</div></div>

          </div>



          <div class="col_12 h20">

            <div class="col_9 label_envelope" id="tab_view_d_units">Units: m</div>

          </div>

          <div class="col_12 label_envelope h20">Zoom:</div>



          <div class="col_12 h20">

            <center>

            <button onclick="return zoom_displ_minus(event);"    class="small"><i class="fa fa-caret-left"></i></button>

            <input  onfocusout="zoomDispInputFocusOut();" onfocusin="zoomDispInputFocusIn();" onchange="zoom_displ_entered(event);" class="col_5" id="form_view_scale_d" type="text" style="margin-top:0;" />

            <button onclick="return zoom_displ_plus(event);"     class="small"><i class="fa fa-caret-right"></i></button>

            </center>

          </div>

        </div>

      </div>

    </div>

   </div>



  <!-- LOAD DIALOG -->

   <div id="form_load" class="form_main_envelope" style="display:none;width:21em;" >

    <div class="sti_form">

      <div >

        <div class="fa fa-minus">

        </div>

        <div class="dialogDesc">Loads</div>

        <div class="bar_qr">

          <div class="fa fa-question" help="help_loads"></div>

          <div class="fa fa-remove" ></div>

        </div>

      </div>

      <div class="form_body" style="margin-bottom:0; width:100%;">

        <ul class="tabs left">

          <li><a onclick="loadsTabSwitched(event);" href="#tab_load_single">Single</a></li>

          <li><a onclick="loadsTabSwitched(event);" href="#tab_load_uniform">Distributed</a></li>

          <li><a onclick="loadsTabSwitched(event);" href="#tab_load_remove">Remove</a></li>

        </ul>



        <form class="_vertical" defaultbutton="form_load_single_button" >

          <div id="tab_load_single" class="tab-content">

            <div class="col_3" id="tab_load_single_img" style="margin-top:0.35em; margin-bottom:-0.35em;">

<svg

   xmlns:dc="http://purl.org/dc/elements/1.1/"

   xmlns:cc="http://creativecommons.org/ns#"

   xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"

   xmlns:svg="http://www.w3.org/2000/svg"

   xmlns="http://www.w3.org/2000/svg"

   xmlns:xlink="http://www.w3.org/1999/xlink"

   xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"

   xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"

   id="svg2"

   version="1.1"

   inkscape:version="0.48.5 r10040"

   width="46"

   height="46.5"

   xml:space="preserve"

   sodipodi:docname="k2.svg"><metadata

     id="metadata8"><rdf:RDF><cc:Work

         rdf:about=""><dc:format>image/svg+xml</dc:format><dc:type

           rdf:resource="http://purl.org/dc/dcmitype/StillImage" /><dc:title></dc:title></cc:Work></rdf:RDF></metadata><defs

     id="defs6"><marker

       inkscape:stockid="TriangleOutL"

       orient="auto"

       refY="0"

       refX="0"

       id="TriangleOutL"

       style="overflow:visible"><path

         id="path4123"

         d="m 5.77,0 -8.65,5 0,-10 8.65,5 z"

         style="fill-rule:evenodd;stroke:#000000;stroke-width:1pt"

         transform="scale(0.8,0.8)"

         inkscape:connector-curvature="0" /></marker><marker

       inkscape:stockid="Arrow1Lend"

       orient="auto"

       refY="0"

       refX="0"

       id="Arrow1Lend"

       style="overflow:visible"><path

         id="path3984"

         d="M 0,0 5,-5 -12.5,0 5,5 0,0 z"

         style="fill-rule:evenodd;stroke:#000000;stroke-width:1pt"

         transform="matrix(-0.8,0,0,-0.8,-10,0)"

         inkscape:connector-curvature="0" /></marker><marker

       inkscape:stockid="Arrow2Lend"

       orient="auto"

       refY="0"

       refX="0"

       id="Arrow2Lend"

       style="overflow:visible"><path

         id="path4002"

         style="fill-rule:evenodd;stroke-width:0.625;stroke-linejoin:round"

         d="M 8.7185878,4.0337352 -2.2072895,0.01601326 8.7185884,-4.0017078 c -1.7454984,2.3720609 -1.7354408,5.6174519 -6e-7,8.035443 z"

         transform="matrix(-1.1,0,0,-1.1,-1.1,0)"

         inkscape:connector-curvature="0" /></marker><marker

       inkscape:stockid="Arrow1Sstart"

       orient="auto"

       refY="0"

       refX="0"

       id="Arrow1Sstart"

       style="overflow:visible"><path

         id="path3993"

         d="M 0,0 5,-5 -12.5,0 5,5 0,0 z"

         style="fill-rule:evenodd;stroke:#000000;stroke-width:1pt"

         transform="matrix(0.2,0,0,0.2,1.2,0)"

         inkscape:connector-curvature="0" /></marker><clipPath

       clipPathUnits="userSpaceOnUse"

       id="clipPath18"><path

         d="m 0,419.621 400,0 0,-409.99991 -400,0 0,409.99991 z"

         id="path20"

         inkscape:connector-curvature="0" /></clipPath></defs><sodipodi:namedview

     pagecolor="#ffffff"

     bordercolor="#666666"

     borderopacity="1"

     objecttolerance="10"

     gridtolerance="10"

     guidetolerance="10"

     inkscape:pageopacity="0"

     inkscape:pageshadow="2"

     inkscape:window-width="1366"

     inkscape:window-height="749"

     id="namedview4"

     showgrid="false"

     inkscape:zoom="4.4952381"

     inkscape:cx="14.576271"

     inkscape:cy="26.25"

     inkscape:window-x="-4"

     inkscape:window-y="-4"

     inkscape:window-maximized="1"

     inkscape:current-layer="g10"><inkscape:grid

       type="xygrid"

       id="grid3017"

       empspacing="5"

       visible="true"

       enabled="true"

       snapvisiblegridlinesonly="true" /></sodipodi:namedview><g

     id="g10"

     inkscape:groupmode="layer"

     inkscape:label="ink_ext_XXXXXX"

     transform="matrix(1.25,0,0,-1.25,0,46.5)"><path

       inkscape:connector-curvature="0"

       id="path22"

       style="fill:none;stroke:#000000;stroke-width:3.20000005;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none"

       d="M 2.4988058,5.2428978 34.498846,29.242868" /><path

       inkscape:connector-curvature="0"

       id="path24"

       style="fill:none;stroke:#000000;stroke-width:0.69467604;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:5.55740839, 1.3893521, 0.69467605, 1.3893521;stroke-dashoffset:0"

       d="m 18.498846,36.691146 0,-18.096556" /><path

       inkscape:connector-curvature="0"

       id="path30"

       style="fill:none;stroke:#0000ff;stroke-width:2.4;stroke-linecap:butt;stroke-linejoin:round;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none"

       d="M 31.943322,18.811824 C 35.62622,13.864474 34.526526,6.9225473 29.496088,3.3074824 24.610086,-0.19995795 17.781201,0.69568167 14.006656,5.34073" /><path

       inkscape:connector-curvature="0"

       id="path34"

       style="fill:none;stroke:#0000ff;stroke-width:2;stroke-linecap:round;stroke-linejoin:miter;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none"

       d="m 30.506746,21.021245 0.457014,-6.076096 4.255148,2.215095 -4.712162,3.861001" /><path

       inkscape:connector-curvature="0"

       id="path36"

       style="fill:none;stroke:#000000;stroke-width:1.20000005;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none"

       d="m 5.7191779,26.614114 c 2.6805879,4.528461 7.5361211,7.317615 12.7957191,7.351308" /><path

       d="m 16.55946,17.778199 -3.4924,4.993089 -2.53008,-4.075737 6.02248,-0.917352"

       style="fill:none;stroke:#0000ff;stroke-width:2;stroke-linecap:round;stroke-linejoin:miter;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none"

       id="path3973"

       inkscape:connector-curvature="0" /><path

       inkscape:transform-center-x="-4.8940678"

       inkscape:connector-curvature="0"

       id="path3975"

       d="M 1.2780262,26.914124 15.688076,17.950282"

       style="fill:none;stroke:#0000ff;stroke-width:2.4000001;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none;marker-end:none" /><path

       d="m 6.1249848,26.928428 3.1531003,1.8629 -2.3281001,1.7031 -0.8250002,-3.566"

       style="fill:none;stroke:#000000;stroke-width:2.4000001;stroke-linecap:round;stroke-linejoin:miter;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none"

       id="path5405"

       inkscape:connector-curvature="0" /><use

       x="0"

       y="0"

       xlink:href="#path22"

       id="use5427" /><use

       x="0"

       y="0"

       xlink:href="#path24"

       id="use5429" /><use

       x="0"

       y="0"

       xlink:href="#path36"

       id="use5437" /><use

       x="0"

       y="0"

       xlink:href="#path3973"

       id="use5439" /><use

       x="0"

       y="0"

       xlink:href="#path3975"

       inkscape:transform-center-x="-4.8940678"

       id="use5441" /><use

       x="0"

       y="0"

       xlink:href="#path5405"

       id="use5443" /></g></svg>

              </div>

            <div class="col_3" id="tab_load_single_F">

              <div class="col_12 label_envelope h20" style="margin-bottom:4px;">

                <label id="idFormLoadSingle" for="form_load_single">F [kN]</label>

              </div>

              <input onfocusout="loadSingleEntryFocusOut(event);" onfocusin="loadSingleEntryFocusIn(event);" onchange="loadEntryModified();" class="col_12" id="form_load_single" type="text" />

            </div>

            <div class="col_3" id="tab_load_single_a" >

              <div class="col_12 label_envelope h20" style="margin-bottom:4px;" >

                <label title="Measured counter-clockwise from top's 0&deg;" id="idFormLoadSingleAngle" for="form_load_single_angle">Angle&nbsp;[&deg;]</label>

              </div>

              <input title="Measured counter-clockwise from top's 0&deg;" onfocusout="loadSingleEntryFocusOut(event);" onfocusin="loadSingleEntryFocusIn(event);" onchange="loadEntryModified();" class="col_12" id="form_load_single_angle" type="text" />

            </div>

            <div class="col_3" id="tab_load_single_M" >

              <div class="col_12 label_envelope h20" style="margin-bottom:4px;" >

                <label id="idFormLoadSingleM" for="form_load_single_m">M&nbsp;[kNm]</label>

              </div>

              <input onfocusout="loadSingleEntryFocusOut(event);" onfocusin="loadSingleEntryFocusIn(event);" onchange="loadEntryModified();" class="col_12" id="form_load_single_m" type="text" />

            </div>



            <div class="">

             <center>

                <button id="form_load_single_button" type="submit" >Run it</button>

             </center>

            </div>

          </div>

        </form>



        <form class="_vertical" defaultbutton="form_load_uniform" >

          <div id="tab_load_uniform" class="tab-content">

            <div class="col_3" style="margin-top:0.35em; margin-bottom:-0.35em;">

<svg

   xmlns:dc="http://purl.org/dc/elements/1.1/"

   xmlns:cc="http://creativecommons.org/ns#"

   xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"

   xmlns:svg="http://www.w3.org/2000/svg"

   xmlns="http://www.w3.org/2000/svg"

   xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"

   xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"

   id="svg2"

   version="1.1"

   inkscape:version="0.48.5 r10040"

   width="46"

   height="46.5"

   xml:space="preserve"

   sodipodi:docname="k3.svg"><metadata

     id="metadata8"><rdf:RDF><cc:Work

         rdf:about=""><dc:format>image/svg+xml</dc:format><dc:type

           rdf:resource="http://purl.org/dc/dcmitype/StillImage" /><dc:title /></cc:Work></rdf:RDF></metadata><defs

     id="defs6"><marker

       inkscape:stockid="TriangleOutL"

       orient="auto"

       refY="0"

       refX="0"

       id="TriangleOutL"

       style="overflow:visible"><path

         id="path4123"

         d="m 5.77,0 -8.65,5 0,-10 8.65,5 z"

         style="fill-rule:evenodd;stroke:#000000;stroke-width:1pt"

         transform="scale(0.8,0.8)"

         inkscape:connector-curvature="0" /></marker><marker

       inkscape:stockid="Arrow1Lend"

       orient="auto"

       refY="0"

       refX="0"

       id="Arrow1Lend"

       style="overflow:visible"><path

         id="path3984"

         d="M 0,0 5,-5 -12.5,0 5,5 0,0 z"

         style="fill-rule:evenodd;stroke:#000000;stroke-width:1pt"

         transform="matrix(-0.8,0,0,-0.8,-10,0)"

         inkscape:connector-curvature="0" /></marker><marker

       inkscape:stockid="Arrow2Lend"

       orient="auto"

       refY="0"

       refX="0"

       id="Arrow2Lend"

       style="overflow:visible"><path

         id="path4002"

         style="fill-rule:evenodd;stroke-width:0.625;stroke-linejoin:round"

         d="M 8.7185878,4.0337352 -2.2072895,0.01601326 8.7185884,-4.0017078 c -1.7454984,2.3720609 -1.7354408,5.6174519 -6e-7,8.035443 z"

         transform="matrix(-1.1,0,0,-1.1,-1.1,0)"

         inkscape:connector-curvature="0" /></marker><marker

       inkscape:stockid="Arrow1Sstart"

       orient="auto"

       refY="0"

       refX="0"

       id="Arrow1Sstart"

       style="overflow:visible"><path

         id="path3993"

         d="M 0,0 5,-5 -12.5,0 5,5 0,0 z"

         style="fill-rule:evenodd;stroke:#000000;stroke-width:1pt"

         transform="matrix(0.2,0,0,0.2,1.2,0)"

         inkscape:connector-curvature="0" /></marker><clipPath

       clipPathUnits="userSpaceOnUse"

       id="clipPath18"><path

         d="m 0,419.621 400,0 0,-409.99991 -400,0 0,409.99991 z"

         id="path20"

         inkscape:connector-curvature="0" /></clipPath></defs><sodipodi:namedview

     pagecolor="#ffffff"

     bordercolor="#666666"

     borderopacity="1"

     objecttolerance="10"

     gridtolerance="10"

     guidetolerance="10"

     inkscape:pageopacity="0"

     inkscape:pageshadow="2"

     inkscape:window-width="1366"

     inkscape:window-height="749"

     id="namedview4"

     showgrid="false"

     inkscape:zoom="4.4952381"

     inkscape:cx="-21.684322"

     inkscape:cy="26.25"

     inkscape:window-x="-4"

     inkscape:window-y="-4"

     inkscape:window-maximized="1"

     inkscape:current-layer="g10"><inkscape:grid

       type="xygrid"

       id="grid3017"

       empspacing="5"

       visible="true"

       enabled="true"

       snapvisiblegridlinesonly="true" /></sodipodi:namedview><g

     id="g10"

     inkscape:groupmode="layer"

     inkscape:label="ink_ext_XXXXXX"

     transform="matrix(1.25,0,0,-1.25,0,46.5)"><path

       inkscape:connector-curvature="0"

       id="path22"

       style="fill:none;stroke:#000000;stroke-width:3.1337719;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none"

       d="M 13.263169,1.2360749 36.014144,19.012403" /><path

       inkscape:connector-curvature="0"

       id="path24"

       style="fill:none;stroke:#000000;stroke-width:0.69467604;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:5.55740839, 1.3893521, 0.69467605, 1.3893521;stroke-dashoffset:0"

       d="m 33.270032,36.51318 0,-18.096556" /><path

       inkscape:connector-curvature="0"

       id="path36"

       style="fill:none;stroke:#000000;stroke-width:1.20000005;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none"

       d="m 20.490364,26.436148 c 2.680588,4.528461 7.536121,7.317615 12.795719,7.351308" /><path

       d="m 31.330646,17.600233 -3.4924,4.993089 -2.53008,-4.075737 6.02248,-0.917352"

       style="fill:none;stroke:#0000ff;stroke-width:2;stroke-linecap:round;stroke-linejoin:miter;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none"

       id="path3973"

       inkscape:connector-curvature="0" /><path

       inkscape:transform-center-x="-4.8940678"

       inkscape:connector-curvature="0"

       id="path3975"

       d="m 16.049212,26.736158 14.41005,-8.963842"

       style="fill:none;stroke:#0000ff;stroke-width:2.4000001;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none;marker-end:none" /><path

       d="m 16.557436,6.0064474 -3.4924,4.9930886 -2.53008,-4.0757366 6.02248,-0.917352"

       style="fill:none;stroke:#0000ff;stroke-width:2;stroke-linecap:round;stroke-linejoin:miter;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none"

       id="path3973-1"

       inkscape:connector-curvature="0" /><path

       inkscape:transform-center-x="-3.915254"

       inkscape:connector-curvature="0"

       id="path3975-7"

       d="M 1.2760027,15.142372 15.686052,6.1785304"

       style="fill:none;stroke:#0000ff;stroke-width:2.4000001;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none;marker-end:none" /><path

       inkscape:transform-center-x="0.90935214"

       inkscape:connector-curvature="0"

       id="path3975-7-9"

       d="M 16.906557,27.322613 -0.79751364,13.493481"

       style="fill:none;stroke:#0000ff;stroke-width:1.6;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none;marker-end:none"

       inkscape:transform-center-y="3.4147964" /><path

       d="m 21.203111,26.869542 3.1531,1.8629 -2.3281,1.7031 -0.825,-3.566"

       style="fill:none;stroke:#000000;stroke-width:2.4000001;stroke-linecap:round;stroke-linejoin:miter;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none"

       id="path5405-4"

       inkscape:connector-curvature="0" /><path

       d="m 23.935632,11.896843 -3.4924,4.993089 -2.53008,-4.075737 6.02248,-0.917352"

       style="fill:none;stroke:#0000ff;stroke-width:2;stroke-linecap:round;stroke-linejoin:miter;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none"

       id="path3973-1-1"

       inkscape:connector-curvature="0" /><path

       inkscape:transform-center-x="-3.1322035"

       inkscape:connector-curvature="0"

       id="path3975-7-7"

       d="M 8.6541983,21.032768 23.064248,12.068926"

       style="fill:none;stroke:#0000ff;stroke-width:2.4000001;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none;marker-end:none" /></g></svg>

     </div>

            <div class="col_3">

              <div class="col_12 label_envelope h20" style="margin-bottom:4px;" >

                <label title="Load value" id="idFormLoadUniform" for="form_load_uniform_f">f&nbsp;[kN/m]</label>

              </div>

              <input title="Load value" onfocusout="loadSingleEntryFocusOut(event);" onfocusin="loadSingleEntryFocusIn(event);" onchange="loadEntryModified(event);" class="col_12" id="form_load_uniform_f" type="text" />

            </div>

            <div class="col_3">

              <div class="col_12 label_envelope h20" style="margin-bottom:4px;" >

                <label class="optional" title="For non-constant linear load only" id="idFormLoadUniform2" for="form_load_uniform_f2" >f<sub>2</sub>&nbsp;[kN/m]</label>

              </div>

              <input style="opacity: 0.4;" title="For non-constant linear load only" onfocusout="loadSingleEntryFocusOut(event);" onfocusin="loadSingleEntryFocusIn(event);" onchange="loadEntryModified();" class="col_12" id="form_load_uniform_f2" placeholder="optional" type="text" />

            </div>

            <div class="col_3">

              <div class="col_12 label_envelope h20" style="margin-bottom:4px;" >

                <label title="Measured counter-clockwise from top's 0&deg;" id="idFormLoadUniformAngle" for="form_load_uniform_angle">angle&nbsp;[&deg;]</label>

              </div>

              <input title="Measured counter-clockwise from top's 0&deg;" onfocusout="loadSingleEntryFocusOut(event);" onfocusin="loadSingleEntryFocusIn(event);" onchange="loadEntryModified();" class="col_12" id="form_load_uniform_angle" type="text" />

            </div>

            <div class="">

              <center>

               <button id="form_load_uniform" type="submit" >Run it</button>

              </center>

            </div>

          </div>

        </form>



        <div id="tab_load_remove" class="tab-content">

         <center>

          <button disabled="disabled" id="form_load_remove" type="submit" _type="default">Run it</button>

          <button id="form_load_remove_on_selected" type="submit">Apply to selected</button>

         </center>

        </div>

      </div>

    </div>

   </div>



   <div id="form_material" class="form_main_envelope" style="display:none;width:13em;" >

    <div class="sti_form">

      <div >

        <div class="fa fa-minus">

        </div>

        <div class="dialogDesc">Sections</div>

        <div class="bar_qr">

          <div class="fa fa-question" help="help_sections"></div>

          <div class="fa fa-remove" ></div>

        </div>

      </div>

      <div class="form_body">

        <form class="vertical" defaultbutton="form_material_btn1" style="padding-top:1em;">

          <div class="col_6" style="margin-bottom:0;">

            <div class="col_12 label_envelope" >

             <div class="col_12 label_bottom" >

              <label id="idFormLabelA" for="form_material_sh_area">A [cm<sup>2</sup>]</label>

             </div>

            </div>

            <input id="form_material_area" onfocusout="sectionInputFocusOut(event);" onfocusin="sectionInputFocusIn(event);"  onfocus="sectionEntryModified();" type="text" />

            <div class="col_12 label_envelope" >

             <div class="col_12 label_bottom" >

               <label class="optional" title="Impact of shear stresses will be involved if value entered" id="idFormLabelAsh" for="form_material_sh_area">A<font size='1'>sh</font> [cm<sup>2</sup>]</label>

             </div>

            </div>

            <input id="form_material_sh_area" onfocusout="sectionInputFocusOut(event);" onfocusin="sectionInputFocusIn(event);"  onfocus="sectionEntryModified();" type="text" placeholder="optional" style="opacity: 0.4;" title="Impact of shear stresses will be involved if value entered" />

            <div class="col_12 label_envelope" >

             <div class="col_12 label_bottom" >

               <label id="idFormLabelI"  for="inertia">I [cm<sup>4</sup>]</label>

             </div>

            </div>

            <input id="form_material_inertia" onfocusout="sectionInputFocusOut(event);" onfocusin="sectionInputFocusIn(event);" onfocus="sectionEntryModified();" type="text" />

            <div class="col_12 label_envelope" >

             <div class="col_12 label_bottom" >

               <label id="idFormLabelE" for="elastic">E [GPa]</label>

             </div>

            </div>

            <input id="form_material_elastic" onfocusout="sectionInputFocusOut(event);" onfocusin="sectionInputFocusIn(event);" onfocus="sectionEntryModified();" type="text" />

          </div>



          <div class="col_6" style="margin-bottom:0;">

            <div class="col_12 label_envelope" >

             <div class="col_12 label_bottom" >

              <label for="idSelect">Select ID</label>

             </div>

            </div>

            <select style="margin-bottom:0;" id="form_material_id_ch" onchange="sectionEntrySelected(this, this.selectedIndex);"><option value="0">-- Choose --</option></select>

            <div class="col_12 label_envelope" >

             <div class="col_12 label_bottom" >

               <label for="id">ID</label>

             </div>

            </div>

            <input id="form_material_id" onfocusout="sectionInputFocusOut(event);" onfocusin="sectionInputFocusIn(event);" onfocus="sectionEntryModified();" type="text" />

            <div id="form_material_id_units">

              <div class="col_12 label_envelope">

               <div class="col_12 label_bottom" >

                 <label for="id">Units</label>

               </div>

              </div>

              <input type="checkbox" id="idCheckboxBaseUnits" /><p style="display:inline; margin:0; padding:0;">&nbsp;Base</p>

            </div>

          </div>

          <div class="col_12" id="form_material_buttons" style="margin-bottom:0;">

            <div class="col_6">

              <button id="form_material_btn1" type="submit">Save entry</button>

            </div>

            <div class="col_6">

              <button id="form_material_btn2" disabled="disabled" class="disabled">Apply to selected</button>

            </div>

          </div>

        </form>

      </div>

    </div>

   </div>



   <div id="form_coord" class="form_main_envelope" style="display:none;background:teal;width:20em;" >

    <div class="sti_form">

      <div >

        <div class="fa fa-minus">

        </div>

        <div class="dialogDesc">Relative coordinates</div>

        <div class="bar_qr">

          <div class="fa fa-question" help="help_beam"></div>

          <div class="fa fa-remove" ></div>

        </div>

      </div>

      <div class="form_body">

       <form class="_vertical" defaultbutton="form_coord_apply_btn">

        <div class="" style="margin:0;margin-top:0.2em;">

          <label class="col_1" style="text-align:end; margin-right:0; margin-left:0;" for="form_coord_x">dx:</label>

          <input onchange="formCoord_xUp(event);" onkeyup="formCoord_xUp(event);" onfocusout="formCoordFocusOut();" onfocusin="formCoordFocusInX();" class="col_3" id="form_coord_x" type="text" style="margin:0;"/>

          <label class="col_1" style="text-align:end; margin-right:0;" for="form_coord_y">dy:</label>



          <input onchange="formCoord_yUp(event);" onkeyup="formCoord_yUp(event);" onfocusout="formCoordFocusOut();" onfocusin="formCoordFocusInY();" class="col_3" id="form_coord_y" type="text" style="margin:0;" /> 

          &emsp;

          <button id="form_coord_apply_btn" style="margin-left:0px;" type="submit">Apply</button>

        </div>

       </form>

      </div>

    </div>

   </div>



   <div id="form_settings" class="form_main_envelope" style="display:none;width:18em;" >

    <div class="sti_form">

      <div >

        <div class="fa fa-minus">

        </div>

        <div class="dialogDesc">Settings</div>

        <div class="bar_qr">

          <div class="fa fa-question" help="help_settings"></div>

          <div class="fa fa-remove" ></div>

        </div>

      </div>

      <div class="form_body">

        <div class="" style="margin:0.5em 0 0 0;">

        <form class="_vertical" defaultbutton="form_settings_apply_btn" >

         <fieldset style="margin:0.3em;margin-bottom:0;" >

          <div class="col_12" style="margin:0;">

            <div class="col_3">Small</div>

            <div class="col_3"><center>Large</center></div>

            <div class="col_6"></div>

          </div>

          <div id="guiScaleDiv">

            <div class="col_1" >

              <center><input onchange="guiSize(this, 0);" id="gui_size0" type="radio" name="guiSizer" /></center>

            </div>



            <div class="col_1" >

              <center><input onchange="guiSize(this, 1);" id="gui_size1" type="radio" name="guiSizer" /></center>

            </div>



            <div class="col_1" >

              <center><input onchange="guiSize(this, 2);" id="gui_size2" type="radio" name="guiSizer" /></center>

            </div>



            <div class="col_1" >

              <center><input onchange="guiSize(this, 3);" id="gui_size3" type="radio" name="guiSizer" /></center>

            </div>



            <div class="col_1" >

              <center><input onchange="guiSize(this, 4);" id="gui_size4" type="radio" name="guiSizer" /></center>

            </div>



            <div class="col_1" >

            </div>

            <div class="col_6" ><div style="display:inline-block;border:0;margin:0;padding:0;">GUI scale</div></div>

          </div>



          <div id="drawingScaleDiv" style="clear:both;" >

            <div class="col_1" >

              <center><input onchange="drawingSize(this, 0);" id="drawing_size0" type="radio" name="drawingSizer" /></center>

            </div>



            <div class="col_1" >

              <center><input onchange="drawingSize(this, 1);" id="drawing_size1" type="radio" name="drawingSizer" /></center>

            </div>



            <div class="col_1" >

              <center><input onchange="drawingSize(this, 2);" id="drawing_size2" type="radio" name="drawingSizer" /></center>

            </div>



            <div class="col_1" >

              <center><input onchange="drawingSize(this, 3);" id="drawing_size3" type="radio" name="drawingSizer" /></center>

            </div>



            <div class="col_1" >

              <center><input onchange="drawingSize(this, 4);" id="drawing_size4" type="radio" name="drawingSizer" /></center>

            </div>



            <div class="col_1" >

            </div>

            <div class="col_6" ><div style="display:inline-block;border:0;margin:0;padding:0;">Drawing scale</div></div>

          </div>

         </fieldset>

        </div>

        <div class="" style="margin:0;">

         <fieldset style="margin:0.3em;">

          <div class="col_12" style="margin:0;">

            <div class="col_2">On</div>

            <div class="col_2">Off</div>

            <div class="col_8"></div>

          </div>

          <div class="col_12 label_envelope h20">

            <div class="col_2">

              <input onchange="guiChangedOn(this);" id="gui_on_labels" type="radio" title="Turn on" name="gui_labels" value="gui_on_labels"/>

            </div>



            <div class="col_2">

              <input onchange="guiChangedOff(this);" id="gui_off_labels" type="radio" title="Turn off" name="gui_labels" value="gui_off_labels"/>

            </div>



            <div class="col_2">

            </div>



            <div class="col_6" ><div style="display:inline-block;border:0;margin:0;padding:0;">Toolbar labels</div></div>

          </div>



          <div class="col_12 label_envelope h20">

            <div class="col_2">

              <input onchange="guiSI_On(this);" id="gui_on_si" type="radio" title="Turn on" name="gui_si_units" value="gui_on_si"/>

            </div>



            <div class="col_2">

              <input onchange="guiSI_Off(this);" id="gui_off_si" type="radio" title="Turn off" name="gui_si_units" value="gui_off_si"/>

            </div>



            <div class="col_2">

            </div>



            <div class="col_6" ><div style="display:inline-block;border:0;margin:0;padding:0;">SI units</div></div>

          </div>

         </fieldset>

        </div>

        <div class="" style="margin:0;">

         <fieldset style="margin:0.3em; padding-bottom:1em;">

          <div class="col_12 label_envelope h20" style="margin:0;">

            <input _onchange="_xxx(event);" _onkeyup="_xxx(event);" onfocusout="settingsInputFocusOut();" onfocusin="settingsInputFocusIn();" class="col_2" id="form_area_x" type="text" style="margin:0;"/>

            <label class="col_1 center" style="margin:0;" >&times;</label>

            <input _onchange="_xxx(event);" _onkeyup="_xxx(event);" onfocusout="settingsInputFocusOut();" onfocusin="settingsInputFocusIn();" class="col_2" id="form_area_y" type="text" style="margin:0;"/>

            <label class="col_1" style="margin:0;" ></label>

            <label class="col_5" >Paper size</label>

          </div>

         </fieldset>

         <center>

          <button id="form_settings_apply_btn" type="submit" __type="default">Apply</button>

         </center>

        </form >

        </div>

      </div>

    </div>

   </div>



   <div id="form_help" class="form_main_envelope" style="min-width: 24em; max-width: 80%; width: 40%; display: none;">

    <div class="sti_form">

      <div >

        <div class="fa fa-minus"> </div>

        <div class="dialogDesc">Help</div>

        <div class="bar_qr">

          <div class="fa fa-remove" /></div>

        </div>

      </div>

      <div class="form_body" style="padding-left: 1em; overflow-y: scroll; display: block; min-height: 10em; max-height:30em; height: 300px;">

        <h1 id="help_beam">Enter a beam</h1>

        <p>Use directly your pointer and click within the working area to enter a beam. The pointed position sticks to grid lines (call <em>zoom in</em> if you want to enrich the grid).</p>

        <ul>

          <li>Continue with <strong>clicking</strong> to desired end position of the beam <strong>or</strong></li>

          <li><strong>enter</strong> the desired length (of the beam being drawn) into <strong>the coordinates</strong> dialog. That is also a way how to bypass the grid.</li>

        </ul>

        <p>Press <strong>Escape key</strong> or <strong>Abort button</strong> when finished.</p>

        <p>Note: you won't be able to enter nodes. Nodes will appear automatically during the beam creation.</p>



        <h1 id="help_new"><i class="fa fa-file-o"></i> New</h1>

        <p>Erases all objects and starts a new project from a scratch. Also serves to interrupt demo.</p>



        <h1 id="help_open"><i class="fa fa-folder-open-o"></i> Open</h1>

        <p>Opens a saved project. Typically you may choose from opening an</p>

        <ul>

          <li>autosave and </li>

          <li>your last save.</li>

        </ul>



        <h1 id="help_save"><i class="fa fa-save"></i> Save</h1>

        <p>Saves your actual progress. Only one file is supported, therefore the action replaces any older record. And a second file is used by autosave.</p>

        <p>Note: the project will be saved into storage of your particular browser and remains permanent through restarts.</p>



        <h1 id="help_zoom"><i class="fa fa-search-minus"></i> Zoom out, <i class="fa fa-search-plus"></i> Zoom in</h1>

        <p>Usually affects the density of grid lines. It is likely you will find also useful tuning a scale within <em>Settings</em></p>



        <h1 id="help_select"><i class="fa fa-square-o"></i> Select</h1>

        <p>Serves to select multiple beams by a rectangle. The feature is useful if you want to</p>

        <ul>

          <li>assign a cross-section to beams,</li>

          <li>assign hinges on both ends of the beams,</li>

          <li>remove loads within the <em>Loads</em> dialog or</li>

          <li>delete selected beams.</li>

        </ul>

        <p>If mouse is your pointer then this button is almost useless (the feature is automatically entered on dragging attempts). But since on touch displays <em>dragging</em> serves to another purpose (scrolling the working area), this button has to exist.</p>

        <p>Note: some browsers (eg. Firefox) may not support this feature: an error is displayed and you have to pickup beam by beam.</p>



        <h1><i id="help_abort" class="fa fa-remove"></i> Abort</h1>

        <p>Acts as <em>Escape key</em> and is useful on touch screens&mdash;which are not equipped by a keyboard&mdash;to</p>

        <ul>

          <li>deselect selected beams, loads,</li>

          <li>interrupt proceeding action (eg. creating new beams, selecting by rectangle, placing load, assigning hinges, ...)</li>

          <li>close an active form.</li> 

        </ul>

        <p>You want rather to use <strong>Escape key</strong> (assuming you have a keyboard).</p>



        <h1 id="help_remove"><i class="fa fa-trash-o"></i> Remove</h1>

        <p>Removes selected beams or selected loads. You want rather to use <strong>Delete key</strong> (assuming you have a keyboard).</p>



        <h1 id="help_sections"><i class="fa fa-th-list"></i> Sections</h1>

        <p>Defines cross-sections and assigns them to beams. First, a section has to be defined <strong>and saved.</strong> Once the section is saved, it may be used.</p>

        <p>It is common in structural analysis that effect of shear is not taken into account when evaluating reactions/deflections, thus A<sub>sh</sub> is optional. Shear area depends on type of used section: eg. solid section, I-beam, hollow section; refer to other sources if you are unsure.</p>

        <p>Finally you have to select desired beams and call <strong>Apply button.</strong> Use <strong>Escape key</strong> or <strong>Abort button</strong> from the toolbar to deselect beams then.</p>



        <h1 id="help_support"><i class="fa fa-eject"></i> Supports</h1>

        <p>You can place basic supports at any node. The dialog also allows you to <em>remove</em> support(s).</p>



        <h1 id="help_hinges"><i class="fa fa-circle-o"></i> Hinges</h1>

        <p>A beam may be connected into node through a hinge. Activate the feature, then click on beams to achieve desired connection at each end.</p>

        <p>You likely want to use <strong>bulk mode</strong> if the model is a truss: select by rectangle desired diagonals of the truss, <strong>then</strong> activate the function and click on any beam from the group.</p>



        <h1 id="help_loads"><i class="fa fa-arrow-down"></i> Loads</h1>

        <p>This dialog serves to</p>

        <ul>

          <li>place a single load or a single moment,</li>

          <li>place a uniform load,</li>

          <li>place a linear load,</li>

          <li>remove loads.</li>

        </ul>

        <h2>A single load</h2>

        <p>A load can be placed into a node or anywhere (according to the grid lines) on a beam. If you want to place a load out of the grid, then place the load close to the desired position and leave the <em>Load</em> dialog. Click the load to modify its parameters.</p>

        <p>By default, loads act in direction of gravity. If you want another angle, then the convention is: gravity load is zero and angle in degrees counts counter-clockwise.</p>



        <h2>A uniform load</h2>

        <p>Uniform load is a distributed load with the second parameter left <strong>empty.</strong> A load may be placed to/from nodes or anywhere (according to the grid lines) on a <em>particular</em> beam. If you want to place a load out of the grids, then place the load close to the desired position and leave the <em>Load</em> dialog. Click the load to modify its parameters.</p>



        <h2>Remove a load</h2>

        <p>The feature is useful if you want to remove more previously placed loads all at once.</p>

        <p>The first mode (Run it): if activated, click on nodes or beams to remove loads acting on them.</p>

        <p>The second mode (Apply to selected): first select beams, then call the action. You can deselect them then by <em>Escape key</em> or by pressing the <em>Abort button</em> from the toolbar.</p> 



        <h1 id="help_modify_load"> Modify a load</h1>

        <p>If you want to modify position of a load within a beam, you have to look where the beam starts. The zero will be highlighted (node in red color): position within the beam is measured from there.</p>

        <p>In order to keep the user interface simple, you won't be able to <em>move</em> a load entered on a node and you won't be able to change a uniform load to a linear one. In such cases, remove the load and enter a new one.</p>



        <h1 id="help_solve"><i class="fa fa-play"></i> Solve</h1>

        <p>Runs the solver on your structure and prepares results. You may be given a warning or error. Some warnings can be overseen. An error usually comes from unstable structures (mechanism). That usually happens when not enough constraints/supports are provided or a <em>forgotten</em> beam has been left.</p>

        <p>Once you alter/modify the solved structure, the results are considered no longer valid and are immediately removed.</p>



        <h1 id="help_diagrams"><i class="fa fa-signal"></i> Diagrams</h1>

        <p>Controls view and diagrams.</p>

        <p>In the <strong>Main tab</strong> you may turn on/off some layers that you can consider at the moment as obtrusive.</p>

        <p>In the other tabs you can control displaying N, V, M diagrams and the deflected shape. Let you point your pointer over diagrams to read particular values.</p>



        <h1 id="help_settings"><i class="fa fa-wrench"></i> Settings</h1>

        <h2>GUI scale</h2>

        <p>Available on touch screens only. The scale is useful to tune up a scale of the display according to your needs. If the dialogs and buttons appear large, then use small scale and vice versa. Some browsers (eg. Firefox) may not support this feature.</p>

        <h2>Drawing scale</h2>

        <p>A scale is useful when combined together with zoom. On a large and complicated structure you likely prefer small scale. On a simple structure being projected to students you likely prefer a large scale.</p>

        <h2>Toolbar labels</h2>

        <p>The buttons within the main toolbar on the top of the screen can or can not contain labels.</p>



        <h2>SI units</h2>

        <p>Switch between metric and imperial units.</p>



        <h2>Paper size</h2>

        <p>Set the size according to your model needs and confirm by <strong>Apply</strong> button. The large sizes decrease the performance of the browser. These settings will be likely voided in the future.</p>



        <h1 id="help_tools"><i class="fa fa-caret-down"></i> Tools</h1>

        <p>Additional function will be accumulated within this menu.</p>

        <h2>Re-run demo</h2>

        <p>Runs the demo again.</p>



        <h2 id="help_tutorial">Play tutorial</h2>

        <p>The demo serves rather to attract a user. Open a tutorial video on YouTube in a new tab of your browser.</p>

      </div>

    </div>

   </div>



    <div style="position:fixed; top:100px; left:100px;" id="alertArea">

    </div>



    <!-- Menu Vertical Left -->

    <div style="cursor: default; width: 10em; display:none;" id="menuTools">

      <ul class="menu vertical">

        <li ><a onclick="return reRunDemoClicked(event);" ><i class="fa fa-play-circle-o"></i> Re-run demo</a></li>

        <li ><a onclick="var win = window.open('https://www.youtube.com/playlist?list=PLlVoc8fFbbKoYVLypxWwR93QG08cmY3ca', '_blank'); win.focus(); return false;"

                ><i class="fa fa-youtube-play"></i> Play tutorial</a></li>

        <li ><a onclick="var win = window.open('https://www.facebook.com/pages/STRIANThe-structural-analyzer-free-online/908199965880768', '_blank'); win.focus(); return false;"

                ><i class="fa fa-facebook-square"></i> Facebook</a></li>

        <li><div ><i class="fa fa-google-plus" style="opacity: 0; color: #777;"></i>&nbsp;<g:plusone size="medium" align="left"></g:plusone></div></li>

      </ul>

    </div>



    <div id="sectionsData" >

    </div>



    <div id="credit" >

      <div height="2em">

        <div>Nazdar</div>

      </div>

    </div>



    <script charset="UTF-8" src="js/solver.min.js"></script>

  </body>

</html>

