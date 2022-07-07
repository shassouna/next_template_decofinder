import React, { useState } from "react";

const ProductTab = (props) => {
    const [activeIndex, setActiveIndex] = useState(1);

    const handleOnClick = (index) => {
        setActiveIndex(index);
    };

    return (
        <div className="product-info">
            <div className="tab-style3">
                <ul className="nav nav-tabs text-uppercase">
                    <li className="nav-item">
                        <a className={activeIndex === 1 ? "nav-link active" : "nav-link"} id="Description-tab" data-bs-toggle="tab" onClick={() => handleOnClick(1)}>
                            Description
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className={activeIndex === 2 ? "nav-link active" : "nav-link"} id="Additional-info-tab" data-bs-toggle="tab" onClick={() => handleOnClick(2)}>
                            Caractéristiques
                        </a>
                    </li>
                </ul>
                <div className="tab-content shop_info_tab entry-main-content">
                    <div className={activeIndex === 1 ? "tab-pane fade show active" : "tab-pane fade"} id="Description">
                        <div className="">
                            <p>{props.produit['attributes']['DESC_FR']}</p>
                        </div>
                    </div>
                    <div className={activeIndex === 2 ? "tab-pane fade show active" : "tab-pane fade"} id="Additional-info">
                        <table className="font-md">
                            <tbody>
                                <tr className="stand-up">
                                    <th>Origine</th>
                                    <td>
                                        <p>{props.pays['attributes']['LIB_FR']}</p>
                                    </td>
                                </tr>
                                <tr className="folded-wo-wheels">
                                    <th>Ref.Fab</th>
                                    <td>
                                        <p>{props.produit['attributes']['REFERENCE_FABRICANT']}</p>
                                    </td>
                                </tr>
                                <tr className="folded-w-wheels">
                                    <th>EAN</th>
                                    <td>
                                        <p>{props.produit['attributes']['EAN']}</p>
                                    </td>
                                </tr>
                                <tr className="door-pass-through">
                                    <th>Dimensions</th>
                                    <td>
                                        <p></p>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductTab;
