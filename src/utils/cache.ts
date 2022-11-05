enum CacheType {
  Local,
  Session
}

function judge(value: any): boolean {
  if (value === undefined || value === null) {
    return false
  }
  return true
}

class Cache {
  storage: Storage
  constructor(Type: CacheType) {
    this.storage = Type === CacheType.Local ? localStorage : sessionStorage
  }
  setCache(key: string, value: any) {
    if (judge(value)) {
      this.storage.setItem(key, JSON.stringify(value))
    }
  }
  getCache(key: string) {
    const value = this.storage.getItem(key)
    if (value) {
      return JSON.parse(value)
    }
  }
  removeCache(key: string) {
    this.storage.removeItem(key)
  }
  clear() {
    this.storage.clear()
  }
}

const localCache = new Cache(CacheType.Local)
const sessionCache = new Cache(CacheType.Session)
export { localCache, sessionCache }
