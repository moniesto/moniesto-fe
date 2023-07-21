import { useEffect } from "react";

export const StarCanvas = () => {
  useEffect(() => {
    const canvas = document.getElementById("stars") as HTMLCanvasElement;
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

    let screen: any, stars: Star[];
    let params = {
      speed: 2,
      number: window.innerWidth < 720 ? 80 : 120,
      extinction: 4,
    };

    window.onscroll = function () {
      params.speed = Math.max(window.scrollY / 12, 2);
    };

    // star constructor
    class Star {
      public x = Math.random() * canvas.width;
      public y = Math.random() * canvas.height;
      public z = Math.random() * canvas.width;

      move = () => {
        this.z -= params.speed;
        if (this.z <= 0) {
          this.z = canvas.width;
        }
      };

      show = () => {
        let x, y, rad, opacity;
        x = (this.x - screen.c[0]) * (canvas.width / this.z);
        x = x + screen.c[0];
        y = (this.y - screen.c[1]) * (canvas.width / this.z);
        y = y + screen.c[1];
        rad = canvas.width / this.z;
        opacity =
          rad > params.extinction ? 1.5 * (2 - rad / params.extinction) : 1;

        ctx.beginPath();
        ctx.fillStyle = "rgba(38, 40, 61, " + opacity + ")";
        ctx.arc(x, y, rad, 0, Math.PI * 2);
        ctx.fill();
      };
    }

    setupStars();
    updateStars();

    // update stars on resize to keep the thing centered
    window.onresize = function () {
      setupStars();
    };

    // setup <canvas>, create all the starts
    function setupStars() {
      screen = {
        w: window.innerWidth,
        h: window.innerHeight,
        c: [window.innerWidth * 0.5, window.innerHeight * 0.5],
      };
      (window as any).cancelAnimationFrame(updateStars);
      canvas.width = screen.w;
      canvas.height = screen.h;
      stars = [];
      for (let i = 0; i < params.number; i++) {
        stars[i] = new Star();
      }
    }

    function updateStars() {
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      stars.forEach((s) => {
        s.show();
        s.move();
      });
      window.requestAnimationFrame(updateStars);
    }
  }, []);

  return <canvas id="stars"></canvas>;
};
