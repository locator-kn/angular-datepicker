# angular-datepicker

The angular-datepicker is an angular directive using jQuery code from here http://jsfiddle.net/kVsbq/4/. With this directive you are able to make both of your date selections within one caldendar.

# requirements

* angular v1.2+

* jqueryUI v1.11+ 

# setup

*  download source or 

*  install via bower

```

bower install angular-daterange-picker --save

```

# usage



## 1. Add scripts
Inlcude scripts into your index.js, e.g.

```

<script src="lib/components/angular/angular.min.js"></script>

<script src="lib/components/jquery-ui/jquery-ui.js"></script>

<script src="lib/components/angular-daterange-picker/js/directive.js"></script>

```

## 2. Add dependency


Add dependency in your angular module:

```

angular.module('myModule', ['locator.datepicker'])

```

## 3. Add directive


Add datepicker directive in your view:

```
 
<datepicker start-date-real="startDateReal" end-date-real="endDateReal"></datepicker>

```

"startDateReal" and "endDateReal" will be set by choosing them in the calendar (ISO date values). 

## 4. Use values in controller


```

var startDate = $scope.startDateReal;

var endDate = $scope.endDateReal;

```