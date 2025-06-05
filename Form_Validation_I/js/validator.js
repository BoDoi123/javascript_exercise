function Validator(options) {
	function getParent(element, selector) {
		while (element.parentElement) {
			if (element.parentElement.matches(selector)) {
				return element.parentElement;
			}

			element = element.parentElement;
		}
	}

	let selectorRules = {};

	// Hàm thực hiện validate
	function validate(inputElement, rule) {
		// Lấy ra các rules của selector
		var rules = selectorRules[rule.selector];

		var errorMessage;
		var errorElement = getParent(
			inputElement,
			options.formGroupSelector
		).querySelector(options.errorSelector);

		// Lặp qua từng rule và kiểm tra
		// Nếu có lỗi thì dừng việc kiểm tra
		for (let i = 0; i < rules.length; i++) {
			switch (inputElement.type) {
				case "checkbox":
				case "radio":
					errorMessage = rules[i](
						formElement.querySelector(rule.selector + ":checked")
					);
					break;

				default:
					errorMessage = rules[i](inputElement.value);
			}
			if (errorMessage) {
				break;
			}
		}

		if (errorMessage) {
			errorElement.innerText = errorMessage;
			getParent(inputElement, options.formGroupSelector).classList.add(
				"invalid"
			);
		} else {
			errorElement.innerText = "";
			getParent(inputElement, options.formGroupSelector).classList.remove(
				"invalid"
			);
		}

		return !errorMessage;
	}

	// Lấy Element của Form
	const formElement = document.querySelector(options.form);

	if (formElement) {
		formElement.addEventListener("submit", (e) => {
			e.preventDefault();

			var isFormValid = true;

			// Thực hiện lặp qua từng rules avf validate
			options.rules.forEach((rule) => {
				const inputElement = formElement.querySelector(rule.selector);

				var isValid = validate(inputElement, rule);

				if (!isValid) {
					isFormValid = false;
				}
			});

			if (isFormValid) {
				if (typeof options.onSubmit === "function") {
					var enableInputs = formElement.querySelectorAll(
						"[name]:not([disabled]"
					);

					var formValues = Array.from(enableInputs).reduce(
						(values, input) => {
							switch (input.type) {
								case "radio":
									values[input.name] =
										formElement.querySelector(
											`input[name="${input.name}"]:checked`
										).value;

									break;
								case "checkbox":
									if (!input.matches(":checked")) {
										values[input.name] = "";
										return values;
									}
									if (!Array.isArray(values[input.name])) {
										values[input.name] = [];
									}

									values[input.name].push(input.value);

									break;

								case "file":
									values[input.name] = input.files;
									break;

								default:
									values[input.name] = input.value;
							}

							return values;
						},
						{}
					);

					options.onSubmit(formValues);
				}
			}
		});

		// Lặp qua mỗi rule và xử lý (lắng nghe sự kiện blur, input, ...)
		options.rules.forEach((rule) => {
			const inputElements = formElement.querySelectorAll(rule.selector);

			Array.from(inputElements).forEach((inputElement) => {
				if (inputElement) {
					// Xử lý trường hợp blur khỏi input
					inputElement.addEventListener("blur", () => {
						validate(inputElement, rule);
					});

					// Xử lý mỗi khi người dùng nhập vào input
					inputElement.addEventListener("input", () => {
						var errorElement = getParent(
							inputElement,
							options.formGroupSelector
						).querySelector(options.errorSelector);
						errorElement.innerText = "";
						getParent(
							inputElement,
							options.formGroupSelector
						).classList.remove("invalid");
					});
				}
			});

			// Lưu lại các rules cho mỗi input
			if (Array.isArray(selectorRules[rule.selector])) {
				selectorRules[rule.selector].push(rule.test);
			} else {
				selectorRules[rule.selector] = [rule.test];
			}
		});
	}
}

// Nguyên tắc của các rules:
// 1. Khi có lỗi => Trả ra message lỗi
// 2. Khi hợp lệ => Không trả về gì cả
Validator.isRequired = function (selector, message) {
	return {
		selector,
		test: function (value) {
			return value ? undefined : message || "Vui lòng nhập trường này";
		},
	};
};

Validator.isEmail = function (selector, message) {
	return {
		selector,
		test: function (value) {
			var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

			return regex.test(value) ? undefined : "Trường này phải là email";
		},
	};
};

Validator.minLength = function (selector, min, message) {
	return {
		selector,
		test: function (value) {
			return value.length >= min
				? undefined
				: message || `Vui lòng nhập tối thiểu ${min} ký tự`;
		},
	};
};

Validator.isConfirmed = function (selector, getConfirmValue, message) {
	return {
		selector,
		test: function (value) {
			return value === getConfirmValue()
				? undefined
				: message || "Giá trị nhập vào không chính xác";
		},
	};
};
