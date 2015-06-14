"use strict";

angular.module('locator.datepicker', []).directive('datepicker', function() {
    var template = ['<div class="datepicker"></div>'];

    return {
        scope: {
            startDateReal: '=',
            endDateReal: '='
        },

        controller: function($scope) {
            var _startDate = '';
            var _endDate = '';
            $scope.show = function() {
                $scope.dateFormat = 'yy-mm-dd';
                $scope.picker = angular.element(".datepicker");

                $scope.picker.datepicker({
                    dateFormat: $scope.dateFormat,
                    minDate: 0,

                    beforeShowDay: function(date) {
                        var startDate = $.datepicker.parseDate($scope.dateFormat, _startDate);
                        var endDate = $.datepicker.parseDate($scope.dateFormat, _endDate);
                        if (startDate != null && endDate != null) {
                            if (startDate > endDate) {
                                startDate = [endDate, endDate = startDate][0];
                            }
                        }
                        return [true, startDate && ((date.getTime() == startDate.getTime()) || (endDate && date >= startDate && date <= endDate)) ? "dp-highlight" : ""];

                    },
                    onSelect: function(dateText, inst) {
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
                        setTimeout(function() {
                            $('.dp-highlight').first().addClass('round-left');
                            $('.dp-highlight').last().addClass('round-right');
                        }, 0);

                    },
                    onChangeMonthYear: function(year, month, inst) {
                        setTimeout(function() {
                            $('.dp-highlight').first().addClass('round-left');
                            $('.dp-highlight').last().addClass('round-right');
                        }, 0);
                    }
                });
            }
            $scope.show();
        },
        template: template.join('')
    }
});
