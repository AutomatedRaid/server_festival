export class Actuacion {
  _id: string;
  nombre: String;
  horario: String;
  fecha: String;
  artistas: String[];
  descripcion: String;
  zona: String;
  img: String;
  img_mapa: String;
  ubicacion: String;


  constructor(id = "", nombre = "", horario = "", fecha = "", artistas = [], descripcion = "", zona = "", img = "", img_mapa = "", ubicacion = "") {
    this._id = id;
    this.nombre = nombre;
    this.horario = horario;
    this.fecha = fecha;
    this.artistas = artistas;
    this.descripcion = descripcion;
    this.zona = zona;
    this.img = img;
    this.img_mapa = img_mapa;
    this.ubicacion = ubicacion;
  }
}
