<template>
  <div class="user-activity">
    <div class="post">
      <div class="user-block">
        <img class="img-circle" :src="'https://wpimg.wallstcn.com/57ed425a-c71e-4201-9428-68760c0537c4.jpg'+avatarPrefix">
        <span class="username text-muted">钢铁侠</span>
        <span class="description">分享了一条说说  - 今天 7:30 PM</span>
      </div>
      <p>
        有位名人曾经说过，”我们创造来了自己的恶魔。”究竟是谁说的？这意味着什么？并不重要。
        因为他说了，我也说了。所以，既然他很出名，现在，那么这句话就有两个名人说过了。
      </p>
      <ul class="list-inline">
        <li>
          <span class="link-black text-sm">
            <i class="el-icon-share" />
            Share
          </span>
        </li>
        <li>
          <span class="link-black text-sm">
            <svg-icon icon-class="like" />
            Like
          </span>
        </li>
      </ul>
    </div>
    <div class="post">
      <div class="user-block">
        <img class="img-circle" :src="'https://wpimg.wallstcn.com/9e2a5d0a-bd5b-457f-ac8e-86554616c87b.jpg'+avatarPrefix">
        <span class="username text-muted">美国队长</span>
        <span class="description">分享了一条格言  - 昨天</span>
      </div>
      <p>
        因为强者的力量与生俱来，他们失去了对力量的敬畏。而弱者才懂得力量的价值，才会有爱心，才得怜悯。
        永远也别忘了你是谁，不要当一个好士兵，而要当一个好人。
      </p>
      <ul class="list-inline">
        <li>
          <span class="link-black text-sm">
            <i class="el-icon-share" />
            Share
          </span>
        </li>
        <li>
          <span class="link-black text-sm">
            <svg-icon icon-class="like" />
            Like
          </span>
        </li>
      </ul>
    </div>
    <div class="post">
      <div class="user-block">
        <img class="img-circle" :src="'https://wpimg.wallstcn.com/fb57f689-e1ab-443c-af12-8d4066e202e2.jpg'+avatarPrefix">
        <span class="username">蜘蛛侠</span>
        <span class="description">分享了四张照片  - 2天前</span>
      </div>
      <div class="user-images">
        <el-carousel :interval="6000" type="card" height="220px">
          <el-carousel-item v-for="item in carouselImages" :key="item">
            <img :src="item+carouselPrefix" class="image">
          </el-carousel-item>
        </el-carousel>
      </div>
      <ul class="list-inline">
        <li><span class="link-black text-sm"><i class="el-icon-share" /> Share</span></li>
        <li>
          <span class="link-black text-sm">
            <svg-icon icon-class="like" /> Like</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
const avatarPrefix = '?imageView2/1/w/80/h/80'
const carouselPrefix = '?imageView2/2/h/440'

export default {
  data() {
    return {
      carouselImages: [
        'https://wpimg.wallstcn.com/9679ffb0-9e0b-4451-9916-e21992218054.jpg',
        'https://wpimg.wallstcn.com/bcce3734-0837-4b9f-9261-351ef384f75a.jpg',
        'https://wpimg.wallstcn.com/d1d7b033-d75e-4cd6-ae39-fcd5f1c0a7c5.jpg',
        'https://wpimg.wallstcn.com/50530061-851b-4ca5-9dc5-2fead928a939.jpg'
      ],
      avatarPrefix,
      carouselPrefix
    }
  }
}
</script>

<style lang="scss" scoped>
.user-activity {
  .user-block {

    .username,
    .description {
      display: block;
      margin-left: 50px;
      padding: 2px 0;
    }

    .username{
      font-size: 16px;
      color: #000;
    }

    :after {
      clear: both;
    }

    .img-circle {
      border-radius: 50%;
      width: 40px;
      height: 40px;
      float: left;
    }

    span {
      font-weight: 500;
      font-size: 12px;
    }
  }

  .post {
    font-size: 14px;
    border-bottom: 1px solid #d2d6de;
    margin-bottom: 15px;
    padding-bottom: 15px;
    color: #666;

    .image {
      width: 100%;
      height: 100%;

    }

    .user-images {
      padding-top: 20px;
    }
  }

  .list-inline {
    padding-left: 0;
    margin-left: -5px;
    list-style: none;

    li {
      display: inline-block;
      padding-right: 5px;
      padding-left: 5px;
      font-size: 13px;
    }

    .link-black {

      &:hover,
      &:focus {
        color: #999;
      }
    }
  }

}

.box-center {
  margin: 0 auto;
  display: table;
}

.text-muted {
  color: #777;
}
</style>
