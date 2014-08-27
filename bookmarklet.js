//javascript:
(function() {
    var config = {
        "zz": 10000,
        "canDrawRange": 1,
        "towers": {
            "cannon": {
                name: "cannon",
                size: 3,
                ranges: [9]
            },
            "archertower": {
                name: "archertower",
                size: 3,
                ranges: [10]
            },
            "airdefense": {
                name: "airdefense",
                size: 3,
                ranges: [10]
            },
            "wizardtower": {
                name: "wizardtower",
                size: 3,
                ranges: [7]
            },
            "tesla": {
                name: "tesla",
                size: 2,
                ranges: [7]
            },
            "inferno_tower": {
                name: "inferno_tower",
                size: 2,
                ranges: [10]
            },
            "188": {
                name: "clancastle",
                size: 3,
                ranges: [12]
            },
            "164": {
                name: "xbow",
                size: 3,
                ranges: [11, 14]
            },
            "160": {
                name: "mortar",
                size: 3,
                ranges: [11, 4]
            },
            "185": {
                name: "king",
                size: 3,
                ranges: [9]
            },
            "186": {
                name: "queen",
                size: 3,
                ranges: [10]
            }
        }
    };

    if (document.hasOwnProperty("coc_marker_enabled")) {
        document.coc_marker_enabled = !document.coc_marker_enabled;
        alert("marker is " + (document.coc_marker_enabled ? "en" : "dis") + "abled");
    } else {

        document.coc_marker_enabled = true;
        bind_range_markers();
        alert("marker added");

    }

    function bind_range_markers() {
        $(".object").mouseenter(create_range_markers);

        function large_comment() {
            $(document).keypress(function(e) { /*console.log(e.which);*/
                if (e.which == 82 || e.which == 114) { /*R and r*/
                    com.vickson.coc.canDrawRange = 0;
                    $(".range_marker").remove();
                }
            }).keyup(function(e) {
                console.log(e.which);
                if (e.which == 82 || e.which == 114) { /*R and r*/
                    com.vickson.coc.canDrawRange = 1;
                }
            });
        }
    }

    function create_range_markers() {
            $(".range_marker").remove();
            if (!document.coc_marker_enabled) config.canDrawRange = false;
            if (!config.canDrawRange) return;

            var n = $(this).attr("id").split('-')[0];
            if (!config.towers.hasOwnProperty(n)) return;

            var
                r,
                rngs = config.towers[n].ranges,
                size = config.towers[n].size;
            for (var i = 0; i < ranges.length; ++i) {
                r = rngs[i] * 20;
                draw_circle({
                    size: size,
                    r: r
                });
                /*$(this).css("z-index", com.vickson.coc.zz);
                com.vickson.coc.zz++;*/
            }
            var tower_icon = draw_tower();
            $(tower_icon).mouseleave(function() {
                $('.range_marker').remove();
                $('.range_marker2').remove();
            });
        }
        /*draw_circle({size:3,r:10,opacity:0.3,color:"#FFFFFF"})*/

    function draw_circle(params) {
        var param_def = {
            size: 3,
            r: 10,
            opacity: 0.3,
            color: "#FFFFFF"
        };
        for (var attrname in param_def) {
            if (!params.hasOwnProperty(attrname)) {
                params[attrname] = param_def[attrname];
            }
        }
        $(this).append("" +
            "<div class='range_marker' " +
            "style='position:absolute;" +
            "display:block;" +
            "width: " + (params.r * 2) + "px;" +
            "height: " + (params.r * 2) + "px;" +
            "margin-left: " + (-1 * params.r + params.size) + "px;" +
            "margin-top: " + (-1 * params.r + params.size) + "px;" +
            "-mozborder-radius: " + (params.r) + "px;" +
            "-webkit-border-radius: " + (params.r) + "px;" +
            "border-radius: " + (params.r) + "px;" +
            "opacity:" + params.opacity + ";" +
            "background-color:" + params.color + "; '>" +
            "</div> ");
    }



    function draw_tower() {
        return $(this).append("" +
            "<div class='range_marker2' " +
            "style='position:absolute;" +
            "display:block;" + "width: " + $(this).css('width') + ";" + "height: " + $(this).css('height') + ";" + "left: " + 0 + ";" + "top: " + 0 + ";" + "background-image: " + $(this).css('backgroundImage') +
            "; '>" + "</div> ");
    }

})();
