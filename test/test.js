// 使用 Mock
var Mock = require("mockjs");

Mock.Random.title();
Mock.Random.cname();
Mock.Random.color();
Mock.Random.image();

var data = Mock.mock({
  /* // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
  "list|1-10": [
    {
      // 属性 id 是一个自增数，起始值为 1，每次增 1
      "id|+1": 1,
    },
  ], */
  //   title: "@title(4)",
  //   "cnname|10": ["@cname"],
  //   "subTitle|3-10": ["@title(1,3)"],
  "imgList|4": ["@image('200x100', '@color', '#FFF', 'png', '@cname')"],
});

// 输出结果
console.log(data);
