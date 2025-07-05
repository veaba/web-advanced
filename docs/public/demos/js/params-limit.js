const list1 = [1, 2];
const list2 = [3, 4];
list1.push.apply(list1, list2);
console.info('list1:', list1);
console.info('list2:', list2);