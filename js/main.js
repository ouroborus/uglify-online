// Fancy number input
$('input.spinner').TouchSpin({
	min:0,
	max:999999
});

// Fancy checkbox input
$('input.switch').bootstrapSwitch({
	handleWidth:100-24-1, // bootstrapSwitch uses .width(), not .outerWidth()
	labelWidth:50-24-1
});

// Fancy select input
$('.select.dropright .selectpicker').selectpicker({
	size:false
}).on('loaded.bs.select',function(e){
	var $this = $(this),
		$menu = $this.siblings('.dropdown-menu');
	$menu.css({marginTop:-$menu.outerHeight()/2});
});

// Here's where the magic happens
var $jsIn = $('#js-in'),
	$jsOut = $('#js-out'),
	$jsProcess = $('#js-process'),
	warnings = [],
	warn_function = UglifyJS.AST_Node.warn_function;

UglifyJS.AST_Node.warn_function = function(txt){
	warnings.push(txt);
	warn_function(txt);
};

$('form').on('submit',false);

$jsProcess.on('click',function(e){
	warnings = [];
	try {
		$jsOut.val(UglifyJS.minify($jsIn.val(),{
			fromString:true,
			compress:{
				sequences:$('#compress-sequence').is(':checked'),
				properties:$('#compress-properties').is(':checked'),
				dead_code:$('#compress-deadCode').is(':checked'),
				drop_debugger:$('#compress-dropDebugger').is(':checked'),
				unsafe:$('#compress-unsafe').is(':checked'),
				unsafe_comps:$('#compress-unsafeComps').is(':checked'),
				conditionals:$('#compress-conditionals').is(':checked'),
				comparisons:$('#compress-comparisons').is(':checked'),
				evaluate:$('#compress-evaluate').is(':checked'),
				booleans:$('#compress-booleans').is(':checked'),
				loops:$('#compress-loops').is(':checked'),
				unused:$('#compress-unused').is(':checked'),
				hoist_funs:$('#compress-hoistFuns').is(':checked'),
				keep_fargs:$('#compress-keepFargs').is(':checked'),
				keep_fnames:$('#compress-keepFnames').is(':checked'),
				hoist_vars:$('#compress-hoistVars').is(':checked'),
				if_return:$('#compress-ifReturn').is(':checked'),
				join_vars:$('#compress-joinVars').is(':checked'),
				cascade:$('#compress-cascade').is(':checked'),
				side_effects:$('#compress-sideEffects').is(':checked'),
				pure_getters:$('#compress-pureGetters').is(':checked'),
				pure_funcs:null,
				negate_iife:$('#compress-negateIife').is(':checked'),
				screw_ie8:$('#compress-screwIe8').is(':checked'),
				drop_console:$('#compress-dropConsole').is(':checked'),
				angular:$('#compress-angular').is(':checked'),
				warnings:$('#compress-warnings').is(':checked'),
				global_defs:{}
			},
			mangle:$('#mangle-mangle').is(':checked')?{}:false,
			output:{
				indent_start:$('#output-indentStart').val()|0,
				indent_level:$('#output-indentLevel').val()|0,
				quote_keys:$('#output-quoteKeys').is(':checked'),
				space_colon:$('#output-spaceColon').is(':checked'),
				ascii_only:$('#output-asciiOnly').is(':checked'),
				unescape_regexps:$('#output-unescapeRegexps').is(':checked'),
				inline_script:$('#output-inlineScript').is(':checked'),
				width:$('#output-width').val()|0,
				max_line_len:$('#output-maxLineLen').val()|0,
				beautify:$('#output-beautify').is(':checked'),
				source_map:null,
				bracketize:$('#output-bracketize').is(':checked'),
				semicolons:$('#output-semicolons').is(':checked'),
				comments:$('#output-comments').is(':checked'),
				shebang:$('#output-shebang').is(':checked'),
				preserve_line:$('#output-preserveLine').is(':checked'),
				screw_ie8:$('#output-screwIe8').is(':checked'),
				preamble:null,
				quote_style:$('#output-quoteStyle').val()|0
			}
		}).code);
	} catch(ex) {
		$jsOut.val(ex.message + ' (line: ' + ex.line + ', col: ' + ex.col + ', pos: ' + ex.pos + ')\n\n' + ex.stack);
	}
	console.log(warnings);
});
