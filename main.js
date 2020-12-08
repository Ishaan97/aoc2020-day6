const readFile = require('fs').readFileSync;

const inputs = [];

const file = readFile('input.txt', 'utf-8').split("\n").forEach(data => {
    inputs.push(data.trim());
})

function findNextGroup(inputs, start){
    let end = -1;
    for(let i=start; i<inputs.length; i++){
        if(i === inputs.length-1 || inputs[i].length===0 ){
            end = i;
            break;
        }
    }
    return [start, end];
}

function countLetters(string, map){
    for(let letter of string){
        if(!map.has(letter)){
            map.set(letter, 1)
        }
        else{
            let letterount = map.get(letter)
            map.set(letter, letterount+1)
        }
    }
    return map;
}

function solve(inputs)
{
    let i = 0;
    let totalCount = 0;
    let count2 = 0;
    while(i<inputs.length){
        let start = i;
        let end = -1;
        [start, end] = findNextGroup(inputs, start);
        end = end === inputs.length-1 ? end+1 : end;
        
        let map = new Map();
        let group = inputs.slice(start, end);
        for(let g of group){
            map = countLetters(g, map);
        }
        map.forEach((value, key)=> {
            if(value === group.length)
            {
                count2++;
            }
        })
        totalCount += map.size;
        i=end+1;
    }
    console.log(totalCount);
    console.log(count2)
}

solve(inputs);