<template>
  <div id="app">
    <transition v-bind:css="false"
                v-on:before-enter="beforeEnter"
                v-on:enter="enter"
                v-on:after-enter="afterEnter"
                v-on:before-leave="beforeleave"
                v-on:leave="leave"
                v-on:after-leave="afterleave">

      <keep-alive :include="include">
        <!-- 会被缓存的组件 -->
        <router-view v-if="$route.meta.keepAlive"
                     keepAlive />
      </keep-alive>

    </transition>
    <!-- 不被缓存的组件-->
    <transition v-bind:css="false"
                v-on:before-enter="beforeEnter"
                v-on:enter="enter"
                v-on:after-enter="afterEnter"
                v-on:before-leave="beforeleave"
                v-on:leave="leave"
                v-on:after-leave="afterleave">

      <router-view v-if="!$route.meta.keepAlive"
                   dekeepAlive />

    </transition>
  </div>
</template>
<script>
export default {
  name: "app",
  data: () => ({
    SPEED: 300,
    firstReact: {},
    transitionType: "",
    include: []
  }),
  computed: {
    SLIDE() {
      return ["slide-left", "slide-right"].includes(this.transitionType);
    },
    FLIP() {
      return (
        ["flipEnter", "flipLeave"].includes(this.transitionType) &&
        this.transitionType
      );
    }
  },
  methods: {
    beforeEnter(dom) {
      if (this.SLIDE) {
        let x = this.transitionType === "slide-right" ? "-100%" : "100%";
        dom.style.cssText = `transition: transform ${
          this.SPEED
        }ms;transform: translate(${x}, 0);`;
      }
    },
    enter(dom, done) {
      if (this.SLIDE) {
        requestAnimationFrame(
          function() {
            dom.style.cssText = `transition: transform ${
              this.SPEED
            }ms;transform: translate(0, 0);`;
          }.bind(this)
        );
        //监听 transitionend 事件
        var transitionend = window.ontransitionend
          ? "transitionend"
          : "webkitTransitionEnd";
        dom.addEventListener(transitionend, function onEnd() {
          dom.removeEventListener(transitionend, onEnd);
          done(); //调用done() 告诉vue动画已完成，以触发 afterEnter 钩子
        });
      }

      if (this.FLIP === "flipEnter") {
        var lastReact = dom.getBoundingClientRect();
        console.log(lastReact);
        var Invert = {
          deltax: this.firstReact.left - lastReact.left,
          deltaY: this.firstReact.top - lastReact.top,
          deltaW: this.firstReact.width / lastReact.width
        };
        console.log(Invert);
        //paly
        dom.animate(
          [
            {
              transformOrigin: "top left",
              transform: `translate3d(${Invert.deltax}px,${
                Invert.deltaY
              }px,0) scale(${Invert.deltaW})`,
              borderRadius: "5px"
            },
            {
              transformOrigin: "top left",
              transform: `translate3d(0 ,0, 0) scale(1)`,
              borderRadius: "0"
            }
          ],
          {
            duration: this.SPEED
          }
        ).onfinish = function() {
          console.log("onfinish");
          done(); //调用done() 告诉vue动画已完成，以触发 afterEnter 钩子
        };
      }
    },
    afterEnter(dom) {
      dom.style.cssText = "";
    },
    beforeleave(dom) {
      console.log("out");
      if (this.SLIDE) {
        dom.style.cssText = `transition: transform ${
          this.SPEED
        }ms;transform: translate(0, 0);`;
      }
    },
    leave(dom, done) {
      console.log("out");

      if (this.SLIDE) {
        requestAnimationFrame(() => {
          let slide = ["slide-left", "slide-right"].includes(
            this.transitionType
          );
          if (slide) {
            let x = this.transitionType === "slide-right" ? "100%" : "-100%";
            dom.style.cssText = `transition: transform ${
              this.SPEED
            }ms;transform: translate(${x}, 0);`;
          }
        });
        //监听 transitionend 事件
        var transitionend = window.ontransitionend
          ? "transitionend"
          : "webkitTransitionEnd";
        dom.addEventListener(transitionend, function onEnd() {
          dom.removeEventListener(transitionend, onEnd);
          done(); //调用done() 告诉vue动画已完成，以触发 afterEnter 钩子
        });
      }

      if (this.FLIP === "flipEnter") {
        setTimeout(() => {
          done();
        }, this.SPEED);
      }

      if (this.FLIP === "flipLeave") {
        var lastReact = dom.getBoundingClientRect();
        console.log(lastReact);
        var Invert = {
          deltax: this.firstReact.left - lastReact.left,
          deltaY: this.firstReact.top - lastReact.top,
          deltaW: this.firstReact.width / lastReact.width
        };
        console.log(Invert);
        //paly
        dom.animate(
          [
            {
              transformOrigin: "top left",
              transform: `translate3d(${Invert.deltax}px,${
                Invert.deltaY
              }px,0) scale(${Invert.deltaW})`,
              borderRadius: "5px"
            },
            {
              transformOrigin: "top left",
              transform: `translate3d(0 ,0, 0) scale(1)`,
              borderRadius: "0"
            }
          ],
          {
            duration: this.SPEED,
            direction: "reverse"
          }
        ).onfinish = function() {
          console.log("onfinish");
          done(); //调用done() 告诉vue动画已完成，以触发 afterEnter 钩子
        };
      }
    },
    afterleave(dom) {
      dom.style.cssText = "";
    }
  },
  watch: {
    $route(to, from) {
      if (to.params.filp) {
        var e = to.params.filp;
        var dom = e.getElementsByClassName("data-filpTarget")[0];
        this.firstReact = dom.getBoundingClientRect();
        console.log(this.firstReact);
      }
      // 动画
      if (to.meta.transitionType || from.meta.transitionType) {
        this.transitionType = to.meta.transitionType
          ? "flipEnter"
          : "flipLeave";
      } else {
        if (to.meta.deepth && from.meta.deepth) {
          this.transitionType =
            to.meta.deepth > from.meta.deepth ? "slide-left" : "slide-right";
        }
      }

      console.log("watch $route");
      //是否需要缓存
      if (to.meta.keepAlive) {
        !this.include.includes(to.name) && this.include.push(to.name);
      }
      if (from.meta.keepAlive && to.meta.deepth < from.meta.deepth) {
        var index = this.include.indexOf(from.name);
        index !== -1 && this.include.splice(index, 1);
      }
    }
  }
};
</script>
<style>
/* 路由切换动画 */
.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  will-change: transform;
  transition: transform 350ms;
  position: absolute;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
.slide-right-enter,
.slide-left-leave-active {
  transform: translate(-100%, 0);
}
.slide-right-leave-active,
.slide-left-enter {
  transform: translate(100%, 0);
}
</style>
