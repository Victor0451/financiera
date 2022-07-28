import React from 'react'
import Link from 'next/link'

const Botones = () => {
    return (
        <div className="mt-4 container border border-dark p-4 bgbox">

            <h4 className="mb-4">
                <u>Accesos Directos</u>
            </h4>

            <div className="row">
                <div className="col-sm-4">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Clientes</h5>
                            <p className="card-text">Gestion de altas, bajas y modificaciones de clientes</p>
                            <Link href="/clientes/clientes">
                                <a className="btn btn-primary">Entrar</a>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="col-sm-4">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Creditos</h5>
                            <p className="card-text">Gestion de altas, bajas y modificaciones de creditos</p>
                            <Link href="/creditos/creditos">
                                <a className="btn btn-primary">Entrar</a>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Botones
