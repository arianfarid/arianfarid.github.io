import DefaultTheme from 'vitepress/theme'
import Article from './Article.vue'
import PostList from './PostList.vue'
import './custom.css'
import './grain.css'

export default {
  extends: DefaultTheme,
  Layout: Article,
  enhanceApp({ app }) {
    app.component('PostList', PostList)
  },
//   enhanceApp({ app }) {
//     // register your custom global components
//     app.component('MyGlobalComponent' /* ... */)
//   }
// enhanceApp({ app }) {
//     app.component('article', Article)
//   }
}