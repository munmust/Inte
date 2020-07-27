/**
 * 将两个升序链表合并为一个新的升序链表并返回。新链表是通过拼接给定的两个链表的所有节点组成的。 
 * 示例：
 * 输入：1->2->4, 1->3->4
 * 输出：1->1->2->3->4->4
 */

function mergeTwoLists(l1, l2) {
  if (l1 === null) return l2;
  if (l2 === null) return l1;
  if (l1.val <= l2.val) {
    l1.next = mergeTwoLists(l1.next, l2);
    return l1;
  } else {
    l2.next = mergeTwoLists(l2.next, l1);
    return l2;
  }
}

/**
 * 给你两个有序整数数组 nums1 和 nums2，请你将 nums2 合并到 nums1 中，使 num1 成为一个有序数组。
 * 说明:
 * 初始化 nums1 和 nums2 的元素数量分别为 m 和 n 。
 * 你可以假设 nums1 有足够的空间（空间大小大于或等于 m + n ）来保存 nums2 中的元素。
 * 示例:
 * 输入:
 * nums1 = [1,2,3,0,0,0], m = 3
 * nums2 = [2,5,6],       n = 3
 * 输出: [1,2,2,3,5,6]
 */
function merge(nums1, m, nums2, n) {
  // nums1.splice(m,n,...nums).sort((a,b)=>a-b);
  let len1 = m - 1,
    len2 = n - 1,
    len = m + n - 1;
  while (len2 >= 0) {
    if (len1 < 0) {
      nums1[len--] = nums2[len2--];
      continue;
    }
    nums1[len--] = nums1[len1] >= nums2[len2] ? nums1[len1--] : nums2[len2--];
  }
}
/**
 * 给定一个整数数组 nums 和一个目标值 target ，请你在该数组中找出和为目标值的那 两个 整数，并返回他们的数组下标。
 * 你可以假设每种输入只会对应一个答案。但是，你不能重复利用这个数组中同样的元素。
 * 示例:
 * 给定 nums = [2, 7, 11, 15], target = 9
 * 因为 nums[0] + nums[1] = 2 + 7 = 9
 * 所以返回 [0, 1]
 */
function sumTwo(nums, target) {
  let map = new Map();
  for (let i = 0; i < nums.length; i++) {
    let k = target - nums[i];
    if (map.has(k)) {
      return [map.get(k), i];
    }
    map.set(nums[i], i);
  }
  return [];
}
/**
 * 给定两个数组，编写一个函数来计算它们的交集。
 * 示例 1:
 * 输入: nums1 = [1,2,2,1], nums2 = [2,2]
 * 输出: [2]
 * 示例 2:
 * 输入: nums1 = [4,9,5], nums2 = [9,4,9,8,4]
 * 输出: [9,4]
 * 说明:
 * 输出结果中的每个元素一定是唯一的。
 * 我们可以不考虑输出结果的顺序。
 */
function intersection(nums1,nums2){
  return [...new Set(nums1.filter((item)=>nums2.includes(item)))]
}
function union(nums1,nums2){
  return [...new Set([...nums1,...nums2])];
}
function differ(nums1,nums2){
  return [...new Set([nums1.filter(item=>!nums2.includes(item))])];
}
console.log(differ([4,9,5,NaN], [9,4,9,8,4,NaN])) // [8]

/**
 * 运用你所掌握的数据结构，设计和实现一个 LRU (最近最少使用) 缓存机制。它应该支持以下操作： 获取数据 get 和写入数据 put 。
 * 获取数据 get(key) - 如果密钥 ( key ) 存在于缓存中，则获取密钥的值（总是正数），否则返回 -1 。
 * 写入数据 put(key, value) - 如果密钥不存在，则写入数据。当缓存容量达到上限时，它应该在写入新数据之前删除最久未使用的数据，从而为新数据留出空间。
 * 进阶:
 * 你是否可以在 O(1) 时间复杂度内完成这两种操作？
 * 示例:
 * LRUCache cache = new LRUCache( 2 );
 * cache.put(1, 1);
 * cache.put(2, 2);
 * cache.get(1);       // 返回  1
 * cache.put(3, 3);    // 该操作会使得密钥 2 作废
 * cache.get(2);       // 返回 -1 (未找到)
 * cache.put(4, 4);    // 该操作会使得密钥 1 作废
 * cache.get(1);       // 返回 -1 (未找到)
 * cache.get(3);       // 返回  3
 * cache.get(4);       // 返回  4
 */
function LRU(max){
  this.max=max;
  this.cache=new Map();
}
LRU.prototype={
  get(key){
    const {cache}=this,
    value=cache.get(key);
    if(!value)return;
    cache.delete(key);
    cache.set(key,value);
    return value;
  },
  add(key,value){
    const {cache}=this;
    if(cache.size>this.max-1){
      // keys返回一个迭代器使用next返回第一个
      const keys=cache.keys().next().value;
      cache.delete(keys);
    }
    cache.set(key,value);
  }
}

/*
 请把俩个数组 [A1, A2, B1, B2, C1, C2, D1, D2]
 和 [A, B, C, D]，
 合并为 [A1, A2, A, B1, B2, B, C1, C2, C, D1, D2, D]
*/

function concatArr(arr1,arr2) {
  arr2.map(item=>{
    return item+3
  })
  return [...arr1,...arr2].sort().map((item=>{
    item,includes('3')?item.split('')[0]:item;
  }))
}
