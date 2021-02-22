import React, { useState } from "react";
import FooterBanner from "../../components/FooterBanner";
import { Container } from "react-bootstrap";

import { Link } from 'react-router-dom'

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { LostFindsActions } from "../../store/actions/lostfinds";
import awsS3Service from '../../services/aws-s3.service'
import { Spinner } from 'react-bootstrap'
import defaultImg from "../../assets/images/default.jpg"


import DogImg from '../../assets/images/dog.png'

// interface Props {
//   userSigned: boolean;
//   lostFindsSuccess: boolean;
//   lostFindsErrorMessage: string;
//   lostFind: (data: any) => void;
//   lostFindSetError: (message: string) => void;
//   lostFindClear: () => void;
// }

const LostFound = ({
  userSigned,
  lostFindsSuccess,
  lostFindsErrorMessage,
  lostFind,
  lostFindSetError,
  lostFindClear
}) => {

  const notSignedError = !userSigned
    ? "Você precisa estar logado para acessar essa funcionalidade."
    : undefined;

  const [address, setAddress] = useState("");
  const [reference, setReference] = useState("");
  const [obs, setObs] = useState("");

  const [userImage, setUserImage] = useState(defaultImg)
  const [thumbLoading, setThumbLoading] = useState(false)

  const sendRegister = () => {
    if (address.trim().length === 0) {
      lostFindSetError("Por favor, informe o local.");
    } else if (reference.trim().length === 0) {
      lostFindSetError("Por favor, informe um ponto de referência.");
    } else {
      lostFind({
        address,
        reference,
        obs
      });
    }
  };

  if (lostFindsSuccess) {
    setTimeout(() => {
      setAddress("");
      setReference("");
      setObs("");
      lostFindClear();
    }, 2000);
  }


  const handleThumbChange = (e) => {
    setThumbLoading(true)
    awsS3Service.upload(e.target.files[0], 'api/services/app/petsLost')
      .then(link => {
        setUserImage(link)
      })
      .catch(() => {
        // setState({...state, })
      })
      .finally(() => {
            setThumbLoading(false)
      })
  }

  return (
    <Container className="lost-finds-content">

      {lostFindsErrorMessage && (
        <div className="lost-finds-content-message-error">
          {lostFindsErrorMessage}
        </div>
      )}

      {/*notSignedError && (
        <div className="lost-finds-content-message-error">{notSignedError}</div>
      )*/}

      {lostFindsSuccess && (
        <div className="donate-content-message-success">
          Cadastro de achados e perdidos efetuado com sucesso!
        </div>
      )}
      
      {!lostFindsSuccess && (
        <div className="container d-flex justify-content-center">
          <form className="col-md-6 ">

          <div className="form-group row mt-5 mb-1">
            <label className="h6 font-weight-bold ml-2">
              Fale um pouco sobre o Pet
            </label>
          </div>

          <div className="row d-flex justify-content-center mb-2">
            <p className="my-2">Selecione a foto do animalsinho</p>
            <label className="col-12 d-flex justify-content-center position-relative" htmlFor="foto_1">
              <img
                className="card-img img-fluid"
                id="url_image1"
                src={userImage}
                alt="thumb"
                style={{ objectFit: 'cover', width: '32%', borderRadius: '100px', height: '150px', cursor: 'pointer' }}
              />
              <div hidden={!thumbLoading} className='position-absolute' style={{ display: 'flex', width: '40%', borderRadius: '100px', height: '100%', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                <Spinner animation='border' style={{ margin: '0 auto' }} />
              </div>
              </label>
                <input
                  type="file"
                  id="foto_1"
                  accept="image/*"
                  onChange={handleThumbChange}
                  hidden
                  disabled={thumbLoading}
                />
          </div>

          <div className="form-group row">
            <input
              className="form-control col-md-12"
              aria-label=""
              placeholder="Local onde foi encontrado"
              value={address}
              onChange={e => setAddress(e.target.value)}
            />
          </div>
          <div className="form-group row">
            <input
              className="form-control col-md-12"
              aria-label=""
              placeholder="Ponto de referência"
              value={reference}
              onChange={e => setReference(e.target.value)}
            />
          </div>
          <div className="form-group row">
            <textarea
              className="form-control col-md-12"
              aria-label=""
              placeholder="Informações adicionais"
              value={obs}
              onChange={e => setObs(e.target.value)}
            />
          </div>
          <div className="form-group row">
            <button
              className="btn btn-primary"
              type="button"
              onClick={sendRegister}
            >
              Cadastrar
            </button>
          </div>
        </form>
        </div>
      )}

      <FooterBanner />
    </Container>
  );
};

const mapStateToProps = (state) => ({
  userSigned: state.customer.customerStatus.userSigned,
  lostFindsSuccess: state.lostfinds.lostFindsStatus.lostFindsSuccess,
  lostFindsErrorMessage: state.lostfinds.lostFindsStatus.lostFindsErrorMessage
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ ...LostFindsActions }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(LostFound);
