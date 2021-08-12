// header 기능
const header = document.querySelector(".header");
function headerChangeByScroll(){
    return window.pageYOffset != 0 ? header.classList.add("show"):header.classList.remove("show");
}
window.addEventListener("scroll", headerChangeByScroll);
function headerShowByHover(){
    header.classList.add("show2");
}
function headerHideByHover(){
    header.classList.remove("show2");
}

header.addEventListener("mouseenter", headerShowByHover);
header.addEventListener("mouseleave", headerHideByHover);

function showMobileMenu(e){
    if(e.target.nodeName !== "I"){
        return;
    }else{
        e.target.classList.toggle("fa-times");
        header.classList.toggle("show3");
    }
}
let menuNum;

function openMobileMenu(e){
    if(e.target.className !== "header-s-menu-list-name"){
        return;
    } else{
        const menuList = e.target.parentElement;
        if((menuNum !== undefined)&&(menuNum !== menuList.dataset.index)){
            menuList.parentElement.children[menuNum].classList.remove("show");
        }
        menuList.classList.toggle("show");
        menuNum = menuList.dataset.index;
    }
}
header.addEventListener("click", showMobileMenu);
header.addEventListener("click", openMobileMenu);
header.addEventListener("touchend", showMobileMenu);
header.addEventListener("touchend", openMobileMenu);

// aside 기능
const aside = document.querySelector(".aside");
const topBtn = document.querySelector(".aside-btns div");
const showBtn = document.querySelector(".aside-btns div:last-child");
const smallTopBtn = document.querySelector(".aside-s");


function scrollToTop(){
    window.scrollTo({top:0, behavior:"smooth"})
}
function toggleHubTab(){
    aside.classList.toggle("show");
    document.querySelector(".fa-chevron-down").classList.toggle("fa-chevron-up");
}
function exitHubTab(e){
    if(e.target.className === "fas fa-times") toggleHubTab();
}
function showTopBtn(){
    if(pageYOffset > window.innerHeight){
        topBtn.classList.add("show")
        smallTopBtn.classList.add("show")
    }else if(pageYOffset < window.innerHeight && topBtn.classList.contains("show")){
        topBtn.classList.remove("show");
        smallTopBtn.classList.remove("show");
    }
    
}


smallTopBtn.addEventListener("click", scrollToTop);
aside.addEventListener("click", exitHubTab);
showBtn.addEventListener("click", toggleHubTab);
topBtn.addEventListener("click", scrollToTop);
smallTopBtn.addEventListener("touchend", scrollToTop);
aside.addEventListener("touchend", exitHubTab);
showBtn.addEventListener("touchend", toggleHubTab);
topBtn.addEventListener("touchend", scrollToTop);
window.addEventListener("scroll", showTopBtn);

history.scrollRestoration = "manual";