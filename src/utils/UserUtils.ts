import crypto from "crypto";
import { asyncQuery } from "../database/Database";

//Generate a session token and apply it in the database
const generateSessionToken = async (userID: string) => {
    const token = crypto.randomBytes(32).toString("hex");
    await asyncQuery("UPDATE `users` SET `sessiontoken` = ? WHERE `id` = ?", [token, userID]);
    return token;
}

//Retrieve the stored token from userid
const getStoredSessionToken = async (userID: string) => {
    const results = await asyncQuery("SELECT `sessiontoken` FROM `users` WHERE `id` = ?", [userID])
    if (results.length <= 0)
        return null;
    const result = results[0];
    return result.sessiontoken;
}

//Get the data from a session token
const getSessionTokenData = async (token: string) => {
    const results = await asyncQuery("SELECT u.id, u.username, u.leader, u.admin FROM `users` u WHERE u.sessiontoken = ?", [token])
    if (results.length <= 0)
        return null;
    return results[0];
}

export { 
    getStoredSessionToken,
    generateSessionToken,
    getSessionTokenData
}