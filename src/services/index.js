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
}
export default Services;