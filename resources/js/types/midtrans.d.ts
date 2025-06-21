interface SnapPayCallbacks {
    onSuccess?: (result: any) => void;
    onPending?: (result: any) => void;
    onError?: (result: any) => void;
    onClose?: () => void;
}

interface Snap {
    pay: (token: string, callbacks?: SnapPayCallbacks) => void;
    embed: (token: string, options: { embedId: string }) => void;
}

interface Window {
    snap: Snap;
}
