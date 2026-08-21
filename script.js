const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");
menuBtn.addEventListener("click", () => nav.classList.toggle("open"));
document.querySelectorAll("nav a").forEach(a => a.addEventListener("click", () => nav.classList.remove("open")));

const words = ["AI Solutions.", "Data Projects.", "Smart Applications.", "Real-World Ideas."];
let wordIndex = 0, charIndex = 0, deleting = false;
const typing = document.getElementById("typing");
function typeLoop(){
  const word = words[wordIndex];
  typing.textContent = deleting ? word.slice(0, --charIndex) : word.slice(0, ++charIndex);
  if(!deleting && charIndex === word.length){ deleting = true; setTimeout(typeLoop, 1200); return; }
  if(deleting && charIndex === 0){ deleting = false; wordIndex = (wordIndex + 1) % words.length; }
  setTimeout(typeLoop, deleting ? 45 : 80);
}
typeLoop();

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => { if(entry.isIntersecting) entry.target.classList.add("show"); });
},{threshold:.12});
document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

document.getElementById("year").textContent = new Date().getFullYear();
