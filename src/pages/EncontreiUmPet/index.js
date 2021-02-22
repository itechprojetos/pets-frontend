import React, { useState } from "react"
import { Container } from "react-bootstrap"
import FooterBanner from "../../components/FooterBanner"

import DogImg from '../../assets/images/dog.png'


function EncontreiUmPet() {
    return (
        <Container>
            <h1 className="my-3 align-self-center" >Encontrei um pet</h1>
            <div className="row mt-4">
                <div className="col-6">
                    <div className="row d-flex justify-content-center">
                        <div
                            className="shadow mt-1 d-flex justify-content-center align-items-center"
                            style={{
                                width: "150px",
                                height: "150px",
                                paddingTop: "16px",
                                paddingBottom: "16px",
                                paddingLeft: "10px",
                                paddingRight: "10px",
                                lineHeight: 1.33,
                                borderRadius: "90px",
                            }} 
                        >
                            <img src={DogImg} alt="dog"  width="120"/>
                        </div>
                    </div>
                    <hr />
                    <h5>Informacoes do Pet</h5>
                    <br />
                    <p className="mb-2"><b>Nome:</b> Rex</p>
                    <p className="mb-2"><b>Amigável:</b> Sim </p>
                    <p className="mb-2"><b>Raça:</b> Husky siberiano </p>
                    <p className="mb-2"><b>Cor:</b> Marom com branco </p>
                    <p className="mb-4"><b>Porte:</b> Medio</p>
                    <hr />
                    <h5>Informacoes do Dono</h5>
                    <br />
                    <p className="mb-2"><b>Nome:</b> José Caetano da Silza</p>
                    <p className="mb-2"><b>Endereço:</b> Rua da Paz n° 90</p>
                    <p className="mb-2"><b>Bairro:</b> Jardin Brasil </p>
                    <p className="mb-2"><b>Cidade:</b>  Maceio - AL</p>
                    <p className="mb-2"><b>Numero:</b> 9 9187-0319</p>
                    <p className="mb-2"><b>E-mail:</b> ze01@gmail.com</p>
                            
                </div>
                <div className="col-6">
                    <h4 className="my-3 text-center">Deixe uma menssagem para o dono do pet</h4>
                    <div className="form-group">
                        <textarea className="form-control" rows="5" id="comment" placeholder="Deixe sua menssagem aqui ..."></textarea>
                        <button className="mt-4 btn btn-block btn-primary" >Enviar</button>
                    </div>
                </div>  
            </div>
            <FooterBanner />
        </Container>
    )
}

export default EncontreiUmPet
