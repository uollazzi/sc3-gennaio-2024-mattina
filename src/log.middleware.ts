import express, { Request, Response, NextFunction } from "express";

const logMiddleware = (req: Request, res: Response, next: NextFunction) => {
    console.log("----------");
    console.log("Data:", new Date());
    console.log("URL:", req.method, req.url);
    console.log("User Agent:", req.get("User-Agent"));
    next();
}

export default logMiddleware;