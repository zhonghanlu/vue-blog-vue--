<template>
  <div>
    <Header></Header>
    <div class="blog">
      <h2>{{ blog.title }}</h2>
      <el-link icon="el-icon-edit" v-if="ownblog">
        <router-link :to="{name:'BlogEdit',params:{blogid:blog.id}}">
          编辑
        </router-link>
      </el-link>
      <el-divider></el-divider>
      <div class="markdown-body" v-html="blog.content"></div>
    </div>
  </div>
</template>

<script>
import 'github-markdown-css'
import Header from "@/components/Header";

export default {
  name: "BlogDetail",
  components: {Header},
  data() {
    return {
      blog: {
        id: '',
        title: "",
        content: ""
      },
      ownblog: false
    }
  },
  created() {
    //获取路由中的blogId
    const blogId = this.$route.params.blogid
    console.log(blogId + "ahfiojabf")
    const _this = this
    if (blogId) {
      this.$axios.get("/blog/blog/" + blogId).then(res => {
        console.log(res)
        const blog = res.data.data
        _this.blog.id = blog.id
        _this.blog.title = blog.title

        let MarkdownIt = require("markdown-it");
        let md = new MarkdownIt()
        let result = md.render(blog.content)
        _this.blog.content = result

        _this.ownblog = (blog.userId === _this.$store.getters.getUser.id)
      })
    }
  }
}
</script>

<style scoped>

</style>