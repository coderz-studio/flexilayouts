// src/frontend/index.js
import initCarouselLayouts from './carousel';
import initMasonryLayouts from './masonry';

document.addEventListener('DOMContentLoaded', () => {
    initCarouselLayouts();
    initMasonryLayouts();
});
