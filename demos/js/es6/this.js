const x = () => {
  console.log(this.a);
};

function t() {
  this.a = 22;
  x();
}

t();

let person = {
  name: "jike",
  init: function() {
    //为body添加一个点击事件，看看这个点击后的this属性有什么不同
    document.body.onclick = () => {
      alert(this.name); //?? this在浏览器默认是调用时的对象,可变的？
    };
  },
};
person.init();
