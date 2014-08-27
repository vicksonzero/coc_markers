//javascript:
(function() {
    var config = {
        "zz": 10000,
        "canDrawRange": 1,
        "towers": {
            "158": {
                name: "cannon",
                size: 3,
                ranges: [9]
            },
            "159": {
                name: "archertower",
                size: 3,
                ranges: [10]
            },
            "161": {
                name: "airdefense",
                size: 3,
                ranges: [10]
            },
            "162": {
                name: "wizardtower",
                size: 3,
                ranges: [7]
            },
            "163": {
                name: "tesla",
                size: 2,
                ranges: [7]
            },
            "165": {
                name: "inferno_tower",
                size: 2,
                ranges: [9]
            },
            "188": {
                name: "clancastle",
                size: 3,
                ranges: [12]
            },
            "164": {
                name: "xbow",
                size: 3,
                ranges: [{radius:11,color:"white"}, {radius:14,color:"red"}]
            },
            "160": {
                name: "mortar",
                size: 3,
                ranges: [{radius:11,color:"white"}, {radius:4,color:"red"}]
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
            },
            "170": {
                name: "giant_bomb",
                size: 3,
                ranges: [{radius:11,color:"white"}, {radius:4,color:"red"}]
            },
            "168": {
                name: "bomb",
                size: 3,
                ranges: [{radius:11,color:"white"}, {radius:4,color:"red"}]
            },
            "172": {
                name: "seeking_air_mine",
                size: 3,
                ranges: [9]
            },
            "171": {
                name: "air_bomb",
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
            $(document).keypress(function(e) { 
                if (e.which == 82 || e.which == 114) { /*R and r*/
                    com.vickson.coc.canDrawRange = 0;
                    $(".range_marker").remove();
                }
            }).keyup(function(e) {
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
            r,c,
            rngs = config.towers[n].ranges,
            size = config.towers[n].size;
        for (var i = 0; i < rngs.length; ++i) {
            if(rngs[i] instanceof Number){
                r = rngs[i] * 20;
                c = "white";
            }else{
                r = rngs[i].radius * 20;
                c = rngs[i].color;
            }
            draw_circle({
                parent:this,
                size: size,
                r: r,
                color:c
            });
            $(this).css("z-index", config.zz);
            config.zz++;
        }
        draw_tower(this);
        $('.range_marker2').mouseleave(function() {
            $('.range_marker').remove();
            $('.range_marker2').remove();
        });
    }
    
    /*draw_circle({size:3,r:10,opacity:0.3,color:"#FFFFFF"})*/
    function draw_circle(params) {
        var param_def = {
            parent:null,
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
        $(params.parent).append("" +
            "<div class='range_marker' " +
            "style='position:absolute;" +
            "display:block;" +
            "width: " + (params.r * 2) + "px;" +
            "height: " + (params.r * 2) + "px;" +
            "margin-left: " + (-1 * params.r + params.size*10) + "px;" +
            "margin-top: " + (-1 * params.r + params.size*10) + "px;" +
            "-mozborder-radius: " + (params.r) + "px;" +
            "-webkit-border-radius: " + (params.r) + "px;" +
            "border-radius: " + (params.r) + "px;" +
            "opacity:" + params.opacity + ";" +
            "background-color:" + params.color + "; '>" +
            "</div> ");
    }

            

    function draw_tower(parent) {
        $(parent).append("" +
            "<div class='range_marker2' " +
            "style='position:absolute;" +
            "display:block;" + "width: " + $(parent).css('width') + ";" 
            + "height: " + $(parent).css('height') + ";" + 
            "left: " + 0 + ";" + 
            "top: " + 0 + ";" + 
            "background-image: " + $(parent).css('backgroundImage') +
            "; '>" + "</div> ");
    }

})();
