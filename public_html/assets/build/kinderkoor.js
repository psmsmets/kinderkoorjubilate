(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["kinderkoor"],{

/***/ "./assets/css/kinderkoor.scss":
/*!************************************!*\
  !*** ./assets/css/kinderkoor.scss ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./assets/js/kinderkoor.js":
/*!*********************************!*\
  !*** ./assets/js/kinderkoor.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function($) {__webpack_require__(/*! ../css/kinderkoor.scss */ "./assets/css/kinderkoor.scss");

__webpack_require__(/*! bootstrap */ "./node_modules/bootstrap/dist/js/bootstrap.js");

__webpack_require__(/*! jquery.scrollTo */ "./node_modules/jquery.scrollTo/jquery.scrollTo.js");

function addAnimation(id, effect) {
  $('#' + id).removeClass().addClass(effect + ' animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
    $(this).removeClass();
  });
}

;

function toClipboard(id) {
  var element = document.getElementById(id);
  var textArea = document.createElement("textarea");
  textArea.value = element.textContent;
  document.body.appendChild(textArea);
  textArea.select();
  document.execCommand("Copy");
  textArea.remove();
}

;

function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  var expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

$(document).ready(function () {
  $(function () {
    $('[data-toggle="tooltip"]').tooltip();
  });
  $(function () {
    $('[data-toggle="popover"]').popover();
  });
  $('#toTop').click(function (e) {
    $.scrollTo(0, 800);
  });
  /*  init back to top icon */

  var scrollPos;
  var toTopVisible = false;
  var toTop = document.getElementById('toTop');
  /* Every time the window is scrolled ... */

  $(window).scroll(function () {
    // get scroll position
    scrollPos = $(window).scrollTop(); // show back to top

    if (scrollPos >= 400 && !toTopVisible) {
      toTopVisible = true;
      toTop.style.visibility = "visible";
      toTop.style.opacity = "0";
      $('#toTop').animate({
        'opacity': '1'
      }, 750);
    }

    if (scrollPos < 400 && toTopVisible) {
      toTopVisible = false;
      $('#toTop').animate({
        'opacity': '0'
      }, 750, function () {
        toTop.style.visibility = "hidden";
      });
    }
  });
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js")))

/***/ }),

/***/ "./node_modules/jquery.scrollTo/jquery.scrollTo.js":
/*!*********************************************************!*\
  !*** ./node_modules/jquery.scrollTo/jquery.scrollTo.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * jQuery.scrollTo
 * Copyright (c) 2007-2015 Ariel Flesler - aflesler<a>gmail<d>com | http://flesler.blogspot.com
 * Licensed under MIT
 * http://flesler.blogspot.com/2007/10/jqueryscrollto.html
 * @projectDescription Lightweight, cross-browser and highly customizable animated scrolling with jQuery
 * @author Ariel Flesler
 * @version 2.1.2
 */
;(function(factory) {
	'use strict';
	if (true) {
		// AMD
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js")], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else {}
})(function($) {
	'use strict';

	var $scrollTo = $.scrollTo = function(target, duration, settings) {
		return $(window).scrollTo(target, duration, settings);
	};

	$scrollTo.defaults = {
		axis:'xy',
		duration: 0,
		limit:true
	};

	function isWin(elem) {
		return !elem.nodeName ||
			$.inArray(elem.nodeName.toLowerCase(), ['iframe','#document','html','body']) !== -1;
	}		

	$.fn.scrollTo = function(target, duration, settings) {
		if (typeof duration === 'object') {
			settings = duration;
			duration = 0;
		}
		if (typeof settings === 'function') {
			settings = { onAfter:settings };
		}
		if (target === 'max') {
			target = 9e9;
		}

		settings = $.extend({}, $scrollTo.defaults, settings);
		// Speed is still recognized for backwards compatibility
		duration = duration || settings.duration;
		// Make sure the settings are given right
		var queue = settings.queue && settings.axis.length > 1;
		if (queue) {
			// Let's keep the overall duration
			duration /= 2;
		}
		settings.offset = both(settings.offset);
		settings.over = both(settings.over);

		return this.each(function() {
			// Null target yields nothing, just like jQuery does
			if (target === null) return;

			var win = isWin(this),
				elem = win ? this.contentWindow || window : this,
				$elem = $(elem),
				targ = target, 
				attr = {},
				toff;

			switch (typeof targ) {
				// A number will pass the regex
				case 'number':
				case 'string':
					if (/^([+-]=?)?\d+(\.\d+)?(px|%)?$/.test(targ)) {
						targ = both(targ);
						// We are done
						break;
					}
					// Relative/Absolute selector
					targ = win ? $(targ) : $(targ, elem);
					/* falls through */
				case 'object':
					if (targ.length === 0) return;
					// DOMElement / jQuery
					if (targ.is || targ.style) {
						// Get the real position of the target
						toff = (targ = $(targ)).offset();
					}
			}

			var offset = $.isFunction(settings.offset) && settings.offset(elem, targ) || settings.offset;

			$.each(settings.axis.split(''), function(i, axis) {
				var Pos	= axis === 'x' ? 'Left' : 'Top',
					pos = Pos.toLowerCase(),
					key = 'scroll' + Pos,
					prev = $elem[key](),
					max = $scrollTo.max(elem, axis);

				if (toff) {// jQuery / DOMElement
					attr[key] = toff[pos] + (win ? 0 : prev - $elem.offset()[pos]);

					// If it's a dom element, reduce the margin
					if (settings.margin) {
						attr[key] -= parseInt(targ.css('margin'+Pos), 10) || 0;
						attr[key] -= parseInt(targ.css('border'+Pos+'Width'), 10) || 0;
					}

					attr[key] += offset[pos] || 0;

					if (settings.over[pos]) {
						// Scroll to a fraction of its width/height
						attr[key] += targ[axis === 'x'?'width':'height']() * settings.over[pos];
					}
				} else {
					var val = targ[pos];
					// Handle percentage values
					attr[key] = val.slice && val.slice(-1) === '%' ?
						parseFloat(val) / 100 * max
						: val;
				}

				// Number or 'number'
				if (settings.limit && /^\d+$/.test(attr[key])) {
					// Check the limits
					attr[key] = attr[key] <= 0 ? 0 : Math.min(attr[key], max);
				}

				// Don't waste time animating, if there's no need.
				if (!i && settings.axis.length > 1) {
					if (prev === attr[key]) {
						// No animation needed
						attr = {};
					} else if (queue) {
						// Intermediate animation
						animate(settings.onAfterFirst);
						// Don't animate this axis again in the next iteration.
						attr = {};
					}
				}
			});

			animate(settings.onAfter);

			function animate(callback) {
				var opts = $.extend({}, settings, {
					// The queue setting conflicts with animate()
					// Force it to always be true
					queue: true,
					duration: duration,
					complete: callback && function() {
						callback.call(elem, targ, settings);
					}
				});
				$elem.animate(attr, opts);
			}
		});
	};

	// Max scrolling position, works on quirks mode
	// It only fails (not too badly) on IE, quirks mode.
	$scrollTo.max = function(elem, axis) {
		var Dim = axis === 'x' ? 'Width' : 'Height',
			scroll = 'scroll'+Dim;

		if (!isWin(elem))
			return elem[scroll] - $(elem)[Dim.toLowerCase()]();

		var size = 'client' + Dim,
			doc = elem.ownerDocument || elem.document,
			html = doc.documentElement,
			body = doc.body;

		return Math.max(html[scroll], body[scroll]) - Math.min(html[size], body[size]);
	};

	function both(val) {
		return $.isFunction(val) || $.isPlainObject(val) ? val : { top:val, left:val };
	}

	// Add special hooks so that window scroll properties can be animated
	$.Tween.propHooks.scrollLeft = 
	$.Tween.propHooks.scrollTop = {
		get: function(t) {
			return $(t.elem)[t.prop]();
		},
		set: function(t) {
			var curr = this.get(t);
			// If interrupt is true and user scrolled, stop animating
			if (t.options.interrupt && t._last && t._last !== curr) {
				return $(t.elem).stop();
			}
			var next = Math.round(t.now);
			// Don't waste CPU
			// Browsers don't render floating point scroll
			if (curr !== next) {
				$(t.elem)[t.prop](next);
				t._last = this.get(t);
			}
		}
	};

	// AMD requirement
	return $scrollTo;
});


/***/ })

},[["./assets/js/kinderkoor.js","runtime","vendors~calendar~carousel~form~kinderkoor","vendors~carousel~kinderkoor"]]]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvY3NzL2tpbmRlcmtvb3Iuc2NzcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvanMva2luZGVya29vci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvanF1ZXJ5LnNjcm9sbFRvL2pxdWVyeS5zY3JvbGxUby5qcyJdLCJuYW1lcyI6WyJyZXF1aXJlIiwiYWRkQW5pbWF0aW9uIiwiaWQiLCJlZmZlY3QiLCIkIiwicmVtb3ZlQ2xhc3MiLCJhZGRDbGFzcyIsIm9uZSIsInRvQ2xpcGJvYXJkIiwiZWxlbWVudCIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJ0ZXh0QXJlYSIsImNyZWF0ZUVsZW1lbnQiLCJ2YWx1ZSIsInRleHRDb250ZW50IiwiYm9keSIsImFwcGVuZENoaWxkIiwic2VsZWN0IiwiZXhlY0NvbW1hbmQiLCJyZW1vdmUiLCJzZXRDb29raWUiLCJjbmFtZSIsImN2YWx1ZSIsImV4ZGF5cyIsImQiLCJEYXRlIiwic2V0VGltZSIsImdldFRpbWUiLCJleHBpcmVzIiwidG9VVENTdHJpbmciLCJjb29raWUiLCJyZWFkeSIsInRvb2x0aXAiLCJwb3BvdmVyIiwiY2xpY2siLCJlIiwic2Nyb2xsVG8iLCJzY3JvbGxQb3MiLCJ0b1RvcFZpc2libGUiLCJ0b1RvcCIsIndpbmRvdyIsInNjcm9sbCIsInNjcm9sbFRvcCIsInN0eWxlIiwidmlzaWJpbGl0eSIsIm9wYWNpdHkiLCJhbmltYXRlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSx1Qzs7Ozs7Ozs7Ozs7QUNBQUEsNERBQU8sQ0FBQyw0REFBRCxDQUFQOztBQUVBQSxtQkFBTyxDQUFDLGdFQUFELENBQVA7O0FBQ0FBLG1CQUFPLENBQUMsMEVBQUQsQ0FBUDs7QUFFQSxTQUFTQyxZQUFULENBQXNCQyxFQUF0QixFQUEwQkMsTUFBMUIsRUFBa0M7QUFDOUJDLEdBQUMsQ0FBQyxNQUFJRixFQUFMLENBQUQsQ0FBVUcsV0FBVixHQUF3QkMsUUFBeEIsQ0FB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Q0w7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLDREQUE0RDtBQUM1RDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsQ0FBQyIsImZpbGUiOiJraW5kZXJrb29yLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luIiwicmVxdWlyZSgnLi4vY3NzL2tpbmRlcmtvb3Iuc2NzcycpO1xuXG5yZXF1aXJlKCdib290c3RyYXAnKTtcbnJlcXVpcmUoJ2pxdWVyeS5zY3JvbGxUbycpO1xuXG5mdW5jdGlvbiBhZGRBbmltYXRpb24oaWQsIGVmZmVjdCkge1xuICAgICQoJyMnK2lkKS5yZW1vdmVDbGFzcygpLmFkZENsYXNzKGVmZmVjdCArICcgYW5pbWF0ZWQnKS5vbmUoJ3dlYmtpdEFuaW1hdGlvbkVuZCBtb3pBbmltYXRpb25FbmQgTVNBbmltYXRpb25FbmQgb2FuaW1hdGlvbmVuZCBhbmltYXRpb25lbmQnLCBmdW5jdGlvbigpe1xuICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCk7XG4gICAgfSk7XG59O1xuXG5mdW5jdGlvbiB0b0NsaXBib2FyZChpZCl7XG4gICAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCk7XG4gICAgdmFyIHRleHRBcmVhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRleHRhcmVhXCIpO1xuICAgIHRleHRBcmVhLnZhbHVlID0gZWxlbWVudC50ZXh0Q29udGVudDtcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRleHRBcmVhKTtcbiAgICB0ZXh0QXJlYS5zZWxlY3QoKTtcbiAgICBkb2N1bWVudC5leGVjQ29tbWFuZChcIkNvcHlcIik7XG4gICAgdGV4dEFyZWEucmVtb3ZlKCk7XG59O1xuXG5mdW5jdGlvbiBzZXRDb29raWUoY25hbWUsIGN2YWx1ZSwgZXhkYXlzKSB7XG4gICAgdmFyIGQgPSBuZXcgRGF0ZSgpO1xuICAgIGQuc2V0VGltZShkLmdldFRpbWUoKSArIChleGRheXMqMjQqNjAqNjAqMTAwMCkpO1xuICAgIHZhciBleHBpcmVzID0gXCJleHBpcmVzPVwiKyBkLnRvVVRDU3RyaW5nKCk7XG4gICAgZG9jdW1lbnQuY29va2llID0gY25hbWUgKyBcIj1cIiArIGN2YWx1ZSArIFwiO1wiICsgZXhwaXJlcyArIFwiO3BhdGg9L1wiO1xufVxuXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpe1xuXG4gICAgJChmdW5jdGlvbiAoKSB7XG4gICAgICAgICQoJ1tkYXRhLXRvZ2dsZT1cInRvb2x0aXBcIl0nKS50b29sdGlwKCk7XG4gICAgfSlcblxuICAgICQoZnVuY3Rpb24oKSB7XG4gICAgICAgJCgnW2RhdGEtdG9nZ2xlPVwicG9wb3ZlclwiXScpLnBvcG92ZXIoKTtcbiAgICB9KTtcblxuICAgICQoJyN0b1RvcCcpLmNsaWNrKGZ1bmN0aW9uKGUpe1xuICAgICAgICAkLnNjcm9sbFRvKDAsIDgwMCk7IFxuICAgIH0pO1xuXG4gICAgLyogIGluaXQgYmFjayB0byB0b3AgaWNvbiAqL1xuICAgIHZhciBzY3JvbGxQb3M7IFxuICAgIHZhciB0b1RvcFZpc2libGU9ZmFsc2U7XG4gICAgdmFyIHRvVG9wID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RvVG9wJyk7XG4gXG4gICAgLyogRXZlcnkgdGltZSB0aGUgd2luZG93IGlzIHNjcm9sbGVkIC4uLiAqL1xuICAgICQod2luZG93KS5zY3JvbGwoIGZ1bmN0aW9uKCl7XG4gICAgICAgIC8vIGdldCBzY3JvbGwgcG9zaXRpb25cbiAgICAgICAgc2Nyb2xsUG9zID0gJCh3aW5kb3cpLnNjcm9sbFRvcCgpO1xuICAgICAgICAvLyBzaG93IGJhY2sgdG8gdG9wXG4gICAgICAgIGlmICggc2Nyb2xsUG9zID49IDQwMCAmJiAhdG9Ub3BWaXNpYmxlICl7XG4gICAgICAgICAgICB0b1RvcFZpc2libGU9dHJ1ZTtcbiAgICAgICAgICAgIHRvVG9wLnN0eWxlLnZpc2liaWxpdHk9XCJ2aXNpYmxlXCI7XG4gICAgICAgICAgICB0b1RvcC5zdHlsZS5vcGFjaXR5PVwiMFwiO1xuICAgICAgICAgICAgJCgnI3RvVG9wJykuYW5pbWF0ZSh7J29wYWNpdHknOicxJ30sNzUwKTtcbiAgICAgICAgfSBcbiAgICAgICAgaWYgKCBzY3JvbGxQb3MgPCA0MDAgJiYgdG9Ub3BWaXNpYmxlICl7XG4gICAgICAgICAgICB0b1RvcFZpc2libGU9ZmFsc2U7XG4gICAgICAgICAgICAkKCcjdG9Ub3AnKS5hbmltYXRlKHsnb3BhY2l0eSc6JzAnfSw3NTAsZnVuY3Rpb24oKXsgXG4gICAgICAgICAgICAgICAgdG9Ub3Auc3R5bGUudmlzaWJpbGl0eT1cImhpZGRlblwiO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgIH0pO1xuXG59KTtcbiIsIi8qIVxuICogalF1ZXJ5LnNjcm9sbFRvXG4gKiBDb3B5cmlnaHQgKGMpIDIwMDctMjAxNSBBcmllbCBGbGVzbGVyIC0gYWZsZXNsZXI8YT5nbWFpbDxkPmNvbSB8IGh0dHA6Ly9mbGVzbGVyLmJsb2dzcG90LmNvbVxuICogTGljZW5zZWQgdW5kZXIgTUlUXG4gKiBodHRwOi8vZmxlc2xlci5ibG9nc3BvdC5jb20vMjAwNy8xMC9qcXVlcnlzY3JvbGx0by5odG1sXG4gKiBAcHJvamVjdERlc2NyaXB0aW9uIExpZ2h0d2VpZ2h0LCBjcm9zcy1icm93c2VyIGFuZCBoaWdobHkgY3VzdG9taXphYmxlIGFuaW1hdGVkIHNjcm9sbGluZyB3aXRoIGpRdWVyeVxuICogQGF1dGhvciBBcmllbCBGbGVzbGVyXG4gKiBAdmVyc2lvbiAyLjEuMlxuICovXG47KGZ1bmN0aW9uKGZhY3RvcnkpIHtcblx0J3VzZSBzdHJpY3QnO1xuXHRpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG5cdFx0Ly8gQU1EXG5cdFx0ZGVmaW5lKFsnanF1ZXJ5J10sIGZhY3RvcnkpO1xuXHR9IGVsc2UgaWYgKHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnICYmIG1vZHVsZS5leHBvcnRzKSB7XG5cdFx0Ly8gQ29tbW9uSlNcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkocmVxdWlyZSgnanF1ZXJ5JykpO1xuXHR9IGVsc2Uge1xuXHRcdC8vIEdsb2JhbFxuXHRcdGZhY3RvcnkoalF1ZXJ5KTtcblx0fVxufSkoZnVuY3Rpb24oJCkge1xuXHQndXNlIHN0cmljdCc7XG5cblx0dmFyICRzY3JvbGxUbyA9ICQuc2Nyb2xsVG8gPSBmdW5jdGlvbih0YXJnZXQsIGR1cmF0aW9uLCBzZXR0aW5ncykge1xuXHRcdHJldHVybiAkKHdpbmRvdykuc2Nyb2xsVG8odGFyZ2V0LCBkdXJhdGlvbiwgc2V0dGluZ3MpO1xuXHR9O1xuXG5cdCRzY3JvbGxUby5kZWZhdWx0cyA9IHtcblx0XHRheGlzOid4eScsXG5cdFx0ZHVyYXRpb246IDAsXG5cdFx0bGltaXQ6dHJ1ZVxuXHR9O1xuXG5cdGZ1bmN0aW9uIGlzV2luKGVsZW0pIHtcblx0XHRyZXR1cm4gIWVsZW0ubm9kZU5hbWUgfHxcblx0XHRcdCQuaW5BcnJheShlbGVtLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCksIFsnaWZyYW1lJywnI2RvY3VtZW50JywnaHRtbCcsJ2JvZHknXSkgIT09IC0xO1xuXHR9XHRcdFxuXG5cdCQuZm4uc2Nyb2xsVG8gPSBmdW5jdGlvbih0YXJnZXQsIGR1cmF0aW9uLCBzZXR0aW5ncykge1xuXHRcdGlmICh0eXBlb2YgZHVyYXRpb24gPT09ICdvYmplY3QnKSB7XG5cdFx0XHRzZXR0aW5ncyA9IGR1cmF0aW9uO1xuXHRcdFx0ZHVyYXRpb24gPSAwO1xuXHRcdH1cblx0XHRpZiAodHlwZW9mIHNldHRpbmdzID09PSAnZnVuY3Rpb24nKSB7XG5cdFx0XHRzZXR0aW5ncyA9IHsgb25BZnRlcjpzZXR0aW5ncyB9O1xuXHRcdH1cblx0XHRpZiAodGFyZ2V0ID09PSAnbWF4Jykge1xuXHRcdFx0dGFyZ2V0ID0gOWU5O1xuXHRcdH1cblxuXHRcdHNldHRpbmdzID0gJC5leHRlbmQoe30sICRzY3JvbGxUby5kZWZhdWx0cywgc2V0dGluZ3MpO1xuXHRcdC8vIFNwZWVkIGlzIHN0aWxsIHJlY29nbml6ZWQgZm9yIGJhY2t3YXJkcyBjb21wYXRpYmlsaXR5XG5cdFx0ZHVyYXRpb24gPSBkdXJhdGlvbiB8fCBzZXR0aW5ncy5kdXJhdGlvbjtcblx0XHQvLyBNYWtlIHN1cmUgdGhlIHNldHRpbmdzIGFyZSBnaXZlbiByaWdodFxuXHRcdHZhciBxdWV1ZSA9IHNldHRpbmdzLnF1ZXVlICYmIHNldHRpbmdzLmF4aXMubGVuZ3RoID4gMTtcblx0XHRpZiAocXVldWUpIHtcblx0XHRcdC8vIExldCdzIGtlZXAgdGhlIG92ZXJhbGwgZHVyYXRpb25cblx0XHRcdGR1cmF0aW9uIC89IDI7XG5cdFx0fVxuXHRcdHNldHRpbmdzLm9mZnNldCA9IGJvdGgoc2V0dGluZ3Mub2Zmc2V0KTtcblx0XHRzZXR0aW5ncy5vdmVyID0gYm90aChzZXR0aW5ncy5vdmVyKTtcblxuXHRcdHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oKSB7XG5cdFx0XHQvLyBOdWxsIHRhcmdldCB5aWVsZHMgbm90aGluZywganVzdCBsaWtlIGpRdWVyeSBkb2VzXG5cdFx0XHRpZiAodGFyZ2V0ID09PSBudWxsKSByZXR1cm47XG5cblx0XHRcdHZhciB3aW4gPSBpc1dpbih0aGlzKSxcblx0XHRcdFx0ZWxlbSA9IHdpbiA/IHRoaXMuY29udGVudFdpbmRvdyB8fCB3aW5kb3cgOiB0aGlzLFxuXHRcdFx0XHQkZWxlbSA9ICQoZWxlbSksXG5cdFx0XHRcdHRhcmcgPSB0YXJnZXQsIFxuXHRcdFx0XHRhdHRyID0ge30sXG5cdFx0XHRcdHRvZmY7XG5cblx0XHRcdHN3aXRjaCAodHlwZW9mIHRhcmcpIHtcblx0XHRcdFx0Ly8gQSBudW1iZXIgd2lsbCBwYXNzIHRoZSByZWdleFxuXHRcdFx0XHRjYXNlICdudW1iZXInOlxuXHRcdFx0XHRjYXNlICdzdHJpbmcnOlxuXHRcdFx0XHRcdGlmICgvXihbKy1dPT8pP1xcZCsoXFwuXFxkKyk/KHB4fCUpPyQvLnRlc3QodGFyZykpIHtcblx0XHRcdFx0XHRcdHRhcmcgPSBib3RoKHRhcmcpO1xuXHRcdFx0XHRcdFx0Ly8gV2UgYXJlIGRvbmVcblx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHQvLyBSZWxhdGl2ZS9BYnNvbHV0ZSBzZWxlY3RvclxuXHRcdFx0XHRcdHRhcmcgPSB3aW4gPyAkKHRhcmcpIDogJCh0YXJnLCBlbGVtKTtcblx0XHRcdFx0XHQvKiBmYWxscyB0aHJvdWdoICovXG5cdFx0XHRcdGNhc2UgJ29iamVjdCc6XG5cdFx0XHRcdFx0aWYgKHRhcmcubGVuZ3RoID09PSAwKSByZXR1cm47XG5cdFx0XHRcdFx0Ly8gRE9NRWxlbWVudCAvIGpRdWVyeVxuXHRcdFx0XHRcdGlmICh0YXJnLmlzIHx8IHRhcmcuc3R5bGUpIHtcblx0XHRcdFx0XHRcdC8vIEdldCB0aGUgcmVhbCBwb3NpdGlvbiBvZiB0aGUgdGFyZ2V0XG5cdFx0XHRcdFx0XHR0b2ZmID0gKHRhcmcgPSAkKHRhcmcpKS5vZmZzZXQoKTtcblx0XHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdHZhciBvZmZzZXQgPSAkLmlzRnVuY3Rpb24oc2V0dGluZ3Mub2Zmc2V0KSAmJiBzZXR0aW5ncy5vZmZzZXQoZWxlbSwgdGFyZykgfHwgc2V0dGluZ3Mub2Zmc2V0O1xuXG5cdFx0XHQkLmVhY2goc2V0dGluZ3MuYXhpcy5zcGxpdCgnJyksIGZ1bmN0aW9uKGksIGF4aXMpIHtcblx0XHRcdFx0dmFyIFBvc1x0PSBheGlzID09PSAneCcgPyAnTGVmdCcgOiAnVG9wJyxcblx0XHRcdFx0XHRwb3MgPSBQb3MudG9Mb3dlckNhc2UoKSxcblx0XHRcdFx0XHRrZXkgPSAnc2Nyb2xsJyArIFBvcyxcblx0XHRcdFx0XHRwcmV2ID0gJGVsZW1ba2V5XSgpLFxuXHRcdFx0XHRcdG1heCA9ICRzY3JvbGxUby5tYXgoZWxlbSwgYXhpcyk7XG5cblx0XHRcdFx0aWYgKHRvZmYpIHsvLyBqUXVlcnkgLyBET01FbGVtZW50XG5cdFx0XHRcdFx0YXR0cltrZXldID0gdG9mZltwb3NdICsgKHdpbiA/IDAgOiBwcmV2IC0gJGVsZW0ub2Zmc2V0KClbcG9zXSk7XG5cblx0XHRcdFx0XHQvLyBJZiBpdCdzIGEgZG9tIGVsZW1lbnQsIHJlZHVjZSB0aGUgbWFyZ2luXG5cdFx0XHRcdFx0aWYgKHNldHRpbmdzLm1hcmdpbikge1xuXHRcdFx0XHRcdFx0YXR0cltrZXldIC09IHBhcnNlSW50KHRhcmcuY3NzKCdtYXJnaW4nK1BvcyksIDEwKSB8fCAwO1xuXHRcdFx0XHRcdFx0YXR0cltrZXldIC09IHBhcnNlSW50KHRhcmcuY3NzKCdib3JkZXInK1BvcysnV2lkdGgnKSwgMTApIHx8IDA7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0YXR0cltrZXldICs9IG9mZnNldFtwb3NdIHx8IDA7XG5cblx0XHRcdFx0XHRpZiAoc2V0dGluZ3Mub3Zlcltwb3NdKSB7XG5cdFx0XHRcdFx0XHQvLyBTY3JvbGwgdG8gYSBmcmFjdGlvbiBvZiBpdHMgd2lkdGgvaGVpZ2h0XG5cdFx0XHRcdFx0XHRhdHRyW2tleV0gKz0gdGFyZ1theGlzID09PSAneCc/J3dpZHRoJzonaGVpZ2h0J10oKSAqIHNldHRpbmdzLm92ZXJbcG9zXTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0dmFyIHZhbCA9IHRhcmdbcG9zXTtcblx0XHRcdFx0XHQvLyBIYW5kbGUgcGVyY2VudGFnZSB2YWx1ZXNcblx0XHRcdFx0XHRhdHRyW2tleV0gPSB2YWwuc2xpY2UgJiYgdmFsLnNsaWNlKC0xKSA9PT0gJyUnID9cblx0XHRcdFx0XHRcdHBhcnNlRmxvYXQodmFsKSAvIDEwMCAqIG1heFxuXHRcdFx0XHRcdFx0OiB2YWw7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBOdW1iZXIgb3IgJ251bWJlcidcblx0XHRcdFx0aWYgKHNldHRpbmdzLmxpbWl0ICYmIC9eXFxkKyQvLnRlc3QoYXR0cltrZXldKSkge1xuXHRcdFx0XHRcdC8vIENoZWNrIHRoZSBsaW1pdHNcblx0XHRcdFx0XHRhdHRyW2tleV0gPSBhdHRyW2tleV0gPD0gMCA/IDAgOiBNYXRoLm1pbihhdHRyW2tleV0sIG1heCk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBEb24ndCB3YXN0ZSB0aW1lIGFuaW1hdGluZywgaWYgdGhlcmUncyBubyBuZWVkLlxuXHRcdFx0XHRpZiAoIWkgJiYgc2V0dGluZ3MuYXhpcy5sZW5ndGggPiAxKSB7XG5cdFx0XHRcdFx0aWYgKHByZXYgPT09IGF0dHJba2V5XSkge1xuXHRcdFx0XHRcdFx0Ly8gTm8gYW5pbWF0aW9uIG5lZWRlZFxuXHRcdFx0XHRcdFx0YXR0ciA9IHt9O1xuXHRcdFx0XHRcdH0gZWxzZSBpZiAocXVldWUpIHtcblx0XHRcdFx0XHRcdC8vIEludGVybWVkaWF0ZSBhbmltYXRpb25cblx0XHRcdFx0XHRcdGFuaW1hdGUoc2V0dGluZ3Mub25BZnRlckZpcnN0KTtcblx0XHRcdFx0XHRcdC8vIERvbid0IGFuaW1hdGUgdGhpcyBheGlzIGFnYWluIGluIHRoZSBuZXh0IGl0ZXJhdGlvbi5cblx0XHRcdFx0XHRcdGF0dHIgPSB7fTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXG5cdFx0XHRhbmltYXRlKHNldHRpbmdzLm9uQWZ0ZXIpO1xuXG5cdFx0XHRmdW5jdGlvbiBhbmltYXRlKGNhbGxiYWNrKSB7XG5cdFx0XHRcdHZhciBvcHRzID0gJC5leHRlbmQoe30sIHNldHRpbmdzLCB7XG5cdFx0XHRcdFx0Ly8gVGhlIHF1ZXVlIHNldHRpbmcgY29uZmxpY3RzIHdpdGggYW5pbWF0ZSgpXG5cdFx0XHRcdFx0Ly8gRm9yY2UgaXQgdG8gYWx3YXlzIGJlIHRydWVcblx0XHRcdFx0XHRxdWV1ZTogdHJ1ZSxcblx0XHRcdFx0XHRkdXJhdGlvbjogZHVyYXRpb24sXG5cdFx0XHRcdFx0Y29tcGxldGU6IGNhbGxiYWNrICYmIGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdFx0Y2FsbGJhY2suY2FsbChlbGVtLCB0YXJnLCBzZXR0aW5ncyk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblx0XHRcdFx0JGVsZW0uYW5pbWF0ZShhdHRyLCBvcHRzKTtcblx0XHRcdH1cblx0XHR9KTtcblx0fTtcblxuXHQvLyBNYXggc2Nyb2xsaW5nIHBvc2l0aW9uLCB3b3JrcyBvbiBxdWlya3MgbW9kZVxuXHQvLyBJdCBvbmx5IGZhaWxzIChub3QgdG9vIGJhZGx5KSBvbiBJRSwgcXVpcmtzIG1vZGUuXG5cdCRzY3JvbGxUby5tYXggPSBmdW5jdGlvbihlbGVtLCBheGlzKSB7XG5cdFx0dmFyIERpbSA9IGF4aXMgPT09ICd4JyA/ICdXaWR0aCcgOiAnSGVpZ2h0Jyxcblx0XHRcdHNjcm9sbCA9ICdzY3JvbGwnK0RpbTtcblxuXHRcdGlmICghaXNXaW4oZWxlbSkpXG5cdFx0XHRyZXR1cm4gZWxlbVtzY3JvbGxdIC0gJChlbGVtKVtEaW0udG9Mb3dlckNhc2UoKV0oKTtcblxuXHRcdHZhciBzaXplID0gJ2NsaWVudCcgKyBEaW0sXG5cdFx0XHRkb2MgPSBlbGVtLm93bmVyRG9jdW1lbnQgfHwgZWxlbS5kb2N1bWVudCxcblx0XHRcdGh0bWwgPSBkb2MuZG9jdW1lbnRFbGVtZW50LFxuXHRcdFx0Ym9keSA9IGRvYy5ib2R5O1xuXG5cdFx0cmV0dXJuIE1hdGgubWF4KGh0bWxbc2Nyb2xsXSwgYm9keVtzY3JvbGxdKSAtIE1hdGgubWluKGh0bWxbc2l6ZV0sIGJvZHlbc2l6ZV0pO1xuXHR9O1xuXG5cdGZ1bmN0aW9uIGJvdGgodmFsKSB7XG5cdFx0cmV0dXJuICQuaXNGdW5jdGlvbih2YWwpIHx8ICQuaXNQbGFpbk9iamVjdCh2YWwpID8gdmFsIDogeyB0b3A6dmFsLCBsZWZ0OnZhbCB9O1xuXHR9XG5cblx0Ly8gQWRkIHNwZWNpYWwgaG9va3Mgc28gdGhhdCB3aW5kb3cgc2Nyb2xsIHByb3BlcnRpZXMgY2FuIGJlIGFuaW1hdGVkXG5cdCQuVHdlZW4ucHJvcEhvb2tzLnNjcm9sbExlZnQgPSBcblx0JC5Ud2Vlbi5wcm9wSG9va3Muc2Nyb2xsVG9wID0ge1xuXHRcdGdldDogZnVuY3Rpb24odCkge1xuXHRcdFx0cmV0dXJuICQodC5lbGVtKVt0LnByb3BdKCk7XG5cdFx0fSxcblx0XHRzZXQ6IGZ1bmN0aW9uKHQpIHtcblx0XHRcdHZhciBjdXJyID0gdGhpcy5nZXQodCk7XG5cdFx0XHQvLyBJZiBpbnRlcnJ1cHQgaXMgdHJ1ZSBhbmQgdXNlciBzY3JvbGxlZCwgc3RvcCBhbmltYXRpbmdcblx0XHRcdGlmICh0Lm9wdGlvbnMuaW50ZXJydXB0ICYmIHQuX2xhc3QgJiYgdC5fbGFzdCAhPT0gY3Vycikge1xuXHRcdFx0XHRyZXR1cm4gJCh0LmVsZW0pLnN0b3AoKTtcblx0XHRcdH1cblx0XHRcdHZhciBuZXh0ID0gTWF0aC5yb3VuZCh0Lm5vdyk7XG5cdFx0XHQvLyBEb24ndCB3YXN0ZSBDUFVcblx0XHRcdC8vIEJyb3dzZXJzIGRvbid0IHJlbmRlciBmbG9hdGluZyBwb2ludCBzY3JvbGxcblx0XHRcdGlmIChjdXJyICE9PSBuZXh0KSB7XG5cdFx0XHRcdCQodC5lbGVtKVt0LnByb3BdKG5leHQpO1xuXHRcdFx0XHR0Ll9sYXN0ID0gdGhpcy5nZXQodCk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9O1xuXG5cdC8vIEFNRCByZXF1aXJlbWVudFxuXHRyZXR1cm4gJHNjcm9sbFRvO1xufSk7XG4iXSwic291cmNlUm9vdCI6IiJ9