class HashTable {
  store = new Array(10);
  hash(key) {
    let sum = 0;
    
    for (let i = 0; i < key.length; i++) {
      sum += key.charCodeAt(i);
    }
    return sum % this.store.length;
  }
  add(key, value) {
    this.store[this.hash(key)] = this.store[this.hash(key)] || [];
    this.store[this.hash(key)].push({ key, value });
  }
  get(key) {
    const item = (this.store[this.hash(key)] || []).find((item) => item.key === key);
    return item && item.value;
  }
}

const dict = new HashTable();
dict.add("ab", 1);
dict.add("ba", 2);
console.log(dict.get("ab"), dict.get("ba"), dict.get("unknown"));