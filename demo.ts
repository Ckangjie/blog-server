var hello: string = "Hello World!"
    // 字符串
    , user: string = "Runoob"
    // number
    , years: number = 5
    , words: string = `您好，今年是 ${user} 发布 ${years + 1} 周年`
    // 布尔值
    , flag: boolean = false
    // 数组
    , list: number[] = [1, 2, 3, 6, 5, 8]
    , arr: string[] = ['数组1', 'fdsf'];
enum Color { Red, Green, Blue, haha };
let c: Color = Color.Red;
// 99
var str: string = ''
for (var i = 1; i <= 9; i++) {
    for (var j = 1; j <= i; j++) {
        str += j + 'x' + i + '=' + i * j + ' '
    }
    str += '\r\n'
}
console.log(str)