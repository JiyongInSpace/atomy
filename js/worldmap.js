const globalTab = document.querySelector(".global-tab");
const globalTabBtns = document.querySelectorAll(".global-tab-btn");
const globalTabWorld = document.querySelector(".global-tab-world");
const globalTabWorldBack = document.querySelector(".global-tab-world-back");

function inWorld(){
    globalTab.classList.add("active");
}
function outWorld(){
    globalTab.classList.remove("active");
}
globalTabBtns.forEach((btn) => {
    btn.addEventListener("click", inWorld);
})
globalTabWorldBack.addEventListener("click", outWorld)



window.addEventListener('load', () => { // hover 기능
    const worldMap = document.querySelector(".world-map");
    const svgDoc = worldMap.contentDocument;
    
    
    function addColorByClick(){
        svgDoc.querySelectorAll(`.${this.dataset.world}`).forEach((world) => {
            world.classList.add("active1");
        })
    }
    function addColorByHover(){
        svgDoc.querySelectorAll(`.${this.dataset.world}`).forEach((world) => {
            world.classList.add("active");
        })
    }
    function removeColorByHover(){
        svgDoc.querySelectorAll(".active").forEach((world) => {
            world.classList.remove("active");
        })
    }
    function removeColorByClick(){
        svgDoc.querySelectorAll(".active1").forEach((world) => {
            world.classList.remove("active1");
        })
    }

    for(let i=0; i<5; i++){
        globalTabBtns[i].addEventListener("mouseover", addColorByHover);
        globalTabBtns[i].addEventListener("click", addColorByClick);
        globalTabBtns[i].addEventListener("mouseout", removeColorByHover);
        globalTabWorldBack.addEventListener("click", removeColorByClick);
    }
})




// global select box
const indexUrl = "https://raw.githubusercontent.com/JiyongInSpace/atomy/main/data/data.json";
const globalSelect = document.querySelector(".global-select");

function inGlobal(){
    fetch(indexUrl)
    .then(res => res.json())
    .then(data => callback(data));
    function callback(data){
        data.global.forEach((item) => {
            globalSelect.innerHTML += `<option>${item.country}</option>`
        })
    }
}
window.addEventListener('load', inGlobal);

// country list
const worldList = document.querySelector(".global-tab-world-list");
function callGlobalList(){
    fetch(indexUrl)
    .then(res => res.json())
    .then(data => callback(data, this.dataset.world));
    function callback(data, dataWorld){
        worldList.innerHTML = '';
        data.global.forEach((item) => {
            if(item.class === dataWorld){
                worldList.innerHTML += `<p>${item.country}<p>`;
            }
        })
    }
}
globalTabBtns.forEach((btn) => {
    btn.addEventListener("click", callGlobalList);
})