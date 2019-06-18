(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["form"],{

/***/ "./assets/js/form.js":
/*!***************************!*\
  !*** ./assets/js/form.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");

function initSubmit() {
  $('#submit').prop('disabled', false);
  $("#submit").html('<i class="fas fa-paper-plane"></i> Verzend');
} // Disabling form submissions if there are invalid fields


(function () {
  'use strict';

  window.addEventListener('load', function () {
    // Append to form
    $(".needs-validation").append('<div class="form-group row pt-3"><div class="col-sm-10"><button type="submit" class="btn btn-secondary" id="submit" value="Send"></button><small id="submitHelp" class="form-text text-muted d-none">Gelieve de pagina <strong>niet</strong> te herladen tijdens het verzenden.</small></div></div>'); // Set submit button

    initSubmit(); // Replace label by href 

    $("label[for$='_form_terms']").html("Ik heb het <a href=\"/privacy\">privacybeleid</a> gelezen en ga hiermee akkoord."); // Bootstrap custom-select fix (attribute ends with)

    $('select').addClass('custom-select'); // Fetch all the forms we want to apply custom Bootstrap validation styles to

    var forms = document.getElementsByClassName('needs-validation'); // Loop over them and prevent submission

    var validation = Array.prototype.filter.call(forms, function (form) {
      form.addEventListener('submit', function (event) {
        $('#submit').prop('disabled', 'disabled');
        $('#submit').html('<i class="fas fa-sync-alt"></i> Verwerken');
        $('#submitHelp').removeClass("d-none");

        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
          initSubmit();
        }

        form.classList.add('was-validated');
      }, false);
    });
  }, false);
})();

/***/ })

},[["./assets/js/form.js","runtime","vendors~calendar~carousel~form~kinderkoor"]]]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvZm9ybS5qcyJdLCJuYW1lcyI6WyIkIiwicmVxdWlyZSIsImluaXRTdWJtaXQiLCJwcm9wIiwiaHRtbCIsIndpbmRvdyIsImFkZEV2ZW50TGlzdGVuZXIiLCJhcHBlbmQiLCJhZGRDbGFzcyIsImZvcm1zIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50c0J5Q2xhc3NOYW1lIiwidmFsaWRhdGlvbiIsIkFycmF5IiwicHJvdG90eXBlIiwiZmlsdGVyIiwiY2FsbCIsImZvcm0iLCJldmVudCIsInJlbW92ZUNsYXNzIiwiY2hlY2tWYWxpZGl0eSIsInByZXZlbnREZWZhdWx0Iiwic3RvcFByb3BhZ2F0aW9uIiwiY2xhc3NMaXN0IiwiYWRkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxJQUFNQSxDQUFDLEdBQUdDLG1CQUFPLENBQUMsb0RBQUQsQ0FBakI7O0FBRUEsU0FBU0MsVUFBVCxHQUFzQjtBQUNuQkYsR0FBQyxDQUFDLFNBQUQsQ0FBRCxDQUFhRyxJQUFiLENBQWtCLFVBQWxCLEVBQThCLEtBQTlCO0FBQ0FILEdBQUMsQ0FBQyxTQUFELENBQUQsQ0FBYUksSUFBYixDQUFrQiw0Q0FBbEI7QUFDRixDLENBRUQ7OztBQUNBLENBQUMsWUFBVztBQUNWOztBQUNBQyxRQUFNLENBQUNDLGdCQUFQLENBQXdCLE1BQXhCLEVBQWdDLFlBQVc7QUFDekM7QUFDQU4sS0FBQyxDQUFDLG1CQUFELENBQUQsQ0FBdUJPLE1BQXZCLENBQThCLHFTQUE5QixFQUZ5QyxDQUd6Qzs7QUFDQUwsY0FBVSxHQUorQixDQUt6Qzs7QUFDQUYsS0FBQyxDQUFDLDJCQUFELENBQUQsQ0FBK0JJLElBQS9CLENBQW9DLGtGQUFwQyxFQU55QyxDQU96Qzs7QUFDQUosS0FBQyxDQUFDLFFBQUQsQ0FBRCxDQUFZUSxRQUFaLENBQXFCLGVBQXJCLEVBUnlDLENBU3pDOztBQUNBLFFBQUlDLEtBQUssR0FBR0MsUUFBUSxDQUFDQyxzQkFBVCxDQUFnQyxrQkFBaEMsQ0FBWixDQVZ5QyxDQVd6Qzs7QUFDQSxRQUFJQyxVQUFVLEdBQUdDLEtBQUssQ0FBQ0MsU0FBTixDQUFnQkMsTUFBaEIsQ0FBdUJDLElBQXZCLENBQTRCUCxLQUE1QixFQUFtQyxVQUFTUSxJQUFULEVBQWU7QUFDakVBLFVBQUksQ0FBQ1gsZ0JBQUwsQ0FBc0IsUUFBdEIsRUFBZ0MsVUFBU1ksS0FBVCxFQUFnQjtBQUM5Q2xCLFNBQUMsQ0FBQyxTQUFELENBQUQsQ0FBYUcsSUFBYixDQUFrQixVQUFsQixFQUE4QixVQUE5QjtBQUNBSCxTQUFDLENBQUMsU0FBRCxDQUFELENBQWFJLElBQWIsQ0FBa0IsMkNBQWxCO0FBQ0FKLFNBQUMsQ0FBQyxhQUFELENBQUQsQ0FBaUJtQixXQUFqQixDQUE4QixRQUE5Qjs7QUFDQSxZQUFJRixJQUFJLENBQUNHLGFBQUwsT0FBeUIsS0FBN0IsRUFBb0M7QUFDbENGLGVBQUssQ0FBQ0csY0FBTjtBQUNBSCxlQUFLLENBQUNJLGVBQU47QUFDQXBCLG9CQUFVO0FBQ1g7O0FBQ0RlLFlBQUksQ0FBQ00sU0FBTCxDQUFlQyxHQUFmLENBQW1CLGVBQW5CO0FBQ0QsT0FWRCxFQVVHLEtBVkg7QUFXRCxLQVpnQixDQUFqQjtBQWFELEdBekJELEVBeUJHLEtBekJIO0FBMEJELENBNUJELEkiLCJmaWxlIjoiZm9ybS5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0ICQgPSByZXF1aXJlKCdqcXVlcnknKTtcblxuZnVuY3Rpb24gaW5pdFN1Ym1pdCgpIHtcbiAgICQoJyNzdWJtaXQnKS5wcm9wKCdkaXNhYmxlZCcsIGZhbHNlKTtcbiAgICQoXCIjc3VibWl0XCIpLmh0bWwoJzxpIGNsYXNzPVwiZmFzIGZhLXBhcGVyLXBsYW5lXCI+PC9pPiBWZXJ6ZW5kJyk7XG59XG5cbi8vIERpc2FibGluZyBmb3JtIHN1Ym1pc3Npb25zIGlmIHRoZXJlIGFyZSBpbnZhbGlkIGZpZWxkc1xuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgZnVuY3Rpb24oKSB7XG4gICAgLy8gQXBwZW5kIHRvIGZvcm1cbiAgICAkKFwiLm5lZWRzLXZhbGlkYXRpb25cIikuYXBwZW5kKCc8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cCByb3cgcHQtM1wiPjxkaXYgY2xhc3M9XCJjb2wtc20tMTBcIj48YnV0dG9uIHR5cGU9XCJzdWJtaXRcIiBjbGFzcz1cImJ0biBidG4tc2Vjb25kYXJ5XCIgaWQ9XCJzdWJtaXRcIiB2YWx1ZT1cIlNlbmRcIj48L2J1dHRvbj48c21hbGwgaWQ9XCJzdWJtaXRIZWxwXCIgY2xhc3M9XCJmb3JtLXRleHQgdGV4dC1tdXRlZCBkLW5vbmVcIj5HZWxpZXZlIGRlIHBhZ2luYSA8c3Ryb25nPm5pZXQ8L3N0cm9uZz4gdGUgaGVybGFkZW4gdGlqZGVucyBoZXQgdmVyemVuZGVuLjwvc21hbGw+PC9kaXY+PC9kaXY+Jyk7XG4gICAgLy8gU2V0IHN1Ym1pdCBidXR0b25cbiAgICBpbml0U3VibWl0KCk7XG4gICAgLy8gUmVwbGFjZSBsYWJlbCBieSBocmVmIFxuICAgICQoXCJsYWJlbFtmb3IkPSdfZm9ybV90ZXJtcyddXCIpLmh0bWwoXCJJayBoZWIgaGV0IDxhIGhyZWY9XFxcIi9wcml2YWN5XFxcIj5wcml2YWN5YmVsZWlkPC9hPiBnZWxlemVuIGVuIGdhIGhpZXJtZWUgYWtrb29yZC5cIik7XG4gICAgLy8gQm9vdHN0cmFwIGN1c3RvbS1zZWxlY3QgZml4IChhdHRyaWJ1dGUgZW5kcyB3aXRoKVxuICAgICQoJ3NlbGVjdCcpLmFkZENsYXNzKCdjdXN0b20tc2VsZWN0Jyk7XG4gICAgLy8gRmV0Y2ggYWxsIHRoZSBmb3JtcyB3ZSB3YW50IHRvIGFwcGx5IGN1c3RvbSBCb290c3RyYXAgdmFsaWRhdGlvbiBzdHlsZXMgdG9cbiAgICB2YXIgZm9ybXMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCduZWVkcy12YWxpZGF0aW9uJyk7XG4gICAgLy8gTG9vcCBvdmVyIHRoZW0gYW5kIHByZXZlbnQgc3VibWlzc2lvblxuICAgIHZhciB2YWxpZGF0aW9uID0gQXJyYXkucHJvdG90eXBlLmZpbHRlci5jYWxsKGZvcm1zLCBmdW5jdGlvbihmb3JtKSB7XG4gICAgICBmb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICQoJyNzdWJtaXQnKS5wcm9wKCdkaXNhYmxlZCcsICdkaXNhYmxlZCcpO1xuICAgICAgICAkKCcjc3VibWl0JykuaHRtbCgnPGkgY2xhc3M9XCJmYXMgZmEtc3luYy1hbHRcIj48L2k+IFZlcndlcmtlbicpO1xuICAgICAgICAkKCcjc3VibWl0SGVscCcpLnJlbW92ZUNsYXNzKCBcImQtbm9uZVwiICk7XG4gICAgICAgIGlmIChmb3JtLmNoZWNrVmFsaWRpdHkoKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgIGluaXRTdWJtaXQoKTtcbiAgICAgICAgfVxuICAgICAgICBmb3JtLmNsYXNzTGlzdC5hZGQoJ3dhcy12YWxpZGF0ZWQnKTtcbiAgICAgIH0sIGZhbHNlKTtcbiAgICB9KTtcbiAgfSwgZmFsc2UpO1xufSkoKTtcbiJdLCJzb3VyY2VSb290IjoiIn0=