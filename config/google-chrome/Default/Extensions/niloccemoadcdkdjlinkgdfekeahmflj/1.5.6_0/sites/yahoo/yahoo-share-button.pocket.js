(function(){var e=$(".social-buttons");if(e.length===0)return;var t=function(){var e=$(".yui3-ymsb").children()[0];return $(e).hasClass("ymsb-pocket")},n=function(){$("#pocket-btn-js").remove(),!function(e,t){if(!e.getElementById(t)){var n=e.createElement("script");n.id=t,n.src="https://widgets.getpocket.com/v1/j/btn.js?v=1";var r=e.getElementById(t);e.body.appendChild(n)}}(document,"pocket-btn-js")},r=function(){$("head").append("<style>.yui3-ymsb-content .ymsb-module {margin-right: 5px !important;}.ymsb-mail-module a span {font-size: 0;}.ymsb-googleplus-module {width: 60px !important;}.ymsb-retweet-module {width: 100px !important;}.ymsb-print-module a span {font-size: 0;}.twttr-static-module {width: 100px !important;}.gplus-static {width: 50px !important;}.ymsb-pocket-module {margin-top: 4px !important;width: 100px !important;}</style>");var r=$('<li class="ymsb-module ymsb-pocket-module lang-en-US"><a data-pocket-label="pocket" data-pocket-count="horizontal" class="pocket-btn" data-lang="en"></a></li>');$(".gplus-static").after(r),n(),e.mouseover(function(){if(t())return;setTimeout(function(){if(t())return;var e=$('<li class="ymsb-module ymsb-pocket-module lang-en-US"><a data-pocket-label="pocket" data-pocket-count="horizontal" class="pocket-btn" data-lang="en"></a></li>');$(".ymsb-googleplus-module").after(e);var r=$(".yui3-ymsb").children()[0];$(r).addClass("ymsb-pocket"),n()},0)})};sendMessage({action:"getSetting",key:"yahoo"},function(e){(e.value==="true"||e.value===!0)&&r()})})();