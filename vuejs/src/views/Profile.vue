<template>
  <div class="profile container">
    <div class="profile-header">{{ profileUser.username }}'s Page</div>
    <div class="profile-body">
      <div class="profile-body-articles">
        <h1 class="profile-body-articles-label">
          {{ profileUser.username }}가 작성한 리뷰
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
          <h1>아직 작성한 리뷰가 없습니다</h1>
        </div>
      </div>
      <div class="profile-body-like-articles">
        <h1 class="profile-body-like-articles-label">
          {{ profileUser.username }}가 좋아하는 리뷰
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
          <h1>아직 좋아하는 리뷰가 없습니다</h1>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

const SERVER_URL = 'https://finprojectapi.herokuapp.com'

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
  methods: {
    getProfileUser() {
      axios.get(SERVER_URL + `/api/v1/accounts/${this.id}`)
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