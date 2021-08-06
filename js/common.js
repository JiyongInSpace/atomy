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

function scrollToTop(){
    const topBtn = document.querySelector(".aside-btns div");
    topBtn.addEventListener("click", () => window.scrollTo({top:0, behavior:"smooth"}));
}
function showHub(){
    const showBtn = document.querySelector(".aside-btns div:last-child");
    showBtn.addEventListener("click", () => {
        aside.classList.toggle("show");
        document.querySelector(".fa-chevron-down").classList.toggle("fa-chevron-up");
    });
}
function showTopBtn(){
    const topBtn = document.querySelector(".aside-btns div");
    window.addEventListener("scroll", () => {
        if(pageYOffset > window.innerHeight){
            topBtn.classList.add("show")
        }else if(pageYOffset < window.innerHeight && topBtn.classList.contains("show")){
            topBtn.classList.remove("show");
        }
    });
}
function addListener(){
    scrollToTop();
    showHub();
    showTopBtn();
}
setTimeout(addListener, 500); // 가져온 html 요소에 이벤트 주기

// history.scrollRestoration = "manual";