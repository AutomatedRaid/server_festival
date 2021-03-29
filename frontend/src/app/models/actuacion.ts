export class Actuacion {
  _id: string;
  nombre: String;
  horario: String;
  artistas: String[];
  descripcion: String;
  img: String;
  img_mapa: String;


  constructor(id = "", nombre = "", horario = "", artistas = [], descripcion = "", img = "", img_mapa = "") {
    this._id = id;
    this.nombre = nombre;
    this.horario = horario;
    this.artistas = artistas;
    this.descripcion = descripcion;
    this.img = img;
    this.img_mapa = img_mapa;
  }
}
