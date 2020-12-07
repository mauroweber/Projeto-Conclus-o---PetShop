import React from "react";
import { Container, Carousel } from "react-bootstrap";
import Dog from "../../components/assets/run-dog.jpg";
import Pets from "../../components/assets/pets.jpg";
import Doctor from "../../components/assets/doctor.jpg";

import "./style.css";

const Page = () => {
  return (
    <Container>
      <Carousel className="mt-5 carrosel-imagem">
        <Carousel.Item>
          <img className="d-block w-100" src={Dog} alt="First slide" />
          <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src={Pets} alt="Third slide" />

          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src={Doctor} alt="Third slide" />

          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </Container>
  );
};

export default Page;
