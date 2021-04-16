import { StarterModule } from "src/app/starter/starter.module";

export class Minutes{
    id: number;
    nombre: string;
    fechaReunion: Date;
    lugarReunion: Date;
    horaInicio: Date;
    horaFinalizacion: Date;
    convocadoPor: string;
    departamento: string;
    objetivo: string;
    agenda: string;
    acciones: string;
    fechaProxReunion: Date;
    lugarProxReunion: string;
    horaProxReunion: string;
    carpeta: number;
}