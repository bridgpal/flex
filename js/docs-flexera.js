/*! Magnific Popup - v1.1.0 - 2016-02-20
* http://dimsemenov.com/plugins/magnific-popup/
* Copyright (c) 2016 Dmitry Semenov; */
function updateMenus(e, t) {
    e !== $("#productMenu select").val() && $("#productMenu select").val(e),
    t !== $("#versiontMenu select").val() && (populateSelect("versionMenu"),
    $("#versionMenu select").val(t))
}
function updateSelected(e, t) {
    selProd = $("#productMenu select").val(),
    selVer = $("#versionMenu select").val()
}
function populateSelect(e) {
    var t, r, o = "product", n = $('<select id="' + e + '" name="' + e + '" />'), i = document.querySelector(`#${e} option`).label;
    $("<option />", {
        value: "",
        text: i
    }).appendTo(n),
    "productMenu" === e ? r = prodArr : "versionMenu" === e && (r = prodVerObj[curProd]),
    $.each(r, (function(e, t) {
        var r = t;
        if ("Didn't find your product?" === t) {
            var o = $("html").attr("lang");
            "de" === o ? r = "Haben Sie Ihr Produkt nicht gefunden?" : "ja" === o ? r = "上記以外の製品" : "fr" === o ? r = "Vous n'avez pas trouvé votre produit?" : "es" === o && (r = "¿No encontró su producto?")
        }
        $("<option />", {
            value: t,
            text: r
        }).appendTo(n)
    }
    )),
    n.appendTo("#tempselect"),
    $("#" + e).empty().append($("#tempselect").html()),
    $("#tempselect").html("")
}
function handleMenuUpdates() {
    $("#helpnet-filter-form").delegate("select", "change", (function() {
        if ("productMenu" === $(this).attr("id")) {
            if (curProd = $(this).val(),
            curVer = "",
            "Revenera Products" === curProd)
                return location.href = "https://docs.revenera.com/",
                !1;
            if ("Snow Products" === curProd)
                return location.href = "https://docs.snowsoftware.io/",
                !1;
            if ("Flexera Products" === curProd)
                return location.href = "https://docs.flexera.com/",
                !1;
            if ("Didn't find your product?" === curProd)
                return location.href = "https://docs.flexera.com/",
                !1;
            if ("Snow Adoption Tracker and Spend Optimizer" === curProd)
                return location.href = "https://docs-snow.flexera.com/other-snow-products/snow-adoption-tracker-and-spend-optimizer/",
                !1;
            if ("Snow Atlas" === curProd)
                return location.href = "https://docs-snow.flexera.com/snow-atlas/user-documentation/",
                !1;
            if ("Snow Commander" === curProd)
                return location.href = "https://docs.flexera.com/commander/",
                !1;
            if ("Snow Data Intelligence Service" === curProd)
                return location.href = "https://docs-snow.flexera.com/other-snow-products/data-intelligence-service/",
                !1;
            if ("Snow Device Manager" === curProd)
                return location.href = "https://docs-snow.flexera.com/other-snow-products/snow-device-manager/",
                !1;
            if ("Snow Integration Manager" === curProd)
                return location.href = "https://docs-snow.flexera.com/other-snow-products/snow-integration-manager/",
                !1;
            if ("Snow Inventory Agents and Oracle Scanners" === curProd)
                return location.href = "https://docs-snow.flexera.com/other-snow-products/snow-inventory-agents-and-oracle-scanners/",
                !1;
            if ("Snow Inventory Server" === curProd)
                return location.href = "https://docs-snow.flexera.com/other-snow-products/snow-inventory-server/",
                !1;
            if ("Snow ITSM Enhancer" === curProd)
                return location.href = "https://docs-snow.flexera.com/other-snow-products/itsm-enhancer/",
                !1;
            if ("Snow License Manager" === curProd)
                return location.href = "https://docs-snow.flexera.com/other-snow-products/snow-license-manager/",
                !1;
            if ("Snow License Manager user interface" === curProd)
                return location.href = "https://docs-slm.flexera.com/",
                !1;
            if ("Snow Optimizer for SAP® Software" === curProd)
                return location.href = "https://docs-sap.flexera.com/",
                !1;
            if ("Snow Productivity Optimizer" === curProd)
                return location.href = "https://docs-snow.flexera.com/other-snow-products/productivity-optimizer/",
                !1;
            if ("Snow Risk Monitor" === curProd)
                return location.href = "https://docs-snow.flexera.com/other-snow-products/snow-risk-monitor/",
                !1;
            if ("Snow Update Service" === curProd)
                return location.href = "https://docs-snow.flexera.com/other-snow-products/snow-update-service/",
                !1;
            if ("Eco" === curProd)
                return location.href = "https://docs-spot.flexera.com/eco/",
                !1;
            if ("Elastigroup" === curProd)
                return location.href = "https://docs-spot.flexera.com/elastigroup/",
                !1;
            if ("Elastigroup Stateful Node" === curProd)
                return location.href = "https://docs-spot.flexera.com/managed-instance/",
                !1;
            if ("Ocean" === curProd)
                return location.href = "https://docs-spot.flexera.com/ocean/",
                !1;
            if ("Ocean for Apache Spark" === curProd)
                return location.href = "https://docs-spot.flexera.com/ocean-spark/",
                !1;
            if ("Spot Administration" === curProd)
                return location.href = "https://docs-spot.flexera.com/administration/",
                !1;
            populateSelect("versionMenu"),
            updateQueryStringParam(),
            refreshPage()
        } else
            "versionMenu" === $(this).attr("id") && (curVer = $(this).val().toString(),
            filterTable(),
            updateQueryStringParam())
    }
    ))
}
function filterTable() {
    $("#helpnet-listing .listing .row").hide(),
    "" !== curProd ? (showListing(),
    "" !== curVer ? $("#helpnet-listing .listing .row").filter('[data-version="' + curVer.toString() + '"]').filter('[data-product="' + curProd + '"]').show() : $("#helpnet-listing .listing .row").filter('[data-product="' + curProd + '"]').show()) : ($("#versionMenu option:eq(0)").prop("selected", !0).closest("select").attr("disabled", !0),
    $("#prodMenu option:eq(0)").prop("selected", !0),
    hideListing())
}
function buildProdVerObj() {
    var e = $("#helpnet-listing .row");
    e.each((function() {
        var e;
        $(this).data("product") && (e = $(this).data("product"),
        -1 === prodArr.indexOf(e) && (prodArr.push(e),
        prodVerObj[e] = []))
    }
    )),
    $(".page-wrap").attr("class").includes("revenera") ? (prodArr.push("Snow Products"),
    prodArr.push("Flexera Products"),
    prodArr.sort()) : (prodArr.push("Revenera Products"),
    prodArr.push("Snow Adoption Tracker and Spend Optimizer"),
    prodArr.push("Snow Atlas"),
    prodArr.push("Snow Commander"),
    prodArr.push("Snow Data Intelligence Service"),
    prodArr.push("Snow Device Manager"),
    prodArr.push("Snow Integration Manager"),
    prodArr.push("Snow Inventory Agents and Oracle Scanners"),
    prodArr.push("Snow Inventory Server"),
    prodArr.push("Snow ITSM Enhancer"),
    prodArr.push("Snow License Manager"),
    prodArr.push("Snow License Manager user interface"),
    prodArr.push("Snow Optimizer for SAP® Software"),
    prodArr.push("Snow Productivity Optimizer"),
    prodArr.push("Snow Risk Monitor"),
    prodArr.push("Snow Update Service"),
    prodArr.push("Eco"),
    prodArr.push("Elastigroup"),
    prodArr.push("Elastigroup Stateful Node"),
    prodArr.push("Ocean"),
    prodArr.push("Ocean for Apache Spark"),
    prodArr.push("Spot Administration"),
    prodArr.sort()),
    $.each(prodArr, (function(t, r) {
        e.each((function() {
            var e;
            $(this).data("product") && $(this).data("product") === r && (e = $(this).data("version"),
            -1 === prodVerObj[r].indexOf(e) && prodVerObj[r].push(e))
        }
        ))
    }
    ))
}
function showListing() {
    $("#helpnet-start-message-container").slideUp(400, (function() {
        $("#helpnet-listing").fadeIn(200),
        $("body").addClass("js-listing-visible")
    }
    ))
}
function hideListing() {
    $("#helpnet-listing").fadeOut(200, (function() {
        $("#helpnet-start-message-container").slideDown(400),
        $("body").removeClass("js-listing-visible")
    }
    ))
}
function getQueryVariable(e) {
    for (var t, r = window.location.search.substring(1).split("&"), o = 0; o < r.length; o++) {
        var n = r[o].split("=");
        if (n[0] == e)
            return unescape(n[1])
    }
    return !1
}
function toStringObj(e) {
    return Object.keys(e).forEach((t => {
        if ("object" == typeof e[t])
            return toString(e[t]);
        e[t] = "" + e[t]
    }
    )),
    e
}
function refreshPage() {
    window.location.href = window.location.href
}
!function(e) {
    "function" == typeof define && define.amd ? define(["jquery"], e) : e("object" == typeof exports ? require("jquery") : window.jQuery || window.Zepto)
}((function(e) {
    var t, r, o, n, i, a, s = "Close", c = "BeforeClose", l = "AfterClose", d = "BeforeAppend", u = "MarkupParse", p = "Open", f = "Change", m = "mfp", g = "." + m, h = "mfp-ready", v = "mfp-removing", w = "mfp-prevent-close", y = function() {}, b = !!window.jQuery, S = e(window), C = function(e, r) {
        t.ev.on(m + e + g, r)
    }, x = function(t, r, o, n) {
        var i = document.createElement("div");
        return i.className = "mfp-" + t,
        o && (i.innerHTML = o),
        n ? r && r.appendChild(i) : (i = e(i),
        r && i.appendTo(r)),
        i
    }, P = function(r, o) {
        t.ev.triggerHandler(m + r, o),
        t.st.callbacks && (r = r.charAt(0).toLowerCase() + r.slice(1),
        t.st.callbacks[r] && t.st.callbacks[r].apply(t, e.isArray(o) ? o : [o]))
    }, I = function(r) {
        return r === a && t.currTemplate.closeBtn || (t.currTemplate.closeBtn = e(t.st.closeMarkup.replace("%title%", t.st.tClose)),
        a = r),
        t.currTemplate.closeBtn
    }, k = function() {
        e.magnificPopup.instance || ((t = new y).init(),
        e.magnificPopup.instance = t)
    }, M = function() {
        var e = document.createElement("p").style
          , t = ["ms", "O", "Moz", "Webkit"];
        if (void 0 !== e.transition)
            return !0;
        for (; t.length; )
            if (t.pop() + "Transition"in e)
                return !0;
        return !1
    };
    y.prototype = {
        constructor: y,
        init: function() {
            var r = navigator.appVersion;
            t.isLowIE = t.isIE8 = document.all && !document.addEventListener,
            t.isAndroid = /android/gi.test(r),
            t.isIOS = /iphone|ipad|ipod/gi.test(r),
            t.supportsTransition = M(),
            t.probablyMobile = t.isAndroid || t.isIOS || /(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(navigator.userAgent),
            o = e(document),
            t.popupsCache = {}
        },
        open: function(r) {
            var n;
            if (!1 === r.isObj) {
                t.items = r.items.toArray(),
                t.index = 0;
                var a, s = r.items;
                for (n = 0; n < s.length; n++)
                    if ((a = s[n]).parsed && (a = a.el[0]),
                    a === r.el[0]) {
                        t.index = n;
                        break
                    }
            } else
                t.items = e.isArray(r.items) ? r.items : [r.items],
                t.index = r.index || 0;
            if (!t.isOpen) {
                t.types = [],
                i = "",
                r.mainEl && r.mainEl.length ? t.ev = r.mainEl.eq(0) : t.ev = o,
                r.key ? (t.popupsCache[r.key] || (t.popupsCache[r.key] = {}),
                t.currTemplate = t.popupsCache[r.key]) : t.currTemplate = {},
                t.st = e.extend(!0, {}, e.magnificPopup.defaults, r),
                t.fixedContentPos = "auto" === t.st.fixedContentPos ? !t.probablyMobile : t.st.fixedContentPos,
                t.st.modal && (t.st.closeOnContentClick = !1,
                t.st.closeOnBgClick = !1,
                t.st.showCloseBtn = !1,
                t.st.enableEscapeKey = !1),
                t.bgOverlay || (t.bgOverlay = x("bg").on("click" + g, (function() {
                    t.close()
                }
                )),
                t.wrap = x("wrap").attr("tabindex", -1).on("click" + g, (function(e) {
                    t._checkIfClose(e.target) && t.close()
                }
                )),
                t.container = x("container", t.wrap)),
                t.contentContainer = x("content"),
                t.st.preloader && (t.preloader = x("preloader", t.container, t.st.tLoading));
                var c = e.magnificPopup.modules;
                for (n = 0; n < c.length; n++) {
                    var l = c[n];
                    l = l.charAt(0).toUpperCase() + l.slice(1),
                    t["init" + l].call(t)
                }
                P("BeforeOpen"),
                t.st.showCloseBtn && (t.st.closeBtnInside ? (C(u, (function(e, t, r, o) {
                    r.close_replaceWith = I(o.type)
                }
                )),
                i += " mfp-close-btn-in") : t.wrap.append(I())),
                t.st.alignTop && (i += " mfp-align-top"),
                t.fixedContentPos ? t.wrap.css({
                    overflow: t.st.overflowY,
                    overflowX: "hidden",
                    overflowY: t.st.overflowY
                }) : t.wrap.css({
                    top: S.scrollTop(),
                    position: "absolute"
                }),
                (!1 === t.st.fixedBgPos || "auto" === t.st.fixedBgPos && !t.fixedContentPos) && t.bgOverlay.css({
                    height: o.height(),
                    position: "absolute"
                }),
                t.st.enableEscapeKey && o.on("keyup" + g, (function(e) {
                    27 === e.keyCode && t.close()
                }
                )),
                S.on("resize" + g, (function() {
                    t.updateSize()
                }
                )),
                t.st.closeOnContentClick || (i += " mfp-auto-cursor"),
                i && t.wrap.addClass(i);
                var d = t.wH = S.height()
                  , f = {};
                if (t.fixedContentPos && t._hasScrollBar(d)) {
                    var m = t._getScrollbarSize();
                    m && (f.marginRight = m)
                }
                t.fixedContentPos && (t.isIE7 ? e("body, html").css("overflow", "hidden") : f.overflow = "hidden");
                var v = t.st.mainClass;
                return t.isIE7 && (v += " mfp-ie7"),
                v && t._addClassToMFP(v),
                t.updateItemHTML(),
                P("BuildControls"),
                e("html").css(f),
                t.bgOverlay.add(t.wrap).prependTo(t.st.prependTo || e(document.body)),
                t._lastFocusedEl = document.activeElement,
                setTimeout((function() {
                    t.content ? (t._addClassToMFP(h),
                    t._setFocus()) : t.bgOverlay.addClass(h),
                    o.on("focusin" + g, t._onFocusIn)
                }
                ), 16),
                t.isOpen = !0,
                t.updateSize(d),
                P(p),
                r
            }
            t.updateItemHTML()
        },
        close: function() {
            t.isOpen && (P(c),
            t.isOpen = !1,
            t.st.removalDelay && !t.isLowIE && t.supportsTransition ? (t._addClassToMFP(v),
            setTimeout((function() {
                t._close()
            }
            ), t.st.removalDelay)) : t._close())
        },
        _close: function() {
            P(s);
            var r = v + " " + h + " ";
            if (t.bgOverlay.detach(),
            t.wrap.detach(),
            t.container.empty(),
            t.st.mainClass && (r += t.st.mainClass + " "),
            t._removeClassFromMFP(r),
            t.fixedContentPos) {
                var n = {
                    marginRight: ""
                };
                t.isIE7 ? e("body, html").css("overflow", "") : n.overflow = "",
                e("html").css(n)
            }
            o.off("keyup.mfp focusin" + g),
            t.ev.off(g),
            t.wrap.attr("class", "mfp-wrap").removeAttr("style"),
            t.bgOverlay.attr("class", "mfp-bg"),
            t.container.attr("class", "mfp-container"),
            !t.st.showCloseBtn || t.st.closeBtnInside && !0 !== t.currTemplate[t.currItem.type] || t.currTemplate.closeBtn && t.currTemplate.closeBtn.detach(),
            t.st.autoFocusLast && t._lastFocusedEl && e(t._lastFocusedEl).focus(),
            t.currItem = null,
            t.content = null,
            t.currTemplate = null,
            t.prevHeight = 0,
            P(l)
        },
        updateSize: function(e) {
            if (t.isIOS) {
                var r = document.documentElement.clientWidth / window.innerWidth
                  , o = window.innerHeight * r;
                t.wrap.css("height", o),
                t.wH = o
            } else
                t.wH = e || S.height();
            t.fixedContentPos || t.wrap.css("height", t.wH),
            P("Resize")
        },
        updateItemHTML: function() {
            var r = t.items[t.index];
            t.contentContainer.detach(),
            t.content && t.content.detach(),
            r.parsed || (r = t.parseEl(t.index));
            var o = r.type;
            if (P("BeforeChange", [t.currItem ? t.currItem.type : "", o]),
            t.currItem = r,
            !t.currTemplate[o]) {
                var i = !!t.st[o] && t.st[o].markup;
                P("FirstMarkupParse", i),
                t.currTemplate[o] = !i || e(i)
            }
            n && n !== r.type && t.container.removeClass("mfp-" + n + "-holder");
            var a = t["get" + o.charAt(0).toUpperCase() + o.slice(1)](r, t.currTemplate[o]);
            t.appendContent(a, o),
            r.preloaded = !0,
            P(f, r),
            n = r.type,
            t.container.prepend(t.contentContainer),
            P("AfterChange")
        },
        appendContent: function(e, r) {
            t.content = e,
            e ? t.st.showCloseBtn && t.st.closeBtnInside && !0 === t.currTemplate[r] ? t.content.find(".mfp-close").length || t.content.append(I()) : t.content = e : t.content = "",
            P(d),
            t.container.addClass("mfp-" + r + "-holder"),
            t.contentContainer.append(t.content)
        },
        parseEl: function(r) {
            var o, n = t.items[r];
            if (n.tagName ? n = {
                el: e(n)
            } : (o = n.type,
            n = {
                data: n,
                src: n.src
            }),
            n.el) {
                for (var i = t.types, a = 0; a < i.length; a++)
                    if (n.el.hasClass("mfp-" + i[a])) {
                        o = i[a];
                        break
                    }
                n.src = n.el.attr("data-mfp-src"),
                n.src || (n.src = n.el.attr("href"))
            }
            return n.type = o || t.st.type || "inline",
            n.index = r,
            n.parsed = !0,
            t.items[r] = n,
            P("ElementParse", n),
            t.items[r]
        },
        addGroup: function(e, r) {
            var o = function(o) {
                o.mfpEl = this,
                t._openClick(o, e, r)
            };
            r || (r = {});
            var n = "click.magnificPopup";
            r.mainEl = e,
            r.items ? (r.isObj = !0,
            e.off(n).on(n, o)) : (r.isObj = !1,
            r.delegate ? e.off(n).on(n, r.delegate, o) : (r.items = e,
            e.off(n).on(n, o)))
        },
        _openClick: function(r, o, n) {
            var i;
            if ((void 0 !== n.midClick ? n.midClick : e.magnificPopup.defaults.midClick) || !(2 === r.which || r.ctrlKey || r.metaKey || r.altKey || r.shiftKey)) {
                var a = void 0 !== n.disableOn ? n.disableOn : e.magnificPopup.defaults.disableOn;
                if (a)
                    if (e.isFunction(a)) {
                        if (!a.call(t))
                            return !0
                    } else if (S.width() < a)
                        return !0;
                r.type && (r.preventDefault(),
                t.isOpen && r.stopPropagation()),
                n.el = e(r.mfpEl),
                n.delegate && (n.items = o.find(n.delegate)),
                t.open(n)
            }
        },
        updateStatus: function(e, o) {
            if (t.preloader) {
                r !== e && t.container.removeClass("mfp-s-" + r),
                o || "loading" !== e || (o = t.st.tLoading);
                var n = {
                    status: e,
                    text: o
                };
                P("UpdateStatus", n),
                e = n.status,
                o = n.text,
                t.preloader.html(o),
                t.preloader.find("a").on("click", (function(e) {
                    e.stopImmediatePropagation()
                }
                )),
                t.container.addClass("mfp-s-" + e),
                r = e
            }
        },
        _checkIfClose: function(r) {
            if (!e(r).hasClass(w)) {
                var o = t.st.closeOnContentClick
                  , n = t.st.closeOnBgClick;
                if (o && n)
                    return !0;
                if (!t.content || e(r).hasClass("mfp-close") || t.preloader && r === t.preloader[0])
                    return !0;
                if (r === t.content[0] || e.contains(t.content[0], r)) {
                    if (o)
                        return !0
                } else if (n && e.contains(document, r))
                    return !0;
                return !1
            }
        },
        _addClassToMFP: function(e) {
            t.bgOverlay.addClass(e),
            t.wrap.addClass(e)
        },
        _removeClassFromMFP: function(e) {
            this.bgOverlay.removeClass(e),
            t.wrap.removeClass(e)
        },
        _hasScrollBar: function(e) {
            return (t.isIE7 ? o.height() : document.body.scrollHeight) > (e || S.height())
        },
        _setFocus: function() {
            (t.st.focus ? t.content.find(t.st.focus).eq(0) : t.wrap).focus()
        },
        _onFocusIn: function(r) {
            return r.target === t.wrap[0] || e.contains(t.wrap[0], r.target) ? void 0 : (t._setFocus(),
            !1)
        },
        _parseMarkup: function(t, r, o) {
            var n;
            o.data && (r = e.extend(o.data, r)),
            P(u, [t, r, o]),
            e.each(r, (function(r, o) {
                if (void 0 === o || !1 === o)
                    return !0;
                if ((n = r.split("_")).length > 1) {
                    var i = t.find(g + "-" + n[0]);
                    if (i.length > 0) {
                        var a = n[1];
                        "replaceWith" === a ? i[0] !== o[0] && i.replaceWith(o) : "img" === a ? i.is("img") ? i.attr("src", o) : i.replaceWith(e("<img>").attr("src", o).attr("class", i.attr("class"))) : i.attr(n[1], o)
                    }
                } else
                    t.find(g + "-" + r).html(o)
            }
            ))
        },
        _getScrollbarSize: function() {
            if (void 0 === t.scrollbarSize) {
                var e = document.createElement("div");
                e.style.cssText = "width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;",
                document.body.appendChild(e),
                t.scrollbarSize = e.offsetWidth - e.clientWidth,
                document.body.removeChild(e)
            }
            return t.scrollbarSize
        }
    },
    e.magnificPopup = {
        instance: null,
        proto: y.prototype,
        modules: [],
        open: function(t, r) {
            return k(),
            (t = t ? e.extend(!0, {}, t) : {}).isObj = !0,
            t.index = r || 0,
            this.instance.open(t)
        },
        close: function() {
            return e.magnificPopup.instance && e.magnificPopup.instance.close()
        },
        registerModule: function(t, r) {
            r.options && (e.magnificPopup.defaults[t] = r.options),
            e.extend(this.proto, r.proto),
            this.modules.push(t)
        },
        defaults: {
            disableOn: 0,
            key: null,
            midClick: !1,
            mainClass: "",
            preloader: !0,
            focus: "",
            closeOnContentClick: !1,
            closeOnBgClick: !0,
            closeBtnInside: !0,
            showCloseBtn: !0,
            enableEscapeKey: !0,
            modal: !1,
            alignTop: !1,
            removalDelay: 0,
            prependTo: null,
            fixedContentPos: "auto",
            fixedBgPos: "auto",
            overflowY: "auto",
            closeMarkup: '<button title="%title%" type="button" class="mfp-close">&#215;</button>',
            tClose: "Close (Esc)",
            tLoading: "Loading...",
            autoFocusLast: !0
        }
    },
    e.fn.magnificPopup = function(r, o) {
        k();
        var n = e(this);
        if ("string" == typeof r)
            if ("open" === r) {
                var i, a = b ? n.data("magnificPopup") : n[0].magnificPopup, s = parseInt(o, 10) || 0;
                a.items ? i = a.items[s] : (i = n,
                a.delegate && (i = i.find(a.delegate)),
                i = i.eq(s)),
                t._openClick({
                    mfpEl: i
                }, n, a)
            } else
                t.isOpen && t[r].apply(t, Array.prototype.slice.call(arguments, 1));
        else
            r = e.extend(!0, {}, r),
            b ? n.data("magnificPopup", r) : n[0].magnificPopup = r,
            t.addGroup(n, r);
        return n
    }
    ;
    var O, T, _, A = "inline", z = function() {
        _ && (T.after(_.addClass(O)).detach(),
        _ = null)
    };
    e.magnificPopup.registerModule(A, {
        options: {
            hiddenClass: "hide",
            markup: "",
            tNotFound: "Content not found"
        },
        proto: {
            initInline: function() {
                t.types.push(A),
                C(s + "." + A, (function() {
                    z()
                }
                ))
            },
            getInline: function(r, o) {
                if (z(),
                r.src) {
                    var n = t.st.inline
                      , i = e(r.src);
                    if (i.length) {
                        var a = i[0].parentNode;
                        a && a.tagName && (T || (O = n.hiddenClass,
                        T = x(O),
                        O = "mfp-" + O),
                        _ = i.after(T).detach().removeClass(O)),
                        t.updateStatus("ready")
                    } else
                        t.updateStatus("error", n.tNotFound),
                        i = e("<div>");
                    return r.inlineElement = i,
                    i
                }
                return t.updateStatus("ready"),
                t._parseMarkup(o, {}, r),
                o
            }
        }
    });
    var E, j = "ajax", L = function() {
        E && e(document.body).removeClass(E)
    }, B = function() {
        L(),
        t.req && t.req.abort()
    };
    e.magnificPopup.registerModule(j, {
        options: {
            settings: null,
            cursor: "mfp-ajax-cur",
            tError: '<a href="%url%">The content</a> could not be loaded.'
        },
        proto: {
            initAjax: function() {
                t.types.push(j),
                E = t.st.ajax.cursor,
                C(s + "." + j, B),
                C("BeforeChange." + j, B)
            },
            getAjax: function(r) {
                E && e(document.body).addClass(E),
                t.updateStatus("loading");
                var o = e.extend({
                    url: r.src,
                    success: function(o, n, i) {
                        var a = {
                            data: o,
                            xhr: i
                        };
                        P("ParseAjax", a),
                        t.appendContent(e(a.data), j),
                        r.finished = !0,
                        L(),
                        t._setFocus(),
                        setTimeout((function() {
                            t.wrap.addClass(h)
                        }
                        ), 16),
                        t.updateStatus("ready"),
                        P("AjaxContentAdded")
                    },
                    error: function() {
                        L(),
                        r.finished = r.loadError = !0,
                        t.updateStatus("error", t.st.ajax.tError.replace("%url%", r.src))
                    }
                }, t.st.ajax.settings);
                return t.req = e.ajax(o),
                ""
            }
        }
    });
    var V, F = function(r) {
        if (r.data && void 0 !== r.data.title)
            return r.data.title;
        var o = t.st.image.titleSrc;
        if (o) {
            if (e.isFunction(o))
                return o.call(t, r);
            if (r.el)
                return r.el.attr(o) || ""
        }
        return ""
    };
    e.magnificPopup.registerModule("image", {
        options: {
            markup: '<div class="mfp-figure"><div class="mfp-close"></div><figure><div class="mfp-img"></div><figcaption><div class="mfp-bottom-bar"><div class="mfp-title"></div><div class="mfp-counter"></div></div></figcaption></figure></div>',
            cursor: "mfp-zoom-out-cur",
            titleSrc: "title",
            verticalFit: !0,
            tError: '<a href="%url%">The image</a> could not be loaded.'
        },
        proto: {
            initImage: function() {
                var r = t.st.image
                  , o = ".image";
                t.types.push("image"),
                C(p + o, (function() {
                    "image" === t.currItem.type && r.cursor && e(document.body).addClass(r.cursor)
                }
                )),
                C(s + o, (function() {
                    r.cursor && e(document.body).removeClass(r.cursor),
                    S.off("resize" + g)
                }
                )),
                C("Resize" + o, t.resizeImage),
                t.isLowIE && C("AfterChange", t.resizeImage)
            },
            resizeImage: function() {
                var e = t.currItem;
                if (e && e.img && t.st.image.verticalFit) {
                    var r = 0;
                    t.isLowIE && (r = parseInt(e.img.css("padding-top"), 10) + parseInt(e.img.css("padding-bottom"), 10)),
                    e.img.css("max-height", t.wH - r)
                }
            },
            _onImageHasSize: function(e) {
                e.img && (e.hasSize = !0,
                V && clearInterval(V),
                e.isCheckingImgSize = !1,
                P("ImageHasSize", e),
                e.imgHidden && (t.content && t.content.removeClass("mfp-loading"),
                e.imgHidden = !1))
            },
            findImageSize: function(e) {
                var r = 0
                  , o = e.img[0]
                  , n = function(i) {
                    V && clearInterval(V),
                    V = setInterval((function() {
                        return o.naturalWidth > 0 ? void t._onImageHasSize(e) : (r > 200 && clearInterval(V),
                        void (3 === ++r ? n(10) : 40 === r ? n(50) : 100 === r && n(500)))
                    }
                    ), i)
                };
                n(1)
            },
            getImage: function(r, o) {
                var n = 0
                  , i = function() {
                    r && (r.img[0].complete ? (r.img.off(".mfploader"),
                    r === t.currItem && (t._onImageHasSize(r),
                    t.updateStatus("ready")),
                    r.hasSize = !0,
                    r.loaded = !0,
                    P("ImageLoadComplete")) : 200 > ++n ? setTimeout(i, 100) : a())
                }
                  , a = function() {
                    r && (r.img.off(".mfploader"),
                    r === t.currItem && (t._onImageHasSize(r),
                    t.updateStatus("error", s.tError.replace("%url%", r.src))),
                    r.hasSize = !0,
                    r.loaded = !0,
                    r.loadError = !0)
                }
                  , s = t.st.image
                  , c = o.find(".mfp-img");
                if (c.length) {
                    var l = document.createElement("img");
                    l.className = "mfp-img",
                    r.el && r.el.find("img").length && (l.alt = r.el.find("img").attr("alt")),
                    r.img = e(l).on("load.mfploader", i).on("error.mfploader", a),
                    l.src = r.src,
                    c.is("img") && (r.img = r.img.clone()),
                    (l = r.img[0]).naturalWidth > 0 ? r.hasSize = !0 : l.width || (r.hasSize = !1)
                }
                return t._parseMarkup(o, {
                    title: F(r),
                    img_replaceWith: r.img
                }, r),
                t.resizeImage(),
                r.hasSize ? (V && clearInterval(V),
                r.loadError ? (o.addClass("mfp-loading"),
                t.updateStatus("error", s.tError.replace("%url%", r.src))) : (o.removeClass("mfp-loading"),
                t.updateStatus("ready")),
                o) : (t.updateStatus("loading"),
                r.loading = !0,
                r.hasSize || (r.imgHidden = !0,
                o.addClass("mfp-loading"),
                t.findImageSize(r)),
                o)
            }
        }
    });
    var H, N = function() {
        return void 0 === H && (H = void 0 !== document.createElement("p").style.MozTransform),
        H
    };
    e.magnificPopup.registerModule("zoom", {
        options: {
            enabled: !1,
            easing: "ease-in-out",
            duration: 300,
            opener: function(e) {
                return e.is("img") ? e : e.find("img")
            }
        },
        proto: {
            initZoom: function() {
                var e, r = t.st.zoom, o = ".zoom";
                if (r.enabled && t.supportsTransition) {
                    var n, i, a = r.duration, l = function(e) {
                        var t = e.clone().removeAttr("style").removeAttr("class").addClass("mfp-animated-image")
                          , o = "all " + r.duration / 1e3 + "s " + r.easing
                          , n = {
                            position: "fixed",
                            zIndex: 9999,
                            left: 0,
                            top: 0,
                            "-webkit-backface-visibility": "hidden"
                        }
                          , i = "transition";
                        return n["-webkit-" + i] = n["-moz-" + i] = n["-o-" + i] = n[i] = o,
                        t.css(n),
                        t
                    }, d = function() {
                        t.content.css("visibility", "visible")
                    };
                    C("BuildControls" + o, (function() {
                        if (t._allowZoom()) {
                            if (clearTimeout(n),
                            t.content.css("visibility", "hidden"),
                            !(e = t._getItemToZoom()))
                                return void d();
                            (i = l(e)).css(t._getOffset()),
                            t.wrap.append(i),
                            n = setTimeout((function() {
                                i.css(t._getOffset(!0)),
                                n = setTimeout((function() {
                                    d(),
                                    setTimeout((function() {
                                        i.remove(),
                                        e = i = null,
                                        P("ZoomAnimationEnded")
                                    }
                                    ), 16)
                                }
                                ), a)
                            }
                            ), 16)
                        }
                    }
                    )),
                    C(c + o, (function() {
                        if (t._allowZoom()) {
                            if (clearTimeout(n),
                            t.st.removalDelay = a,
                            !e) {
                                if (!(e = t._getItemToZoom()))
                                    return;
                                i = l(e)
                            }
                            i.css(t._getOffset(!0)),
                            t.wrap.append(i),
                            t.content.css("visibility", "hidden"),
                            setTimeout((function() {
                                i.css(t._getOffset())
                            }
                            ), 16)
                        }
                    }
                    )),
                    C(s + o, (function() {
                        t._allowZoom() && (d(),
                        i && i.remove(),
                        e = null)
                    }
                    ))
                }
            },
            _allowZoom: function() {
                return "image" === t.currItem.type
            },
            _getItemToZoom: function() {
                return !!t.currItem.hasSize && t.currItem.img
            },
            _getOffset: function(r) {
                var o, n = (o = r ? t.currItem.img : t.st.zoom.opener(t.currItem.el || t.currItem)).offset(), i = parseInt(o.css("padding-top"), 10), a = parseInt(o.css("padding-bottom"), 10);
                n.top -= e(window).scrollTop() - i;
                var s = {
                    width: o.width(),
                    height: (b ? o.innerHeight() : o[0].offsetHeight) - a - i
                };
                return N() ? s["-moz-transform"] = s.transform = "translate(" + n.left + "px," + n.top + "px)" : (s.left = n.left,
                s.top = n.top),
                s
            }
        }
    });
    var R = "iframe"
      , q = "//about:blank"
      , D = function(e) {
        if (t.currTemplate[R]) {
            var r = t.currTemplate[R].find("iframe");
            r.length && (e || (r[0].src = q),
            t.isIE8 && r.css("display", e ? "block" : "none"))
        }
    };
    e.magnificPopup.registerModule(R, {
        options: {
            markup: '<div class="mfp-iframe-scaler"><div class="mfp-close"></div><iframe class="mfp-iframe" src="//about:blank" frameborder="0" allowfullscreen></iframe></div>',
            srcAction: "iframe_src",
            patterns: {
                youtube: {
                    index: "youtube.com",
                    id: "v=",
                    src: "//www.youtube.com/embed/%id%?autoplay=1"
                },
                vimeo: {
                    index: "vimeo.com/",
                    id: "/",
                    src: "//player.vimeo.com/video/%id%?autoplay=1"
                },
                gmaps: {
                    index: "//maps.google.",
                    src: "%id%&output=embed"
                }
            }
        },
        proto: {
            initIframe: function() {
                t.types.push(R),
                C("BeforeChange", (function(e, t, r) {
                    t !== r && (t === R ? D() : r === R && D(!0))
                }
                )),
                C(s + "." + R, (function() {
                    D()
                }
                ))
            },
            getIframe: function(r, o) {
                var n = r.src
                  , i = t.st.iframe;
                e.each(i.patterns, (function() {
                    return n.indexOf(this.index) > -1 ? (this.id && (n = "string" == typeof this.id ? n.substr(n.lastIndexOf(this.id) + this.id.length, n.length) : this.id.call(this, n)),
                    n = this.src.replace("%id%", n),
                    !1) : void 0
                }
                ));
                var a = {};
                return i.srcAction && (a[i.srcAction] = n),
                t._parseMarkup(o, a, r),
                t.updateStatus("ready"),
                o
            }
        }
    });
    var W = function(e) {
        var r = t.items.length;
        return e > r - 1 ? e - r : 0 > e ? r + e : e
    }
      , Z = function(e, t, r) {
        return e.replace(/%curr%/gi, t + 1).replace(/%total%/gi, r)
    };
    e.magnificPopup.registerModule("gallery", {
        options: {
            enabled: !1,
            arrowMarkup: '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',
            preload: [0, 2],
            navigateByImgClick: !0,
            arrows: !0,
            tPrev: "Previous (Left arrow key)",
            tNext: "Next (Right arrow key)",
            tCounter: "%curr% of %total%"
        },
        proto: {
            initGallery: function() {
                var r = t.st.gallery
                  , n = ".mfp-gallery";
                return t.direction = !0,
                !(!r || !r.enabled) && (i += " mfp-gallery",
                C(p + n, (function() {
                    r.navigateByImgClick && t.wrap.on("click" + n, ".mfp-img", (function() {
                        return t.items.length > 1 ? (t.next(),
                        !1) : void 0
                    }
                    )),
                    o.on("keydown" + n, (function(e) {
                        37 === e.keyCode ? t.prev() : 39 === e.keyCode && t.next()
                    }
                    ))
                }
                )),
                C("UpdateStatus" + n, (function(e, r) {
                    r.text && (r.text = Z(r.text, t.currItem.index, t.items.length))
                }
                )),
                C(u + n, (function(e, o, n, i) {
                    var a = t.items.length;
                    n.counter = a > 1 ? Z(r.tCounter, i.index, a) : ""
                }
                )),
                C("BuildControls" + n, (function() {
                    if (t.items.length > 1 && r.arrows && !t.arrowLeft) {
                        var o = r.arrowMarkup
                          , n = t.arrowLeft = e(o.replace(/%title%/gi, r.tPrev).replace(/%dir%/gi, "left")).addClass(w)
                          , i = t.arrowRight = e(o.replace(/%title%/gi, r.tNext).replace(/%dir%/gi, "right")).addClass(w);
                        n.click((function() {
                            t.prev()
                        }
                        )),
                        i.click((function() {
                            t.next()
                        }
                        )),
                        t.container.append(n.add(i))
                    }
                }
                )),
                C(f + n, (function() {
                    t._preloadTimeout && clearTimeout(t._preloadTimeout),
                    t._preloadTimeout = setTimeout((function() {
                        t.preloadNearbyImages(),
                        t._preloadTimeout = null
                    }
                    ), 16)
                }
                )),
                void C(s + n, (function() {
                    o.off(n),
                    t.wrap.off("click" + n),
                    t.arrowRight = t.arrowLeft = null
                }
                )))
            },
            next: function() {
                t.direction = !0,
                t.index = W(t.index + 1),
                t.updateItemHTML()
            },
            prev: function() {
                t.direction = !1,
                t.index = W(t.index - 1),
                t.updateItemHTML()
            },
            goTo: function(e) {
                t.direction = e >= t.index,
                t.index = e,
                t.updateItemHTML()
            },
            preloadNearbyImages: function() {
                var e, r = t.st.gallery.preload, o = Math.min(r[0], t.items.length), n = Math.min(r[1], t.items.length);
                for (e = 1; e <= (t.direction ? n : o); e++)
                    t._preloadItem(t.index + e);
                for (e = 1; e <= (t.direction ? o : n); e++)
                    t._preloadItem(t.index - e)
            },
            _preloadItem: function(r) {
                if (r = W(r),
                !t.items[r].preloaded) {
                    var o = t.items[r];
                    o.parsed || (o = t.parseEl(r)),
                    P("LazyLoad", o),
                    "image" === o.type && (o.img = e('<img class="mfp-img" />').on("load.mfploader", (function() {
                        o.hasSize = !0
                    }
                    )).on("error.mfploader", (function() {
                        o.hasSize = !0,
                        o.loadError = !0,
                        P("LazyLoadError", o)
                    }
                    )).attr("src", o.src)),
                    o.preloaded = !0
                }
            }
        }
    });
    var U = "retina";
    e.magnificPopup.registerModule(U, {
        options: {
            replaceSrc: function(e) {
                return e.src.replace(/\.\w+$/, (function(e) {
                    return "@2x" + e
                }
                ))
            },
            ratio: 1
        },
        proto: {
            initRetina: function() {
                if (window.devicePixelRatio > 1) {
                    var e = t.st.retina
                      , r = e.ratio;
                    (r = isNaN(r) ? r() : r) > 1 && (C("ImageHasSize." + U, (function(e, t) {
                        t.img.css({
                            "max-width": t.img[0].naturalWidth / r,
                            width: "100%"
                        })
                    }
                    )),
                    C("ElementParse." + U, (function(t, o) {
                        o.src = e.replaceSrc(o, r)
                    }
                    )))
                }
            }
        }
    }),
    k()
}
)),
$(document).ready(function() {
    // Initialize global variables
    window.curProd = "";
    window.curVer = "";
    window.prodArr = [];
    window.prodVerObj = {};
    window.initialView = true;
    
    // Function to initialize pickers and page state
    function initializePickers() {
        buildProdVerObj();
        populateSelect("productMenu");
        populateSelect("versionMenu");
        
        // Handle legacy hash-based navigation
        if (location.hash) {
            var queryString = "";
            switch (location.hash) {
                case "#csicloud00":
                    queryString = "product=Software%20Vulnerability%20Manager%20Cloud&version=Current";
                    break;
                case "#csicloud99":
                    queryString = "product=Software%20Vulnerability%20Manager%20Cloud&version=2019";
                    break;
                case "#csionprem00":
                    queryString = "product=Software%20Vulnerability%20Manager%20On%20Premises&version=Current";
                    break;
                case "#csionprem99":
                    queryString = "product=Software%20Vulnerability%20Manager%20On%20Premises&version=2019";
                    break;
                case "#svm00":
                    queryString = "product=Software%20Vulnerability%20Research&version=Current";
                    break;
                case "#svm99":
                    queryString = "product=Software%20Vulnerability%20Research&version=2019";
                    break;
            }
            if (queryString) {
                history.replaceState(null, null, " ");
                window.location.search = queryString;
            }
        }
        
        // Handle browser back/forward navigation
        window.onpopstate = function() {
            var product = getQueryVariable("product");
            var version = String(getQueryVariable("version"));
            
            if (typeof prodVerObj[product] === "undefined") {
                product = "";
                version = "";
            }
            
            if (prodVerObj[product]) {
                toStringObj(prodVerObj[product]);
                if (prodVerObj[product].indexOf(version) === -1) {
                    version = "";
                }
            }
            
            curProd = product;
            curVer = version;
            
            if (curProd !== "") {
                populateSelect("versionMenu");
            }
            
            updateMenus(product, version);
            filterTable();
            initialView = false;
        };
        
        window.onpopstate();
        
        // Set up click handlers for document links (after content is loaded)
        $("#helpnet-listing .listing .cell a").each(function() {
            if ($(this).attr("href") === "") {
                $(this).contents().unwrap();
            }
        });
        
        $("#helpnet-listing .listing a").on("click", function(e) {
            e.preventDefault();
            e.stopPropagation();
            var href = $(this).attr("href");
            if (href && href.length >= 1) {
                var isPdfOrZip = /\.(pdf|zip)$/i.test(href);
                var target = isPdfOrZip ? "_blank" : "_self";
                window.open(href, target);
            }
        });
        
        $("#helpnet-listing .listing .cell:first-child").on("click", function(e) {
            e.preventDefault();
            var href = $(this).find("a:first").attr("href");
            if (href && href.length >= 1) {
                var isPdfOrZip = /\.(pdf|zip)$/i.test(href);
                var target = isPdfOrZip ? "_blank" : "_self";
                window.open(href, target);
            }
        });
    }
    
    // Wait for includes to load before initializing pickers
    if (document.getElementById('includes-container')) {
        document.addEventListener('includesLoaded', initializePickers);
    } else {
        initializePickers();
    }
    
    // Set up menu toggle
    handleMenuUpdates();
    
    $(".menu-toggle").click(function() {
        $(".menu-toggle").next(".menu").toggleClass("active");
    });
    
    // Set up lightbox for images
    if (document.querySelector(".lightbox-image")) {
        $(".lightbox-image").magnificPopup({
            type: "image"
        });
    }
});
document.querySelector(".lightbox-image") && $(".lightbox-image").magnificPopup({
    type: "image"
});
var updateQueryStringParam = function(e, t) {
    var r = [location.protocol, "//", location.host, location.pathname].join(""), o = document.location.search, n, i = "?" + (e + "=" + t);
    i = "" !== curProd ? "" !== curVer ? "?product=" + curProd + "&version=" + curVer : "?product=" + curProd : "",
    window.history.pushState({}, document.title, r + i)
};
