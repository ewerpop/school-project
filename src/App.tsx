import { useState } from "react";
import "./App.css";
import NumberOutput from "./components/NumberOutput";

function App() {
  const [countEvklid, setCountEvlkid] = useState<number[]>([]);
  const [countPerebor, setCountPerebor] = useState<number[]>([]);
  const [countParaller, setCountParaller] = useState<number[]>([]);

  function countParallerHandler(limit: number) {
    const workerScript = `
    self.onmessage = function(e) {
        let limit = e.data;
        let perfectNumbers = [];
        for (let i = 2; i <= limit; i++) {
            if (isPerfectNumberOptimized(i)) {
                perfectNumbers.push(i);
            }
        }
        self.postMessage(perfectNumbers);
    };

    function isPerfectNumberOptimized(num) {
        if (num < 2) return false;
        let sum = 1;
        for (let i = 2; i <= Math.sqrt(num); i++) {
            if (num % i === 0) {
                if (i === num / i) {
                    sum += i;
                } else {
                    sum += i + num / i;
                }
            }
        }
        return sum === num;
    }
`;
    const blob = new Blob([workerScript], { type: "application/javascript" });
    const worker = new Worker(URL.createObjectURL(blob));
    worker.onmessage = function (e) {
      setCountParaller(e.data); // Результаты вычислений
    };
    worker.postMessage(limit);
  }
  function countPereborHandler(limit: number) {
    setCountPerebor([]);
    function isPerfectNumber(num: number) {
      let sum = 0;
      for (let i = 1; i <= num / 2; i++) {
        if (num % i === 0) {
          sum += i;
        }
      }
      return sum === num;
    }

    function findPerfectNumbers(limit: number) {
      for (let i = 1; i <= limit; i++) {
        if (isPerfectNumber(i)) {
          setCountPerebor((value) => value.concat([i]));
        }
      }
    }
    findPerfectNumbers(limit);
  }

  function countEvklidHandler(limit: number) {
    setCountEvlkid([]);
    function isPrime(num: number) {
      if (num <= 1) return false;
      if (num <= 3) return true;
      if (num % 2 === 0 || num % 3 === 0) return false;
      for (let i = 5; i * i <= num; i += 6) {
        if (num % i === 0 || num % (i + 2) === 0) return false;
      }
      return true;
    }

    function findPerfectNumbersEuclid(limit: number) {
      let p = 2;
      while (true) {
        const mersennePrime = Math.pow(2, p) - 1;
        if (isPrime(mersennePrime)) {
          const perfectNumber = Math.pow(2, p - 1) * mersennePrime;
          if (perfectNumber <= limit) {
            setCountEvlkid((value) => value.concat([perfectNumber]));
          } else {
            break;
          }
        }
        p++;
      }
    }
    findPerfectNumbersEuclid(limit);
  }
  return (
    <>
      <ul className="container">
        <NumberOutput
          onClick={countEvklidHandler}
          method="Метод Евклида"
          count={countEvklid}
        />
        <NumberOutput
          onClick={countPereborHandler}
          method="Метод перебора"
          count={countPerebor}
        />
        <NumberOutput
          onClick={countParallerHandler}
          method="Параллельные вычисления"
          count={countParaller}
        />
      </ul>
    </>
  );
}

export default App;
