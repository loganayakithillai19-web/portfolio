

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

const text = "Front End Developer";
let index = 0;
let isDeleting = false;
const typingEl = document.getElementById("typing");

function typeEffect() {
  if (!isDeleting) {
    typingEl.textContent = text.slice(0, index++);
    if (index > text.length) {
      isDeleting = true;
    }
  } else {
    typingEl.textContent = text.slice(0, index--);
    if (index < 0) {
      isDeleting = false;
      index = 0;
    }
  }
  setTimeout(typeEffect, isDeleting ? 80 : 120);
}

typeEffect();


  const sections = document.querySelectorAll(".section");
const progressBars = document.querySelectorAll(".progress-bar");

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");

      // skills animation
      if (entry.target.id === "skills") {
        progressBars.forEach(bar => {
          const value = bar.getAttribute("data-progress");
          bar.style.width = value + "%";
        });
      }
    }
  });
}, { threshold: 0.3 });

sections.forEach(section => {
observer.observe(section);

  });




  // Simple welcome alert

const form = document.getElementById("contactForm");
const successBox = document.getElementById("successBox");
const loader = document.querySelector(".loader");
const btnText = document.querySelector(".btn-text");

form.addEventListener("submit", function(e){
  e.preventDefault();

  let valid = true;
  document.querySelectorAll(".error").forEach(e=>e.innerText="");

  ["name","email","mobile","message"].forEach(id=>{
    const input = document.getElementById(id);
    if(input.value.trim()===""){
      input.classList.add("shake");
      input.nextElementSibling.innerText="Required";
      valid=false;
      setTimeout(()=>input.classList.remove("shake"),300);
    }
  });

  if(!valid) return;

  btnText.style.display="none";
  loader.style.display="block";

  setTimeout(()=>{
    loader.style.display="none";
    btnText.style.display="block";
    successBox.style.display="block";
    startConfetti();
    form.reset();

    setTimeout(()=>{
      successBox.style.display="none";
      stopConfetti();
    },3000);

  },2000);
});

/* 🎉 Confetti */
const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let pieces=[];

function startConfetti(){
  for(let i=0;i<80;i++){
    pieces.push({
      x:Math.random()*canvas.width,
      y:Math.random()*canvas.height,
      r:Math.random()*6+3,
      d:Math.random()*5+2,
      c:`hsl(${Math.random()*360},100%,50%)`
    });
  }
  requestAnimationFrame(draw);
}

function draw(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  pieces.forEach(p=>{
    ctx.beginPath();
    ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
    ctx.fillStyle=p.c;
    ctx.fill();
    p.y+=p.d;
    if(p.y>canvas.height) p.y=0;
  });
  requestAnimationFrame(draw);
}

function stopConfetti(){
  pieces=[];
  ctx.clearRect(0,0,canvas.width,canvas.height);
}
