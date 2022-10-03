function createID(prefix?:string, suffix?: string): string {
    const date = new Date()
    const random = Math.random() * 100
    const id = `${date.getTime()}_${random.toFixed()}`
    return (prefix || "") + id + (suffix || "")
}

export default createID