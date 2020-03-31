import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './style/index.css'

Vue.config.productionTip = false

Vue.directive('highlight', function (el) {
    let blocks = el.querySelectorAll('pre code');
    blocks.forEach((block) => {
        hljs.highlightBlock(block)
    })
})

Vue.directive('drag', function (el) {
    let odiv = el;   //获取当前元素
    odiv.onmousedown = (e) => {
        //算出鼠标相对元素的位置
        let disX = e.clientX - odiv.offsetLeft;
        let disY = e.clientY - odiv.offsetTop;

        document.onmousemove = (e) => {
            //用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
            let left = e.clientX - disX;
            let top = e.clientY - disY;

            //绑定元素位置到positionX和positionY上面
            // this.positionX = top;
            // this.positionY = left;

            //移动当前元素
            odiv.style.left = left + 'px';
            odiv.style.top = top + 'px';
        };
        document.onmouseup = (e) => {
            document.onmousemove = null;
            document.onmouseup = null;
        };
    };
})

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')

//hoverclass
window.addEventListener(
    "touchstart",
    function (e) {
        let dom = e.target;
        let deep = 3;
        let hoverclass;
        while (!hoverclass && deep--) {
            if (dom.nodeName === "HTML") return;
            hoverclass = dom.getAttribute("hoverclass");
            if (hoverclass) {
                dom.classList.add(hoverclass);
                dom.addEventListener("touchend", function toggleClass() {
                    setTimeout(() => {
                        dom.classList.remove(hoverclass);
                        dom.removeEventListener("touchend", toggleClass);
                    });
                }, false);
            } else {
                dom = dom.parentNode;
            }
        }
    },
    false
);