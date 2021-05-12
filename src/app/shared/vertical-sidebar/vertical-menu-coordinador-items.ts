import { CoordinadorInfo } from "./vertical-sidebar-coordinador.metadata";


export const COORDINADOROUTES: CoordinadorInfo[] = [
    
    {
        path: 'dashboard',
        title: 'Dashboards',
        icon: 'Home',
        class: 'has-arrow',
        label: '',
        labelClass: 'side-badge badge badge-info',
        extralink: false,
        submenu: [
            {
                path: '/app/dashboard/dashboard1',
                title: 'Modern',
                icon: 'mdi mdi-adjust',
                class: '',
                label: '',
                labelClass: '',
                extralink: false,
                submenu: []
            }
        ]
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
        path: '/app/courses/list',
        title: 'Cursos',
        icon: 'Grid',
        class: '',
        label: '',
        labelClass: '',
        extralink: false,
        submenu: []
    },
    {
        path: '',
        title: 'Opciones de Usuario',
        icon: 'mdi mdi-dots-horizontal',
        class: 'nav-small-cap',
        extralink: true,
        label: '',
        labelClass: '',
        submenu: []
    },
    {
        path: '/app/curriculum-vitae/register',
        title: 'Hoja de Vida',
        icon: 'file-text',
        class: '',
        label: '',
        labelClass: '',
        extralink: false,
        submenu: []
    },
    {
        path: '/app/subject-information/list',
        title: 'Cursos',
        icon: 'book-open',
        class: '',
        label: '',
        labelClass: '',
        extralink: false,
        submenu: []
    },
    {
        path: '/app/subject-folder/list',
        title: 'Carpetas de Asignatura',
        icon: 'folder',
        class: '',
        label: '',
        labelClass: '',
        extralink: false,
        submenu: []
    },
    {
        path: '/app/so-folder/list',
        title: 'Carpetas de SO',
        icon: 'folder',
        class: '',
        label: '',
        labelClass: '',
        extralink: false,
        submenu: []
    }
];
