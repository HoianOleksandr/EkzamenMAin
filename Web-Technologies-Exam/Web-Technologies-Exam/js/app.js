/* Exam calculator logic */

(function () {
  function getOperand(id) {
    var value = document.getElementById(id).value;
    return parseFloat(value);
  }

  function setResult(text) {
    var res = document.getElementById("res");
    res.textContent = "Result: " + text;
  }

  function isNumber(n) {
    return typeof n === "number" && !isNaN(n);
  }

  function degreesToRadians(deg) {
    return (deg * Math.PI) / 180;
  }

  function calculateAndShow(operation) {
    var op1 = getOperand("op1");
    var op2 = getOperand("op2");

    if (!isNumber(op1) || (!isNumber(op2) && operation !== "log" && operation !== "sin" && operation !== "tan")) {
      setResult("invalid input");
      return;
    }

    var result;

    switch (operation) {
      case "add":
        result = op1 + op2;
        break;
      case "sub":
        result = op1 - op2;
        break;
      case "mul":
        result = op1 * op2;
        break;
      case "div":
        if (op2 === 0) {
          setResult("operand 2 is equal to 0");
          return;
        }
        result = op1 / op2;
        break;
      case "log":
        if (!isNumber(op1) || op1 <= 0) {
          setResult("operand 1 is less or equal to 0");
          return;
        }
        result = Math.log(op1);
        break;
      case "sin":
        if (!isNumber(op1)) {
          setResult("invalid input");
          return;
        }
        result = Math.sin(degreesToRadians(op1));
        break;
      case "tan":
        if (!isNumber(op1)) {
          setResult("invalid input");
          return;
        }
        result = Math.tan(degreesToRadians(op1));
        break;
      default:
        return;
    }

    setResult(result);
  }

  function loadInfo(type) {
    var url = "";
    if (type === "log") {
      url = "data/log.json";
    } else if (type === "sin") {
      url = "data/sin.json";
    } else if (type === "tan") {
      url = "data/tan.json";
    } else {
      return;
    }

    $ajaxUtils.sendGetRequest(url, function (response) {
      var container = document.getElementById("content");
      var html = "";

      html += "<h3>" + response.name + "</h3>";
      html += '<img src="images/' + response.image_name + '" alt="' + response.name + '">';
      html += "<p>" + response.description + "</p>";

      container.innerHTML = html;
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("add-button").addEventListener("click", function () {
      calculateAndShow("add");
    });
    document.getElementById("sub-button").addEventListener("click", function () {
      calculateAndShow("sub");
    });
    document.getElementById("mul-button").addEventListener("click", function () {
      calculateAndShow("mul");
    });
    document.getElementById("div-button").addEventListener("click", function () {
      calculateAndShow("div");
    });
    document.getElementById("log-button").addEventListener("click", function () {
      calculateAndShow("log");
      loadInfo("log");
    });
    document.getElementById("sin-button").addEventListener("click", function () {
      calculateAndShow("sin");
      loadInfo("sin");
    });
    document.getElementById("tan-button").addEventListener("click", function () {
      calculateAndShow("tan");
      loadInfo("tan");
    });
  });
})();