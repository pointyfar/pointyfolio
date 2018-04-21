(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*!
 * Hugo Tags Filter
 * v0.1
 * MIT License 
 * by PointyFar 
 */

var HugoTagsFilter = function () {
  function HugoTagsFilter(config) {
    _classCallCheck(this, HugoTagsFilter);

    var defaultFilters = [{
      name: 'tag',
      prefix: 'tft-',
      buttonClass: 'tft-button',
      allSelector: '#tfSelectAllTags',
      attrName: 'data-tags'
    }, {
      name: 'section',
      prefix: 'tfs-',
      buttonClass: 'tfs-button',
      allSelector: '#tfSelectAllSections',
      attrName: 'data-section'
    }];

    this.FILTERS = config && config.filters ? config.filters : defaultFilters;
    this.showItemClass = config && config.showItemClass ? config.showItemClass : "tf-show";
    this.activeButtonClass = config && config.activeButtonClass ? config.activeButtonClass : "active";
    this.filterItemClass = config && config.filterItemClass ? config.filterItemClass : "tf-filter-item";

    this.filterItems = document.getElementsByClassName(this.filterItemClass);
    this.selectedItemCount = 0;

    for (var i = 0; i < this.FILTERS.length; i++) {
      this.FILTERS[i]['buttonTotal'] = document.getElementsByClassName(this.FILTERS[i]['buttonClass']).length;
      this.FILTERS[i]['selected'] = [];
    }
    this.showCheck(this.FILTERS[0]['name']);
  }

  _createClass(HugoTagsFilter, [{
    key: 'showAll',
    value: function showAll(filter) {
      for (var i = 0; i < this.FILTERS.length; i++) {
        if (filter) {
          if (this.FILTERS[i]['name'] === filter) {
            this.FILTERS[i]['selected'] = [];
          }
        } else {
          this.FILTERS[i]['selected'] = [];
        }
      }
      this.showCheck(filter);
    }
  }, {
    key: 'checkFilter',
    value: function checkFilter(tag, tagType) {

      /* Selects clicked button.*/
      var selectedBtn = document.querySelector('#' + tagType + tag);

      for (var i = 0; i < this.FILTERS.length; i++) {
        if (this.FILTERS[i]['prefix'] === tagType) {
          if (this.FILTERS[i]['selected'].indexOf(tag) >= 0) {
            /* already selected, deselect tag */
            this.FILTERS[i]['selected'].splice(tag, 1);
            this.delClassIfPresent(selectedBtn, this.activeButtonClass);
          } else {
            /* add tag to selected list */
            this.FILTERS[i]['selected'].push(tag);
            this.addClassIfMissing(selectedBtn, this.activeButtonClass);
          }
          this.delClassIfPresent(document.querySelector(this.FILTERS[i]['allSelector']), this.activeButtonClass);
          this.showCheck(this.FILTERS[i]['name']);
        }
      }
    }

    /**
    * showCheck - Applies "show" class to items containing selected tags
    */

  }, {
    key: 'showCheck',
    value: function showCheck(filter) {

      /* If no tags/licenses selected, or all tags selected, SHOW ALL and DESELECT ALL BUTTONS. */
      for (var i = 0; i < this.FILTERS.length; i++) {
        if (this.FILTERS[i]['name'] === filter) {
          if (this.FILTERS[i]['selected'].length === 0 || this.FILTERS[i]['selected'].length === this.FILTERS[i]['buttonTotal']) {
            var iBtns = document.getElementsByClassName(this.FILTERS[i]['buttonClass']);
            for (j = 0; j < iBtns.length; j++) {
              this.delClassIfPresent(iBtns[j], this.activeButtonClass);
            }
            this.addClassIfMissing(document.querySelector(this.FILTERS[i]['allSelector']), this.activeButtonClass);
          }
        }
      }

      this.selectedItemCount = 0;

      for (var i = 0; i < this.filterItems.length; i++) {
        /* First remove "show" class */
        this.delClassIfPresent(this.filterItems[i], this.showItemClass);

        var visibility = 0;
        /* show item only if visibility is true for all filters */
        for (var j = 0; j < this.FILTERS.length; j++) {
          if (this.checkVisibility(this.FILTERS[j]['selected'], this.filterItems[i].getAttribute(this.FILTERS[j]['attrName']))) {
            visibility++;
          }
        }
        /* Then check if "show" class should be applied */
        if (visibility === this.FILTERS.length) {
          if (!this.filterItems[i].classList.contains(this.showItemClass)) {
            this.selectedItemCount++;
            this.addClassIfMissing(this.filterItems[i], this.showItemClass);
          }
        }
      }
      if (document.getElementById("selectedItemCount")) {
        document.getElementById("selectedItemCount").textContent = '' + this.selectedItemCount;
      }
    }

    /**
    * checkVisibility - Tests if attribute is included in list.
    */

  }, {
    key: 'checkVisibility',
    value: function checkVisibility(list, dataAttr) {
      /* Returns TRUE if list is empty or attribute is in list */
      if (list.length > 0) {
        for (var v = 0; v < list.length; v++) {
          if (dataAttr.indexOf(list[v]) >= 0) {
            return true;
          }
        }
        return false;
      } else {
        return true;
      }
    }
  }, {
    key: 'addClassIfMissing',
    value: function addClassIfMissing(el, cn) {
      if (!el.classList.contains(cn)) {
        el.classList.add(cn);
      }
    }
  }, {
    key: 'delClassIfPresent',
    value: function delClassIfPresent(el, cn) {
      if (el.classList.contains(cn)) {
        el.classList.remove(cn);
      }
    }
  }]);

  return HugoTagsFilter;
}();

window['HugoTagsFilter'] = HugoTagsFilter;

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvaHVnb3RhZ3NmaWx0ZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7QUNBQTs7Ozs7OztJQU9NLGM7QUFDSiwwQkFBWSxNQUFaLEVBQW9CO0FBQUE7O0FBQ2xCLFFBQUksaUJBQWlCLENBQ25CO0FBQ0UsWUFBTSxLQURSO0FBRUUsY0FBUSxNQUZWO0FBR0UsbUJBQWEsWUFIZjtBQUlFLG1CQUFhLGtCQUpmO0FBS0UsZ0JBQVU7QUFMWixLQURtQixFQVFuQjtBQUNFLFlBQU0sU0FEUjtBQUVFLGNBQVEsTUFGVjtBQUdFLG1CQUFhLFlBSGY7QUFJRSxtQkFBYSxzQkFKZjtBQUtFLGdCQUFVO0FBTFosS0FSbUIsQ0FBckI7O0FBaUJBLFNBQUssT0FBTCxHQUFnQixVQUFVLE9BQU8sT0FBbEIsR0FBNkIsT0FBTyxPQUFwQyxHQUE4QyxjQUE3RDtBQUNBLFNBQUssYUFBTCxHQUFzQixVQUFVLE9BQU8sYUFBbEIsR0FBbUMsT0FBTyxhQUExQyxHQUEwRCxTQUEvRTtBQUNBLFNBQUssaUJBQUwsR0FBMEIsVUFBVSxPQUFPLGlCQUFsQixHQUF1QyxPQUFPLGlCQUE5QyxHQUFrRSxRQUEzRjtBQUNBLFNBQUssZUFBTCxHQUF3QixVQUFVLE9BQU8sZUFBbEIsR0FBcUMsT0FBTyxlQUE1QyxHQUE4RCxnQkFBckY7O0FBRUEsU0FBSyxXQUFMLEdBQW1CLFNBQVMsc0JBQVQsQ0FBZ0MsS0FBSyxlQUFyQyxDQUFuQjtBQUNBLFNBQUssaUJBQUwsR0FBeUIsQ0FBekI7O0FBRUEsU0FBSyxJQUFJLElBQUksQ0FBYixFQUFnQixJQUFJLEtBQUssT0FBTCxDQUFhLE1BQWpDLEVBQXlDLEdBQXpDLEVBQThDO0FBQzVDLFdBQUssT0FBTCxDQUFhLENBQWIsRUFBZ0IsYUFBaEIsSUFBaUMsU0FBUyxzQkFBVCxDQUFnQyxLQUFLLE9BQUwsQ0FBYSxDQUFiLEVBQWdCLGFBQWhCLENB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OUI7QUFDQSxVQUFJLEtBQUssTUFBTCxHQUFjLENBQWxCLEVBQXFCO0FBQ25CLGFBQUksSUFBSSxJQUFJLENBQVosRUFBZSxJQUFJLEtBQUssTUFBeEIsRUFBZ0MsR0FBaEMsRUFBb0M7QUFDbEMsY0FBRyxTQUFTLE9BQVQsQ0FBaUIsS0FBSyxDQUFMLENBQWpCLEtBQTRCLENBQS9CLEVBQW1DO0FBQ2pDLG1CQUFPLElBQVA7QUFDRDtBQUNGO0FBQ0QsZUFBTyxLQUFQO0FBQ0QsT0FQRCxNQU9PO0FBQ0wsZUFBTyxJQUFQO0FBQ0Q7QUFDRjs7O3NDQUVpQixFLEVBQUksRSxFQUFJO0FBQ3hCLFVBQUcsQ0FBQyxHQUFHLFNBQUgsQ0FBYSxRQUFiLENBQXNCLEVBQXRCLENBQUosRUFBK0I7QUFDN0IsV0FBRyxTQUFILENBQWEsR0FBYixDQUFpQixFQUFqQjtBQUNEO0FBQ0Y7OztzQ0FFaUIsRSxFQUFJLEUsRUFBSTtBQUN4QixVQUFHLEdBQUcsU0FBSCxDQUFhLFFBQWIsQ0FBc0IsRUFBdEIsQ0FBSCxFQUE4QjtBQUM1QixXQUFHLFNBQUgsQ0FBYSxNQUFiLENBQW9CLEVBQXBCO0FBQ0Q7QUFDRjs7Ozs7O0FBR0gsT0FBTyxnQkFBUCxJQUEyQixjQUEzQiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIi8qIVxuICogSHVnbyBUYWdzIEZpbHRlclxuICogdjAuMVxuICogTUlUIExpY2Vuc2UgXG4gKiBieSBQb2ludHlGYXIgXG4gKi8gXG5cbmNsYXNzIEh1Z29UYWdzRmlsdGVyIHtcbiAgY29uc3RydWN0b3IoY29uZmlnKSB7XG4gICAgdmFyIGRlZmF1bHRGaWx0ZXJzID0gW1xuICAgICAge1xuICAgICAgICBuYW1lOiAndGFnJyxcbiAgICAgICAgcHJlZml4OiAndGZ0LScsXG4gICAgICAgIGJ1dHRvbkNsYXNzOiAndGZ0LWJ1dHRvbicsXG4gICAgICAgIGFsbFNlbGVjdG9yOiAnI3RmU2VsZWN0QWxsVGFncycsXG4gICAgICAgIGF0dHJOYW1lOiAnZGF0YS10YWdzJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgbmFtZTogJ3NlY3Rpb24nLFxuICAgICAgICBwcmVmaXg6ICd0ZnMtJyxcbiAgICAgICAgYnV0dG9uQ2xhc3M6ICd0ZnMtYnV0dG9uJyxcbiAgICAgICAgYWxsU2VsZWN0b3I6ICcjdGZTZWxlY3RBbGxTZWN0aW9ucycsXG4gICAgICAgIGF0dHJOYW1lOiAnZGF0YS1zZWN0aW9uJ1xuICAgICAgfSxcbiAgICBdXG4gICAgXG4gICAgdGhpcy5GSUxURVJTID0gKGNvbmZpZyAmJiBjb25maWcuZmlsdGVycykgPyBjb25maWcuZmlsdGVycyA6IGRlZmF1bHRGaWx0ZXJzO1xuICAgIHRoaXMuc2hvd0l0ZW1DbGFzcyA9IChjb25maWcgJiYgY29uZmlnLnNob3dJdGVtQ2xhc3MpID8gY29uZmlnLnNob3dJdGVtQ2xhc3MgOiBcInRmLXNob3dcIjtcbiAgICB0aGlzLmFjdGl2ZUJ1dHRvbkNsYXNzID0gKGNvbmZpZyAmJiBjb25maWcuYWN0aXZlQnV0dG9uQ2xhc3MpID8gY29uZmlnLmFjdGl2ZUJ1dHRvbkNsYXNzIDogXCJhY3RpdmVcIjtcbiAgICB0aGlzLmZpbHRlckl0ZW1DbGFzcyA9IChjb25maWcgJiYgY29uZmlnLmZpbHRlckl0ZW1DbGFzcykgPyBjb25maWcuZmlsdGVySXRlbUNsYXNzIDogXCJ0Zi1maWx0ZXItaXRlbVwiO1xuICAgIFxuICAgIHRoaXMuZmlsdGVySXRlbXMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKHRoaXMuZmlsdGVySXRlbUNsYXNzKTtcbiAgICB0aGlzLnNlbGVjdGVkSXRlbUNvdW50ID0gMDtcbiAgICBcbiAgICBmb3IoIHZhciBpID0gMDsgaSA8IHRoaXMuRklMVEVSUy5sZW5ndGg7IGkrKykge1xuICAgICAgdGhpcy5GSUxURVJTW2ldWydidXR0b25Ub3RhbCddID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSh0aGlzLkZJTFRFUlNbaV1bJ2J1dHRvbkNsYXNzJ10pLmxlbmd0aDtcbiAgICAgIHRoaXMuRklMVEVSU1tpXVsnc2VsZWN0ZWQnXSA9IFtdO1xuICAgIH1cbiAgICB0aGlzLnNob3dDaGVjayh0aGlzLkZJTFRFUlNbMF1bJ25hbWUnXSk7XG5cbiAgfVxuICBcbiAgc2hvd0FsbChmaWx0ZXIpIHtcbiAgICBmb3IoIHZhciBpID0gMDsgaSA8IHRoaXMuRklMVEVSUy5sZW5ndGg7IGkrKykge1xuICAgICAgaWYoZmlsdGVyKSB7XG4gICAgICAgIGlmKHRoaXMuRklMVEVSU1tpXVsnbmFtZSddID09PSBmaWx0ZXIpIHtcbiAgICAgICAgICB0aGlzLkZJTFRFUlNbaV1bJ3NlbGVjdGVkJ10gPSBbXTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5GSUxURVJTW2ldWydzZWxlY3RlZCddID0gW107XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuc2hvd0NoZWNrKGZpbHRlcilcbiAgfVxuICBcbiAgY2hlY2tGaWx0ZXIodGFnLCB0YWdUeXBlKSB7XG4gICAgXG4gICAgLyogU2VsZWN0cyBjbGlja2VkIGJ1dHRvbi4qLyAgIFxuICAgIHZhciBzZWxlY3RlZEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCMke3RhZ1R5cGV9JHt0YWd9YCk7XG4gICAgXG4gICAgZm9yICggdmFyIGkgPSAwOyBpIDwgdGhpcy5GSUxURVJTLmxlbmd0aDsgaSsrICkge1xuICAgICAgaWYgKCB0aGlzLkZJTFRFUlNbaV1bJ3ByZWZpeCddID09PSB0YWdUeXBlICkge1xuICAgICAgICBpZiAoIHRoaXMuRklMVEVSU1tpXVsnc2VsZWN0ZWQnXS5pbmRleE9mKHRhZykgPj0gMCApIHsgXG4gICAgICAgICAgLyogYWxyZWFkeSBzZWxlY3RlZCwgZGVzZWxlY3QgdGFnICovXG4gICAgICAgICAgdGhpcy5GSUxURVJTW2ldWydzZWxlY3RlZCddLnNwbGljZSh0YWcsMSk7XG4gICAgICAgICAgdGhpcy5kZWxDbGFzc0lmUHJlc2VudChzZWxlY3RlZEJ0biwgdGhpcy5hY3RpdmVCdXR0b25DbGFzcyk7XG4gICAgICAgIH0gZWxzZSB7IFxuICAgICAgICAgIC8qIGFkZCB0YWcgdG8gc2VsZWN0ZWQgbGlzdCAqL1xuICAgICAgICAgIHRoaXMuRklMVEVSU1tpXVsnc2VsZWN0ZWQnXS5wdXNoKHRhZyk7XG4gICAgICAgICAgdGhpcy5hZGRDbGFzc0lmTWlzc2luZyhzZWxlY3RlZEJ0biwgdGhpcy5hY3RpdmVCdXR0b25DbGFzcyk7XG4gICAgICAgIH0gXG4gICAgICAgIHRoaXMuZGVsQ2xhc3NJZlByZXNlbnQoZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0aGlzLkZJTFRFUlNbaV1bJ2FsbFNlbGVjdG9yJ10pLCB0aGlzLmFjdGl2ZUJ1dHRvbkNsYXNzKTtcbiAgICAgICAgdGhpcy5zaG93Q2hlY2sodGhpcy5GSUxURVJTW2ldWyduYW1lJ10pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBcbiAgLyoqXG4gICogc2hvd0NoZWNrIC0gQXBwbGllcyBcInNob3dcIiBjbGFzcyB0byBpdGVtcyBjb250YWluaW5nIHNlbGVjdGVkIHRhZ3NcbiAgKi8gXG4gIHNob3dDaGVjayhmaWx0ZXIpIHtcbiAgICBcbiAgICAvKiBJZiBubyB0YWdzL2xpY2Vuc2VzIHNlbGVjdGVkLCBvciBhbGwgdGFncyBzZWxlY3RlZCwgU0hPVyBBTEwgYW5kIERFU0VMRUNUIEFMTCBCVVRUT05TLiAqLyAgIFxuICAgIGZvciAoIHZhciBpID0gMDsgaSA8IHRoaXMuRklMVEVSUy5sZW5ndGg7IGkrKyApIHtcbiAgICAgIGlmKCB0aGlzLkZJTFRFUlNbaV1bJ25hbWUnXSA9PT0gZmlsdGVyICkge1xuICAgICAgICBpZiggKHRoaXMuRklMVEVSU1tpXVsnc2VsZWN0ZWQnXS5sZW5ndGggPT09IDApIHx8IFxuICAgICAgICAodGhpcy5GSUxURVJTW2ldWydzZWxlY3RlZCddLmxlbmd0aCA9PT0gdGhpcy5GSUxURVJTW2ldWydidXR0b25Ub3RhbCddKSApIFxuICAgICAgICB7ICBcbiAgICAgICAgICB2YXIgaUJ0bnMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKHRoaXMuRklMVEVSU1tpXVsnYnV0dG9uQ2xhc3MnXSk7XG4gICAgICAgICAgZm9yICggaiA9IDA7IGogPCBpQnRucy5sZW5ndGg7IGorKyApIHtcbiAgICAgICAgICAgIHRoaXMuZGVsQ2xhc3NJZlByZXNlbnQoaUJ0bnNbal0sIHRoaXMuYWN0aXZlQnV0dG9uQ2xhc3MpXG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMuYWRkQ2xhc3NJZk1pc3NpbmcoZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0aGlzLkZJTFRFUlNbaV1bJ2FsbFNlbGVjdG9yJ10pLCB0aGlzLmFjdGl2ZUJ1dHRvbkNsYXNzKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIFxuICAgIFxuICAgIHRoaXMuc2VsZWN0ZWRJdGVtQ291bnQ9MDtcbiAgICBcbiAgICBmb3IgKCB2YXIgaSA9IDA7IGkgPCB0aGlzLmZpbHRlckl0ZW1zLmxlbmd0aDsgaSsrICkge1xuICAgICAgLyogRmlyc3QgcmVtb3ZlIFwic2hvd1wiIGNsYXNzICovXG4gICAgICB0aGlzLmRlbENsYXNzSWZQcmVzZW50KHRoaXMuZmlsdGVySXRlbXNbaV0sIHRoaXMuc2hvd0l0ZW1DbGFzcyk7XG4gICAgICBcbiAgICAgIHZhciB2aXNpYmlsaXR5ID0gMDtcbiAgICAgIC8qIHNob3cgaXRlbSBvbmx5IGlmIHZpc2liaWxpdHkgaXMgdHJ1ZSBmb3IgYWxsIGZpbHRlcnMgKi9cbiAgICAgIGZvciAoIHZhciBqID0gMDsgaiA8IHRoaXMuRklMVEVSUy5sZW5ndGg7IGorKyApIHtcbiAgICAgICAgaWYgKCB0aGlzLmNoZWNrVmlzaWJpbGl0eSh0aGlzLkZJTFRFUlNbal1bJ3NlbGVjdGVkJ10sIHRoaXMuZmlsdGVySXRlbXNbaV0uZ2V0QXR0cmlidXRlKHRoaXMuRklMVEVSU1tqXVsnYXR0ck5hbWUnXSkpICkge1xuICAgICAgICAgIHZpc2liaWxpdHkrKztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgLyogVGhlbiBjaGVjayBpZiBcInNob3dcIiBjbGFzcyBzaG91bGQgYmUgYXBwbGllZCAqL1xuICAgICAgaWYgKCB2aXNpYmlsaXR5ID09PSB0aGlzLkZJTFRFUlMubGVuZ3RoICkge1xuICAgICAgICBpZiAoICF0aGlzLmZpbHRlckl0ZW1zW2ldLmNsYXNzTGlzdC5jb250YWlucyh0aGlzLnNob3dJdGVtQ2xhc3MpICkge1xuICAgICAgICAgIHRoaXMuc2VsZWN0ZWRJdGVtQ291bnQrKztcbiAgICAgICAgICB0aGlzLmFkZENsYXNzSWZNaXNzaW5nKHRoaXMuZmlsdGVySXRlbXNbaV0sIHRoaXMuc2hvd0l0ZW1DbGFzcyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgaWYoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzZWxlY3RlZEl0ZW1Db3VudFwiKSkge1xuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzZWxlY3RlZEl0ZW1Db3VudFwiKS50ZXh0Q29udGVudD1gJHt0aGlzLnNlbGVjdGVkSXRlbUNvdW50fWA7XG4gICAgfVxuICAgIFxuICB9XG4gIFxuICBcbiAgXG4gIC8qKlxuICAqIGNoZWNrVmlzaWJpbGl0eSAtIFRlc3RzIGlmIGF0dHJpYnV0ZSBpcyBpbmNsdWRlZCBpbiBsaXN0LlxuICAqLyBcbiAgY2hlY2tWaXNpYmlsaXR5KGxpc3QsIGRhdGFBdHRyKSB7XG4gICAgLyogUmV0dXJucyBUUlVFIGlmIGxpc3QgaXMgZW1wdHkgb3IgYXR0cmlidXRlIGlzIGluIGxpc3QgKi8gICBcbiAgICBpZiAobGlzdC5sZW5ndGggPiAwKSB7XG4gICAgICBmb3IodmFyIHYgPSAwOyB2IDwgbGlzdC5sZW5ndGg7IHYrKyl7XG4gICAgICAgIGlmKGRhdGFBdHRyLmluZGV4T2YobGlzdFt2XSkgPj0wICkge1xuICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdHJ1ZSBcbiAgICB9XG4gIH1cbiAgXG4gIGFkZENsYXNzSWZNaXNzaW5nKGVsLCBjbikge1xuICAgIGlmKCFlbC5jbGFzc0xpc3QuY29udGFpbnMoY24pKSB7XG4gICAgICBlbC5jbGFzc0xpc3QuYWRkKGNuKTtcbiAgICB9IFxuICB9XG4gIFxuICBkZWxDbGFzc0lmUHJlc2VudChlbCwgY24pIHtcbiAgICBpZihlbC5jbGFzc0xpc3QuY29udGFpbnMoY24pKSB7XG4gICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKGNuKVxuICAgIH0gXG4gIH1cbn1cblxud2luZG93WydIdWdvVGFnc0ZpbHRlciddID0gSHVnb1RhZ3NGaWx0ZXI7XG4iXX0=
