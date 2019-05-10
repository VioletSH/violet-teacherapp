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
}
export default Services;