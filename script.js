const btn = document.getElementById("btnInicio");
const mensaje = document.getElementById("mensaje");
const musica = document.getElementById("musica"); // 🎵 audio

let started = false;

btn.addEventListener("click", () => {
  if (!started) {
    started = true;

    init();            // 🔥 arranca el fondo del CodePen

    musica.muted = false;
    musica.volume = 1; // volumen suave
    musica.loop = true;  // que se repita
    musica.play();       // 🎵 música
  }

  mensaje.innerText = "Por favor, mira abajo ❤️";
  btn.style.display = "none";

habilitarScroll = true;



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




const mensajes = [
  { tipo: "texto", contenido: "A partir de hoy, esta página es completamente pública" },
  { tipo: "texto", contenido: "Internet, ese lugar tan variado" },
  { tipo: "texto", contenido: "Originalmente desarrollado con fines militares" },
  { tipo: "texto", contenido: "Hoy, será testigo eterno, del mensaje que quiero darte." },
  { tipo: "imagen", contenido: "foto1.jpg" },
  { tipo: "texto", contenido: "Por, y para ti" },
  { tipo: "espacio" },
  { tipo: "texto", contenido: "Este 14 de febrero, no quiero que sea uno que olvides." },
  { tipo: "texto", contenido: "Porque yo no puedo olvidarte." },
  { tipo: "texto", contenido: "Cada dia estas presente en mi," },
  { tipo: "texto", contenido: "En cada tienda de peluches," },
  { tipo: "texto", contenido: "En cada ropa bonita," },
  { tipo: "texto", contenido: "En cada texto, de los que se hunden en el pecho," },
  { tipo: "texto", contenido: "En cada café." },
  { tipo: "imagen", contenido: "fotodos.jpg" },
  { tipo: "texto", contenido: "Simplemente, mi mente no se desprende de ti." },


  { tipo: "texto", contenido: "No sé que hiciste para encantarme de esta manera" },
  { tipo: "texto", contenido: "Pero por favor" },
  { tipo: "texto", contenido: "Cada vez que me encuentres" },
  { tipo: "texto", contenido: "Hazlo de nuevo" },

  { tipo: "imagen", contenido: "foto3.jpg" },

  { tipo: "texto", contenido: "Puedo prometerte" },
  { tipo: "texto", contenido: "Que cada vez que te encuentre" },
  { tipo: "texto", contenido: "Te recordaré nuestra historia" },
  { tipo: "texto", contenido: "Y te tomaré de la mano." },
  { tipo: "espacio" },
  { tipo: "texto", contenido: "Facil no será," },
  { tipo: "texto", contenido: "Pero te mostraré esas canciones que nos hicieron reir por horas," },
  { tipo: "imagen", contenido: "foto6.jpg" },

  { tipo: "texto", contenido: "Nuestras caricias," },
  { tipo: "texto", contenido: "Nuestras bromas," },
  { tipo: "texto", contenido: "Nuestras cartas," },
  { tipo: "texto", contenido: "también nuestro idioma... Y nuestra cultura" },
  { tipo: "imagen", contenido: "idiomapoi.jpg" },
  { tipo: "espacio" },

  { tipo: "texto", contenido: "Hoy me doy cuenta que esa pintura que hicimos juntos, es más que un pollito en su isla... " },
  { tipo: "texto", contenido: "Juntos creamos una pieza que, más allá de su valor como pintura" },
  { tipo: "texto", contenido: "Es un pedacito de nosotros. Es nuestro." },
  { tipo: "texto", contenido: "Y esa es la mejor parte." },
  { tipo: "espacio" },
  { tipo: "texto", contenido: "Nos tenemos el uno al otro, y bailaremos bajo esa luz de la luna que me mencionaste en tantas cartas" },
  { tipo: "texto", contenido: "Una y otra vez" },
  { tipo: "texto", contenido: "Y nos seguiremos mezclando hasta seguir creando algo más" },
  { tipo: "texto", contenido: "No siempre soy la mejor gama de colores para la obra que buscas" },
  { tipo: "texto", contenido: "A veces tampoco para la que yo busco" },
  { tipo: "texto", contenido: "Y seré sincero: me da miedo no cumplir con tal dicha... " },
  { tipo: "texto", contenido: "Pero como el pollito, siempre llevaré mi barco hacia adelante," },
  { tipo: "texto", contenido: "Porque no hay nada más valiente," },
  { tipo: "espacio" }, 
  { tipo: "espacio" },      
  { tipo: "imagen", contenido: "foto5.jpg" },
  { tipo: "espacio" }, 
  { tipo: "espacio" },     
  { tipo: "texto", contenido: "Cuando dudes, regresa a aquí. Te estaré esperando. Estoy orgulloso de tí" },
  { tipo: "texto", contenido: "Te amo" },


];


const contenedor = document.getElementById("mensajes-scroll");
let indexMensaje = 0;
let habilitarScroll = false;


window.addEventListener("scroll", () => {
  if (!habilitarScroll) return;
  if (indexMensaje >= mensajes.length) return;

  const scrollBottom =
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;

if (scrollBottom) {

  const item = mensajes[indexMensaje];

  if (item.tipo === "texto") {
    const p = document.createElement("p");
    p.classList.add("mensaje");
    p.innerText = item.contenido;
    contenedor.appendChild(p);
    setTimeout(() => p.classList.add("visible"), 50);
  }

  if (item.tipo === "imagen") {
    const img = document.createElement("img");
    img.src = item.contenido;
    img.classList.add("imagen-scroll");
    contenedor.appendChild(img);
    setTimeout(() => img.classList.add("visible"), 50);
  }

  if (item.tipo === "espacio") {
    const espacio = document.createElement("div");
    espacio.style.height = "100px";
    contenedor.appendChild(espacio);
  }

  indexMensaje++;
}






});
