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
    static postActividad(idModulo,nombre,desc){
        var data = {
            nombre: nombre,
            descripcion: desc,
            modulo: idModulo
        }
        return(
            fetch(this.mainUrl+'/actividad', {
                method: 'post',
                body: JSON.stringify(data)
                })
        )
    }

    static postContent(idActividad,idRecurso){
        var data = {
            actividad: idActividad,
            peticion: idRecurso
        }
        return(
            fetch(this.mainUrl+'/contenido', {
                method: 'post',
                body: JSON.stringify(data)
                })
        )
    }
    static postResource(url,tipo){
        var data = {
            url: url,
            tipoContenido: tipo
        }
        return(
            fetch(this.mainUrl+'/recurso', {
                method: 'post',
                body: JSON.stringify(data)
            })
        )
    }

    //DeleteMethods
    static deleteModulo(idModulo){
        return(
            fetch(this.mainUrl+'/modulo', {
                method: 'delete',
                body: JSON.stringify({id:idModulo})
                })
        )
    }
    static deleteActividad(idActividad){
        return(
            fetch(this.mainUrl+'/actividad', {
                method: 'delete',
                body: JSON.stringify({id:idActividad})
                })
        )
    }

    static deleteContent(idContenido){
        return(
            fetch(this.mainUrl+'/contenido', {
                method: 'delete',
                body: JSON.stringify({id:idContenido})
                })
        )
    }
    static deleteResource(idRecurso){
        return(
            fetch(this.mainUrl+'/recurso', {
                method: 'delete',
                body: JSON.stringify({id:idRecurso})
            })
        )
    }
}
export default Services;