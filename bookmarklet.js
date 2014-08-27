//javascript:
(function() {
    var config = {
        "zz": 10000,
        "canDrawRange": 1,
        "towers": {
            "cannon": {
                name: "cannon",
                size:3,
				ranges: [9]
            },
            "archertower": {
                name: "archertower",
                size:3,
				ranges: [10]
            },
            "airdefense": {
                name: "airdefense",
                size:3,
				ranges: [10]
            },
            "wizardtower": {
                name: "wizardtower",
                size:3,
				ranges: [7]
            },
            "tesla": {
                name: "tesla",
                size:2,
				ranges: [7]
            },
            "inferno_tower": {
                name: "inferno_tower",
                size:2,
				ranges: [10]
            },
            "188": {
                name: "clancastle",
                size:3,
				ranges: [12]
            },
            "164": {
                name: "xbow",
                size:3,
				ranges: [11, 14]
            },
            "160": {
                name: "mortar",
                size:3,
				ranges: [11, 4]
            },
            "185": {
                name: "king",
                size:3,
				ranges: [9]
            },
            "186": {
                name: "queen",
                size:3,
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

    }

    function bind_range_markers(){
        $(".object").mouseenter(create_range_markers);
    }
    function create_range_markers(){
        $(".range_marker").remove();
        if (!document.coc_marker_enabled) config.canDrawRange = false;
        if (!config.canDrawRange) return;

        var n = $(this).attr("id").split('-')[0];
        if (!config.towers.hasOwnProperty(n)) return;

        var r,tower_rng = config.towers[n].ranges;
        for(var i=0; i<ranges.length; ++i){
            r = tower_rng[i] * 20;

        }
    }
    function draw_circle(size,r,opacity,color){
        var 
        $(this).append("" + 
            "<div class='range_marker' " + 
            "style='position:absolute;" + 
            "display:block;" + 
            "width: " + (r * 2) + "px;" + 
            "height: " + (r * 2) + "px;" + 
            "margin-left: " + (-1 * r + size + "px;" + 
            "margin-top: " + (-1 * r + size + "px;" + 
            "-mozborder-radius: " + (r) + "px;" + 
            "-webkit-border-radius: " + (r) + "px;" + 
            "border-radius: " + (r) + "px;" + 
            "opacity:"+opacity+";" + 
            "background-color:"+color+"; '>" + 
            "</div> ");

    }

})();



    
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
    $(".object").mouseenter(function(e) {
        $(".range_marker").remove();
        if (!document.coc_marker_enabled) {
            com.vickson.coc.canDrawRange = false;
        }
        if (!com.vickson.coc.canDrawRange) return;
        var n = $(this).attr("id").split('-')[0];
        if (n == "164" || n == "160") n += "1";
        if (!com.vickson.coc.towers.hasOwnProperty(n)) return;
        var r = com.vickson.coc.towers[n] * 20; /*+(n=="tesla"?20:20);*/
        $(this).append("" + 
            "<div class='range_marker' " + 
            "style='position:absolute;" + 
            "display:block;" + 
            "width: " + (r * 2) + "px;" + 
            "height: " + (r * 2) + "px;" + 
            "margin-left: " + (-1 * r + (n == "tesla" || n == "inferno_tower" ? 20 : 30)) + "px;" + 
            "margin-top: " + (-1 * r + (n == "tesla" || n == "inferno_tower" ? 20 : 30)) + "px;" + 
            "-mozborder-radius: " + (r) + "px;" + 
            "-webkit-border-radius: " + (r) + "px;" + 
            "border-radius: " + (r) + "px;" + 
            "opacity:0.3;" + 
            "background-color:#FFFFFF; '>" + 
            "</div> ");
        $(this).css("z-index", com.vickson.coc.zz);
        com.vickson.coc.zz++;
        if (n == "1601") {
            n += "2";
            var r = com.vickson.coc.towers[n] * 20; /*+(n=="tesla"?20:20);*/
            $(this).append("" + "<div class='range_marker' " + "style='position:absolute;" + "z-index:-100000000;" + "display:block;" + "width: " + (r * 2) + "px;" + "height: " + (r * 2) + "px;" + "margin-left: " + (-1 * r + (n == "tesla" || n == "inferno_tower" ? 20 : 30)) + "px;" + "margin-top: " + (-1 * r + (n == "tesla" || n == "inferno_tower" ? 20 : 30)) + "px;" + "-mozborder-radius: " + (r) + "px;" + "-webkit-border-radius: " + (r) + "px;" + "border-radius: " + (r) + "px;" + "opacity:0.3;" + "background-color: red; '></div>");
        }
        if (n == "1641") {
            n += "2";
            var r = com.vickson.coc.towers[n] * 20; /*+(n=="tesla"?20:20);*/
            $(this).append("" + "<div class='range_marker' " + "style='position:absolute;" + "z-index:-100000000;" + "display:block;" + "width: " + (r * 2) + "px;" + "height: " + (r * 2) + "px;" + "margin-left: " + (-1 * r + (n == "tesla" ? 20 : 30)) + "px;" + "margin-top: " + (-1 * r + (n == "tesla" ? 20 : 30)) + "px;" + "-mozborder-radius: " + (r) + "px;" + "-webkit-border-radius: " + (r) + "px;" + "border-radius: " + (r) + "px;" + "opacity:0.3;" + "background-color: white; '></div>");
        }
        var overlay = $(this).append("" + "<div class='range_marker2' " + "style='position:absolute;" + "display:block;" + "width: " + $(this).css('width') + ";" + "height: " + $(this).css('height') + ";" + "left: " + 0 + ";" + "top: " + 0 + ";" + "background-image: " + $(this).css('backgroundImage') + "; '>" + "</div> ");
        $('.range_marker2').mouseleave(function() {
            $('.range_marker').remove();
            $('.range_marker2').remove();
        });
    }); alert("marker added");
}
