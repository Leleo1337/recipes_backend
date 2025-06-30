import bcrypt from 'bcrypt'

export async function hashValue(val: string, saltRolls?: number){
    const rounds = saltRolls || 10
    return bcrypt.hash(val, rounds)
}

export async function compareValue(val: string, hashedValue: string){
    return bcrypt.compare(val, hashedValue)
}