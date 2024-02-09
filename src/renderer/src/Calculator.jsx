import { useState } from "react";
import "./Calculator.css";

const Calculator = () => {
  const [expression, setExpression] = useState("");
  const [result, setResult] = useState("");
  const [lastClickedOperator, setLastClickedOperator] = useState(false);
  const [decimalAdded, setDecimalAdded] = useState(false);

  const handleNumberClick = (value) => {
    if (result !== "") {
      setExpression(value);
      setResult("");
      setLastClickedOperator(false);
    } else {
      if (expression === "0" && value === "0") return;
      setExpression((prevExpression) =>
        prevExpression === "0" ? value : prevExpression + value
      );
      setLastClickedOperator(false);
    }
  };

  const handleOperatorClick = (value) => {
    if (result !== "") {
      setExpression((prevExpression) => prevExpression + value);
      setResult("");
      setLastClickedOperator(true);
      setDecimalAdded(false);
      return;
    }

    if (value === "+") {
      if (lastClickedOperator || expression === "-") {
        setExpression("");
      }
    }

    if (value === "+" || value === "*" || value === "/") {
      if (lastClickedOperator || expression === "") {
        return;
      }
    }

    if (expression === "" && value === "-") {
      setExpression("-");
      setResult("");
      setLastClickedOperator(true);
      return;
    }

    if (
      value === "-" &&
      (expression.slice(-1) === "*" ||
        expression.slice(-1) === "/" ||
        expression.slice(-1) === "+")
    ) {
      setExpression((prevExpression) => prevExpression + value);
      setLastClickedOperator(true);
      return;
    }

    if (value === "+" && expression.slice(-2) === "*-" && lastClickedOperator) {
      setExpression((prevExpression) => prevExpression.slice(0, -2) + value);
      setLastClickedOperator(true);
      return;
    }

    if (expression.slice(-1) === "-") {
      setExpression((prevExpression) => prevExpression.slice(0, -1) + value);
      setLastClickedOperator(true);
      return;
    }


    setExpression((prevExpression) => prevExpression + value);
    setLastClickedOperator(true);
    setDecimalAdded(false);
  };

  const handleDecimalClick = () => {
    if (result !== "") {
      setExpression("0.");
      setResult("");
      setLastClickedOperator(false);
      setDecimalAdded(true);
    } else {
      if (lastClickedOperator) {
        setExpression((prevExpression) => prevExpression + "0.");
        setLastClickedOperator(false);
        setDecimalAdded(true);
      } else {
        if (!decimalAdded) {
          setExpression((prevExpression) => prevExpression + ".");
          setDecimalAdded(true);
        }
        setLastClickedOperator(false);
      }
    }
  };

  const handleClearClick = () => {
    setExpression("");
    setResult("");
    setLastClickedOperator(false);
    setDecimalAdded(false);
  };

  const handleEqualsClick = () => {
    try {
      let calculatedResult = eval(expression);
      if (calculatedResult % 1 === 0) {
        setResult(calculatedResult.toString());
      } else {
        setResult(calculatedResult.toFixed(4));
      }
      setLastClickedOperator(true);
    } catch (error) {
      setResult("Error");
    }
  };

  return (
    <div className="calculator">
      <div className="screen">
        <div className="input">{expression}</div>
        <div id="display">{parseFloat(result) || 0}</div>
      </div>
      <div className="buttons">
        <button id="clear" onClick={handleClearClick}>
          AC
        </button>
        <button
          className="operator"
          id="divide"
          onClick={() => handleOperatorClick("/")}
        >
          /
        </button>
        <button
          className="operator"
          id="multiply"
          onClick={() => handleOperatorClick("*")}
        >
          x
        </button>
        {[7, 8, 9].map((num) => (
          <button
            key={num}
            className="number"
            onClick={() => handleNumberClick(String(num))}
          >
            {num}
          </button>
        ))}
        <button
          className="operator"
          id="subtract"
          onClick={() => handleOperatorClick("-")}
        >
          -
        </button>
        {[4, 5, 6].map((num) => (
          <button
            key={num}
            className="number"
            onClick={() => handleNumberClick(String(num))}
          >
            {num}
          </button>
        ))}
        <button
          className="operator"
          id="add"
          onClick={() => handleOperatorClick("+")}
        >
          +
        </button>
        {[1, 2, 3].map((num) => (
          <button
            key={num}
            className="number"
            onClick={() => handleNumberClick(String(num))}
          >
            {num}
          </button>
        ))}
        <button className="operator" id="equals" onClick={handleEqualsClick}>
          =
        </button>
        <button
          className="number"
          id="zero"
          onClick={() => handleNumberClick("0")}
        >
          0
        </button>
        <button className="number" id="decimal" onClick={handleDecimalClick}>
          .
        </button>
      </div>
    </div>
  );
};

export default Calculator;
