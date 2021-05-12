// Sidebar route metadata
export interface DocenteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
    extralink: boolean;
    label: string;
    labelClass: string;
    submenu: DocenteInfo[];
}