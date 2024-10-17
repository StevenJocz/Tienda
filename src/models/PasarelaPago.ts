export interface Status {
    status: string;
    reason: string;
    message: string;
    date: string;
}

export interface Data {
    status: Status;
    requestId: number;
    processUrl: string;
}

export interface ApiResponse {
    resultado: boolean;
    mensaje: string;
    data: Data;
}