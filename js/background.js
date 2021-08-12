export default class Background{
    constructor (tabs, indis, time){
        this.tabs = tabs;
        this.indis = indis;
        this.time = time * 1000;
        this.idx = 0;

        this.indis.forEach((indi, index) => {
            indi.addEventListener("click", () => {
                this.changeBg(this.idx, index);
                this.idx = index;
            });
            indi.addEventListener("touchend", () => {
                this.changeBg(this.idx, index);
                this.idx = index;
            });
        });

        setInterval(() => this.autoChangeBg(), this.time);
    }
    changeBg(oldIdx, curIdx){
        this.tabs[oldIdx].classList.remove("show");
        this.indis[oldIdx].classList.remove("show");
        this.tabs[curIdx].classList.add("show");
        this.indis[curIdx].classList.add("show");
    }
    autoChangeBg(){
        this.oldIdx = this.idx;
        this.idx++;
        if(this.idx >= this.indis.length){
            this.idx = 0;
        }
        this.changeBg(this.oldIdx, this.idx);
    }
}