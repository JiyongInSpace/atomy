const brandBgs = document.querySelectorAll(".brand-bg");
const brandIndis = document.querySelectorAll(".brand-indi div");
let brandIdx = 0;

function autoChangeBrandBg(){
    let oldIdx = brandIdx;
    brandIdx++;
    if(brandIdx >= brandIndis.length){
        brandIdx = 0;
    }
    console.log(brandIdx);
    ChangeBrandBg(oldIdx, brandIdx);
}

function ChangeBrandBg(oldIdx, index){
    brandBgs[oldIdx].classList.remove("show");
    brandIndis[oldIdx].classList.remove("show");
    brandBgs[index].classList.add("show");
    brandIndis[index].classList.add("show");
}

brandIndis.forEach((indi, index) => {
    indi.addEventListener("click", () => {
        ChangeBrandBg(brandIdx, index);
        brandIdx = index;
    });
})

setInterval(autoChangeBrandBg, 4000);