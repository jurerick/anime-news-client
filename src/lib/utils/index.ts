import { message } from "antd";

export const displayErrorMessage = (error: string) => {
    return message.error(error);
}