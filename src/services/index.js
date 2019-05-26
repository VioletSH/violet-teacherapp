class Services{

    static mainUrl = 'http://localhost:1337';

    static getCursos(){
        return (
            fetch(this.mainUrl+'/curso')
        )
    }
    static getCursoGrupo(idCurso,idGrupo){
        return (
            fetch(this.mainUrl+'/CursoGrupo/'+idCurso+'/'+idGrupo)
        )
    }


    //POST Methods

    static postModulo(idCurso,nombre){
        var data = {
                nombre: nombre,
                curso: idCurso
        }
        return(
            fetch(this.mainUrl+'/modulo', {
                method: 'post',
                body: JSON.stringify(data)
                })
        )
    }

}
export default Services;