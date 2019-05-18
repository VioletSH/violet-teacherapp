class Services{

    static mainUrl = 'http://localhost:1337';

    static getCursos(){
        return (
            fetch(this.mainUrl+'/curso')
        )
    }
    static getCurso(id){
        return (
            fetch(this.mainUrl+'/curso/'+id)
        )
    }

    static getModulo(id){
        return (
            fetch(this.mainUrl+'/modulo/'+id)
        )
    }
    static getContenidos(idActividad){
        return(
            fetch(this.mainUrl+'/contenido/?actividad='+idActividad)
        )
    }
}
export default Services;