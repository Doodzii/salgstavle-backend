import bcrypt from "bcrypt";
const saltRounds = 10;

const encryptPassword = async (plainPassword : string) => {
    return await bcrypt.hash(plainPassword, saltRounds);
}

const matchPassword = async (plainPassword : string, hashedPassword: string) => {
    return await bcrypt.compare(plainPassword, hashedPassword);
}

export { encryptPassword, matchPassword }