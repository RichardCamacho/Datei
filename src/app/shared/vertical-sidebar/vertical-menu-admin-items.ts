import { AdminInfo } from "./vertical-sidebar-administrador.metadata";


export const ADMINROUTES: AdminInfo[] = [
    
    {
        path: '',
        title: 'Registros',
        icon: 'mdi mdi-dots-horizontal',
        class: 'nav-small-cap',
        extralink: true,
        label: '',
        labelClass: '',
        submenu: []
    },
    {
        path: '/app/users/list',
        title: 'Usuarios',
        icon: 'Users',
        class: '',
        label: '',
        labelClass: '',
        extralink: false,
        submenu: []
    },
    {
        path: '/app/folders/list',
        title: 'Carpetas',
        icon: 'folder',
        class: '',
        label: '',
        labelClass: '',
        extralink: false,
        submenu: []
    },
    {
        path: '',
        title: 'Configuración',
        icon: 'mdi mdi-dots-horizontal',
        class: 'nav-small-cap',
        extralink: true,
        label: '',
        labelClass: '',
        submenu: []
    },
    {
        path: '/app/references-type/list',
        title: 'Tipos de Referencia',
        icon: 'Grid',
        class: '',
        label: '',
        labelClass: '',
        extralink: false,
        submenu: []
    }
];
