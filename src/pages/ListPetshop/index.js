import React, { useState } from "react";
import { PageArea } from "./styled";
import { Link } from "react-router-dom";
import Promo from "../../components/assets/oferta.png";
import PetLogo from "../../components/assets/loja-de-animais.png";
import GoldenStar from "../../components/assets/golden-star.png";
import { PageContainer } from "../../components/MainComponets";

function Page() {
  const [petName, setPetName] = useState("Nome Fantasia do Estabelecimento");
  const [classification, setClassification] = useState(4.5);

  return (
    <PageContainer>
      <PageArea>
        <div className="header-home-container">
          <input
            className="searchItems"
            type="search"
            placeholder="Busque por produto, loja ou veterinário"
          />
          <div className="promo-container">
            <img src={Promo} alt="Imagem da promoção" />
            <Link>Promoção</Link>
          </div>
        </div>
        <label>PetShops</label>
        <div className="body-petshop">
          <div className="body-home-container">
            <div className="petshop-container">
              <div className="logoPet">
                <img src={PetLogo} alt="Logo Estabelecimento" />
              </div>
              <div className="dataPet">
                <Link>{petName}</Link>
                <div className="classification">
                  <img src={GoldenStar} alt="Classificação" />
                  <p>{classification}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="body-home-container">
            <div className="petshop-container">
              <div className="logoPet">
                <img src={PetLogo} alt="Logo Estabelecimento" />
              </div>
              <div className="dataPet">
                <Link>{petName}</Link>
                <div className="classification">
                  <img src={GoldenStar} alt="Classificação" />
                  <p>{classification}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="body-home-container">
            <div className="petshop-container">
              <div className="logoPet">
                <img src={PetLogo} alt="Logo Estabelecimento" />
              </div>
              <div className="dataPet">
                <Link>{petName}</Link>
                <div className="classification">
                  <img src={GoldenStar} alt="Classificação" />
                  <p>{classification}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </PageArea>
    </PageContainer>
  );
}

export default Page;
