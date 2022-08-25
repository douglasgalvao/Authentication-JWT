import { PrismaClient } from "@prisma/client";
import express, { json, NextFunction, Request, Response } from "express";
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
require('crypto').randomBytes(64).toString('hex')
const app = express();
const prisma = new PrismaClient();
type Token = {
    created_at: number,
    expires_in: number
}
export function tokenValid(token: Token) {
    console.log(jwt.verify(token, process.env.JWT_SECRET));

}


// Middleware AUTH
export function auth(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization;
    if (!token) { return res.status(401).json("Invalid token or there's no token avaible"); }
    const [, tokenAvaible] = token.split(' ');
    try {
        const payload = jwt.verify(tokenAvaible, process.env.JWT_SECRET);
        req.userId = payload.id;
        return next();
    } catch (e) {
        return res.status(401).json({ error: "ERROR , TOKEN EXPIRADO!" });
    }
}

function generateAccessToken(id: any) {
    const firstToken = jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '2s', subject: "webToken to authenticate" });
    const refreshToken = jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '86400s', subject: "webToken to authenticate" });
    return { firstToken, refreshToken };
}

app.post("/createUser", async (req: Request, res: Response) => {
    const usuario = req.body;
    const user = await prisma.user.create({
        data: {
            username: usuario.username,
            password: usuario.password,
            email: usuario.email
        }
    })
    res.json({
        user: user.username,
        password: user.password,
        email: user.email,
        dateCreate: user.created_at,
        dateUpdate: user.updated_at,
        id: user.id
    });
});

app.get("/getUsers", auth, async (req: Request, res: Response) => {
    const user = await prisma.user.findMany();
    res.json(user);
});

app.get("/getUser", auth, async (req: Request, res: Response) => {
    const user = await prisma.user.findUnique({
        where: {
            id: req.userId
        },
        select: {
            username: true,
            created_at: true,
            email: true,
            updated_at: true,
            id: true
        },
    });
    res.json({ user: user });
});

app.get("/getUserT", auth, async (req: Request, res: Response) => {
    try {
        // const token = jwt.decode(req.body.token);
        const user = await prisma.user.findUnique({
            where: {
                id: req.userId
            },
            select: {
                username: true,
                password: true,
                created_at: true,
                email: true,
                updated_at: true,
                id: true
            },
        });
        return res.status(200).json({ user: user });
    } catch (e) { throw res.status(401).json("Error in getUserT"); }

});

app.put("/updateUser", auth, async (req: Request, res: Response) => {
    const users = await prisma.user.findMany();
    try {
        const updateUser = await prisma.user.update({
            where: {
                id: req.body.id,
            },
            data: {
                username: req.body.username,
                password: req.body.password
            },
        })
    } catch (e) {
        return res.json(e)
    }
    return res.json("User updated with sucsses")
})

app.delete("/deleteUser", auth, async (req: Request, res: Response) => {
    await prisma.user.deleteMany({
        where: {
            id: req.userId
        }
    })
    res.json("User has been deleted with success");
})

app.delete("/deleteUsers", auth, async (req: Request, res: Response) => {
    await prisma.user.deleteMany({
        where: {
            id: req.userId
        }
    })

    res.json("User has been deleted with success");
})

app.post("/login", async (req: Request, res: Response) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                email: req.body.email
            },
            select: {
                username: true,
                password: true,
                created_at: true,
                email: true,
                updated_at: true,
                id: true
            },
        });
        if (!user) {
            return res.json({ response: "User not found!" });
        }
        if (user.password != req.body.password) {
            return res.json({ data: "Wrong password , try again" }).status(401);
        }
        if (user && user.password === req.body.password) {
            const { firstToken, refreshToken } = generateAccessToken(user.id);
            return res.json({ responseText: "You just logged in!", token: { firstToken, refreshToken } });
        }
    } catch (e) { throw e }

})

app.post("/refreshAuth", (req: Request, res: Response) => {
    const token = req.body.token;
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        const { firstToken, refreshToken } = generateAccessToken(payload.id);
        return res.status(200).json({ firstToken, refreshToken });
    }catch(e){
        return res.status(401).json({ error: "Refresh TOKEN EXPIRADO!" })
    }
});

export default app
