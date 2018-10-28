const merge = (arrFirst:number[], arrSecond:number[]) => {
    const arrSort = [];
    let i = 0, j = 0;
    while (i < arrFirst.length && j < arrSecond.length)
        arrSort.push((arrFirst[i] < arrSecond[j]) ? arrFirst[i++] : arrSecond[j++]);
    return [
        ...arrSort,
        ...arrFirst.slice(i),
        ...arrSecond.slice(j)
    ];
};

export const MergeSort = (arr:number[]):number[] => {
    if (!arr || !arr.length || arr.length <= 1)
        return arr;
    const middle = Math.floor(arr.length / 2);
    return merge(MergeSort(arr.slice(0, middle)), MergeSort(arr.slice(middle)))
};
