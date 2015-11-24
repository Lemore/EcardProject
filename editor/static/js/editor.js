$(function () {
    "use strict";

    function accessScope(node, func) {
        var scope = angular.element(document.querySelector(node)).scope();
        scope.$apply(func);
    }

    $(".thumbnail").click(function () {
        var base = 'http://rosetta.nli.org.il/delivery/DeliveryManagerServlet?dps_func=stream&dps_pid=';
        var url = base + $(this).data('text');
        console.log(url);
        accessScope('#body', function (scope) {
            var img = scope.config.svg.elements[1];
            img.src = url;
        });
    });

});

