import {MergeSort} from './optimizeSort'

const array: number[] = [];

for (let i = 0; i < 17; i++)
    array.push(Math.floor(Math.random() * 100));

console.log(MergeSort(array));
