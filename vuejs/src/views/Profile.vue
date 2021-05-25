<template>
  <div class="p-3 profile container">
    <b-card class="mb-3" bg-variant="dark" text-variant="white">
      <b-card-text>
        With supporting text below as a natural lead-in to additional content.
      </b-card-text>
      <div>
        <b-button href="#" variant="primary">Go somewhere</b-button>
      </div>
    </b-card>
    <b-card img-src='https://avataaars.io/?avatarStyle=Circle&topType=LongHairDreads&accessoriesType=Blank&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=Heather&eyeType=Side&eyebrowType=UpDownNatural&mouthType=Disbelief&skinColor=Brown' img-left class="mb-3">
      <b-card-text>
        <div class="profile-header">{{ getUser }}님,</div>
        <hr>
        안녕하세요
      </b-card-text>
    </b-card>
    <div class="d-flex justify-content">
    <div class="profile-body">
      <div class="profile-body-articles">
        <h1 class="profile-body-articles-label">
          {{ getUser }}가 작성한 리뷰
        </h1>
        <div v-if="profileUser.comment" class="profile-body-articles-items">
          <router-link
            v-for="article in profileUser.comment" 
            :key="article.id"
            :to="{ name: 'ArticleDetail', params: { id: article.id, article: article, currentUser: currentUser } }" >
            <div class="profile-body-articles-item" >
              {{ article.title }}
            </div>
          </router-link>
        </div>
        <div v-else class="profile-body-articles-items">
          <h3>아직 작성한 리뷰가 없습니다</h3>
        </div>
      </div>
      <div class="profile-body-like-articles">
        <h1 class="profile-body-like-articles-label">
          {{ getUser }}가 좋아하는 영화
        </h1>
        <div v-if="profileUser.like_articles" class="profile-body-like-articles-items">
          <router-link
            v-for="article in profileUser.like_articles" 
            :key="article.id"
            :to="{ name: 'ArticleDetail', params: { id: article.id, article: article, currentUser: currentUser } }" >
            <div class="profile-body-like-articles-item" >
              {{ article.title }}
            </div>
          </router-link>
        </div>
        <div v-else class="profile-body-like-articles-items">
          <h3>아직 좋아하는 영화가 없습니다</h3>
        </div> 
      </div>
    </div>
    <hr>
    </div>
    
    <div class="p-5">
      <h1>{{ getUser }}님, 이런 영화는 어때요?</h1>
      <div>
        <b-card-group deck class="d-flex">
          <b-card title="Title" img-src="https://picsum.photos/300/300/?image=41" img-alt="Image" img-top>
            <b-card-text>
              This is a wider card with supporting text below as a natural lead-in to additional content.
              This content is a little bit longer.
            </b-card-text>
            <template #footer>
              <small class="text-muted">Last updated 3 mins ago</small>
            </template>
          </b-card>
          <b-card title="Title" img-src="https://picsum.photos/300/300/?image=41" img-alt="Image" img-top>
            <b-card-text>
              This is a wider card with supporting text below as a natural lead-in to additional content.
              This content is a little bit longer.
            </b-card-text>
            <template #footer>
              <small class="text-muted">Last updated 3 mins ago</small>
            </template>
          </b-card>
          <b-card title="Title" img-src="https://picsum.photos/300/300/?image=41" img-alt="Image" img-top>
            <b-card-text>
              This is a wider card with supporting text below as a natural lead-in to additional content.
              This content is a little bit longer.
            </b-card-text>
            <template #footer>
              <small class="text-muted">Last updated 3 mins ago</small>
            </template>
          </b-card>
        </b-card-group>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
// const SERVER_URL = ''
import Vue from 'vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

export default {
  name: 'Profile',
  data() {
    return {
      pageSize: parseInt(1),
      profileUser: {}
    }
  },
  props: {
    currentUser: Object,
    id: [Number, String],
  },
  computed: {
    getUser() {
      return localStorage.getItem("username")
    },
  },
  methods: {
    getProfileUser() {
      axios.get( `/api/v1/accounts/${this.id}`)

        .then(res => {
          this.profileUser = res.data
        })
        .catch(err => console.error(err.response.data))
    }
  },
  created() {
    this.getProfileUser()
  },
}
</script>

<style>
.profile {
  font-family: 'Nanum Gothic', sans-serif;
}

.profile-header {
  font-family: 'Overpass';
  font-size: 16px;
  text-align: center;
}

.profile-body {
  margin-top: 15px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}

.profile-body-articles-label,
.profile-body-like-articles-label {
  text-align: center;
}

.profile-body-articles-items,
.profile-body-like-articles-items {
  padding: 5px;
}

.profile-body-articles-item,
.profile-body-like-articles-item {
  margin: 10px 5px;
  padding: 10px;
  background-color: #535c68;
  border: 1px solid #535c68;
  border-radius: 10px;
  color: #fcfcfc;
  font-size: 14px;
  box-shadow: 3px 3px 3px gainsboro;
  white-space: pre;
  position: relative;
}

.profile-body-like-articles-item {
  background-color: #fcfcfc;
  color: #535c68;
}

/* media */
@media screen and (min-width: 576px) { 
  .profile {
    font-size: 24px;
    margin: 30px auto 0;
  }

  .profile-header {
    font-family: 'Overpass', sans-serif;;
    font-size: 36px;
    text-align: center;
  }

  .profile-body {
    margin-top: 30px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }

  .profile-body-articles-item,
  .profile-body-like-articles-item {
    padding: 10px 15px;
    color: #fcfcfc;
    font-size: 18px;
  }

  .profile-body-like-articles-item {
    background-color: #fcfcfc;
    color: #535c68;
  }
}

@media screen and (min-width: 992px) { 
  .profile {
    font-size: 32px;
    margin: 30px auto 0;
  }

  .profile-header {
    font-size: 44px;
  }

  .profile-body-articles-item,
  .profile-body-like-articles-item {
    padding: 20px 30px;
    color: #fcfcfc;
    font-size: 24px;
  }

  .profile-body-like-articles-item {
    background-color: #fcfcfc;
    color: #535c68;
  }
}


</style>