// import simpleSmoothScroll from "./simpleSmoothScroll";
import mouseChaser from "./mouseChaser";

function init(){
  new mouseChaser({
    deceleration : 0.2
  });
}
window.addEventListener('load', init);


