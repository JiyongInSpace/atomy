const mpTitles = document.querySelectorAll(".sub-con");

function addActive(){
    this.classList.toggle("active");
}
mpTitles.forEach((mpTitle) => {
    mpTitle.addEventListener("click", addActive);
})