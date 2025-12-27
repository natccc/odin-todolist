const KEY = "todoState"

export function save(state) {
    localStorage.setItem(KEY, JSON.stringify(state))
}

export function load() {
    const raw = localStorage.getItem(KEY)
    return raw ? JSON.parse(raw) : null
}