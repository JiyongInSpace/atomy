const mpTitles = document.querySelectorAll(".sub-con");

function addActive(){
    this.classList.toggle("active");
}
mpTitles.forEach((mpTitle) => {
    mpTitle.addEventListener("click", addActive);
})

const subConTitle = document.querySelectorAll(".sub-con-title")
const subConContent = document.querySelectorAll(".sub-con-ctt");

const subUrl = "https://raw.githubusercontent.com/JiyongInSpace/atomy/main/data/data.json";

function inSub(){
    fetch(subUrl)
    .then(res => res.json())
    .then(data => callback(data));
    function callback(data){

        data.subTitle.forEach((item, index) => {
            subConTitle[index].innerHTML += 
            ` <figcaption>
                <p>${item.title}</p><p>${item.p1}</p>
                <p><i class="fas fa-chevron-down"></i></p>
            </figcaption>
            <div class="sub-con-title-clickblue"></div>
            <div class="sub-con-title-borderhover">
                <div></div><div></div><div></div><div></div>
            </div>`;
        })

        data.sub.forEach((item) => {
            subConContent[item.category].innerHTML += 
            `<div class="sub-con-ctt-item">
                <div class="sub-con-ctt-item-icon" style="background-position: ${item.position};"></div>
                <div><h2>${item.title}</h2><p>${item.detail}</p></div>
            </div>`;
        })
    }
}
window.addEventListener('load', inSub);