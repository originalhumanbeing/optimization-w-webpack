## Optimization with delight webpack config

#### 1. 번들링 포인트
- `entry/output`별로 파일이 쪼개짐
- Vue.js에서는 Dynamic Import를 통해서 `entry`를 여러 개 작성한 것과 같은 효과를 볼 수 있음
- 단, vue-cli ver.3에서는 번들링을 여러 개로 해놓아도 기본 설정이 prefetch이기 때문에 해당 플러그인을 삭제하는 등의 추가 작업이 필요

#### 2. optimization 포인트
- node_modules도 vendor.js와 같이 빼지 말고 각각 번들링하는 것이 좋다 (설계 포인트), 
단, 이때 공통으로 사용하는 shared vendor는 splitChunks같은 플러그인을 활용해서 묶어줄 것
- 최적화를 이야기할 때 빠지지 않고 code splitting, lazy loading 개념이 나오는데 결국 다 이어지는 이야기다
  - 최초 로딩을 빠르게 하기 위해서 결국 파일 용량을 (특히 js) 줄여야 하는데, 그러기 위해서 code splitting을 통해 번들링하는 파일을 쪼갠다
  - 각 화면에 꼭 필요한 코드대로 쪼개서 그때그때 받기 때문에 최초 로딩때 모든 걸 다 부지런히 가져오는 로딩에 비해 게으르다는 재치있는 표현이 lazy loading.
  - Vue.js에서 이를 가능하게 하는 것이 Dynamic Import.
- 번들링할 포인트들을 잘 정하기 위해서는 webpack dependency graph가 어떻게 그려지는지 기억할 것.

#### 3. options
- mode를 prod, development, local로 나누어 각기 관리할 수 있다
- 개인적으로 유용했던 옵션은 
  - `devtool = source-map`: 에러 발생한 곳을 자세히 볼 수 있음
  
#### 4. plugins
- `CleanWebpackPlugin`: 새로 빌드할 때마다 기재된 폴더를 날려줌, 보통 dist를 달리고 새로 빌드한다
- `HotModuleReplacementPlugin`: 바뀐 내용이 저장될 때마다 화면 리로드해줌
