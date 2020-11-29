import React, { useCallback, useEffect, useState } from "react";
import { Col, Row, Form, Card, Button, Modal, Image } from "react-bootstrap";
import api from "../../helpers/Api";

import { FaTrashAlt } from "react-icons/fa";

import "./style.css";

function Product() {
  const [products, setProducts] = useState([]);
  const [show, setShow] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("0");
  const [product, setProduct] = useState("");
  const [description, setDescription] = useState("");
  const [img, setImg] = useState();
  const [price, setPrice] = useState(0);
  const [urlImg, setUrlImg] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  async function loadProducts() {
    const response = await api.get("product/findAll");
    setProducts(response.data);

  }

  async function loadCategory() {
    const response = await api.get("category/findAll");
    setCategories(response.data);
  }

  function handleSelectedCategory(e) {
    e.preventDefault();
    setSelectedCategory(e.target.value);
  }

  const insertFile =    async (id, file) =>{debugger
     await api.put("product/insertImg/" + id, file)
     .then( data =>{
       setUrlImg(data.data.url);
     })
 }

  async  function handleAddPRoduct (e) {
    e.preventDefault();

      const data = {
        description,
        price,
        name: product,
        imgUrl: urlImg,
      };

      console.log(data);
      const file = new FormData();
      file.append("img", img);


    await api.post("product/insert", data)
      .then(response =>{debugger
        console.log(response.data);
        const result = response.data;
        setProducts([...products,result]);
        if(result.id != null){
          insertFile(result.id, file);
        }
      }).catch(error =>{
        console.log(error);
      });




    handleClose();
    loadProducts();
  };

  async function handleDeleteProduct(id) {
    await api.delete(`product/${id}`);
    setProducts([...products.filter(p => p.id !== id)]);
  }

  useEffect(() => {
    loadCategory();
  }, []);

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <Col>
      <Col style={{ textAlign: "center", marginTop: 20 }}>
        <Button className="btn-open-cad" variant="dark" onClick={handleShow}>
          Cadastrar produto
        </Button>
      </Col>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Adicionar Produto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            onSubmit={handleAddPRoduct}
            className="form-container"
            encType="multipart/form-data"
          >
            <Form.Group>
              <Form.Label>Produto</Form.Label>
              <Form.Control
                type="text"
                name="product"
                value={product}
                onChange={(e) => setProduct(e.target.value)}
                placeholder="Nome do Produto"
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>URL imagem do Produto</Form.Label>
              <Form.Control
                type="text"
                name="urlImg"
                value={urlImg}
                onChange={(e) => setUrlImg(e.target.value)}
              />
              <Form.File
                id="img-upload"
                label="Escolha a imagem do produto"
                accept="image/x-png,image/gif,image/jpeg"
                onChange={(e) => setImg(e.target.files[0])}
                required
              />
            </Form.Group>
            <Form.Group controlId="id-description">
              <Form.Label>Descrição</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group>
              <Row>
                <Col>
                  <Form.Label>Categoria</Form.Label>
                  <Form.Control
                    as="select"
                    value={selectedCategory}
                    onChange={handleSelectedCategory}
                  >
                    <option>Escolha uma categoria</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </Form.Control>
                </Col>
                <Col>
                  <Form.Label>Preço</Form.Label>
                  <Form.Control
                    type=""
                    name="price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="Preço do Produto"
                    required
                  ></Form.Control>
                </Col>
              </Row>
            </Form.Group>
            <Button type="submit" className="btn-product" variant="dark">
              Cadastrar
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
      <Row>
        {products.map((product) => (
          <Col key={product.id} sm={12} md={6} lg={4} style={{ marginTop: 50 }}>
            <Card>
              <Card.Img
                className="img-pet"
                variant="top"
                as={Image}
                src={product.imgUrl}
                fluid = {true}
                alt={product.name}
              />
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>{product.description}</Card.Text>
                <p>
                  Preço: <strong>{product.price}R$</strong>
                </p>
                <FaTrashAlt
                  onClick={(e) => handleDeleteProduct(product.id)}
                  className="icon-trash"
                />
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Col>
  );
}

export default Product;
