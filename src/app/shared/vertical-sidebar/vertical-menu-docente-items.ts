import { DocenteInfo } from "./vertical-sidebar-docente.metadata";


export const DOCENTEROUTES: DocenteInfo[] = [
    
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
        title: 'Inf. Cursos',
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
    }
];
