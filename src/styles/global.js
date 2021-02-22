import { createGlobalStyle } from 'styled-components';
import 'react-toastify/dist/ReactToastify.css';

export default createGlobalStyle`

* {
    margin: 0;
    border: 0;
    outline: 0;
    box-sizing: border-box;
}

*:focus{
    outline: 0;
}

body{
    -webkit-font-smoothing: antialiased;
}

body, input, button{
    font: 14px 'Lato', sans-serif !important;
}

p{
    margin-bottom: 0 !important;
}

a{
    text-decoration: none;
    &:hover {
        text-decoration: none;
    }
}

ul{
    list-style: none;
}

button{
    cursor: pointer;
}

h1,h2,h3,h4,h5,h6{
    margin: 0;
    padding: 0;
}

.form-control:focus {

    border-color: #ffbd00 !important;
    box-shadow: 0 0 0 0.2rem #ffbd00 !important;

}

.btn-link:focus{
    text-decoration: none;
}

.block-items-container {
  padding: 20px 10px 10px;

  & > h5 {
    margin-bottom: 0;
  }

  & .row {
    justify-content: space-between;
    padding: 0 5px;
  }
}

.btn-circle.btn-xl {
  width: 70px;
  height: 70px;
  border-radius: 60px;
  overflow: hidden;
}

.containerBtn {
  width: 120px;
  height: 120px;
  overflow: hidden;
}

.professional-services-cards {
  display: grid;
  width: 100%;
  grid-template-columns: repeat(1, 1fr);
  margin-top: 1.5em;
  @media screen and (min-width: 576px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media screen and (min-width: 992px) {
    grid-template-columns: repeat(4, 1fr);
  }
  grid-gap: 25px;

  & > a {
    display: inline-block;
    width: 100% !important;
  }
}

.professional-card {
  display: flex;
  flex-direction: column;
  background: white;
  box-shadow: 0px 0px 25px 0px rgba(0,0,0,0.2);
  width: 100%;

  &-picture {
    width: 100%;
    height: 12em;
    object-fit: cover;
  }

  &-separator {
    height: .5em;
    width: 100%;
    background-color: #ffbd00;
  }

  &-name {
    text-align: center;
    font-size: 1.1rem;
    margin-top: 1.5em;
    color: black;
  }

  &-profession {
    text-align: center;
    margin-bottom: 1.5em;
    text-transform: uppercase;
    color: black;
  }
}

.pet-image {
  width: 120px;
  height: 120px;
  border-radius: 60px;
  -webkit-box-shadow: 0 0 8px 2px rgba(0, 0, 0, 0.25);
  -moz-box-shadow: 0 0 8px 2px rgba(0, 0, 0, 0.25);
  box-shadow: 0 0 8px 2px rgba(0, 0, 0, 0.25);
  overflow: hidden;
  & > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.loader-spinner {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-items: center;
  justify-content: center;
  padding: 5em 0;
  font-size: 1.2rem;

  & > span {
    margin-bottom: 1em;
  }
}

.lost-finds-content {
  color: #666;

  &-title {
    font-size: 1.6rem;
    font-weight: 500;
    color: black;
    margin-top: 40px;

    & > span {
      color: #ffbd00;
    }
  }
  &-type {
    font-size: 0.9rem;
  }
  &-message {
    font-size: 1rem;
    margin: 20px 0 40%;
    &-error {
      color: red;
    }
    &-success {
      color: green;
    }
  }
}

.react-markdown {
  max-width: 100%;
  display: block;

  img {
    max-width: 100%;
  }

  &.resume {
    img {
      display: none;
    }
  }
}

a {
  color: rgba(0, 0, 0, 0.8);
  &:hover {
    color: rgba(0,0,0,0.7);
  }
}

`;