import Link from "next/link";
import { useState } from "react";
import useClickOutside from "../../util/outsideClick";


const MobileMenu = ({ isToggled, toggleClick, superunivers_univers_categories }) => {

    
    const [isActive, setIsActive] = useState({
        status: false,
        key: "",
    });

    const handleToggle = (key) => {
        if (isActive.key === key) {
            setIsActive({
                status: false,
            });
        } else {
            setIsActive({
                status: true,
                key,
            });
        }
    };

    let domNode = useClickOutside(() => {
        setIsActive({
            status: false,
        });
    });
    return (
        superunivers_univers_categories&&
        <>
            <div
                className={
                    isToggled
                        ? "mobile-header-active mobile-header-wrapper-style sidebar-visible"
                        : "mobile-header-active mobile-header-wrapper-style"
                }
            >
                <div className="mobile-header-wrapper-inner">
                    <div className="mobile-header-top">
                        <div className="mobile-header-logo">
                            <Link href="/">
                                <a>
                                    <img
                                        src="/assets/imgs/logoDF.jpg"
                                        alt="logo"
                                    />
                                </a>
                            </Link>
                        </div>
                        <div className="mobile-menu-close close-style-wrap close-style-position-inherit">
                            <button
                                className="close-style search-close"
                                onClick={toggleClick}
                            >
                                <i className="icon-top"></i>
                                <i className="icon-bottom"></i>
                            </button>
                        </div>
                    </div>
                    <div className="mobile-header-content-area">
                        <div className="mobile-search search-style-3 mobile-header-border">
                            <form action="#">
                                <input
                                    type="text"
                                    placeholder="Recherchez produits, entreprises ..."
                                />
                                <button type="submit">
                                    <i className="fi-rs-search"></i>
                                </button>
                            </form>
                        </div>
                        <div className="mobile-menu-wrap mobile-header-border">
                            <nav>
                                <ul className="mobile-menu" ref={domNode}>
                                    {
                                        superunivers_univers_categories.map(superunivers_univers_categorie=>(
                                    <li
                                        className={
                                            isActive.key == 3
                                                ? "menu-item-has-children active"
                                                : "menu-item-has-children"
                                        }
                                    >
                                        <span
                                            className="menu-expand"
                                            onClick={() => handleToggle(3)}
                                        >
                                            <i className="fi-rs-angle-small-down"></i>
                                        </span>
                                        <Link href="#">
                                            <a> {superunivers_univers_categorie["superunivers"]["attributes"]["LIB"]}</a>
                                        </Link>
                                        <ul
                                            className={
                                                isActive.key == 3
                                                    ? "dropdown"
                                                    : "d-none"
                                            }
                                        >
                                        {superunivers_univers_categorie["categories_univers"].map(categorie_univers=>(
                                            <li className="menu-item-has-children">
                                            <span className="menu-expand"></span>
                                            <Link href="#">
                                                <a>{categorie_univers["univers"]["attributes"]["LIB"]}</a>
                                            </Link>
                                            <ul className="dropdown">
                                                {categorie_univers["categories"].map(categorie=>(
                                                <li>
                                                    <Link href="/shop-product-right">
                                                        <a>{categorie["attributes"]["LIB_FR"]}</a>
                                                    </Link>
                                               </li>
                                                ))}
                                            </ul>
                                        </li>
                                        ))}
                                        </ul>
                                    </li>                                            
                                    ))
                                    }
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MobileMenu;
