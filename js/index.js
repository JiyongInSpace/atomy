import Background from './background.js'

// page 3, 4 bankground
const brandTabs = document.querySelectorAll(".brand-bg");
const brandIndis = document.querySelectorAll(".brand-indi div");

const parksTabs = document.querySelectorAll(".atomypark-bg");
const parksIndis = document.querySelectorAll(".atomypark-indi div");

const brandBg = new Background(brandTabs, brandIndis, 6);
const atomyparkBg = new Background(parksTabs, parksIndis, 5);


// 스크롤시 등장 
const firstHides = document.querySelectorAll(".hide2");

firstHides.forEach((item) => {
    window.addEventListener("scroll", () => {
        if(item.getBoundingClientRect().y <= window.innerHeight * 4/5){
            item.classList.remove("hide2");
        }
    })
})

// 사이트 page 넘기기 및 현재 위치 알려주는 nav
const navs = document.querySelectorAll(".nav-ul li");
const navBar = document.querySelector(".nav-ul-bar");
let pageNum = 0;
let mouseNum = 0;
addPageColor();

function addPageColor(){
    navs[pageNum].classList.add("show");
    changePageColor(pageNum);
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
    mouseNum = 0;
}

function scrollPage(e){
    e.preventDefault();
    
    if(e.pageY-e.clientY > innerHeight*pageNum + 5 || e.pageY-e.clientY < innerHeight*pageNum - 5){
        mouseNum++;
        if(mouseNum > 7){goToPage();mouseNum=0;}
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

function scrollPageOnWorldmap(e){
    e.preventDefault();
    if(e.pageY !== e.clientY){
        return;
    } else if(e.deltaY > 0 && pageNum < 6){
        removePageColor();
        pageNum = 6;
    } else if(e.deltaY < 0 && pageNum > 0){
        removePageColor();
        pageNum = 4;
    }
    moveNavBar();
    addPageColor();
    goToPage();
};

function changePageColor(num){
    switch(num * 1){
        case 1:
        case 2:
        case 4:
            navBar.style.borderTop = "2px solid #04a6e1";
            break;
        default:
            navBar.style.borderTop = "2px solid white";
            break;
    }
};
window.addEventListener("resize", goToPage);
window.addEventListener("wheel", scrollPage, {passive : false});
navs.forEach((nav, index) => {
    nav.addEventListener("click", pageNow);
    nav.dataset.index = index;
})

// world map 위에서 event
window.addEventListener('load', () => {
    const worldMap = document.querySelector(".world-map");
    const svgDoc = worldMap.contentDocument;

    //wheel
    svgDoc.addEventListener("wheel", scrollPageOnWorldmap, {passive : false});
    
    //wheel button
    svgDoc.addEventListener("mousedown", (e) => {
        if(e.button !== 1) return;
        e.preventDefault();
    });

    //touch
    svgDoc.addEventListener("touchmove", (e) => {e.preventDefault()}, {passive : false});

    let globalStartY, globalEndY;
    function globalTouchStart(e){
        globalStartY = e.touches[0].pageY;
    }
    function globalTouchEnd(e){
        globalEndY = e.changedTouches[0].pageY;
        e.preventDefault();
        if(globalStartY - globalEndY > 50){
            pageNum = 6;
        } else if(globalStartY - globalEndY < -50){
            pageNum = 4;
        }
        goToPage();
    }
    svgDoc.addEventListener("touchstart", globalTouchStart);
    svgDoc.addEventListener("touchend", globalTouchEnd);
})

// 휠버튼 막기
window.addEventListener("mousedown", (e) => {
    if(e.button !== 1) return;
    e.preventDefault();
})


// aside scrollToTop
function WhenScrollToTop(){
    if(pageYOffset < 1){
        removePageColor();
        pageNum = 0;
        moveNavBar();
        addPageColor();
    }
}
window.addEventListener("scroll", WhenScrollToTop)

// footer 보기(휠)
const footer = document.querySelector(".footer");

function showFooter(e){ 
    if(e.deltaY < 0 && (document.documentElement.offsetHeight - window.innerHeight <= window.scrollY+2)){
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



// page 2 slide 관련
const aboutSlideImgs = document.querySelector(".about-slide-img div");
const aboutSlideTxts = document.querySelectorAll(".about-slide-txt-list div");
const aboutSlideBtns = document.querySelectorAll(".about-slide-btn button");
let aboutNum = 0;


function slideImg(){
    aboutSlideImgs.style.transform = `translateY(${-12.5 * (aboutNum+1)}%)`;
}
function addTxtActive(aboutNum){
    aboutSlideTxts[aboutNum+2].classList.add("active");
}
function removeTxtActive(aboutNum){
    aboutSlideTxts[aboutNum+2].classList.remove("active");
}
function hideTxt(){
    aboutSlideTxts.forEach((txt) => {
        txt.classList.add("hide");
    });
    aboutSlideTxts[aboutNum + 1].classList.remove("hide");
    aboutSlideTxts[aboutNum + 2].classList.remove("hide");
    aboutSlideTxts[aboutNum + 3].classList.remove("hide");
}
hideTxt();

function fakeInfinite(){
    removeTxtActive(aboutNum);
    if(aboutNum > 5){
        aboutNum = 0;
    } else if(aboutNum < 0){
        aboutNum = 5;
    }
    hideTxt();
    addTxtActive(aboutNum);
    aboutSlideImgs.style.transition = "none";
    aboutSlideImgs.style.transform = `translateY(${-12.5 * (aboutNum+1)}%)`;
}
function pageInfo(){
    if(aboutNum+1 > 6){
        document.querySelector(".about-slide-num").textContent = 1;
    } else if(aboutNum+1 < 1){
        document.querySelector(".about-slide-num").textContent = 6;
    } else{
        document.querySelector(".about-slide-num").textContent = aboutNum+1;
    }
}
function changeAboutNum(){
    removeTxtActive(aboutNum);
    if(this.className === "down" && aboutNum <= 6){
        aboutNum++;
        if(aboutNum > 5){
            setTimeout(fakeInfinite, 200);
        }
    } else if(this.className === "up" && aboutNum >= -1){
        aboutNum--;
        if(aboutNum < 0){
            setTimeout(fakeInfinite, 200);
        } 
    }
    aboutSlideImgs.style.transition = "0.2s";
    slideImg();
    hideTxt();
    addTxtActive(aboutNum);
    pageInfo();
}

aboutSlideBtns.forEach((btn) => {
    btn.addEventListener("click", changeAboutNum);
    btn.addEventListener("touchend", changeAboutNum);
});
addTxtActive(aboutNum);

// about데이터
const indexUrl = "https://raw.githubusercontent.com/JiyongInSpace/atomy/main/data/data.json";
const newsArticle = document.querySelector(".news-article");
function inIndex(){
    fetch(indexUrl)
    .then(res => res.json())
    .then(data => callback(data));
    function callback(data){
        for(let i=5; i<13; i++){
            aboutSlideImgs.innerHTML +=
            `<img src="${data.about[i%6].img}" alt="">`;
        };
        for(let i=4; i<14; i++){
            aboutSlideTxts[i-4].innerHTML =
            `<p>${data.about[i%6].p1}</p>
            <p>${data.about[i%6].p2}</p>
            <p>${data.about[i%6].p3}</p>`;
        };
        data.news.forEach((item, index) => {
            newsArticle.innerHTML += 
            `<div class="news-article-${index+1}">
                <figure style="background-image:url(img/${item.img})"><div>자세히 보기</div></figure>
                <div>${item.title}</div>
            </div>`;
        })

    }
}
window.addEventListener('load', inIndex);

// 모바일 touch
let startY, endY;
function touchStart(e){
    startY = e.touches[0].pageY;
}
function touchEnd(e){
    endY = e.changedTouches[0].pageY;
    e.preventDefault();
    if(startY - endY > 50 && pageNum < 6){
        pageNum++;
    } else if(startY - endY < -50 && pageNum > 0){
        pageNum--;
    }
    goToPage();
}
function showFooterMobile(e){
    if(startY - endY > 50 && (e.changedTouches[0].pageY - e.changedTouches[0].clientY == innerHeight * 6)){
        window.scrollBy({ top: 500, left: 0, behavior: "smooth"});
    } else {
        goToPage();
    }
}
window.addEventListener("touchstart", touchStart);
window.addEventListener("touchend", touchEnd);
window.addEventListener("touchend", showFooterMobile);
window.addEventListener("touchmove", (e) => {e.preventDefault()}, {passive : false})