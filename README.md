# Final Project - Show your movie

![](./design/logo_black.png)

![Langueage](https://img.shields.io/badge/python-v3.8.7-important) ![JS](https://img.shields.io/badge/JS-ES6-important) ![node](https://img.shields.io/badge/node-v12.7.0-important) ![vue](https://img.shields.io/badge/vue-@vue/cli/4.4.1-important) ![API](https://img.shields.io/badge/API-2-lightgrey) ![language](https://img.shields.io/badge/language-korean-red) ![movie](https://img.shields.io/badge/movie-tmdb-green) ![video](https://img.shields.io/badge/video-youtube-green)



## 🔖INDEX

#### Introduction

- What is SGmovies?
- ERD
- UI Design



#### Features

- Movie.json
- Sign up/Login
- Movie filter & Search
- Comment
- Trail
- Profile
- Recommend



#### Documents

- Docs
- Issues





## 🎬What is SGmovies?

> **영화 목록 / 검색 / 영화 추천 / 평점 / 리뷰 댓글** 기능을 더한 영화 데이터 서비스를 제공해주는 프로젝트입니다.

- 재미있게 본 영화를 골라서 새로운 영화를 추천받으세요.
- 영화에 대한 평점과 한줄평도 남겨보세요.

![전체 도식도](./design/structure_guide.png)



## 📝ERD structure

*draw.io 사용*

![](./design/ERD.png)



## 🎨UI Design

*Figma 사용*

1. 회원가입/로그인 페이지

![](./design/UI_1.png)

2. 프로필 페이지

![](./design/UI_3.png)

3. 메인 페이지

![](./design/UI_2.png)

4. 영화 상세 페이지

![](./design/UI_4.png)

![](./design/UI_5.png)

![](./design/UI_6.png)

5. 코멘트 입력창 페이지

![](./design/UI_7.png)



## 🔧Features

### 1. Movie.json(Movie 데이터 가져오기)

영화 정보는 [TMDb](https://www.themoviedb.org/?language=ko), [kaggle](https://www.kaggle.com/)에서 받아왔으며, Movie 모델 class의 field가 들어갈 수 있도록 작성하였습니다. 

data를 가져오기 위해 `requests`패키지를 통해 API Server로 요청후, python으로 json파일을 만들었으며, for과 if를 사용하여 모델링 구조에 맞췄습니다.

```python
for i in range(0,len(id_lst)):
    URL = f'{url}/{category}/{id_lst[i]}?api_key={key}&language=ko-KR'
    res = requests.get(URL)
    res = res.json()
    
    if res.get('overview') and res.get('genres'):
        tmp = {}
        tmp2 = {}
        tmp['model'] = 'movies.movie'
        tmp['pk'] = i + 1
        tmp2['title'] = res['title']
        tmp2['original_title'] = res['original_title']
        tmp2['overview'] = res['overview']
        tmp2['language'] = res['original_language']
        tmp2['poster'] = f'https://www.themoviedb.org/t/p/original/{res["poster_path"]}'
        tmp2['genres'] = ''
        genres_tmp = []
        for i in res['genres']:
            genres_tmp.append(i['name'])
        tmp2['genres'] = ' '.join(genres_tmp)
        tmp2['runtime'] = res['runtime']
        tmp2['release_date'] = res['release_date']
        tmp2['vote_average'] = res['vote_average']
        tmp2['vote_count'] = res['vote_count']
        tmp['fields'] = tmp2

        movie_lst.append(tmp)
```

이렇게 출력한 `movie.json`은 백엔드에서 사용될 것이므로 `movies.app/fixtures/movies`안에 넣어주고 django에서 `loaddata`해줍니다.

```bash
✨DB 반영
$ python manage.py loaddata data/moviedata.json
```



### 2. Sign up/Login

사용자에게 입력 데이터를 받아 백엔드 서버로 전송하여 회원가입과 로그인 과정을 완료합니다.

#### 01 - Sign up(Backend)

ERD와 동일하게 모델링을 완성하였으면 User serialize를 진행해줍니다.  회원가입 절차가 진행될 수 있도록 url을 만들어줍니다.

```python
urlpatterns = [
    path('signup/', views.signup),
]
```

회원가입의 로직은 views.py 에 작성하였습니다. 로직의 주요 내용은 다음과 같습니다.

1. 비밀번호(password) / 비밀번호 확인(password confirmation)에 사용자가 입력한 값 저장
2. 만약 비밀번호와 비밀번호 확인의 값이 다르면 400 state 코드를 보내줍니다.
3. 그렇지 않다면 직렬화 해준뒤, User 값을 저장해줍니다.
4. 이때, user가 좋아하는 영화 목록도 테이블을 생성해줍니다.

```python
@api_view(['POST'])
def signup(request):
    password = request.data.get('password')
    password_confirmation = request.data.get('password_confirmation')

    if password != password_confirmation:
        return Response(status=status.HTTP_400_BAD_REQUEST)

    serializer = UserSerializer(data=request.data)
    if serializer.is_valid(raise_exception=True):
        user = serializer.save()
        user.set_password(request.data.get('password'))
        user.save()
        Userlike(user=user).save() 
        return Response(data=serializer.data)
```

모든 return은 response로 보내줍니다.



#### 02 - Sign up(Frontend)

탬플릿에서 DB에 저장되어야 하는 값들인 Username, Email, Password, Password Confirmation의 값을 받아옵니다. `v-if`를 사용하여 만약 정상 회원가입이 되면, 안내문구가 뜹게 해줍니다.

user의 데이터는 store에 저장해주도록 합니다. User 정보를 저장해주는 mutation을 만들어 input 데이터를 받게 되면 이를 사용하여 Django server로 데이터를 전송해줍니다.

```javascript
// store에서 Userinfo 데이터를 다루기 위한 getters
getUserCreateStatus(state) {
    return state.userCreateStatus
},

// user 정보를 저장해주는 mutation
CREATE_USER(state, userCreateData) {
    state.userInfo = userCreateData.userInfo
    state.userCreateStatus = userCreateData.status
},
```

사용된 코드들은 위와 같습니다.



#### 03  - Login(Backend)

로그인 정보를 넘기기 위해서 JWT Token을 사용하였습니다. 토큰에 user정보와 함께 인증 정보가 담겨서 server-client를 오가게 만들었습니다.

```python
urlpatterns = [
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
]
```

토큰을 보내주는 login url을 만들어줬습니다. client에서 이 url을 사용하여 server에 요청을 보낼 때, 자동으로 토큰이 함께 보내지게 됩니다.

```javascript
async AUTH_USER({ commit }, userInfo) {
    const AUTH_USER_URL = '/api/token/'
    const data = userInfo
    const response = await axios.post(AUTH_USER_URL, data)

    const token = response.data.access
    const payload = {'username': userInfo.username, 'token': token}
    localStorage.setItem('token', token)
    commit('AUTH_USER', payload)
},
```

토큰의 정보를 보내주는 기능은 actions에 작성해주었습니다. 토큰은 local storage에 저장해주었으며, 사용시 계속 불러올 것입니다.



#### 04 - Login(Frontend)

사용자에게 input 데이터로 username, password를 받아줍니다. 로그인 버튼을 누르면 클릭 이벤트가 발생하게 되고 토큰과 함께 서버에 요청을 보내게 됩니다.

```javascript
methods: {
    onSubmit() {
        this.$store.dispatch('AUTH_USER', this.userInfo)
        this.$router.push('/')
    }
}
```

로그인 버튼 클릭 이벤트는 `onSubmit`으로 작성하였습니다. 이벤트가 실행되면 actions의 `AUTH_USER`가 작동하여 로그인이 실행됩니다.



### 3. Movie filter & Search



### 4. Comment

코멘트를 작성하는 공간은 영화 디테일 모달에 있습니다.

![comment modal](./design/comment1.png)

여기서 코멘트 작성을 위한 아이콘을 누르면 ModalView에서 Comment 컴포넌트로 넘어가게 됩니다. 즉, 위의 이미지는 Comment 컴포넌트 화면입니다.

![comment modal2](./design/comment2.png)

댓글을 작성하면 위와 같이 작성된 코멘트가 username과 함께 나타납니다.



#### 01 - Backend

코멘트 모델 class는 위의 [ERD](./design/ERD.png)와 같습니다. 또한 comment 컴포넌트에서 보여지는 동작은 두가지 입니다.

1. 해당 영화에 작성된 코멘트 보여주기
2. 코멘트 작성하기

코멘트를 작성하는 경우 하위 컴포넌트인 Comment Modal로 넘어갑니다. 

그리고 프로필에서 코멘트를 수정 및 삭제하는 기능이 있기 때문에 코멘트 수정 기능 동작도 요구됩니다.

따라서 위의 네 동작을 위해 필요한 함수들을 views.py에서 작성합니다.



##### 1) 코멘트 보여주기

코멘트를 보여주기 위해서는 DB에 저장된 모든 코멘트 정보를 가져와야합니다. 해당 영화에 작성된 코멘트들을 보여줄 것이므로 movie id 정보를 받아옵니다.

영화 내의 코멘트 정보들을 모두 가져온 뒤, 한 페이지에 4개씩 보이도록 작성해줍니다. 

```python
@api_view(['GET'])
def comment_list(request, movie_id):
    comments = Comment.objects.filter(movie_id=movie_id).order_by('-pk')
    
    paginator = Paginator(comments, 4)

    page = request.GET.get('page')
    comments = paginator.get_page(page)

    serializer = CommentSerializer(comments, many=True)
    return Response(data=serializer.data)
```



##### 2) 코멘트 작성하기

코멘트 작성에는 영화 정보, user 정보, 코멘트 내용, 평점이 필요합니다.  따라서 필요한 정보를 사용자에게서 받아 저장해줍니다. serializer에서 user와 movie 정보는 Read Only로 설정하였기 때문에  view.py 내에서 또 다시 해줄 필요가 없습니다. 따라서 데이터 객체를 만들어 DB에 담을 content, rank, username을 저장해준 뒤, serialize하여 DB에 저장해줍니다.

```python
@api_view(['POST'])
def create_comment(request):
    movie_id = request.data.get('movieId')
    username = request.data.get('userId')
    content = request.data.get('comment')
    rank = float(request.data.get('rank'))

    movie = get_object_or_404(Movie, id=movie_id)
    user = get_object_or_404(get_user_model(), username=username)
    data = {
        'content': content,
        'rank': rank,
        'username': username,
    }
    
    serializer = CommentSerializer(data=data)
    if serializer.is_valid(raise_exception=True):
        # 댓글 정보 영화에 저장
        comment = serializer.save(movie=movie, user=user)
        return Response(data=serializer.data)
```



##### 3) 코멘트 수정 및 삭제

수정과 삭제는 요청 방식에 따라 동작이 바뀌게 됩니다. 만약 PUT method로 들어오면 수정, DELETE method로 들어오면 삭제를 하게 됩니다.

comment를 판별하기 위해 pk를 요청과 함께 받아와줍니다. 이제 요청에 따라 동작을 나누는데 delete일 경우 데이터를 삭제해주고 삭제되었다는 메세지를 보내줍니다.

put의 경우, 직렬화를 시켜준 수정 된 내용이 담기게 됩니다. 따라서 input의 내용을 다시 serialize를 해준 뒤, 유효성 검사를 통과하면 저장이 되도록 합니다.



#### 02 - Frontend

코멘트 작성 / 수정 / 삭제 / 읽기 를 위한 모든 동작을 위해 mutation과 action을 사용하였습니다. Comment Modal 페이지에서 코멘트를 새로 작성하게 되면, `CREATE_COMMENT`, 읽기 위해 가져오려면 `GET_MOVIE_COMMENT`을 사용합니다.

```javascript
// ✨ 코멘트 작성

async CREATE_COMMENT({ commit }, comments){
    const COMMENT_CREATE_URL = '/api/v1/movies/createcomments/'
    const data = comments
    const response = await axios.post(COMMENT_CREATE_URL, data)
    const commentCreateData = {
        'comments': response.data,
    }
    commit('CREATE_COMMENT', commentCreateData)
},
    
// ✨코멘트 가져오기
async GET_MOVIE_COMMENT({ commit }, payload) {
    const movie_id = payload.movie_id
    const page = payload.page
    const GET_COMMENT_URL = `/api/v1/movies/${movie_id}/comments/?page=${page}`
    const response = await axios.get(GET_COMMENT_URL)
    commit('GET_MOVIE_COMMENT', response.data)
},
```

각각의 url을 만들어 actions을 통해 호출해 줍니다.



Comment 삭제는 Profile컴포넌트의 하위로 들어있는 Profile Movie List Item 컴포넌트에서 할 수 있습니다. 댓글 삭제의 경우 comment를 props로 받아와야합니다. 삭제 버튼을 누르면 이벤트와 함께 `DELETE_COMMENT` 액션을 실행하도록 합니다.

```javascript
async DELETE_COMMENT({ commit }, comment) {
    const COMMENT_DELETE_URL = `/api/v1/movies/comments/${comment.id}/`
    let response = await axios.delete(COMMENT_DELETE_URL)
    response = comment
    commit('DELETE_COMMENT', response)
},
```



Comment 수정은 Profile Movie List Item 컴포넌트의 하위로 들어있는 Comment Update Modal 컴포넌트에서 할 수 있습니다. 댓글 수정의 역시 comment를 props로 받아와야합니다. 수정완료를 누르면 `UPDATE_COMMENT`가 동작하게 됩니다.

```javascript
async UPDATE_COMMENT({ commit }, comments) {
    const COMMENT_UPDATE_URL = `/api/v1/movies/comments/${comments.id}/`
    const response = await axios.put(COMMENT_UPDATE_URL,comments)
    console.log(response)
    commit('UPDATE_COMMENT')
},
```



작성한 댓글을 확인을 위해 프로필 페이지에 들어가면,

![](./design/comment3.png)

이런 페이지가 뜨게 되고, 삭제를 누르면 댓글이 삭제됨과 동시에 리스트에서 영화도 사라집니다.

![](./design/comment4.png)

수정을 누르면 위와 같은 모달이 뜨게 됩니다.



### 5. Trail

영화 상세 페이지 모달의 동영상 버튼을 누르면 Modal Trail 컴포넌트로 바뀌게 됩니다.

![](./design/trail.png)

위와 같이 영화 예고편이 뜨는 기능입니다.



예고편은 iframe을 사용하여 나타내도록 하였습니다. 유튜브에서 영상을 받아오기 위해 API key와 URL이 필요합니다. 영화 제목을 검색했을 때, 영상을 가져올 것이므로 Movie data를 props로 받아옵니다.

데이터 베이스를 변경할 것이 없기 때문에 현재 컴포넌트에서 해결이 완료되도록 하였습니다. 우선, 영화 제목에 "공식 예고편"이라는 단어를 붙여줍니다. 그리고 유튜브 API에서 요청하는 정보들을 담아 URL을 만들어주도록 합니다. 이때 사용한 함수가 `await axios.get()`인데, 자동으로 요청 URL을 담아줄 것입니다.

비디오 리스트에 가져온 항목들을 담아주고, 첫 번째 동영상을 출력하도록 했습니다.

```javascript
import axios from 'axios'


const YOUTUBE_API_KEY = 'AIzaSyBCNyVF3W6jLT2rmdc5du7hHM-dXJWAoPg'
const YOUTUBE_API_URL = 'https://www.googleapis.com/youtube/v3/search'

export default {
  name: 'ModalTrail',
  props: {
    movie: {
      type: Object,
      required: true,
    }
  },
  data(){
    return {
      videoList: ''
    }
  },

  methods: {
    async searchVideo() {
      const keyword = '공식 예고편 ' + this.movie.title
      const config = {
        params: {
          part: 'snippet',
          type: 'video',
          q: keyword,
          key: YOUTUBE_API_KEY
        }
      }
      const response = await axios.get(YOUTUBE_API_URL, config)
      this.videoList = response.data.items
    },
  },
  created() {
    this.searchVideo()
  },
  computed: {

    videoUrl() {
      const videoId = this.videoList[0].id.videoId
      return `https://www.youtube.com/embed/${videoId}`
    },
  },
}
```



동영상 스타일은 bootstrap을 적극 사용하였습니다.



### 6. Profile

프로필 페이지에서의 동작들은 아래와 같습니다.

- 계정의 dropdown에 있는 profile을 통해 본인의 프로필 페이지로, 이동할 수 있습니다.
- 추가적으로 랜덤 추천 기능을 구현하였습니다. 버튼을 누르면 랜덤으로 사용자에게 추천 영화를 보여줍니다.
- Profile 페이지에서는 해당 유저가 리뷰를 작성한 영화들과 리뷰들 중 가장 최근에 작성한 글을 보여줍니다. 이때 영화 포스터를 클릭하면 해당 영화의 모달 페이지로 이동합니다.

#### 01 - Refactoring

Vuex앱의 구조가 크게 복잡하지 않다고 판단하여 `props & emit` 을 통해 페이지 혹은 컴포넌트 간 정보를 주고 받도록 구현했습니다. 

유저 관련 기능 중에 찜한 정보를 프로필 페이지에서 구현하고자 했으나, 모델 설정을 잘 못해서 결국 하지 못했습니다. 다시 한 번 처음 모델 관계 설정을 잘 해야함을 느낄 수 있었습니다. Vuex 를 통해 정보를 중앙화한다면 더 간단하게 전체 기능을 구현할 수 있을 것 같습니다.



### 7. Recommend







## 📃Documents

### 📜Docs

- [Getting Started | BootstrapVue (bootstrap-vue.org)](https://bootstrap-vue.org/docs)
- [.data() | jQuery API Documentation](https://api.jquery.com/data/)
- [Bootstrap · The most popular HTML, CSS, and JS library in the world. (getbootstrap.com)](https://getbootstrap.com/)
- https://github.com/surmon-china/vue-awesome-swiper
- [롯데시네마](lottecinema.co.kr)



### 💬Issues

#### Timeline

> 개발 기간: 20/05/2021 ~ 28/05/2021



#### Contributor

| 이름   | 역할분담           |
| ------ | ------------------ |
| 고선영 | FrontEnd repo      |
| 박효진 | BackEnd repo       |
| 최창영 | FrontEnd + BackEnd |
