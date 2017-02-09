;(function(window) {

  var svgSprite = '<svg>' +
    '' +
    '<symbol id="icon-recommend" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M511.79585 295.563576C397.522224 28.925796 72.699254 91.136673 70.561567 400.611074 69.376579 570.576093 225.233276 634.111129 329.005734 702.05866c100.623745 65.897849 172.241876 156.041916 183.464475 194.417945 9.609869-37.601386 89.376587-130.298602 182.52201-196.260919 101.847619-72.127737 259.630179-131.487683 258.44519-301.450656C951.287443 88.524173 620.8148 39.561018 511.79585 295.563576z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-wode-copy-copy" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M87.449 843.928v-18.353c0-156.923 128.131-284.159 286.215-284.159h276.982c158.084 0 286.237 127.237 286.237 284.159v18.353c0 156.923-849.437 156.923-849.437 0zM512.168 501.472c-111.701 0-202.255-98.378-202.255-219.735s90.555-219.735 202.255-219.735c111.678 0 202.233 98.378 202.233 219.735 0 121.358-90.555 219.735-202.233 219.735z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-shouye_shouye" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M884.013253 469.888L521.981414 131.053899 159.941818 468.889859c-7.078788 6.614626-7.478303 17.727354-0.85204 24.807434 6.606869 7.078788 17.723475 7.474424 24.802262 0.855919L521.955556 179.09398l338.072565 316.418586a17.508848 17.508848 0 0 0 11.993212 4.734707 17.480404 17.480404 0 0 0 12.810344-5.553132c6.619798-7.078788 6.260364-18.186343-0.818424-24.806141z"  ></path>' +
    '' +
    '<path d="M773.533737 476.847838c-9.686626 0-17.551515 7.86101-17.551515 17.54893v269.119353H615.575273V576.307717h-187.216162v187.208404H287.948283V494.396768c0-9.687919-7.850667-17.548929-17.550222-17.54893-9.700848 0-17.551515 7.86101-17.551516 17.54893v304.221091h210.614303V611.410747h117.006223v187.208405h210.620767V494.396768c0-9.687919-7.864889-17.548929-17.554101-17.54893zM650.675717 225.281293h105.306505v93.601616c0 9.707313 7.864889 17.556687 17.551515 17.556687 9.689212 0 17.554101-7.849374 17.554101-17.556687V190.17697h-140.412121c-9.686626 0-17.551515 7.849374-17.551515 17.550222 0 9.703434 7.864889 17.554101 17.551515 17.554101z"  ></path>' +
    '' +
    '<path d="M276.549818 770.527677h161.850182V591.220364h157.092202v179.307313h174.546747V492.840081h96.792566L521.967192 165.96299 164.807111 488.285091l110.15499 4.55499z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '</svg>'
  var script = function() {
    var scripts = document.getElementsByTagName('script')
    return scripts[scripts.length - 1]
  }()
  var shouldInjectCss = script.getAttribute("data-injectcss")

  /**
   * document ready
   */
  var ready = function(fn) {
    if (document.addEventListener) {
      if (~["complete", "loaded", "interactive"].indexOf(document.readyState)) {
        setTimeout(fn, 0)
      } else {
        var loadFn = function() {
          document.removeEventListener("DOMContentLoaded", loadFn, false)
          fn()
        }
        document.addEventListener("DOMContentLoaded", loadFn, false)
      }
    } else if (document.attachEvent) {
      IEContentLoaded(window, fn)
    }

    function IEContentLoaded(w, fn) {
      var d = w.document,
        done = false,
        // only fire once
        init = function() {
          if (!done) {
            done = true
            fn()
          }
        }
        // polling for no errors
      var polling = function() {
        try {
          // throws errors until after ondocumentready
          d.documentElement.doScroll('left')
        } catch (e) {
          setTimeout(polling, 50)
          return
        }
        // no errors, fire

        init()
      };

      polling()
        // trying to always fire before onload
      d.onreadystatechange = function() {
        if (d.readyState == 'complete') {
          d.onreadystatechange = null
          init()
        }
      }
    }
  }

  /**
   * Insert el before target
   *
   * @param {Element} el
   * @param {Element} target
   */

  var before = function(el, target) {
    target.parentNode.insertBefore(el, target)
  }

  /**
   * Prepend el to target
   *
   * @param {Element} el
   * @param {Element} target
   */

  var prepend = function(el, target) {
    if (target.firstChild) {
      before(el, target.firstChild)
    } else {
      target.appendChild(el)
    }
  }

  function appendSvg() {
    var div, svg

    div = document.createElement('div')
    div.innerHTML = svgSprite
    svgSprite = null
    svg = div.getElementsByTagName('svg')[0]
    if (svg) {
      svg.setAttribute('aria-hidden', 'true')
      svg.style.position = 'absolute'
      svg.style.width = 0
      svg.style.height = 0
      svg.style.overflow = 'hidden'
      prepend(svg, document.body)
    }
  }

  if (shouldInjectCss && !window.__iconfont__svg__cssinject__) {
    window.__iconfont__svg__cssinject__ = true
    try {
      document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>");
    } catch (e) {
      console && console.log(e)
    }
  }

  ready(appendSvg)


})(window)