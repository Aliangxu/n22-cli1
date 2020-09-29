<template>
  <div class="download-index">
    <div v-if="isWeiXin()">
      <img src="../assets/images/icon_down_in_wechar.png" width="100%" />
    </div>
    <div v-else>
      <img class="down_bg_img" src="../assets/images/download_bg.png" />
      <div class="down_content_buttons">
        <div class="buttons">
          <div v-if="andriod.andriod_URL != undefined && andriod.andriod_URL != ''">
            <button class="button" @click.capture="download(andriod.andriod_URL)">
              <img src="../assets/images/icon_android.png" alt="" />
              <div class="col col-text"><span>Android下载</span></div>
            </button>
          </div>
          <div v-if="IOS.IOS_URL != undefined && IOS.IOS_URL != ''">
            <button class="button" @click="download(IOS.IOS_URL)">
              <img src="../assets/images/icon_ios.png" alt="" />
              <div class="col col-text"><span>iPhone下载</span></div>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//接口调用导入
import { findAppVersion } from "../service/api";
import utils from "@@/utils";
export default {
  name: "download-index",
  mounted() {
    if (!this.isWeiXin()) {
      findAppVersion({ method: "get" }).then(
        ({ data: { IOS, andriod } }) => {
          const _andriod = andriod;
          const _IOS = IOS;
          console.log("==IOS==>", _IOS);
          console.log("==andriod==>", _andriod);
          // 通过接口获取版本信息
          this.andriod = {
            andriod_versionNo: _andriod.versionNo,
            andriod_URL: _andriod.url,
            andriod_desc: _andriod.desc,
            andriod_date: _andriod.date,
          };
          this.IOS = {
            IOS_versionNo: _IOS.versionNo,
            IOS_URL: _IOS.plistUrl,
            IOS_desc: _IOS.desc,
            IOS_date: _IOS.date,
          };
        },
        error => {
          utils.ui.toast({
            message: error,
            position: "bottom",
            duration: 3000,
          });
        },
      );
    }
  },
  data() {
    return {
      IOS: {
        IOS_URL: "",
      },
      andriod: {
        andriod_URL: "",
      },
    };
  },
  methods: {
    isWeiXin() {
      let ua = window.navigator.userAgent.toLowerCase();
      if (ua.match(/MicroMessenger/i) == "micromessenger") {
        return true;
      } else {
        return false;
      }
    },
    download(url) {
      location.href = url;
      return;
    },
  },
};
</script>

<style lang="scss" scoped>
.download-index {
  -moz-user-select: -moz-none;
  -moz-user-select: none;
  -o-user-select: none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
  .down_bg_img {
    z-index: 1;
    width: 100%;
    height: 100%;
    display: block;
  }
  .down_content_buttons {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0px;
    .buttons {
      width: 70%;
      position: fixed;
      text-align: center;
      z-index: 10;
      bottom: 12%;
      left: 15%;
      .button {
        margin-bottom: 20px;
        padding: 0 12px;
        border: #fff 1px;
        border-radius: 6px;
        min-height: 60px;
        color: #ffb227;
        background: #fff;
        width: 100%;
        outline: none;
        display: flex;
        .col-text {
          font-size: 0.5rem;
          width: 80%;
          float: left;
        }
        .col {
          height: 50px;
          line-height: 50px;
          white-space: nowrap;
          display: inline-block;
        }
        span {
          font-size: 1.4rem;
        }
      }
      .button.disabled,
      .button:active,
      .button[disabled] {
        color: #ffb227;
      }
    }
  }
}
</style>
