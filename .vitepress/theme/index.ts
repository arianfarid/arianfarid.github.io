import DefaultTheme from 'vitepress/theme'
import Article from './Article.vue'

export default {
  extends: DefaultTheme,
  // override the Layout with a wrapper component that
  // injects the slots
  Layout: Article,
//   enhanceApp({ app }) {
//     // register your custom global components
//     app.component('MyGlobalComponent' /* ... */)
//   }
// enhanceApp({ app }) {
//     app.component('article', Article)
//   }
}