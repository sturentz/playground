import React, { useRef, useEffect } from "react";

import cursorAnimTrailStyle from "../css/cursorAnimTrail.module.css";
// import windowDimensions from "hooks/useWindowDimensions";

function CursorAnimTrail(props) {

  let canvasCursor = useRef(null);
  var particles = [];
  var mousePos = {
    x: window.innerWidth,
    y: window.innerHeight*-100,
  };

  function offset(el) {
    var rect = el.getBoundingClientRect(),
      scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
      scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return {
      top: rect.top + scrollTop,
      left: rect.left + scrollLeft,
      scrollTop: scrollTop,
      bottom: rect.bottom,
    };
  }

  function follow(e) {
    let canvasOffset = offset(canvas);

    mousePos.x = e.pageX;
    mousePos.y = e.pageY - canvasOffset.top;

    if (readyToDraw) {

      draw();
    }
  }

  let defaultparticles={howmany:2000, speed:.002, fps:30, color:"0,255,0", particlesize:3, particlespread:450, explosionradius:800}
  let bigandclose={howmany:2000, speed:.002, fps:30, color:"0,255,0", particlesize:10, particlespread:40, explosionradius:800}
  let firefly={howmany:2000, speed:.002, fps:30, color:"0,255,0", particlesize:3, particlespread:450, explosionradius:800}

  let settings =eval(props.particleType);


  let oldX = mousePos.x;

  let readyToDraw = false;

  function resizecanvas(){

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (particles.length < 1) {
      for (let i = 0; i < settings.howmany; i++) {
        let p = new Particle();
        particles.push(p);
      }
    }

    for (let i = particles.length - 1; i >= 0; i--) {
      particles[i].update();
      particles[i].draw();
    }

    //requestAnimationFrame(draw);
  }

  class Particle{
    constructor() {
      this.reset();
    }
    reset() {

      this.radius = settings.particlesize;
      this.x =
        mousePos.x +
        Math.floor(Math.random() * settings.particlespread) -
        settings.particlespread / 2;
        this.y =
        mousePos.y +
        Math.floor(Math.random() * settings.particlespread) -
        settings.particlespread / 2;

      this.angle = random(0, Math.PI * 2);
      this.velocity = {
        x: Math.sin(this.angle) * settings.explosionradius,
        y: Math.cos(this.angle) * settings.explosionradius,
      };
      this.alpha = Math.random();
    }

    draw() {
      ctx.beginPath();
      ctx.arc(
        this.x,
        this.y,
        this.radius * Math.abs(this.alpha),
        0,
        2 * Math.PI,
        false
      );
      let g = 0;//Math.random()*200;//random(0, 200);
      ctx.fillStyle = "rgba("+settings.color+", " + this.alpha + ")";
      ctx.fill();
    }

    update() {
      this.x += this.velocity.x * settings.speed;
      this.y += this.velocity.y * settings.speed;

      this.alpha -= 0.005;
      if (this.alpha < 0) {
        if (mousePos.x !== oldX) {
          oldX = mousePos.x;
          this.reset();
        }
      }
    }
  }

  function godraw() {
    requestAnimationFrame(draw);
  }

  function random(min, max) {
    return Math.random() * (max - min + 1) + min;
  }
  let canvas; // = document.getElementById('canvasCursor');
  let ctx; //= canvas.getContext('2d');

  let fpsAnimation;
  let canvas_width=window.innerWidth;
  let canvas_height=window.innerHeight;

  //  gifCursor.style.left = x + "px";

  useEffect(() => {
     console.log(props.particleType);
     settings =eval(props.particleType);

  },[props.particleType]);
  useEffect(() => {
    if (canvasCursor) {
      canvas = document.getElementById("canvasCursor");
      ctx = canvas.getContext("2d");
      canvas.width = canvas_width;
      canvas.height = canvas_height;
      readyToDraw = true;
      let divHolder = document.getElementById("holder_cnavasCursor");
      let divOffset = offset(divHolder);

      divHolder.style.top = "-" + divOffset.top + "px";
      let newHeight = divOffset.top + divOffset.bottom;
      divHolder.style.height = newHeight + "px";

      fpsAnimation = setInterval(godraw, 1000 / settings.fps);
    }
  }, []);
  useEffect(() => {
    window.addEventListener("mousemove", follow, false);
    window.addEventListener("resize", resizecanvas);



  }, [canvasCursor]);
  return (
    <div className={cursorAnimTrailStyle.outside} id="holder_cnavasCursor">
      <canvas
        ref={(el) => (canvasCursor = el)}
        className={cursorAnimTrailStyle.canvasCursor}
        id="canvasCursor"
      />
    </div>
  );
}

export default CursorAnimTrail;
