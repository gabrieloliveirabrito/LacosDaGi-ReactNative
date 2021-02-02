declare module "react-native-sweet-alert" {
    interface SweetAlertOptions {
        title: string;
        subTitle?: string;
        style?: "normal" | "error" | "success" | "warning" | "progress",
        confirmButtonTitle?: string,
        confirmButtonColor?: string,
        otherButtonTitle?: string,
        otherButtonColor?: string,
        cancellable?: boolean
    }

    type Callback = () => void;

    export default class SweetAlert {
        public static showAlertWithOptions(options: SweetAlertOptions, callback: Callback = undefined): void;
        public static dismissAlert(): void;
    }
}