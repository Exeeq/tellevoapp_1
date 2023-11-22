export interface IViajes {
    id?: any;
    conductorUid: string;
    conductor: string;
    imagen: string;
    vehiculo: string;
    patente: string;
    capacidad: number;
    lugarespera: string,
    lugardestino: string,
    fecha: string;
    hora: string;
    coordinatesEspera?: any; 
    coordinatesDestino?: any;
}
