const mix = require('laravel-mix');

mix.disableNotifications();
mix.setPublicPath('public');

// Disable mix-manifest.json
Mix.manifest.refresh = _ => void 0;

mix.disableNotifications();

mix.sass('src/sass/vendor.scss', 'public/css/vendor.css').version();
mix.sass('src/sass/app.scss', 'public/css/app.css').version();

mix.js('src/js/app.js', 'js').extract([
    'vue', 'vuex'
]).vue()

