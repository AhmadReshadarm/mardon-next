export const YandexMetrics = () => {
  return `
<!-- Yandex.Metrika counter -->
<script defer type="text/javascript" >
   (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
   m[i].l=1*new Date();
   for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
   k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
   (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

   ym(96632717, "init", {
        clickmap: true,
        trackLinks: true,
        ecommerce: true,
        webvisor: true,
        accurateTrackBounce: true,
        childIframe: true,
        trackHash: true,
        triggerEvent: true,
   });
</script>
<noscript><div><img src="https://mc.yandex.ru/watch/96632717" style="position:absolute; left:-9999px;" alt="" /></div></noscript>
<!-- /Yandex.Metrika counter -->
    `;
};
