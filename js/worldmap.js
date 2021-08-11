const globalTab = document.querySelectorAll(".global-tab div");

window.addEventListener('load', () => {
    const worldMap = document.querySelector(".world-map");
    const svgDoc = worldMap.contentDocument;
    const hq = svgDoc.querySelector('.hq');
    
    function addColor(){
        svgDoc.querySelectorAll(`.${this.dataset.world}`).forEach((world) => {
            world.classList.add("active");
        })
    }
    function removeColor(){
        svgDoc.querySelectorAll(`.${this.dataset.world}`).forEach((world) => {
            world.classList.remove("active");
        })
    }

    for(let i=0; i<5; i++){
        globalTab[i].addEventListener("mouseover", addColor)
        globalTab[i].addEventListener("mouseout", removeColor)
    }
})
