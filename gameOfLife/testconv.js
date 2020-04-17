// console.log("Hello World")
// var bin='1011111111'
// var num = parseInt(bin,2)
// var numStr = num.toString(16)
// console.log(bin)
// console.log(numStr)

// var num2 = parseInt(numStr,16)
// console.log(num2)
// console.log(num2.toString(2))

// let ta = [  1,0,0,0,0,
//             0,0,0,0,1,
//             1,1,1,1,1,
//             0,1,0,1,0,
//             1,0,0,0,0]
// console.log("Start:")
// console.log(parseInt(ta.toString().replace(/,/g,""),2).toString(2))
// let dd = parseInt(ta.toString().replace(/,/g,""),2).toString(16);
// console.log(dd)
//             // function grid2Byte(ar) {
// //     let bin = ''
// //     bin.c
// //}
// let rev = parseInt(dd,16).toString(2)
// console.log(rev)
// let ta2 = [];
// for (let i=0;i<rev.length;i++) {
//     ta2.push(parseInt(rev.charAt(i)));
// }
// console.log(ta2)
// console.log(ta)


// let grid = [1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1]
let grid = [1,1,0,1,1,1,0,0,0,0,1,1,1,1,0,0,0,0,1,1,1,1,0,0,0,0,1,1,1,1,0,0,0,1]
console.log(grid.length)
// 28011008400410
// grid2string
// let gridString = parseInt(grid.toString().replace(/,/g,""),2).toString(2)
// // console.log(gridString)

// // string2Byte
// let gridByte = parseInt(grid.toString().replace(/,/g,""),2).toString(16)
// console.log(gridByte)

// split strings into smaller parts
let gridString = grid.toString().replace(/,/g,"")
console.log(gridString, gridString.length)
// console.log("GT:", parseInt(grid.toString().replace(/,/g,""),2).toString(16))

// let data = '';
// let splitSize = 32
// while (gridString.length > splitSize){
//     let partString = gridString.substring(0,32)
//     gridString = gridString.substring(32)
//     // console.log(partString)
//     // enocode part
//     let tmpPart = parseInt(partString,2).toString(16)
//     console.log(tmpPart)
//     data = data.concat(tmpPart)
// }
// console.log("last byte:",gridString)
// console.log(data)
// let tmpPart = parseInt(gridString,2).toString(16)
// data = data.concat(tmpPart)
// console.log("data in bytes:",data)

// // decode string
// let newGrid = new Array(grid.length).fill(0)
// // split after 8
// let ssplitSize =  8
// let cnt = 0
// while (data.length > ssplitSize){
//      let partData = data.substring(0,ssplitSize)
//     //  console.log("part:", partData)
//      data = data.substr(ssplitSize)
//      let pp = parseInt(partData,16).toString(2)
//     //  console.log("part:",pp)
//      for (let i=0;i<pp.length;i++){
//         console.log("1:",cnt) 
//         newGrid[cnt++] = parseInt(pp.charAt(i))
         
//      }
     
// }
// // let partData = data.substring(0,ssplitSize)
// // data = data.substr(ssplitSize)
// console.log("last part:", data)
// let pp = parseInt(data,16).toString(2)
// // console.log("part:",pp)
// for (let i=0;i<pp.length;i++){
//     console.log("2:",cnt)
//     newGrid[cnt++] = parseInt(pp.charAt(i))
    
// }
//  console.log(newGrid, newGrid.length)