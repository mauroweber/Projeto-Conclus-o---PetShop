import React, { useEffect, useState } from "react";
import { Col, Row, Form, Card, Button, Modal, Image } from "react-bootstrap";
import api from "../../helpers/Api";

import { FaTrashAlt, FaEdit, FaPlusCircle } from "react-icons/fa";

import "./styled.css";

function Product() {
  const [products, setProducts] = useState([]);
  const [show, setShow] = useState(false);
  const [showCategory, setShowCategory] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("0");
  const [product, setProduct] = useState("");
  const [description, setDescription] = useState("");
  const [img, setImg] = useState();
  const [price, setPrice] = useState(0);
  const [urlImg, setUrlImg] = useState("");
  const [edit, setEdit] = useState(false);
  const [idEdit, setIdEdit] = useState();
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [percentage, setPercentage] = useState(0);

  const token = localStorage.getItem("@PetsCare:token");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleShowCategory = () => {
    handleClose();
    setShowCategory(true);
  };
  const handleCloseCategory = () => {
    setShowCategory(false);
    setCategory("");
    handleShow();
  };

  function cleanFields() {
    setProduct("");
    setDescription("");
    setPrice("");
    setCategory("");
    setQuantity("");
    setPercentage("");
    setSelectedCategory("");
  }

  async function loadProducts() {
    const response = await api.get("product/findAll");
    console.log(token);
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

  const insertFile = async (id, file) => {
    await api.put("product/insertImg/" + id, file).then((data) => {
      setUrlImg(data.data.url);
    });
  };

  async function handleAddPRoduct(e) {
    e.preventDefault();

    const data = {
      description,
      price,
      name: product,
      imgUrl: urlImg,
      porcentagemLucro: percentage,
      quantity,
    };

    const file = new FormData();
    file.append("img", img);
  
    await api
      .post("product/insert", data)
      .then((response) => {
        const result = response.data;
        if (result.id != null) {
          insertFile(result.id, file);
        }
        setProducts([...products, result]);
      })
      .catch((error) => {
        console.log(error);
      });
    cleanFields();
    handleClose();
    loadProducts();
  }

  function loadUpdate(product) {
    const {
      quantity,
      porcentagemLucro,
      price,
      description,
      name,
      id,
    } = product;
    setPrice(price);
    setDescription(description);
    setProduct(name);
    handleShow();
    setEdit(true);
    setIdEdit(id);
    setQuantity(quantity);
    setPercentage(porcentagemLucro);
  }

  async function handleUpdate(e) {
    e.preventDefault();
    setPrice(price);
    setDescription(description);
    setProduct(product);
    setImg(urlImg);
    const file = new FormData();
    file.append("img", img);

    const data = {
      price,
      description,
      name: product,
      urlImg,
      porcentagemLucro: percentage,
      quantity,
    };

    await api.put(`product/${idEdit}`, data).then((response) =>{
      const result = response.data;
      if (result.id != null) {
        insertFile(result.id, file);
      }
    });

    setEdit(false);
    setShow(false);
    loadProducts();

    cleanFields();
  }

  async function handleDeleteProduct(id) {
    await api.delete(`product/${id}`);
    setProducts([...products.filter((p) => p.id !== id)]);
  }

  async function addCategory(e) {
    e.preventDefault();
    const data = {
      name: category,
    };
    await api.post("/category", data);
    handleCloseCategory();
    loadCategory();
    handleShow();
  }

  function handleOut() {
    setEdit(false);
    setProduct("");
    setPrice("");
    setDescription("");
    setShow(false);
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
        <Modal.Header>
          <Modal.Title>
            {edit ? "Editar Produto" : "Adicionar Produto"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            onSubmit={edit ? handleUpdate : handleAddPRoduct}
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
              <Form.File
                id="img-upload"
                label="Insira a imagem do produto"
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
                  <Form.Label>
                    Categoria{" "}
                    <FaPlusCircle
                      onClick={handleShowCategory}
                      className="add"
                    />
                  </Form.Label>
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
              </Row>
            </Form.Group>

            <Form.Group>
              <Row>
                <Col>
                  <Form.Label>Quantidade</Form.Label>
                  <Form.Control
                    name="quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    required
                  ></Form.Control>
                </Col>
                <Col>
                  <Form.Label>Valor unitário</Form.Label>
                  <Form.Control
                    name="price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                  ></Form.Control>
                </Col>
              </Row>
            </Form.Group>
            <Form.Group>
              <Row>
                <Col md={6}>
                  <Form.Label>Percentual de lucro</Form.Label>
                  <Form.Control
                    name="percentage"
                    value={percentage}
                    onChange={(e) => setPercentage(e.target.value)}
                    required
                  ></Form.Control>
                </Col>
              </Row>
            </Form.Group>

            <Button type="submit" className="btn-product" variant="dark">
              {edit ? "EDITAR" : "CADASTRAR"}
            </Button>
            <Button
              variant="danger"
              onClick={handleOut}
              style={{ float: "right" }}
            >
              Sair
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
      <Modal show={showCategory} onHide={handleCloseCategory}>
        <Modal.Header>
          <Modal.Title>Cadastrar Categotia</Modal.Title>
        </Modal.Header>
        <Form onSubmit={addCategory}>
          <Row>
            <Col md={6}>
              <Form.Group>
                <Form.Control
                  style={{ marginLeft: 10 }}
                  type="text"
                  name="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="Categoria"
                  required
                />
              </Form.Group>
            </Col>
            <Col>
              <Button type="submit">Adicionar</Button>
              <Button
                variant="danger"
                style={{ marginLeft: 2 }}
                onClick={handleCloseCategory}
              >
                Sair
              </Button>
            </Col>
          </Row>
        </Form>
      </Modal>
      <Row>
        {products.map((product) => (
          <Col key={product.id} sm={12} md={6} lg={3} style={{ marginTop: 50 }}>
            <Card>
              <Card.Img
                className="img-pet"
                variant="top"
                as={Image}
                src={product.imgUrl}
                fluid={true}
                alt={product.name}
              />
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>{product.description}</Card.Text>
                <p>
                  Quantidade: <strong>{product.quantity}</strong>
                </p>
                <p>
                  Valor unitário <strong>R$: {product.price}</strong>
                </p>
                <p>
                  Valor de Venda
                  <strong>
                    R$:{" "}
                    {(
                      product.price *
                      (1 + product.porcentagemLucro / 100)
                    ).toFixed(2)}
                  </strong>
                </p>
                <p>
                  Valor total de Estoque{" "}
                  <strong>
                    R$:{" "}
                    {product.quantity *
                      (
                        product.price *
                        (1 + product.porcentagemLucro / 100)
                      ).toFixed(2)}{" "}
                  </strong>
                </p>

                <FaEdit onClick={(e) => loadUpdate(product)}></FaEdit>
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
