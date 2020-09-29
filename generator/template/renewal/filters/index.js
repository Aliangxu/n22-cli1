export const numberToChinese = function(val, beginIndex, endIndex) {
  let numberToChineseUtils = {
    units: "个十百千万@#%亿^&~",
    chars: "零一二三四五六七八九",
    /*
          数字转中文
          @number {Integer} 形如123的数字
          @return {String} 返回转换成的形如 一百二十三 的字符串
        */
    ToChinese: function(number) {
      var a = (number + "").split(""),
        s = [],
        t = this;
      if (a.length > 12) {
        throw new Error("too big");
      } else {
        for (var i = 0, j = a.length - 1; i <= j; i++) {
          if (j == 1 || j == 5 || j == 9) {
            //两位数 处理特殊的 1*
            if (i == 0) {
              if (a[i] != "1") s.push(t.chars.charAt(a[i]));
            } else {
              s.push(t.chars.charAt(a[i]));
            }
          } else {
            s.push(t.chars.charAt(a[i]));
          }
          if (i != j) {
            s.push(t.units.charAt(j - i));
          }
        }
      }
      //return s;
      return s
        .join("")
        .replace(/零([十百千万亿@#%^&~])/g, function(m, d, b) {
          //优先处理 零百 零千 等
          b = t.units.indexOf(d);
          if (b != -1) {
            if (d == "亿") return d;
            if (d == "万") return d;
            if (a[j - b] == "0") return "零";
          }
          return "";
        })
        .replace(/零+/g, "零")
        .replace(/零([万亿])/g, function(m, b) {
          // 零百 零千处理后 可能出现 零零相连的 再处理结尾为零的
          return b;
        })
        .replace(/亿[万千百]/g, "亿")
        .replace(/[零]$/, "")
        .replace(/[@#%^&~]/g, function(m) {
          return {
            "@": "十",
            "#": "百",
            "%": "千",
            "^": "十",
            "&": "百",
            "~": "千",
          }[m];
        })
        .replace(/([亿万])([一-九])/g, function(m, d, b, c) {
          c = t.units.indexOf(d);
          if (c != -1) {
            if (a[j - c] == "0") return d + "零" + b;
          }
          return m;
        });
    },
  };
  let showVal = "";
  if (beginIndex && endIndex) {
    console.log("%c val.substring(beginIndex,endIndex)", "color:green;", val.substring(beginIndex, endIndex));
    showVal = val.substring(0, beginIndex) + numberToChineseUtils.ToChinese(val.substring(beginIndex, endIndex));
  } else {
    showVal = numberToChineseUtils.ToChinese(val);
  }
  return showVal;
};

require("@t/Format");
import __flatDateStr from "@t/flatDateStr";
export const showAddon = function(item) {
  if (item.historyType === "0") {
    //续期任务
  } else if (item.historyType === "1") {
    //挽单任务历史
  } else if (item.historyType === "2") {
    //服务历史
    if (item.paywish) {
      //愿意缴费
      return `预计${new Date(__flatDateStr(item.payplandate)).Format("yyyy年MM月dd日")}缴费`;
    } else {
      //保单服务
      if (item.nopayreason.indexOf("10") > -1 || item.paytype == "无法联系") {
        //客户无法联系
        return "客户无法联系";
      } else if (item.nopayreason.indexOf("12") > -1) {
        //客户无法联系
        return "发送服务短信";
      } else if (item.nopayreason.indexOf("13") > -1) {
        //客户不愿缴费
        return "提醒变更账户";
      } else {
        //客户不愿缴费
        return "客户不愿缴费";
      }
    }
  }
};

// 值替换过滤 eg:将13434444444   =>  134****4444
export const valueReplace = function(value, a = 3, b, c = 4, d = "*") {
  if (value && value.length > a + c) {
    const bls = b || value.length - a - c;
    // console.log("%c aaaaaaaaaaaaaaa", "color:green;", a + "-" + b + "-" + c + "-" + d);
    let rule = eval("/([\\d\\D]{" + a + "})[\\d\\D]{" + bls + "}([\\d\\D]{" + c + "})/");
    // console.log("%c >>>>>>>>>>>>>>>> valueReplace-rule", "color:green;", rule);
    let fill = d;
    if (a == 3 && b == 4 && c == 4 && d == "*") {
      fill = "****";
    } else if (d.indexOf("!") > -1) {
      fill = d.replace("!", "");
    } else {
      for (let i = 1; i < bls; i++) {
        fill += d;
      }
    }
    // if (isNaN(value)) {
    //   let va = "";
    //   value.length > a ? (va = value.substr(0, a) + fill + value.substr(a + bls, value.length)) : (va = value);
    //   return va;
    // }
    let rep = "$1" + fill + "$2";
    value = value.replace(rule, rep);
  }
  return value;
};

export const doPrecision = function(value, precision = 2, isRoundUp = true, zeroText = "-") {
  if (zeroText && !value) {
    // console.log('%c this.zeroText','color:green;',zeroText);
    return zeroText;
  }
  const exponentialForm = Number(`${value}e${precision}`);
  const rounded = isRoundUp ? Math.round(exponentialForm) : Math.floor(exponentialForm);
  return Number(`${rounded}e-${precision}`).toFixed(precision);
};
