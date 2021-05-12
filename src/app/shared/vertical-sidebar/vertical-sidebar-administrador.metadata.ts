// Sidebar route metadata
export interface AdminInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
    extralink: boolean;
    label: string;
    labelClass: string;
    submenu: AdminInfo[];
}