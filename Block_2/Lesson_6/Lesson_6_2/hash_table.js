class HashTable {
  store = new Array(10);

  hash(key) {
    let sum = 0;
    
    for (let i = 0; i < key.length; i++) {
      sum += key.charCodeAt(i);
    }

    return sum % 10;
  }
  add(key, value) {
    this.store[this.hash(key)] = value;
  }
  get(key) {
    return this.store[this.hash(key)];
  }
}

const dict = new HashTable();
dict.add("foo", 1);
dict.add("bar", 2);
console.log(dict.get("foo"), dict.get("bar"));

//collision
dict.add("ab", 3);
dict.add("ba", 4);
console.log(dict.get("ab"), dict.get("ba"), dict.get("unknown"));

class HashTableFixed {
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

const dict2 = new HashTableFixed();
dict2.add("ab", 1);
dict2.add("ba", 2);
console.log(dict2.get("ab"), dict2.get("ba"), dict2.get("unknown"));