<!--
【控制畫面】找不到的網址（404）
【負責功能】顯示找不到頁面的訊息，並提供回首頁與 Works 的連結。
【資料來源】無。
【常見修改】訊息文字：本檔 <template>。
【注意事項】所有未定義的網址都會顯示此頁。
-->
<template>
  <div class="not-found container">
    <p class="eyebrow not-found__code">404</p>
    <h1 class="not-found__title">This page could not be found.</h1>
    <span class="rule-short not-found__rule" aria-hidden="true" />
    <ul class="not-found__links">
      <li><RouterLink to="/" class="eyebrow not-found__link">Home</RouterLink></li>
      <li><RouterLink to="/works" class="eyebrow not-found__link">Works</RouterLink></li>
    </ul>
  </div>
</template>

<style scoped>
.not-found {
  padding-top: calc(10 * var(--u) + 24px);
  padding-bottom: 40px;
}

.not-found__code {
  color: var(--color-muted);
}

.not-found__title {
  margin-top: 16px;
  max-width: 14em;
  font-size: var(--fs-display);
  line-height: 1.12;
}

.not-found__rule {
  margin-top: 32px;
}

.not-found__links {
  display: flex;
  gap: 32px;
  margin-top: 16px;
}

.not-found__link {
  display: inline-flex;
  align-items: center;
  min-height: 44px;
  color: var(--color-text);
}
</style>
