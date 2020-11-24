import React from "react";
import {Link} from "react-router-dom"
import { AsideArea} from "./styled";

const Aside = () => {

  return (

    <AsideArea>
        <ul>
          <li><Link to="/dashboard">Exemposss</Link></li>
          <li><Link to="/dashboard">Exemposss</Link></li>
          <li><Link to="/dashboard">Exemposss</Link></li>
        </ul>
    </AsideArea>
    );

};

export default Aside;
