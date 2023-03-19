export default class mouseChaser {
  constructor(option) {
    this.checkRequestAnimationFrame();

    this.option = {
      deceleration : 0.2
    };
    for(let prop in option){
      this.option[prop] = option[prop];
    }
    this.start();

    return this;
  }
  checkRequestAnimationFrame(){
    if ( !window.requestAnimationFrame ) {
      window.requestAnimationFrame = ( function() {
        return window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame ||
          window.oRequestAnimationFrame ||
          window.msRequestAnimationFrame ||
          window.requestAnimationFrame ||
          function( /* function FrameRequestCallback */ callback, /* DOMElement Element */ element ) {
            window.setTimeout( callback, 1000 / 60 );
          };
      } )();
      window.cancelAnimationFrame = ( function() {
        return window.webkitCancelAnimationFrame ||
          window.mozRequestAnimationFrame ||
          window.oCancelAnimationFrame ||
          window.msCancelAnimationFrame ||
          window.cancelAnimationFrame ||
          function( /* function FrameRequestCallback */ callback, /* DOMElement Element */ element ) {
            window.clearTimeout( callback );
          };
      } )();
    }
  }


  mp(e){ // マウスの座標取得
    let posX,posY;
    if(e.changedTouches){
      posX = e.changedTouches[0].clientX;
      posY = e.changedTouches[0].clientY;
    }else if(e.clientX){
      posX = e.clientX;
      posY = e.clientY;
    }else{
      posX = e.pageX;
      posY = e.pageY;
    }
    return {
      x: posX,
      y: posY
    }
  }

  start(){
    let self = this;
    if('ontouchstart' in window) return false;

    let $mc = document.querySelector('#mouseChaser');

    let pos = { x: -100, y: -100 };
    let arv = { x: 0, y: 0 };

    window.addEventListener('mousemove',(e)=>{
      arv = this.mp(e);
    },false);

    window.addEventListener('mouseover',(e)=>{
      let $target = e.target.closest('a');
      let tagName = ($target !== null) ? $target.tagName.toLowerCase() : null;

      if(tagName !== null) {
        $mc.classList.add('hover');
      }
    },false);

    window.addEventListener('mouseout',(e)=>{
      let $target = e.target.closest('a');
      let tagName = ($target !== null) ? $target.tagName.toLowerCase() : null;

      if(tagName !== null) {
        $mc.classList.remove('hover');
      }
    },false);

    function animate() {
      pos.x += (arv.x - pos.x) * self.option.deceleration;
      pos.y += (arv.y - pos.y) * self.option.deceleration;
      $mc.style.left = `${ pos.x }px`;
      $mc.style.top = `${ pos.y }px`;
      requestAnimationFrame(animate);
    }
    animate();
  }

}