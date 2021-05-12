// Sidebar route metadata
export interface CoordinadorInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
    extralink: boolean;
    label: string;
    labelClass: string;
    submenu: CoordinadorInfo[];
}