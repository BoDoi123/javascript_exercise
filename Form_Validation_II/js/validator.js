function Validator(formSelector, options) {
	var formRules = {};

	// Gán giá trị mặc định cho tham số (ES5)
	if (!options) {
		options = {};
	}

	function getParent(element, selector) {
		while (element.parentElement) {
			if (element.parentElement.matches(selector)) {
				return element.parentElement;
			}

			element = element.parentElement;
		}
	}

	/**
	 * Quy ước tạo rule:
	 * - Nếu có lỗi thì return 'error message'
	 * - Nếu không có lỗi thì return 'undefined'
	 */
	var validatorRules = {
		required: function (value) {
			return value ? undefined : "Vui lòng nhập trường này";
		},

		email: function (value) {
			var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
			return regex.test(value) ? undefined : "Vui lòng nhập email";
		},

		min: function (min) {
			return function (value) {
				return value.length >= min
					? undefined
					: `Vui lòng nhập ít nhất ${min} ký tự`;
			};
		},
		max: function (max) {
			return function (value) {
				return value.length <= min
					? undefined
					: `Vui lòng nhập tối đa ${max} ký tự`;
			};
		},
	};

	// Lấy ra form element trong DOM theo 'formSelector
	var formElement = document.querySelector(formSelector);

	// Chỉ xử lý khi có element trong DOM
	if (formElement) {
		var inputs = formElement.querySelectorAll("[name][rules]");

		for (var input of inputs) {
			var rules = input.getAttribute("rules").split("|");

			for (var rule of rules) {
				var ruleFunc = validatorRules[rule];

				if (rule.includes(":")) {
					var ruleInfo = rule.split(":");

					rule = ruleInfo[0];

					ruleFunc = validatorRules[rule](ruleInfo[1]);
				}

				if (Array.isArray(formRules[input.name])) {
					formRules[input.name].push(ruleFunc);
				} else {
					formRules[input.name] = [ruleFunc];
				}
			}

			// Lắng nghe sự kiện để validate (blue, change, ...)
			input.addEventListener("blur", handleValidate);
			input.addEventListener("input", handleClearError);
		}

		// Hàm thực hiện validate
		function handleValidate(event) {
			var rules = formRules[event.target.name];
			var errorMessage;

			for (var rule of rules) {
				errorMessage = rule(event.target.value);

				if (errorMessage) {
					break;
				}
			}

			// Nếu có lỗi thì hiển thị message lỗi ra UI
			if (errorMessage) {
				var formGroup = getParent(event.target, ".form-group");

				if (formGroup) {
					formGroup.classList.add("invalid");
					var formMessage = formGroup.querySelector(".form-message");

					if (formMessage) {
						formMessage.innerText = errorMessage;
					}
				}
			}

			return !errorMessage;
		}

		// Hàm clear message lỗi
		function handleClearError(event) {
			var formGroup = getParent(event.target, ".form-group");

			if (formGroup.classList.contains("invalid")) {
				formGroup.classList.remove("invalid");

				var formMessage = formGroup.querySelector(".form-message");

				if (formMessage) {
					formMessage.innerText = "";
				}
			}
		}
	}

	// Xử lý hành vi submit form
	formElement.addEventListener("submit", (e) => {
		e.preventDefault();

		var inputs = formElement.querySelectorAll("[name][rules]");
		var isValid = true;

		for (var input of inputs) {
			if (!handleValidate({ target: input })) {
				isValid = false;
			}
		}

		// Khi không có lỗi thì submit form
		if (isValid) {
			if (typeof options.onSubmit === "function") {
				return options.onSubmit();
			}

			formElement.submit();
		}
	});
}
