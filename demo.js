var hello = "Hello World!"
// 字符串
, user = "Runoob"
// number
, years = 5, words = "\u60A8\u597D\uFF0C\u4ECA\u5E74\u662F " + user + " \u53D1\u5E03 " + (years + 1) + " \u5468\u5E74"
// 布尔值
, flag = false
// 数组
, list = [1, 2, 3, 6, 5, 8], arr = ['数组1', 'fdsf'];
var Color;
(function (Color) {
    Color[Color["Red"] = 0] = "Red";
    Color[Color["Green"] = 1] = "Green";
    Color[Color["Blue"] = 2] = "Blue";
    Color[Color["haha"] = 3] = "haha";
})(Color || (Color = {}));
;
var c = Color.Red;
// 99
var str = '';
for (var i = 1; i <= 9; i++) {
    for (var j = 1; j <= i; j++) {
        str += j + 'x' + i + '=' + i * j + ' ';
    }
    str += '\r\n';
}
console.log(str);
