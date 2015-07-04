"use strict";

// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
// borrowed from http://davidwalsh.name/javascript-debounce-function
function debounce(func, wait, immediate) {
    var timeout;
    return function() {
        var context = this, args = arguments;
        var later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

angular.module('locator.datepicker', []).directive('datepicker', function() {
    var template = ['<div class="datepicker"></div>'];

    return {
        scope: {
            startDateReal: '=',
            endDateReal: '=',
            onLinked: '='
        },

        controller: function($scope) {
            var _startDate = '';
            var _endDate = '';


            function _addBorderClasses() {
                var $el = $('.dp-highlight');
                $el.first().addClass('round-left');
                $el.last().addClass('round-right');
                $scope.$apply();
            }
            var addBorderClasses = debounce(_addBorderClasses, 50, true);
            $scope.show = function() {
                $scope.dateFormat = 'yy-mm-dd';
                $scope.picker = angular.element(".datepicker");

                $scope.picker.datepicker({
                    dateFormat: $scope.dateFormat,
                    minDate: 0,

                    beforeShowDay: function(date) {
                        var startDate;
                        var endDate;

                        if ($scope.onLinked) {
                            startDate = new Date($scope.startDateReal);
                            startDate.setHours(0);
                            endDate = new Date($scope.endDateReal);
                            endDate.setHours(0);
                        } else {
                            startDate = $.datepicker.parseDate($scope.dateFormat, _startDate);
                            endDate = $.datepicker.parseDate($scope.dateFormat, _endDate);
                        }

                        if (endDate == '' || endDate == null) {
                            $scope.endDateReal = '';
                        }

                        if (startDate != null && endDate != null) {
                            if (startDate > endDate) {
                                startDate = [endDate, endDate = startDate][0];
                            }
                        }
                        setTimeout(addBorderClasses, 0);
                        return [true, startDate && ((date.getTime() == startDate.getTime()) || (endDate && date >= startDate && date <= endDate)) ? "dp-highlight" : ""];

                    },
                    onSelect: function(dateText, inst) {
                        $scope.onLinked = false;
                        var startDate = $.datepicker.parseDate($scope.dateFormat, _startDate);
                        var endDate = $.datepicker.parseDate($scope.dateFormat, _endDate);

                        if (!startDate || endDate) {
                            _startDate = dateText;
                            _endDate = "";
                        } else {
                            _endDate = dateText;
                        }

                        var tempStartDate = new Date(_startDate);
                        var tempEndDate = new Date(_endDate);
                        if (tempStartDate > tempEndDate) {
                            _startDate = [_endDate, _endDate = _startDate][0];
                            tempStartDate = [tempEndDate, tempEndDate = tempStartDate][0];
                        }

                        if (_startDate != null && _startDate != '') {
                            $scope.startDateReal = new Date(tempStartDate.toISOString()).toISOString();
                        }

                        if (_endDate != null && _endDate != '') {
                            $scope.endDateReal = new Date(tempEndDate.toISOString()).toISOString();
                        }
                        setTimeout(addBorderClasses, 0);

                    },
                    onChangeMonthYear: function(year, month, inst) {
                        setTimeout(addBorderClasses, 0);
                    }
                });
            };
            $scope.show();
        },
        template: template.join('')
    }
});
