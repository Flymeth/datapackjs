function executeCmd(executor:string, command: string) {    
    if(executor.endsWith('run')) return `execute ${executor} ${command}`
    if(command.startsWith('execute ')) return `execute ${executor} ${command.replace('execute ', '')}`
    if(!executor) return command
    if(!command) return ""
    
    return `execute ${executor} run ${command}`
}

export default executeCmd