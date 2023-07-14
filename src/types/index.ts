import { Request } from "express";
import { IncomingHttpHeaders } from "http";

export interface CustomRequest extends Request {
    // add new headers as per the requirement.
    headers: IncomingHttpHeaders;
}