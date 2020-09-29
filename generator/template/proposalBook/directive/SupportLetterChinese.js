/**
 * @methodName: 只能输入中英文 前后不可以输入空格 中间可以有一个
 * @params:
 */
function getPosition(ele) {
  let cursorPos = 0;
  if (document.selection) {
    // IE
    const selectRange = document.selection.createRange();
    selectRange.moveStart("character", -ele.value.length);
    cursorPos = selectRange.text.length;
  } else if (ele.selectionStart || ele.selectionStart === "0") {
    cursorPos = ele.selectionStart;
  }
  return cursorPos;
}

function setPosition(ele, pos) {
  if (ele.setSelectionRange) {
    ele.focus();
    /* 选中输入框指定位置文本
     * selectionStart 起始位置
     * selectionEnd 终点位置
     * */
    ele.setSelectionRange(pos, pos);
  } else if (ele.createTextRange) {
    // IE
    let range = ele.createTextRange();
    range.collapse(true);
    range.moveEnd("character", pos);
    range.moveStart("character", pos);
    range.select();
  }
}
export default {
  update: function(el, { modifiers }) {
    let _value = el.querySelector("input").value;
    if (!_value) {
      //此处需获取input标签
      return false;
    }
    let value = _value.replace(/[^a-zA-Z\u4E00-\u9FA5\s]/g, "");
    value = value.replace(/^\s*/g, "");
    value = value.replace(/\s*$/g, "");
    value = value.replace(/\s{2,}/g, " ");
    console.log("%c=====>去除前后空格=>" + value + "<===== ↓↓↓↓↓↓↓↓↓↓↓", "color:#03ff6f;background-color:#7b7b7b;", "");
    if (_value != value) {
      let pos = getPosition(el.querySelector("input"));
      el.querySelector("input").value = value;
      setPosition(el.querySelector("input"), pos - 1);
      el.querySelector("input").dispatchEvent(new Event(modifiers.lazy ? "change" : "input"));
    }
  },
};
