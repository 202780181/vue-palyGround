<template>
  <div class="body" index>
    <div class="tab flex">
      <span v-for="tab in tabs"
            v-text="tab"
            :key="tab"
            class="tab-item flex-1"></span>
    </div>
    <div class="swiper theme-bg"></div>
    <h3>推荐</h3>
    <div class="flex flex-wrap justify-sb">
      <div @click="$router.push({name:'list'})"
           v-for="n in 6"
           :key="n"
           class="cover-item theme-bg"
           hoverclass="hoverclass"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "index",
  data: () => ({
    tabs: ["我的", "发现", "朋友", "视频"]
  })
};
</script>
