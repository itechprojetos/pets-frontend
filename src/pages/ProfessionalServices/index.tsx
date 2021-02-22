import React, { useEffect } from "react";

import "./styles.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import CardItem from "../../components/CardItem";
import { Container } from "react-bootstrap";
import styled from "styled-components";
import { ServicesActions } from "../../store/actions/services";
import { Service } from "../../models/Service";

const ContainerSection = styled(Container)`
  position: relative;
  z-index: 2000;
`;

const InfoSection = styled.div`
  -webkit-box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.25);
  -moz-box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.25);
  box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.25);
  position: relative;
`;

interface Props {
  services: Service[];
  serviceGetAll: () => void;
}

const Services: React.FC<Props> = ({ services, serviceGetAll }) => {
  useEffect(() => {
    serviceGetAll();
  }, [serviceGetAll]);

  const store = {
    rate: 3
  };

  return (
    <div>
      <div className="service-content">
        <img
          className="w-100"
          src={require("../../assets/images/bg_header_store.jpg")}
          alt=""
        />
        <div className="container service-content-header-title">
          <div className="service-content-header-title-content">
            <div className="service-content-header-title-content-title">
              Serviços
            </div>
            <div>
              <FontAwesomeIcon
                icon={faStar}
                size="sm"
                className={`mr-1 shop-content-store-rate${
                  store.rate > 0 ? "-active" : ""
                }`}
              />
              <FontAwesomeIcon
                icon={faStar}
                size="sm"
                className={`mr-1 shop-content-store-rate${
                  store.rate > 1 ? "-active" : ""
                }`}
              />
              <FontAwesomeIcon
                icon={faStar}
                size="sm"
                className={`mr-1 shop-content-store-rate${
                  store.rate > 2 ? "-active" : ""
                }`}
              />
              <FontAwesomeIcon
                icon={faStar}
                size="sm"
                className={`mr-1 shop-content-store-rate${
                  store.rate > 3 ? "-active" : ""
                }`}
              />
              <FontAwesomeIcon
                icon={faStar}
                size="sm"
                className={`mr-1 shop-content-store-rate${
                  store.rate > 4 ? "-active" : ""
                }`}
              />
            </div>
          </div>
        </div>
      </div>
      <Container>
        <div className="block-items-container">
          <h5>NOSSOS SERVIÇOS</h5>
          <div className="row">
            {/* products */}
            {services.map((service, index) => (
              <CardItem key={index} service={service} />
            ))}
          </div>
        </div>
      </Container>
      <ContainerSection>
        <InfoSection>
          <div className="row p-3 shop-content-info">
            <div className="col-md-6">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse laoreet odio sed eros gravida iaculis. Phasellus
              iaculis at felis sit amet consectetur. Donec a elit vitae sapien
              finibus lobortis vel eu felis. Etiam semper enim in felis
              tincidunt, in tincidunt ex pulvinar. Ut tortor mauris, interdum
              nec vulputate vitae, pulvinar vel purus. Vestibulum eu finibus
              purus. Proin dignissim ultricies elit vel lacinia.
            </div>
            <div className="col-md-3">
              <div className="shop-content-info-bold">
                NÚMERO DE FUNCIONÁRIOS
              </div>
              <div>12</div>
            </div>
            <div className="col-md-3">
              <div className="shop-content-info-bold">TELEFONES</div>
              <div>(11)0000-0000</div>
              <div>(11)0000-0000</div>
              <div className="shop-content-info-bold mt-2">ENDEREÇO</div>
              <div>(11)0000-0000</div>
              <div>(11)0000-0000</div>
            </div>
          </div>
        </InfoSection>
      </ContainerSection>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  services: state.services.servicesStatus.services
});

const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators({ ...ServicesActions }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Services);
