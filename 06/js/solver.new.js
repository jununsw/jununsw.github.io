function cMsgContainer() {
    this.outString = "", this.outResult = "success", this.clear = function() {
        this.outString = "", this.outResult = "success"
    }, this.feed = function(e, t) {
        this._feed(e, t, arguments)
    }, this._feed = function(e, t, a) {
        if (arguments.length < 2) console.log("Implementation error");
        else {
            "warning" === e && "success" === this.outResult ? this.outResult = "warning" : "error" === e && (this.outResult = "error");
            var o = g_LangStrings[t];
            if (void 0 !== o) {
                for (var n = 2; n < a.length; n++) o = o.replace("%%", a[n]);
                this.outString.length && (this.outString += "<br>"), this.outString += (e ? "<b>(" + e + ")</b> " : "") + o + "\n"
            } else console.log("Implementation error");
            console.log(o)
        }
    }, this.getOutput = function() {
        return "success" !== this.outResult || this.outString.length || this.feed(null, "SUCCESSFULLY_SOLVED"), [this.outResult, this.outString]
    }
}

function _ss_round(e) {
    return Math.round(1e3 * e) / 1e3
}

function addStylesheet(e) {
    $("#dynamicStylesheet").remove();
    $("head").append("<style id='dynamicStylesheet'></style>");
    var t = " line.draw {   stroke-width: " + _ss_round(2 * e) + "; }  line.span {   stroke-width: " + _ss_round(3 * e) + "; }  line.dummySpan {   stroke-width: " + _ss_round(12 * Math.sqrt(e)) + "; }  .snap_rect {   stroke-width: " + _ss_round(2 * e) + "; }  .hinge {   stroke-width: " + _ss_round(1 * e) + "; }  rect.aux {   stroke-width: " + _ss_round(2 * e) + ";   stroke-dasharray: " + _ss_round(5 * e) + "," + _ss_round(5 * e) + "; }  line.bottomSpan {   stroke-width: " + _ss_round(1 * e) + ";   stroke-dasharray: " + _ss_round(10 * e) + "," + _ss_round(10 * e) + "; } text.coordDrawn, text.descPlacingLoad {   font-size: " + _ss_round(14 * e) + "px; } text.reaction_F_Desc, text.reaction_M_Desc, text.momentDesc, text.forceDesc {   font-size: " + _ss_round(13 * e) + "pt; }  text.descPlacingLoad {   font-size: " + _ss_round(14 * e) + "px; }  .load_moment_centerline {   stroke-width: " + _ss_round(3 * e) + "; }  .load_force_uniform {   stroke-width: " + _ss_round(1.65 * e) + "; }  ellipse#cursor_place_load, circle#cursor_place_load {   stroke-width: " + _ss_round(1 * e) + "; } rect.node, ellipse.node, circle.node, rect.nodeDeflected, ellipse.nodeDeflected, circle.nodeDeflected {   stroke-width: " + _ss_round(1 * e) + "; } line.deflected {   stroke-width: " + _ss_round(2.5 * e) + "; }  line.shearShape {   stroke-width: " + _ss_round(2 * e) + "; }  line.normalShape {   stroke-width: " + _ss_round(2 * e) + "; }  line.momentShape {   stroke-width: " + _ss_round(2 * e) + "; }  line.ordinate {   stroke-width: " + _ss_round(1.5 * e) + "; }  text.descDeform, text.descDiagram {   font-size: " + _ss_round(11 * e) + "pt; } ";
    $("#dynamicStylesheet").text(t)
}

function GUI_registerMessagesCallback(e) {
    g_fnMessagesCallbackGUI.push(e);
}

function GUI_log(e, t) {
    for (var a = 0; a < g_fnMessagesCallbackGUI.length; a++) {
        g_fnMessagesCallbackGUI[a](e, t, arguments);
    }
}

function cViewSettings() {
    this.showD = !1, this.showV = !1, this.showN = !1, this.showM = !1, this.set = function(e) {
        this.showD = e.showDisplacements, this.showV = e.showShearDiagram, this.showN = e.showNormalDiagram, this.showM = e.showMomentDiagram
    }, this.show = function(e) {
        e.showDisplacements = !0, e.showShearDiagram = !0, e.showNormalDiagram = !0, e.showMomentDiagram = !0, switchLayersToView()
    }, this.hide = function(e) {
        e.showDisplacements = !1, e.showShearDiagram = !1, e.showNormalDiagram = !1, e.showMomentDiagram = !1, switchLayersToView()
    }, this.restoreCanvasSettings = function(e) {
        e.showDisplacements = this.showD, e.showShearDiagram = this.showV, e.showNormalDiagram = this.showN, e.showMomentDiagram = this.showM, switchLayersToView()
    }
}

function showViewDialog() {
    return canvas.flagViewDialogActive || (displayForm("form_view"), canvas.flagViewDialogActive = !0, disableAllToolBars()), !1
}

function hideViewDialog() {
    $("#form_view").css("display", "none"), canvas.flagViewDialogActive = !1, enableAllToolBars(), _printNoticeLikeFacebook()
}

function zoomDispInputFocusOut() {
    canvas.flagIgnoreKbdShortcuts = !1, dialogInputFocusOut()
}

function zoomDispInputFocusIn() {
    canvas.flagIgnoreKbdShortcuts = !0, dialogInputFocusIn()
}

function printNoticeLikeFacebook() {
    g_printNoticeLikeFacebook = !0
}

function _printNoticeLikeFacebook() {
    if (g_printNoticeLikeFacebook) {
        var e = new noticeParameters(null, "success", "Do you find this program useful? Give it <i>Like</i> or <i>Recommend</i> then (follow the <strong>Tools</strong> menu). Thank you");
        e.x = $("#tool_tools").offset().left, e.flagAlignTop = !0, highlightToolsButton(), e.flagAvoidTimeout = !0, showNotice2(e)
    }
    g_printNoticeLikeFacebook = !1
}

function viewChanged() {
    var e;
    e = $("#form_view_on_d").prop("checked"), $("#sti_span_deform").css("display", e ? "block" : "none"), canvas.showDisplacements = e, e = $("#form_view_on_M").prop("checked");
    var t = $("#form_view_on_M_reverse").prop("checked");
    if (t !== canvas.showMomentDiagramRevers) {
        var a = 1;
        zoom_NVM(a, "M", _redrawResultM, t)
    }
    canvas.showMomentDiagramRevers = t, $("#sti_M").css("display", e === !0 ? "block" : "none"), canvas.showMomentDiagram = e, e = $("#form_view_on_V").prop("checked"), $("#sti_V").css("display", e === !0 ? "block" : "none"), canvas.showShearDiagram = e, e = $("#form_view_on_N").prop("checked"), $("#sti_N").css("display", e === !0 ? "block" : "none"), canvas.showNormalDiagram = e, !canvas.flagDemoIsRunning && cookieShowLike() && (cookieLikeShown(), printNoticeLikeFacebook())
}

function setWarningHidden() {
    canvas.showWarningHidden = !(canvas.showGrid && canvas.showNodes && canvas.showLoads && canvas.showSupports)
}

function viewChangedMain() {
    $("#form_view_on_all").prop("checked", !1), $("#form_view_off_all").prop("checked", !1);
    var e = $("#form_view_on_supports").prop("checked"),
        t = $("#form_view_on_loads").prop("checked"),
        a = $("#form_view_on_nodes").prop("checked"),
        o = $("#form_view_on_grid").prop("checked"),
        n = $("#form_view_on_reactions").prop("checked");
    canvas.showSupports = e, canvas.showLoads = t, canvas.showNodes = a, canvas.showReactions = n, canvas.showGrid = o, e && t && a && n ? $("#form_view_on_all").prop("checked", !0) : e || t || a || n || $("#form_view_off_all").prop("checked", !0), setWarningHidden(), switchLayersToView()
}

function viewChangedMainAll() {
    var e = $("#form_view_on_all").prop("checked");
    $("#form_view_on_supports").prop("checked", e), $("#form_view_on_loads").prop("checked", e), $("#form_view_on_nodes").prop("checked", e), $("#form_view_on_reactions").prop("checked", e), $("#form_view_on_grid").prop("checked", e), $("#form_view_off_supports").prop("checked", !e), $("#form_view_off_loads").prop("checked", !e), $("#form_view_off_nodes").prop("checked", !e), $("#form_view_off_reactions").prop("checked", !e), $("#form_view_off_grid").prop("checked", !e), canvas.showSupports = canvas.showLoads = canvas.showNodes = canvas.showReactions = canvas.showGrid = e, setWarningHidden(), switchLayersToView()
}

function zoom_NVM(e, t, a, o) {
    var n = $("#form_view_scale_" + t).attr("zoom"),
        r = "undefined" == typeof n || parseFloat(n) <= 0 ? $("#form_view_scale_" + t).val() : parseFloat(n);
    r *= e, $("#form_view_scale_" + t).val(_round(r)).attr("zoom", r), a(r, o)
}

function zoom_displ_minus() {
    var e = !1;
    return zoom_NVM(2 / 3, "d", _redrawResultDeform, e), !1
}

function zoom_displ_plus() {
    var e = !1;
    return zoom_NVM(1.5, "d", _redrawResultDeform, e), !1
}

function zoom_displ_entered() {
    var e = !1;
    $("#form_view_scale_d").attr("zoom", null), zoom_NVM(1, "d", _redrawResultDeform, e)
}

function zoom_M_minus() {
    return zoom_NVM(2 / 3, "M", _redrawResultM, canvas.showMomentDiagramRevers), !1
}

function zoom_M_plus() {
    return zoom_NVM(1.5, "M", _redrawResultM, canvas.showMomentDiagramRevers), !1
}

function zoom_M_entered() {
    $("#form_view_scale_M").attr("zoom", null), zoom_NVM(1, "M", _redrawResultM, canvas.showMomentDiagramRevers)
}

function zoom_V_minus() {
    var e = !1;
    return zoom_NVM(2 / 3, "V", _redrawResultV, e), !1
}

function zoom_V_plus() {
    var e = !1;
    return zoom_NVM(1.5, "V", _redrawResultV, e), !1
}

function zoom_V_entered() {
    var e = !1;
    $("#form_view_scale_V").attr("zoom", null), zoom_NVM(1, "V", _redrawResultV, e)
}

function zoom_N_minus() {
    var e = !1;
    return zoom_NVM(2 / 3, "N", _redrawResultN, e), !1
}

function zoom_N_plus() {
    var e = !1;
    return zoom_NVM(1.5, "N", _redrawResultN, e), !1
}

function zoom_N_entered() {
    var e = !1;
    $("#form_view_scale_N").attr("zoom", null), zoom_NVM(1, "N", _redrawResultN, e)
}

function dialogViewImperial() {
    $("#tab_view_d_units").text("Units: inches"), $("#tab_view_M_units").text("Units: kip.ft"), $("#tab_view_V_units").text("Units: kip"), $("#tab_view_N_units").text("Units: kip")
}

function dialogViewSI() {
    $("#tab_view_d_units").text("Units: m"), $("#tab_view_M_units").text("Units: kNm"), $("#tab_view_V_units").text("Units: kN"), $("#tab_view_N_units").text("Units: kN")
}

function computeZoomFixFactor() {
    var e = canvas.grid * canvas.zoom,
        t = Math.round(e),
        a = t / e;
    return a
}

function getImperialZoomFix() {
    return computeZoomFixFactor()
}

function getImperialZoomFix_1() {
    return 1 / computeZoomFixFactor()
}

function getScaleZ() {
    return canvas.drawingScale * defaultZoom / canvas.zoom
}

function getZoom(e) {
    var t = e.zoom / defaultZoom * getImperialZoomFix();
    return t
}

function zoomSupports() {
    var e = _round(getScaleZ());
    $("#sti_supports").find("use").each(function() {
        $(this)[0].instance.scale(e)
    })
}

function momentSize1() {
    return 20
}

function momentSize2() {
    return 16
}

function momentSize3() {
    return 10
}

function forceSize() {
    return 40
}

function snapSize() {
    return 10
}

function nodeSize() {
    return 5
}

function getShiftOfTheBottomLine() {
    return 5
}

function recalcZoomedNodeSize() {
    zNodeSize = _round(nodeSize() * getScaleZ())
}

function _nodeSize() {
    return zNodeSize
}

function zoomInteractiveDescriptions(e) {
    var t = ["#sti_N", "#sti_M", "#sti_V", "#sti_span_deform"];
    g_zoomSettingsLoads.set(e), g_zoomSettingsLoads.show(e);
    for (var a = 0; a < t.length; a++) $(t[a]).find("g").each(function() {
        var e = $(this).find("text");
        if (e.length > 0) {
            var t = e[0].instance.attr("_angle"),
                a = !1,
                o = $(this).find("*.pointOnDiagram"),
                n = o.length > 0 ? !1 : !0;
            fixDiagramDescToZoom(this, t, a, n), o.length > 0 && $(this).find("rect.descDiagram").remove()
        }
    });
    g_zoomSettingsLoads.restoreCanvasSettings(e)
}

function zoomReactions() {
    var e = _round(getScaleZ());
    $("#sti_reactions").find("use").each(function() {
        var t = parseFloat(this.parentNode.getAttribute("_x")),
            a = parseFloat(this.parentNode.getAttribute("_y")),
            o = this.parentNode.getAttribute("_type"),
            n = this.parentNode.getAttribute("_size"),
            r = this.parentNode.getAttribute("_direction");
        a += "reactionF" === o ? e * getTransDrawReactionForce(r, n) : e * getTransDrawReactionMoment(), $(this)[0].instance.scale(e).translate(t, a)
    }), $("#sti_reactions").find("text").each(function() {
        fixSingleLoadDescToZoom($(this)[0].instance)
    })
}

function recomputeUniformArrowsBetweenStartAndEnd(e, t) {
    for (var a = e.find("use"), o = e[0].instance.attr("_x1"), n = e[0].instance.attr("_x2"), r = e[0].instance.attr("_y1"), i = e[0].instance.attr("_y2"), s = a.length - 1; s >= 0; s--) {
        var l = a[s].instance.attr("_x"),
            c = a[s].instance.attr("_y");
        o === l && r === c || n === l && i === c || $(a[s]).remove()
    }
    var d = _round(defaultZoom / t),
        u = a.attr("id"),
        f = e.attr("_angle");
    $.isNumeric(f) || (f = 0), f >= 360 && (f -= 360);
    var o = e.attr("_x1"),
        r = e.attr("_y1"),
        n = e.attr("_x2"),
        i = e.attr("_y2"),
        m = e.find("line")[0].instance.attr("_f1"),
        g = e.find("line")[0].instance.attr("_f2");
    placeUniformArrowsBetweenStartAndEnd(d, u, f, e[0].instance, o, r, n, i, [m, g])
}

function fixForcesContentAccordingToUnits() {
    $("#sti_loads > g").each(function() {
        if ("uniform" === $(this)[0].getAttribute("_type"))
            for (var e = ["_f", "_f2"], t = 0; t < e.length; t++) {
                var a = $(this)[0].getAttribute(e[t]);
                $.isNumeric(a) && (canvas.flagImperialUnits && (a = kNewtons2kips(a) * ft2m(1)), a = _getForceValueUniform(a), $(this).find("text[_order='" + t + "']").text(a))
            } else if ("force" === $(this)[0].getAttribute("_type")) {
                var a = $(this)[0].getAttribute("_F");
                canvas.flagImperialUnits && (a = kNewtons2kips(a)), a = _getForceValueFromComponents(a), $(this).find("text").text(a)
            } else if ("moment" === $(this)[0].getAttribute("_type")) {
            var o = $(this)[0].getAttribute("_M");
            canvas.flagImperialUnits && (o = kNewtons2kips(o) * m2ft(1)), o = _getMomentValueFromComponents(o), $(this).find("text").text(o)
        }
    })
}

function loadIsFocused(e) {
    for (var t = !1, a = e.find("use"), o = 0; o < a.length; o++) {
        var n = $(a[o]).css("opacity");
        if (0 == n) {
            t = !0;
            break
        }
    }
    return t
}

function zoomLoads(e, t) {
    var a = _round(getScaleZ());
    $("#sti_loads > g[_type=uniform]").each(function() {
        var e = loadIsFocused($(this));
        e && unfocusLoad(this.instance), recomputeUniformArrowsBetweenStartAndEnd($(this), t), e && highlightLoad(this.instance)
    }), $("#sti_loads").find("use").each(function() {
        var e = a;
        "uniform" === $(this)[0].getAttribute("_type") && (e = _round(getScaleZ() * uniformZoom)), $(this)[0].instance.scale(e)
    }), $("#sti_loads > g[_type=uniform]").find("text").each(function() {
        fixUniformLoadDescToZoom($(this)[0].instance)
    }), $("#sti_loads > g[_type=force]").find("text").each(function() {
        fixSingleLoadDescToZoom($(this)[0].instance)
    }), $("#sti_loads > g[_type=moment] text").each(function() {
        fixSingleMomentDescToZoom($(this)[0].instance)
    });
    var o = a * momentSize3();
    $("#sti_loads > g[_type=moment] > line").each(function() {
        this.instance.attr("x1", -o / 2), this.instance.attr("x2", o / 2)
    }), $("#sti_loads > g[_type=uniform] > line").each(function() {
        var e = parseFloat($(this)[0].getAttribute("_f1")),
            t = parseFloat($(this)[0].getAttribute("_f2")),
            o = $(this)[0].getAttribute("_x"),
            n = $(this)[0].getAttribute("_y"),
            r = $(this)[0].getAttribute("_angle"),
            i = parseFloat(o) + Math.sin(r * Math.PI / 180) * e * forceSize() * uniformZoom * a,
            s = parseFloat(n) - Math.cos(r * Math.PI / 180) * e * forceSize() * uniformZoom * a,
            l = parseFloat($(this)[0].getAttribute("_dx")),
            c = parseFloat($(this)[0].getAttribute("_dy")),
            d = -Math.sin(r * Math.PI / 180) * (e - t) * forceSize() * uniformZoom * a,
            u = Math.cos(r * Math.PI / 180) * (e - t) * forceSize() * uniformZoom * a;
        $(this)[0].instance.translate(i, s).attr("x2", l + d).attr("y2", c + u)
    })
}

function zoomSnaps() {
    var e = _round(snapSize() * getScaleZ());
    $("#sti_auxiliary > rect.snap_rect").each(function() {
        this.instance.attr("width", e).attr("height", e).translate(-e / 2, -e / 2)
    })
}

function zoomBottomLines() {
    $("#sti_span_bottom line").each(function() {
        var e = $(this)[0].instance,
            t = e.attr("x1"),
            a = e.attr("x2"),
            o = e.attr("y1"),
            n = e.attr("y2"),
            r = getAngleFromCoordInRad(t, o, a, n),
            i = getShiftOfTheBottomLine();
        i = _round(i * getScaleZ());
        var s = i * Math.cos(r),
            l = -i * Math.sin(r);
        e.translate(s, l)
    })
}

function getDummyNodeSize(e) {
    var t = canvas.grid * canvas.zoom,
        a = _round(t / (canvas.zoom / defaultZoom) * 4 / 8);
    return e > a && (a = e), a
}

function zoomNodes() {
    var e = _nodeSize();
    $("#sti_span_nodes > rect.node").each(function() {
        var t = this.instance.attr("_x"),
            a = this.instance.attr("_y");
        this.instance.attr("width", 2 * e).attr("height", 2 * e).attr("x", t - e).attr("y", a - e)
    });
    var t = $("#sti_auxiliary > rect.nodeBeingDrawn");
    if (t.length) {
        var a = t[0].instance.attr("_x"),
            o = t[0].instance.attr("_y");
        t[0].instance.attr("width", 2 * e).attr("height", 2 * e).attr("x", a - e).attr("y", o - e)
    }
    var n = getDummyNodeSize(e);
    $("#sti_span_nodes_dummy > rect").each(function() {
        var e = this.instance.attr("_x"),
            t = this.instance.attr("_y");
        this.instance.attr("width", 2 * n).attr("height", 2 * n).attr("x", e - n).attr("y", t - n)
    })
}

function zoomInteractiveDescriptionsNodes() {
    for (var e = _nodeSize(), t = ["#sti_span_deform", "#sti_N", "#sti_M", "#sti_V"], a = 0; a < t.length; a++) $(t[a] + " .pointOnDiagram").each(function() {
        if (this instanceof SVGRectElement) {
            var t = this.instance.attr("_x"),
                a = this.instance.attr("_y");
            this.instance.attr("width", 2 * e).attr("height", 2 * e).attr("x", t - e).attr("y", a - e)
        } else this.instance.attr("r", e)
    });
    $("#sti_span_deform > rect.nodeDeflected").each(function() {
        var t = this.instance.attr("_x"),
            a = this.instance.attr("_y");
        this.instance.attr("width", 2 * e).attr("height", 2 * e).attr("x", t - e).attr("y", a - e)
    })
}

function zoomHinges() {
    var e = _round(nodeSize() / 2 * 3 * getScaleZ());
    $("#sti_hinges > circle.hinge").each(function() {
        var t = this.instance.attr("_angle"),
            a = this.instance.attr("_x"),
            o = this.instance.attr("_y"),
            n = Math.sin(t) * e,
            r = -Math.cos(t) * e;
        this.instance.attr("r", e / 2).move(a + n - e / 2, o + r - e / 2)
    })
}

function zoomCSS() {
    var e = getScaleZ();
    addStylesheet(e)
}

function zoomRescaleDrawing(e) {
    e != canvas.drawingScale && _zoom()
}

function zoom(e, t) {
    t !== e.zoom && (_zoom(), demoZoomPressed())
}

function _zoomCanvas() {
    canvas.spanBottomGroup.scale(getZoom(canvas), getZoom(canvas)), canvas.spanDummyGroup.scale(getZoom(canvas), getZoom(canvas)), canvas.spanGroup.scale(getZoom(canvas), getZoom(canvas)), canvas.spanNodesGroup.scale(getZoom(canvas), getZoom(canvas)), canvas.spanDeformGroup.scale(getZoom(canvas), getZoom(canvas)), canvas.N.scale(getZoom(canvas), getZoom(canvas)), canvas.V.scale(getZoom(canvas), getZoom(canvas)), canvas.M.scale(getZoom(canvas), getZoom(canvas)), canvas.auxiliary.scale(getZoom(canvas), getZoom(canvas)), canvas.supports.scale(getZoom(canvas), getZoom(canvas)), canvas.hinges.scale(getZoom(canvas), getZoom(canvas)), canvas.loads.scale(getZoom(canvas), getZoom(canvas)), canvas.reactions.scale(getZoom(canvas), getZoom(canvas))
}

function _zoom() {
    canvas && canvas.auxiliary && (recalcZoomedNodeSize(), drawGrid(canvas), _zoomCanvas(), zoomCSS(canvas.zoom), zoomBottomLines(canvas, canvas.zoom), zoomSnaps(canvas, canvas.zoom), zoomNodes(canvas, canvas.zoom), zoomSupports(canvas, canvas.zoom), zoomHinges(canvas, canvas.zoom), zoomInteractiveDescriptionsNodes(canvas, canvas.zoom), fixToolBarPositionNew(canvas), zoomLoads(canvas, canvas.zoom), zoomReactions(canvas, canvas.zoom), zoomInteractiveDescriptions(canvas, canvas.zoom), moveGridLabels(), disableToolBar("#tool_zoom_out"), disableToolBar("#tool_zoom_in"), _enableToolBar("#tool_zoom_out"), _enableToolBar("#tool_zoom_in"))
}

function zoomOut(e) {
    for (var t = e.zoom, a = arrZooms2.length - 1; a >= 0; a--)
        if (arrZooms2[a] < e.zoom) {
            e.zoom = arrZooms2[a];
            break
        }
    0 >= a ? disableToolBar("#tool_zoom_out") : enableToolBar("#tool_zoom_in"), zoom(e, t)
}

function zoomIn(e) {
    for (var t = e.zoom, a = 0; a < arrZooms2.length; a++)
        if (arrZooms2[a] > e.zoom) {
            e.zoom = arrZooms2[a];
            break
        }
    a >= arrZooms2.length - 1 ? disableToolBar("#tool_zoom_in") : enableToolBar("#tool_zoom_out"), zoom(e, t)
}

function getGridDistance(e) {
    for (var t = null, a = 0; a < arrZooms.length; a++) {
        var o = arrZooms[a] * e;
        if (o >= 16) {
            t = arrZooms[a];
            break
        }
    }
    return t
}

function resetGridDistance(e) {
    for (var t = [1, 2, 2.5, 5], a = 0; a < t.length; a++)
        if (e.grid = getGridDistance(e.zoom * t[a]), e.gridFactor = t[a], null !== e.grid) {
            e.grid *= t[a], console.log("*" + t[a]);
            break
        }
}

function removeGrid(e) {
    e.gridsGroup && e.gridsGroup.remove(), e.gridTextGroup && e.gridTextGroup.remove()
}

function gridValueIsRounded(e) {
    var t = e === Math.floor(e) || 2 * e === Math.floor(2 * e);
    return t
}

function valToString(e) {
    var t = e.toString();
    return canvas.flagImperialUnits && (e === Math.floor(e) || (t = e > 1 ? Math.floor(e).toString() + " " + g_ch : g_ch)), t
}

function drawGrid(e) {
    if (console.log("drawGrid"), e.svg) {
        console.log("drawGrid #"), removeGrid(e), resetGridDistance(e);
        var t = e.gridsGroup = e.svg.group().attr("id", "sti_grid"),
            a = e.gridTextGroup = e.svg.group().attr("id", "sti_grid_text");
        $(t.node).css("display", e.showGrid ? "" : "none"), $(a.node).css("display", e.showGrid ? "" : "none");
        var o = e.gridTextGroupX = e.svg.group().attr("id", "sti_grid_text_x"),
            n = e.gridTextGroupY = e.svg.group().attr("id", "sti_grid_text_y");
        a.add(o), a.add(n);
        for (var r = 1e3 * getWorkSizeX(), i = 1e3 * getWorkSizeY(), s = e.grid * e.zoom, l = r * e.zoom, c = i * e.zoom, d = 0;; d++) {
            var u = _round(d * s),
                f = _round(d * s),
                m = s / e.zoom,
                g = 25 > s * (400 / m) ? 2 : 1,
                _ = !1;
            if (l > u) {
                _ = !0;
                var h = !1;
                if (u) {
                    var v = _round(u / e.zoom / e.unit);
                    if (0 === d % g) {
                        var p = Math.floor(v) != v;
                        if (gridValueIsRounded(v)) {
                            var y = 2;
                            p && v > 1 && (y += 5), v >= 10 && (y += 3), v >= 100 && (y += 3), h = !p;
                            var b = e.svg.plain(valToString(v)).attr("class", p ? "coordMain coordMainOdd" : "coordMain").translate(u - y, 10);
                            o.add(b)
                        }
                    }
                }
                var S = e.svg.line(u, 0, u, c).attr("class", h ? "gridline" : "gridline2");
                t.add(S)
            }
            if (c > f) {
                _ = !0;
                var h = !1;
                if (f) {
                    var w = _round(f / e.zoom / e.unit),
                        p = Math.floor(w) != w;
                    if (gridValueIsRounded(w)) {
                        h = !p;
                        var b = e.svg.plain(valToString(w)).attr("class", p ? "coordMain coordMainOdd" : "coordMain").translate(6, f + 3);
                        n.add(b)
                    }
                }
                var S = e.svg.line(0, f, l, f).attr("class", h ? "gridline" : "gridline2");
                t.add(S)
            }
            if (u && f && !_) break
        }
        $("#sti_svg_canvas").css("width", l + "px").css("height", c + "px"), $("#sti_svg_canvas").find("svg").attr("width", l), $("#sti_svg_canvas").find("svg").attr("height", c), $("#sti_grid").insertBefore($("#sti_span_dummy")), e.flagImperialUnits && ($("#sti_grid")[0].instance.scale(getImperialZoomFix(), getImperialZoomFix()), $("#sti_grid_text")[0].instance.scale(getImperialZoomFix(), getImperialZoomFix()))
    }
    console.log("drawGrid #end")
}

function unHighlightNodes() {
    var e = $("#sti_span_nodes > rect");
    $(e).each(function() {
        this.instance.attr("class", "node")
    })
}

function highlightNodes(e) {
    var t = !1,
        a = $("#sti_span_nodes > rect");
    return $(a).each(function() {
        var a = this.instance.attr("_x") * canvas.zoom / defaultZoom,
            o = this.instance.attr("_y") * canvas.zoom / defaultZoom;
        parseInt(a) === parseInt(e.x) && parseInt(o) === parseInt(e.y) && (this.instance.addClass("node_focused"), t = !0)
    }), t
}

function _getNearestGridPoint(e, t, a) {
    var o = null,
        n = canvas.grid * canvas.zoom,
        r = n / a;
    e *= getImperialZoomFix_1(), t *= getImperialZoomFix_1();
    var i = 0,
        s = canvas.offsetY,
        l = e - i + r,
        c = t - s + canvas.offsetY + r,
        d = Math.floor(l / n),
        u = Math.floor(c / n),
        f = d * n,
        m = u * n;
    return Math.abs(l - f) < 2 * r && Math.abs(c - m) < 2 * r && (o = new coordinates, o.x = _round(d * n), o.y = _round(u * n)), o
}

function filterFirstXY(e) {
    for (var t = [], a = !1, o = !1, n = 0; n < e.length; n++) a === !1 && e[n].getAttribute("y1") === e[n].getAttribute("y2") && (a = !0, t.push(e[n])), o === !1 && e[n].getAttribute("x1") === e[n].getAttribute("x2") && (o = !0, t.push(e[n]));
    return t
}

function getNearestGridPoint(e, t) {
    var a = null,
        o = e.x,
        n = e.y,
        r = [],
        i = t.grid * t.zoom,
        s = t.lineBeingDrawn ? i / (t.flagMobile ? 2.3 : 2) : i / 2.6;
    if (isObsoloteBrowser()) a = _getNearestGridPoint(o, n, t.lineBeingDrawn ? t.flagMobile ? 2.3 : 2 : 2.6), r = $("#sti_span > line");
    else {
        var l = t.svg.node,
            c = document.getElementById("sti_grid"),
            d = document.getElementById("sti_span"),
            u = l.createSVGRect();
        u.x = o - s, u.y = n - s, u.width = 2 * s, u.height = 2 * s;
        var f = l.getIntersectionList(u, c);
        f.length > 2 && (f = filterFirstXY(f)), 2 === f.length && (a = getIntersectionOfTwoLines(f), highlightNodes(a)), r = l.getIntersectionList(u, d)
    }
    if (r.length) {
        var m = getClosestEndPoint(o, n, r);
        if (m.isUsed()) {
            var g = dist(o, n, m.x, m.y),
                _ = a && a.isUsed() ? dist(o, n, a.x, a.y) : null;
            (!_ || parseFloat(g) < parseFloat(_)) && g && s > g && (a = m, highlightNodes(m))
        }
    }
    return a && (a.x *= getImperialZoomFix(), a.y *= getImperialZoomFix()), a
}

function hideGrid() {
    $("#sti_grid").css("display", "none")
}

function showGrid() {
    $("#sti_grid").css("display", "")
}

function _enableToolBar(e) {
    var t = !1;
    if ("#tool_new" === e || "#tool_open" === e || "#tool_save" === e || "#tool_sections" === e || "#tool_view" === e) 0 === getOpenForms().length && (t = !0);
    else if ("#tool_zoom_out" === e) canvas.zoom != arrZooms2[0] && (t = !0);
    else if ("#tool_zoom_in" === e) {
        var a = arrZooms2.length - 1;
        canvas.zoom != arrZooms2[a] && (t = !0)
    } else "#tool_select" === e ? !$("#sti_span").find("line").length || canvas.flagDemoIsRunning || canvas.flagSelectingTool || canvas.flagModifyingLoad || canvas.flagRemovingLoads || canvas.flagApplyingUniformLoad || canvas.flagApplyingSingleLoad || canvas.flagApplyingHinges || canvas.flagSelectingSup || (t = !0) : "#tool_escape" === e ? (getOpenForms().length || "block" === $("#form_coord").css("display") || getSelecedtObjects().length || $("#sti_auxiliary .snap_rect_dragged.snap_rect_focused").length) && (t = !0) : "#tool_delete" === e ? (getSelecedtObjects().length || getFocusedLoad()) && (t = !0) : "#tool_supports" === e || "#tool_hinge" === e || "#tool_load" === e ? 0 === getOpenForms().length && $("#sti_span").find("line").length && (t = !0) : "#tool_calc" === e ? 0 === getOpenForms().length && $("#sti_span").find("line").length && $("#sti_loads > g").length && $("#sti_supports").find("use").length && (t = !0) : "#tool_settings" === e ? "block" === $("#form_settings").css("display") || (t = !0) : "#tool_tools" === e && (canvas.flagDemoIsRunning || 0 !== getOpenForms().length || (t = !0));
    t ? enableToolBar(e) : disableToolBar(e)
}

function disableToolBar(e) {
    var t = $(e);
    t.addClass("disabled")
}

function enableToolBar(e) {
    $(e).removeClass("off"), $(e).removeClass("disabled")
}

function disableAllToolBars() {
    for (var e = 0; e < g_aToolBarIds.length; e++) _enableToolBar(g_aToolBarIds[e])
}

function enableAllToolBars() {
    disableAllToolBars()
}

function resizeRedrawMenuTools() {
    menuToolsShown() && showMenuTools()
}

function showMenuTools() {
    var e = $("#tool_tools"),
        t = e.offset().left,
        a = e.offset().top;
    a += e.outerHeight();
    var o = $("#menuTools");
    o.css("display", "block").css("position", "fixed").css("top", a - window.pageYOffset + "px").css("left", t - window.pageXOffset + "px");
    var n = $("body").innerWidth(),
        r = $("#menuTools").offset().left + $("#menuTools").outerWidth();
    r > n && o.css("left", t - window.pageXOffset + e.outerWidth() - o.innerWidth() + "px")
}

function toolClicked(e) {
    var t = $(e.target).closest("li"),
        a = t.attr("id"),
        o = t.hasClass("disabled");
    return "tool_tools" === a ? o || showMenuTools() : "tool_zoom_in" === a ? o || zoomIn(canvas) : "tool_load" === a ? o || showLoadsDialog(canvas) : "tool_select" === a ? o || toolSelectObjects(e) : "tool_zoom_out" === a ? o || zoomOut(canvas) : "tool_escape" === a ? escKeyPressed(canvas) : "tool_delete" === a ? o || deleteKeyPressed(canvas) : "tool_new" === a ? o || showNewDialog(canvas, e) : "tool_hinge" === a ? o || (showHingesDialog(canvas), showHintDragDialog()) : "tool_sections" === a ? o || (showSectionsDialog(canvas), showHintDragDialog()) : "tool_supports" === a ? o || (showSupportsDialog(canvas), showHintDragDialog()) : "tool_calc" === a ? o || (demoCalcPressed(), e.shiftKey ? export_xml() : calculate(e)) : "tool_xml" === a || ("tool_open" === a ? o || showOpenDialog() : "tool_save" === a ? o || showSaveDialog() : "tool_view" === a ? (o || (showViewDialog(), showHintDragDialog()), demoViewPressed()) : "tool_settings" === a ? (showSettingsDialog(), showHintDragDialog()) : "tool_hide_tb" === a && (canvas.flagDemoIsRunning || tb_hide(e))), console.log(a), !1
}

function mouseOverToolBar() {
    canvas.flagToolbarActive = !0
}

function mouseOutToolBar() {
    canvas.flagToolbarActive = !1
}

function toolbarIsHidden() {
    var e = $("#sti_toolbar_hiden > li:first").length > 0;
    return e
}

function _tb_hide() {
    var e = $("#sti_toolbar ul > *").not("[id=tool_hide_tb]");
    $("#sti_toolbar_hiden").append(e), $("#tool_hide_tb i").attr("class", "fa fa-angle-double-down");
    var t = 0;
    $("#sti_svg_canvas").css("margin-top", t + "px"), canvas.offsetY = t, $("#sti_toolbar_bg").css("display", "none")
}

function _tb_unhide() {
    var e = $("#sti_toolbar_hiden > *");
    $("#sti_toolbar ul").prepend(e), $("#tool_hide_tb i").attr("class", "fa fa-angle-double-up");
    var t = canvas.offsetYBackup;
    $("#sti_svg_canvas").css("margin-top", t + "px"), canvas.offsetY = t, $("#tool_hide_tb").css("left", "auto").css("right", "0").attr("class", "last"), $("#sti_toolbar_bg").css("display", ""), $("#sti_toolbar ul").css("position", getTbPositioning())
}

function tb_hide() {
    return canvas.flagToolbarIsHidden ? (canvas.flagToolbarIsHidden = !1, _tb_unhide()) : (canvas.flagToolbarIsHidden = !0, _tb_hide(), $("#sti_toolbar ul").css("position", "fixed" === getTbPositioning() ? "" : "absolute")), !1
}

function tbGetWidth(e, t) {
    for (var a = 0, o = 0; o < t.length; o++)
        if (e === t[o][0]) {
            a = t[o][1];
            break
        }
    return a
}

function tbGetWidthAll() {
    for (var e = [
            [], 0
        ], t = $("#sti_toolbar ul li"), a = 0; a < t.length; a++) {
        var o = $(t[a]).outerWidth(),
            n = $(t[a]).attr("id");
        e[1] += o, e[0].push([n, o])
    }
    return e
}

function fixToolBarPositionNew() {
    var e = toolbarIsHidden();
    e && _tb_unhide();
    var t = $("#tool_delete_break_br");
    t.length > 0 && ($('<li id="tool_delete_break" />').insertAfter($("#tool_delete_break_br")), $("#tool_delete_break_br").remove());
    for (var a = 0; a < g_ar.length; a++) {
        var o = $("#" + g_ar[a][0] + " a"),
            n = o.html(),
            r = g_ar[a][canvas.flagShowTBlabels ? 1 : 2];
        n !== r && o.html(r)
    }
    var i = $("#sti_toolbar a");
    i.attr("class", "");
    var s = $("#tool_zoom_out").outerWidth(),
        l = tbGetWidthAll(),
        c = l[1],
        d = canvas.resX - s / 2;
    if (c > d && canvas.flagShowTBlabels)
        for (var a = 0; a < g_ar.length; a++) {
            var u = g_ar[a][0],
                f = tbGetWidth(u, l[0]);
            if (f > s && (c -= f - s, $("#" + g_ar[a][0] + " a").html(g_ar[a][2])), d > c) break
        }
    if (d > c);
    else {
        var m, g, _ = $("#tool_new"),
            h = i.length;
        for (m = 8; m >= 6; m -= 2) {
            $(i[0]).attr("class", "padding" + m), g = _.outerWidth();
            var v = s - g,
                p = v * h;
            if (d > c - p) break
        }
        if (6 > m && (m = 6), i.attr("class", "padding" + m), c -= p, c >= d) {
            $('<br style="clear: left;" id="tool_delete_break_br" />').insertAfter($("#tool_delete_break")), $("#tool_delete_break").remove(), $(i[0]).attr("class", "");
            var y = "";
            for (m = 8; m >= 6; m -= 2) {
                g = _.outerWidth();
                var b = g * (Math.ceil(h / 2) + 1);
                if (d > b) {
                    i.attr("class", y);
                    break
                }
                y = "padding" + m, $(i[0]).attr("class", y)
            }
        }
    }
    var S = i.attr("class");
    void 0 == S && (S = ""), elsMenu = $("#menuTools a").attr("class", S), runTBtimerFindHeight(), resizeRedrawMenuTools()
}

function runTBtimerFindHeight() {
    g_timer_TBF_count = 10, canvas.toolbarHeight = $("#tool_hide_tb").outerHeight(), _runTBtimerFindHeight()
}

function _runTBtimerFindHeight() {
    setTimeout(function() {
        var e = !1;
        g_timer_TBF_count--, _fixToolBarPositionNewFinish(e)
    }, 250)
}

function getTbPositioning() {
    var e = $("#sti_toolbar_bg").css("position");
    return "absolute" === e ? "absolute" : "fixed"
}

function _fixToolBarPositionNewFinish(e) {
    var t = getTbPositioning();
    $("#sti_toolbar ul").css("position", t);
    var a = $("#sti_toolbar ul").outerHeight();
    if (a > 0) {
        var o = canvas.toolbarHeight;
        canvas.toolbarHeight = $("#tool_hide_tb").outerHeight(), $("#sti_svg_canvas").css("margin-top", a + "px"), canvas.offsetY = a, canvas.offsetYBackup = a, $("#sti_toolbar_bg").css("width", $(window).width() + "px").css("height", a + "px"), canvas.flagToolbarIsHidden && _tb_hide(), e || o && o != canvas.toolbarHeight || 0 > g_timer_TBF_count || _runTBtimerFindHeight()
    } else g_timer_TBF_count >= 0 ? _runTBtimerFindHeight() : canvas.flagToolbarIsHidden && _tb_hide()
}

function dist(e, t, a, o) {
    var n = parseFloat(e),
        r = parseFloat(a),
        i = parseFloat(t),
        s = parseFloat(o),
        l = Math.sqrt((n - r) * (n - r) + (i - s) * (i - s));
    return l
}

function getClosestEndPoint(e, t, a) {
    var o = new coordinates,
        n = 1e6;
    if (a && a.length)
        for (var r = 0; r < a.length; r++)
            if (a[r] instanceof SVGLineElement && -1 !== $(a[r]).attr("class").split(" ").indexOf("span")) {
                var i = a[r].getAttribute("x1") * canvas.zoom / defaultZoom,
                    s = a[r].getAttribute("x2") * canvas.zoom / defaultZoom,
                    l = a[r].getAttribute("y1") * canvas.zoom / defaultZoom,
                    c = a[r].getAttribute("y2") * canvas.zoom / defaultZoom,
                    d = (e - i) * (e - i) + (t - l) * (t - l);
                n > d && (n = d, o.x = i, o.y = l), d = (e - s) * (e - s) + (t - c) * (t - c), n > d && (n = d, o.x = s, o.y = c)
            }
    return o
}

function getIntersectionOfTwoLines(e) {
    var t = new coordinates;
    if (2 === e.length)
        for (var a = 0; a < e.length; a++) e[a] instanceof SVGLineElement && (e[a].getAttribute("x1") === e[a].getAttribute("x2") ? t.x = e[a].getAttribute("x1") : t.y = e[a].getAttribute("y1"));
    else alert("Implementation error in getIntersectionOfTwoLines()");
    return t
}

function establishLineFrom(e, t) {
    var a = e.auxiliary,
        o = getZoom(e),
        n = e.svg.line(_round(t.x / o), _round(t.y / o), _round(t.x / o), _round(t.y / o)).attr("class", "draw");
    gTimerTouchActive && $(n.node).css("display", "none"), a.add(n);
    var r = _round(nodeSize() * getScaleZ()),
        i = _round(t.x / o),
        s = _round(t.y / o),
        l = e.svg.rect(2 * r, 2 * r);
    return l.move(i - r, s - r).attr("class", "node nodeBeingDrawn").attr("_x", i).attr("_y", s), a.add(l), n
}

function establishTextOfLineBeingDrawn() {
    var e = canvas.svg.plain("");
    return e.attr("class", "coordDrawn"), $(e.node).css("display", "none"), e
}

function getTextOfLineBeingDrawn() {
    return canvas.textSpan.text(""), canvas.textSpan
}

function removeLineBeingDrawn(e) {
    $("#sti_loads").insertAfter($("#sti_span_nodes")), e.lineBeingDrawn && (e.lineBeingDrawn.remove(), e.lineBeingDrawn = null, resetToolBarEscape())
}

function removeTextBeingDrawn() {
    $("#sti_auxiliary rect.nodeBeingDrawn").remove(), $("#form_coord").css("display", "none"), $("#form_coord_x").removeClass("error"), $("#form_coord_y").removeClass("error")
}

function updateTextLineDrawn(e) {
    var t = (e.lineBeingDrawn.attr("x2") - e.lineBeingDrawn.attr("x1")) / defaultZoom / e.unit,
        a = (e.lineBeingDrawn.attr("y2") - e.lineBeingDrawn.attr("y1")) / defaultZoom / e.unit;
    t = _round(t), a = _round(a), $("#form_coord_x").val(t), $("#form_coord_y").val(a), $("#form_coord_x").removeClass("error"), $("#form_coord_y").removeClass("error")
}

function hideEnterCoordDialog() {
    removeLineBeingDrawn(canvas), removeTextBeingDrawn(canvas);
    var e = $("#sti_span_nodes > rect.node_focused");
    e.each(function() {
        this.instance.removeClass("node_focused")
    })
}

function checkIntersectionLineLine(e, t) {
    var a = null;
    if (e && t) {
        var o = _round(parseFloat(e.attr("x1"))),
            n = _round(parseFloat(e.attr("x2"))),
            r = _round(parseFloat(e.attr("y1"))),
            i = _round(parseFloat(e.attr("y2"))),
            s = _round(parseFloat(t.attr("x1"))),
            l = _round(parseFloat(t.attr("x2"))),
            c = _round(parseFloat(t.attr("y1"))),
            d = _round(parseFloat(t.attr("y2"))),
            u = new Point2D(o, r),
            f = new Point2D(n, i),
            m = new Point2D(s, c),
            g = new Point2D(l, d),
            _ = Intersection.intersectLineLine2(u, f, m, g);
        _.points.length && (a = _)
    }
    return a
}

function checkIntersectionLineRectangle(e, t) {
    var a = !1;
    if (e instanceof SVGLineElement) {
        var o = $(e).attr("x1") * canvas.zoom / defaultZoom,
            n = $(e).attr("x2") * canvas.zoom / defaultZoom,
            r = $(e).attr("y1") * canvas.zoom / defaultZoom,
            i = $(e).attr("y2") * canvas.zoom / defaultZoom,
            s = t.x,
            l = t.x + t.width,
            c = t.y,
            d = t.y + t.height,
            u = new Point2D(o, r),
            f = new Point2D(n, i),
            m = new Point2D(s, c),
            g = new Point2D(l, d),
            _ = Intersection.intersectLineRectangle(u, f, m, g);
        _.points.length && (a = !0)
    }
    return a
}

function _establishTemporaryRectForIntersect(e, t) {
    e *= getImperialZoomFix_1(), t *= getImperialZoomFix_1();
    var a = canvas.auxiliary,
        o = canvas.svg.rect(0, 0).move(e * defaultZoom / canvas.zoom, t * defaultZoom / canvas.zoom).addClass("aux");
    o.attr("_x", e * defaultZoom / canvas.zoom).attr("_y", t * defaultZoom / canvas.zoom), a.add(o)
}

function establishTemporaryRectForIntersect(e) {
    var t = e.clientX + window.pageXOffset,
        a = e.clientY + window.pageYOffset - canvas.offsetY;
    _establishTemporaryRectForIntersect(t, a)
}

function nodeIsInside(e, t, a) {
    var o = !1,
        n = a * e.attr("x1"),
        r = a * e.attr("x2"),
        i = a * e.attr("y1"),
        s = a * e.attr("y2"),
        l = t.x,
        c = t.x + t.width,
        d = t.y,
        u = t.y + t.height;
    return n >= l && c >= n && i >= d && u >= i ? o = !0 : r >= l && c >= r && s >= d && u >= s && (o = !0), o
}

function findObjectsByRect(e, t) {
    var a = null,
        o = e.svg.node,
        n = document.getElementById("sti_span");
    if (n && $(n).children().length) {
        var r = o.createSVGRect();
        r.x = t.attr("x") * e.zoom / defaultZoom, r.y = t.attr("y") * e.zoom / defaultZoom, r.width = t.attr("width") * e.zoom / defaultZoom, r.height = t.attr("height") * e.zoom / defaultZoom;
        try {
            var i = o.getIntersectionList(r, n),
                s = [];
            $(i).each(function() {
                res = nodeIsInside($(this)[0].instance, r, e.zoom / defaultZoom) || checkIntersectionLineRectangle(this, r), res && s.push(this)
            }), a = s
        } catch (l) {}
    }
    return a
}

function selectObjectsByRect(e, t) {
    var a = findObjectsByRect(e, t);
    a && selectObject(e, a)
}

function touchNodeStart(e) {
    _mouseOverSnap(this.instance);
    var t = e.originalEvent.touches[0].clientX + window.pageXOffset,
        a = e.originalEvent.touches[0].clientY + window.pageYOffset - canvas.offsetY;
    _mouseDragSnap(t, a, this.instance), e.preventDefault()
}

function touchscreenUnhighlightSnaps() {
    var e = $("#sti_auxiliary rect");
    $(e).each(function() {
        this.instance.removeClass("snap_rect_focused")
    })
}

function touchNodeCancel(e) {
    mouseDragSnapUndo(this.instance), touchscreenUnhighlightNodes(), touchscreenUnhighlightSnaps(), unsetIgnoreClick(canvas), e.preventDefault()
}

function touchNodeEnd(e) {
    mouseReleaseSnap1(this.instance), touchscreenUnhighlightNodes(), touchscreenUnhighlightSnaps(), unsetIgnoreClick(canvas), e.preventDefault()
}

function touchNodeMove(e) {
    var t = e.originalEvent.touches[0].clientX + window.pageXOffset,
        a = e.originalEvent.touches[0].clientY + window.pageYOffset - canvas.offsetY;
    mouseDragSnap1(this.instance, t, a), e.preventDefault()
}

function _mouseOverSnap(e) {
    canvas.flagApplyingSingleLoad || canvas.flagSelectingSup || canvas.flagApplyingHinges || e.hasClass("snap_rect_dragged") || (e.attr("class", "snap_rect snap_rect_focused"), document.body.style.cursor = "move")
}

function mouseOverSnap() {
    _mouseOverSnap(this)
}

function mouseOutSnap() {
    canvas.flagSelectingSup || canvas.flagApplyingHinges || mouseOutSnap1(this)
}

function mouseOutSnap1(e) {
    e.hasClass("snap_rect_dragged") || (e.attr("class", "snap_rect"), document.body.style.cursor = "default")
}

function mouseOverSpan(e) {
    var t = this;
    if (t.hasClass("dummySpan")) {
        var a = $("#sti_span").find("line[id=" + t.attr("parentId") + "]");
        a.length && (t = a[0].instance)
    }
    if (canvas.flagApplyingSingleLoad || canvas.flagApplyingUniformLoad);
    else if (canvas.flagApplyingHinges || canvas.flagRemovingLoads) t.addClass("span_focused");
    else if (canvas.flagSelectingSup);
    else if (!canvas.lineBeingDrawn && !$("#sti_auxiliary rect.aux").length && !$(".snap_rect_dragged").length) {
        var o = t.attr("section"),
            n = $("#sectionsData div[id='" + o + "']");
        if (canvas.textLine = getTextOfLineBeingDrawn(), n.length) {
            canvas.textLine.text(n[0].getAttribute("name")).attr("parentId", t.attr("id"));
            var r = getZoom(canvas),
                i = canvas.drawingScale,
                s = getShiftY("coordDrawn"),
                l = (e.clientX + window.pageXOffset + 8 * i) / r,
                c = (e.clientY + window.pageYOffset - canvas.offsetY - 12 * i) / r - s;
            canvas.textLine.attr("_x", l), canvas.textLine.attr("_y", c), canvas.auxSection.add(canvas.textLine), gTimerTouchActive || ($(canvas.textSpan.node).css("display", ""), canvas.textLine.move(l, c), textBoundingRect($(canvas.auxSection.node), 0, !0));
            for (var d = $("#sti_span > line"), u = 0; u < d.length; u++) {
                var f = d[u].instance.attr("section");
                f === o && d[u].instance.addClass("span_sectionHighlighted")
            }
        }
        t.hasClass("span_selected") || canvas.flagModifyingLoad || (t.addClass("span_focused"), document.body.style.cursor = "default")
    }
}

function getSpanFromDummySpan(e) {
    var t = null;
    if (e.hasClass("span")) t = e;
    else {
        var a = $("#sti_span").find("line[id=" + e.attr("parentId") + "]");
        a.length && (t = a[0].instance)
    }
    return t
}

function unhighlightSpans(e) {
    e && (e.hasClass("span_selected") || e.attr("class", "span")), $(canvas.textSpan.node).css("display", "none"), $("#sti_auxSection > rect").remove();
    for (var t = $("#sti_span > line"), a = 0; a < t.length; a++) t[a].instance.removeClass("span_sectionHighlighted")
}

function mouseOutSpan() {
    var e = this;
    try {
        e = getSpanFromDummySpan(e), canvas.flagApplyingHinges || canvas.flagRemovingLoads ? e.removeClass("span_focused") : canvas.flagSelectingSup || canvas.flagModifyingLoad || (unhighlightSpans(e), document.body.style.cursor = "default")
    } catch (t) {}
}

function createNode(e, t, a, o, n, r, i) {
    var s = null !== o ? o : canvas.lastId++,
        l = canvas.svg.rect(2 * a, 2 * a).move(e - a, t - a).attr("_x", e).attr("_y", t).attr("id", s).attr("parentId", n).attr("class", r);
    return i.add(l), s
}

function attachNodesToLine(e) {
    var t = e.attr("x1"),
        a = e.attr("x2"),
        o = e.attr("y1"),
        n = e.attr("y2"),
        r = e.attr("id"),
        i = _round(nodeSize() * getScaleZ()),
        s = createNode(t, o, i, null, r, "node", canvas.spanNodesGroup),
        l = createNode(a, n, i, null, r, "node", canvas.spanNodesGroup),
        c = getDummyNodeSize(i),
        d = createNode(t, o, c, null, s, "nodeDummy", $("#sti_span_nodes_dummy")[0].instance),
        u = createNode(a, n, c, null, l, "nodeDummy", $("#sti_span_nodes_dummy")[0].instance);
    $("#" + d)[0].instance.attr("parentIdSpan", r), $("#" + u)[0].instance.attr("parentIdSpan", r)
}

function mouseDragAuxRect(e, t, a) {
    var o = _round($(e).attr("_x")),
        n = _round($(e).attr("_y"));
    t *= defaultZoom / canvas.zoom * getImperialZoomFix_1(), a *= defaultZoom / canvas.zoom * getImperialZoomFix_1();
    var r = Math.abs(t - o),
        i = Math.abs(a - n);
    o > t && (o -= r), n > a && (n -= i), $(e).attr("width", r).attr("height", i).attr("x", o).attr("y", n)
}

function mouseDragSnapUndo(e) {
    var t = e.attr("_x") * canvas.zoom / defaultZoom,
        a = e.attr("_y") * canvas.zoom / defaultZoom,
        o = !0;
    mouseDragSnap1(e, t, a, o), mouseReleaseSnap1(e), mouseOutSnap1(e)
}

function swapEnds(e) {
    var t = e.attr("x1"),
        a = e.attr("x2"),
        o = e.attr("y1"),
        n = e.attr("y2");
    e.attr("x1", a), e.attr("x2", t), e.attr("y1", n), e.attr("y2", o)
}

function mouseDragSnap1(e, t, a, o) {
    var n = e.attr("x"),
        r = e.attr("y"),
        i = _round(n),
        s = _round(r),
        l = new coordinates(t, a);
    if (o === !0);
    else {
        var c = getNearestGridPoint(l, canvas);
        c && c.x >= 0 && c.y >= 0 ? (t = c.x, a = c.y) : (t = i * getZoom(canvas), a = s * getZoom(canvas)), t *= getImperialZoomFix_1(), a *= getImperialZoomFix_1()
    }
    for (var d = $("#sti_auxiliary").find("rect.snap_rect_dragged"), u = 0; u < d.length; u++) {
        var f = d[u].instance,
            m = f.attr("idParent"),
            g = $("#" + m)[0],
            _ = $("#sti_span_dummy").find("line[parentId=" + m + "]"),
            h = _round(g.instance.attr("x1")),
            v = _round(g.instance.attr("x2")),
            p = _round(g.instance.attr("y1")),
            y = _round(g.instance.attr("y2"));
        if (h === i && p === s || v === i && y === s) {
            var b = _round(t * defaultZoom / canvas.zoom),
                S = _round(a * defaultZoom / canvas.zoom),
                w = h === i && p === s;
            g.instance.attr(w ? "x1" : "x2", b), g.instance.attr(w ? "y1" : "y2", S), _[0].instance.attr(w ? "x1" : "x2", b), _[0].instance.attr(w ? "y1" : "y2", S);
            var x = $("#sti_span_bottom").find("line[parentId=" + m + "]");
            if (x.length > 0) {
                x = x[0].instance;
                var T = w ? getAngleFromCoordInRad(b, S, v, y) : getAngleFromCoordInRad(h, p, b, S),
                    M = !1;
                T >= .75 && T <= 5 / 4 * Math.PI && (T += Math.PI, M = !0);
                var A = getShiftOfTheBottomLine();
                A = _round(A * getScaleZ());
                var D = A * Math.cos(T),
                    L = -A * Math.sin(T);
                if (x.attr(w ? "x1" : "x2", b), x.attr(w ? "y1" : "y2", S), x.translate(D, L), M) {
                    swapEnds(g.instance);
                    var F = $(g).attr("swap");
                    F = void 0 === F || 0 == F ? 1 : 0, $(g).attr("swap", F), swapEnds(_[0].instance), swapEnds(x)
                }
            }
        }
        var I = _round(t * defaultZoom / canvas.zoom),
            k = _round(a * defaultZoom / canvas.zoom);
        f.move(I, k)
    }
}

function markOverlapedSnapsDragged(e) {
    var t = e.attr("x"),
        a = e.attr("y");
    $("#sti_auxiliary").find("rect[x='" + t + "'][y='" + a + "']").each(function() {
        this.instance.addClass("snap_rect_dragged")
    })
}

function _mouseDragSnap(e, t, a) {
    var o = a.attr("x"),
        n = a.attr("y");
    markOverlapedSnapsDragged(a), mouseDragSnap1(a, e, t), a.attr("_x", o).attr("_y", n)
}

function mouseDragSnap(e) {
    if (isLeftButton(e)) {
        var t = e.clientX + window.pageXOffset,
            a = e.clientY + window.pageYOffset - canvas.offsetY;
        _mouseDragSnap(t, a, this)
    }
}

function mouseReleaseSnap(e) {
    if (isLeftButton(e)) {
        mouseReleaseSnap1(this)
    }
}

function removeSpan(e) {
    var t = e.attr("id");
    $("#sti_span_bottom").find("line[parentId=" + t + "]")[0].remove(), $("#sti_span_dummy").find("line[parentId=" + t + "]")[0].remove(), $("#sti_auxiliary").find("rect[idParent=" + t + "]")[0].remove(), $("#sti_span_nodes > rect[parentId=" + t + "]").remove(), $("#sti_span_nodes_dummy > rect[parentIdSpan=" + t + "]").remove(), e.remove()
}

function unHighlightSpans() {
    for (var e = $("#sti_span line.span_focused"), t = 0; t < e.length; t++) e[t].instance.removeClass("span_focused")
}

function removeZeroLinesAttaachedToSnap(e) {
    var t = e.attr("idParent"),
        a = $("#sti_span").find("line[id=" + t + "]");
    if (a.length) {
        var o = a[0].instance.attr("x1"),
            n = a[0].instance.attr("x2"),
            r = a[0].instance.attr("y1"),
            i = a[0].instance.attr("y2");
        o === n && r === i && removeSpan(a)
    }
}

function mouseReleaseSnap1(e) {
    for (var t = $("#sti_auxiliary").find("rect"), a = $("#sti_auxiliary rect.snap_rect_dragged.snap_rect_focused")[0].instance, o = a.attr("_x"), n = a.attr("_y"), r = a.attr("x"), i = a.attr("y"), s = o != r || n != i, l = 0; l < t.length; l++) {
        var c = t[l].instance;
        if (c.attr("x") === e.attr("x") && c.attr("y") === e.attr("y")) {
            c.removeClass("snap_rect_dragged"), removeZeroLinesAttaachedToSnap(c), setIgnoreClick(canvas);
            var d = c.attr("idParent");
            if (s) {
                $("#sti_supports").find("use[_x='" + o + "'][_y='" + n + "']").remove();
                var u = _round(nodeSize() * getScaleZ()),
                    f = getDummyNodeSize(u);
                $("#sti_span_nodes > rect[_x='" + o + "'][_y='" + n + "'][parentId=" + d + "]").attr("x", c.attr("x") - u).attr("y", c.attr("y") - u).attr("_x", c.attr("x")).attr("_y", c.attr("y")), $("#sti_span_nodes_dummy > rect[_x='" + o + "'][_y='" + n + "'][parentIdSpan=" + d + "]").attr("x", c.attr("x") - f).attr("y", c.attr("y") - f).attr("_x", c.attr("x")).attr("_y", c.attr("y")), hinges = $("#sti_hinges").find("circle[parentId=" + d + "]"), hinges.remove();
                var m = $("#" + d);
                if (m.length) {
                    var g = m[0].instance.attr("hinge"),
                        _ = getHingesFromString(g),
                        h = 1 == m.attr("swap"),
                        v = _[h ? 1 : 0],
                        p = _[h ? 0 : 1];
                    createHingesObjects(_[h ? 1 : 0], _[h ? 0 : 1], m);
                    var y = v ? "1" : "";
                    p && (y += " 2"), m[0].instance.attr("hinge", y), m.removeAttr("swap")
                }
                $("#sti_loads > g[parentId=" + d + "]").remove()
            }
        }
    }
    s && ($("#sti_loads > g[_x='" + o + "'][_y='" + n + "']").remove(), cleanResults())
}

function createSnaps(e, t) {
    for (var a = 0; a < t.length; a++)
        if (t[a] instanceof SVGLineElement) {
            var o = t[a].getAttribute("x1"),
                n = t[a].getAttribute("x2"),
                r = t[a].getAttribute("y1"),
                i = t[a].getAttribute("y2"),
                s = _round(snapSize() * getScaleZ()),
                l = t[a].getAttribute("id"),
                c = e.svg.rect(s, s).move(o, r).attr("class", "snap_rect").attr("idParent", l).translate(-s / 2, -s / 2),
                d = e.svg.rect(s, s).move(n, i).attr("class", "snap_rect").attr("idParent", l).translate(-s / 2, -s / 2);
            e.auxiliary.add(c), e.auxiliary.add(d), c.on("mouseover", mouseOverSnap).on("mouseout", mouseOutSnap).on("mouseup", mouseReleaseSnap).on("mousedown", mouseDragSnap), $(c).hover(function() {
                $(this).data("hover", 1)
            }, function() {
                $(this).data("hover", 0)
            }), d.on("mouseover", mouseOverSnap).on("mouseout", mouseOutSnap).on("mouseup", mouseReleaseSnap).on("mousedown", mouseDragSnap), "ontouchstart" in document.documentElement && ($(c.node).on("touchend", touchNodeEnd), $(d.node).on("touchend", touchNodeEnd), $(c.node).on("touchcancel", touchNodeCancel), $(d.node).on("touchcancel", touchNodeCancel), $(c.node).on("touchstart", touchNodeStart), $(d.node).on("touchstart", touchNodeStart), $(c.node).on("touchmove", touchNodeMove), $(d.node).on("touchmove", touchNodeMove)), $(d).hover(function() {
                $(this).data("hover", 1)
            }, function() {
                $(this).data("hover", 0)
            })
        }
}

function getAngleFromCoordInRad(e, t, a, o) {
    var n = a - e,
        r = -(o - t),
        i = 0;
    return i = 0 === n ? r > 0 ? Math.PI / 2 : -Math.PI / 2 : Math.atan(r / n), 0 > n && (i += Math.PI), i -= Math.PI / 2
}

function enforceLayersOnByDrawing(e) {
    if (canvas.showWarningHidden && !(canvas.showNodes && canvas.showGrid && canvas.showSupports && canvas.showLoads)) {
        canvas.showWarningHidden = !1;
        var t = "<p>You might want to enter <strong>Diagrams</strong> form to switch on:";
        canvas.showNodes || (t += "</br><strong>&emsp; &bull; &nbsp;nodes</strong>"), canvas.showGrid || (t += "</br><strong>&emsp; &bull; &nbsp;grid</strong>"), canvas.showSupports || (t += "</br><strong>&emsp; &bull; &nbsp;supports</strong>"), canvas.showLoads || (t += "</br><strong>&emsp; &bull; &nbsp;loads</strong>"), t += "</p>";
        var a = new noticeParameters(e, "warning", t);
        showNotice2(a)
    }
}

function continueDraingLine(e) {
    var t = canvas.lineBeingDrawn.attr("x1"),
        a = canvas.lineBeingDrawn.attr("y1"),
        o = canvas.lineBeingDrawn.attr("x2"),
        n = canvas.lineBeingDrawn.attr("y2");
    if (enforceLayersOnByDrawing(e), t === o && a === n) canvas.lineBeingDrawn.remove(), canvas.lineBeingDrawn = null, $("#form_coord").css("display", "none");
    else {
        var r = getAngleFromCoordInRad(t, a, o, n);
        r >= .75 && r <= 5 / 4 * Math.PI && (r += Math.PI, canvas.lineBeingDrawn.attr("x1", o), canvas.lineBeingDrawn.attr("y1", n), canvas.lineBeingDrawn.attr("x2", t), canvas.lineBeingDrawn.attr("y2", a)), canvas.lineBeingDrawn.attr("class", "span"), canvas.lineBeingDrawn.attr("id", canvas.lastId), $(canvas.lineBeingDrawn.node).css("display", ""), canvas.lastId++, attachNodesToLine(canvas.lineBeingDrawn), removeTextBeingDrawn(canvas);
        var i = spanIntersectsOtherSpan(canvas, canvas.lineBeingDrawn);
        if (i.length) {
            for (var s = "<p>", l = 0; l < i.length; l++) s += i[l], l < i.length - 1 && (s += "</br>");
            s += "</p>";
            var c = new noticeParameters(e, "warning", s);
            showNotice2(c)
        }
        canvas.lineBeingDrawn.on("mouseover", mouseOverSpan).on("mouseout", mouseOutSpan);
        var d = canvas.lineBeingDrawn.clone(),
            u = canvas.lineBeingDrawn.attr("id");
        d.attr("parentId", u), d.attr("class", "dummySpan"), d.on("mouseover", mouseOverSpan).on("mouseout", mouseOutSpan), canvas.spanDummyGroup.add(d);
        var f = d.clone();
        f.attr("class", "bottomSpan");
        var m = getShiftOfTheBottomLine();
        m = _round(m * getScaleZ());
        var g = m * Math.cos(r),
            _ = -m * Math.sin(r);
        f.translate(g, _), canvas.spanBottomGroup.add(f), canvas.spanGroup.add(canvas.lineBeingDrawn), _enableToolBar("#tool_select"), cleanResults()
    }
}

function formCoordFocusOut() {
    canvas.flagIgnoreKbdShortcuts = !1;
    var e = $("#form_coord_x").val();
    "" === e && $("#form_coord_x").val("0");
    var t = $("#form_coord_y").val();
    "" === t && $("#form_coord_y").val("0")
}

function formCoordFocusInX() {
    canvas.flagIgnoreKbdShortcuts = !0;
    var e = $("#form_coord_x").val();
    "0" === e && $("#form_coord_x").val("")
}

function formCoordFocusInY() {
    canvas.flagIgnoreKbdShortcuts = !0;
    var e = $("#form_coord_y").val();
    "0" === e && $("#form_coord_y").val("")
}

function alertCoordTrySettings(e) {
    var t = new noticeParameters(e, "warning", "You can enlarge drawing area in <strong>Settings</strong>");
    showNotice2(t), highlightSettingsButtons()
}

function formCoord_xUp() {
    var e = $("#form_coord_x").val(),
        t = $("#form_coord_y").val(),
        a = !1;
    $("#form_coord_x").removeClass("error"), $("#form_coord_y").removeClass("error"), $.isNumeric(e) || ($("#form_coord_x").addClass("error"), a = !0), $.isNumeric(t) || ($("#form_coord_y").addClass("error"), a = !0), e = _round(parseFloat(e) * defaultZoom * canvas.unit), t = _round(parseFloat(t) * defaultZoom * canvas.unit);
    var o = canvas.lineBeingDrawn.attr("x1"),
        n = canvas.lineBeingDrawn.attr("y1"),
        r = o + e,
        i = n + t,
        s = getWorkSizeX() * defaultZoom * 1e3,
        l = getWorkSizeY() * defaultZoom * 1e3;
    return (0 > r || r > s) && ($("#form_coord_x").addClass("error"), a = !0), (0 > i || i > l) && ($("#form_coord_y").addClass("error"), a = !0), a || ($("#form_coord_x").removeClass("error"), $("#form_coord_y").removeClass("error"), canvas.lineBeingDrawn.attr("x2", r), canvas.lineBeingDrawn.attr("y2", i)), [a, r, i]
}

function formCoord_yUp(e) {
    formCoord_xUp(e)
}

function btn_coord_apply(e) {
    var t = formCoord_xUp(e),
        a = t[0],
        o = t[1],
        n = t[2];
    if (a) {
        var r = getWorkSizeX() * defaultZoom * 1e3,
            i = getWorkSizeY() * defaultZoom * 1e3;
        (o > r || n > i) && alertCoordTrySettings(e)
    } else {
        continueDraingLine(e);
        var s = new coordinates(_round(getImperialZoomFix() * o / defaultZoom * canvas.zoom), _round(getImperialZoomFix() * n / defaultZoom * canvas.zoom));
        canvas.lineBeingDrawn = establishLineFrom(canvas, s), displayForm("form_coord"), updateTextLineDrawn(canvas), $("#form_coord_x").focus(), resetToolBarEscape()
    }
    return !1
}

function dialogEnterCoordSI() {
    $("#form_coord_x").val(""), $("#form_coord_y").val("")
}

function dialogEnterCoordImperial() {
    dialogEnterCoordSI()
}

function coordinates(e, t) {
    this.x = e, this.y = t, this.isUsed = function() {
        return "undefined" != typeof this.x && "undefined" != typeof this.y
    }
}

function createPersonalStyleSheet() {
    var e = document.createElement("style");
    return e.type = "text/css", document.head.appendChild(e), e
}

function isLeftButton(e) {
    e = e || window.event;
    var t = e.which;
    (void 0 === t || null === t) && (t = e.button);
    var a = 0 === t || 1 === t;
    return a
}

function cCanvas() {
    this.svg = null, this.spanBottomGroup = null, this.gridsGroup = null, this.gridTextGroup = null, this.gridTextGroupX = null, this.gridTextGroupY = null, this.supports = null, this.reactions = null, this.hinges = null, this.prototypes = null, this.loads = null, this.loadsAux = null, this.auxiliary = null, this.auxSection = null, this.auxPlaceLoad = null, this.spanGroup = null, this.spanDeformGroup = null, this.textSpan = null, this.N = null, this.V = null, this.M = null, this.spanDummyGroup = null, this.spanNodesGroup = null, this.zoom = defaultZoom, this.originX = 0, this.originY = 0, this.grid = 1e3, this.unit = 1e3, this.gridFactor = 1, this.flagImperialUnits = !1, this.resX = $(window).width(), this.resY = $(window).height(), this.lastId = 0, this.flagAlertActive = !1, this.flagIgnoreClick = !1, this.flagToolbarActive = !1, this.flagSelectingSup = !1, this.flagApplyingHinges = !1, this.flagSelectingTool = !1, this.flagRemovingLoads = !1, this.flagApplyingSingleLoad = !1, this.flagApplyingUniformLoad = !1, this.flagViewDialogActive = !1, this.flagSetsDialogActive = !1, this.flagModifyingLoad = !1, this.flagShowTBlabels = !0, this.mainStyleSheet = createPersonalStyleSheet(), this.flagIgnoreKbdShortcuts = !1, this.clientX = 0, this.clientY = 0, this.workSizeX = null, this.workSizeY = null, this.offsetY = 0, this.offsetYBackup = 0, this.toolbarHeight = 0, this.flagToolbarHidden = !1, this.lineBeingDrawn = null, this.textLine = null, this.showSupports = !0, this.showLoads = !0, this.showNodes = !0, this.showReactions = !0, this.showGrid = !0, this.showWarningHidden = !1, this.showMomentDiagram = !1, this.showMomentDiagramRevers = !1, this.showMomentDiagramZoom = 1, this.showShearDiagram = !1, this.showShearDiagramZoom = 1, this.showNormalDiagram = !1, this.showNormalDiagramZoom = 1, this.showDisplacements = !1, this.showDisplacementZoom = 1, this.flagRuleReactionsDashedActive = !1, this.gauge = 0, this.groupFocusedLoad = null, this.guiScaleDefault = 1, this.guiScale = 1, this.drawingScale = 1, this.flagSaveRequired = !1, this.flagDemoIsRunning = !1, this.flagShowHintDragDialog = !1, this.flagMobile = /iphone|ipad|ipod|android|blackberry|mini|windows\sce|palm|iemobile|mobile/i.test(navigator.userAgent.toLowerCase()), this.flag_iOS = /iphone|ipad|ipod/i.test(navigator.userAgent.toLowerCase())
}

function getWorkSizeX() {
    var e = canvas.workSizeX;
    return e || (e = _round(this.resX / arrZooms2[0] / canvas.unit)), e
}

function getWorkSizeY() {
    var e = canvas.workSizeY;
    return e || (e = _round(this.resY / arrZooms2[0] / canvas.unit)), e
}

function ignoreClick(e) {
    return e.flagIgnoreClick
}

function setIgnoreClick(e) {
    e.flagIgnoreClick = !0
}

function unsetIgnoreClick(e) {
    e.flagIgnoreClick = !1
}

function _round(e) {
    return Math.round(.1 + 1e6 * e) / 1e6
}

function _round2(e) {
    return Math.round(.1 + 100 * e) / 100
}

function establishSVG(e) {
    if (!e.svg) {
        e.svg = SVG("sti_svg_canvas"), e.svg.attr("transform", "translate(0,0)"), e.spanBottomGroup = e.svg.group().attr("id", "sti_span_bottom"), e.spanGroup = e.svg.group().attr("id", "sti_span"), e.spanDummyGroup = e.svg.group().attr("id", "sti_span_dummy"), e.spanNodesGroup = e.svg.group().attr("id", "sti_span_nodes");
        var t = e.svg.group().attr("id", "sti_span_nodes_dummy");
        e.spanNodesGroup.add(t), e.loads = e.svg.group().attr("id", "sti_loads"), e.loadsAux = e.svg.group().attr("id", "sti_loads_aux"), e.loads.add(e.loadsAux), e.supports = e.svg.group().attr("id", "sti_supports"), e.reactions = e.svg.group().attr("id", "sti_reactions"), e.hinges = e.svg.group().attr("id", "sti_hinges"), e.spanDeformGroup = e.svg.group().attr("id", "sti_span_deform"), e.N = e.svg.group().attr("id", "sti_N"), e.V = e.svg.group().attr("id", "sti_V"), e.M = e.svg.group().attr("id", "sti_M"), e.prototypes = e.svg.group().attr("id", "sti_prototypes").attr("display", "none"), e.auxiliary = e.svg.group().attr("id", "sti_auxiliary"), e.auxSection = e.svg.group().attr("id", "sti_auxSection"), e.auxPlaceLoad = e.svg.group().attr("id", "sti_auxPlaceLoad"), e.auxiliary.add(e.auxSection), e.auxiliary.add(e.auxPlaceLoad), e.textSpan = establishTextOfLineBeingDrawn(), drawBasicSupports(e), drawBasicForces(e), e.guiScaleDefault !== e.guiScale && guiResize(e.guiScale)
    }
}

function resizeScreen(e) {
    e.resX = window.innerWidth, e.resY = window.innerHeight, console.log("resizeScreen resolution: " + e.resX + "(" + $(window).width() + ") " + e.resY + "(" + $(window).height() + ")scroll: " + $(window).scrollLeft() + " " + +$(window).scrollTop()), moveGridLabels(), fixToolBarPositionNew(), fixCenterCredit(), fixPositionsOfOpenForms(), fixHelpDialog(), -1 === scrollOldX && (scrollOldX = $(window).scrollLeft(), scrollOldY = $(window).scrollTop())
}

function deselectObjects() {
    $(".snap_rect").each(function() {
        this.instance.remove()
    }), $(".span_selected").each(function() {
        this.setAttribute("class", "span")
    }), disableToolBar("#tool_delete")
}

function deleteKeyPressed(e) {
    var t = getFocusedLoad(),
        a = getSelecedtObjects(),
        o = a.length;
    t && !o ? (unfocusLoad(t[0].instance), removeLoads(t), hideModifyLoadDialog()) : o && ($(a).each(function() {
        cleanResults();
        var t = this.instance.attr("id");
        $("#sti_hinges").find("circle[parentId=" + t + "]").remove(), $("#sti_loads > g[parentId=" + t + "]").remove(), $(e.svg.node).find("text[parentId=" + t + "]").remove();
        var a = $("#sti_span_nodes > rect[parentId=" + t + "]"),
            o = [];
        a.each(function() {
            var e = $(this).attr("id"),
                t = $(this).attr("_x"),
                a = $(this).attr("_y");
            o.push([t, a]), $("#sti_span_nodes_dummy rect[parentId=" + e + "]").remove()
        }), a.remove();
        for (var n = 0; n < o.length; n++) {
            var r = o[n][0],
                i = o[n][1],
                s = $("#sti_span_nodes > rect[_x='" + r + "'][_y='" + i + "']");
            if (0 === s.length) {
                var l = $("#sti_supports > use[_x='" + r + "'][_y='" + i + "']");
                l.remove();
                var c = $("#sti_loads > g[_x='" + r + "'][_y='" + i + "']");
                c.remove()
            }
        }
        $("#sti_span_bottom").find("line[parentId=" + t + "]").remove(), $("#sti_span_dummy").find("line[parentId=" + t + "]").remove(), $(this).remove()
    }), deselectObjects(), unhighlightSpans(), document.body.style.cursor = "default"), resetToolBarEscape()
}

function resetToolBarEscape() {
    disableAllToolBars()
}

function escKeyPressed(e) {
    var t = !1;
    if (noticeIsOpen()) hideNotice(), t = !0;
    else {
        var a = $("#sti_auxiliary .snap_rect_dragged.snap_rect_focused"),
            o = $("rect.aux");
        a.length ? (mouseDragSnapUndo(a[0].instance), t = !0) : o.length ? ($("rect.aux").remove(), setIgnoreClick(e), t = !0) : menuToolsShown() ? (hideMenuTools(), t = !0) : "block" === $("#form_help").css("display") ? (hideHelpDialog(), t = !0) : e.lineBeingDrawn ? (hideEnterCoordDialog(), t = !0) : "block" === $("#form_save").css("display") ? (form_save_cancel(), t = !0) : "block" === $("#form_open").css("display") ? (form_open_cancel(), t = !0) : "block" === $("#form_new").css("display") ? (form_new_cancel(), t = !0) : e.flagSelectingSup ? (form_supports_Interrupt(), t = !0) : e.flagViewDialogActive ? (hideViewDialog(), t = !0) : e.flagRemovingLoads ? (form_load_remove(), t = !0) : e.flagApplyingUniformLoad ? (form_load_uniform_Interrupt(), t = !0) : e.flagApplyingSingleLoad ? (t = !0, form_load_Interrupt()) : e.flagSetsDialogActive ? (hideSettingsDialog(), t = !0) : e.flagApplyingHinges ? (form_hinges_Interrupt(), t = !0) : "block" === $("#form_material").css("display") ? (getSelecedtObjects().length ? deselectObjects(e) : hideSectionsDialog(), t = !0) : "block" === $("#form_load_modify").css("display") ? (hideModifyLoadDialog(), t = !0) : e.flagSelectingTool ? (e.flagSelectingTool = !1, o.length && ($("rect.aux").remove(), setIgnoreClick(e)), printNoticeSelectingAborted(null, "success"), t = !0) : getSelecedtObjects().length ? (deselectObjects(e), t = !0) : mouseFormKillActiveForm() && (t = !0), document.body.style.cursor = "default", resetToolBarEscape()
    }
    return t
}

function getOpenFormsAll(e) {
    for (var t = getOpenForms(e), a = ["form_coord", "form_help"], o = 0; o < a.length; o++) "block" === $("#" + a[o]).css("display") && t.push(a[o]);
    return t
}

function getOpenForms(e) {
    for (var t = [], a = $(":root > body > div.form_main_envelope"), o = 0; o < a.length; o++) {
        var n = $(a[o]).attr("id"),
            r = $(a[o]).css("display");
        "block" === r && "form_coord" !== n && "form_help" !== n && n !== e && t.push(n)
    }
    return t
}

function toolBarMoveHelper(e) {
    if (!gTimerTouchActive) {
        var t = toolbarIsHidden();
        if (t)
            if (e.clientY <= canvas.toolbarHeight) {
                var a = $("#tool_hide_tb");
                if ("auto" !== a.css("right")) {
                    var o = $("#tool_hide_tb").width();
                    $("#tool_hide_tb").attr("class", "");
                    var n = canvas.clientX + o,
                        r = $("body").innerWidth();
                    n + o >= r || a.css("left", n + "px").css("right", "auto")
                }
            } else $("#tool_hide_tb").css("left", "auto").css("right", "0").attr("class", "last")
    }
}

function mouseMove(e, t) {
    var a = e.timeStamp;
    if (500 > a - g_mouseMoveLastTime && gTimerTouchActive && (clearTimeout(gTimerTouchActive), gTimerTouchActive = null), g_mouseMoveLastTime = a, !(menuToolsShown() || draggingIsActive() || t.clientY === e.clientY && t.clientX === e.clientX))
        if (t.clientY = e.clientY, t.clientX = e.clientX, toolBarMoveHelper(e), t.flagRemovingLoads);
        else if (t.flagApplyingSingleLoad || t.flagApplyingUniformLoad) gTimerTouchActive || gTimerIgnorePlaceLoad.timer || placeLoadMouseMove(e);
    else if (t.flagSelectingSup || t.flagApplyingHinges);
    else {
        var o = $("#sti_auxiliary rect.snap_rect_dragged.snap_rect_focused"),
            n = $("#sti_auxiliary rect.aux");
        if (getFocusedLoad() || unHighlightNodes(), o.length) mouseDragSnap1(o[0].instance, e.pageX, e.pageY - t.offsetY);
        else if (n.length) mouseDragAuxRect(n[0], e.pageX, e.pageY - t.offsetY), void 0 == n.attr("_hasMoved") && (n.attr("_hasMoved", ""), document.body.style.cursor = "default");
        else if (t.flagSelectingTool || getFocusedLoad()) document.body.style.cursor = "default";
        else {
            var r = new coordinates(e.pageX, e.pageY - t.offsetY),
                i = getNearestGridPoint(r, t);
            i && i.x >= 0 && i.y >= 0 ? (t.lineBeingDrawn && (t.lineBeingDrawn.attr("x2", _round(i.x / getZoom(t))), t.lineBeingDrawn.attr("y2", _round(i.y / getZoom(t))), updateTextLineDrawn(t)), isObjectFocused(t) || isSnapFocused(t) || (document.body.style.cursor = "crosshair")) : isObjectFocused(t) || isSnapFocused(t) || t.lineBeingDrawn || (document.body.style.cursor = "default")
        }
    }
}

function isSnapFocused(e) {
    var t = snapFocused(e),
        a = t.length ? !0 : !1;
    return a
}

function isObjectFocused(e) {
    var t = objectFocused(e),
        a = t.length ? !0 : !1;
    return a
}

function objectFocused() {
    var e = $(".span_focused");
    return e
}

function snapFocused() {
    var e = $(".snap_rect_focused");
    return e
}

function getSelecedtObjects() {
    var e = $(".span_selected");
    return e
}

function selectObject(e, t) {
    $(t).each(function() {
        $(this).attr("class", "span span_selected"), enableToolBar("#tool_delete")
    }), resetToolBarEscape(), createSnaps(e, t)
}

function mouseUpRectAux(e, t) {
    var a = $("#sti_auxiliary rect.aux");
    if (a.length) {
        if (selectObjectsByRect(canvas, a), setTimeout(function() {
                var e = $("#sti_auxiliary rect.aux");
                e.length && e[0].instance.remove()
            }, 50), canvas.flagSelectingTool) {
            var o = new noticeParameters(null, "success", "Selecting objects by rectangle finished&nbsp;&nbsp;");
            o.x = e, o.y = t, showNotice2(o)
        }
        canvas.flagSelectingTool = !1, _enableToolBar("#tool_select"), resetToolBarEscape()
    }
}

function mouseUp(e, t) {
    if (isLeftButton(e)) {
        var a = $(".snap_rect_dragged.snap_rect_focused");
        if (a.length) mouseReleaseSnap1(a[0].instance), $(a[0]).data("hover") || mouseOutSnap1(a[0].instance);
        else {
            var o = e.clientX,
                n = e.clientY - t.offsetY;
            mouseUpRectAux(o, n)
        }
    }
}

function mouseDown(e, t) {
    if (isLeftButton(e))
        if (t.flagSelectingSup || t.flagApplyingHinges || t.flagApplyingSingleLoad || t.flagApplyingUniformLoad || t.flagRemovingLoads || touchCursorIsOverForm(e) || getFocusedLoad());
        else {
            var a = objectFocused(t);
            if (a && a.length);
            else {
                {
                    var o = new coordinates(e.clientX + window.pageXOffset, e.clientY + window.pageYOffset - t.offsetY);
                    getNearestGridPoint(o, t)
                }
                t.lineBeingDrawn || isSnapFocused(t) || "ontouchstart" in document.documentElement || isObsoloteBrowser() || t.flagDemoIsRunning || establishTemporaryRectForIntersect(e)
            }
        }
}

function spanIntersectsOtherSpan(e, t) {
    var a = parseInt(t.attr("x1")),
        o = parseInt(t.attr("x2")),
        n = parseInt(t.attr("y1")),
        r = parseInt(t.attr("y2")),
        i = a,
        s = o,
        l = n,
        c = r;
    if (a > o) {
        var d = o;
        o = a, a = d
    }
    if (n > r) {
        var d = r;
        r = n, n = d
    }
    var u = [],
        f = a === o ? .1 : 0,
        m = n === r ? .1 : 0,
        g = e.svg.rect(o - a + f, r - n + m).move(a - f / 2, n - m / 2).attr("class", "aux"),
        _ = findObjectsByRect(e, g);
    if (_)
        for (var h = 0; h < _.length; h++) {
            var v = _[h].instance,
                p = parseInt(v.attr("x1")),
                y = parseInt(v.attr("x2")),
                b = parseInt(v.attr("y1")),
                $ = parseInt(v.attr("y2")),
                S = checkIntersectionLineLine(v, t);
            if (S) {
                var w = 1,
                    x = parseInt(S.points[0].x),
                    T = parseInt(S.points[0].y),
                    M = S.status;
                if ("Coincident" === M) {
                    var A, D, L, F;
                    a !== o ? (o > a ? (A = a, D = o) : (A = o, D = a), y > p ? (L = p, F = y) : (L = y, F = p)) : (r > n ? (A = n, D = r) : (A = r, D = n), $ > b ? (L = b, F = $) : (L = $, F = b)), w = F > A ? L >= D ? 0 : 2 : A >= F ? 0 : 2
                } else(x === p && T === b || x === y && T === $) && (x === i && T === l || x === s && T === c) && (w = 0);
                w > 0 && u.push(1 === w ? "Beams intersect not in a node&nbsp;&nbsp;" : "Beams overlap&nbsp;&nbsp;")
            }
        }
    return g.remove(), u
}

function mouseOverAlert() {
    canvas.flagAlertActive = !0
}

function mouseOutAlert() {
    canvas.flagAlertActive = !1
}

function pointerOverResultsLegend() {
    var e = $("#sti_span_deform .pointOnDiagramHighlighted");
    return 0 === e.length && (e = $("#sti_M circle.pointOnDiagramHighlighted")), 0 === e.length && (e = $("#sti_V circle.pointOnDiagramHighlighted")), 0 === e.length && (e = $("#sti_N circle.pointOnDiagramHighlighted")), 0 !== e.length
}

function getDateTime() {
    var e = (new Date).getTime();
    return e
}

function processLeftClick(e, t) {
    var a = objectFocused(t);
    (t.clientY !== e.clientY || t.clientX !== e.clientX) && (t.clientY = e.clientY, t.clientX = e.clientX);
    var o = $("#sti_auxiliary rect.aux"),
        n = o.length && void 0 != o.attr("_hasMoved");
    if (o.remove(), n);
    else if (pointerOverResultsLegend() || getFocusedLoad());
    else if (t.flagApplyingSingleLoad || t.flagApplyingUniformLoad) {
        var r = $("#sti_span > line.span_focused"),
            i = $("#cursor_place_load"),
            s = $("#sti_span_nodes > rect.node_focused");
        if (r && r.length && i.length) {
            var l = i[0].instance.attr("cx"),
                c = i[0].instance.attr("cy");
            t.flagApplyingUniformLoad ? placeLoadUniformAtPoint(l, c, r.attr("id")) : _placeLoadSingleAtPoint(l, c, r.attr("id"))
        } else if (t.flagApplyingUniformLoad)
            if (s.length) {
                var l = s[0].instance.attr("_x"),
                    c = s[0].instance.attr("_y");
                placeLoadUniformAtPoint(l, c, s.attr("id"))
            } else placeLoadUniformAtPoint(l, c, null)
    } else if (t.flagRemovingLoads) removeLoadsFromSelectedObject(e);
    else if (t.flagSelectingSup);
    else if (t.flagApplyingHinges) processHinges(a);
    else if (a.length) "none" === $(t.textSpan.node).css("display") && t.textSpan.text().length && ($(t.textSpan.node).css("display", ""), t.textSpan.move($(t.textSpan.node).attr("_x"), $(t.textSpan.node).attr("_y")), textBoundingRect($(t.auxSection.node), 0, !0)), selectObject(t, a);
    else if (!getFocusedLoad() && !t.flagSelectingTool)
        if (!t.lineBeingDrawn || "body" != e.target.localName && "html" != e.target.localName) {
            var d = new coordinates(e.clientX + window.pageXOffset, e.clientY + window.pageYOffset - t.offsetY),
                u = getNearestGridPoint(d, t);
            u && u.x >= 0 && u.y >= 0 && (t.lineBeingDrawn && continueDraingLine(e), t.lineBeingDrawn = establishLineFrom(t, u), $("#sti_loads").insertBefore($("#sti_span")), displayForm("form_coord"), updateTextLineDrawn(t), resetToolBarEscape())
        } else alertCoordTrySettings(e)
}

function drawReactionsDashed(e) {
    var t = e ? ".load_force_react { stroke-dasharray: 8,4; }" : "";
    canvas.mainStyleSheet.styleSheet ? canvas.mainStyleSheet.styleSheet.cssText = t : canvas.mainStyleSheet.sheet && (e ? canvas.flagRuleReactionsDashedActive || (canvas.mainStyleSheet.sheet.addRule ? (canvas.mainStyleSheet.sheet.addRule(".load_force_react", "stroke-dasharray: 8,4", 0), canvas.flagRuleReactionsDashedActive = !0) : canvas.mainStyleSheet.sheet.insertRule && (canvas.mainStyleSheet.sheet.insertRule(".load_force_react {stroke-dasharray: 8,4}", 0), canvas.flagRuleReactionsDashedActive = !0)) : canvas.mainStyleSheet.sheet.cssRules.length > 0 && (canvas.mainStyleSheet.sheet.deleteRule(0), canvas.flagRuleReactionsDashedActive = !1))
}

function switchLayersToView() {
    var e = canvas.showLoads;
    drawReactionsDashed(e), $("#sti_supports").css("display", canvas.showSupports ? "" : "none"), $("#sti_loads").css("display", canvas.showLoads ? "" : "none"), $("#sti_span_nodes").css("display", canvas.showNodes ? "" : "none"), $("#sti_reactions").css("display", canvas.showReactions ? "" : "none"), $("#sti_grid").css("display", canvas.showGrid ? "" : "none"), $("#sti_grid_text").css("display", canvas.showGrid ? "" : "none"), $("#sti_span_deform").css("display", canvas.showDisplacements ? "block" : "none"), $("#sti_M").css("display", canvas.showMomentDiagram ? "block" : "none"), $("#sti_V").css("display", canvas.showShearDiagram ? "block" : "none"), $("#sti_N").css("display", canvas.showNormalDiagram ? "block" : "none")
}

function initFormViewByFlags() {
    $(canvas.showSupports ? "#form_view_on_supports" : "#form_view_off_supports").prop("checked", !0), $(canvas.showLoads ? "#form_view_on_loads" : "#form_view_off_loads").prop("checked", !0), $(canvas.showNodes ? "#form_view_on_nodes" : "#form_view_off_nodes").prop("checked", !0), $(canvas.showReactions ? "#form_view_on_reactions" : "#form_view_off_reactions").prop("checked", !0), $(canvas.showGrid ? "#form_view_on_grid" : "#form_view_off_grid").prop("checked", !0), $(canvas.showMomentDiagram ? "#form_view_on_M" : "#form_view_off_M").prop("checked", !0), $(canvas.showMomentDiagramRevers ? "#form_view_on_M_reverse" : "#form_view_off_M_reverse").prop("checked", !0), $("#form_view_scale_M").val(canvas.showMomentDiagramZoom), $(canvas.showShearDiagram ? "#form_view_on_V" : "#form_view_off_V").prop("checked", !0), $("#form_view_scale_V").val(canvas.showShearDiagramZoom), $(canvas.showNormalDiagram ? "#form_view_on_N" : "#form_view_off_N").prop("checked", !0), $("#form_view_scale_N").val(canvas.showNormalDiagramZoom), $(canvas.showDisplacements ? "#form_view_on_d" : "#form_view_off_d").prop("checked", !0)
}

function initFormView() {
    $("#form_view_on_all").prop("checked", !1), $("#form_view_off_all").prop("checked", !1), initFormViewByFlags(), switchLayersToView()
}

function init() {
    if (canvas = new cCanvas, cookieLoadSettings(), null === canvas.workSizeX) {
        var e = $(window).width(),
            t = $(window).height();
        canvas.workSizeX = _round(e / arrZooms2[0] / canvas.unit), canvas.workSizeY = _round(t / arrZooms2[0] / canvas.unit)
    }
    establishSVG(canvas), drawGrid(canvas), resizeScreen(canvas), canvas.flagImperialUnits && _zoom(), initComputeShiftToFixTextAccordingToScale();
    for (var a = ["#form_material", "#form_supports", "#form_hinge", "#form_load", "#form_open", "#form_save", "#form_new", "#form_settings", "#form_view", "#form_coord", "#form_load_modify", "#form_help"], o = 0; o < a.length; o++) {
        var n = "div.sti_form > div:first" + (o < a.length - 1 ? ", div.sti_form > div.form_body" : "");
        $(a[o]).draggable({
            handle: n,
            start: dialogDragStarted,
            stop: function(e) {
                g_flagDraggingIsActive = !1, restoreHiddenForm(e, $(this)), g_timerDragFinished = setTimeout(function() {
                    g_timerDragFinished = null
                }, 0)
            }
        })
    }
    initFormView(), $("#radio_support_pinned").prop("checked", !0)
}

function hideOpenDialogs() {
    for (var e = $(":root > body > div.form_main_envelope"), t = 0; t < e.length; t++) "none" !== $(e[t]).css("display") && $(e[t]).css("display", "none").attr("hiddenDuringScroll", "");
    $("#alertArea").css("display", "none")
}

function restoreOpenDialogs() {
    $(":root > body > div.form_main_envelope[hiddenDuringScroll]").css("display", "block").removeAttr("hiddenDuringScroll");
    $("#alertArea").css("display", ""), canvas.flag_iOS && fixPositionsOfOpenForms()
}

function _moveGridLabels() {
    if (canvas.gridTextGroupY) {
        var e = $(window).scrollLeft(),
            t = $(window).scrollTop();
        canvas.gridTextGroupY.translate(e * getImperialZoomFix_1(), 0).removeClass("hide"), canvas.gridTextGroupX.translate(0, t * getImperialZoomFix_1()).removeClass("hide"), canvas.flag_iOS || ($("#sti_toolbar_bg").removeClass("hide"), $("#sti_toolbar").removeClass("hide"), $("#tool_hide_tb").removeClass("hide")), timeOutIdScrollFinished = null, restoreOpenDialogs()
    }
}

function moveGridLabels() {
    setTimeout(_moveGridLabels, 50)
}

function hideDuringScroll(e, t) {
    var a = !0;
    if (canvas.flag_iOS)
        for (var o = getOpenFormsAll(), n = 0; n < o.length; n++) $("#" + o[n] + " input:focus").length && (a = !1);
    a && hideOpenDialogs(), canvas.flag_iOS || ($("#sti_toolbar_bg").addClass("hide"), $("#tool_hide_tb").addClass("hide"), $("#sti_toolbar").addClass("hide")), scrollOldY !== t && canvas.gridTextGroupX.addClass("hide"), scrollOldX !== e && canvas.gridTextGroupY.addClass("hide")
}

function scrollWindow(e) {
    g_flagDraggingIsActive ? (e.preventDefault(), $(window).scrollLeft(scrollOldX), $(window).scrollTop(scrollOldY)) : (setTimeout(function() {
        var e = $(window).scrollLeft(),
            t = $(window).scrollTop(),
            a = scrollOldY !== t || scrollOldX !== e;
        "absolute" === $("#sti_toolbar > ul.button-bar").css("position") && ($("#sti_toolbar_bg")[0].style.top = $("#sti_toolbar > ul.button-bar")[0].style.top = t + "px", $("#sti_toolbar_bg")[0].style.left = $("#sti_toolbar > ul.button-bar")[0].style.left = e + "px"), (a || g_touchMoveRestoreTimerId) && (timeOutIdScrollFinished && (clearTimeout(timeOutIdScrollFinished), hideDuringScroll(e, t)), canvas.flag_iOS && "absolute" === getTbPositioning() || formScroll(scrollOldX, scrollOldY, e, t), scrollOldY = t, scrollOldX = e, g_touchMoveRestoreTimerId && clearTimeout(g_touchMoveRestoreTimerId), timeOutIdScrollFinished = setTimeout(moveGridLabels, canvas.flag_iOS ? 500 : 250))
    }, 0), fixPositionsOfOpenForms())
}

function dialogDragStarted(e) {
    g_flagDraggingIsActive = !0, canvas.flag_iOS && $(e.target).find("input:focus").blur()
}

function toolSelectObjects(e) {
    var t = null,
        a = "success",
        o = canvas.clientX,
        n = canvas.clientY;
    isObsoloteBrowser() ? (t = "Function unsupported in your browser&nbsp;&nbsp;", a = "error") : (canvas.flagSelectingTool = !0, resetToolBarEscape(), canvas.lineBeingDrawn && (removeLineBeingDrawn(canvas), removeTextBeingDrawn(canvas)), t = "Select objects by a rectangle&nbsp;&nbsp;", disableToolBar("#tool_select"), enableToolBar("#tool_escape"));
    var r = new noticeParameters(null, a, t);
    r.x = o, r.y = n, showNotice2(r), e.stopPropagation()
}

function printNoticeSelectingAborted(e, t) {
    var a = "Selecting objects by a rectangle aborted&nbsp;&nbsp;",
        o = e ? e.clientX : void 0,
        n = e ? e.clientY - canvas.offsetY : void 0;
    void 0 == o && (o = canvas.clientX, n = canvas.clientY);
    var r = new noticeParameters(null, t, a);
    r.x = o, r.y = n, showNotice2(r)
}

function interruptSelectingByRectangle(e, t) {
    canvas.flagSelectingTool && (isNoticeEvent(e) || (canvas.flagSelectingTool = !1, printNoticeSelectingAborted(e, t), _enableToolBar("#tool_select")))
}

function restartTimer(e, t) {
    return e.timer && (clearTimeout(e.timer), e.timer = null), e.timer = setTimeout(function() {
        e.timer = null
    }, t), e.timer
}

function touchStart(e) {
    if (g_TouchTimerDelay = 700, canvas.flagSelectingTool) {
        var t = e.originalEvent.touches[0].clientX + window.pageXOffset,
            a = e.originalEvent.touches[0].clientY + window.pageYOffset - canvas.offsetY;
        _establishTemporaryRectForIntersect(t, a), e.preventDefault()
    }
}

function touchEnd(e) {
    if (g_TouchTimerDelay = 700, canvas.flagSelectingTool) {
        var t = $("#sti_auxiliary rect.aux"),
            a = t.attr("_x"),
            o = t.attr("_y");
        mouseUpRectAux(a, o), e.preventDefault()
    }
    canvas.flagSelectingTool = !1, canvas.flagToolbarActive && (canvas.flagToolbarActive = !1), gTimerTouchActive && clearTimeout(gTimerTouchActive), gTimerTouchActive = setTimeout(function() {
        gTimerTouchActive = null
    }, g_TouchTimerDelay)
}

function touchCancel(e) {
    canvas.flagSelectingTool && (escKeyPressed(canvas), unsetIgnoreClick(canvas), e.preventDefault()), canvas.flagSelectingTool = !1
}

function touchMove(e) {
    if (g_flagDraggingIsActive) e.preventDefault(), $(window).scrollLeft(scrollOldX), $(window).scrollTop(scrollOldY);
    else {
        if ($("#sti_auxiliary rect.snap_rect_dragged.snap_rect_focused").length) e.preventDefault();
        else if (e.target.instance === canvas.svg && null === timeOutIdScrollFinished) {
            var t = $(window).scrollLeft(),
                a = $(window).scrollTop();
            hideDuringScroll(t, a), formScroll(scrollOldX, scrollOldY, t, a), scrollOldY = a, scrollOldX = t, g_touchMoveRestoreTimerId && clearTimeout(g_touchMoveRestoreTimerId), g_touchMoveRestoreTimerId = setTimeout(moveGridLabels, canvas.flag_iOS ? 500 : 250)
        }
        if (canvas.flagSelectingTool) {
            var o = $("#sti_auxiliary rect.aux");
            if (o.length) {
                var n = e.originalEvent.touches[0].clientX + window.pageXOffset,
                    r = e.originalEvent.touches[0].clientY + window.pageYOffset - canvas.offsetY;
                mouseDragAuxRect(o[0], n, r)
            }
            e.preventDefault()
        }
    }
}

function showHingesDialog() {
    displayForm("form_hinge"), $("#hinge_apply_btn").html("Run it").addClass("orange"), disableAllToolBars()
}

function removeHinges(e) {
    var t = parseInt(e.attr("id"));
    $("#sti_hinges").find("circle[parentId=" + t + "]").remove()
}

function createHingesObjects(e, t, a) {
    var o = a.attr("x1"),
        n = a.attr("x2"),
        r = a.attr("y1"),
        i = a.attr("y2");
    cleanResults();
    var s = canvas.hinges;
    removeHinges(a);
    var l = _round(nodeSize() / 2 * 3 * getScaleZ()),
        c = a.attr("id");
    if (e) {
        var d = convertToAngle(o, n, r, i),
            u = Math.sin(d) * l,
            f = -Math.cos(d) * l,
            m = canvas.svg.circle(l).move(o - l / 2 + u, r - l / 2 + f).attr("parentId", c).attr("class", "hinge").attr("_x", o).attr("_y", r).attr("_angle", d);
        s.add(m)
    }
    if (t) {
        var d = convertToAngle(n, o, i, r),
            u = Math.sin(d) * l,
            f = -Math.cos(d) * l,
            m = canvas.svg.circle(l).move(n - l / 2 + u, i - l / 2 + f).attr("parentId", c).attr("class", "hinge").attr("_x", n).attr("_y", i).attr("_angle", d);
        s.add(m)
    }
}

function isSupportAt(e, t) {
    var a = 0 != $("#sti_supports").find("use[_x=" + e + "][_y=" + t + "]").length;
    return a
}

function isNodeAt(e, t) {
    for (var a = !1, o = 0, n = $("#sti_span").find("line"), r = 0; r < n.length; r++) {
        var i = n[r].instance.attr("x1"),
            s = n[r].instance.attr("y1"),
            l = n[r].instance.attr("x2"),
            c = n[r].instance.attr("y2");
        if ((i === e && s === t || l === e && c === t) && (o++, o >= 2)) {
            a = !0;
            break
        }
    }
    return a
}

function isHinge1AtNode(e) {
    var t = e[0].instance,
        a = t.attr("x1"),
        o = t.attr("y1"),
        n = isNodeAt(a, o);
    return n
}

function isHinge2AtNode(e) {
    var t = e[0].instance,
        a = t.attr("x2"),
        o = t.attr("y2"),
        n = isNodeAt(a, o);
    return n
}

function getHingesFromString(e) {
    e = e ? e.toString() : "";
    var t = e.split(" "),
        a = !1,
        o = !1,
        n = t.length;
    if (n)
        for (var r = 0; n > r; r++) "1" === t[r] && (a = !0), "2" === t[r] && (o = !0);
    return [a, o]
}

function processHinges(e) {
    if (e.length) {
        var t = e[0].instance.hasClass("span_selected");
        if (t) {
            for (var a = $("#sti_span line.span_selected"), o = !1, n = 0; n < a.length; n++) {
                var r = $(a[n]).attr("hinge");
                if (void 0 !== r && r.length) {
                    o = !0;
                    break
                }
            }
            var i = o ? null : "1 2",
                s = d = o ? !1 : !0;
            for (n = 0; n < a.length; n++) $(a[n]).attr("hinge", i), createHingesObjects(s, d, $(a[n]))
        } else {
            {
                var l = e.attr("hinge"),
                    c = getHingesFromString(l),
                    s = c[0],
                    d = c[1];
                isHinge1AtNode(e), isHinge2AtNode(e)
            }
            s || d ? s && d ? s = !1 : d = s ? !0 : !1 : s = !0, l = s ? "1" : "", d && (l += " 2"), e.attr("hinge", l), createHingesObjects(s, d, e)
        }
    }
}

function hideHingesDialog() {
    canvas.flagApplyingHinges = !1, enableAllToolBars(), viewSettingsHinges.restoreCanvasSettings(canvas)
}

function form_hinges_apply() {
    return canvas.flagApplyingHinges ? ($("#hinge_apply_btn").html("Run it").addClass("orange"), canvas.flagApplyingHinges = !1, viewSettingsHinges.restoreCanvasSettings(canvas)) : ($("#hinge_apply_btn").html("Pickup beams now").removeClass("orange"), document.body.style.cursor = "default", viewSettingsHinges.set(canvas), canvas.flagApplyingHinges = !0, disableToolBar("#tool_select"), viewSettingsHinges.hide(canvas)), !1
}

function form_hinges_Interrupt() {
    canvas.flagApplyingHinges && form_hinges_apply()
}

function _log10(e) {
    return e ? Math.floor(Math.log(e) / Math.log(10)) : 0
}

function _roundU(e) {
    var t = Math.pow(10, 11 - _log10(e)),
        a = Math.round(e * t) / t;
    return a
}

function prepareSectionsDialog(e, t) {
    var a = $("#form_material_id_ch"),
        o = $("#sectionsData div");
    a.find("option").remove(), $('<option value="0">-- Choose --</option>').appendTo(a);
    var n = 1;
    $(o).each(function() {
        var e = t === $(this).attr("name") ? " selected" : "";
        $('<option value="' + n + '"' + e + ">" + $(this).attr("name") + "</option>").appendTo(a), n += 1
    })
}

function showSectionsDialog(e) {
    prepareSectionsDialog(e), displayForm("form_material"), disableAllToolBars()
}

function sectionEntrySelected(e, t) {
    {
        var a = $("#sectionsData div")[t - 1],
            o = $(a).attr("area"),
            n = $(a).attr("areaShear"),
            r = $(a).attr("inertia"),
            i = $(a).attr("elasticity");
        $(a).attr("name")
    }
    canvas.flagImperialUnits ? (o = _roundU(o / 64516e-8), n = $.isNumeric(n) ? _roundU(o / 64516e-8) : null, r = _roundU(r / Math.pow(.0254, 4)), i = _roundU(i / 6894.75729)) : flagBaseUnits || (o = _roundU(1e4 * o), n = $.isNumeric(n) ? _roundU(1e4 * n) : null, r = _roundU(1e8 * r), i = _roundU(1e-9 * i)), $("#form_material_area").val(o), $("#form_material_sh_area").val($.isNumeric(n) ? n : ""), $("#form_material_inertia").val(r), $("#form_material_elastic").val(i), $("#form_material_id").val($(a).attr("name")), t > 0 ? enableApplyButton() : disableApplyButton()
}

function enableApplyButton() {
    var e = $("#form_material_btn2"),
        t = e.get(0);
    $(t).attr("class", "").removeAttr("disabled")
}

function disableApplyButton() {
    var e = $("#form_material_btn2"),
        t = e.get(0);
    $(t).attr("class", "disabled").attr("disabled", "disabled")
}

function sectionEntryModified() {
    disableApplyButton()
}

function saveSectionEntry(e, t, a, o, n, r) {
    var i = $("#sectionsData"),
        s = i.find("div[name='" + r + "']"),
        l = "Section updated&nbsp;&nbsp;",
        c = null;
    s && s.length ? (c = s.attr("id"), console.log(c), cleanResults()) : (s = $("<div name='" + r + "'>").appendTo(i), l = "Section created&nbsp;&nbsp;");
    var d = null == c || void 0 == c ? canvas.lastId++ : c;
    s.attr("area", t).attr("areaShear", $.isNumeric(a) ? a : "").attr("inertia", o).attr("id", d).attr("elasticity", n);
    var u = new noticeParameters(e, "success", l);
    return showNotice2(u), prepareSectionsDialog(canvas, r), enableApplyButton(), !0
}

function form_material_btn1(e) {
    for (var t = !1, a = [
            ["#form_material_area", 0],
            ["#form_material_sh_area", 1],
            ["#form_material_inertia", 0],
            ["#form_material_elastic", 0]
        ], o = 0; o < a.length; o++) {
        var n = $(a[o][0]),
            r = 1 == a[o][1];
        if (n) {
            var i = n.prev();
            i && (i = i.find("label"));
            !$.isNumeric(n.val()) && !r || n.val() < 0 ? (t = !0, $(n).addClass("error"), $(i).addClass("error")) : ($(n).removeClass("error"), $(i).removeClass("error"))
        }
    }
    var n = $("#form_material_id");
    if (n) {
        var i = n.prev();
        i && (i = i.find("label"));
        userIdForm.test(n.val()) ? ($(n).removeClass("error"), $(i).removeClass("error")) : (t = !0, $(n).addClass("error"), $(i).addClass("error"))
    }
    if (!t) {
        {
            var s = $("#form_material_area").val(),
                l = $("#form_material_sh_area").val(),
                c = $("#form_material_inertia").val(),
                d = $("#form_material_elastic").val();
            $("#form_material_id").val()
        }
        canvas.flagImperialUnits ? (s *= 64516e-8, $.isNumeric(l) && (l *= 64516e-8), c *= Math.pow(.0254, 4), d *= 6894.75729) : flagBaseUnits || (s *= 1e-4, $.isNumeric(l) && (l *= 1e-4), c *= 1e-8, d *= 1e9), saveSectionEntry(e, _roundU(s), $.isNumeric(l) ? _roundU(l) : null, _roundU(c), _roundU(d), $("#form_material_id").val()), canvas.flagSaveRequired = !0
    }
    return !1
}

function form_material_btn2(e) {
    var t = getSelecedtObjects(canvas),
        a = t.length;
    if (a) {
        cleanResults();
        var o = $("#form_material_id").val(),
            n = $("#sectionsData div[name='" + o + "']"),
            r = "Section '" + o + "' assigned to " + a + " selected object" + (a > 1 ? "(s)" : "") + "&nbsp;&nbsp;";
        $(t).each(function() {
            $(this).attr("section", n.attr("id"))
        });
        var i = new noticeParameters(e, "success", r);
        showNotice2(i), canvas.flagSaveRequired = !0
    } else {
        var r = "No objects selected&nbsp;&nbsp;",
            i = new noticeParameters(e, "error", r);
        showNotice2(i)
    }
    return !1
}

function dialogSectionsSI() {
    $("#idFormLabelA").html(flagBaseUnits ? "A [m<sup>2</sup>]" : "A [cm<sup>2</sup>]"), $("#idFormLabelAsh").html(flagBaseUnits ? "A<font size='1'>sh</font> [m<sup>2</sup>]" : "A<font size='1'>sh</font> [cm<sup>2</sup>]"), $("#idFormLabelI").html(flagBaseUnits ? "I [m<sup>4</sup>]" : "I [cm<sup>4</sup>]"), $("#idFormLabelE").text(flagBaseUnits ? "E [Pa]" : "E [GPa]"), $("#form_material_id_units").css("display", "");
    for (var e = ["#form_material_area", "#form_material_sh_area"], t = 0; t < e.length; t++) {
        var a = $(e[t]).val();
        if (void 0 !== a && $.isNumeric(a)) {
            var o = flagBaseUnits ? 1 : 1e4;
            a *= .0254 * o * .0254, a = flagBaseUnits ? _roundU(a).toExponential() : _roundU(a), $(e[t]).val(a)
        }
    }
    var n = $("#form_material_inertia").val();
    if (void 0 !== n && $.isNumeric(n)) {
        var o = flagBaseUnits ? 1 : 1e8;
        n *= o * Math.pow(.0254, 4), n = flagBaseUnits ? _roundU(n).toExponential() : _roundU(n), $("#form_material_inertia").val(n)
    }
    var r = $("#form_material_elastic").val();
    if (void 0 !== r && $.isNumeric(r)) {
        var o = flagBaseUnits ? 1 : 1e-9;
        r *= 6894.75729 * o, r = flagBaseUnits ? _roundU(r).toExponential() : _roundU(r), $("#form_material_elastic").val(r)
    }
}

function dialogSectionsImperial() {
    $("#idFormLabelA").html("A [in<sup>2</sup>]"), $("#idFormLabelAsh").html("A<font size='1'>sh</font> [in<sup>2</sup>]"), $("#idFormLabelI").html("I [in<sup>4</sup>]"), $("#idFormLabelE").text("E [psi]"), $("#form_material_id_units").css("display", "none");
    for (var e = ["#form_material_area", "#form_material_sh_area"], t = 0; t < e.length; t++) {
        var a = $(e[t]).val();
        if (void 0 !== a && $.isNumeric(a)) {
            var o = flagBaseUnits ? 1 : 1e-4;
            a *= o * (1e3 / 25.4) * (1e3 / 25.4), $(e[t]).val(_roundU(a))
        }
    }
    var n = $("#form_material_inertia").val();
    if (void 0 !== n && $.isNumeric(n)) {
        var o = flagBaseUnits ? 1 : 1e-8;
        n *= o * Math.pow(1e3 / 25.4, 4), $("#form_material_inertia").val(_roundU(n))
    }
    var r = $("#form_material_elastic").val();
    if (void 0 !== r && $.isNumeric(r)) {
        var o = flagBaseUnits ? 1 : 1e9;
        r *= o / 6894.75729, $("#form_material_elastic").val(_roundU(r))
    }
}

function sectionInputFocusOut(e) {
    canvas.flagIgnoreKbdShortcuts = !1, unFocusOptional(e, "form_material_sh_area", "idFormLabelAsh"), dialogInputFocusOut()
}

function sectionInputFocusIn(e) {
    canvas.flagIgnoreKbdShortcuts = !0, focusOptional(e, "form_material_sh_area", "idFormLabelAsh"), dialogInputFocusIn()
}

function form_unit_checkbox() {
    var e = $("#idCheckboxBaseUnits").prop("checked");
    if (e) {
        $("#idFormLabelAsh").html("A [m<sup>2</sup>]"), $("#idFormLabelA").html("A [m<sup>2</sup>]"), $("#idFormLabelI").html("I [m<sup>4</sup>]"), $("#idFormLabelE").html("E [Pa]"), flagBaseUnits = !0;
        var t = $("#form_material_area").val();
        if (t.length) {
            var a = _roundU(1e-4 * t).toExponential();
            $("#form_material_area").val(a)
        }
        var o = $("#form_material_sh_area").val();
        if (o.length) {
            var a = _roundU(1e-4 * o).toExponential();
            $("#form_material_sh_area").val(a)
        }
        var n = $("#form_material_elastic").val();
        if (n.length) {
            var r = _roundU(1e9 * n).toExponential();
            $("#form_material_elastic").val(r)
        }
        var i = $("#form_material_inertia").val();
        if (i.length) {
            var s = _roundU(1e-8 * i).toExponential();
            $("#form_material_inertia").val(s)
        }
    } else {
        $("#idFormLabelA").html("A [cm<sup>2</sup>]"), $("#idFormLabelAsh").html("A [cm<sup>2</sup>]"), $("#idFormLabelI").html("I [cm<sup>4</sup>]"), $("#idFormLabelE").html("E [GPa]"), flagBaseUnits = !1;
        var t = $("#form_material_area").val();
        if (t.length) {
            var a = _roundU(1e4 * t);
            $("#form_material_area").val(a)
        }
        var o = $("#form_material_sh_area").val();
        if (o.length) {
            var a = _roundU(1e4 * o);
            $("#form_material_sh_area").val(a)
        }
        var n = $("#form_material_elastic").val();
        if (n.length) {
            var r = _roundU(1e-9 * n);
            $("#form_material_elastic").val(r)
        }
        var i = $("#form_material_inertia").val();
        if (i.length) {
            var s = _roundU(1e8 * i);
            $("#form_material_inertia").val(s)
        }
    }
}

function clearSectionsDialog() {
    $("#form_material_area").val(""), $("#form_material_sh_area").val(""), $("#form_material_inertia").val(""), $("#form_material_elastic").val(""), $("#form_material_id").val("")
}

function hideSectionsDialog() {
    $("#form_material").css("display", "none"), hideNotice(), enableAllToolBars()
}

function touchscreenUnhighlightNodes() {
    if (canvas.flagMobile) {
        var e = $("#sti_span_nodes rect.node_focused");
        $(e).each(function() {
            this.instance.removeClass("node_focused")
        })
    }
}

function nodeMouseOver_support() {
    if (canvas.flagSelectingSup) {
        var e = getNodeFromDummyNode(this);
        e.instance.addClass("node_focused"), cursorOld = $("body").css("cursor"), document.body.style.cursor = "pointer"
    }
}

function nodeMouseOut_support() {
    if (canvas.flagSelectingSup) {
        var e = getNodeFromDummyNode(this);
        e.instance.removeClass("node_focused"), document.body.style.cursor = cursorOld
    }
}

function removeSupportAt(e, t) {
    var a = $("#sti_supports").find("use[_x='" + e + "'][_y='" + t + "']"),
        o = a.length;
    return a.remove(), 0 !== o
}

function getSpansNearSupport(e, t) {
    var a = [];
    return $("#sti_span").find("line[class=span]").each(function() {
        var o = this.instance;
        (o.attr("x1") === e && o.attr("y1") === t || o.attr("x2") === e && o.attr("y2") === t) && a.push(o)
    }), a
}

function convertToAngle(e, t, a, o) {
    var n = 0,
        r = t - e,
        i = o - a;
    return 0 === r ? n = 0 > i ? 0 : Math.PI : (n = Math.PI / 2 + Math.atan(i / r), r > 0 || (n += Math.PI)), n
}

function getAngleForDrawingSupport(e, t, a) {
    for (var o = 0, n = 0, r = 0, i = getSpansNearSupport(e, t), s = .2, l = .1, c = 0, d = 0, u = 0; u < i.length; u++) {
        var f = i[u],
            m = f.attr("x1"),
            g = f.attr("y1");
        f.attr("x1") === e && f.attr("y1") === t && (m = f.attr("x2"), g = f.attr("y2")), o = convertToAngle(e, m, t, g), n += o, r++, (o < Math.PI / 4 || o > 7 * Math.PI / 4) && d--, o > Math.PI / 4 && o < 3 * Math.PI / 4 && l--, o > 3 * Math.PI / 4 && o < 5 * Math.PI / 4 && s--, o > 5 * Math.PI / 4 && o < 7 * Math.PI / 4 && c--;
        var _ = c > l ? c : l,
            h = d > s ? d : s;
        (h >= _ || "id_support_roller" === a) && "id_support_roller_vert" !== a ? (o = 0, d > s && (o = 180)) : (o = -90, c > l && (o = 90))
    }
    return "id_support_fixed" === a && (o = (n / r - Math.PI / 2) * (180 / Math.PI)), o
}

function removeHingeAt(e, t) {
    $("#sti_hinges").find("circle[_x=" + e + "][_y=" + t + "]").remove()
}

function nodeClick_support(e) {
    if (isLeftButton(e) && canvas.flagSelectingSup) {
        var t = getNodeFromDummyNode(this),
            a = t.instance.attr("_x"),
            o = t.instance.attr("_y");
        _nodeClick_support(a, o)
    }
}

function _nodeClick_support(e, t) {
    var a = getSupportTypeFromForm(),
        o = removeSupportAt(e, t),
        n = null;
    if ("radio_support_pinned" === a) {
        var r = getAngleForDrawingSupport(e, t, "id_support_pinned");
        n = canvas.svg.use($("#id_support_pinned")[0].instance)
    } else if ("radio_support_roller" === a) {
        var r = getAngleForDrawingSupport(e, t, "id_support_roller");
        n = canvas.svg.use($("#id_support_roller")[0].instance)
    } else if ("radio_support_roller_vert" === a) {
        var r = getAngleForDrawingSupport(e, t, "id_support_roller_vert");
        n = canvas.svg.use($("#id_support_roller")[0].instance), n.attr("rotated", "")
    } else if ("radio_support_fixed" === a) {
        var r = getAngleForDrawingSupport(e, t, "id_support_fixed");
        n = canvas.svg.use($("#id_support_fixed")[0].instance)
    }
    if (n) {
        var i = _round(getScaleZ());
        n.translate(e, t).attr("_x", e).attr("_y", t).scale(i), r && n.rotate(r, e, t), canvas.supports.add(n)
    }(o || n) && cleanResults()
}

function activateNodesCallBacks_supports() {
    var e = $("#sti_span_nodes rect");
    e.each(function() {
        $(this).on("mouseover", nodeMouseOver_support).on("mouseout", nodeMouseOut_support).on("click", nodeClick_support)
    })
}

function deActivateNodesCallBacks_supports() {
    var e = $("#sti_span_nodes rect");
    e.each(function() {
        $(this).off("click", nodeClick_support).off("mouseover", nodeMouseOver_support).off("mouseout", nodeMouseOut_support)
    })
}

function form_supports_apply() {
    return canvas.flagSelectingSup ? ($("#sti_span_nodes").insertAfter($("#sti_span_dummy")), supportEntryModified()) : (canvas.showSupports || (canvas.showSupports = !0, initFormViewByFlags(), switchLayersToView()), $("#support_apply_btn").html("Pickup nodes now").removeClass("orange"), document.body.style.cursor = "default", canvas.flagSelectingSup = !0, activateNodesCallBacks_supports(), disableToolBar("#tool_select"), viewSettingsSupports.set(canvas), viewSettingsSupports.hide(canvas), $("#sti_span_nodes").insertAfter($("#sti_supports"))), !1
}

function form_supports_Interrupt() {
    canvas.flagSelectingSup && form_supports_apply()
}

function supportEntryModified() {
    var e = canvas.flagSelectingSup;
    $("#support_apply_btn").html("Run it").addClass("orange"), canvas.flagSelectingSup = !1, deActivateNodesCallBacks_supports(), e && viewSettingsSupports.restoreCanvasSettings(canvas)
}

function showSupportsDialog() {
    $("#support_apply_btn").html("Run it").addClass("orange"), displayForm("form_supports"), disableAllToolBars()
}

function hideSupportsDialog() {
    $("#sti_span_nodes").insertAfter($("#sti_span_dummy")), viewSettingsSupports.restoreCanvasSettings(canvas), enableAllToolBars(), canvas.flagSelectingSup = !1, deActivateNodesCallBacks_supports(), touchscreenUnhighlightNodes()
}

function getSupportTypeFromForm() {
    for (var e = null, t = ["radio_support_pinned", "radio_support_roller", "radio_support_roller_vert", "radio_support_fixed", "radio_support_remove"], a = 0; a < t.length; a++)
        if ($("#" + t[a]).prop("checked")) {
            e = t[a];
            break
        }
    return e
}

function drawBasicSupports(e) {
    var t = e.svg.group().attr("id", "id_support_pinned"),
        a = e.svg.group().attr("id", "id_support_roller"),
        o = e.svg.group().attr("id", "id_support_fixed");
    e.prototypes.add(t), e.prototypes.add(a), e.prototypes.add(o);
    var n = e.svg.polyline("0,0 6,10 -6,10 0,0").attr("class", "support"),
        r = e.svg.polyline("0,0 6,10 -6,10 0,0").attr("class", "support"),
        i = e.svg.line(7.5, 14, -7.5, 14).attr("class", "support"),
        s = e.svg.line(0, -10, 0, 10).attr("class", "support"),
        l = e.svg.line(0, -6, -5, -11).attr("class", "support"),
        c = e.svg.line(0, 0, -10, -10).attr("class", "support"),
        d = e.svg.line(0, 6, -10, -4).attr("class", "support"),
        u = e.svg.line(-2, 10, -10, 2).attr("class", "support"),
        f = e.svg.line(-8, 10, -10, 8).attr("class", "support");
    t.add(n), a.add(r), a.add(i), o.add(s), o.add(l), o.add(c), o.add(d), o.add(u), o.add(f)
}

function m2ft(e) {
    var t = 1e3 * e / (25.4 * 12);
    return t
}

function ft2m(e) {
    var t = 25.4 * e * 12 / 1e3;
    return t
}

function kNewtons2kips(e) {
    var t = e / 4.4482216;
    return t
}

function kNewtonMs2kipsFt(e) {
    var t = kNewtons2kips(e) * m2ft(1);
    return t
}

function kips2kNewtons(e) {
    var t = 4.4482216 * e;
    return t
}

function kipsFt2kNewtonMs(e) {
    var t = kips2kNewtons(e) * ft2m(1);
    return t
}

function kipsPerFt2kNewtonPerM(e) {
    var t = kips2kNewtons(e) / ft2m(1);
    return t
}

function kNewtonsPerM2kipsPerFt(e) {
    var t = kNewtons2kips(e) / m2ft(1);
    return t
}

function clearLoadsDialog() {
    $("#form_load_uniform_angle").val(""), $("#form_load_uniform_f").val(""), $("#form_load_uniform_f2").val(""), $("#form_load_single").val(""), $("#form_load_single_angle").val(""), $("#form_load_single_m").val("")
}

function dialogLoadsSI() {
    $("#idFormLoadSingle").text("F [kN]"), $("#idFormLoadSingleM").text("M [kNm]");
    for (var e = ["#idFormLoadUniform", "#idFormLoadUniform2"], t = 0; t < e.length; t++) {
        var a = $(e[t]).html(),
            o = a.replace("[kip/ft]", "[kN/m]");
        $(e[t]).html(o)
    }
    $("#form_load_modify_pos > label:last-child").text("m"), $("#form_load_modify_start_pos > label:last-child").text("m"), $("#form_load_modify_end_pos > label:last-child").text("m"), $("#form_load_modify_F").text("kN"), $("#form_load_modify_M").text("kNm"), $("#form_load_modify_C").text("kN/m"), $("#form_load_modify_C2").text("kN/m");
    for (var n = [
            ["#form_load_modify_valF", kips2kNewtons],
            ["#form_load_single", kips2kNewtons],
            ["#form_load_modify_valM", kipsFt2kNewtonMs],
            ["#form_load_single_m", kipsFt2kNewtonMs],
            ["#form_load_uniform_f", kipsPerFt2kNewtonPerM],
            ["#form_load_uniform_f2", kipsPerFt2kNewtonPerM],
            ["#form_load_modify_valC", kipsPerFt2kNewtonPerM],
            ["#form_load_modify_valC2", kipsPerFt2kNewtonPerM]
        ], t = 0; t < n.length; t++) {
        var r = $(n[t][0]).val();
        void 0 !== r && $.isNumeric(r) && (r = n[t][1](r), $(n[t][0]).val(_round(r)))
    }
    for (var i = ["#form_load_modify_ps", "#form_load_modify_pos1", "#form_load_modify_pos2"], t = 0; t < i.length; t++) {
        var s = $(i[t]).val();
        void 0 !== s && $.isNumeric(s) && (s = ft2m(s), $(i[t]).val(_round(s)))
    }
}

function dialogLoadsImperial() {
    $("#idFormLoadSingle").text("F [kip]"), $("#idFormLoadSingleM").text("M [kip.ft]");
    for (var e = ["#idFormLoadUniform", "#idFormLoadUniform2"], t = 0; t < e.length; t++) {
        var a = $(e[t]).html(),
            o = a.replace("[kN/m]", "[kip/ft]");
        $(e[t]).html(o)
    }
    $("#form_load_modify_F").text("kip"), $("#form_load_modify_M").text("kip.ft"), $("#form_load_modify_C").text("kip/ft"), $("#form_load_modify_C2").text("kip/ft"), $("#form_load_modify_pos > label:last-child").text("ft"), $("#form_load_modify_start_pos > label:last-child").text("ft"), $("#form_load_modify_end_pos > label:last-child").text("ft");
    for (var n = [
            ["#form_load_modify_valF", kNewtons2kips],
            ["#form_load_single", kNewtons2kips],
            ["#form_load_modify_valM", kNewtonMs2kipsFt],
            ["#form_load_single_m", kNewtonMs2kipsFt],
            ["#form_load_uniform_f", kNewtonsPerM2kipsPerFt],
            ["#form_load_uniform_f2", kNewtonsPerM2kipsPerFt],
            ["#form_load_modify_valC", kNewtonsPerM2kipsPerFt],
            ["#form_load_modify_valC2", kNewtonsPerM2kipsPerFt]
        ], t = 0; t < n.length; t++) {
        var r = $(n[t][0]).val();
        void 0 !== r && $.isNumeric(r) && (r = n[t][1](r), $(n[t][0]).val(_round(r)))
    }
    for (var i = ["#form_load_modify_ps", "#form_load_modify_pos1", "#form_load_modify_pos2"], t = 0; t < i.length; t++) {
        var s = $(i[t]).val();
        void 0 !== s && $.isNumeric(s) && (s = m2ft(s), $(i[t]).val(_round(s)))
    }
}

function loadsInitializeTabToRemoveLoads() {
    var e = $("#sti_loads > g");
    e.length ? ($("#form_load_remove").html("Run it").addClass("orange").removeClass("disabled").attr("disabled", null), $("#form_load_remove_on_selected").attr("disabled", null).removeClass("disabled")) : ($("#form_load_remove_on_selected").attr("disabled", "disabled").addClass("disabled"), $("#form_load_remove").attr("disabled", "disabled").addClass("disabled").removeClass("orange"))
}

function loadsTabSwitched(e) {
    deActivateEventsRemoveLoad(), deActivateEventsPlaceUniformLoad(), deActivateEventsPlaceSingleLoad();
    var t = canvas.flagApplyingSingleLoad || canvas.flagApplyingUniformLoad || canvas.flagRemovingLoads;
    canvas.flagApplyingSingleLoad || canvas.flagApplyingUniformLoad ? shuffleLayersToPlaceLoadFinished() : canvas.flagRemovingLoads && shuffleLayersToRemoveLoadFinished(), escapePlacingUniformLoad2(), $("#form_load_single_button").html("Run it").addClass("orange"), $("#form_load_uniform").html("Run it").addClass("orange"), loadsInitializeTabToRemoveLoads(), canvas.flagRemovingLoads = !1, canvas.flagApplyingSingleLoad = !1, canvas.flagApplyingUniformLoad = !1, t && viewSettingsLoads.restoreCanvasSettings(canvas), console.log(e), interruptSelectingByRectangle(e, "warning"), _enableToolBar("#tool_select")
}

function hideLoadsDialogsCallback() {
    canvas.flagApplyingSingleLoad || canvas.flagApplyingUniformLoad ? shuffleLayersToPlaceLoadFinished() : canvas.flagRemovingLoads && shuffleLayersToRemoveLoadFinished(), canvas.flagApplyingSingleLoad = !1, canvas.flagApplyingUniformLoad = !1, canvas.flagRemovingLoads = !1, escapePlacingUniformLoad2(), enableAllToolBars(), touchscreenUnhighlightNodes(), viewSettingsLoads.restoreCanvasSettings(canvas)
}

function showLoadsDialog() {
    displayForm("form_load"), $("#form_load_uniform").html("Run it").addClass("orange"), $("#form_load_single_button").html("Run it").addClass("orange"), loadsInitializeTabToRemoveLoads(), disableAllToolBars()
}

function test_FormLoadUniform(e) {
    for (var t = !1, a = !1, o = ["#form_load_uniform_f", "#form_load_uniform_f2", "#form_load_uniform_angle"], n = 0; n < o.length; n++) {
        var r = $(o[n]);
        if (r) {
            var i = r.val(),
                s = r.prev();
            s && (s = s.find("label")), i.length && !$.isNumeric(i) ? (t = !0, $(r).addClass("error"), $(s).addClass("error")) : (i.length && 0 !== parseFloat(i) && 1 >= n && (a = !0), $(r).removeClass("error"), $(s).removeClass("error"))
        }
    }
    if ($(o[1]).val().length && !$(o[0]).val().length && (t = !0, $(o[0]).addClass("error")), $(o[1]).val().length && $(o[0]).val().length) {
        var l = $(o[0]).val(),
            c = $(o[1]).val();
        if (l > 0 && 0 > c || 0 > l && c > 0) {
            t = !0, $(o[1]).addClass("error");
            var d = new noticeParameters(e, "error", "Sign mismatch&nbsp;&nbsp;");
            showNotice2(d)
        }
    }
    if (!t && !a) {
        t = !0;
        var d = new noticeParameters(e, "error", "No value entered&nbsp;&nbsp;");
        showNotice2(d)
    }
    return t
}

function test_FormLoadSingle(e) {
    for (var t = !1, a = !1, o = ["#form_load_single", "#form_load_single_angle", "#form_load_single_m"], n = 0; n < o.length; n++) {
        var r = $(o[n]);
        if (r) {
            var i = r.val(),
                s = r.prev();
            s && (s = s.find("label")), i.length && !$.isNumeric(i) ? (t = !0, $(r).addClass("error"), $(s).addClass("error")) : (i.length && 0 !== parseFloat(i) && 1 !== n && (a = !0), $(r).removeClass("error"), $(s).removeClass("error"))
        }
    }
    if (!t && !a) {
        t = !0;
        var l = new noticeParameters(e, "error", "No value entered&nbsp;&nbsp;");
        showNotice2(l)
    }
    return t
}

function getAngle(e) {
    var t = e ? "form_load_uniform" : "form_load_single",
        a = parseFloat($("#" + t + "_angle").val());
    for (isNaN(a) && (a = 0), a = 360 - a; a >= 360;) a -= 360;
    for (; 0 > a;) a += 360;
    return a
}

function getAngleOfUniformForce() {
    var e = !0;
    return getAngle(e)
}

function getAngleOfSingleForce() {
    var e = !1;
    return getAngle(e)
}

function focusOptional(e, t, a) {
    e.target && e.target.id === t && ($("#" + t).css("opacity", ""), $("#" + a).removeClass("optional"))
}

function unFocusOptional(e, t, a) {
    if (e.target && e.target.id === t) {
        var o = $("#" + t);
        o.val().length || (o.css("opacity", ".4"), $("#" + a).addClass("optional"))
    }
}

function loadSingleEntryFocusOut(e) {
    canvas.flagIgnoreKbdShortcuts = !1, unFocusOptional(e, "form_load_uniform_f2", "idFormLoadUniform2"), dialogInputFocusOut()
}

function loadSingleEntryFocusIn(e) {
    canvas.flagIgnoreKbdShortcuts = !0, loadsTabSwitched(e), focusOptional(e, "form_load_uniform_f2", "idFormLoadUniform2"), dialogInputFocusIn()
}

function removeSingleLoadForce(e, t, a) {
    var o = "g[_type=force][_x='" + e + "'][_y='" + t + "']",
        n = $("#sti_loads").find(o);
    if (null === a) removeLoads(n);
    else
        for (var r = n.length - 1; r >= 0; r--) {
            var i = $(n[r]).attr("_angle"),
                s = parseFloat(i);
            isNaN(s) && (s = 0), 0 === _round(s - a) && removeLoads($(n[r]))
        }
}

function removeAuxPlaceLoad() {
    $("#cursor_place_load").remove(), $("#sti_auxPlaceLoad *").remove()
}

function removeSingleLoadMoment(e, t) {
    var a = $("#sti_loads").find("g[_type=moment][_x='" + e + "'][_y='" + t + "']");
    removeLoads(a)
}

function establishMomentText(e) {
    var t = canvas.svg.plain(e);
    return t.attr("class", "momentDesc"), t
}

function establishGenericText(e, t) {
    var a = canvas.svg.plain(e);
    return a.attr("class", t), a
}

function establishForceText(e) {
    var t = canvas.svg.plain(e);
    return t.attr("class", "forceDesc"), t
}

function _getMomentValueFromComponents(e) {
    var t = null;
    if (e = Math.abs(e), canvas.flagImperialUnits) {
        var a = e >= 1e3;
        t = a ? Math.round(e) : Math.round(100 * e) / 100, t += " kip.ft"
    } else {
        var a = e >= 1 || -1 >= e;
        t = a ? Math.round(10 * e) / 10 : Math.round(1e3 * e), t += a ? " kNm" : " Nm"
    }
    return t
}

function getMomentValueFromComponents() {
    var e = $("#form_load_single_m").val().length ? parseFloat($("#form_load_single_m").val()) : 0,
        t = _getMomentValueFromComponents(e);
    return t
}

function _getForceValueFromComponents(e) {
    var t = null;
    if (canvas.flagImperialUnits) {
        var a = Math.round(e) >= 1e3 || Math.round(e) <= -1e3;
        t = a ? Math.round(e) : Math.round(100 * e) / 100, t += " kip"
    } else {
        var a = Math.round(1e3 * e) >= 1e3 || Math.round(1e3 * e) <= -1e3,
            t = a ? Math.round(10 * e) / 10 : Math.round(1e3 * e);
        t += a ? " kN" : " N"
    }
    return t
}

function getForceValueFromComponents() {
    var e = $("#form_load_single").val().length ? parseFloat($("#form_load_single").val()) : 0,
        t = _getForceValueFromComponents(e);
    return t
}

function _getForceValueUniform(e) {
    var t = null;
    if (canvas.flagImperialUnits) {
        var a = Math.round(e) >= 1e3 || Math.round(e) <= -1e3;
        t = a ? Math.round(e) : Math.round(100 * e) / 100, t += " kip/ft"
    } else {
        var a = Math.round(1e3 * e) >= 1e3 || Math.round(1e3 * e) <= -1e3;
        t = a ? Math.round(10 * e) / 10 : Math.round(1e3 * e), t += a ? " kN/m" : " N/m"
    }
    return t
}

function getForceValueUniformFromComponents() {
    var e = [],
        t = $("#form_load_uniform_f").val(),
        a = $("#form_load_uniform_f2").val(),
        o = 0 === parseFloat(t) ? null : _getForceValueUniform(parseFloat(t)),
        n = a && a.length && 0 !== parseFloat(a) && parseFloat(a) !== parseFloat(t) ? _getForceValueUniform(parseFloat(a)) : null;
    return e.push(o), a && a.length && parseFloat(a) !== parseFloat(t) && e.push(n), e
}

function _initGetShiftY(e) {
    var t = establishGenericText("123", e),
        a = $(t.node).offset().top - canvas.offsetY,
        o = $(t)[0].node,
        n = o.scrollHeight || $(o).height();
    0 === parseFloat(n) && (n = o.getBoundingClientRect().height), n += .5;
    var r = -n / 2,
        i = r - a + .4;
    return t.remove(), i
}

function fixSingleMomentDescToZoom(e) {
    var t = e.attr("_x"),
        a = e.attr("_y"),
        o = e.attr("_dx") * getScaleZ(),
        n = e.attr("_dy") * getScaleZ();
    e.translate(t + 1.05 * o, a + 1.25 * n)
}

function fixUniformLoadDescToZoom(e) {
    var t = e.attr("_x"),
        a = e.attr("_y"),
        o = e.attr("_dx") * getScaleZ(),
        n = e.attr("_dy") * getScaleZ(),
        r = e.attr("_fix"),
        i = getShiftY("forceDesc");
    n += i, "down" === r ? n += 1.8 * i : n -= 1.8 * i, e.translate(t + o, a + n)
}

function fixSingleLoadDescToZoom(e) {
    var t = e.attr("_x"),
        a = e.attr("_y"),
        o = e.attr("_dx") * getScaleZ(),
        n = e.attr("_dy") * getScaleZ(),
        r = getShiftY("forceDesc");
    n += r, e.translate(t + 1.05 * o, a + 1 * n)
}

function establishTextOfPlacingTheLoad(e, t, a, o, n) {
    var r = $("#descPlacingLoad");
    if (r.length) r = r[0].instance;
    else {
        r = e.svg.plain(""), n = 1.5 * n;
        var i = (o + 90) * (Math.PI / 180),
            s = n * Math.cos(i),
            l = n * Math.sin(i),
            c = 1,
            d = 1;
        0 > o ? o > -30 ? (c = 0, d = -1.5) : o > -60 ? (c = -1, d = -1) : (c = -1.5, d = 0) : 30 > o ? (c = 0, d = -1.5) : 60 > o ? (d = -1, c = 1) : (d = 0, c = 1.5);
        var u = t + s + 2 * c * n,
            f = a + l + 2 * d * n;
        r.attr("class", "descPlacingLoad").attr("id", "descPlacingLoad").attr("text-anchor", "middle").attr("_x", u).attr("_y", f).translate(u, f).rotate(o, u, f), e.auxPlaceLoad.add(r)
    }
    return r
}

function placeArrowUniformLoadAt(e, t, a, o, n, r) {
    if (null !== e) {
        var i = canvas.lastId++,
            s = canvas.svg.use($(e)[0].instance),
            l = _round(uniformZoom * getScaleZ());
        t = _round(t), a = _round(a), s.translate(t, a).attr("_x", t).attr("_y", a).attr("parentId", n).attr("id", i).attr("_type", "uniform").scale(l), s.rotate(o, t, a), r || (r = canvas.loads), r.add(s)
    }
}

function fixAngle(e) {
    for (var t = parseFloat(e);;)
        if (0 > t) t += 360;
        else {
            if (!(t > 360)) break;
            t -= 360
        }
    return t
}

function uniformLoadPlaceDescription(e, t, a, o, n, r, i) {
    for (var s = getForceValueUniformFromComponents(), l = 1 === s.length, c = 0; 1 >= c; c++)
        if (textValue = s[c], textValue) {
            var d = n;
            d >= 90 && (d -= 180);
            var u = o - d,
                f = i[c],
                m = uniformZoom * f * forceSize() * Math.sin(u * Math.PI / 180),
                g = -uniformZoom * f * forceSize() * Math.cos(u * Math.PI / 180),
                _ = !0;
            u = fixAngle(o - n), 90 > n ? u > 90 && 270 > u && (_ = !1) : (90 > u || u > 270) && (_ = !1);
            var h = l ? (e[0] + e[1]) / 2 : e[c],
                v = l ? (t[0] + t[1]) / 2 : t[c],
                p = establishForceText(textValue.toString()).attr("_fix", _ ? "up" : "down").attr("_x", h).attr("_y", v).attr("_dx", _round(m)).attr("_dy", _round(g)).attr("_order", c).attr("parentId", a),
                y = "middle";
            !l && 1 > f && (y = e[0] < e[1] || e[0] == e[1] && t[0] > t[1] ? 0 == c ? "end" : "start" : 1 == c ? "end" : "start"), p.font({
                anchor: y
            }), p.rotate(d, h, v), fixUniformLoadDescToZoom(p), r.add(p)
        }
}

function getAngleOfSpan(e) {
    var t = null;
    if (e) {
        var a = e.attr("x1"),
            o = e.attr("x2"),
            n = e.attr("y1"),
            r = e.attr("y2"),
            i = o - a,
            s = r - n;
        t = i ? Math.atan(s / i) : -Math.PI / 2, t >= Math.PI && (t -= Math.PI), t *= 180 / Math.PI, 0 > t && (t += 180)
    }
    return t
}

function highlightLoad(e) {
    var t = $(e.node).find("text");
    t.each(function() {
        this.instance.addClass("load_focused")
    });
    var a = $(e.node).find("line");
    a.each(function() {
        this.instance.addClass("load_focused")
    });
    for (var o = [
            ["#id_force_prototype", "#id_force_prototype_sel"],
            ["#id_force_prototype_r", "#id_force_prototype_sel_r"],
            ["#id_moment_left_prototype", "#id_moment_left_prototype_sel"],
            ["#id_moment_right_prototype", "#id_moment_right_prototype_sel"]
        ], n = 5; 100 > n; n += 5) o.push(["#id_force_prototype_" + n, "#id_force_prototype_sel_" + n]);
    var r = $(e.node).find("use");
    r.each(function() {
        $(this).css("opacity", "0");
        for (var e = this.instance.attr("href"), t = 0, a = 1, n = 0; n < o.length; n++)
            if (e === o[n][t]) {
                var r = this.instance.clone();
                r.attr("parentId", null), $(r.node).attr("href", o[n][a]).attr("parentid", this.instance.attr("id")), $(r.node).css("opacity", 1), canvas.loadsAux.add(r);
                break
            }
    })
}

function modifyLoadFocusOut() {
    canvas.flagIgnoreKbdShortcuts = !1, dialogInputFocusOut()
}

function modifyLoadFocusIn() {
    canvas.flagIgnoreKbdShortcuts = !0, dialogInputFocusIn()
}

function loadEntryModified() {}

function mouseOverLoad(e) {
    if (!canvas.lineBeingDrawn && 0 === getOpenForms("form_load_modify").length && !canvas.flagSelectingTool && !$("#sti_auxiliary rect.aux").length && (document.body.style.cursor = "default", highlightLoad(this.instance), gTimerTouchActive)) {
        var t = !0;
        mouseLoadClicked(e, t)
    }
}

function unfocusLoad(e) {
    var t = $(e.node).find("text.load_focused");
    if (t.length > 0) {
        t.each(function() {
            this.instance.removeClass("load_focused")
        });
        var a = $(e.node).find("line.load_focused");
        a.each(function() {
            this.instance.removeClass("load_focused")
        });
        var o = $(e.node).find("use");
        o.each(function() {
            $(this).css("opacity", "1");
            var e = this.instance.attr("id");
            $("#sti_loads_aux use[parentid=" + e + "]").remove()
        })
    }
}

function mouseOutLoad() {
    var e = $("#form_load_modify").css("display");
    "block" === e ? this.instance !== canvas.groupFocusedLoad && unfocusLoad(this.instance) : unfocusLoad(this.instance)
}

function getFocusedLoad() {
    var e = $("#sti_loads text.load_focused"),
        t = e.length > 0 ? e.parent() : null;
    return t
}

function hideModifyLoadDialog() {
    $("#form_load_modify").css("display", "none");
    var e = getFocusedLoad();
    if (e)
        for (var t = 0; t < e.length; t++) {
            var a = e[t].instance;
            unfocusLoad(a)
        }
    canvas.groupFocusedLoad = null, canvas.flagModifyingLoad = !1, enableAllToolBars(), touchscreenUnhighlightNodes(), unHighlightSpans()
}

function openModifyLoadDialog(e) {
    displayForm("form_load_modify"), canvas.flagModifyingLoad = !0, disableAllToolBars();
    var t = e.attr("_type"),
        a = null,
        o = null,
        n = e.attr("parentId"),
        r = "sti_span" === $("#" + n).parent().attr("id");
    if ("force" === t) {
        $("#form_load_modify_angle").css("display", "block"), $("#form_load_modify_sizeC").css("display", "none"), $("#form_load_modify_sizeC2").css("display", "none"), $("#form_load_modify_sizeM").css("display", "none"), $("#form_load_modify_sizeF").css("display", "block"), $("#form_load_modify_start_pos").css("display", "none"), $("#form_load_modify_pos").css("display", r ? "block" : "none"), $("#form_load_modify_end_pos").css("display", "none");
        var i = "",
            s = e.attr("_angle");
        void 0 != s && 0 != s.length && (i = 360 - s), $("#form_load_modify_ang").val(i), a = e.attr("_F"), canvas.flagImperialUnits && (a = kNewtons2kips(a))
    } else if ("moment" === t) $("#form_load_modify_sizeF").css("display", "none"), $("#form_load_modify_sizeC").css("display", "none"), $("#form_load_modify_sizeC2").css("display", "none"), $("#form_load_modify_sizeM").css("display", "block"), $("#form_load_modify_angle").css("display", "none"), $("#form_load_modify_pos").css("display", r ? "block" : "none"), $("#form_load_modify_start_pos").css("display", "none"), $("#form_load_modify_end_pos").css("display", "none"), a = e.attr("_M"), canvas.flagImperialUnits && (a = kNewtons2kips(a) * m2ft(1));
    else {
        $("#form_load_modify_sizeC").css("display", "block");
        var l = e.attr("_f2");
        $("#form_load_modify_sizeC2").css("display", $.isNumeric(l) ? "block" : "none"), $("#form_load_modify_sizeF").css("display", "none"), $("#form_load_modify_sizeM").css("display", "none"), $("#form_load_modify_pos").css("display", "none"), $("#form_load_modify_angle").css("display", "block"), $("#form_load_modify_start_pos").css("display", "block"), $("#form_load_modify_end_pos").css("display", "block"), a = e.attr("_f"), canvas.flagImperialUnits && (a = kNewtons2kips(a) / m2ft(1));
        var i = "",
            s = e.attr("_angle");
        void 0 != s && 0 != s && (i = 360 - s), $("#form_load_modify_ang").val(i)
    }
    if (null !== a) {
        "moment" === t ? $("#form_load_modify_valM").val(_round(a)) : "force" === t ? $("#form_load_modify_valF").val(_round(a)) : ($("#form_load_modify_valC").val(_round(a)), o = e.attr("_f2"), canvas.flagImperialUnits && $.isNumeric(o) && (o = kNewtons2kips(o) / m2ft(1)), $("#form_load_modify_valC2").val($.isNumeric(o) ? _round(o) : ""));
        var c = e.attr("parentId"),
            d = null,
            u = null,
            f = $("#" + c);
        if (r) {
            if (d = f.attr("x1"), u = f.attr("y1"), "uniform" !== t) {
                var m = e.attr("_x"),
                    g = e.attr("_y"),
                    _ = dist(m, g, d, u);
                _ = _round(_ / canvas.unit / defaultZoom), $("#form_load_modify_ps").val(_)
            } else {
                var h = e.attr("_x1"),
                    v = e.attr("_y1"),
                    p = e.attr("_x2"),
                    y = e.attr("_y2"),
                    b = dist(h, v, d, u) / canvas.unit / defaultZoom,
                    S = dist(p, y, d, u) / canvas.unit / defaultZoom;
                b = _round(b), S = _round(S), $("#form_load_modify_pos1").val(b), $("#form_load_modify_pos2").val(S)
            }
            f[0].instance.addClass("span_focused")
        } else $("#form_load_modify_pos").css("display", "none"), $("#sti_span_nodes > rect").each(function() {
            var e = this.instance;
            return e.attr("id") === c ? (d = e.attr("_x"), void(u = e.attr("_y"))) : void 0
        });
        var w = $("#sti_span_nodes > rect[_x='" + d + "'][_y='" + u + "']");
        w.each(function() {
            this.instance.addClass("node_focused")
        })
    }
}

function mouseLoadClicked(e, t) {
    if (!canvas.flagDemoIsRunning && (t && e.stopPropagation(), isLeftButton(e) && !canvas.lineBeingDrawn && 0 === getOpenForms("form_load_modify").length && !canvas.flagSelectingTool)) {
        var a = getFocusedLoad(),
            o = this && "g" === this.tagName ? this.instance : canvas.groupFocusedLoad;
        canvas.groupFocusedLoad = o, a && setTimeout(function() {
            for (var e = 0; e < a.length; e++) {
                var t = a[e].instance;
                t !== o && unfocusLoad(t)
            }
            unHighlightSpans(), unHighlightNodes(), highlightLoad(o), openModifyLoadDialog(o);
            var n = ["#form_load_modify_valF", "#form_load_modify_valM", "#form_load_modify_valC", , "#form_load_modify_valC2", "#form_load_modify_ang", "#form_load_modify_ps", "#form_load_modify_pos1", "#form_load_modify_pos2"];
            for (e = 0; e < n.length; e++) $(n[e]).removeClass("error")
        }, 0)
    }
}

function btn_loadModify_remove() {
    var e = getFocusedLoad();
    return e && (unfocusLoad(e[0].instance), removeLoads(e)), hideModifyLoadDialog(), !1
}

function testCoordDialogValidIsOK(e) {
    var t, a = !0;
    "block" === $("#form_load_modify_angle").css("display") && (t = $("#form_load_modify_ang").val(), t.length > 0 && !$.isNumeric(t) ? ($("#form_load_modify_ang").addClass("error"), a = !1) : $("#form_load_modify_ang").removeClass("error"));
    for (var o = [
            ["#form_load_modify_sizeC", "#form_load_modify_valC"],
            ["#form_load_modify_sizeF", "#form_load_modify_valF"],
            ["#form_load_modify_sizeM", "#form_load_modify_valM"],
            ["#form_load_modify_pos", "#form_load_modify_ps"],
            ["#form_load_modify_start_pos", "#form_load_modify_pos1"],
            ["#form_load_modify_end_pos", "#form_load_modify_pos2"]
        ], n = 0; n < o.length; n++) "block" === $(o[n][0]).css("display") && (t = $(o[n][1]).val(), 0 !== t.length && $.isNumeric(t) ? $(o[n][1]).removeClass("error") : ($(o[n][1]).addClass("error"), a = !1));
    var r = getFocusedLoad();
    if (r) {
        var i = r[0].instance.attr("parentId"),
            s = $("#" + i);
        if (s.length) {
            var l = s.attr("x1"),
                c = s.attr("y1"),
                d = s.attr("x2"),
                u = s.attr("y2"),
                f = _round(dist(l, c, d, u) / canvas.unit / defaultZoom),
                m = [
                    ["#form_load_modify_pos", "#form_load_modify_ps"],
                    ["#form_load_modify_start_pos", "#form_load_modify_pos1"],
                    ["#form_load_modify_end_pos", "#form_load_modify_pos2"]
                ],
                g = 0,
                _ = 1;
            for (n = 0; n < m.length; n++)
                if ("block" === $(m[n][g]).css("display")) {
                    var h = parseFloat($(m[n][_]).val());
                    if ((0 > h || h > f) && ($(m[n][_]).addClass("error"), a = !1, h > 0)) {
                        var v = new noticeParameters(e, "warning", "Beam length is " + _round(f) + " " + (canvas.flagImperialUnits ? "ft" : "m"));
                        showNotice2(v)
                    }
                }
            if (a !== !1 && "block" === $("#form_load_modify_end_pos").css("display")) {
                var p = parseFloat($("#form_load_modify_pos1").val()),
                    y = parseFloat($("#form_load_modify_pos2").val());
                p === y && ($("#form_load_modify_pos2").addClass("error"), a = !1)
            }
        }
    }
    return a
}

function btn_loadModify_apply(e) {
    var t = testCoordDialogValidIsOK(e);
    if (t === !0) {
        var a = getFocusedLoad();
        if (a) {
            unfocusLoad(a[0].instance);
            var o = a[0].instance.attr("parentId"),
                n = null,
                r = null,
                i = a[0].instance.attr("_type");
            if ("force" === i ? n = $("#form_load_modify_valF").val() : "moment" === i ? n = $("#form_load_modify_valM").val() : (n = $("#form_load_modify_valC").val(), r = $("#form_load_modify_valC2").val()), "moment" === i || "force" === i) {
                var s = a[0].instance.attr("_x"),
                    l = a[0].instance.attr("_y");
                removeLoads(a), $("#form_load_single").val("moment" === i ? "" : n);
                var c = $("#form_load_modify_ang").val();
                $("#form_load_single_angle").val("moment" === i ? "" : c), $("#form_load_single_m").val("moment" === i ? n : "");
                var d = $("#" + o);
                if (d.length) {
                    var u, f, m, g;
                    if (u = d[0].instance.attr("x1"), f = d[0].instance.attr("x2"), m = d[0].instance.attr("y1"), g = d[0].instance.attr("y2"), void 0 != u) {
                        var _ = _round(dist(u, m, f, g) / 1e3 / defaultZoom),
                            h = parseFloat($("#form_load_modify_ps").val()) * canvas.unit / 1e3,
                            v = h / _;
                        s = u + (f - u) * v, l = m + (g - m) * v
                    }
                }
                var p = placeLoadSingleAtPoint(s, l, o);
                highlightLoad(p)
            } else {
                var y = a[0].instance.attr("_x1"),
                    b = a[0].instance.attr("_y1"),
                    S = a[0].instance.attr("_x2"),
                    w = a[0].instance.attr("_y2");
                removeLoads(a);
                var c = $("#form_load_modify_ang").val();
                $("#form_load_uniform_angle").val(c), $("#form_load_uniform_f").val(n), $("#form_load_uniform_f2").val($.isNumeric(r) ? r : "");
                var d = $("#" + o);
                if (d.length) {
                    var u, f, m, g;
                    if (u = d[0].instance.attr("x1"), f = d[0].instance.attr("x2"), m = d[0].instance.attr("y1"), g = d[0].instance.attr("y2"), void 0 != u) {
                        var _ = _round(dist(u, m, f, g) / 1e3 / defaultZoom),
                            x = parseFloat($("#form_load_modify_pos1").val()) * canvas.unit / 1e3,
                            T = parseFloat($("#form_load_modify_pos2").val()) * canvas.unit / 1e3,
                            M = x / _,
                            A = T / _;
                        y = u + (f - u) * M, b = m + (g - m) * M, S = u + (f - u) * A, w = m + (g - m) * A
                    }
                }
                placeLoadUniformAtPoint(y, b, o.toString());
                var p = placeLoadUniformAtPoint(S, w, o.toString());
                highlightLoad(p), $("#form_load_uniform_f2").val("")
            }
        }
    }
    return !1
}

function getSpanIdFromTwoNodeIds(e, t) {
    for (var a = $("#" + e), o = a.attr("_x"), n = a.attr("_y"), r = $("#sti_span_nodes > rect[_x='" + o + "'][_y='" + n + "']"), i = $("#" + t), s = i.attr("_x"), l = i.attr("_y"), c = $("#sti_span_nodes > rect[_x='" + s + "'][_y='" + l + "']"), d = null, u = 0; u < r.length; u++)
        for (var f = r[u].instance.attr("parentId"), m = 0; m < c.length; m++) {
            var g = c[m].instance.attr("parentId");
            if (g === f) {
                d = g;
                break
            }
        }
    return d
}

function getSpanIdFromNodeIdAndSpanId(e, t) {
    for (var a = $("#" + e), o = a.attr("_x"), n = a.attr("_y"), r = $("#sti_span_nodes > rect[_x='" + o + "'][_y='" + n + "']"), i = null, s = 0; s < r.length; s++) {
        var l = r[s].instance.attr("parentId");
        if (l == t) {
            i = t;
            break
        }
    }
    return i
}

function getForceScale(e) {
    for (var t = null, a = .025; .99 > a; a += .05) e > a && (t = _round(100 * (a + .025)));
    return 100 == t ? t = "" : null !== t && (t = "_" + t), t
}

function placeUniformArrowsBetweenStartAndEnd(e, t, a, o, n, r, i, s, l) {
    var c = dist(n, r, i, s),
        d = c / (canvas.drawingScale * e * forceSize() * 24 / 40);
    if (d > 2) {
        d = Math.floor(d);
        for (var u = (i - n) / d, f = (s - r) / d, m = 1; d > m; m++) {
            var g = Math.sqrt(Math.pow(u * m, 2) + Math.pow(f * m, 2)) / c,
                _ = g * l[1] + (1 - g) * l[0],
                h = getForceScale(_);
            null !== h && placeArrowUniformLoadAt("#id_force_prototype" + h, parseFloat(n) + u * m, parseFloat(r) + f * m, a, t, o)
        }
    }
}

function getUniformLoadStart() {
    for (var e = $("#sti_auxiliary > use"), t = null, a = 0; a < e.length; a++) {
        var o = e[a].instance.attr("href");
        if ("#id_force_prototype_temp" === o) {
            t = e[a];
            break
        }
    }
    return t
}

function placeLoadUniformAtPoint(e, t, a) {
    var o = getUniformLoadStart(),
        n = null;
    if (o) {
        if (a !== o.getAttribute("parentId")) {
            var r = $("#" + o.getAttribute("parentId")),
                i = $("#" + a),
                s = r[0] instanceof SVGRectElement,
                l = i[0] instanceof SVGRectElement;
            a = s && l ? getSpanIdFromTwoNodeIds(r.attr("id"), i.attr("id")) : s && !l ? getSpanIdFromNodeIdAndSpanId(r.attr("id"), i.attr("id")) : !s && l ? getSpanIdFromNodeIdAndSpanId(i.attr("id"), r.attr("id")) : null
        }
        if (null === a) removeAuxPlaceLoad(), o.instance.remove();
        else {
            var c = o.getAttribute("_x"),
                d = o.getAttribute("_y");
            if (_round(c) === _round(e) && _round(d) === _round(t)) removeAuxPlaceLoad();
            else {
                var u = canvas.lastId++,
                    f = $("#form_load_uniform_f").val(),
                    m = $("#form_load_uniform_f2").val(),
                    g = getAngleOfUniformForce();
                n = canvas.svg.group().attr("parentId", a).attr("id", u).attr("_f", canvas.flagImperialUnits ? kips2kNewtons(f) / ft2m(1) : f).attr("_angle", g).attr("_type", "uniform"), m.length && f !== m && n.attr("_f2", canvas.flagImperialUnits ? kips2kNewtons(m) / ft2m(1) : m), o.instance.remove();
                var _ = forceSize(),
                    h = forceSize();
                if (m.length) {
                    var v = Math.abs(parseFloat(f)),
                        p = Math.abs(parseFloat(m));
                    v > p ? h *= p / v : _ *= v / p
                } else;
                var y = _ / forceSize(),
                    b = getForceScale(y);
                null !== b && placeArrowUniformLoadAt("#id_force_prototype" + b, c, d, g, a, n), removeAuxPlaceLoad();
                var S = _round(defaultZoom / canvas.zoom),
                    w = e - c,
                    x = t - d,
                    T = c,
                    M = d,
                    A = parseFloat(T) + Math.sin(g * Math.PI / 180) * _ * canvas.drawingScale * uniformZoom * S,
                    D = parseFloat(M) - Math.cos(g * Math.PI / 180) * _ * canvas.drawingScale * uniformZoom * S,
                    L = -Math.sin(g * Math.PI / 180) * (_ - h) * canvas.drawingScale * uniformZoom * S,
                    F = Math.cos(g * Math.PI / 180) * (_ - h) * canvas.drawingScale * uniformZoom * S,
                    I = canvas.svg.line(0, 0, w + L, x + F).attr("class", "load_force_uniform").attr("_dx", w).attr("_dy", x).attr("_f1", _ / forceSize()).attr("_f2", h / forceSize()).attr("_x", T).attr("_y", M).attr("_angle", g).translate(A, D);
                n.add(I), n.attr("_x1", c).attr("_x2", _round(parseFloat(c) + w)).attr("_y1", d).attr("_y2", _round(parseFloat(d) + x)), y = h / forceSize(), b = getForceScale(y), null !== b && placeArrowUniformLoadAt("#id_force_prototype" + b, e, t, g, a, n);
                var k = $("#" + a),
                    B = getAngleOfSpan(k);
                uniformLoadPlaceDescription([parseFloat(c), parseFloat(e)], [parseFloat(d), parseFloat(t)], a, g, B, n, [_ / forceSize(), h / forceSize()]), placeUniformArrowsBetweenStartAndEnd(S, a, g, n, c, d, e, t, [_ / forceSize(), h / forceSize()]), canvas.loads.add(n), $(n.node).on("mouseover", mouseOverLoad).on("mouseleave", mouseOutLoad).on("mousedown", mouseLoadClicked).on("touchend", mouseLoadClicked), cleanResults()
            }
        }
    } else {
        var g = getAngleOfUniformForce();
        $.isNumeric(g) && a && placeArrowUniformLoadAt("#id_force_prototype_temp", e, t, g, a, canvas.auxiliary), removeAuxPlaceLoad()
    }
    return n
}

function _placeLoadSingleAtPoint(e, t, a) {
    var o = parseFloat($("#form_load_single_m").val()),
        n = parseFloat($("#form_load_single").val()),
        r = getAngleOfSingleForce();
    $.isNumeric(n) && removeSingleLoadForce(e, t, r), $.isNumeric(o) && removeSingleLoadMoment(e, t), placeLoadSingleAtPoint(e, t, a)
}

function placeLoadSingleAtPoint(e, t, a) {
    for (var o = parseFloat($("#form_load_single_m").val()), n = parseFloat($("#form_load_single").val()), r = getAngleOfSingleForce(), i = !1, s = _round(defaultZoom / canvas.zoom), l = null, c = 0; 2 > c; c++) {
        var d, u = null;
        if (0 === c && $.isNumeric(n) && 0 !== n && (i = doReverseAngleForDrawingForce(e, t, r, -.75), u = canvas.svg.use($(i ? "#id_force_prototype_r" : "#id_force_prototype")[0].instance), d = "force"), 1 === c && $.isNumeric(o) && 0 !== o && (u = canvas.svg.use($(0 > o ? "#id_moment_right_prototype" : "#id_moment_left_prototype")[0].instance), d = "moment"), u) {
            var f = canvas.lastId++;
            if (l = canvas.svg.group().attr("parentId", a).attr("id", f).attr("_type", d).attr("_x", e).attr("_y", t), 1 === c ? $.isNumeric(o) && 0 !== o && l.attr("_M", canvas.flagImperialUnits ? kipsFt2kNewtonMs(o) : o) : ($.isNumeric(n) && 0 !== n && l.attr("_F", canvas.flagImperialUnits ? kips2kNewtons(n) : n), $.isNumeric(r) && 0 !== r && l.attr("_angle", r)), u.translate(e, t).attr("_x", e).attr("_y", t).attr("_type", d).scale(s * canvas.drawingScale), "force" === d) {
                i && (r -= 180, 0 >= r && (r += 360)), u.rotate(r, e, t);
                var m = forceSize(),
                    g = m * Math.sin(r * Math.PI / 180),
                    _ = -m * Math.cos(r * Math.PI / 180);
                60 > r || r > 300 || r > 125 && 235 > r ? _ += (90 >= r || r >= 270 ? -.4 : .4) * uniformZoom * forceSize() : g *= 1.1;
                var h = getForceValueFromComponents(),
                    v = establishForceText(h.toString()).attr("_x", e).attr("_y", t).attr("_dx", _round(g)).attr("_dy", _round(_));
                v.font(40 > r || r > 320 || r > 140 && 220 > r ? {
                    anchor: "middle"
                } : 180 > r ? {
                    anchor: "start"
                } : {
                    anchor: "end"
                }), fixSingleLoadDescToZoom(v), l.add(v)
            } else {
                var p = $("#sti_span > #" + a),
                    y = null;
                if (p.length) {
                    var b = p.attr("x1"),
                        S = p.attr("x2"),
                        w = p.attr("y1"),
                        x = p.attr("y2");
                    y = getAngleFromCoordInRad(b, w, S, x), y *= 180 / Math.PI;
                    var T = s * momentSize3(),
                        M = canvas.svg.line(-T / 2, 0, T / 2, 0);
                    M.attr("class", "load_moment_centerline").attr("_angle", _round(-y)).translate(e, t).rotate(-y), l.add(M)
                }
                var h = getMomentValueFromComponents(),
                    g = momentSize1(),
                    _ = -momentSize2(),
                    v = establishMomentText(h.toString()).attr("_x", e).attr("_y", t).attr("_dx", _round(g)).attr("_dy", _round(_));
                v.font({
                    anchor: "start"
                }), fixSingleMomentDescToZoom(v), l.add(v)
            }
            l && ($(l.node).on("mouseover", mouseOverLoad).on("mouseleave", mouseOutLoad).on("mousedown", mouseLoadClicked).on("touchend", mouseLoadClicked), l.add(u), canvas.loads.add(l), cleanResults(), removeAuxPlaceLoad())
        }
    }
    return l
}

function removeLoads(e) {
    e && void 0 !== e && (e.remove(), e.length && cleanResults())
}

function getNodeFromDummyNode(e) {
    var t = e.instance.hasClass("nodeDummy");
    if (t) {
        var a = e.instance.attr("parentId");
        e = $("#" + a)[0]
    }
    return e
}

function nodeClick_singleLoad(e) {
    if (isLeftButton(e) && canvas.flagApplyingSingleLoad) {
        var t = getNodeFromDummyNode(this),
            a = t.instance.attr("_x"),
            o = t.instance.attr("_y");
        _placeLoadSingleAtPoint(a, o, t.instance.attr("id"))
    }
}

function nodeMouseOver_uniformLoad() {
    if (canvas.flagApplyingUniformLoad) {
        var e = getNodeFromDummyNode(this);
        e.instance.addClass("node_focused")
    }
}

function nodeMouseOut_uniformLoad() {
    if (canvas.flagApplyingUniformLoad) {
        var e = getNodeFromDummyNode(this);
        e.instance.removeClass("node_focused")
    }
}

function nodeMouseOver_singleLoad() {
    if (canvas.flagApplyingSingleLoad) {
        var e = getNodeFromDummyNode(this);
        e.instance.addClass("node_focused")
    }
}

function nodeMouseOut_singleLoad() {
    if (canvas.flagApplyingSingleLoad) {
        var e = getNodeFromDummyNode(this);
        e.instance.removeClass("node_focused")
    }
}

function removeLoadsFromSelectedObject() {
    var e = $("#sti_span").find("line.span_focused");
    if (e.length) {
        var t = e.attr("id");
        removeLoadByParentId(t.toString())
    }
}

function removeLoadByParentId(e) {
    var t = $("#sti_loads > g");
    if (t.length)
        for (var a = t.length - 1; a >= 0; a--) {
            var o = t[a].instance;
            o.attr("parentId") == e && ($(t[a]).remove(), cleanResults())
        }
}

function nodeClick_removeLoad(e) {
    if (isLeftButton(e) && canvas.flagRemovingLoads) {
        var t = this.instance.attr("_x"),
            a = this.instance.attr("_y"),
            o = null;
        removeSingleLoadForce(t, a, o), removeSingleLoadMoment(t, a)
    }
}

function nodeMouseOver_removeLoad() {
    if (canvas.flagRemovingLoads) {
        var e = getNodeFromDummyNode(this);
        e.instance.addClass("node_focused")
    }
}

function nodeMouseOut_removeLoad() {
    if (canvas.flagRemovingLoads) {
        var e = getNodeFromDummyNode(this);
        e.instance.removeClass("node_focused")
    }
}

function getLinesFromGrid(e, t) {
    var a = [],
        o = _getNearestGridPoint(e, t, 2);
    if (o) {
        e = _round(o.x), t = _round(o.y);
        for (var n = $("#sti_grid line[x1='" + e + "'][x2='" + e + "']"), r = $("#sti_grid line[y1='" + t + "'][y2='" + t + "']"), i = 0; i < n.length; i++) a.push(n[i]);
        for (i = 0; i < r.length; i++) a.push(r[i])
    }
    return a
}

function findObjectsByRect1(e, t, a, o, n) {
    var r = null,
        i = canvas.svg.node,
        s = i.createSVGRect();
    s.width = canvas.zoom / defaultZoom * o, s.height = canvas.zoom / defaultZoom * n, s.x = t - s.width / 2, s.y = a - s.height / 2;
    for (var l = canvas.zoom / defaultZoom, c = document.getElementById("sti_grid"), d = isObsoloteBrowser() ? getLinesFromGrid(t, a) : i.getIntersectionList(s, c), u = 1e6, f = -1, m = -1, g = t * defaultZoom / canvas.zoom, _ = a * defaultZoom / canvas.zoom, h = 0; h < d.length; h++) {
        var v = d[h].instance,
            p = canvas.svg.line(v.attr("x1") / l, v.attr("y1") / l, v.attr("x2") / l, v.attr("y2") / l),
            y = checkIntersectionLineLine(e, p);
        if (p.remove(), y && "Intersection" === y.status) {
            var b = parseFloat(y.points[0].x),
                $ = parseFloat(y.points[0].y),
                S = dist(g * getImperialZoomFix_1(), _ * getImperialZoomFix_1(), b, $);
            u > S && n / 2 > S && (u = S, f = b, m = $)
        }
    }
    return f >= 0 && (r = new coordinates(f, m)), r
}

function placeLoadMouseMove(e) {
    if (canvas.flagApplyingSingleLoad || canvas.flagApplyingUniformLoad) {
        var t = $("#sti_span").find("line.span_focused");
        if (t.length) {
            var a = void 0 === e.clientY ? e.originalEvent.touches[0] : e,
                o = a.clientX + window.pageXOffset,
                n = a.clientY + window.pageYOffset - canvas.offsetY,
                r = t[0].instance,
                i = r.attr("x1"),
                s = r.attr("x2"),
                l = r.attr("y1"),
                c = r.attr("y2"),
                d = canvas.grid * defaultZoom,
                u = 3 * d / 4,
                f = 3 * d / 4,
                m = findObjectsByRect1(r, o, n, f, u);
            if (m)
                if (m.x - i === 0 && m.y - l === 0 || m.x - s === 0 && m.y - c === 0) removeAuxPlaceLoad();
                else {
                    var g = _round(nodeSize() * getScaleZ()),
                        _ = $("#cursor_place_load"),
                        h = _.length ? _[0].instance : canvas.svg.circle(2 * g),
                        v = -1,
                        p = -1;
                    _.length && (v = _.attr("cx"), p = _.attr("cy")), h.move(m.x - g, m.y - g).attr("id", "cursor_place_load"), $(h.node).insertBefore($("#sti_span_dummy *:first-child"));
                    var y = h.attr("cx"),
                        b = h.attr("cy"),
                        S = y != v || b != p;
                    if (S) {
                        var w = s - i,
                            x = c - l,
                            T = w ? Math.atan(x / w) : -Math.PI / 2;
                        T >= Math.PI && (T -= Math.PI), T *= 180 / Math.PI;
                        var M = establishTextOfPlacingTheLoad(canvas, m.x, m.y, T, g),
                            A = Math.round((m.x - i) / defaultZoom / canvas.unit * 10) / 10,
                            D = Math.round((m.x - s) / defaultZoom / canvas.unit * 10) / 10,
                            L = Math.round((m.y - l) / defaultZoom / canvas.unit * 10) / 10,
                            F = Math.round((m.y - c) / defaultZoom / canvas.unit * 10) / 10,
                            I = Math.sqrt((m.x - i) * (m.x - i) + (m.y - l) * (m.y - l)),
                            k = Math.sqrt((m.x - s) * (m.x - s) + (m.y - c) * (m.y - c));
                        I = Math.round(10 * I / defaultZoom / canvas.unit) / 10, k = Math.round(10 * k / defaultZoom / canvas.unit) / 10, L = Math.abs(L), F = Math.abs(F), A = Math.abs(A), D = Math.abs(D), M.plain(s > i || i === s && l > c ? I + "[" + A + "," + L + "]   " + k + "[" + D + "," + F + "]" : k + "[" + D + "," + F + "]   " + I + "[" + A + "," + L + "]"), M.rotate(0);
                        var B = textBoundingRect($(canvas.auxiliary.node), T, !0),
                            C = M.node.getAttribute("_x"),
                            N = M.node.getAttribute("_y");
                        M.rotate(T, C, N), B && B.insertBefore($(M.node))
                    }
                } else removeAuxPlaceLoad()
        }
    }
}

function spanClick_singleLoad(e) {
    if (canvas.flagApplyingSingleLoad || canvas.flagApplyingUniformLoad) {
        if (!gTimerIgnorePlaceLoad.timer) {
            restartTimer(gTimerIgnorePlaceLoad, g_TouchTimerDelay);
            var t = $("#sti_span > line.span_focused");
            t && t.length && this.getAttribute("id") !== t[0].getAttribute("id") && t[0].instance.removeClass("span_focused");
            var a = getSpanFromDummySpan(this.instance);
            a.addClass("span_focused"), placeLoadMouseMove(e), processLeftClick(e, canvas)
        }
        e.stopPropagation()
    }
}

function spanMouseOver_uniformLoad() {
    if (canvas.flagApplyingUniformLoad) {
        var e = getSpanFromDummySpan(this.instance);
        e && e.addClass("span_focused")
    }
}

function spanMouseOut_uniformLoad() {
    if (canvas.flagApplyingUniformLoad) {
        var e = getSpanFromDummySpan(this.instance);
        e && e.removeClass("span_focused"), escapePlacingUniformLoad()
    }
}

function escapePlacingUniformLoad2() {
    for (var e = !1, t = $("#sti_auxiliary use"), a = t.length - 1; a >= 0; a--) {
        var o = t[a].instance,
            n = o.attr("href");
        "#id_force_prototype_temp" === n && (o.remove(), e = !0)
    }
    return _escapePlacingLoad(), e
}

function _escapePlacingLoad() {
    removeAuxPlaceLoad();
    var e = $("#css_opacity").attr("rel");
    e && e.length && ($("#css_opacity").removeAttr("rel", null), $("#css_opacity").attr("xrel", "stylesheet"))
}

function escapePlacingUniformLoad() {
    _escapePlacingLoad()
}

function escapePlacingSingleLoad() {
    _escapePlacingLoad()
}

function spanMouseOver_singleLoad() {
    if (canvas.flagApplyingSingleLoad) {
        var e = getSpanFromDummySpan(this.instance);
        e && e.addClass("span_focused")
    }
}

function spanMouseOut_singleLoad() {
    if (canvas.flagApplyingSingleLoad) {
        var e = getSpanFromDummySpan(this.instance);
        e && e.removeClass("span_focused"), escapePlacingSingleLoad()
    }
}

function deActivateEventsPlaceUniformLoad() {
    var e = $("#sti_span_nodes rect");
    e.each(function() {
        $(this).off("mouseover", nodeMouseOver_uniformLoad).off("mouseout", nodeMouseOut_uniformLoad)
    });
    var t = $("#sti_span_dummy").find("line.dummySpan");
    t.each(function() {
        $(this).off("click", spanClick_singleLoad).off("touchstart", spanClick_singleLoad).off("mouseover", spanMouseOver_uniformLoad).off("mouseout", spanMouseOut_uniformLoad)
    });
    var t = $("#sti_span").find("line.span");
    t.each(function() {
        $(this).off("click", spanClick_singleLoad).off("touchstart", spanClick_singleLoad).off("mouseover", spanMouseOver_uniformLoad).off("mouseout", spanMouseOut_uniformLoad)
    })
}

function activateEventsPlaceUniformLoad() {
    var e = $("#sti_span_nodes rect");
    e.each(function() {
        $(this).on("mouseover", nodeMouseOver_uniformLoad).on("mouseout", nodeMouseOut_uniformLoad)
    });
    var t = $("#sti_span_dummy").find("line.dummySpan");
    t.each(function() {
        $(this).on("click", spanClick_singleLoad).on("touchstart", spanClick_singleLoad).on("mouseover", spanMouseOver_uniformLoad).on("mouseout", spanMouseOut_uniformLoad)
    });
    var t = $("#sti_span").find("line.span");
    t.each(function() {
        $(this).on("click", spanClick_singleLoad).on("touchstart", spanClick_singleLoad).on("mouseover", spanMouseOver_uniformLoad).on("mouseout", spanMouseOut_uniformLoad)
    })
}

function deActivateEventsRemoveLoad() {
    var e = $("#sti_span_nodes rect");
    e.each(function() {
        $(this).off("click", nodeClick_removeLoad).off("mouseover", nodeMouseOver_removeLoad).off("mouseout", nodeMouseOut_removeLoad)
    })
}

function activateEventsRemoveLoad() {
    var e = $("#sti_span_nodes rect");
    e.each(function() {
        $(this).on("click", nodeClick_removeLoad).on("mouseover", nodeMouseOver_removeLoad).on("mouseout", nodeMouseOut_removeLoad)
    })
}

function deActivateEventsPlaceSingleLoad() {
    var e = $("#sti_span_nodes rect");
    e.each(function() {
        $(this).off("click", nodeClick_singleLoad).off("mouseover", nodeMouseOver_singleLoad).off("mouseout", nodeMouseOut_singleLoad)
    });
    var t = $("#sti_span_dummy").find("line.dummySpan");
    t.each(function() {
        $(this).off("click", spanClick_singleLoad).off("touchstart", spanClick_singleLoad).off("mouseover", spanMouseOver_singleLoad).off("mouseout", spanMouseOut_singleLoad)
    });
    var t = $("#sti_span").find("line.span");
    t.each(function() {
        $(this).off("click", spanClick_singleLoad).off("touchstart", spanClick_singleLoad).off("mouseover", spanMouseOver_singleLoad).off("mouseout", spanMouseOut_singleLoad)
    })
}

function activateEventsPlaceSingleLoad() {
    var e = $("#sti_span_nodes rect");
    e.each(function() {
        $(this).on("click", nodeClick_singleLoad).on("mouseover", nodeMouseOver_singleLoad).on("mouseout", nodeMouseOut_singleLoad)
    });
    var t = $("#sti_span_dummy").find("line.dummySpan");
    t.each(function() {
        $(this).on("click", spanClick_singleLoad).on("touchstart", spanClick_singleLoad).on("mouseover", spanMouseOver_singleLoad).on("mouseout", spanMouseOut_singleLoad)
    });
    var t = $("#sti_span").find("line.span");
    t.each(function() {
        $(this).on("click", spanClick_singleLoad).on("touchstart", spanClick_singleLoad).on("mouseover", spanMouseOver_singleLoad).on("mouseout", spanMouseOut_singleLoad)
    })
}

function form_load_remove_on_selected(e) {
    var t = getSelecedtObjects(canvas),
        a = t.length;
    if (a) $(t).each(function() {
        var e = $(this).attr("id");
        removeLoadByParentId(e)
    }), $("#sti_auxiliary rect").each(function() {
        var e = $(this).attr("x"),
            t = $(this).attr("y"),
            a = $("#sti_loads").find("g[_x='" + e + "'][_y='" + t + "']"),
            o = a.length;
        a.remove(), o && cleanResults()
    });
    else {
        var o = new noticeParameters(e, "error", "No spans selected&nbsp;&nbsp;");
        showNotice2(o)
    }
}

function form_load_remove() {
    canvas.flagRemovingLoads ? (deActivateEventsRemoveLoad(), shuffleLayersToRemoveLoadFinished(), viewSettingsLoads.restoreCanvasSettings(canvas), $("#form_load_remove").html("Run it").addClass("orange"), $("#form_load_remove_on_selected").attr("disabled", null).removeClass("disabled"), canvas.flagRemovingLoads = !1) : (activateEventsRemoveLoad(), canvas.showLoads || (canvas.showLoads = !0, initFormViewByFlags(), switchLayersToView()), viewSettingsLoads.set(canvas), document.body.style.cursor = "default", disableToolBar("#tool_select"), $("#form_load_remove").html("Pickup beams or nodes").removeClass("orange"), viewSettingsLoads.hide(canvas), canvas.flagRemovingLoads = !0, shuffleLayersToRemoveLoad(), $("#form_load_remove_on_selected").attr("disabled", "disabled").addClass("disabled"))
}

function shuffleLayersToRemoveLoad() {
    $("#sti_supports").insertBefore($("#sti_span")), $("#sti_span_nodes").insertAfter($("#sti_loads"))
}

function shuffleLayersToRemoveLoadFinished() {
    $("#sti_span_nodes").insertAfter($("#sti_span_dummy")), $("#sti_supports").insertAfter($("#sti_loads"))
}

function shuffleLayersToPlaceLoad() {
    $("#sti_supports").insertBefore($("#sti_span")), $("#sti_span_nodes").insertAfter($("#sti_span_dummy")), $("#sti_loads").insertBefore($("#sti_span")), $("#sti_hinges").insertBefore($("#sti_span"))
}

function shuffleLayersToPlaceLoadFinished() {
    $("#sti_span_nodes").insertAfter($("#sti_span_dummy")), $("#sti_loads").insertAfter($("#sti_span_nodes")), $("#sti_supports").insertAfter($("#sti_loads")), $("#sti_hinges").insertAfter($("#sti_reactions"))
}

function form_load_uniform(e) {
    return canvas.flagApplyingUniformLoad ? (deActivateEventsPlaceUniformLoad(), shuffleLayersToPlaceLoadFinished(), $("#form_load_uniform").html("Run it").addClass("orange"), canvas.flagApplyingUniformLoad = !1, escapePlacingUniformLoad2(), viewSettingsLoads.restoreCanvasSettings(canvas), _enableToolBar("#tool_select")) : (canvas.showLoads || (canvas.showLoads = !0, initFormViewByFlags(), switchLayersToView()), test_FormLoadUniform(e) || (document.body.style.cursor = "default", viewSettingsLoads.set(canvas), viewSettingsLoads.hide(canvas), $("#form_load_uniform").html("Pickup points now").removeClass("orange"), shuffleLayersToPlaceLoad(), canvas.flagApplyingUniformLoad = !0, activateEventsPlaceUniformLoad(), disableToolBar("#tool_select"))), !1
}

function form_load_single_button(e) {
    return canvas.flagApplyingSingleLoad ? (deActivateEventsPlaceSingleLoad(), shuffleLayersToPlaceLoadFinished(), $("#form_load_single_button").html("Run it").addClass("orange"), viewSettingsLoads.restoreCanvasSettings(canvas), canvas.flagApplyingSingleLoad = !1, _escapePlacingLoad(), _enableToolBar("#tool_select")) : (canvas.showLoads || (canvas.showLoads = !0, initFormViewByFlags(), switchLayersToView()), test_FormLoadSingle(e) || ($("#form_load_single_button").html("Pickup points now").removeClass("orange"), document.body.style.cursor = "default", viewSettingsLoads.set(canvas), viewSettingsLoads.hide(canvas), shuffleLayersToPlaceLoad(), canvas.flagApplyingSingleLoad = !0, activateEventsPlaceSingleLoad(), disableToolBar("#tool_select"))), !1
}

function form_load_uniform_Interrupt() {
    canvas.flagApplyingUniformLoad && (shuffleLayersToPlaceLoadFinished(), !1 === escapePlacingUniformLoad2() && (escapePlacingUniformLoad(), form_load_uniform()))
}

function form_load_Interrupt() {
    canvas.flagApplyingSingleLoad && (shuffleLayersToPlaceLoadFinished(), escapePlacingSingleLoad(), form_load_single_button())
}

function hideLoadsDialog() {}

function drawBasicForces(e) {
    var t = [];
    t.push(["id_force_prototype_temp", "load_force_temp", "load_force_head_temp", 1]);
    for (var a = 1; a > 0; a -= .05) {
        var o = "id_force_prototype" + (1 > a ? "_" + _round(100 * a) : "");
        t.push([o, "load_force", "load_force_head", a]), o = "id_force_prototype_sel" + (1 > a ? "_" + _round(100 * a) : ""), t.push([o, "load_force load_focused", "load_force_head load_focused", a])
    }
    t.push(["id_force_prototype_react", "load_force_react", "load_force_head_react", 1]), t.push(["id_force_prototype_r", "load_force", "load_force_head", 1]), t.push(["id_force_prototype_sel_r", "load_force load_focused", "load_force_head load_focused", 1]), t.push(["id_force_prototype_react_r", "load_force_react", "load_force_head_react", 1]);
    for (var n = 0; n < t.length; n++) {
        var r = e.svg.group().attr("id", t[n][0]);
        e.prototypes.add(r);
        var i = /_r$/.test(t[n][0]),
            s = null,
            l = null;
        if (t[n][3] >= .325) s = e.svg.line(0, i ? 0 : _round(-40 * t[n][3]), 0, i ? -27 : -13).attr("class", t[n][1]), l = e.svg.polygon(i ? "-6.5,-26 6.5,-26 0,-40" : "-6.5,-14 6.5,-14 0,0").attr("class", t[n][2]);
        else {
            var c = 40 * t[n][3] / 13,
                d = _round(6.5 * c),
                u = _round(14 * c);
            l = e.svg.polygon("-" + d + ",-" + u + " " + d + ",-" + u + " 0,0").attr("class", t[n][2])
        }
        null !== s && r.add(s), r.add(l)
    }
    for (var f = ["id_moment_left_prototype_sel", "load_force load_focused", "load_force_head load_focused"], m = ["id_moment_left_prototype", "load_force", "load_force_head"], g = ["id_moment_left_prototype_react", "load_force_react", "load_force_head_react"], t = [f, m, g], n = 0; n < t.length; n++) {
        var _ = e.svg.group().attr("id", t[n][0]),
            h = e.svg.path("M -24 0 A 24 24 0 0 0 21.6 10.40").attr("class", t[n][1]).rotate(180, 0, 0),
            l = e.svg.polygon("-15.6,-7.7 -27.6,-13.3 -28,2").attr("class", t[n][2]);
        e.prototypes.add(_), _.add(h), _.add(l)
    }
    for (var f = ["id_moment_right_prototype_sel", "load_force load_focused", "load_force_head load_focused"], m = ["id_moment_right_prototype", "load_force", "load_force_head"], g = ["id_moment_right_prototype_react", "load_force_react", "load_force_head_react"], t = [f, m, g], n = 0; n < t.length; n++) {
        var v = e.svg.group().attr("id", t[n][0]),
            p = e.svg.path("M 24 0 A 24 24 0 0 1 -21.6 10.40").attr("class", t[n][1]).rotate(180, 0, 0),
            l = e.svg.polygon("15.6,-7.6 27.6,-13.3 28,2").attr("class", t[n][2]);
        v.add(l), v.add(p), e.prototypes.add(v)
    }
}

function mouseOverKillFormButton() {
    return $(this).css("opacity", "0.75"), !1
}

function mouseOverRestoreFormButton() {
    return $(this).css("opacity", "0.75"), !1
}

function mouseOutKillFormButton() {
    return $(this).css("opacity", "0.4"), !1
}

function mouseOutRestoreFormButton() {
    return $(this).css("opacity", "0.4"), !1
}

function mouseOverForm() {
    return document.body.style.cursor = "default", !1
}

function formTriggerDefaultButton() {
    for (var e = $(":root > body > div.form_main_envelope"), t = 0; t < e.length; t++) {
        var a = $(e[t]).css("display");
        if ("block" === a) {
            var o = $(e[t]).find("button[_type=default]");
            o.is(":visible") && o.trigger("click")
        }
    }
}

function mouseFormKillActiveForm() {
    for (var e = !1, t = ["#form_load", "#form_supports", "#form_hinge", "#form_settings"], a = 0; a < t.length; a++) {
        var o = $(t[a]).css("display");
        if ("none" != o) {
            var n = $(t[a] + " div[class~=fa-remove]");
            n.length && (n.trigger("click"), e = !0)
        }
    }
    return e
}

function getScrollBarWidth() {
    if (null === gScrollBarWidth) {
        var e = $("<div>").css({
                visibility: "hidden",
                width: 100,
                overflow: "scroll"
            }).appendTo("body"),
            t = $("<div>").css({
                width: "100%"
            }).appendTo(e).outerWidth();
        e.remove(), gScrollBarWidth = 100 - t
    }
    return gScrollBarWidth
}

function displayForm(e) {
    var t = $("#" + e);
    t.css("display", "block"), restoreHiddenForm(null, t)
}

function restoreHiddenForm(e, t) {
    var a = canvas.flag_iOS ? !1 : !0,
        o = $(window).scrollTop(),
        n = $(window).scrollLeft(),
        r = canvas.resX,
        i = canvas.resY;
    t.css("height", "");
    var s = t.offset(),
        l = s.left - n,
        c = s.top - o,
        d = t.outerWidth(),
        u = t.outerHeight(),
        f = l + d,
        m = t.find("div.sti_form > div:first").outerHeight();
    16 > m && (m = 16);
    var g = a ? 4 * m : d,
        _ = a ? 2 * m : d;
    0 >= f - g ? s.left = n - d + g : l >= r - getScrollBarWidth() - _ && (s.left = n + r - _ - getScrollBarWidth());
    var h = a ? m : u;
    s.top < o ? s.top = o : c >= i - getScrollBarWidth() - h && (s.top = o + i - getScrollBarWidth() - h), t.offset(s)
}

function fixPositionsOfOpenForms() {
    for (var e = getOpenFormsAll(), t = 0; t < e.length; t++) {
        var a = null;
        restoreHiddenForm(a, $("#" + e[t]))
    }
}

function formIsMinimized(e) {
    var t = $("#" + e + " > div.sti_form div.form_body").css("display"),
        a = "none" === t;
    return a
}

function mouseFormRestore() {
    if (null === g_timerDragFinished) {
        var e = $(this).closest("div.sti_form").parent();
        e.css("height", "");
        var t = $(this).closest("div.sti_form").find("div.form_body"),
            a = "none" === t.css("display");
        t.css("display", a ? "form_help" === e.attr("id") ? "block" : "" : "none"), $(this).attr("class", a ? "fa fa-minus" : "fa fa-reorder")
    }
    return !0
}

function hideHelpDialog() {
    $("#form_help").css("display", "none")
}

function fixHelpDialog() {
    $("#form_help div.form_body").css("height", canvas.resY / 2), $("#form_help").css("height", "").css("max-height", "")
}

function mouseFormHelp() {
    if (null === g_timerDragFinished) {
        displayForm("form_help");
        var e = $(this).attr("help");
        $("#form_help > div.sti_form > div.form_body").scrollTo("#" + e)
    }
    return !0
}

function mouseFormKill() {
    if (null === g_timerDragFinished) {
        var e = $(this).closest("div.form_main_envelope");
        e.css("display", "none"), "form_help" === e.attr("id") && hideHelpDialog(), "form_open" === e.attr("id") && form_open_cancel(), "form_save" === e.attr("id") && form_save_cancel(), "form_supports" === e.attr("id") && hideSupportsDialog(), "form_hinge" === e.attr("id") && hideHingesDialog(), "form_material" === e.attr("id") && hideSectionsDialog(), "form_view" === e.attr("id") && hideViewDialog(), "form_load" === e.attr("id") && hideLoadsDialogsCallback(), "form_new" === e.attr("id") && enableAllToolBars(), "form_coord" === e.attr("id") && hideEnterCoordDialog(), "form_load_modify" === e.attr("id") && hideModifyLoadDialog(), "form_settings" === e.attr("id") && hideSettingsDialog()
    }
    return !0
}

function noticeIsOpen() {
    return "block" === $("#alertArea div").css("display")
}

function hideNotice() {
    $("#alertArea div").remove()
}

function isNoticeEvent(e) {
    var t = $(e.target.parentElement).hasClass("notice");
    return t
}

function hideMenuTools() {
    $("#menuTools").css("display", "none")
}

function menuToolsShown() {
    var e = "block" === $("#menuTools").css("display");
    return e
}

function noticeParameters(e, t, a) {
    this.e = e, this.x = null, this.y = null, this.type = t, this.msg = a, this.icon = null, this.flagAlignTop = !1, this.flagAvoidTimeout = !1
}


function showNotice2(e) {
    /*
    var t = e.e ? e.e.clientX : 0,
        a = e.e ? e.e.clientY : canvas.offsetY;
    null !== e.x && (t = e.x), null !== e.y && (a = e.y);
    var o = $("#alertArea");
    o.find("div").remove();
    var n = "fa-check";
    e.icon ? n = e.icon : "warning" === e.type ? n = "fa-warning" : "error" === e.type && (n = "fa-remove");
    var r = $('<div class="notice ' + e.type + '"><i class="fa ' + n + ' fa-large col_4"></i>' + e.msg + ' <a href="#close" class="fa fa-remove"></a></div>').appendTo("#alertArea");
    $("#alertArea div").draggable().bind("mouseover", mouseOverForm), $.isNumeric(t) || (t = 0), $.isNumeric(a) || (a = 0), t -= o.width() / 2, e.flagAlignTop === !0 || (a -= o.height()), t + o.width() >= .95 * canvas.resX && (t -= o.width() / 2), 0 > a && (a = 5), 0 > t && (t = 5), o.attr("style", "position:fixed;top:" + a + "px; left:" + t + "px;");
    var i = r.find("a.fa-remove"),
        s = e.flagAvoidTimeout;
    "error" !== e.type && (s === !0 || setTimeout(function() {
        $(i).trigger("click")
    }, "success" === e.type ? 3e3 : 7500))
    */
}


function dialogInputFocusOut() {
    canvas.flag_iOS && (moveGridLabels(), $("#sti_toolbar_bg").css("position", "fixed"), $("#sti_toolbar > ul.button-bar").css("position", "fixed"), $("#tool_hide_tb").css("display", "inline").css("position", "fixed"), $("#sti_toolbar > ul.button-bar")[0].style.top = $("#sti_toolbar > ul.button-bar")[0].style.left = $("#sti_toolbar_bg")[0].style.top = $("#sti_toolbar_bg")[0].style.left = "0px")
}

function dialogInputFocusIn() {
    canvas.flag_iOS && ($("#sti_toolbar_bg").css("position", "absolute"), $("#sti_toolbar > ul.button-bar").css("position", "absolute"), $("#tool_hide_tb").css("position", "absolute"), setTimeout(function() {
        $("#sti_toolbar_bg")[0].style.top = $("#sti_toolbar > ul.button-bar")[0].style.top = $(window).scrollTop() + "px", $("#sti_toolbar_bg")[0].style.left = $("#sti_toolbar > ul.button-bar")[0].style.left = $(window).scrollLeft() + "px", moveGridLabels()
    }, 0))
}

function formScroll(e, t, a, o) {
    if (canvas.flag_iOS) {
        var n = $(":root > body > div.form_main_envelope.absolute"),
            r = a - e,
            i = o - t;
        if (r || i)
            for (var s = 0; s < n.length; s++) {
                var l = n[s];
                if (i) {
                    var c = parseInt(l.style.top);
                    l.style.top = c + i + "px"
                }
                if (r) {
                    var d = parseInt(l.style.left);
                    l.style.left = d + r + "px"
                }
            }
    }
}

function showNewDialog(e, t) {
    e.flagDemoIsRunning ? (stopDemo(t), form_new_cancel()) : (displayForm("form_new"), disableAllToolBars())
}

function cleanResults() {
    $("#sti_span_deform *").remove(), $("#sti_N *").remove(), $("#sti_V *").remove(), $("#sti_M *").remove(), $("#sti_reactions g").remove(), cleanSlicesOnBeams()
}

function cleanAll() {
    $("#sti_span_bottom line").remove(), $("#sti_span_dummy line").remove(), $("#sti_span line").remove(), $("#sti_span_nodes rect").remove(), $("#sti_hinges circle").remove(), $("#sti_supports use").remove(), $("#sti_auxiliary rect").remove(), $("#sti_auxiliary use").remove(), $("#sectionsData div").remove(), $("#sti_loads *").remove(), canvas.loadsAux = canvas.svg.group().attr("id", "sti_loads_aux"), canvas.loads.add(canvas.loadsAux), cleanResults(), escKeyPressed(canvas), escKeyPressed(canvas), disableToolBar("#tool_select"), disableToolBar("#tool_supports"), disableToolBar("#tool_hinge"), disableToolBar("#tool_load")
}

function hideNewDialog() {
    $("#form_new").css("display", "none");
    enableAllToolBars()
}

function form_new_ok() {
    cleanAll();
    var e = canvas.workSizeX,
        t = canvas.workSizeY,
        a = canvas.guiScale,
        o = canvas.drawingScale;
    cookieLoadSettings(), (e != canvas.workSizeX || t != canvas.workSizeY) && drawGrid(canvas), canvas.guiScale != a && guiResize(canvas.guiScale), canvas.drawingScale != o && _zoom(), hideNewDialog()
}

function form_new_cancel() {
    hideNewDialog()
}

function interfSection(e, t, a, o, n) {
    this.id = t, this.name = e, this.A = a, this.I = o, this.E = n
}

function interfUniformLoad(e, t, a, o) {
    this.spanId = e, this.f = t, this.f2 = a, this.angle = o, this.x1Coord = null, this.y1Coord = null, this.x2Coord = null, this.y2Coord = null
}

function interfSingleLoad(e, t, a, o) {
    this.nodeId = e, this.x = t, this.y = a, this.m = o, this.xCoord = null, this.yCoord = null, this.F = null, this.angle = null
}

function interfBeam(e, t, a, o) {
    this.idBeam = e, this.idNode1 = t, this.idNode2 = a, this.idSection = o, this.hinge1 = !1, this.hinge2 = !1
}

function interfNode(e, t, a, o) {
    this.id = o, this.x = e, this.y = t, this.node = a, this.rX = null, this.rY = null, this.rM = null
}

function initComputeShiftToFixTextAccordingToScale() {
    for (var e = canvas.drawingScale, t = 0; t < shiftAccordingToScale.length; t++)
        for (var a = 0; a < drawingScales.length; a++) {
            canvas.drawingScale = drawingScales[a], zoomCSS(canvas.zoom);
            var o = _initGetShiftY(shiftAccordingToScale[t][0]);
            shiftAccordingToScale[t][1 + a] = o
        }
    canvas.drawingScale = e, zoomCSS(canvas.zoom)
}

function getShiftY(e) {
    for (var t = getButtonForActualDrawingScale(canvas.drawingScale), a = null, o = 0; o < shiftAccordingToScale.length; o++)
        if (shiftAccordingToScale[o][0] === e) {
            a = o;
            break
        }
    return null === a ? 0 : shiftAccordingToScale[a][1 + t] * defaultZoom / canvas.zoom
}

function getButtonForActualDrawingScale() {
    for (var e = 3, t = 0; t < guiScales.length; t++)
        if (canvas.drawingScale == drawingScales[t]) {
            e = t;
            break
        }
    return e
}

function getButtonForActualGUIScale() {
    for (var e = 2, t = 0; t < guiScales.length; t++)
        if (canvas.guiScale == guiScales[t]) {
            e = t;
            break
        }
    return e
}

function _startViewPortTriggerTimeout() {
    var e = window.innerWidth;
    e != canvas.resX ? $(window).trigger("resize") : 10 === g_PTT_counter ? ($(window).trigger("resize"), startViewPortTriggerTimeout1()) : g_PTT_counter >= 0 && startViewPortTriggerTimeout1(), g_PTT_counter--
}

function startViewPortTriggerTimeout1() {
    setTimeout(function() {
        _startViewPortTriggerTimeout()
    }, 100)
}

function startViewPortTriggerTimeout() {
    g_PTT_counter = 20, startViewPortTriggerTimeout1()
}

function drawingSize(e, t) {
    if ($.isNumeric(t)) {
        var a = parseInt(t);
        if (a >= 0 && a < drawingScales.length) {
            var o = canvas.drawingScale;
            canvas.drawingScale = drawingScales[a], zoomRescaleDrawing(o), cookieStoreSettings()
        }
    }
}

function guiResize() {
    var e = getButtonForActualGUIScale();
    console.log("resize gui to " + e), guiSize_1(null, e)
}

function guiSize_1(e, t) {
    var a = !1;
    if ($.isNumeric(t)) {
        var o = parseInt(t);
        o >= 0 && o < guiScales.length && (canvas.guiScale = guiScales[o], document.getElementById("viewport").setAttribute("content", "width=device-width, initial-scale=" + canvas.guiScale + ", maximum-scale=" + canvas.guiScale + ", minimum-scale=" + canvas.guiScale + ", user-scalable=no"), _zoomCanvas(), startViewPortTriggerTimeout(), a = !0, fixPositionsOfOpenForms())
    }
    return a
}

function guiSize(e, t) {
    !0 === guiSize_1(e, t) && cookieStoreSettings()
}

function showSettingsDialog() {
    return $("#form_area_x").val(_round(getWorkSizeX() / canvas.unit * 1e3)), $("#form_area_y").val(_round(getWorkSizeY() / canvas.unit * 1e3)), $("#form_view_scale_d").val(canvas.showDisplacementZoom), $(canvas.flagImperialUnits ? "#gui_off_si" : "#gui_on_si").prop("checked", !0), $(canvas.flagShowTBlabels ? "#gui_on_labels" : "#gui_off_labels").prop("checked", !0), $("#gui_size" + getButtonForActualGUIScale()).prop("checked", !0), $("#drawing_size" + getButtonForActualDrawingScale()).prop("checked", !0), canvas.flagMobile || $("#guiScaleDiv").css("display", "none"), displayForm("form_settings"), canvas.flagSetsDialogActive = !0, disableAllToolBars(), !1
}

function hideSettingsDialog() {
    $("#form_settings").css("display", "none"), canvas.flagSetsDialogActive = !1, enableAllToolBars()
}

function guiChangedOn() {
    return canvas.flagShowTBlabels = !0, fixToolBarPositionNew(), cookieStoreSettings(), !1
}

function guiSI_On_1() {
    canvas.flagImperialUnits = !1, canvas.unit = 1e3, arrZooms = arrZooms_SI, $("#form_area_x").val(_round(getWorkSizeX() / canvas.unit * 1e3)), $("#form_area_y").val(_round(getWorkSizeY() / canvas.unit * 1e3)), drawGrid(canvas), moveGridLabels(), fixForcesContentAccordingToUnits(), dialogLoadsSI(), dialogSectionsSI(), dialogViewSI(), dialogEnterCoordSI(), cleanResults(), _zoom()
}

function guiSI_On() {
    guiSI_On_1(), cookieStoreSettings()
}

function guiSI_Off_1() {
    canvas.flagImperialUnits = !0, canvas.unit = 304.8, $("#form_area_x").val(_round(getWorkSizeX() / canvas.unit * 1e3)), $("#form_area_y").val(_round(getWorkSizeY() / canvas.unit * 1e3)), arrZooms = arrZooms_Imperial, drawGrid(canvas), moveGridLabels(), fixForcesContentAccordingToUnits(), dialogLoadsImperial(), dialogSectionsImperial(), dialogViewImperial(), dialogEnterCoordImperial(), cleanResults(), console.log($("#sti_svg_canvas")), _zoom()
}

function guiSI_Off() {
    guiSI_Off_1(), cookieStoreSettings()
}

function guiChangedOff() {
    return canvas.flagShowTBlabels = !1, fixToolBarPositionNew(), cookieStoreSettings(), !1
}

function redrawPaper(e, t) {
    (e != canvas.workSizeX || t != canvas.workSizeY) && (canvas.workSizeX = e, canvas.workSizeY = t, drawGrid(canvas))
}

function btn_settings_apply() {
    var e = $("#form_area_x").val(),
        t = $("#form_area_y").val(),
        a = !1,
        o = !1,
        n = null,
        r = null;
    return e *= canvas.unit / 1e3, t *= canvas.unit / 1e3, $("#form_area_x").removeClass("error"), $("#form_area_y").removeClass("error"), $.isNumeric(e) ? (n = parseFloat(e), 0 >= n && (a = !0)) : a = !0, a && $("#form_area_x").addClass("error"), $.isNumeric(t) ? (r = parseFloat(t), 0 >= r && (o = !0)) : o = !0, o && $("#form_area_y").addClass("error"), o || a || (redrawPaper(n, r), enableAllToolBars(), cookieStoreSettings()), !1
}

function settingsInputFocusOut() {
    canvas.flagIgnoreKbdShortcuts = !1, dialogInputFocusOut()
}

function settingsInputFocusIn() {
    canvas.flagIgnoreKbdShortcuts = !0, dialogInputFocusIn()
}

function cookieStoreSettings() {
    $.removeCookie("paperX"), $.removeCookie("paperY"), $.removeCookie("guiScale"), $.removeCookie("drawingScale"), canvas.workSizeX && ($.cookie("paperX", canvas.workSizeX, {
        expires: 365
    }), $.cookie("paperY", canvas.workSizeY, {
        expires: 365
    })), $.cookie("TB_labels", canvas.flagShowTBlabels ? "on" : "off", {
        expires: 365
    }), $.cookie("imperialUnits", canvas.flagImperialUnits ? "true" : "false", {
        expires: 365
    }), $.cookie("guiScale", canvas.guiScale, {
        expires: 365
    }), $.cookie("drawingScale", canvas.drawingScale, {
        expires: 365
    })
}

function cookieLoadSettings() {
    var e = $.cookie("paperX"),
        t = $.cookie("paperY"),
        a = $.cookie("imperialUnits");
    "true" === a && guiSI_Off_1(), void 0 != e && (canvas.workSizeX = e, canvas.workSizeY = t);
    var o = $.cookie("TB_labels");
    "off" === o && (canvas.flagShowTBlabels = !1);
    var n = $.cookie("guiScale"),
        r = $.cookie("drawingScale");
    void 0 != n && canvas.guiScale !== n && (canvas.guiScale = n), void 0 != r && (canvas.drawingScale = r)
}

function cookiesStartDemo() {
    var e = $.cookie("demoLastRun_1"),
        t = $.cookie("demoLastRun_2"),
        a = $.cookie("demoRunCounter"),
        o = !1;
    if (void 0 == a && (a = 0), 2 > a && (void 0 == e || void 0 == t))
        if (void 0 == e) {
            o = !0, canvas.flagShowHintDragDialog = !0;
            var n = 7;
            $.cookie("demoLastRun_1", "dummy", {
                expires: n
            });
            var r = 1;
            $.cookie("demoLastRun_2", "dummy", {
                expires: r
            }), $.cookie("demoTimer2Active", "true", {
                expires: n
            }), a++, $.cookie("demoRunCounter", a, {
                expires: 365
            })
        } else {
            var i = $.cookie("demoTimer2Active");
            "true" === i && (o = !0, $.cookie("demoTimer2Active", null))
        }
    return o
}

function cookieLikeShown() {
    $.cookie("likeShown", "on", {
        expires: 14
    })
}

function cookieShowLike() {
    var e = $.cookie("likeShown");
    return "on" !== e
}

function dummyOnClick() {
    return !0
}

function myFadeOut(e, t, a) {
    var o = !1,
        n = e.css("opacity");
    void 0 == n && (n = 1);
    var r = parseFloat(n),
        i = _round(r - 1 / g_opacitySteps);
    return 0 >= i ? (o = !0, e.css("display", "none"), e.css("opacity", ""), null !== a && a()) : (e.css("opacity", i), setTimeout(function() {
        myFadeOut(e, t, a)
    }, t / g_opacitySteps)), o
}

function myFadeIn(e, t) {
    var a = !1,
        o = e.css("opacity");
    (void 0 == o || "none" === e.css("display")) && (o = 0, e.css("display", "block"));
    var n = parseFloat(o),
        r = _round(n + 1 / g_opacitySteps);
    return r >= 1 ? (a = !0, e.css("opacity", "")) : (e.css("opacity", r), setTimeout(function() {
        myFadeIn(e, t)
    }, t / g_opacitySteps)), a
}

function fixCenterCredit() {}

function afterFadeOutComplete() {
    g_timeOutCredit2 = setTimeout(function() {
        g_stageCredit++, printCredit()
    }, timeoutBetween)
}

function printCredit() {
    var e = ["Press <strong>New</strong> from the toolbar to abort the demo", "Settings: " + (canvas.flagImperialUnits ? "Imperial units" : "Metric units"), "Author: Xiaojun Chen", "Contact, bug reports and feature requests:", "xiaojun.chen@lindenbaum.com.au"];
    if (canvas.flagDemoIsRunning || 0 !== g_stageCredit ? canvas.flagDemoIsRunning && (g_stageCredit = 0) : g_stageCredit++, g_stageCredit >= 0 && g_stageCredit < e.length) {
        $("#credit > div > div").html(e[g_stageCredit]), fixCenterCredit(), myFadeIn($("#credit"), timeoutFade);
        var t = g_stageCredit == e.length - 1 ? 2 * timeoutHold : 0;
        g_timeOutCredit1 = setTimeout(function() {
            myFadeOut($("#credit"), timeoutFade, afterFadeOutComplete)
        }, timeoutFade + timeoutHold + t)
    } else g_timeOutCredit1 = null, g_timeOutCredit2 = null
}

function hideCredit(e) {
    isLeftButton(e) && (g_timeOutCredit2 && (clearTimeout(g_timeOutCredit2), g_timeOutCredit2 = null), g_timeOutCredit1 && (clearTimeout(g_timeOutCredit1), g_timeOutCredit1 = null), $("#credit").fadeOut(150), e.stopPropagation())
}

function creditPointer() {
    document.body.style.cursor = "default"
}

function initCredit() {
    $("#credit > div").bind("click", hideCredit);
    $("#credit > div").bind("mouseover", creditPointer);
    $("#credit > div").click().off("click");    
}

function solver_registerMessagesCallback(e) {
    g_fnMessagesCallbackSolver.push(e)
}

function solver_log(e, t) {
    for (var a = 0; a < g_fnMessagesCallbackSolver.length; a++) g_fnMessagesCallbackSolver[a](e, t, arguments)
}

function Node(e, t) {
    this.x = e, this.z = t, this.restraints = new Array(!1, !1, !1), this.distanceTo = function(e) {
        var t = e.x - this.x,
            a = e.z - this.z;
        return Math.sqrt(t * t + a * a)
    }, this.toString = function() {
        var e = "Node(";
        return e += "x=" + this.x.toString() + ",", e += "z=" + this.z.toString() + ",", e += "restraintX=" + this.restraints[0].toString() + ",", e += "restraintZ=" + this.restraints[1].toString() + ",", e += "restraintR=" + this.restraints[2].toString() + ")"
    }
}

function Properties() {
    this.modulusE = 0, this.modulusG = 1e99, this.transversalContractionCoef = .3, this.thermalExpansionCoef = .001, this.height = 0, this.area = 0, this.shearArea = 1e99, this.secondAreaMoment = 0, this.calculateModulusG = function() {
        this.modulusG = this.modulusE / 2 / (1 + this.transversalContractionCoef)
    }, this.toString = function() {
        var e = "Properties(";
        return e += "modulusE=" + this.modulusE.toString() + ",", e += "modulusG=" + this.modulusG.toString() + ",", e += "transversalContractionCoef=" + this.transversalContractionCoef.toString() + ",", e += "thermalExpansionCoef=" + this.thermalExpansionCoef.toString() + ",", e += "height=" + this.height.toString() + ",", e += "area=" + this.area.toString() + ",", e += "shearArea=" + this.shearArea.toString() + ",", e += "secondAreaMoment=" + this.secondAreaMoment.toString() + ")"
    }
}

function Beam(e, t) {
    this.node0 = e, this.node1 = t, this.hinge0 = !1, this.hinge1 = !1, this.properties = new Properties, this.stiffnessMatrix = null, this.globalStiffnessMatrix = null, this.length = null, this.cosinus = null, this.sinus = null, this.angle = null, this.shearConstant = null, this.localPrimaryForceVector = null, this.localSecondaryForceVector = null, this.localTotalForceVector = null, this.localSecondaryDisplacementVector = null, this.secondaryDisplacementFiaShear = null, this.secondaryDisplacementFibShear = null, this.primaryDisplacementFiaShear = null, this.primaryDisplacementFibShear = null, this.calculateLength = function() {
        this.length = e.distanceTo(t)
    }, this.calculateShearConstant = function() {
        this.shearConstant = 12 * this.properties.modulusE * this.properties.secondAreaMoment / this.properties.modulusG / this.properties.shearArea / this.length / this.length
    }, this.calculateAngle = function() {
        var e = this.node1.x - this.node0.x,
            t = this.node1.z - this.node0.z;
        this.angle = e >= 0 ? Math.asin(this.sinus) : t >= 0 ? Math.PI - Math.asin(this.sinus) : -Math.PI - Math.asin(this.sinus)
    }, this.calculateGoniometricConstants = function() {
        var e = this.node1.x - this.node0.x,
            t = this.node1.z - this.node0.z;
        this.cosinus = e / this.length, this.sinus = t / this.length
    }, this.update = function() {
        this.calculateLength(), this.calculateGoniometricConstants(), this.calculateAngle(), this.calculateShearConstant()
    }, this.toString = function() {
        var e = "Beam(";
        return e += "node0=" + this.node0.toString() + ",", e += "node1=" + this.node1.toString() + ",", e += "hinge0=" + this.hinge0.toString() + ",", e += "hinge1=" + this.hinge1.toString() + ",", e += "length=" + this.length.toString() + ",", e += "angle=" + this.angle().toString() + ",", e += "properties=" + this.properties.toString() + ",", e += "shearConstant=" + this.shearConstant().toString() + ")"
    }, this.assembleStiffnessMatrix = function() {
        this.update(), this.stiffnessMatrix = matrixAllocate(6, 6);
        var e = this.properties.modulusE * this.properties.area / this.length;
        if (this.stiffnessMatrix[0][0] = e, this.stiffnessMatrix[0][3] = -e, this.stiffnessMatrix[3][0] = -e, this.stiffnessMatrix[3][3] = e, this.hinge0 || this.hinge1) !this.hinge0 && this.hinge1 ? (t = 12 * this.properties.modulusE * this.properties.secondAreaMoment / this.length / this.length / (4 + this.shearConstant), this.stiffnessMatrix[1][1] = t / this.length, this.stiffnessMatrix[1][2] = -t, this.stiffnessMatrix[1][4] = -this.stiffnessMatrix[1][1], this.stiffnessMatrix[2][1] = -t, this.stiffnessMatrix[2][2] = t * this.length, this.stiffnessMatrix[2][4] = t, this.stiffnessMatrix[4][1] = this.stiffnessMatrix[1][4], this.stiffnessMatrix[4][2] = this.stiffnessMatrix[2][4], this.stiffnessMatrix[4][4] = this.stiffnessMatrix[1][1]) : this.hinge0 && !this.hinge1 && (t = 12 * this.properties.modulusE * this.properties.secondAreaMoment / this.length / this.length / (4 + this.shearConstant), this.stiffnessMatrix[1][1] = t / this.length, this.stiffnessMatrix[1][4] = -this.stiffnessMatrix[1][1], this.stiffnessMatrix[1][5] = -t, this.stiffnessMatrix[4][1] = this.stiffnessMatrix[1][4], this.stiffnessMatrix[4][4] = this.stiffnessMatrix[1][1], this.stiffnessMatrix[4][5] = t, this.stiffnessMatrix[5][1] = -t, this.stiffnessMatrix[5][4] = this.stiffnessMatrix[4][5], this.stiffnessMatrix[5][5] = t * this.length);
        else {
            var t = this.properties.modulusE * this.properties.secondAreaMoment / this.length / this.length / (1 + this.shearConstant);
            this.stiffnessMatrix[1][1] = 12 * t / this.length, this.stiffnessMatrix[1][2] = -6 * t, this.stiffnessMatrix[1][4] = -this.stiffnessMatrix[1][1], this.stiffnessMatrix[1][5] = this.stiffnessMatrix[1][2], this.stiffnessMatrix[2][1] = this.stiffnessMatrix[1][2], this.stiffnessMatrix[2][2] = (4 + this.shearConstant) * t * this.length, this.stiffnessMatrix[2][4] = -this.stiffnessMatrix[1][2], this.stiffnessMatrix[2][5] = (2 - this.shearConstant) * t * this.length, this.stiffnessMatrix[4][1] = this.stiffnessMatrix[1][4], this.stiffnessMatrix[4][2] = this.stiffnessMatrix[2][4], this.stiffnessMatrix[4][4] = this.stiffnessMatrix[1][1], this.stiffnessMatrix[4][5] = this.stiffnessMatrix[2][4], this.stiffnessMatrix[5][1] = this.stiffnessMatrix[1][2], this.stiffnessMatrix[5][2] = this.stiffnessMatrix[2][5], this.stiffnessMatrix[5][4] = this.stiffnessMatrix[2][4], this.stiffnessMatrix[5][5] = this.stiffnessMatrix[2][2]
        }
    }, this.assembleTransformMatrix = function() {
        this.transformMatrix = matrixAllocate(6, 6), this.transformMatrix[0][0] = this.cosinus, this.transformMatrix[1][1] = this.cosinus, this.transformMatrix[3][3] = this.cosinus, this.transformMatrix[4][4] = this.cosinus, this.transformMatrix[2][2] = 1, this.transformMatrix[5][5] = 1, this.transformMatrix[0][1] = this.sinus, this.transformMatrix[3][4] = this.sinus, this.transformMatrix[1][0] = -this.sinus, this.transformMatrix[4][3] = -this.sinus
    }, this.calculateGlobalStiffnessMatrix = function() {
        this.assembleStiffnessMatrix(), this.assembleTransformMatrix();
        var e = matrixMultiply(matrixTranspose(this.transformMatrix), this.stiffnessMatrix);
        this.globalStiffnessMatrix = matrixMultiply(e, this.transformMatrix)
    }, this.calculateGlobalStiffnessMatrix = function() {
        this.assembleStiffnessMatrix(), this.assembleTransformMatrix();
        var e = matrixMultiply(matrixTranspose(this.transformMatrix), this.stiffnessMatrix);
        this.globalStiffnessMatrix = matrixMultiply(e, this.transformMatrix)
    }, this.transformVectorToLocal = function(e) {
        return toVector(matrixMultiply(this.transformMatrix, toMatrix(e)))
    }, this.transformVectorToGlobal = function(e) {
        return toVector(matrixMultiply(matrixTranspose(this.transformMatrix), toMatrix(e)))
    }, this.calculateSecondaryForceVector = function(e) {
        if (!(e instanceof Model)) throw new IllegalArgumentException;
        this.localSecondaryForceVector = toVector(matrixMultiply(this.stiffnessMatrix, toMatrix(this.localSecondaryDisplacementVector)))
    }, this.calculatePrimaryForceVector = function(e) {
        if (!(e instanceof Model)) throw new IllegalArgumentException;
        this.localPrimaryForceVector = vectorAllocate(6);
        for (var t = 0; t < e.loads.length; t++) {
            var a = e.loads[t];
            a.beam == this && (a.assemblePrimaryForceVector(), vectorAdd(this.localPrimaryForceVector, a.localPrimaryForceVector))
        }
    }, this.calculateResultingVectors = function(e) {
        var t = e.assembleBeamGlobalDisplacementVector(this);
        this.localSecondaryDisplacementVector = this.transformVectorToLocal(t), this.calculateResultingForceVectors(e), this.secondaryDisplacementFiaShear = -this.localSecondaryForceVector[1] / this.properties.modulusG / this.properties.shearArea, this.secondaryDisplacementFibShear = this.localSecondaryForceVector[4] / this.properties.modulusG / this.properties.shearArea, this.primaryDisplacementFiaShear = 0, this.primaryDisplacementFibShear = 0
    }, this.calculateResultingForceVectors = function(e) {
        this.calculateSecondaryForceVector(e), this.localTotalForceVector = vectorAllocate(6), vectorAdd(this.localTotalForceVector, this.localPrimaryForceVector), vectorAdd(this.localTotalForceVector, this.localSecondaryForceVector)
    }, this.calculateInternalForces = function(e, t) {
        var a = vectorAllocate(3);
        return a[0] = -this.localTotalForceVector[0], a[1] = -this.localTotalForceVector[1], a[2] = -this.localTotalForceVector[2] + a[1] * e * this.length, this.addInternalForcesContributions(e, a, t), a
    }, this.addInternalForcesContributions = function(e, t, a) {
        for (var o = 0; o < a.loads.length; o++) {
            var n = a.loads[o];
            if (n.beam == this) {
                var r = n.calculateContributionToInternalForces(e);
                vectorAdd(t, r)
            }
        }
    }, this.globalDisplacement = function(e, t) {
        var a = this.localDisplacement(e, t),
            o = a[0],
            n = a[1],
            r = -n * this.sinus + o * this.cosinus,
            i = n * this.cosinus + o * this.sinus;
        return new Array(r, i)
    }, this.localDisplacement = function(e, t) {
        for (var a = e * this.length, o = new Array(this.calculateSecondaryDisplacementU(a), this.calculateSecondaryDisplacementW(a), this.calculateSecondaryDisplacementFi(a)), n = 0; n < t.loads.length; n++) {
            var r = t.loads[n];
            if (r.beam == this) {
                var i = r.calculateContributionToDisplacements(e);
                vectorAdd(o, i)
            }
        }
        return o
    }, this.calculateSecondaryDisplacementU = function(e) {
        var t = this.localSecondaryDisplacementVector[0],
            a = this.localSecondaryDisplacementVector[3],
            o = t,
            n = (a - t) / this.length;
        return o + e * n
    }, this.calculateSecondaryDisplacementW = function(e) {
        var t = 0,
            a = this.length,
            o = this.localSecondaryDisplacementVector[1],
            n = this.localSecondaryDisplacementVector[2],
            r = this.localSecondaryDisplacementVector[4],
            i = this.localSecondaryDisplacementVector[5],
            s = this.secondaryDisplacementFiaShear + this.primaryDisplacementFiaShear,
            l = this.secondaryDisplacementFibShear + this.primaryDisplacementFibShear,
            c = n - s,
            d = i - l;
        if (this.hinge0 || this.hinge1)
            if (!this.hinge0 && this.hinge1) {
                var u = o,
                    f = -c,
                    m = -((r - o) / a + c) / a / a / 2,
                    g = -3 * m * a;
                t = u + e * (f + e * (g + e * m))
            } else if (this.hinge0 && !this.hinge1) {
            var u = r,
                f = d,
                m = -((o - r) / a - d) / a / a / 2,
                g = -3 * m * a,
                _ = a - e;
            t = u + _ * (f + _ * (g + _ * m))
        } else {
            var u = o,
                f = (r - o) / a;
            t = u + e * f
        } else {
            var u = o,
                f = -c,
                g = ((3 * r - 3 * o) / a + 2 * c + d) / a,
                m = ((2 * o - 2 * r) / a - c - d) / a / a;
            t = u + e * (f + e * (g + e * m))
        }
        return t
    }, this.calculateSecondaryDisplacementFi = function() {
        return 0
    }
}

function GaussElimination() {
    this.pivots = null, this.determinant = null, this.solve = function(e) {
        return this.forward(e), this.backward(e)
    }, this.forward = function(e) {
        var t = e.length,
            a = e[0].length;
        if (this.pivots = new Array, this.pivots[t - 1] = 1, 0 != t) {
            for (var o = 0; t - 1 > o; o++) {
                for (var n = Math.abs(e[o][o]), r = o, i = o + 1; t > i; i++) {
                    var s = Math.abs(e[i][o]);
                    s > n && (n = s, r = i)
                }
                n = e[r][o], this.pivots[o] = n;
                for (var l = o; a > l; l++) {
                    var c = e[r][l] / n;
                    e[r][l] = e[o][l], e[o][l] = c
                }
                for (var i = o + 1; t > i; i++)
                    for (var l = o + 1; a > l; l++) e[i][l] -= e[o][l] * e[i][o]
            }
            this.calculateDeterminant(e)
        }
    }, this.backward = function(e) {
        var t = e.length,
            a = e[0].length,
            o = new Array,
            n = e[t - 1][a - 1] / e[t - 1][t - 1];
        o[t - 1] = n;
        for (var r = t - 2; r >= 0; r--) {
            for (var i = e[r][a - 1], s = r + 1; t > s; s++) i -= e[r][s] * o[s];
            o[r] = i
        }
        return o
    }, this.calculateDeterminant = function(e) {
        var t = e.length;
        this.determinant = -1;
        for (var a = 0; t > a; a++) this.determinant *= e[a][a] * this.pivots[a]
    }
}

function MatrixException() {}

function IllegalArgumentException() {}

function matrixAllocate(e, t) {
    for (var a = new Array, o = 0; e > o; o++) {
        a[o] = new Array;
        for (var n = 0; t > n; n++) a[o][n] = 0
    }
    return a
}

function vectorAllocate(e) {
    for (var t = new Array, a = 0; e > a; a++) t[a] = 0;
    return t
}

function toMatrix(e) {
    if (!(e instanceof Array)) throw new IllegalArgumentException;
    for (var t = e.length, a = matrixAllocate(t, 1), o = 0; t > o; o++) a[o][0] = e[o];
    return a
}

function toVector(e) {
    var t = e.length,
        a = e[0].length;
    if (1 != a) throw new IllegalArgumentException;
    for (var o = vectorAllocate(t), n = 0; t > n; n++) o[n] = e[n][0];
    return o
}

function matrixAugment(e, t) {
    var a = e.length,
        o = e[0].length,
        n = t.length,
        r = t[0].length,
        i = a,
        s = o + r;
    if (a != n) throw new IllegalArgumentException;
    for (var l = matrixAllocate(i, s), c = 0; a > c; c++)
        for (var d = 0; o > d; d++) l[c][d] = e[c][d];
    for (var c = 0; n > c; c++)
        for (var d = 0; r > d; d++) l[c][d + o] = t[c][d];
    return l
}

function matrixMultiply(e, t) {
    var a = e.length,
        o = e[0].length,
        n = t.length,
        r = t[0].length,
        i = a,
        s = r;
    if (o != n) throw new IllegalArgumentException;
    for (var l = matrixAllocate(i, s), c = 0; i > c; c++)
        for (var d = 0; s > d; d++) {
            for (var u = 0, f = 0; a > f; f++) u += e[c][f] * t[f][d];
            l[c][d] = u
        }
    return l
}

function vectorAdd(e, t) {
    var a = e.length,
        o = t.length;
    if (a != o) throw new IllegalArgumentException;
    for (var n = 0; a > n; n++) e[n] += t[n]
}

function matrixSolve(e, t) {
    var a = toMatrix(t),
        o = matrixAugment(e, a),
        n = new GaussElimination;
    return n.solve(o)
}

function matrixTranspose(e) {
    for (var t = e.length, a = e[0].length, o = matrixAllocate(a, t), n = 0; t > n; n++)
        for (var r = 0; a > r; r++) o[r][n] = e[n][r];
    return o
}

function vectorToTable(e) {
    return matrixToTable(toMatrix(e))
}

function matrixToTable(e) {
    for (var t = "<TABLE border='1'>", a = 0; a < e.length; a++) {
        t += "<TR>";
        for (var o = 0; o < e[0].length; o++) t += "<TD>", t += e[a][o].toString(), t += "</TD>";
        t += "</TR>"
    }
    return t += "</TABLE>"
}

function generalDisplacementWMa(e, t) {
    return -2 * e / t * (e - t) * (e - 2 * t)
}

function generalDisplacementWMb(e, t) {
    return 2 * e / t * (t * t - e * e)
}

function generalDisplacementFiMa(e, t) {
    return -2 / t * (3 * e * e - 6 * t * e + 2 * t * t)
}

function generalDisplacementFiMb(e, t) {
    return 2 / t * (t * t - 3 * e * e)
}

function NodeForceLoad(e, t) {
    this.node = e, this.components = t, this.toString = function() {
        var e = "NodeForceLoad(";
        return e += "node=" + this.node.toString() + ",", e += "componentX=" + this.components[0].toString() + ",", e += "componentZ=" + this.components[1].toString() + ",", e += "componentR=" + this.components[2].toString() + ","
    }
}

function Model() {
    this.nodes = new Array, this.beams = new Array, this.loads = new Array, this.stiffnessMatrix = null, this.nodeLoadVector = null, this.primaryLoadVector = null, this.loadVector = null, this.displacementVector = null, this.secondaryLoadVector = null, this.reactionVector = null, this.dof = function() {
        return 3 * this.nodes.length
    }, this.addNode = function(e) {
        if (!(e instanceof Node)) throw new IllegalArgumentException;
        this.nodes[this.nodes.length] = e
    }, this.addBeam = function(e) {
        if (!(e instanceof Beam)) throw new IllegalArgumentException;
        this.beams[this.beams.length] = e
    }, this.addLoad = function(e) {
        if (e instanceof NodeForceLoad) this.loads[this.loads.length] = e;
        else if (e instanceof BeamForceLoad) this.loads[this.loads.length] = e;
        else if (e instanceof BeamMomentLoad) this.loads[this.loads.length] = e;
        else {
            if (!(e instanceof BeamContinuousLoad)) throw new IllegalArgumentException;
            this.loads[this.loads.length] = e
        }
    }, this.toString = function() {
        var e = "Model(";
        return e += "nodeCount=" + this.nodes.length.toString() + ",", e += "beamCount=" + this.beams.length.toString() + ",", e += "loadCount=" + this.loads.length.toString() + ",", e += "dof=" + this.dof().toString() + ")"
    }, this.solve = function() {
        this.assembleStiffnessMatrix(), this.assembleLoadVectors(), this.applyRestraints(), this.displacementVector = matrixSolve(this.stiffnessMatrix, this.loadVector), this.makePostprocess()
    }, this.makePostprocess = function() {
        for (var e = 0; e < this.beams.length; e++) this.beams[e].calculateResultingVectors(this);
        this.assembleReactionVector()
    }, this.assembleLoadVectors = function() {
        this.assembleNodeLoadVector(), this.assemblePrimaryLoadVector(), this.assembleLoadVector()
    }, this.assembleNodeLoadVector = function() {
        var e = this.dof();
        this.nodeLoadVector = vectorAllocate(e);
        for (var t = 0; t < this.loads.length; t++) this.applyNodeForceLoad(this.loads[t])
    }, this.applyNodeForceLoad = function(e) {
        if (e instanceof NodeForceLoad)
            for (var t = e.node, a = e.components, o = this.nodes.indexOf(t), n = 3 * o, r = 0; 3 > r; r++) this.nodeLoadVector[n + r] += a[r]
    }, this.calculatePrimaryForcesOfBeams = function() {
        for (var e = 0; e < this.beams.length; e++) this.beams[e].calculatePrimaryForceVector(this)
    }, this.assemblePrimaryLoadVector = function() {
        this.calculatePrimaryForcesOfBeams();
        var e = this.dof();
        this.primaryLoadVector = vectorAllocate(e);
        for (var t = 0; t < this.beams.length; t++) this.addToPrimaryLoadVector(this.beams[t])
    }, this.addToPrimaryLoadVector = function(e) {
        for (var t = this.nodes.indexOf(e.node0), a = this.nodes.indexOf(e.node1), o = e.transformVectorToGlobal(e.localPrimaryForceVector), n = 0; 3 > n; n++) this.primaryLoadVector[3 * t + n] += o[n];
        for (var n = 0; 3 > n; n++) this.primaryLoadVector[3 * a + n] += o[n + 3]
    }, this.assembleLoadVector = function() {
        var e = this.dof();
        this.loadVector = vectorAllocate(e);
        for (var t = 0; e > t; t++) this.loadVector[t] = this.nodeLoadVector[t] - this.primaryLoadVector[t]
    }, this.assembleNodeDisplacementVector = function(e) {
        for (var t = this.nodes.indexOf(e), a = vectorAllocate(3), o = 0; 3 > o; o++) a[o] = this.displacementVector[3 * t + o];
        return a
    }, this.assembleBeamGlobalDisplacementVector = function(e) {
        for (var t = this.assembleNodeDisplacementVector(e.node0), a = this.assembleNodeDisplacementVector(e.node1), o = vectorAllocate(6), n = 0; 3 > n; n++) o[n] = t[n];
        for (var n = 0; 3 > n; n++) o[n + 3] = a[n];
        return o
    }, this.assembleStiffnessMatrix = function() {
        var e = this.dof();
        this.stiffnessMatrix = matrixAllocate(e, e);
        for (var t = 0; t < this.beams.length; t++) this.addStiffnessOfBeam(this.beams[t])
    }, this.addStiffnessOfBeam = function(e) {
        var t = this.nodes.indexOf(e.node0),
            a = this.nodes.indexOf(e.node1);
        e.calculateGlobalStiffnessMatrix();
        for (var o = e.globalStiffnessMatrix, n = new Array(3 * t, 3 * t + 1, 3 * t + 2, 3 * a, 3 * a + 1, 3 * a + 2), r = 0; 6 > r; r++)
            for (var i = 0; 6 > i; i++) this.stiffnessMatrix[n[r]][n[i]] += o[r][i]
    }, this.applyRestraints = function() {
        for (var e = 0; e < this.nodes.length; e++) this.applyRestraintsOfNode(this.nodes[e])
    }, this.applyRestraintsOfNode = function(e) {
        for (var t = this.dof(), a = e.restraints, o = this.nodes.indexOf(e), n = this.isNodeRotationFree(e), r = 0; 3 > r; r++)
            if (a[r] || 2 == r && n) {
                for (var i = 3 * o + r, s = 0; t > s; s++) i == s ? this.stiffnessMatrix[s][s] = 1 : (this.stiffnessMatrix[i][s] = 0, this.stiffnessMatrix[s][i] = 0);
                this.loadVector[i] = 0
            }
    }, this.applyRestraintsOfNodes = function(e) {
        for (var t = this.dof(), a = e.restraints, o = this.nodes.indexOf(e), n = this.isNodeRotationFree(e), r = 0; 3 > r; r++)
            if (a[r] || 2 == r && n) {
                for (var i = 3 * o + r, s = 0; t > s; s++) i == s ? this.stiffnessMatrix[s][s] = 1 : (this.stiffnessMatrix[i][s] = 0, this.stiffnessMatrix[s][i] = 0);
                this.loadVector[i] = 0
            }
    }, this.isNodeRotationFree = function(e) {
        for (var t = 0; t < this.beams.length; t++) {
            var a = this.beams[t];
            if (a.node0 == e && !a.hinge0) return !1;
            if (a.node1 == e && !a.hinge1) return !1
        }
        return !0
    }, this.assembleReactionVector = function() {
        var e = this.dof();
        this.reactionVector = vectorAllocate(e);
        for (var t = 0; t < this.beams.length; t++) {
            for (var a = this.beams[t], o = this.nodes.indexOf(a.node0), n = this.nodes.indexOf(a.node1), r = a.transformVectorToGlobal(a.localTotalForceVector), i = 0; 3 > i; i++) this.reactionVector[3 * o + i] += r[i];
            for (var i = 0; 3 > i; i++) this.reactionVector[3 * n + i] += r[i + 3]
        }
        for (var t = 0; e > t; t++) this.reactionVector[t] -= this.nodeLoadVector[t]
    }, this.assembleSecondaryLoadVector = function() {
        var e = this.dof();
        this.secondaryLoadVector = vectorAllocate(e);
        for (var t = 0; t < this.beams.length; t++) {
            for (var a = this.beams[t], o = this.nodes.indexOf(a.node0), n = this.nodes.indexOf(a.node1), r = a.transformVectorToGlobal(a.localSecondaryForceVector), i = 0; 3 > i; i++) this.secondaryLoadVector[3 * o + i] += r[i];
            for (var i = 0; 3 > i; i++) this.secondaryLoadVector[3 * n + i] += r[i + 3]
        }
    }, this.assembleNodeReactionVector = function(e) {
        for (var t = this.nodes.indexOf(e), a = vectorAllocate(3), o = 3 * t, n = 0; 3 > n; n++) a[n] = this.reactionVector[o + n];
        return a
    }
}

function createTestBeam(e, t, a) {
    var o = new Beam(e, t),
        n = null;
    return a ? (n = a, n.shearArea = n.area) : (n = new Properties, n.modulusE = 1e10, n.transversalContractionCoef = .3, n.calculateModulusG(), n.area = .01, n.shearArea = 1e99, n.secondAreaMoment = .001), o.properties = n, o
}

function writeTestBeam() {
    var e = new Node(0, 0),
        t = new Node(3, 4),
        a = createTestBeam(e, t);
    document.write(a.toString() + "<BR>"), a.calculateGlobalStiffnessMatrix(), document.write(matrixToTable(a.stiffnessMatrix)), document.write(matrixToTable(a.transformMatrix)), document.write(matrixToTable(a.globalStiffnessMatrix))
}

function createFrame() {
    var e = new Node(0, 0),
        t = new Node(3, 4),
        a = new Node(5, 4),
        o = createTestBeam(e, t),
        n = createTestBeam(t, a),
        r = new NodeForceLoad(a, new Array(0, 12, 0)),
        i = new BeamForceLoad(o, 5, .4, .75 * Math.PI),
        s = new BeamMomentLoad(o, 10, .6),
        l = new BeamContinuousLoad(o, 1, .3, .2, .6, .75 * Math.PI),
        c = new Model;
    return c.addNode(e), c.addNode(t), c.addNode(a), c.addBeam(o), c.addBeam(n), c.addLoad(r), c.addLoad(i), c.addLoad(s), c.addLoad(l), e.restraints = new Array(!0, !0, !0), c.solve(), c
}

function createSimpleSupportedBeam() {
    var e = new Node(0, 0),
        t = new Node(6, 0),
        a = createTestBeam(e, t),
        o = new NodeForceLoad(t, new Array(1, 0, 0)),
        n = (new BeamForceLoad(a, 1, .55, .65 * Math.PI), new BeamContinuousLoad(a, 1, .3, .2, .6, .75 * Math.PI), new BeamMomentLoad(a, 10, .6), new Model);
    return n.addNode(e), n.addNode(t), n.addBeam(a), n.addLoad(o), e.restraints = new Array(!0, !0, !1), t.restraints = new Array(!1, !0, !1), preCheck(n), n.solve(), postCheck(n), n
}

function main() {
    var e = createSimpleSupportedBeam();
    document.write(e.toString() + "<BR>"), document.write("model.displacementVector=" + vectorToTable(e.displacementVector) + "<BR>"), document.write("model.reactionVector=" + vectorToTable(e.reactionVector) + "<BR>"), document.write("model.nodes[0].nodeDisplacementVector=" + vectorToTable(e.assembleNodeDisplacementVector(e.nodes[0])) + "<BR>");
    var t = .45;
    document.write("beam0.internalForces(" + t + ")=" + vectorToTable(e.beams[0].calculateInternalForces(t, e)) + "<BR>"), document.write("beam0.localDisplacement(" + t + ")=" + vectorToTable(e.beams[0].localDisplacement(t, e)) + "<BR>"), document.write("xml=" + generateXML(e) + "<BR>"), document.write("html=" + generateHTML(e) + "<BR>")
}

function generateXML(e) {
    if (!(e instanceof Model)) throw new IllegalArgumentException;
    for (var t = "&lt;STRUCTURE&gt;<BR>", a = 0; a < e.nodes.length; a++) t += generateNodeTag(e.nodes[a]);
    for (var a = 0; a < e.beams.length; a++) t += generateMaterialTag(e.beams[a]);
    for (var a = 0; a < e.beams.length; a++) t += generateCrosssectionTag(e.beams[a]);
    for (var a = 0; a < e.beams.length; a++) t += generateBeamTag(e.beams[a], e);
    for (var a = 0; a < e.loads.length; a++) t += generateLoadTag(e.loads[a], e);
    return t += "&lt;/STRUCTURE&gt;<BR>"
}

function generateNodeTag(e) {
    var t = "&nbsp;&nbsp;&nbsp;&nbsp;&lt;NODE";
    return t += " coordX='" + e.x + "'", t += " coordY='" + -e.z + "'", t += " restraintX='" + e.restraints[0] + "'", t += " restraintY='" + e.restraints[1] + "'", t += " restraintRotation='" + e.restraints[2] + "'", t += " /&gt<BR>"
}

function generateMaterialTag(e) {
    var t = "&nbsp;&nbsp;&nbsp;&nbsp;&lt;MATERIAL";
    return t += " elasticityModulus='" + e.properties.modulusE + "'", t += " contractionCoefficient='" + e.properties.transversalContractionCoef + "'", t += " thermalExpansionCoefficient='" + e.properties.thermalExpansionCoef + "'", t += " /&gt<BR>"
}

function generateCrosssectionTag(e) {
    var t = "&nbsp;&nbsp;&nbsp;&nbsp;&lt;CROSSSECTION";
    return t += " height='" + e.properties.height + "'", t += " area='" + e.properties.area + "'", t += " shearArea='" + e.properties.shearArea + "'", t += " secondAreaMoment='" + e.properties.secondAreaMoment + "'", t += " /&gt<BR>"
}

function generateBeamTag(e, t) {
    var a = "&nbsp;&nbsp;&nbsp;&nbsp;&lt;BAR";
    return a += " node1Index='" + t.nodes.indexOf(e.node0) + "'", a += " node2Index='" + t.nodes.indexOf(e.node1) + "'", a += " separator1Rotation='" + e.hinge0 + "'", a += " separator2Rotation='" + e.hinge1 + "'", a += " materialIndex='" + t.beams.indexOf(e) + "'", a += " crosssectionIndex='" + t.beams.indexOf(e) + "'", a += " /&gt<BR>"
}

function generateLoadTag(e, t) {
    if (e instanceof NodeForceLoad) return generateNodeForceLoadTag(e, t);
    if (e instanceof BeamForceLoad) return generateBeamForceLoadTag(e, t);
    if (e instanceof BeamMomentLoad) return generateBeamMomentLoadTag(e, t);
    if (e instanceof BeamContinuousLoad) return generateBeamContinuousLoadTag(e, t);
    throw new IllegalArgumentException
}

function generateNodeForceLoadTag(e, t) {
    var a = "&nbsp;&nbsp;&nbsp;&nbsp;&lt;NODEFORCELOAD";
    return a += " nodeIndex='" + t.nodes.indexOf(e.node) + "'", a += " x='" + e.components[0] + "'", a += " y='" + -e.components[1] + "'", a += " rotation='" + e.components[2] + "'", a += " /&gt<BR>"
}

function generateBeamContinuousLoadTag(e, t) {
    var a = "&nbsp;&nbsp;&nbsp;&nbsp;&lt;BARCONTINUOUSLOAD",
        o = convertAngle(e.angle);
    return a += " barIndex='" + t.beams.indexOf(e.beam) + "'", a += " size='" + e.size + "'", a += " sizeChange='" + e.sizeChange + "'", a += " position='" + e.position + "'", a += " length='" + e.length + "'", a += " angle='" + o + "'", a += " inputPositionRelative='true'", a += " inputAngleLocal='true'", a += " angleUnit='deg'", a += " /&gt<BR>"
}

function generateBeamForceLoadTag(e, t) {
    var a = "&nbsp;&nbsp;&nbsp;&nbsp;&lt;BARFORCE",
        o = convertAngle(e.angle);
    return a += " barIndex='" + t.beams.indexOf(e.beam) + "'", a += " size='" + e.size + "'", a += " position='" + e.position + "'", a += " angle='" + o + "'", a += " inputPositionRelative='true'", a += " inputAngleLocal='true'", a += " angleUnit='deg'", a += " /&gt<BR>"
}

function generateBeamMomentLoadTag(e, t) {
    var a = "&nbsp;&nbsp;&nbsp;&nbsp;&lt;BARMOMENT";
    return a += " barIndex='" + t.beams.indexOf(e.beam) + "'", a += " size='" + e.size + "'", a += " position='" + e.position + "'", a += " inputPositionRelative='true'", a += " /&gt<BR>"
}

function convertAngle(e) {
    var t = 180 * e / Math.PI;
    return t += 180, t >= 360 && (t -= 360), t
}

function BeamForceLoad(e, t, a, o) {
    this.beam = e, this.size = t, this.position = a, this.angle = o, this.localPrimaryForceVector = null, this.toString = function() {
        var e = "BeamForceLoad(";
        return e += "beam=" + this.beam.toString() + ",", e += "size=" + this.size.toString() + ",", e += "position=" + this.position.toString() + ",", e += "angle=" + this.angle.toString() + ","
    }, this.assemblePrimaryForceVector = function() {
        var e = this.beam.length,
            t = this.beam.shearConstant,
            a = Math.cos(Math.PI - this.angle),
            o = Math.sin(Math.PI - this.angle),
            n = e * this.position,
            r = this.size * a,
            i = this.size * o,
            s = n,
            l = e - s,
            c = e * e * e;
        this.localPrimaryForceVector = vectorAllocate(6), this.localPrimaryForceVector[0] = -r * l / e, this.localPrimaryForceVector[3] = -r * s / e, this.beam.hinge0 || this.beam.hinge1 ? !this.beam.hinge0 && this.beam.hinge1 ? (this.localPrimaryForceVector[1] = -i * l / (c * (4 + t)) * (t * e * e + 2 * (3 * e * e - l * l)), this.localPrimaryForceVector[2] = 2 * i * s * l / (e * e * (4 + t)) * (e + l), this.localPrimaryForceVector[4] = -i * s / (c * (4 + t)) * (t * e * e + 2 * s * (2 * e + l))) : this.beam.hinge0 && !this.beam.hinge1 ? (this.localPrimaryForceVector[1] = -i * l / (c * (4 + t)) * (t * e * e + 2 * l * (2 * e + s)), this.localPrimaryForceVector[4] = -i * s / (c * (4 + t)) * (t * e * e + 2 * (3 * e * e - s * s)), this.localPrimaryForceVector[5] = -2 * i * s * l / (e * e * (4 + t)) * (e + s)) : (this.localPrimaryForceVector[1] = -i / e * l, this.localPrimaryForceVector[4] = -i / e * s) : (this.localPrimaryForceVector[1] = -i * l / (c * (1 + t)) * (t * e * e + l * (3 * s + l)), this.localPrimaryForceVector[2] = i * s * l / (2 * e * e * (1 + t)) * (t * e + 2 * l), this.localPrimaryForceVector[4] = -i * s / (c * (1 + t)) * (t * e * e + s * (3 * l + s)), this.localPrimaryForceVector[5] = -i * s * l / (2 * e * e * (1 + t)) * (t * e + 2 * s))
    }, this.calculateContributionToInternalForces = function(e) {
        var t = this.beam.length,
            a = (this.beam.shearConstant, Math.cos(Math.PI - this.angle)),
            o = Math.sin(Math.PI - this.angle),
            n = t * e,
            r = t * this.position,
            i = this.size * a,
            s = this.size * o;
        return new Array(this.n(n, r, i), this.v(n, r, s), this.m(n, r, s))
    }, this.n = function(e, t, a) {
        var o;
        return o = t >= e ? 0 : -a
    }, this.v = function(e, t, a) {
        var o;
        return o = t >= e ? 0 : -a
    }, this.m = function(e, t, a) {
        var o;
        return o = t >= e ? 0 : -a * (e - t)
    }, this.calculateContributionToDisplacements = function(e) {
        var t = this.beam.length,
            a = Math.cos(Math.PI - this.angle),
            o = Math.sin(Math.PI - this.angle),
            n = t * e,
            r = t * this.position,
            i = this.size * a,
            s = this.size * o;
        return new Array(this.u(n, r, i), this.w(n, r, s), this.fi(n, r, s))
    }, this.u = function(e, t, a) {
        var o = this.beam.length,
            n = this.beam.properties.modulusE * this.beam.properties.area,
            r = t,
            i = 0;
        return i = r > e ? a / o * e * (o - r) : a / o * r * (o - e), i / n
    }, this.w = function(e, t, a) {
        var o = this.beam.length,
            n = this.beam.shearConstant,
            r = this.beam.properties.modulusE * this.beam.properties.secondAreaMoment,
            i = t,
            s = 0;
        return s = i > e ? a / o * (2 * e * (e * e * (i - o) + i * (2 * o * o + i * (i - 3 * o))) + n * o * o * e * (o - i)) : a / o * (2 * i * (i * i * (e - o) + e * (2 * o * o + e * (e - 3 * o))) + n * o * o * i * (o - e)), s += this.localPrimaryForceVector[2] * generalDisplacementWMa(e, o), s += this.localPrimaryForceVector[5] * generalDisplacementWMb(e, o), s / 12 / r
    }, this.fi = function() {
        return 0
    }
}

function BeamContinuousLoad(e, t, a, o, n, r) {
    this.beam = e, this.size = t, this.sizeChange = a, this.position = o, this.length = n, this.angle = r, this.localPrimaryForceVector = null, this.toString = function() {
        var e = "BeamContinuousLoad(";
        return e += "beam=" + this.beam.toString() + ",", e += "size=" + this.size.toString() + ",", e += "sizeChange=" + this.sizeChange.toString() + ")", e += "position=" + this.position.toString() + ",", e += "length=" + this.length.toString() + ",", e += "angle=" + this.angle.toString() + ","
    }, this.assemblePrimaryForceVector = function() {
        var e = this.beam.length,
            t = this.beam.shearConstant,
            a = Math.cos(Math.PI - this.angle),
            o = Math.sin(Math.PI - this.angle),
            n = e * this.position,
            r = n + e * this.length,
            i = this.size * a,
            s = this.size * o,
            l = (this.size + this.sizeChange) * a,
            c = (this.size + this.sizeChange) * o,
            d = n,
            u = e - r,
            f = r - n,
            m = e * e * e;
        if (this.localPrimaryForceVector = vectorAllocate(6), this.localPrimaryForceVector[0] = -f / (2 * e) * (u * (i + l) + f / 3 * (l + 2 * i)), this.localPrimaryForceVector[3] = -f / (2 * e) * (d * (i + l) + f / 3 * (i + 2 * l)), this.beam.hinge0 || this.beam.hinge1)
            if (!this.beam.hinge0 && this.beam.hinge1) {
                var g = 5 * t * (s * (d * d * (3 * d + 6 * u + 7 * f) + u * u * (3 * d + f) + f * f * (5 * d + 2 * u + f) + 8 * d * u * f) + c * (d * d * (3 * d + 6 * u + 8 * f) + u * u * (3 * d + 2 * f) + f * f * (7 * d + 4 * u + 2 * f) + 10 * d * u * f)),
                    _ = 3 * (s * (10 * d * d * (2 * d + 3 * u + 4 * f) + f * f * (20 * d + 5 * u + 4 * f) + 20 * d * u * f) + c * (10 * d * d * (2 * d + 3 * u + 5 * f) + f * f * (40 * d + 15 * u + 11 * f) + 40 * d * u * f)),
                    h = -f / (30 * m * (4 + t)) * (g + _);
                this.localPrimaryForceVector[1] = -h - (s + c) / 2 * f, this.localPrimaryForceVector[2] = h * e + f / 2 * (d * (s + c) + f / 3 * (s + 2 * c)), this.localPrimaryForceVector[4] = h
            } else if (this.beam.hinge0 && !this.beam.hinge1) {
            var g = 5 * t * (c * (u * u * (3 * u + 6 * d + 7 * f) + d * d * (3 * u + f) + f * f * (5 * u + 2 * d + f) + 8 * u * d * f) + s * (u * u * (3 * u + 6 * d + 8 * f) + d * d * (3 * u + 2 * f) + f * f * (7 * u + 4 * d + 2 * f) + 10 * u * d * f)),
                _ = 3 * (c * (10 * u * u * (2 * u + 3 * d + 4 * f) + f * f * (20 * u + 5 * d + 4 * f) + 20 * u * d * f) + s * (10 * u * u * (2 * u + 3 * d + 5 * f) + f * f * (40 * u + 15 * d + 11 * f) + 40 * u * d * f)),
                h = -f / (30 * m * (4 + t)) * (g + _);
            this.localPrimaryForceVector[1] = h, this.localPrimaryForceVector[4] = -h - (s + c) / 2 * f, this.localPrimaryForceVector[5] = -h * e - f / 2 * (u * (s + c) + f / 3 * (c + 2 * s))
        } else this.localPrimaryForceVector[1] = -f / (2 * e) * (u * (s + c) + f / 3 * (c + 2 * s)), this.localPrimaryForceVector[4] = -f / (2 * e) * (d * (s + c) + f / 3 * (s + 2 * c));
        else {
            var g = 10 * t * (s * (d * d * (3 * d + 6 * u + 7 * f) + u * u * (3 * d + f) + f * f * (5 * d + 2 * u + f) + 8 * d * u * f) + c * (d * d * (3 * d + 6 * u + 8 * f) + u * u * (3 * d + 2 * f) + f * f * (7 * d + 4 * u + 2 * f) + 10 * d * u * f)),
                _ = 3 * (s * (10 * d * d * (d + 3 * u + 3 * f) + f * f * (15 * d + 5 * u + 3 * f) + 20 * d * u * f) + c * (10 * d * d * (d + 3 * u + 3 * f) + f * f * (25 * d + 15 * u + 7 * f) + 40 * d * u * f)),
                h = -f / (60 * m * (1 + t)) * (g + _);
            g = 5 * t * (s * (d * d * (6 * u + 4 * f) + 2 * u * u * (3 * d + f) + f * f * (5 * d + 3 * u + f) + 12 * d * u * f) + c * (2 * d * d * (3 * u + f) + u * u * (6 * d + 4 * f) + f * f * (3 * d + 5 * u + f) + 12 * d * u * f)), _ = 2 * (s * (10 * d * d * (3 * u + 2 * f) + f * f * (10 * d + 5 * u + 2 * f) + 20 * d * u * f) + c * (10 * d * d * (3 * u + f) + f * f * (10 * d + 15 * u + 3 * f) + 40 * d * u * f)), md = f / (120 * e * e * (1 + t)) * (g + _), this.localPrimaryForceVector[1] = -h - (s + c) / 2 * f, this.localPrimaryForceVector[2] = md + h * e + f / 2 * (d * (s + c) + f / 3 * (s + 2 * c)), this.localPrimaryForceVector[4] = h, this.localPrimaryForceVector[5] = -md
        }
    }, this.calculateContributionToInternalForces = function(e) {
        var t = this.beam.length,
            a = (this.beam.shearConstant, Math.cos(Math.PI - this.angle)),
            o = Math.sin(Math.PI - this.angle),
            n = t * e,
            r = t * this.position,
            i = r + t * this.length,
            s = this.size * a,
            l = this.size * o,
            c = (this.size + this.sizeChange) * a,
            d = (this.size + this.sizeChange) * o;
        return new Array(this.n(n, r, i, s, c), this.v(n, r, i, l, d), this.m(n, r, i, l, d))
    }, this.n = function(e, t, a, o, n) {
        var r;
        return r = t >= e ? 0 : a > e ? -.5 * (o + this.getQx(e, t, a, o, n)) * (e - t) : -.5 * (o + n) * (a - t)
    }, this.v = function(e, t, a, o, n) {
        var r;
        return r = t >= e ? 0 : a > e ? -.5 * (o + this.getQz(e, t, a, o, n)) * (e - t) : -.5 * (o + n) * (a - t)
    }, this.m = function(e, t, a, o, n) {
        var r;
        if (Math.abs(o + n) > 0) {
            var i = this.v(e, t, a, o, n);
            if (t >= e) r = 0;
            else if (a > e) {
                var s = this.getQz(e, t, a, o, n),
                    l = (e - t) * (o + 2 * s) / 3 / (o + s);
                r = i * (e - l - t)
            } else {
                var l = (a - t) * (o + 2 * n) / 3 / (o + n);
                r = i * (e - l - t)
            }
        } else r = 0;
        return r
    }, this.getQx = function(e, t, a, o, n) {
        var r;
        return r = t >= e ? 0 : a > e ? (e - t) * (n - o) / (a - t) + o : 0
    }, this.getQz = function(e, t, a, o, n) {
        var r;
        return r = t >= e ? 0 : a > e ? (e - t) * (n - o) / (a - t) + o : 0
    }, this.calculateContributionToDisplacements = function(e) {
        var t = this.beam.length,
            a = Math.cos(Math.PI - this.angle),
            o = Math.sin(Math.PI - this.angle),
            n = t * e,
            r = t * this.position,
            i = r + t * this.length,
            s = this.size * a,
            l = this.size * o,
            c = (this.size + this.sizeChange) * a,
            d = (this.size + this.sizeChange) * o;
        return new Array(this.u(n, r, i, s, c), this.w(n, r, i, l, d), this.fi(n, r, i, l, d))
    }, this.u = function(e, t, a, o, n) {
        var r = this.beam.length,
            i = this.beam.properties.modulusE * this.beam.properties.area,
            s = o + n,
            l = o,
            c = t,
            d = a - t,
            u = e * e,
            f = c * c,
            m = d * d,
            g = f * c,
            _ = 0;
        return _ = c > e ? -d * e * (3 * c * s + d * (2 * s - l) - 3 * r * s) : c + d > e ? -1 / d * (g * r * (2 * l - s) + 3 * f * r * (d * l - e * (2 * l - s)) + 3 * c * e * (e * r * (2 * l - s) + d * (d * s - 2 * r * l)) - e * (u * r * (2 * l - s) - 3 * e * d * r * l + m * (d * (l - 2 * s) + 3 * r * s))) : d * (r - e) * (3 * c * s + d * (2 * s - l)), _ / 6 / r / i
    }, this.w = function(e, t, a, o, n) {
        var r = this.beam.length,
            i = (this.beam.shearConstant, this.beam.properties.modulusE * this.beam.properties.secondAreaMoment),
            s = this.beam.properties.modulusG * this.beam.properties.shearArea,
            l = o + n,
            c = o,
            d = t,
            u = r - a,
            f = a - t,
            m = e * e,
            g = r * r,
            _ = d * d,
            h = u * u,
            v = f * f,
            p = m * e,
            y = g * r,
            b = _ * d,
            $ = v * f,
            S = p * e,
            w = b * d,
            x = $ * f,
            T = w * d,
            M = x * f,
            A = 0;
        if (d > e) {
            var D = f * e * (10 * _ * (3 * u * l + f * (c + l)) + 20 * d * (3 * h * l + u * f * (c + 4 * l) + v * (c + l)) + 20 * h * f * (2 * l - c) - 5 * u * (v * (2 * c - 7 * l) + 6 * l * m) + f * (v * (c + 7 * l) - 10 * m * (c + l))),
                L = -f * e * (3 * d * l + f * (2 * l - c) - 3 * r * l);
            A = (D / 360 / i + L / 6 / s) / r
        } else if (d + f > e) {
            var D = 1 / f * (3 * T * r * (2 * c - l) + 15 * w * r * (f * c - e * (2 * c - l)) + 30 * b * e * (v * l - 2 * f * r * c + r * e * (2 * c - l)) - 30 * _ * e * ($ * (c - 2 * l) + 3 * v * r * l - 3 * f * r * c * e + r * m * (2 * c - l)) - 15 * d * e * (x * (2 * c - 3 * l) + 4 * $ * r * (2 * l - c) - 6 * v * g * l + 4 * f * r * c * m + r * p * (l - 2 * c)) + e * (30 * u * v * l * (r * r - m) + 3 * M * (4 * l - 3 * c) + 15 * x * r * (2 * c - 3 * l) - 10 * $ * (g * (2 * c - 7 * l) + m * (c + l)) - 30 * v * y * l + 15 * f * r * c * p + 3 * r * S * (l - 2 * c))),
                L = -1 / f * (b * r * (2 * c - l) + 3 * _ * r * (f * c - e * (2 * c - l)) + 3 * d * e * (e * r * (2 * c - l) + f * (f * l - 2 * r * c)) - e * (m * r * (2 * c - l) - 3 * e * f * r * c + v * (f * (c - 2 * l) + 3 * r * l)));
            A = (D / 360 / i + L / 6 / s) / r
        } else {
            var D = -f * (30 * b * l * (r - e) + 30 * _ * f * (r - e) * (2 * l - c) + 15 * d * (e - r) * (v * (2 * c - 3 * l) + 6 * r * l * e) + 30 * u * l * e * (m - g) + 3 * $ * (r - e) * (4 * l - 3 * c) + 10 * f * e * (g * (2 * c - 7 * l) + 3 * r * e * (2 * l - c) + m * (c + l)) + 30 * r * l * e * (g - m)),
                L = f * (r - e) * (3 * d * l + f * (2 * l - c));
            A = (D / 360 / i + L / 6 / s) / r
        }
        return A += this.localPrimaryForceVector[2] * generalDisplacementWMa(e, r) / 12 / i, A += this.localPrimaryForceVector[5] * generalDisplacementWMb(e, r) / 12 / i
    }, this.fi = function() {
        return 0
    }
}

function BeamMomentLoad(e, t, a) {
    this.beam = e, this.size = t, this.position = a, this.localPrimaryForceVector = null, this.toString = function() {
        var e = "BeamMomentLoad(";
        return e += "beam=" + this.beam.toString() + ",", e += "size=" + this.size.toString() + ",", e += "position=" + this.position.toString() + ","
    }, this.assemblePrimaryForceVector = function() {
        var e = this.beam.length,
            t = this.beam.shearConstant,
            a = e * this.position,
            o = this.size,
            n = a,
            r = e - n,
            i = e * e * e;
        this.localPrimaryForceVector = vectorAllocate(6), this.beam.hinge0 || this.beam.hinge1 ? !this.beam.hinge0 && this.beam.hinge1 ? (this.localPrimaryForceVector[1] = -6 * o * n / (i * (4 + t)) * (n + 2 * r), this.localPrimaryForceVector[2] = -o / (e * e * (4 + t)) * (e * e * t - 2 * (e * e - 3 * r * r)), this.localPrimaryForceVector[4] = 6 * o * n / (i * (4 + t)) * (n + 2 * r)) : this.beam.hinge0 && !this.beam.hinge1 ? (this.localPrimaryForceVector[1] = -6 * o * r / (i * (4 + t)) * (r + 2 * n), this.localPrimaryForceVector[4] = 6 * o * r / (i * (4 + t)) * (r + 2 * n), this.localPrimaryForceVector[5] = -o / (e * e * (4 + t)) * (e * e * t - 2 * (e * e - 3 * n * n))) : (this.localPrimaryForceVector[1] = -o / e, this.localPrimaryForceVector[4] = o / e) : (this.localPrimaryForceVector[1] = -6 * o * n * r / (i * (1 + t)), this.localPrimaryForceVector[2] = o * r / (e * e * (1 + t)) * (2 * n - t * e - r), this.localPrimaryForceVector[4] = 6 * o * n * r / (i * (1 + t)), this.localPrimaryForceVector[5] = o * n / (e * e * (1 + t)) * (2 * r - t * e - n))
    }, this.calculateContributionToInternalForces = function(e) {
        var t = this.beam.length,
            a = (this.beam.shearConstant, t * e),
            o = t * this.position;
        return new Array(0, 0, this.m(a, o, this.size))
    }, this.m = function(e, t, a) {
        var o;
        return o = t >= e ? 0 : -a
    }, this.calculateContributionToDisplacements = function(e) {
        var t = this.beam.length,
            a = t * e,
            o = t * this.position;
        return new Array(this.u(a, o, this.size), this.w(a, o, this.size), this.fi(a, o, this.size))
    }, this.u = function() {
        return 0
    }, this.w = function(e, t, a) {
        var o = this.beam.length,
            n = this.beam.properties.modulusE * this.beam.properties.secondAreaMoment;
        return ad = t, wd = e < ad ? a / o * e * 2 * (6 * ad * o - 3 * ad * ad - 2 * o * o - e * e) : a / o * 2 * (3 * ad * ad * o - e * (3 * ad * ad + 2 * o * o - e * (3 * o - e))), wd += this.localPrimaryForceVector[2] * generalDisplacementWMa(e, o), wd += this.localPrimaryForceVector[5] * generalDisplacementWMb(e, o), wd / 12 / n
    }, this.fi = function() {
        return 0
    }
}

function generateHTML(e) {
    if (!(e instanceof Model)) throw new IllegalArgumentException;
    for (var t = "<TABLE border='1'>", a = 0; a < e.nodes.length; a++) t += generateNodeResult(e.nodes[a], e);
    return t += "</TABLE>"
}

function generateNodeResult(e, t) {
    var a = t.nodes.indexOf(e),
        o = "<TR><TD>NODE</TD><TD>" + a + "</TD></TR>";
    o += "<TR><TD></TD><TD>coordX</TD><TD>" + e.x + "</TD></TR>", o += "<TR><TD></TD><TD>coordZ</TD><TD>" + e.x + "</TD></TR>", o += "<TR><TD></TD><TD>restraintX</TD><TD>" + e.restraints[0] + "</TD></TR>", o += "<TR><TD></TD><TD>restraintZ</TD><TD>" + e.restraints[1] + "</TD></TR>", o += "<TR><TD></TD><TD>restraintR</TD><TD>" + e.restraints[2] + "</TD></TR>";
    var n = t.assembleNodeDisplacementVector(e);
    o += "<TR><TD></TD><TD>u</TD><TD>" + n[0] + "</TD></TR>", o += "<TR><TD></TD><TD>w</TD><TD>" + n[1] + "</TD></TR>", o += "<TR><TD></TD><TD>fi</TD><TD>" + n[2] + "</TD></TR>";
    var r = t.assembleNodeReactionVector(e);
    return o += "<TR><TD></TD><TD>reactionX</TD><TD>" + r[0] + "</TD></TR>", o += "<TR><TD></TD><TD>reactionZ</TD><TD>" + r[1] + "</TD></TR>", o += "<TR><TD></TD><TD>reactionM</TD><TD>" + r[2] + "</TD></TR>"
}

function preCheck(e) {
    for (var t = new Array(0, 0, 0), a = 0; a < e.nodes.length; a++)
        for (var o = 0; 3 > o; o++) t[o] += e.nodes[a].restraints[o];
    console.log("restraintCounts=" + t);
    for (var n = t[0] + t[1] + t[2], r = 0, a = 0; a < e.beams.length; a++) e.beams[a].hinge0 && r++, e.beams[a].hinge1 && r++;
    console.log("hingeCount=" + r);
    for (var i = 0, a = 0; a < e.nodes.length; a++) e.isNodeRotationFree(e.nodes[a]) && i++;
    console.log("rotationFreeNodeCount=" + i), 0 == t[0] && solver_log("warning", "MODEL_NOT_RESTRAINED_X"), 0 == t[1] && solver_log("warning", "MODEL_NOT_RESTRAINED_Z"), 3 > n && solver_log("error", "MODEL_NOT_ENOUGH_RESTRAINTS"), r - i > 0 && 3 > n - r + i && solver_log("warning", "MODEL_PROBABLY_NOT_ENOUGH_RESTRAINTS")
}

function checkProperties(e) {
    for (var t = 0; t < e.beams.length; t++) {
        var a = e.beams[t].properties;
        a.height < 0 ? solver_log("error", "BEAM_ILLEGAL_HEIGHT", t) : 0 == a.height ? solver_log("warning", "BEAM_ZERO_HEIGHT", t) : a.area < 0 ? solver_log("error", "BEAM_ILLEGAL_AREA", t) : 0 == a.area ? solver_log("warning", "BEAM_ZERO_AREA", t) : a.shearArea < 0 ? solver_log("error", "BEAM_ILLEGAL_SHEAR_AREA", t) : 0 == a.shearArea ? solver_log("warning", "BEAM_ZERO_SHEAR_AREA", t) : a.secondAreaMoment < 0 ? solver_log("error", "BEAM_ILLEGAL_SECOND_MOMENT", t) : 0 == a.secondAreaMoment ? solver_log("warning", "BEAM_ZERO_SECOND_MOMENT", t) : a.modulusE < 0 ? solver_log("error", "BEAM_ILLEGAL_ELASTICITY", t) : 0 == a.modulusE ? solver_log("warning", "BEAM_ZERO_ELASTICITY", t) : a.modulusG < 0 ? solver_log("error", "BEAM_ILLEGAL_SHEAR_ELASTICITY", t) : 0 == a.modulusG ? solver_log("warning", "BEAM_ZERO_SHEAR_ELASTICITY", t) : a.transversalContractionCoef < 0 ? solver_log("error", "BEAM_ILLEGAL_TRANS_COEF", t) : a.thermalExpansionCoef < 0 && solver_log("error", "BEAM_ILLEGAL_THERM_COEF", t)
    }
}

function postCheck(e) {
    for (var t = !1, a = 0, o = 0, n = 0; n < e.displacementVector.length; n++) {
        var r = e.displacementVector[n];
        r != r && (t = !0), n % 3 == 2 ? Math.abs(o) < Math.abs(r) && (o = r) : Math.abs(a) < Math.abs(r) && (a = r)
    }
    console.log("isThereNaN=" + t), console.log("extremeTranslation=" + a), console.log("extremeRotation=" + o), t && solver_log("error", "MODEL_UNSOLVABLE"), Math.abs(a) > 100 ? solver_log("error", "EXTREME_TRANSLATION", a) : Math.abs(a) > .1 && solver_log("warning", "EXTREME_TRANSLATION", a), Math.abs(o) > .7 ? solver_log("error", "EXTREME_ROTATION", o) : Math.abs(o) > .1 && solver_log("warning", "EXTREME_ROTATION", o)
}

function roundTextValue(e, t) {
    var a = null;
    return a = "N" === t ? Math.round(100 * e) / 100 : Math.round(100 * Math.abs(e)) / 100
}

function roundTextValueReactionM(e) {
    var t = null;
    if (canvas.flagImperialUnits) {
        e = kNewtonMs2kipsFt(e);
        var a = Math.round(Math.abs(e)) >= 1e3;
        t = a ? Math.round(Math.abs(e)) : Math.round(Math.abs(100 * e)) / 100, t += " kip.ft"
    } else {
        var a = Math.round(Math.abs(1e3 * e) >= 1e3);
        t = a ? Math.round(100 * Math.abs(e)) / 100 : Math.round(1e3 * Math.abs(e)), t += a ? " kNm" : " Nm"
    }
    return t
}

function roundTextValueReactionF(e) {
    var t = null;
    if (canvas.flagImperialUnits) {
        e = kNewtons2kips(e);
        var a = Math.round(Math.abs(e)) >= 1e3;
        t = a ? Math.round(Math.abs(e)) : Math.round(Math.abs(100 * e)) / 100, t += " kip"
    } else {
        var a = Math.round(Math.abs(1e3 * e)) >= 1e3;
        t = a ? Math.round(100 * Math.abs(e)) / 100 : Math.round(1e3 * Math.abs(e)), t += a ? " kN" : " N"
    }
    return t
}

function textBoundingRect(e, t) {
    var a = null,
        o = e.find("text")[0];
    if (o) {
        var n = $(o).css("display"),
            r = !0;
        "none" === n && ($(o).css("display", "block"), r = !1);
        var i = $(o).position(),
            s = i.top - canvas.offsetY,
            l = i.left;
        s *= defaultZoom / canvas.zoom * getImperialZoomFix_1(), l *= defaultZoom / canvas.zoom * getImperialZoomFix_1();
        var c = o.getAttribute("_x"),
            d = o.getAttribute("_y"),
            u = o,
            f = u.scrollHeight || $(u).height(),
            m = u.scrollWidth || $(u).width();
        if (0 === parseFloat(f) || 0 === parseFloat(m)) {
            var g = u.getBoundingClientRect(),
                _ = defaultZoom / canvas.zoom;
            f = g.height * _, m = g.width * _
        }
        r === !1 && $(o).css("display", "none"), f = _round2(f * getImperialZoomFix_1()), m = _round2(m * getImperialZoomFix_1());
        var h = canvas.svg.rect(m, f).move(l, s).attr("class", "descDiagram").rotate(t, c, d);
        e.find("rect.descDiagram").remove(), e[0].instance.add(h), $(h.node).insertBefore(o), a = $(h.node)
    }
    return a
}

function getSizeOfStructure() {
    for (var e = $("#sti_span_nodes > rect"), t = 0, a = 0; a < e.length; a++)
        for (var o = e[a], n = 0; n < e.length; n++) {
            var r = e[n];
            if (a === n);
            else {
                var i = o.getAttribute("_x"),
                    s = o.getAttribute("_y"),
                    l = r.getAttribute("_x"),
                    c = r.getAttribute("_y"),
                    d = dist(i, s, l, c);
                d > t && (t = d)
            }
        }
    return t
}

function drawDeflectedNode(e, t, a, o, n) {
    var r = _nodeSize(),
        i = canvas.svg.rect(2 * r, 2 * r);
    i.move(a - r, o - r).attr("class", "nodeDeflected").attr("parentId", n).attr("_x", a).attr("_y", o), canvas.spanDeformGroup.add(i)
}

function addSliceToArray(e, t, a) {
    for (var o = !1, n = _round(t), r = 0; r < e.length; r++) {
        var i = _round(e[r]);
        if (i === n) {
            o = !0;
            break
        }
    }
    return o || (a ? (e.push(t - 1e-5), e.push(t + 1e-5)) : e.push(n)), e
}

function cBeamSlice(e) {
    this.id = e, this.slices = [], this.slicesAll = []
}

function cBeamSlicesCache() {
    this.beams = [], this.getSlicesOnBeam = function(e, t) {
        for (var a = null, o = e.getAttribute("id"), n = 0; n < this.beams.length; n++)
            if (o === this.beams[n].id) {
                a = t ? this.beams[n].slicesAll : this.beams[n].slices;
                break
            }
        if (null === a) {
            var r = _getSlicesOnBeam(e, t);
            null !== r && (this.beams.push(r), a = t ? r.slicesAll : r.slices)
        }
        return a
    }, this.clean = function() {
        for (var e = 0; e < this.beams.length; e++) delete this.beams[e];
        this.beams = []
    }
}

function getLargestDistance() {
    for (var e = $("#sti_span line"), t = 0, a = 0; a < e.length; a++) {
        var o = $(e[a]),
            n = o.attr("x1"),
            r = o.attr("x2"),
            i = o.attr("y1"),
            s = o.attr("y2"),
            l = dist(n, i, r, s);
        l > t && (t = l)
    }
    return t
}

function _getSlicesOnBeam(e) {
    var t = 10,
        a = $("#sti_loads > g"),
        o = [],
        n = e.getAttribute("id"),
        r = new cBeamSlice(n),
        i = e.getAttribute("x1"),
        s = e.getAttribute("y1"),
        l = e.getAttribute("x2"),
        c = e.getAttribute("y2"),
        d = dist(i, s, l, c);
    a.each(function() {
        var e = this.getAttribute("_type"),
            t = this.getAttribute("parentId");
        if (n === t)
            if ("force" === e || "moment" === e) {
                var a = this.getAttribute("_x"),
                    r = this.getAttribute("_y"),
                    l = dist(i, s, a, r),
                    c = !0;
                addSliceToArray(o, l / d, c)
            } else if ("uniform" === e) {
            var u = $(this).children("use"),
                f = u.length,
                m = null,
                g = null;
            f >= 2 && (m = u[0], g = u[f - 1]);
            var _ = m.getAttribute("_x"),
                h = m.getAttribute("_y"),
                v = g.getAttribute("_x"),
                p = g.getAttribute("_y"),
                y = dist(i, s, _, h),
                b = dist(i, s, v, p);
            addSliceToArray(o, y / d, !1), addSliceToArray(o, b / d, !1)
        } else console.log("getSlicesOnBeam() error: unexpected type")
    }), o.sort(function(e, t) {
        return e - t
    });
    for (var u = o.slice(0), f = 0; t >= f; f++) {
        var m = f / t,
            g = !1;
        addSliceToArray(u, m, g)
    }
    for (var _ = getHashDistance(), h = Math.floor(d / _), v = h * _, p = (d - v) / 2, y = p; d >= y; y += _) {
        var m = y / d,
            g = !1;
        addSliceToArray(u, m, g)
    }
    return u.sort(function(e, t) {
        return e - t
    }), r.slices = o, r.slicesAll = u, r
}

function getSlicesOnBeam(e, t) {
    return BeamSlicesCache.getSlicesOnBeam(e, t)
}

function cleanSlicesOnBeams() {
    BeamSlicesCache.clean(), BeamCache.clean()
}

function drawDeformedBeam(e, t, a) {
    var o = e.getAttribute("id"),
        n = null,
        r = null,
        i = 0,
        s = null !== a && isFinite(a),
        l = null;
    s && (l = canvas.svg.group(), canvas.spanDeformGroup.add(l));
    for (var c = 0; c < t.length; c++) {
        var d = t[c],
            u = _round(e.getAttribute("x1")),
            f = _round(e.getAttribute("y1")),
            m = _round(e.getAttribute("x2")),
            g = _round(e.getAttribute("y2")),
            _ = u + d * (m - u),
            h = f + d * (g - f),
            v = getTestingBeamByDomId(o, g_interfBeams),
            p = v.globalDisplacement(d, _model);
        canvas.flagImperialUnits ? (p[0] *= 1e3 * (1e3 / 25.4), p[1] *= 1e3 * (1e3 / 25.4)) : (p[0] *= 1e3, p[1] *= 1e3);
        var y = Math.abs(Math.sqrt(p[0] * p[0] + p[1] * p[1]));
        y > i && (i = y);
        var b = _ + p[0] * a,
            $ = h + p[1] * a;
        if (s) {
            var S = "d",
                w = [p, d],
                x = !1;
            if (null !== n) {
                var T = canvas.svg.line(n, r, b, $).attr("class", "deflected");
                l.add(T)
            }(Math.abs(p[0] * a) > 1e-8 || Math.abs(p[1] * a) > 1e-8) && drawInteractiveValue(S, e, w, x, a)
        }
        n = b, r = $
    }
    return i
}

function fixDiagramDescToZoom(e, t, a, o) {
    var n = $(e).find("text")[0].instance,
        r = 180 * t / Math.PI - 90;
    0 > r && (r += 360);
    var i = getShiftY("coordDrawn"),
        s = 0;
    r >= 90 && 270 > r ? (s = -2 * i, n.font({
        anchor: "end"
    }), r -= 180) : (n.font({
        anchor: "start"
    }), s = 2 * i);
    var l = n.attr("_x"),
        c = n.attr("_y");
    n.translate(l + s, c + i), o && (a || (n.rotate(0), textBoundingRect($(e), r))), n.rotate(r, l, c)
}

function inactivateDiagramDesc(e) {
    if (e.length) {
        var t = $("#rect_mouseOverDiagram"),
            a = t.length > 0 ? t[0].instance : void 0,
            o = $("#text_mouseOverDiagram")[0].instance;
        void 0 != a && (e[0].instance.add(a), $(a.node).css("display", "none").removeAttr("id")), e[0].instance.add(o), $(o.node).css("display", "none").removeAttr("id"), e.find(".pointOnDiagram.pointOnDiagramHighlighted")[0].instance.removeClass("pointOnDiagramHighlighted"), e.removeAttr("id")
    }
}

function _mouseOverDiagram(e, t) {
    var a = e.attr("id"),
        o = e.attr("_type");
    "d" === o && (o = "span_deform"), t && $("#sti_" + o).find("text").each(function() {
        var n = $(this)[0].getAttribute("parentId");
        if (a === n) {
            t ? e.addClass("pointOnDiagramHighlighted") : e.removeClass("pointOnDiagramHighlighted"), $(this).css("display", "block").attr("id", "text_mouseOverDiagram");
            var r = $(this).parent().find("rect.descDiagram");
            if (0 === r.length) {
                var i = $(this).attr("_angle");
                angleToRotate = 180 * i / Math.PI - 90, angleToRotate < 0 && (angleToRotate += 360), angleToRotate >= 90 && angleToRotate < 270 && (angleToRotate -= 180);
                var s = $(this)[0].instance,
                    l = s.attr("_x"),
                    c = s.attr("_y");
                s.rotate(0), r = textBoundingRect($(this).parent(), angleToRotate), s.rotate(angleToRotate, l, c)
            }
            return r && r.css("display", "block").attr("id", "rect_mouseOverDiagram"), $(this).parent().attr("id", "_mouseOverDiagram"), $(this).parent().attr("_type", o), !1
        }
    });
    var n = $("#_mouseOverDiagram");
    if (t) {
        if (n.length > 0) {
            var r = $("#rect_mouseOverDiagram"),
                i = r.length > 0 ? r[0].instance : void 0;
            void 0 != i && canvas.auxiliary.add(i), canvas.auxiliary.add($("#text_mouseOverDiagram")[0].instance)
        }
    } else inactivateDiagramDesc(n)
}

function mouseOverDiagram() {
    if (!canvas.lineBeingDrawn) {
        console.log("mouseOverDiagram");
        var e = !0;
        _mouseOverDiagram(this, e)
    }
}

function mouseOutDiagram() {
    var e = !1;
    _mouseOverDiagram(this, e)
}

function drawInteractiveValue(e, t, a, o, n) {
    var r = drawValueI(e, t, a, o, n);
    if (r) {
        var i = $(r.node).find("text")[0].instance,
            s = $(r.node).find("rect.descDiagram"),
            l = s.length > 0 ? s[0].instance : void 0,
            c = i.attr("_x"),
            d = i.attr("_y"),
            u = a[0],
            f = _nodeSize(),
            m = canvas.M;
        i.style("display", "none"), void 0 != l && l.style("display", "none"), "N" === e ? m = canvas.N : "V" === e ? m = canvas.V : "d" === e && (m = canvas.spanDeformGroup);
        var g = "d" === e && (1 == a[1] || 0 == a[1]),
            _ = null;
        _ = g ? canvas.svg.rect(2 * f, 2 * f).attr("_x", c).attr("_y", d) : canvas.svg.circle(2 * f), _.move(c - f, d - f).attr("value", u).attr("class", "pointOnDiagram").attr("_type", e), i.attr("parentId", _.attr("id")), _.on("mouseover", mouseOverDiagram), _.on("mouseout", mouseOutDiagram), r.add(_), m.add(r)
    }
}

function cBeamCachedValue(e) {
    this.id = e.getAttribute("id"), this.xStartBeam = _round(e.getAttribute("x1")), this.yStartBeam = _round(e.getAttribute("y1")), this.xEndBeam = _round(e.getAttribute("x2")), this.yEndBeam = _round(e.getAttribute("y2")), this.angle = convertToAngle(this.xStartBeam, this.xEndBeam, this.yStartBeam, this.yEndBeam), this.beamLength = dist(this.xStartBeam, this.yStartBeam, this.xEndBeam, this.yEndBeam)
}

function cBeamCachedValues() {
    this.beams = [], this.getValues = function(e) {
        for (var t = null, a = e.getAttribute("id"), o = 0; o < this.beams.length; o++)
            if (a === this.beams[o].id) {
                t = this.beams[o];
                break
            }
        return null === t && (t = new cBeamCachedValue(e), this.beams.push(t)), t
    }, this.clean = function() {
        for (var e = 0; e < this.beams.length; e++) delete this.beams[e];
        this.beams = []
    }
}

function _drawValueDeform(e, t, a, o) {
    var n = BeamCache.getValues(t),
        r = n.xStartBeam,
        i = n.yStartBeam,
        s = (n.xEndBeam, n.yEndBeam, n.angle),
        l = n.beamLength,
        c = a[1],
        d = a[0][0],
        u = a[0][1],
        f = r + l * c * Math.sin(s),
        m = i - l * c * Math.cos(s),
        g = _round(f + o * d),
        _ = _round(m + o * u),
        h = a[0][0],
        v = a[0][1];
    h = h.toExponential(2), v = v.toExponential(2);
    var p = h + ", " + v,
        y = null,
        b = Math.PI / 2,
        S = $("#sti_span_deform > g > text[_x='" + g + "'][_y='" + _ + "']");
    if (0 === S.length) {
        var w = establishDescText(p.toString()).attr("_x", g).attr("_y", _).attr("_angle", b).attr("class", "descDeform"),
            y = canvas.svg.group();
        y.add(w);
        var x = !0,
            T = !1;
        fixDiagramDescToZoom(y.node, b, x, T)
    }
    return y
}

function _drawValue(e, t, a, o, n, r) {
    var i = 2;
    "N" === e ? i = 0 : "V" === e && (i = 1);
    var s = BeamCache.getValues(t),
        l = s.xStartBeam,
        c = s.yStartBeam,
        d = (s.xEndBeam, s.yEndBeam, s.angle),
        u = s.beamLength,
        f = a[1],
        m = a[0],
        g = l + u * f * Math.sin(d),
        _ = c - u * f * Math.cos(d),
        h = g + n * m * Math.cos(d),
        v = _ + n * m * Math.sin(d),
        d = convertToAngle(g, h, _, v),
        p = roundTextValue(m, e),
        y = canvas.svg.group(),
        b = establishDescText(p.toString()).attr("_x", h).attr("_y", v).attr("_angle", d);
    y.add(b);
    var $ = !0;
    return fixDiagramDescToZoom(y.node, d, $, r), y
}

function drawValueI(e, t, a, o, n) {
    var r = null;
    if ("d" === e) r = _drawValueDeform(e, t, a, n);
    else {
        var i = !1;
        r = _drawValue(e, t, a, o, n, i)
    }
    return r
}

function drawValue(e, t, a, o, n) {
    var r = null;
    if ("d" === e) r = _drawValueDeform(e, t, a, n);
    else {
        var i = !0;
        r = _drawValue(e, t, a, o, n, i)
    }
    return r
}

function drawV(e, t, a, o) {
    var n = "V";
    return drawNVM(n, e, t, a, o)
}

function drawN(e, t, a, o) {
    var n = "N";
    return drawNVM(n, e, t, a, o)
}

function drawM(e, t, a, o) {
    var n = "M";
    return drawNVM(n, e, t, a, o)
}

function getHashDistance() {
    var e = 15,
        t = getLargestDistance();
    return t && (e = Math.round(e * Math.sqrt(t / 10 / e))), e
}

function drawNVM(e, t, a, o, n) {
    var r = t.getAttribute("id"),
        i = null,
        s = null,
        l = "momentShape",
        c = 2,
        d = canvas.M;
    "N" === e ? (l = "normalShape", d = canvas.N, c = 0) : "V" === e && (d = canvas.V, l = "shearShape", c = 1);
    var u = 0,
        f = _round(t.getAttribute("x1")),
        m = _round(t.getAttribute("y1")),
        g = _round(t.getAttribute("x2")),
        _ = _round(t.getAttribute("y2")),
        h = convertToAngle(f, g, m, _),
        v = [],
        p = [],
        y = [],
        b = [],
        $ = getHashDistance(),
        S = !1,
        w = getSlicesOnBeam(t, S),
        x = [],
        T = null,
        M = null;
    null !== o && isFinite(o) && (T = canvas.svg.group(), M = canvas.svg.group(), d.add(M), d.add(T));
    for (var A = 0; A < a.length; A++) {
        var D = a[A],
            L = f + D * (g - f),
            F = m + D * (_ - m),
            I = getTestingBeamByDomId(r, g_interfBeams);
        if (I) {
            var k = I.calculateInternalForces(D, _model),
                B = k[c];
            if ("V" === e && (B = -B), canvas.flagImperialUnits && (B = "N" === e || "V" === e ? kNewtons2kips(B) : kNewtons2kips(B) * m2ft(1)), Math.abs(B) < canvas.gauge && (B = 0), n && (B = -B), null !== o && isFinite(o)) {
                (0 === p.length || B > p[0]) && (p = [B, D]), (0 === v.length || B < v[0]) && (v = [B, D]), 0 === A && 0 != B && (y = [B, D], x.push([B, D])), A === a.length - 1 && 0 != B && (b = [B, D], x.push([B, D]));
                for (var C = 0; C < w.length; C++) D === w[C] && 0 != B && x.push([B, D])
            }
            if (null === o) {
                var N = Math.abs(B);
                N > u && (u = N)
            } else if (isFinite(o)) {
                var O = L + o * B * Math.cos(h),
                    z = F + o * B * Math.sin(h);
                if (null !== i) {
                    var R = canvas.svg.line(i, s, O, z).attr("class", l);
                    T.add(R)
                } else {
                    var R = canvas.svg.line(f, m, O, z).attr("class", l);
                    T.add(R)
                }
                if (i = O, s = z, A === a.length - 1) {
                    var R = canvas.svg.line(i, s, g, _).attr("class", l);
                    T.add(R)
                }
            }
        }
    }
    if (null !== o && isFinite(o)) {
        for (var P = dist(f, m, g, _), E = Math.floor(P / $), V = E * $, Z = (P - V) / 2, U = Z; P >= U; U += $) {
            var L = f + U * Math.sin(h),
                F = m - U * Math.cos(h),
                D = (U - 0) / P,
                I = getTestingBeamByDomId(r, g_interfBeams),
                k = I.calculateInternalForces(D, _model),
                B = k[c];
            if ("V" === e && (B = -B), canvas.flagImperialUnits && (B = "N" === e || "V" === e ? kNewtons2kips(B) : kNewtons2kips(B) * m2ft(1)), n && (B = -B), null === o) {
                var N = Math.abs(B);
                N > u && (u = N)
            } else {
                var O = L + o * B * Math.cos(h),
                    z = F + o * B * Math.sin(h),
                    R = canvas.svg.line(L, F, O, z).attr("class", l + " ordinate");
                M.add(R), x.push([B, D])
            }
        }
        for (var C = 0; C < x.length; C++) {
            for (var I = getTestingBeamByDomId(r, g_interfBeams), G = x[C], Y = !1, H = 0; C > H; H++) {
                var X = x[H];
                if (X[1] === G[1]) {
                    Y = !0;
                    break
                }
            }
            Y || drawInteractiveValue(e, t, G, n, o)
        }
        if (b.length > 0) {
            var j = drawValue(e, t, b, n, o);
            j && d.add(j)
        }
        if (y.length > 0) {
            var j = drawValue(e, t, y, n, o);
            j && d.add(j)
        }
        if (v.length > 0 && _round(v[0]) !== _round(y[0]) && _round(v[0]) !== _round(b[0]))
            if (0 !== v[0] || 0 !== v[1] && 1 !== v[1]) {
                var j = drawValue(e, t, v, n, o);
                j && d.add(j)
            } else;
        if (p.length > 0 && _round(p[0]) !== _round(y[0]) && _round(p[0]) !== _round(b[0]))
            if (0 !== p[0] || 0 !== p[1] && 1 !== p[1]) {
                var j = drawValue(e, t, p, n, o);
                j && d.add(j)
            } else;
    }
    return u
}

function _redrawResult(e, t, a) {
    $("#sti_" + t + " *").remove(), $("#sti_" + t + " *").remove(), $("#sti_" + t + " *").remove();
    var o = drawM;
    "N" === t ? o = drawN : "V" === t && (o = drawV);
    var n = getSizeOfStructure(),
        r = 0,
        i = $("#sti_span line.span");
    i.each(function() {
        var e = !0,
            t = getSlicesOnBeam(this, e),
            n = o(this, t, null, a);
        n > r && (r = n)
    });
    var s = .1 * n,
        l = e * s / r;
    i.each(function() {
        var e = !0,
            t = getSlicesOnBeam(this, e);
        o(this, t, l, a)
    })
}

function redrawRectangles(e) {
    var t = $(e).css("display");
    $(e).css("display", "block"), $(e + " > g").each(function() {
        var e = $(this).find("text");
        if (e.length > 0) {
            var t = $(this).find("circle");
            if (!t.length) {
                e[0].instance.rotate(0);
                var a = e[0].instance.attr("_angle"),
                    o = 180 * a / Math.PI - 90;
                0 > o && (o += 360), o >= 90 && 270 > o && (o -= 180), textBoundingRect($(this), o), e[0].instance.rotate(o)
            }
        }
    }), $(e).css("display", t)
}

function _redrawResultM(e, t) {
    _redrawResult(e, "M", t), setTimeout(function() {
        redrawRectangles("#sti_M")
    }, 0)
}

function _redrawResultV(e) {
    var t = !1;
    _redrawResult(e, "V", t), setTimeout(function() {
        redrawRectangles("#sti_V")
    }, 0)
}

function _redrawResultN(e) {
    var t = !1;
    _redrawResult(e, "N", t), setTimeout(function() {
        redrawRectangles("#sti_N")
    }, 0)
}

function _redrawResultDeform(e) {
    var t = getSizeOfStructure(),
        a = 0;
    $("#sti_span_deform *").remove();
    for (var o = 0; o < g_interfNodes.length; o++) {
        var n = g_interfNodes[o].id,
            r = _model.assembleNodeDisplacementVector(g_interfNodes[o].node),
            i = $("#sti_span_nodes > rect[id=" + n + "]"),
            s = r[1],
            l = r[0],
            c = dist(0, 0, s, l);
        c > a && (a = c)
    }
    var d = $("#sti_span line.span");
    if (d.each(function() {
            var e = !0,
                t = getSlicesOnBeam(this, e),
                o = null,
                n = drawDeformedBeam(this, t, o);
            n > a && (a = n)
        }), a > 0)
        for (var u = .1 * t, f = e * u / a, o = 0; o < g_interfNodes.length; o++) {
            var n = g_interfNodes[o].id,
                r = _model.assembleNodeDisplacementVector(g_interfNodes[o].node),
                i = $("#sti_span_nodes > rect[id=" + n + "]"),
                m = parseFloat(i[0].getAttribute("_x")),
                g = parseFloat(i[0].getAttribute("_y")),
                _ = parseFloat(i[0].getAttribute("parentId"));
            canvas.flagImperialUnits ? (r[0] *= 1e3 * (1e3 / 25.4), r[1] *= 1e3 * (1e3 / 25.4)) : (r[0] *= 1e3, r[1] *= 1e3);
            var h = m + r[0] * f,
                v = g + r[1] * f;
            drawDeflectedNode(m, g, h, v, _)
        }
    var d = $("#sti_span line.span");
    d.each(function() {
        var e = !0,
            t = getSlicesOnBeam(this, e);
        drawDeformedBeam(this, t, f)
    })
}

function redrawResult(e) {
    _model = e, $("#form_view_scale_d").attr("zoom", "1"), $("#form_view_scale_M").attr("zoom", "1"), $("#form_view_scale_V").attr("zoom", "1"), $("#form_view_scale_N").attr("zoom", "1"), $("#form_view_scale_d").val("1"), $("#form_view_scale_M").val("1"), $("#form_view_scale_V").val("1"), $("#form_view_scale_N").val("1");
    var t = 1;
    _redrawResultDeform(t), canvas.showMomentDiagramRevers = $("#form_view_on_M_reverse").prop("checked"), _redrawResultM(t, canvas.showMomentDiagramRevers), _redrawResultV(t), _redrawResultN(t)
}

function _getAngleForDrawingReaction(e, t, a, o, n) {
    for (var r = 0, i = getSpansNearSupport(e, t), s = 0; s < i.length; s++) {
        var l = i[s],
            c = l.attr("x1"),
            d = l.attr("y1");
        l.attr("x1") === e && l.attr("y1") === t && (c = l.attr("x2"), d = l.attr("y2")), angle = convertToAngle(e, c, t, d), (angle < Math.PI / 4 || angle > 7 * Math.PI / 4) && o++, angle > Math.PI / 4 && angle < 3 * Math.PI / 4 && n--, angle > 3 * Math.PI / 4 && angle < 5 * Math.PI / 4 && o--, angle > 5 * Math.PI / 4 && angle < 7 * Math.PI / 4 && n++
    }
    if ("force_x" === a && (r = n > 0 ? 90 : 270), "force_y" === a && (r = o > 0 ? 180 : 0), "moment" === a) {
        var u = o > 0 ? o : -o,
            f = n > 0 ? n : -n,
            m = u > f ? u : f; - o === m ? r = 0 : n === m ? r = 90 : o === m ? r = 180 : -n === m && (r = 270)
    }
    return r
}

function doReverseAngleForDrawingForce(e, t, a, o) {
    for (var n = o, r = getSpansNearSupport(e, t), i = 0; i < r.length; i++) {
        var s = r[i],
            l = s.attr("x1"),
            c = s.attr("y1");
        s.attr("x1") === e && s.attr("y1") === t && (l = s.attr("x2"), c = s.attr("y2")), angle = convertToAngle(e, l, t, c), angle *= 180 / Math.PI;
        var d = angle - a;
        0 > d && (d = -d), d >= 360 && (d -= 360), d > 180 && (d = 360 - d), 10 > d ? n += 2 : 30 > d ? n += .9 : 45 >= d ? n += .4 : 190 > d && d > 170 ? n -= 2 : 210 > d && d > 150 ? n -= .9 : 225 >= d && d >= 135 && (n -= .4)
    }
    var u = n > 0;
    return u
}

function getAngleForDrawingLoad(e, t, a, o, n) {
    return _getAngleForDrawingReaction(e, t, a, o, n)
}

function getAngleForDrawingReaction(e, t, a) {
    var o = .1,
        n = .1;
    return _getAngleForDrawingReaction(e, t, a, o, n)
}

function getTransDrawReactionForce(e) {
    var t = 0,
        a = 0;
    return "x" === e && (a = 15 * -forceSize() / 40), "y" === e && (t = 15 * -forceSize() / 40), t + a
}

function establishDescText(e) {
    var t = canvas.svg.plain(e);
    return t.attr("class", "descDiagram"), t
}

function establishReactionMText(e) {
    var t = canvas.svg.plain(e);
    return t.attr("class", "reaction_M_Desc"), t
}

function establishReactionText(e) {
    var t = canvas.svg.plain(e);
    return t.attr("class", "reaction_F_Desc"), t
}

function drawReactionForce(e, t, a, o) {
    var n = _round(getScaleZ()),
        r = "reactionF",
        i = canvas.svg.group().attr("_type", r).attr("_x", e).attr("_y", t).attr("_size", o).attr("_direction", a);
    canvas.reactions.add(i);
    var s = getAngleForDrawingReaction(e, t, "force_" + a),
        l = !0;
    (0 >= o && (180 === s || 90 === s) || o >= 0 && (0 === s || 270 === s)) && (l = !1);
    var c = canvas.svg.use($(l ? "#id_force_prototype_react_r" : "#id_force_prototype_react")[0].instance).scale(n);
    i.add(c), c.rotate(s, e, t).translate(e, t + n * getTransDrawReactionForce(a, o));
    var d = roundTextValueReactionF(o),
        u = s,
        f = 1.375 * forceSize() * Math.sin(u * Math.PI / 180),
        m = -(1.375 * forceSize()) * Math.cos(u * Math.PI / 180);
    (0 === u || 180 === u) && (m += (90 >= u || u >= 270 ? -.4 : .4) * uniformZoom * forceSize());
    var g = establishReactionText(d.toString()).attr("_x", e).attr("_y", t).attr("_dx", _round(f)).attr("_dy", _round(m));
    0 === u || 180 === u ? g.font({
        anchor: "middle"
    }) : 90 === u ? g.font({
        anchor: "start"
    }) : 270 === u && g.font({
        anchor: "end"
    }), fixSingleLoadDescToZoom(g), i.add(g)
}

function getTransDrawReactionMoment() {
    return 12 * -momentSize1() / 20
}

function drawReactionMoment(e, t, a) {
    var o = _round(getScaleZ()),
        n = "reactionM",
        r = canvas.svg.use($(a > 0 ? "#id_moment_left_prototype_react" : "#id_moment_right_prototype_react")[0].instance).scale(o),
        i = canvas.svg.group().attr("_type", n).attr("_x", e).attr("_y", t);
    canvas.reactions.add(i), i.add(r);
    var s = getAngleForDrawingReaction(e, t, "moment");
    r.rotate(s, e, t).translate(e, t + o * getTransDrawReactionMoment());
    var l = roundTextValueReactionM(a),
        c = -30 + s,
        d = 2 * momentSize1() * Math.sin(c * Math.PI / 180),
        u = -(2.2 * momentSize1()) * Math.cos(c * Math.PI / 180);
    (0 === s || 180 === s) && 0 > a && (d = -d), (90 === s || 270 === s) && 0 > a && (u = -u);
    var f = establishReactionMText(l.toString()).attr("_x", e).attr("_y", t).attr("_dx", _round(d)).attr("_dy", _round(u));
    0 === s ? f.font({
        anchor: a >= 0 ? "end" : "start"
    }) : 180 === s ? f.font({
        anchor: a >= 0 ? "start" : "end"
    }) : 90 === s ? f.font({
        anchor: "start"
    }) : 270 === s && f.font({
        anchor: "end"
    }), fixSingleLoadDescToZoom(f), i.add(f)
}

function drawReactions(e, t) {
    var a = e.assembleReactionVector(),
        o = $("#sti_supports use");
    $("#sti_reactions g").remove(), canvas.gauge = 0, o.each(function() {
        for (var o = $(this)[0].instance.attr("_x"), n = $(this)[0].instance.attr("_y"), r = _round(o / canvas.zoom * (canvas.zoom / defaultZoom) / 1e3), i = _round(n / canvas.zoom * (canvas.zoom / defaultZoom) / 1e3), s = getNodeByCoord(r, i, t), l = e.assembleNodeReactionVector(s, a), c = 0, d = 0; 3 > d; d++) c += Math.abs(l[d]);
        c /= 3;
        var u = 1e-9 * c,
            f = Math.abs(u);
        (0 === canvas.gauge || f < canvas.gauge) && (canvas.gauge = f);
        var m = 0 !== l[0] && Math.abs(l[0]) >= u,
            g = 0 !== l[1] && Math.abs(l[1]) >= u,
            _ = 0 !== l[2] && Math.abs(l[2]) >= u;
        if (m) {
            var h = "x";
            drawReactionForce(o, n, h, l[0])
        }
        if (g) {
            var h = "y";
            drawReactionForce(o, n, h, l[1])
        }
        _ && drawReactionMoment(o, n, l[2])
    })
}

function establishStructureElement() {
    $("#structure").remove();
    var e = document.createElement("STRUCTURE");
    return e.setAttribute("id", "structure"), document.body.appendChild(e), e
}

function createXML() {
    var e = [],
        t = [],
        a = [],
        o = [],
        n = [],
        r = $("#sti_span line.span");
    r.each(function() {
        var a = $(this)[0].instance.attr("x1"),
            o = $(this)[0].instance.attr("y1"),
            n = $(this)[0].instance.attr("x2"),
            r = $(this)[0].instance.attr("y2"),
            i = $(this)[0].instance.attr("section"),
            s = $(this)[0].instance.attr("id"),
            l = $(this)[0].instance.attr("hinge"),
            c = !1,
            d = !1;
        if (void 0 != l) {
            var u = l.toString(),
                f = u.split(" "),
                m = f.length;
            if (m)
                for (var g = 0; m > g; g++) "1" === f[g] && (c = !0), "2" === f[g] && (d = !0)
        }
        var _ = a / canvas.zoom * (canvas.zoom / defaultZoom) / 1e3,
            h = n / canvas.zoom * (canvas.zoom / defaultZoom) / 1e3,
            v = o / canvas.zoom * (canvas.zoom / defaultZoom) / 1e3,
            p = r / canvas.zoom * (canvas.zoom / defaultZoom) / 1e3,
            y = canvas.lastId++,
            b = _getNodeFromArray(_, v, e, y);
        y = canvas.lastId++;
        var S = _getNodeFromArray(h, p, e, y);
        if (b && S) {
            var w = new interfBeam(s, b.id, S.id, i);
            w.hinge1 = c, w.hinge2 = d, t.push(w)
        }
    });
    var i = $("#sti_loads > g[_type=uniform]");
    i.each(function() {
        var e = $(this)[0].instance.attr("parentId"),
            t = $(this)[0].instance.attr("_f"),
            a = $(this)[0].instance.attr("_f2"),
            n = $(this)[0].instance.attr("_angle");
        $.isNumeric(n) || (n = 0), n = 360 - n, n >= 360 && (n -= 360), $.isNumeric(a) || (a = t);
        var r = new interfUniformLoad(e, t, a, n);
        r.x1Coord = this.instance.attr("_x1") / defaultZoom / 1e3, r.y1Coord = this.instance.attr("_y1") / defaultZoom / 1e3, r.x2Coord = this.instance.attr("_x2") / defaultZoom / 1e3, r.y2Coord = this.instance.attr("_y2") / defaultZoom / 1e3, o.push(r)
    }), DOM_loads = $.merge($("#sti_loads > g[_type=force]"), $("#sti_loads > g[_type=moment]")), DOM_loads.each(function() {
        var t = $(this)[0].instance.attr("_x"),
            o = $(this)[0].instance.attr("_y"),
            n = t / canvas.zoom * (canvas.zoom / defaultZoom) / 1e3,
            r = o / canvas.zoom * (canvas.zoom / defaultZoom) / 1e3,
            i = _getNodeByCoord(n, r, e),
            s = null;
        if (null === i && (s = $(this)[0].instance.attr("parentId")), null !== i || null !== s) {
            var l = $(this)[0].instance.attr("_F"),
                c = $(this)[0].instance.attr("_angle"),
                d = $(this)[0].instance.attr("_M");
            $.isNumeric(l) || (l = 0), $.isNumeric(c) || (c = 0), $.isNumeric(d) || (d = 0);
            var u = new interfSingleLoad(i ? i.id : s, null, null, d);
            u.F = l, u.angle = 360 - c, u.xCoord = n, u.yCoord = r, u.angle >= 360 && (u.angle -= 360), a.push(u)
        }
    });
    var s = $("#sti_supports use");
    s.each(function() {
        var t = $(this)[0].instance.attr("_x"),
            a = $(this)[0].instance.attr("_y"),
            o = t / canvas.zoom * (canvas.zoom / defaultZoom) / 1e3,
            n = a / canvas.zoom * (canvas.zoom / defaultZoom) / 1e3,
            r = _getNodeByCoord(o, n, e);
        if (r) {
            var i = $(this)[0].instance.attr("href"),
                s = $(this)[0].instance.attr("rotated"),
                l = "undefined" != typeof s;
            "#id_support_fixed" === i ? r.rX = r.rY = r.rM = !0 : "#id_support_roller" === i && l ? r.rX = !0 : "#id_support_roller" === i ? r.rY = !0 : "#id_support_pinned" === i && (r.rY = r.rX = !0)
        }
    });
    var l = $("#sectionsData div");
    l.each(function() {
        var e = this.getAttribute("name"),
            t = this.getAttribute("area"),
            a = this.getAttribute("inertia"),
            o = this.getAttribute("elasticity"),
            r = this.getAttribute("id"),
            i = new interfSection(e, r, t, a, o);
        n.push(i)
    });
    var c = establishStructureElement(),
        d = document.createElement("SETTINGS");
    c.appendChild(d), canvas.workSizeX && (d.setAttribute("paperX", canvas.workSizeX), d.setAttribute("paperY", canvas.workSizeY)), d.setAttribute("imperialUnits", canvas.flagImperialUnits ? "true" : "false"), d.setAttribute("guiScale", canvas.guiScale), d.setAttribute("drawingScale", canvas.drawingScale), d.setAttribute("zoom", canvas.zoom);
    for (var u = 0; u < e.length; u++) {
        var f = document.createElement("NODE");
        c.appendChild(f), f.setAttribute("index", e[u].id), f.setAttribute("coordX", e[u].x), f.setAttribute("coordY", e[u].y), f.setAttribute("restraintX", e[u].rX ? "true" : "false"), f.setAttribute("restraintY", e[u].rY ? "true" : "false"), f.setAttribute("restraintRotation", e[u].rM ? "true" : "false")
    }
    for (u = 0; u < o.length; u++) {
        var m = document.createElement("LINEARLOAD");
        c.appendChild(m), m.setAttribute("spanIndex", o[u].spanId), m.setAttribute("f", o[u].f), o[u].f !== o[u].f2 && m.setAttribute("f2", o[u].f2), m.setAttribute("angle", o[u].angle), m.setAttribute("x1Coord", o[u].x1Coord), m.setAttribute("y1Coord", o[u].y1Coord), m.setAttribute("x2Coord", o[u].x2Coord), m.setAttribute("y2Coord", o[u].y2Coord)
    }
    for (u = 0; u < a.length; u++) {
        var m = document.createElement("SINGLEFORCELOAD");
        c.appendChild(m), m.setAttribute("nodeIndex", a[u].nodeId), m.setAttribute("f", a[u].F), m.setAttribute("angle", a[u].angle), m.setAttribute("xCoord", a[u].xCoord), m.setAttribute("yCoord", a[u].yCoord), m.setAttribute("m", a[u].m)
    }
    for (u = 0; u < n.length; u++) {
        var g = document.createElement("CROSSSECTION");
        c.appendChild(g), g.setAttribute("index", n[u].id), g.setAttribute("area", n[u].A), g.setAttribute("secondAreaMoment", n[u].I), g.setAttribute("name", n[u].name), g.setAttribute("elasticityModulus", n[u].E)
    }
    for (u = 0; u < t.length; u++) {
        var _ = document.createElement("BAR");
        c.appendChild(_), _.setAttribute("index", t[u].idBeam), _.setAttribute("node1Index", t[u].idNode1), _.setAttribute("node2Index", t[u].idNode2), _.setAttribute("separator1X", "false"), _.setAttribute("separator1Y", "false"), _.setAttribute("separator1Rotation", t[u].hinge1 ? "true" : "false"), _.setAttribute("separator2X", "false"), _.setAttribute("separator2Y", "false"), _.setAttribute("separator2Rotation", t[u].hinge2 ? "true" : "false"), t[u].idSection && _.setAttribute("crosssectionIndex", t[u].idSection)
    }
    return c
}

function createSectionFromXml(e) {
    if (e && e.length) {
        var t = $("#structure CROSSSECTION[index=" + e + "]"),
            a = t.attr("name"),
            o = t.attr("area"),
            n = t.attr("secondAreaMoment"),
            r = t.attr("elasticityModulus"),
            i = $("#sectionsData");
        $.isNumeric(e) && e > canvas.lastId && (canvas.lastId = parseInt(e) + 1);
        var s = $("#sectionsData div[id=" + e + "]");
        if (!s.length) {
            var l = $("<div name='" + e + "'>").appendTo(i);
            l.attr("area", o).attr("inertia", n).attr("id", e).attr("name", a).attr("elasticity", r)
        }
    }
}

function saveToStorage(e) {
    createXML();
    printDataIntoStorage("#structure", e)
}

function loadFromStorage(e) {
    cleanAll();
    establishStructureElement();
    storageIntoXml("#structure", e), loadFromStorage1()
}

function loadFromStorage1() {
    var e = 1e3 * defaultZoom;
    clearLoadsDialog();
    var t = $("#structure settings")[0];
    if (void 0 != t) {
        var a = t.getAttribute("imperialUnits"),
            o = canvas.flagImperialUnits;
        a && a.length && "true" === a ? guiSI_Off_1() : (guiSI_On_1(), canvas.flagImperialUnits = !1);
        var n = t.getAttribute("paperX"),
            r = t.getAttribute("paperY");
        if (r && r.length > 0) {
            var i = canvas.workSizeX,
                s = canvas.workSizeY;
            canvas.workSizeX = n, canvas.workSizeY = r, (i != n || s != r || o != canvas.flagImperialUnits) && (drawGrid(canvas), moveGridLabels())
        }
        var l = t.getAttribute("zoom"),
            c = t.getAttribute("guiScale"),
            d = t.getAttribute("drawingScale"),
            u = canvas.drawingScale;
        c && c.length > 0 && canvas.guiScale != c && (canvas.guiScale = c, guiResize(c));
        var f = !1;
        d && d.length > 0 && (canvas.drawingScale = d, u != d && (f = !0)), l && l.length && l != canvas.zoom && (canvas.zoom = l, f = !0), f && _zoom()
    }
    var m = $("#structure CROSSSECTION");
    m.each(function() {
        var e = this.getAttribute("index");
        createSectionFromXml(e)
    });
    var g = $("#structure bar"),
        _ = [];
    g.each(function() {
        var t = this.getAttribute("index"),
            a = _node1id = this.getAttribute("node1Index"),
            o = _node2id = this.getAttribute("node2Index"),
            n = $("#structure node[index=" + a + "]"),
            r = $("#structure node[index=" + o + "]"),
            i = _round(e * n.attr("coordX")),
            s = _round(e * n.attr("coordY")),
            l = _round(e * r.attr("coordX")),
            c = _round(e * r.attr("coordY")),
            d = "true" === this.getAttribute("separator1Rotation"),
            u = "true" === this.getAttribute("separator2Rotation"),
            f = this.getAttribute("crosssectionIndex");
        _enableToolBar("#tool_select");
        var m;
        for (m = 0;; m++) {
            var g = $("#sti_span_nodes > rect[id=" + _node1id + "_" + m + "]");
            if (!g.length) {
                a = _node1id + "_" + m;
                break
            }
        }
        for (m = 0;; m++) {
            var h = $("#sti_span_nodes > rect[id=" + _node2id + "_" + m + "]");
            if (!h.length) {
                o = _node2id + "_" + m;
                break
            }
        }
        var v = _round(nodeSize() * getScaleZ()),
            p = createNode(i, s, v, a, t, "node", canvas.spanNodesGroup),
            y = createNode(l, c, v, o, t, "node", canvas.spanNodesGroup),
            b = getDummyNodeSize(v),
            S = createNode(i, s, b, null, p, "nodeDummy", $("#sti_span_nodes_dummy")[0].instance),
            w = createNode(l, c, b, null, y, "nodeDummy", $("#sti_span_nodes_dummy")[0].instance);
        $("#" + S)[0].instance.attr("parentIdSpan", t), $("#" + w)[0].instance.attr("parentIdSpan", t), $.isNumeric(a) && a > canvas.lastId && (canvas.lastId = parseInt(a) + 1), $.isNumeric(o) && o > canvas.lastId && (canvas.lastId = parseInt(o) + 1);
        var x = canvas.svg.line(i, s, l, c).attr("class", "span").attr("id", t);
        if ($.isNumeric(t) && t > canvas.lastId && (canvas.lastId = parseInt(t) + 1), f && x.attr("section", f), d || u) {
            var T = [t, d, u];
            _.push(T);
            var M = d && u ? "1 2" : d ? "1" : "2";
            x.attr("hinge", M)
        }
        x.on("mouseover", mouseOverSpan).on("mouseout", mouseOutSpan), canvas.spanGroup.add(x);
        var A = canvas.svg.line(i, s, l, c).attr("class", "dummySpan").attr("parentId", t).attr("id", "dummy" + t);
        A.on("mouseover", mouseOverSpan).on("mouseout", mouseOutSpan), canvas.spanDummyGroup.add(A);
        var D = A.clone();
        D.attr("class", "bottomSpan");
        var L = getAngleFromCoordInRad(i, s, l, c),
            v = getShiftOfTheBottomLine();
        v = _round(v * getScaleZ());
        var F = v * Math.cos(L),
            I = -v * Math.sin(L);
        D.translate(F, I), canvas.spanBottomGroup.add(D)
    });
    for (var h = _.length, v = 0; h > v; v++) {
        var p = _[v],
            y = $("#sti_span line[id=" + p[0] + "]");
        createHingesObjects(p[1], p[2], y)
    }
    var b = $("#structure SINGLEFORCELOAD");
    b.each(function() {
        var t = this.getAttribute("nodeIndex"),
            a = _round(e * this.getAttribute("xCoord")),
            o = _round(e * this.getAttribute("yCoord")),
            n = this.getAttribute("f");
        canvas.flagImperialUnits && (n = kNewtons2kips(n));
        var r = this.getAttribute("angle"),
            i = this.getAttribute("m");
        canvas.flagImperialUnits && (i = kNewtonMs2kipsFt(i));
        var s = $("#sti_span_nodes > rect[id^=" + t + "_]"),
            l = $("#sti_span line[id=" + t + "]");
        (s.length || l.length) && (s.length && (t = s.attr("id")), $("#form_load_single").val(n ? _round(n) : ""), $("#form_load_single_angle").val(r ? r : ""), $("#form_load_single_m").val(i ? _round(i) : ""), placeLoadSingleAtPoint(a, o, t))
    });
    var b = $("#structure LINEARLOAD");
    b.each(function() {
        var t = this.getAttribute("spanIndex"),
            a = e * this.getAttribute("x1Coord"),
            o = e * this.getAttribute("y1Coord"),
            n = e * this.getAttribute("x2Coord"),
            r = e * this.getAttribute("y2Coord"),
            i = this.getAttribute("f"),
            s = this.getAttribute("f2");
        canvas.flagImperialUnits && (i = kNewtons2kips(i) / m2ft(1), $.isNumeric(s) && (s = kNewtons2kips(s) / m2ft(1)));
        var l = this.getAttribute("angle"),
            c = $("#sti_span line[id=" + t + "]");
        c.length && ($("#form_load_uniform_f").val(i ? _round(i) : ""), $("#form_load_uniform_f2").val($.isNumeric(s) ? _round(s) : ""), $("#form_load_uniform_angle").val(l ? l : ""), placeLoadUniformAtPoint(a, o, t), placeLoadUniformAtPoint(n, r, t))
    }), $("#form_load_uniform_f2").val("");
    var S = $("#structure node");
    S.each(function() {
        var t = this.getAttribute("restraintX"),
            a = this.getAttribute("restraintY"),
            o = this.getAttribute("restraintRotation");
        if ("true" === t || "true" === a || "true" === o) {
            var n = null,
                r = this.getAttribute("coordX"),
                i = this.getAttribute("coordY"),
                s = _round(e * r),
                l = _round(e * i),
                c = $("#sti_span_nodes > rect[_x='" + s + "'][_y='" + l + "']");
            console.log(c), c = c.length > 0, c && ("true" === o ? "true" === t && "true" === a ? n = "radio_support_fixed" : console.log("Error: Unsupported constraint type") : ("true" === t && "true" === a && (n = "radio_support_pinned"), "true" === t && "false" === a ? n = "radio_support_roller_vert" : "false" === t && "true" === a && (n = "radio_support_roller")), n && ($("#" + n).prop("checked", !0), r = _round(s), i = _round(l), _nodeClick_support(s, l)), console.log(n))
        }
    }), clearSectionsDialog()
}

function storageNotSupported() {
    alert("Feature unsupported within your current configuration. Try different web browser.")
}

function storageIntoXml(e, t) {
    var a = null;
    try {
        var o = !1;
        a = getOrCreateFile(t, o)
    } catch (n) {
        return void storageNotSupported()
    }
    if (null !== a) {
        console.log("open file " + t + ", index = " + a);
        for (var r = localStorage.getItem(a + "_el_count"), i = $(e), s = 0; r > s; s++) {
            for (var l = localStorage.getItem(a + "_el_name_" + s), c = localStorage.getItem(a + "_el_attrs_count_" + s), d = document.createElement(l), u = 0; c > u; u++) {
                var f = localStorage.getItem(a + "_el_" + s + "_attrs_name_" + u),
                    m = localStorage.getItem(a + "_el_" + s + "_attrs_value_" + u);
                d.setAttribute(f, m)
            }
            i[0].appendChild(d)
        }
    }
}

function getSavedFiles() {
    var e = [],
        t = localStorage.getItem("files_count");
    if (t)
        for (var a = 0; t > a; a++) {
            var o = localStorage.getItem("file_" + a);
            e.push(o)
        }
    return e
}

function getOrCreateFile(e, t) {
    var a = null,
        o = localStorage.getItem("files_count");
    if (o)
        for (var n = 0; o > n; n++) {
            var r = localStorage.getItem("file_" + n);
            if (r === e) {
                a = n;
                break
            }
        }
    return null === a && t && (o || (o = 0), a = o, localStorage.setItem("file_" + o, e), o++, localStorage.setItem("files_count", o)), a
}

function printDataIntoStorage(e, t) {
    var a = $(e + " *"),
        o = null;
    try {
        var n = !0;
        o = getOrCreateFile(t, n)
    } catch (r) {
        return void(t !== g_fileName_bak && storageNotSupported())
    }
    if (null !== o) {
        localStorage.setItem(o + "_el_count", a.length);
        var i = 0;
        a.each(function() {
            var e = $(this.attributes);
            localStorage.setItem(o + "_el_name_" + i, this.tagName), localStorage.setItem(o + "_el_attrs_count_" + i, e.length);
            var t = 0;
            e.each(function() {
                localStorage.setItem(o + "_el_" + i + "_attrs_name_" + t, this.name), localStorage.setItem(o + "_el_" + i + "_attrs_value_" + t, this.value), t++
            }), i++
        })
    }
}

function showOpenDialog() {
    var e = null;
    displayForm("form_open");
    try {
        e = getSavedFiles()
    } catch (t) {}(null === e || 0 === e.length) && (e = [g_fileName_bak]);
    var a = $("#open_file_menu");
    a.find("option").remove();
    for (var o = 0; o < e.length; o++) {
        var n = 0 === o ? "selected" : "";
        $('<option value="' + o + '"' + n + ">" + e[o] + "</option>").appendTo(a)
    }
    $("#open_file_menu").parent().css("display", 1 === e.length ? "none" : "block"), disableAllToolBars()
}

function hideOpenDialog() {
    $("#form_open").css("display", "none");
    enableAllToolBars()
}

function form_open_ok() {
    var e = $("#open_file_menu option:selected").text();
    loadFromStorage(e), hideOpenDialog(), canvas.flagDemoIsRunning = !1, canvas.flagSaveRequired = !1, restartBackupTimer(), enableAllToolBars()
}

function form_open_cancel() {
    hideOpenDialog()
}

function showSaveDialog() {
    displayForm("form_save"), disableAllToolBars()
}

function hideSaveDialog() {
    $("#form_save").css("display", "none");
    enableAllToolBars()
}

function form_save_ok() {
    saveToStorage(g_fileName), hideSaveDialog()
}

function form_save_cancel() {
    hideSaveDialog()
}

function backUpProject() {
    if (!canvas.flagDemoIsRunning && canvas.flagSaveRequired) {
        var e = $("#sti_span_nodes > rect:first"),
            t = $("#sectionsData div:first");
        (e.length || t.length) && (saveToStorage(g_fileName_bak), console.log("backUp"))
    }
    canvas.flagSaveRequired = !1
}

function _getNodeByCoord(e, t, a) {
    for (var o = null, n = 0; n < a.length; n++) {
        var r = a[n].x,
            i = a[n].y;
        if (r === e && i === t) {
            o = a[n];
            break
        }
    }
    return o
}

function getNodeByCoord(e, t, a) {
    var o = _getNodeByCoord(e, t, a);
    return o && (o = o.node), o
}

function _getNodeFromArray(e, t, a, o) {
    var n = _getNodeByCoord(e, t, a);
    if (!n) {
        var r = new Node(e, t),
            i = new interfNode(e, t, r, o);
        a.push(i), n = i
    }
    return n
}

function getNodeFromArray(e, t, a, o) {
    var n = _getNodeFromArray(e, t, a, o);
    return n && (n = n.node), n
}

function cTestBeam(e, t) {
    this.DOM_id = e, this.beam = t
}

function getTestingBeamByDomId(e, t) {
    for (var a = null, o = 0; o < t.length; o++)
        if (e == t[o].DOM_id) {
            a = t[o].beam;
            break
        }
    return a
}

function createBeam(e, t, a) {
    var o = new Beam(e, t),
        n = a;
    return a || (n = new Properties, n.modulusE = 1e10, n.transversalContractionCoef = .3, n.calculateModulusG(), n.area = .01, n.shearArea = .05, n.secondAreaMoment = 2e-5), o.properties = n, o
}

function _createBeam(e, t, a, o) {
    var n = null;
    if (o) {
        var r = $("#" + o);
        if (r.length) {
            n = new Properties, n.modulusE = r.attr("elasticity"), n.secondAreaMoment = r.attr("inertia"), n.transversalContractionCoef = .3, n.calculateModulusG();
            var i = r.attr("area");
            n.area = $.isNumeric(i) ? i : 1e99;
            var s = r.attr("areaShear");
            n.shearArea = $.isNumeric(s) ? s : 1e99
        }
    }
    return new cTestBeam(e, createBeam(t, a, n))
}

function getDefaultSection() {
    var e = null,
        t = $("#sectionsData > div");
    return t.length && (e = [t.attr("name"), t.attr("id")]), e
}

function ifaceFeed(e, t, a, o) {
    var n = $("#sti_span line.span"),
        r = getDefaultSection(),
        i = r ? r[1] : null;
    n.each(function() {
        var e = $(this)[0].instance.attr("x1"),
            o = $(this)[0].instance.attr("y1"),
            n = $(this)[0].instance.attr("x2"),
            r = $(this)[0].instance.attr("y2"),
            s = _round(e / canvas.zoom * (canvas.zoom / defaultZoom) / 1e3),
            l = _round(n / canvas.zoom * (canvas.zoom / defaultZoom) / 1e3),
            c = _round(o / canvas.zoom * (canvas.zoom / defaultZoom) / 1e3),
            d = _round(r / canvas.zoom * (canvas.zoom / defaultZoom) / 1e3),
            u = $("#sti_span_nodes > rect[_x='" + e + "'][_y='" + o + "']").attr("id"),
            f = $("#sti_span_nodes > rect[_x='" + n + "'][_y='" + r + "']").attr("id"),
            m = getNodeFromArray(s, c, t, u),
            g = getNodeFromArray(l, d, t, f),
            _ = $(this)[0].instance.attr("id"),
            h = $(this).attr("section"),
            v = _createBeam(_, m, g, void 0 != h ? h : i),
            p = $(this)[0].instance.attr("hinge"),
            y = !1,
            b = !1;
        if (void 0 != p) {
            var S = p.toString(),
                w = S.split(" "),
                x = w.length;
            if (x)
                for (var T = 0; x > T; T++) "1" === w[T] && (y = !0), "2" === w[T] && (b = !0)
        }
        v.beam.hinge0 = y, v.beam.hinge1 = b, a.push(v)
    });
    var s = $.merge($("#sti_loads g[_type=force]"), $("#sti_loads g[_type=moment]"));
    s.each(function() {
        var e = $(this)[0].instance.attr("_x"),
            n = $(this)[0].instance.attr("_y"),
            r = _round(e / canvas.zoom * (canvas.zoom / defaultZoom) / 1e3),
            i = _round(n / canvas.zoom * (canvas.zoom / defaultZoom) / 1e3),
            s = $(this)[0].instance.attr("_F"),
            l = $(this)[0].instance.attr("_angle"),
            c = $(this)[0].instance.attr("_M"),
            d = getNodeByCoord(r, i, t);
        if ($.isNumeric(s) || (s = 0), $.isNumeric(l) || (l = 0), $.isNumeric(c) || (c = 0), d) {
            var u = 0,
                f = 0;
            if (0 !== s) {
                var m = l * Math.PI / 180;
                u = s * Math.cos(m), f = s * Math.sin(m)
            }
            var g = new NodeForceLoad(d, new Array(-f, u, c));
            o.push(g)
        } else {
            var _ = $(this)[0].instance.attr("parentId"),
                h = getTestingBeamByDomId(_, a),
                v = h.node0.x,
                p = h.node1.x,
                y = h.node0.z,
                b = h.node1.z,
                S = dist(r, i, v, y) / dist(v, y, p, b);
            if (0 !== c) {
                var w = new BeamMomentLoad(h, c, S);
                o.push(w)
            } else {
                var x = convertToAngle(p, v, b, y),
                    m = l * Math.PI / 180,
                    T = Math.PI - (m - x);
                0 > T && (T += 2 * Math.PI);
                var M = new BeamForceLoad(h, s, S, T);
                o.push(M)
            }
        }
    });
    var l = $("#sti_loads > g[_type=uniform]");
    l.each(function() {
        var e = $(this)[0].instance.attr("parentId"),
            t = getTestingBeamByDomId(e, a),
            n = t.node0.x,
            r = t.node1.x,
            i = t.node0.z,
            s = t.node1.z,
            l = convertToAngle(r, n, s, i),
            c = $(this)[0].instance.attr("_f"),
            d = $(this)[0].instance.attr("_f2"),
            u = $(this)[0].instance.attr("_angle");
        $.isNumeric(u) || (u = 0);
        var f = this.instance.attr("_x1") / defaultZoom / 1e3,
            m = this.instance.attr("_y1") / defaultZoom / 1e3,
            g = this.instance.attr("_x2") / defaultZoom / 1e3,
            _ = this.instance.attr("_y2") / defaultZoom / 1e3,
            h = dist(f, m, n, i),
            v = dist(g, _, n, i),
            p = v - h,
            y = u * Math.PI / 180,
            b = dist(n, i, r, s),
            S = Math.PI - (y - l);
        S > Math.PI && (S -= 2 * Math.PI), 0 > S && (S += 2 * Math.PI);
        var w = $.isNumeric(d) ? d - c : 0;
        if (h > v) {
            h = v, p = -p;
            var x = w;
            c += w, w = -x
        }
        var T = new BeamContinuousLoad(t, c, w, h / b, p / b, S);
        o.push(T)
    });
    for (var c = 0; c < t.length; c++) e.addNode(t[c].node);
    for (c = 0; c < a.length; c++) e.addBeam(a[c].beam);
    for (c = 0; c < o.length; c++) e.addLoad(o[c]);
    var d = $("#sti_supports use");
    return d.each(function() {
        var e = $(this)[0].instance.attr("_x"),
            a = $(this)[0].instance.attr("_y"),
            o = _round(e / canvas.zoom * (canvas.zoom / defaultZoom) / 1e3),
            n = _round(a / canvas.zoom * (canvas.zoom / defaultZoom) / 1e3),
            r = $(this)[0].instance.attr("href");
        "#id_support_roller" === r && void 0 != $(this)[0].instance.attr("rotated") && (r = "#id_support_roller_vert");
        var i = !1,
            s = !1,
            l = !1;
        "#id_support_fixed" === r ? l = s = i = !0 : "#id_support_roller" === r ? (s = !0, console.log("id_support_roller")) : "#id_support_roller_vert" === r ? (console.log("id_support_roller_vert"), i = !0) : "#id_support_pinned" === r && (s = i = !0);
        var c = getNodeByCoord(o, n, t);
        c && (c.restraints = new Array(i, s, l))
    }), Model
}

function postSolverMessage(e, t) {
    var a = new noticeParameters(t, e[0], e[1]);
    showNotice2(a)
}

function checkModelGUI() {
    for (var e = $("#sti_span line"), t = 0, a = 0, o = 0; o < e.length; o++) {
        var n = !1,
            r = e[o].getAttribute("section");
        if (void 0 !== r) {
            var i = $("#" + r);
            void 0 !== i && i.length && (n = !0)
        }
        n ? t++ : a++
    }
    var s = getDefaultSection(),
        l = s ? s[1] : null,
        c = s ? s[0] : null;
    t > 0 && a > 0 ? GUI_log("warning", "SOME_BEAMS_NOT_ASSIGNED", c) : 0 === t && a === e.length && l && GUI_log("warning", "SECTION_AUTO_ASSIGNED", c)
}

function log_callback(e, t, a) {
    g_modelMessages._feed(e, t, a)
}

function calculate(e) {
    g_interfNodes = [], g_interfBeams = [], g_interfLoads = [];
    var t = new Model;
    g_modelMessages.clear(), ifaceFeed(t, g_interfNodes, g_interfBeams, g_interfLoads);
    var a = new noticeParameters(e, "success", "Solving...");
    showNotice2(a), setTimeout(function() {
        checkModelGUI(), preCheck(t), t.solve(), postCheck(t);
        var a = g_modelMessages.getOutput();
        drawReactions(t, g_interfNodes), redrawResult(t), postSolverMessage(a, e), console.log(canvas)
    }, 0)
}

function export_xml() {
    var e = [],
        t = [],
        a = [],
        o = new Model;
    ifaceFeed(o, e, t, a);
    var n = generateXML(o);
    o.solve();
    var r = generateHTML(o),
        i = window.open("about:blank", "debug", "height=600,width=400");
    i.document.write(n + r)
}

function fixSectionsDialog() {
    displayForm("form_material");
    var e = $("#form_material_sh_area").offset().top,
        t = $("#form_material_id").offset().top,
        a = $("#form_material_id_ch").css("margin-bottom");
    a = void 0 === a ? 0 : parseInt(a), a += e - t, $("#form_material_id_ch").css("margin-bottom", a + "px"), $("#form_material").css("display", "none")
}

function printObsoleteBrowserAlert() {
    if (testForObsoleteBrowser(), isObsoloteBrowser()) {
        var e = new noticeParameters(null, "error", "Obsolete browser detected<br>Only a limited functionality is supported");
        e.y = canvas.offsetY, e.flagAlignTop = !0, showNotice2(e)
    }
}

function isObsoloteBrowser() {
    return g_flagObsoleteBrowser
}

function testForObsoleteBrowser() {
    try {
        var e = canvas.svg.node,
            t = e.createSVGRect();
        t.x = 0, t.y = 0, t.width = 1, t.height = 1;
        var a = document.getElementById("sti_span"),
            o = e.getIntersectionList(t, a);
        o || (g_flagObsoleteBrowser = !0)
    } catch (n) {
        g_flagObsoleteBrowser = !0
    }
}

function _backUpProject() {
    backUpProject(), g_timer = startBackupTimer()
}

function startBackupTimer() {
    return setTimeout(_backUpProject, 6e4)
}

function restartBackupTimer() {
    clearTimeout(g_timer), g_timer = startBackupTimer()
}

function draggingIsActive() {
    var e = $(":root > body > div.ui-draggable-dragging");
    return 0 != e.length
}

function touchCursorIsOverForm(e) {
    for (var t = $(":root > body > div, #alertArea"), a = !1, o = 0; o < t.length; o++) {
        var n = $(t[o]),
            r = n.attr("id");
        if (void 0 != r && (0 === r.indexOf("form_") || "alertArea" === r)) {
            var i = n.css("display");
            if ("none" !== i) {
                var s = n.position(),
                    l = s.left,
                    c = s.top,
                    d = n.outerWidth(),
                    u = n.outerHeight(),
                    f = e.clientX,
                    m = e.clientY;
                if (f >= l && l + d >= f && m >= c && c + u >= m) {
                    a = !0;
                    break
                }
            }
        }
    }
    return a
}

function bindClick() {
    $(document).click(function(e) {
        if (isLeftButton(e) && canvas.svg && !canvas.flagDemoIsRunning) {
            canvas.flagSaveRequired = !0;
            var t = e.target.tagName;
            console.log(e);
            var a = "className" in e.target ? e.target.className.toString() : "";
            console.log(t + " " + a);
            var o = touchCursorIsOverForm(e);
            if (canvas.flagToolbarActive) {
                var n = e.target.parentElement.id;
                "sti_svg_canvas" === n && (canvas.flagToolbarActive = !1)
            }
            var r = menuToolsShown();
            if (o || canvas.flagToolbarActive || "FIELDSET" === t || "INPUT" === t || "SELECT" === t || r || "DIV" === t) console.log("click #1 + " + o + " " + canvas.flagToolbarActive), ("INPUT" === t || "SELECT" === t) && (lastInput = e.target), ("BUTTON" === t || "A" === t) && interruptSelectingByRectangle(e, "warning"), r && !$.contains($("#tool_tools")[0], e.target) && $("#menuTools").css("display", "none");
            else if (console.log("click #2 " + getDateTime()), !canvas.flagMobile || 0 != e.screenX || e.target.className instanceof SVGAnimatedString) {
                if (console.log("click #3 " + a), -1 != a.indexOf("fa-minus") || -1 != a.indexOf("fa-reorder"));
                else if (-1 != a.indexOf("fa-remove") || "BUTTON" === t) interruptSelectingByRectangle(e, "warning");
                else if (0 == e.button) {
                    console.log("document.click #");
                    var i = $(".snap_rect_dragged");
                    i && i.length && ($(i[0]).trigger("mouseup"), $(i[0]).trigger("mouseout")), ignoreClick(canvas) ? (console.log("ignore click"), unsetIgnoreClick(canvas)) : processLeftClick(e, canvas)
                }
            } else;
            lastInput && "INPUT" !== t && "SELECT" !== t && (lastInput.blur(), lastInput = null)
        }
    })
}

function initStartUp() {
    $(window).bind("scroll", scrollWindow), $("#sti_svg_canvas").mousemove(function(e) {
        mouseMove(e, canvas)
    }), $("#sti_svg_canvas").mouseup(function(e) {
        canvas.flagSaveRequired = !0, mouseUp(e, canvas)
    }), $("#sti_svg_canvas").mousedown(function(e) {
        canvas.flagSaveRequired = !0, console.log("mousedown " + getDateTime()), mouseDown(e, canvas)
    }), $.fn.scrollTo = function(e, t, a) {
        "function" == typeof t && 2 == arguments.length && (a = t, t = e);
        var o = $.extend({
            scrollTarget: e,
            offsetTop: 15,
            duration: 0,
            easing: "swing"
        }, t);
        return this.each(function() {
            var e = $(this),
                t = "number" == typeof o.scrollTarget ? o.scrollTarget : $(o.scrollTarget),
                n = "number" == typeof t ? t : t.offset().top - e.offset().top + e.scrollTop() - parseInt(o.offsetTop);
            e.animate({
                scrollTop: n
            }, parseInt(o.duration), o.easing, function() {
                "function" == typeof a && a.call(this)
            })
        })
    }, $(document).keydown(function(e) {
        if (13 === e.which) 1 === getOpenForms().length && "block" !== $("#form_coord").css("display") && formTriggerDefaultButton();
        else if (27 === e.which) escKeyPressed(canvas) && e.preventDefault();
        else if ("block" === $("#form_help").css("display")) {
            var t = $("#form_help > div.sti_form > div.form_body"),
                a = t.scrollTop(),
                o = 4 * t.innerHeight() / 5;
            switch (e.which) {
                case 35:
                    a = "#form_help > div.sti_form > div.form_body > h1:last";
                    break;
                case 36:
                    a = 0;
                    break;
                case 40:
                    a += 50;
                    break;
                case 38:
                    a -= 50;
                    break;
                case 34:
                case 32:
                    a += o;
                    break;
                case 33:
                    a -= o;
                    break;
                default:
                    a = null
            }
            null !== a && ($.isNumeric(a) && 0 > a && (a = 0), t.scrollTo(a), e.preventDefault())
        } else !canvas.lineBeingDrawn || formIsMinimized("form_coord") || $("#form_coord_x").is(":focus") || $("#form_coord_y").is(":focus") || 0 !== getOpenForms().length ? canvas.flagIgnoreKbdShortcuts || (46 === e.which && deleteKeyPressed(canvas), 189 === e.which && zoomOut(canvas), 187 === e.which && zoomIn(canvas)) : ($("#form_coord_x").focus(), e.stopPropagation())
    }), $("#button_save_ok").bind("click", form_save_ok), $("#button_save_cancel").bind("click", form_save_cancel), $("#button_open_ok").bind("click", form_open_ok), $("#button_open_cancel").bind("click", form_open_cancel), $("#button_new_ok").bind("click", form_new_ok), $("#button_new_cancel").bind("click", form_new_cancel), $("#form_material_btn1").bind("click", form_material_btn1), $("#form_material_btn2").bind("click", form_material_btn2), $("#idCheckboxBaseUnits").bind("click", form_unit_checkbox), $("#support_apply_btn").bind("click", form_supports_apply), $("#hinge_apply_btn").bind("click", form_hinges_apply), $("#form_load_single_button").bind("click", form_load_single_button), $("#form_load_uniform").bind("click", form_load_uniform), $("#form_load_remove").bind("click", form_load_remove), $("#form_load_remove_on_selected").bind("click", form_load_remove_on_selected), $("#form_mod_load_apply_btn").bind("click", btn_loadModify_apply), $("#form_mod_load_remove_btn").bind("click", btn_loadModify_remove), $("#form_coord_apply_btn").bind("click", btn_coord_apply), $("#form_settings_apply_btn").bind("click", btn_settings_apply), $("div.sti_form").bind("mouseover", mouseOverForm), $("div.fa-minus").bind("click", mouseFormRestore).on("mouseover", mouseOverRestoreFormButton).on("mouseout", mouseOutRestoreFormButton).on("mouseleave", mouseOutRestoreFormButton), $("div.fa-question").bind("mouseover", mouseOverKillFormButton).bind("mouseout", mouseOutKillFormButton).bind("mouseleave", mouseOutKillFormButton).bind("click", mouseFormHelp), $("div.fa-remove").bind("mouseover", mouseOverKillFormButton).bind("mouseout", mouseOutKillFormButton).bind("mouseleave", mouseOutKillFormButton).bind("click", mouseFormKill)
}

function menuDimensions() {
    return $("#menuTools").css("display", "none"), !1
}

function reRunDemoClicked(e) {
    return console.log(e), _startDemo(), $("#menuTools").css("display", "none"), !1
}

function mouseOverCalcButton() {
    canvas.flagDemoIsRunning && $("#tool_calc").css("background", "")
}

function mouseOverViewButton() {
    canvas.flagDemoIsRunning && $("#tool_view").css("background", "")
}

function mouseOverZoomButton() {
    canvas.flagDemoIsRunning && ($("#tool_zoom_in").css("background", ""), $("#tool_zoom_out").css("background", ""))
}

function initMouseOverMenuButtonsCallbacks() {
    $("#tool_zoom_out").on("mouseover", mouseOverZoomButton), $("#tool_zoom_in").on("mouseover", mouseOverZoomButton), $("#tool_calc").on("mouseover", mouseOverCalcButton), $("#tool_view").on("mouseover", mouseOverViewButton)
}

function deinitMouseOverMenuButtonsCallbacks() {
    $("#tool_zoom_out").off("mouseover", mouseOverZoomButton), $("#tool_zoom_in").off("mouseover", mouseOverZoomButton), $("#tool_calc").off("mouseover", mouseOverCalcButton), $("#tool_view").off("mouseover", mouseOverViewButton)
}

function fitDemoScale() {
    var e = 1,
        t = _round(canvas.resX / canvas.zoom / canvas.unit / canvas.gridFactor),
        a = _round((canvas.resY - canvas.offsetY) / canvas.zoom / canvas.unit / canvas.gridFactor);
    t > 2.2 * g_xDemoSize && a > 1.65 * g_yDemoSize ? zoomIn(canvas) : (.8 * g_xDemoSize > t || .8 * g_yDemoSize > a) && (zoomOut(canvas), e = .8), g_htmlDemoBasic = "<settings paperx='" + g_xDemoSize + "' papery='" + g_yDemoSize + "' imperialunits='false' drawingscale='" + e + "'></settings>"
}

function highlightSettingsButtons() {
    $("#tool_settings").css("background", "aquamarine"), setTimeout(function() {
        $("#tool_settings").css("background", "")
    }, 3e3)
}

function highlightZoomButtons() {
    $("#tool_zoom_in").css("background", "aquamarine"), $("#tool_zoom_out").css("background", "aquamarine"), setTimeout(function() {
        $("#tool_zoom_in").css("background", ""), $("#tool_zoom_out").css("background", "")
    }, 3e3)
}

function highlightSolveButton() {
    $("#tool_calc").css("background", "aquamarine"), setTimeout(function() {
        $("#tool_calc").css("background", "")
    }, 3e3)
}

function highlightDiagramButton() {
    $("#tool_view").css("background", "aquamarine"), setTimeout(function() {
        $("#tool_view").css("background", "")
    }, 3e3)
}

function highlightToolsButton() {
    $("#tool_tools").css("background", "aquamarine"), setTimeout(function() {
        $("#tool_tools").css("background", "")
    }, 3e3)
}

function demoCalcPressed() {
    g_demoStepCounter === 3 + g_htmlDemoSteps.length && (hideNotice(), g_demoMainTimer && clearTimeout(g_demoMainTimer), $("#tool_calc").css("background", ""), g_demoMainTimer = setTimeout(drawDemo, 8e3))
}

function showHintDragDialog() {
    if (!canvas.flagDemoIsRunning && canvas.flagShowHintDragDialog) {
        canvas.flagShowHintDragDialog = !1;
        var e = new noticeParameters(null, "success", "Tip: you can drag any dialog around");
        e.flagAlignTop = !1, e.flagAvoidTimeout = !0, e.x = $("#form_view").offset().left - window.pageXOffset, e.y = $("#form_view").offset().top - window.pageYOffset, showNotice2(e)
    }
}

function demoViewPressed() {
    g_demoStepCounter === 4 + g_htmlDemoSteps.length && (hideNotice(), g_demoMainTimer && clearTimeout(g_demoMainTimer), g_demoMainTimer = null, canvas.flagDemoIsRunning = !1, deinitMouseOverMenuButtonsCallbacks(), canvas.flagSaveRequired = !1, $("#tool_view").css("background", ""), g_demoStepCounter++)
}

function demoZoomPressed() {
    g_demoStepCounter === 2 + g_htmlDemoSteps.length && (hideNotice(), g_demoMainTimer && clearTimeout(g_demoMainTimer), $("#tool_zoom_in").css("background", ""), $("#tool_zoom_out").css("background", ""), g_demoMainTimer = setTimeout(drawDemo, 3e3))
}

function drawDemo() {
    if (canvas.flagDemoIsRunning)
        if (g_demoStepCounter < g_htmlDemoSteps.length) {
            var e = g_htmlDemoNodes + g_htmlDemoSteps[g_demoStepCounter];
            $("#structure").html(e), loadFromStorage1(), g_demoStepCounter++, g_demoMainTimer = setTimeout(drawDemo, g_demoDelay)
        } else {
            var t = new noticeParameters(null, "success", null);
            t.flagAlignTop = t.flagAvoidTimeout = !0, t.y = canvas.offsetY;
            var a = 15e3;
            switch (g_demoStepCounter) {
                case 0 + g_htmlDemoSteps.length:
                    enableAllToolBars(), g_demoMainTimer = setTimeout(drawDemo, 6e3), g_demoStepCounter++;
                    break;
                case 1 + g_htmlDemoSteps.length:
                    t.x = $("#tool_zoom_out").offset().left, t.msg = "Use buttons <strong>+</strong> and <strong>-</strong> from the toolbar to zoom", showNotice2(t), setTimeout(highlightZoomButtons, 2e3), g_demoMainTimer = setTimeout(drawDemo, a), g_demoStepCounter++;
                    break;
                case 2 + g_htmlDemoSteps.length:
                    t.x = $("#tool_calc").offset().left, t.msg = "Press <strong>Solve</strong> from the toolbar to solve the model", showNotice2(t), setTimeout(highlightSolveButton, 2e3), g_demoMainTimer = setTimeout(drawDemo, a), g_demoStepCounter++;
                    break;
                case 3 + g_htmlDemoSteps.length:
                    t.x = $("#tool_view").offset().left, t.msg = "Once the model is solved, use <strong>Diagrams</strong> to explore the results", showNotice2(t), setTimeout(highlightDiagramButton, 2e3), g_demoMainTimer = setTimeout(drawDemo, a), g_demoStepCounter++;
                    break;
                case 4 + g_htmlDemoSteps.length:
                    hideNotice(), canvas.flagDemoIsRunning = !1, canvas.flagSaveRequired = !1, deinitMouseOverMenuButtonsCallbacks(), g_demoStepCounter++, stopDemo()
            }
        }
}

function runDemo() {
    if (canvas.flagDemoIsRunning) {
        g_demoStepCounter = 0;
        var e = new noticeParameters(null, "success", "Let you <strong>simply</strong> use your pointer to draw a model");
        e.flagAlignTop = e.flagAvoidTimeout = !0, e.y = canvas.offsetY, e.x = null, showNotice2(e), establishStructureElement(), $("#structure").html(g_htmlDemoBasic), loadFromStorage1(), drawDemo()
    }
}

function _startDemo() {
    cleanAll(), initMouseOverMenuButtonsCallbacks(), canvas.flagDemoIsRunning = !0, fitDemoScale(), g_demoMainTimer = setTimeout(runDemo, 3e3), disableToolBar("#tool_select"), disableToolBar("#tool_tools")
}

function startDemo() {
    cookiesStartDemo() && _startDemo()
}

function stopDemo(e) {
    canvas.flagDemoIsRunning = !1, enableAllToolBars(), deinitMouseOverMenuButtonsCallbacks();
    var t = new noticeParameters(e, "success", "The demo has finished<br>You can watch a <a href='https://www.youtube.com/playlist?list=PLlVoc8fFbbKoYVLypxWwR93QG08cmY3ca'>short tutorial");
    t.flagAvoidTimeout = t.flagAlignTop = !0, t.icon = "fa-youtube-play", showNotice2(t)
}

var g_LangStrings = {
    MODEL_NOT_RESTRAINED_X: "Model is not restrained in X direction",
    MODEL_NOT_RESTRAINED_Z: "Model is not restrained in Z direction",
    MODEL_NOT_ENOUGH_RESTRAINTS: "Model has not enough restraints",
    MODEL_PROBABLY_NOT_ENOUGH_RESTRAINTS: "Model probably has not enough restraints (according to the number of hinges)",
    MODEL_UNSOLVABLE: "Model can't be solved due to unsolvable system of equilibrium equations. Probably a restraint is missing or the structure is unstable due to its design",
    EXTREME_TRANSLATION: "The extreme of a node translation (%%) exceeds a limit",
    EXTREME_ROTATION: "The extreme of a node rotation (%%) exceeds a limit",
    BEAM_ILLEGAL_HEIGHT: "Beam number %% has illegal height of cross-section",
    BEAM_ZERO_HEIGHT: "Beam number %% has zero height cross-section",
    BEAM_ILLEGAL_AREA: "Beam number %% has illegal area of cross-section",
    BEAM_ZERO_AREA: "Beam number %% has zero area cross-section",
    BEAM_ILLEGAL_SHEAR_AREA: "Beam number %% has illegal shear area of cross-section",
    BEAM_ZERO_SHEAR_AREA: "Beam number %% has zero shear area cross-section",
    BEAM_ILLEGAL_SECOND_MOMENT: "Beam number %% has illegal second area moment of cross-section",
    BEAM_ZERO_SECOND_MOMENT: "Beam number %% has zero second area moment of cross-section",
    BEAM_ILLEGAL_ELASTICITY: "Beam number %% has illegal modulus of elasticity",
    BEAM_ZERO_ELASTICITY: "Beam number %% has zero modulus of elasticity",
    BEAM_ILLEGAL_SHEAR_ELASTICITY: "Beam number %% has illegal shear modulus of elasticity",
    BEAM_ZERO_SHEAR_ELASTICITY: "Beam number %% has zero shear modulus of elasticity",
    BEAM_ILLEGAL_TRANS_COEF: "Beam number %% has illegal coefficient of transversal contraction",
    BEAM_ILLEGAL_THERM_COEF: "Beam number %% has illegal coefficient of thermal expansion",
    SOME_BEAMS_NOT_ASSIGNED: "Some beams aren't assigned a cross-section, section '%%' used",
    SECTION_AUTO_ASSIGNED: "Cross-section '%%' assigned to all beams",
    SUCCESSFULLY_SOLVED: "Successfully solved"
};

var g_fnMessagesCallbackGUI = [];
var g_printNoticeLikeFacebook = !1;
var arrZooms_SI = [100, 200, 250, 500, 1e3];
var arrZooms2_SI = [.02, .025, .04, .05, .1, .2];
var defaultZoom_SI = .05;
var arrZooms_Imperial = [76.2, 152.4, 304.8];
var arrZooms = arrZooms_SI;
var arrZooms2 = arrZooms2_SI;
var defaultZoom = defaultZoom_SI;
var uniformZoom = .75;
var zNodeSize = nodeSize();
var g_zoomSettingsLoads = new cViewSettings;

var g_ch = String.fromCharCode(189);
var g_aToolBarIds = ["#tool_open", "#tool_save", "#tool_new", "#tool_zoom_out", "#tool_zoom_in", "#tool_select", "#tool_escape", "#tool_delete", "#tool_sections", "#tool_supports", "#tool_hinge", "#tool_load", "#tool_calc", "#tool_view", "#tool_settings", "#tool_tools"];

var g_ar = [
        ["tool_tools", '<i class="fa fa-caret-down"></i> Tools', '<i class="fa fa-caret-down"></i>'],
        ["tool_settings", '<i class="fa fa-wrench"></i> Settings', '<i class="fa fa-wrench"></i>'],
        ["tool_new", '<i class="fa fa-file-o"></i> New', '<i class="fa fa-file-o"></i>'],
        ["tool_save", '<i class="fa fa-save"></i> Save', '<i class="fa fa-save"></i>'],
        ["tool_open", '<i class="fa fa-folder-open-o"></i> Open', '<i class="fa fa-folder-open-o"></i>'],
        ["tool_delete", '<i class="fa fa-trash-o"></i> Remove', '<i class="fa fa-trash-o"></i>'],
        ["tool_view", '<i class="fa fa-signal"></i> Diagrams', '<i class="fa fa-signal"></i>'],
        ["tool_calc", '<i class="fa fa-play"></i> Solve', '<i class="fa fa-play"></i>'],
        ["tool_select", '<i class="fa fa-square-o"></i> Select', '<i class="fa fa-square-o"></i>'],
        ["tool_escape", '<i class="fa fa-remove"></i> De-Select', '<i class="fa fa-remove"></i>'],
        ["tool_load", '<i class="fa fa-arrow-down"></i> Loads', '<i class="fa fa-arrow-down"></i>'],
        ["tool_supports", '<i class="fa fa-eject"></i> Supports', '<i class="fa fa-eject"></i>'],
        ["tool_hinge", '<i class="fa fa-circle-o"></i> Hinges', '<i class="fa fa-circle-o"></i>'],
        ["tool_sections", '<i class="fa fa-th-list"></i> Sections', '<i class="fa fa-th-list"></i>']
    ];

var g_timer_TBF_count = 6;
var touchscreenSnapDragged = null;
var g_TouchTimerDelay = 0;
canvas = null;
var g_mouseMoveLastTime = null;
var g_timerDragFinished = null;
var g_flagDraggingIsActive = !1;
var scrollOldX = -1;
var scrollOldY = -1;
var timeOutIdScrollFinished = null;
var g_touchMoveRestoreTimerId = null;
var gTimerTouchActive = null;
var gTimerIgnorePlaceLoad = {
        timer: null
    };


var viewSettingsHinges = new cViewSettings;
var flagBaseUnits = !1;
var userIdForm = new RegExp("^[^&^<^>^'^\"]+$");
var cursorOld = "default";
var viewSettingsSupports = new cViewSettings;
var viewSettingsLoads = new cViewSettings;
var gScrollBarWidth = null;
console.log("end of form.js");
console.log("end of new.js");
console.log("end of interface_structs.js");
var guiScales = [.7, .85, 1, 1.1, 1.25],
    drawingScales = [.6, .8, 1, 1.25, 1.5],
    shiftAccordingToScale = [
        ["forceDesc", 0, 0, 0, 0, 0],
        ["coordDrawn", 0, 0, 0, 0, 0]
    ],
    g_PTT_counter = 0,
    g_stageCredit = 0,
    g_timeOutCredit1 = null,
    g_timeOutCredit2 = null,
    g_opacitySteps = 5,
    timeoutFade = 250,
    timeoutHold = 4600,
    timeoutBetween = 100,
    g_fnMessagesCallbackSolver = [],
    BeamSlicesCache = new cBeamSlicesCache,
    _model = null,
    BeamCache = new cBeamCachedValues;
var g_fileName = "Saved project",
    g_fileName_bak = "Autosave";
var g_interfNodes = [],
    g_interfBeams = [],
    g_interfLoads = [],
    g_modelMessages = new cMsgContainer;

solver_registerMessagesCallback(log_callback);
GUI_registerMessagesCallback(log_callback);
$(window).ready(function() {
    init();
    initStartUp();
    $("#sti_toolbar").bind("mouseover", mouseOverToolBar).bind("mouseout", mouseOutToolBar).bind("mouseleave", mouseOutToolBar);
    enableAllToolBars();
    initCredit();
    bindClick();
    fixHelpDialog();
    fixSectionsDialog();
    setTimeout(printObsoleteBrowserAlert, 1e3);
    // startDemo();
    // setTimeout(printCredit, 3e3);
    canvas.flag_iOS && $(":root > body > div.form_main_envelope").addClass("absolute");
    g_iPadChromeFixResolution = setTimeout(function() {
        g_iPadChromeFixResolution = null
    }, 2e3)
});
var g_iPadChromeFixResolution = null,
    g_timer = startBackupTimer(),
    g_flagObsoleteBrowser = !1,
    gScrollTouchDialog = [];
$(window).resize(function() {
    canvas && (console.log("win resize start"), g_iPadChromeFixResolution && (window.innerWidth < $(window).width() || window.innerHeight < $(window).height()) ? (g_iPadChromeFixResolution = null, scrollOldX = -1, scrollOldY = -1, $(window).scrollTop(0), $(window).scrollLeft(0), $(window).resize()) : resizeScreen(canvas), console.log("win resize end"))
}), "ontouchstart" in document.documentElement && (console.log("ontouchstart init"), $(document).on("touchstart", touchStart), $(document).on("touchend", touchEnd), $(document).on("touchcancel", touchCancel), $(document).on("touchmove", touchMove));
var lastInput = null;
var g_htmlDemoBasic = "<settings paperx='10' papery='8' imperialunits='false' drawingscale='1'></settings>",
    g_htmlDemoNodes = "<node index='1' coordx='3' coordy='5' restraintx='true' restrainty='true' restraintrotation='true'></node><node index='2' coordx='3' coordy='2' restraintx='false' restrainty='false' restraintrotation='false'></node><node index='5' coordx='6' coordy='2' restraintx='false' restrainty='false' restraintrotation='false'></node><node index='8' coordx='6' coordy='5' restraintx='true' restrainty='true' restraintrotation='false'></node>",
    g_htmlDemoSteps = ["<bar index='0' node1index='1' node2index='2' separator1x='false' separator1y='false' separator1rotation='false' separator2x='false' separator2y='false' separator2rotation='true'></bar>", "<bar index='3' node1index='2' node2index='5' separator1x='false' separator1y='false' separator1rotation='true' separator2x='false' separator2y='false' separator2rotation='false'></bar>", "<bar index='6' node1index='5' node2index='8' separator1x='false' separator1y='false' separator1rotation='false' separator2x='false' separator2y='false' separator2rotation='false'></bar>", "<linearload spanindex='3' f='1' angle='0' x1coord='4' y1coord='2' x2coord='6' y2coord='2'></uniformload>", "<singleforceload nodeindex='5' f='1' angle='270' xcoord='6' ycoord='2' m='0'></singleforceload>"],
    g_demoStepCounter = 0,
    g_demoMainTimer = null,
    g_demoDelay = 1e3,
    g_xDemoSize = 10,
    g_yDemoSize = 8,
    g_demoState = 0;