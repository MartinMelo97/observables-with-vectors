import { fromEvent, combineLatest } from "rxjs";
import { scan, map, tap } from "rxjs/operators";

const printValues = (letter: string, data: number[]) => {
  console.log(data);
  const element = document.querySelector(`#p${letter}`);
  element.innerHTML = "";
  const initialBracketItem = document.createTextNode(`Vector ${letter} [`);
  element.append(initialBracketItem);
  data.forEach((value, index) => {
    const span = document.createElement("span");
    const domItem = document.createTextNode(
      String(value) + (index + 1 !== data.length ? ", " : "")
    );
    span.appendChild(domItem);
    element.appendChild(span);
  });
  const closeBracketItem = document.createTextNode("]");
  element.append(closeBracketItem);
};

const vectorA$ = fromEvent(document.querySelector("#btnA"), "click").pipe(
  tap(() => console.log("Pipe Vector A Start")),
  scan(a => {
    return [...a, a.length];
  }, []),
  map(r => r.map(number => number + 1))
);

const vectorB$ = fromEvent(document.querySelector("#btnB"), "click").pipe(
  tap(() => console.log("Pipe Vector B Start")),
  scan(a => {
    return [...a, a.length];
  }, []),
  map(r => r.map(number => number * number))
);

const combinedVector$ = combineLatest([vectorA$, vectorB$]).pipe(
  tap(([vectorA, vectorB]) => console.log({ vectorA, vectorB })),
  map(([vectorA, vectorB]: Array<number[]>) => [...vectorA, ...vectorB])
);

vectorA$.subscribe((data: number[]) => printValues("A", data));

vectorB$.subscribe((data: number[]) => printValues("B", data));

combinedVector$.subscribe((data: number[]) => printValues("Combined", data));
