import React from "react";
import { Container, Carousel } from "react-bootstrap";
import Dog from "../../components/assets/run-dog.jpg";
import Pets from "../../components/assets/pets.jpg";
import Doctor from "../../components/assets/doctor.jpg";

import "./style.css";

const Page = () => {
  return (
    <Container>
      <Carousel className="mt-5 carrosel-imagem" style={{width: '100%'}}>
        <Carousel.Item>
          <img className="d-block w-100" src={Dog} alt="First slide" />
          <Carousel.Caption>
            <h2>Seu Pet Mais Feliz!</h2>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src={Pets} alt="Third slide" />

          <Carousel.Caption>
            <h2>Com cuidados Especiais</h2>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src={Doctor} alt="Third slide" />

          <Carousel.Caption>
            <h1>Pet's Care</h1>
            <p>
              Soluções para Pet-Shops 
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </Container>
  );
};

export default Page;
