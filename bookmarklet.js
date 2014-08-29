//javascript:
(function() {
	var config = {
		"zz": 10000,
		"showRange": 1,
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
				ranges: [{radius:11,color:"DeepSkyBlue"}, {radius:14,color:"white"}]
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
				name: "giant_bomb_lv3",
				size: 2,
				ranges: [{radius:2,color:"white"}, {radius:3.5,color:"red"}]
			},
			"168": {
				name: "bomb",
				size: 1,
				ranges: [{radius:1.5,color:"white"}, {radius:3,color:"red"}]
			},
			"172": {
				name: "seeking_air_mine",
				size: 1,
				ranges: [4]
			},
			"171": {
				name: "air_bomb",
				size: 1,
				ranges: [5]
			}
		}
	};

	if (document.hasOwnProperty("coc_marker_enabled")) {
		document.coc_marker_enabled = !document.coc_marker_enabled;
		alert("marker is " + (document.coc_marker_enabled ? "en" : "dis") + "abled");
	} else {

		document.coc_marker_enabled = true;
		create_menu();
		bind_range_markers();
		alert("marker added");

	}

	function bind_range_markers() {
		$(".object")
			.mouseenter(function(evt) {
				create_range_markers(evt.target);
			})
			.mouseleave(function(evt) {
				remove_range_markers_if_needed(evt.target);
			})
			.click(function(evt) {
				toggle_range_markers(evt.target);
			});
	}

	function create_range_markers(me) {
		$(me).find(".range_marker").remove();
		$(me).find(".tower_icon").remove();
		if (!document.coc_marker_enabled) config.showRange = false;
		if (!config.showRange) return;

		var n = $(me).attr("id").split('-')[0];
		if (!config.towers.hasOwnProperty(n)) return;

		var r,c,
			rngs = config.towers[n].ranges,
			size = config.towers[n].size;
		for (var i = 0; i < rngs.length; ++i) {
			if(! isNaN(rngs[i])){
				r = rngs[i] * 20;
				c = "white";
			}else{
				r = rngs[i].radius * 20;
				c = rngs[i].color;
			}
			draw_circle({
				parent:me,
				size: size,
				r: r,
				color:c
			});
			$(me).css("z-index", config.zz);
			config.zz++;
		}
		draw_tower(me);
	}

	function remove_range_markers_if_needed(me){

		var data = $(me).data();
		if(!data.hasOwnProperty("showMarker") || !data.showMarker){
			$(me).find('.range_marker').remove();
			$(me).find('.tower_icon').remove();
		}
	}

	function toggle_range_markers(me){
		var data = $(me).data();
		if(data.showMarker){
			data.showMarker=0;
			$(me).find('.tower_icon').add(me).css("box-shadow","none");
		}else{
			data.showMarker=1;
			$(me).find('.tower_icon').add(me).css("box-shadow", "inset 0px 0px 8pt 3pt #ff0");
		}
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
		project_default(params,param_def);

		$(params.parent).append("" +
			"<div class='range_marker' " +
			"style='pointer-events:none;"+
			"position:absolute;" +
			"display:block;" +
			"width: " + (params.r * 2) + "px;" +
			"height: " + (params.r * 2) + "px;" +
			"margin-left: " + (-1 * params.r + params.size*10) + "px;" +
			"margin-top: " + (-1 * params.r + params.size*10) + "px;" +
			"-mozborder-radius: " + (params.r) + "px;" +
			"-webkit-border-radius: " + (params.r) + "px;" +
			"border-radius: " + (params.r) + "px;" +/*
			"border-color: " + params.color +";" +
			"border-style: solid;" +
			"border-width: 0.5px;" +*/
			"opacity:" + params.opacity + ";" +
			"background-color:" + params.color + "; '>" +
			"</div> ");
	}

	function draw_tower(parent) {
		$(parent).append("" +
			"<div class='tower_icon' " +
			"style='position:absolute;" +
			"display:block;" + "width: " + $(parent).css('width') + ";" + 
			"height: " + $(parent).css('height') + ";" + 
			"left: " + 0 + ";" + 
			"top: " + 0 + ";" + 
			"pointer-events:none;" +
			"background-image: " + $(parent).css('backgroundImage') +
			"; '>" + "</div> ");
	}

	function project_default(target,default_obj){
		for (var attrname in default_obj) {
			if (!target.hasOwnProperty(attrname)) {
				target[attrname] = default_obj[attrname];
			}
		}
	}

	function create_menu(){
		var div = document.createElement("div");
	}

})();
