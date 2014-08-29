//javascript:
(function() {
	/*edit this object to configure script*/
	var config = {
		"zz": 10000,
		"showRange": 1,
		"sidebarSize":36,
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

	/* do not edit beyond this comment*/
	var state = {
		"sidebarDrag":"none"
	};

	if (document.hasOwnProperty("coc_marker_enabled")) {
		document.coc_marker_enabled = !document.coc_marker_enabled;
		alert("marker is " + (document.coc_marker_enabled ? "en" : "dis") + "abled");
	} else {

		document.coc_marker_enabled = true;
		inject_css();
		create_menu();
		bind_range_markers();
		alert("marker added");

	}

	function inject_css(){
		$("<style type='text/css'> 
			.coc_marker{
				-webkit-touch-callout: none;
				-webkit-user-select: none;
				-khtml-user-select: none;
				-moz-user-select: none;
				-ms-user-select: none;
				user-select: none;
			}
			.coc_marker.ui_container{
				position:fixed;
				top:0; left:0;
				background-color:#333;
				max-height:100%;
				overflow:auto;
			}
			.coc_marker.ui_hidden{
				display:none;
			}
			.coc_marker.ui_sidebar{
				margin-bottom:" + config.sidebarSize + "px;
				/*margin-right:30px;*/
			}
			.coc_marker.ui_sidebar_tower{
				width:" + config.sidebarSize + "px;
				height:" + config.sidebarSize + "px;
				box-sizing:border-box;
				background-size:100%;
			}
			.coc_marker.ui_sidebar_show_button,
			.coc_marker.ui_sidebar_hide_button{
				color:white;
			}
			.coc_marker.ui_control a{
				color:white;
			}
			.coc_marker.ui_control a:hover{
				text-decoration:underline;
			}
			.coc_marker.object_highlight{
				box-shadow:inset 0px 0px 8pt 3pt #ff0;
			}
			.coc_marker.object_over_highlight{
				box-shadow:inset 0px 0px 8pt 3pt #fff;
			}
			.coc_marker.ui_highlight{
				box-shadow:inset 0px 0px 8pt 3pt #ff0;
			}
			.coc_marker.ui_over_highlight{
				box-shadow:inset 0px 0px 8pt 3pt #fff;
			}

		</style>").appendTo("head");
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

	function create_range_markers(base_elem) {
		if($(base_elem).find(".coc_marker.range_marker").length) return;
		if (!document.coc_marker_enabled) config.showRange = false;
		if (!config.showRange) return;

		var n = base_elem.id.split('-')[0];
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
				parent:base_elem,
				size: size,
				r: r,
				color:c
			});
			$(base_elem).css("z-index", config.zz);
			config.zz++;
		}
		draw_tower(base_elem);
	}

	function remove_range_markers_if_needed(me){

		var data = $(me).data();
		if(!data.hasOwnProperty("showMarker") || !data.showMarker){
			$(me).find('.coc_marker.range_marker').remove();
			$(me).find('.coc_marker.tower_icon').remove();
		}
	}

	function toggle_range_markers(me){
		var data = $(me).data();
		if(data.showMarker){
			data.showMarker=0;
			$(me).find('.tower_icon').add(me).removeClass("object_highlight");
		}else{
			data.showMarker=1;
			$(me).find('.tower_icon').add(me).addClass("object_highlight");
		}
	}
	
	/*draw_circle({size:3,r:10,opacity:0.3,color:"#FFFFFF"})*/
	function draw_circle(params) {
		var param_def = {
			parent:null,
			size: 3,
			r: 10,
			opacity: 0.2,
			color: "#FFFFFF"
		};
		project_default(params,param_def);

		$(params.parent).append("" +
			"<div class='coc_marker range_marker' " +
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
			"<div class='coc_marker tower_icon' " +
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
		var $container = $("<div>", {class: "coc_marker ui_container"});
		/*show button*/
		var $sidebar_show_button = $("<div>", {class: "coc_marker ui_sidebar_show_button ui_hidden"});
		$sidebar_show_button.html("show").click(function(){
			$('.ui_sidebar').show();
			$('.ui_sidebar_show_button').hide();
		});
		$container.append($sidebar_show_button);
		/*sidebar*/
		var $sidebar = $("<div>", {class: "coc_marker ui_sidebar"});
		var $sidebar_hide_button = $("<div>", {class: "coc_marker ui_sidebar_hide_button"});
		$sidebar_hide_button.html("hide").click(function(){
			$('.ui_sidebar_show_button').show();
			$('.ui_sidebar').hide();
		});
		$sidebar.append($sidebar_hide_button);

		var $buttons = prepare_tower_buttons();
		$sidebar.append($buttons);

		var $controls = $("<div>", {class: "coc_marker ui_control"});
		$controls.html("
			<a href='javascript:void(0)'>Reverse</a><br>
			<a href='javascript:void(0)'>Disable</a><br>
			<a href='javascript:void(0)'>Config</a><br>
			<a href='javascript:void(0)'>Remove</a><br>
		");
		$sidebar.append($controls);
		

		/*final*/
		$container.append($sidebar);
		$("body").append($container);

		/* ===== create_menu() private functions START ===== */

		function prepare_tower_buttons(){
			gather_backgrounds();
			var $button,
				t = config.towers,
				$result = $("<div>", {class: "coc_marker ui_sidebar_towers_container"});
			for(var i in t){
				$button = $("<div>", {class: "coc_marker ui_sidebar_tower"}).css("background-image",t[i].bg);
				t[i].show=0;
				t[i].index=i;
				$button.data().tower = t[i];

				$button
					.mousedown(function(evt){
						if($(evt.target).data().tower.show){
							hide_all_markers_of(evt.target);
						}else{
							show_all_markers_of(evt.target);
						}
						state.sidebarDrag = $(evt.target).data().tower.show?"show":"hide";
					})
					.mouseenter(function(evt){
						if(state.sidebarDrag == "show"){
							show_all_markers_of(evt.target);
						}else if(state.sidebarDrag == "hide"){
							hide_all_markers_of(evt.target);
						}else if(state.sidebarDrag == "none"){
							$(evt.target).addClass("ui_over_highlight");
							highlight_all_of(evt.target);
						}
					})
					.mouseleave(function(evt){
						$(evt.target).removeClass("ui_over_highlight");
						unhighlight_all_of(evt.target);
					})
					.mouseup(function(){
						state.sidebarDrag="none";
					});
				$(window)
					.mouseup(function(){
						state.sidebarDrag="none";
					});
				$result.append($button);
			}
			return $result;

			function gather_backgrounds(){
				var t = config.towers;
				$('.object').each(function(){
					var n = this.id.split('-')[0];
					if (t.hasOwnProperty(n)) {
						t[n].bg = $(this).css('backgroundImage');
					}
				});
			}
			function hide_all_markers_of(target,isTemporary){
				var d = $(target).data().tower;
				d.show = 0;
				$(target).removeClass('ui_highlight');
				$('.object').each(function(){
					var n = this.id.split('-')[0];
					if (n == d.index) {
						$(this).data().showMarker=0;
						remove_range_markers_if_needed(this);
					}
				});
			}
			function show_all_markers_of(target,isTemporary){
				var d = $(target).data().tower;
				d.show = 1;
				$(target).addClass('ui_highlight');
				$('.object').each(function(){
					var n = this.id.split('-')[0];
					if (n == d.index) {
						$(this).data().showMarker=1;
						create_range_markers(this);
					}
				});
			}
			function highlight_all_of(target){
				var d = $(target).data().tower;
				$('.object').each(function(){
					var n = this.id.split('-')[0];
					if (n == d.index) {
						$(this).addClass("coc_marker object_over_highlight");
					}
				});
			}
			function unhighlight_all_of(target){
				var d = $(target).data().tower;
				$('.object').each(function(){
					var n = this.id.split('-')[0];
					if (n == d.index) {
						$(this).removeClass("coc_marker object_over_highlight");
					}
				});
			}
		}

		/* ===== create_menu() private functions END ===== */

	}

})();
