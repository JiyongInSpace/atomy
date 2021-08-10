import Background from './background.js'

const brandTabs = document.querySelectorAll(".brand-bg");
const brandIndis = document.querySelectorAll(".brand-indi div");

const parksTabs = document.querySelectorAll(".atomypark-bg");
const parksIndis = document.querySelectorAll(".atomypark-indi div");

const brandBg = new Background(brandTabs, brandIndis, 4);
const atomyparkBg = new Background(parksTabs, parksIndis, 3);


const navs = document.querySelectorAll(".nav-ul li");
const navBar = document.querySelector(".nav-ul-bar");
let pageNum = 0;
addPageColor();

function addPageColor(){
    navs[pageNum].classList.add("show");
}
function removePageColor(){
    navs[pageNum].classList.remove("show");
}
function moveNavBar(){
    let valueY = 100 * pageNum;
    if(valueY > 600) valueY = 600;
    navBar.style.transform= `translateY(${valueY}%)`;
}
function pageNow(){
    removePageColor();
    pageNum = this.dataset.index;
    moveNavBar();
    goToPage();
    addPageColor();
}
function goToPage(){
    const y = window.innerHeight;
    window.scrollTo({ top: y * pageNum, behavior: "smooth"});
}
function scrollPage(e){
    e.preventDefault();
    if(e.pageY-e.clientY > innerHeight*pageNum + 5 || e.pageY-e.clientY < innerHeight*pageNum - 5){
        return;
    } else if(e.deltaY > 0 && pageNum < 6){
        removePageColor();
        pageNum++;
    } else if(e.deltaY < 0 && pageNum > 0){
        removePageColor();
        pageNum--;
    }
    moveNavBar();
    addPageColor();
    goToPage();
};
window.addEventListener("resize", goToPage);
window.addEventListener("wheel", scrollPage, {passive : false});
navs.forEach((nav, index) => {
    nav.addEventListener("click", pageNow);
    nav.dataset.index = index;
})

const footer = document.querySelector(".footer");

function showFooter(e){
    if(e.deltaY < 0 && (document.documentElement.offsetHeight - window.innerHeight <= window.scrollY)){
        navBar.style.opacity = 1;
        addPageColor();
        goToPage();
    }
    if(e.deltaY < 0 || e.pageY-e.clientY > innerHeight*6 + 5 || e.pageY-e.clientY < innerHeight*6 - 5){
        return;
    } else {
        footer.scrollIntoView({behavior: "smooth"});
        navBar.style.opacity = 0;
        removePageColor();
    }
}
window.addEventListener("wheel", showFooter);



const aboutSlideImgs = document.querySelector(".about-slide-img div");
const aboutSlideTxts = document.querySelectorAll(".about-slide-txt-list div");
const aboutSlideBtns = document.querySelectorAll(".about-slide-btn button");
let aboutNum = 0;


function slideImg(){
    aboutSlideImgs.style.transition = "0.5s";
    aboutSlideImgs.style.transform = `translateY(${-12.5 * (aboutNum+1)}%)`;
}
function slideImg2(){
    aboutSlideImgs.style.transition = "none";
    aboutSlideImgs.style.transform = `translateY(${-12.5 * (aboutNum+1)}%)`;
}
function addTxtActive(aboutNum){
    aboutSlideTxts[aboutNum+1].classList.add("active");
}
function removeTxtActive(aboutNum){
    aboutSlideTxts[aboutNum+1].classList.remove("active");
}
function hideTxt(){
    aboutSlideTxts.forEach((txt) => {
        txt.classList.add("hide");
    });
    aboutSlideTxts[aboutNum].classList.remove("hide");
    aboutSlideTxts[aboutNum + 1].classList.remove("hide");
    aboutSlideTxts[aboutNum + 2].classList.remove("hide");
}
hideTxt();

function changeAboutNum(e){
    removeTxtActive(aboutNum);
    if(this.className === "down"){
        aboutNum++;
        if(aboutNum > 5) aboutNum = 0;
    } else {
        aboutNum--;
        if(aboutNum < 0) aboutNum = 5;
    }
    slideImg();
    hideTxt();
    addTxtActive(aboutNum);
    document.querySelector(".about-slide-num").textContent = aboutNum+1;
}

aboutSlideBtns.forEach((btn) => {
    btn.addEventListener("click", changeAboutNum);
});
addTxtActive(aboutNum);