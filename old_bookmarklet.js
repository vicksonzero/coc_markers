//javascript:
com = {
  vickson: {
    coc: {
      "zz": 10000,
      "canDrawRange": 1,
      "ranges": {
        "cannon": "9",
        "archertower": "10",
        "airdefense": "10",
        "wizardtower": "7",
        "tesla": "7",
        "inferno_tower": "10",
        "clancastle": "12",
        "crossbow1": "11",
        "crossbow12": "14",
        "mortar1": "11",
        "mortar12": "4"
      }
    }
  }
};
if(document.hasOwnProperty("coc_marker_enabled")) {
  document.coc_marker_enabled = !document.coc_marker_enabled;
  alert("marker is " + (document.coc_marker_enabled ? "en" : "dis") + "abled");
} else {
  document.coc_marker_enabled = true;
  $(document).keypress(function(e) { /*console.log(e.which);*/
    if(e.which == 82 || e.which == 114) { /*R and r*/
      com.vickson.coc.canDrawRange = 0;
      $(".range_marker").remove();
    }
  }).keyup(function(e) {
    console.log(e.which);
    if(e.which == 82 || e.which == 114) { /*R and r*/
      com.vickson.coc.canDrawRange = 1;
    }
  });
  $(".object").mouseenter(function(e) {
    $(".range_marker").remove();
    if(!document.coc_marker_enabled) {
      com.vickson.coc.canDrawRange = false;
    }
    if(!com.vickson.coc.canDrawRange) return;
    var n = $(this).attr("id").split('-')[0];
    if(n == "crossbow" || n == "mortar") n += "1";
    if(!com.vickson.coc.ranges.hasOwnProperty(n)) return;
    var r = com.vickson.coc.ranges[n] * 20; /*+(n=="tesla"?20:20);*/
    $(this).append("" + "<div class='range_marker' " + "style='position:absolute;" + "display:block;" + "pointer-events:none;" + "width: " + (r * 2) + "px;" + "height: " + (r * 2) + "px;" + "margin-left: " + (-1 * r + (n == "tesla" || n == "inferno_tower" ? 20 : 30)) + "px;" + "margin-top: " + (-1 * r + (n == "tesla" || n == "inferno_tower" ? 20 : 30)) + "px;" + "-mozborder-radius: " + (r) + "px;" + "-webkit-border-radius: " + (r) + "px;" + "border-radius: " + (r) + "px;" + "opacity:0.3;" + "background-color:#FFFFFF; '>" + "</div> ");
    $(this).css("z-index", com.vickson.coc.zz);
    com.vickson.coc.zz++;
    if(n == "mortar1") {
      n += "2";
      var r = com.vickson.coc.ranges[n] * 20; /*+(n=="tesla"?20:20);*/
      $(this).append("" + "<div class='range_marker' " + "style='position:absolute;" + "z-index:-100000000;" + "display:block;" + "pointer-events:none;" + "width: " + (r * 2) + "px;" + "height: " + (r * 2) + "px;" + "margin-left: " + (-1 * r + (n == "tesla" || n == "inferno_tower" ? 20 : 30)) + "px;" + "margin-top: " + (-1 * r + (n == "tesla" || n == "inferno_tower" ? 20 : 30)) + "px;" + "-mozborder-radius: " + (r) + "px;" + "-webkit-border-radius: " + (r) + "px;" + "border-radius: " + (r) + "px;" + "opacity:0.3;" + "background-color: red; '></div>");
    }
    if(n == "crossbow1") {
      n += "2";
      var r = com.vickson.coc.ranges[n] * 20; /*+(n=="tesla"?20:20);*/
      $(this).append("" + "<div class='range_marker' " + "style='position:absolute;" + "z-index:-100000000;" + "display:block;" + "pointer-events:none;" + "width: " + (r * 2) + "px;" + "height: " + (r * 2) + "px;" + "margin-left: " + (-1 * r + (n == "tesla" ? 20 : 30)) + "px;" + "margin-top: " + (-1 * r + (n == "tesla" ? 20 : 30)) + "px;" + "-mozborder-radius: " + (r) + "px;" + "-webkit-border-radius: " + (r) + "px;" + "border-radius: " + (r) + "px;" + "opacity:0.3;" + "background-color: white; '></div>");
    } /*var overlay = $(this).append("" + "<div class='range_marker2' " + "style='position:absolute;" + "display:block;" + "width: " + $(this).css('width') + ";" + "height: " + $(this).css('height') + ";" + "left: " + 0 + ";" + "top: " + 0 + ";" + "background-image: " + $(this).css('backgroundImage') + "; '>" + "</div> ");$('.range_marker2').mouseleave(function() {*/
    $('.object').mouseleave(function() {
      $('.range_marker').remove();
      $('.range_marker2').remove();
    });
  });
  alert("marker added");
}
