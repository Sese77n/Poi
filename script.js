const btn = document.getElementById("btnInicio");
const mensaje = document.getElementById("mensaje");

let started = false;

btn.addEventListener("click", () => {
  if (!started) {
    started = true;
    init(); // 🔥 arranca el fondo del CodePen
  }

  mensaje.innerText = "Te amo muchísimo Agus ❤️";
  btn.style.display = "none";
});

/* ====== CODEPEN ORIGINAL (SIN CAMBIOS IMPORTANTES) ====== */

window.requestAnimationFrame =
  window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  function (callback) {
    window.setTimeout(callback, 1000 / 60);
  };

window.isDevice = (/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(
  (navigator.userAgent || navigator.vendor || window.opera).toLowerCase()
));

var loaded = false;

function init() {
  if (loaded) return;
  loaded = true;

  var mobile = window.isDevice;
  var koef = mobile ? 0.5 : 1;
  var canvas = document.getElementById('heart');
  var ctx = canvas.getContext('2d');

  var width = canvas.width = koef * innerWidth;
  var height = canvas.height = koef * innerHeight;

  ctx.fillStyle = "rgba(0,0,0,1)";
  ctx.fillRect(0, 0, width, height);

  var heartPosition = function (rad) {
    return [
      Math.pow(Math.sin(rad), 3),
      -(15 * Math.cos(rad) - 5 * Math.cos(2 * rad) -
        2 * Math.cos(3 * rad) - Math.cos(4 * rad))
    ];
  };

  var scaleAndTranslate = function (pos, sx, sy, dx, dy) {
    return [dx + pos[0] * sx, dy + pos[1] * sy];
  };

  var traceCount = mobile ? 20 : 50;
  var pointsOrigin = [];
  var dr = mobile ? 0.3 : 0.1;

  for (let i = 0; i < Math.PI * 2; i += dr)
    pointsOrigin.push(scaleAndTranslate(heartPosition(i), 210, 13, 0, 0));

  var heartPointsCount = pointsOrigin.length;
  var targetPoints = [];

  var pulse = function (kx, ky) {
    for (let i = 0; i < pointsOrigin.length; i++) {
      targetPoints[i] = [
        kx * pointsOrigin[i][0] + width / 2,
        ky * pointsOrigin[i][1] + height / 2
      ];
    }
  };

  var e = [];
  for (let i = 0; i < heartPointsCount; i++) {
    let x = Math.random() * width;
    let y = Math.random() * height;
    e[i] = {
      vx: 0,
      vy: 0,
      speed: Math.random() + 5,
      q: ~~(Math.random() * heartPointsCount),
      D: 2 * (i % 2) - 1,
      force: 0.2 * Math.random() + 0.7,
      f: "hsla(0,80%,60%,.4)",
      trace: Array.from({ length: traceCount }, () => ({ x, y }))
    };
  }

  var time = 0;

  function loop() {
    var n = -Math.cos(time);
    pulse((1 + n) * .5, (1 + n) * .5);
    time += 0.01;

    ctx.fillStyle = "rgba(0,0,0,.1)";
    ctx.fillRect(0, 0, width, height);

    e.forEach(u => {
      let q = targetPoints[u.q];
      let dx = u.trace[0].x - q[0];
      let dy = u.trace[0].y - q[1];
      let len = Math.sqrt(dx * dx + dy * dy);

      u.vx += -dx / len * u.speed;
      u.vy += -dy / len * u.speed;
      u.trace[0].x += u.vx;
      u.trace[0].y += u.vy;
      u.vx *= u.force;
      u.vy *= u.force;

      for (let k = 0; k < u.trace.length - 1; k++) {
        u.trace[k + 1].x -= 0.4 * (u.trace[k + 1].x - u.trace[k].x);
        u.trace[k + 1].y -= 0.4 * (u.trace[k + 1].y - u.trace[k].y);
      }

      ctx.fillStyle = u.f;
      u.trace.forEach(p => ctx.fillRect(p.x, p.y, 1, 1));
    });

    requestAnimationFrame(loop);
  }

  loop();
}
