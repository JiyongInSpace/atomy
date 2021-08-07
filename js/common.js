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




// aside 기능
const aside = document.querySelector(".aside")
const topBtn = document.querySelector(".aside-btns div");
const showBtn = document.querySelector(".aside-btns div:last-child");

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
    }else if(pageYOffset < window.innerHeight && topBtn.classList.contains("show")){
        topBtn.classList.remove("show");
    }
    
}



aside.addEventListener("click", exitHubTab);
showBtn.addEventListener("click", toggleHubTab);
topBtn.addEventListener("click", scrollToTop);
window.addEventListener("scroll", showTopBtn);

history.scrollRestoration = "manual";