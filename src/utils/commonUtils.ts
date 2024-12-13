import { AxiosError } from "axios";

export const errMsgInstance = (err: any) => {
    const maxLength = 150;
    if (err instanceof AxiosError && err?.response?.data?.message && err.response.data.message !== "") {
        return err.response.data.message
    } else {
        const message = typeof err === "string"
            ? err
            : err instanceof Error
                ? err.message
                : "An unknown error occurred";

        return message.length > maxLength ? message.substring(0, maxLength) + "..." : message;
    }
};

export class UserEntity {
    username: string = "";
    token?: string = "";
    status?: "online" | "offline" = "offline";
}

export class MessageEntity {
    sender?: string = "";
    receiver: string = "";
    content: string = "";
    timestamps?: any = null;
}