import moment from 'moment'
import React from 'react'

const Novedades = ({ noticia }) => {

    if (!noticia) return (<div className='alert alert-info border border-dark text-center text-uppercase container mt-4'>
        No hay novedades
    </div>)

    return (
        <div className="container mt-4" role="alert">
            <h4 className="alert-heading">Novedades</h4>
            <hr />
            <p>
                <i className="fa fa-info-circle" aria-hidden="true"></i>
                {" "}{noticia.noticia}
            </p>
            <hr />
            <p className="mb-0 text-center">{moment(noticia.fecha).format('DD/MM/YYYY HH:mm:ss')} - {noticia.operador}</p>
        </div>
    )
}

export default Novedades


