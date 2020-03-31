<template>
  <div detail
       style="background: #fff;">
    <div class="detail-top theme-bg">
      <span style="font-size: 30px;"
            v-text="$route.params.id"></span>
    </div>
    <div class="mid">
      <div class="detail-info theme-bg"
           style="width: 80%;"></div>
      <div class="detail-info theme-bg"></div>
      <div class="detail-info theme-bg"
           style="width: 40%;"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "detail"
};
</script>
<style>
.mid {
  overflow: auto;
}
.detail-info {
  opacity: 0;
  animation: slideup 0.3s forwards;
  animation-delay: 0.15s;
}
.detail-info:nth-child(2) {
  animation-delay: 0.35s;
}
.detail-info:nth-child(3) {
  animation-delay: 0.5s;
}
@keyframes slideup {
  0% {
    opacity: 0;
    transform: translateY(100%);
  }
  100% {
    opacity: 1;
    transform: translateY(0%);
  }
}
</style>
