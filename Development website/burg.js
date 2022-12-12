// Бургер
$(document).ready(function () {
	$('.burger__cross').click(function (event) {
		$('.burger__cross,.burger__menu').toggleClass('active');
		$('body').toggleClass('lock');
	});
});
// Валидация формы
var formElement = document.forms.call;
formElement.onsubmit = validateCallForm;

function validateCallForm() {

	var usernameElement = formElement.elements.username;

	var usernameValue = usernameElement.value;

	if (usernameValue.length > 13) {
		alert('Пожалуйста, введите Имя не длиннее 13-ти символов!');
		usernameElement.focus();
		return false;
	}
	var surnameElement = formElement.elements.surname;

	var surnameValue = surnameElement.value;

	if (surnameValue.length > 16) {
		alert('Пожалуйста, введите Фамилию не длиннее 16-ти символов!');
		surnameElement.focus();
		return false;
	}
	return true;
}