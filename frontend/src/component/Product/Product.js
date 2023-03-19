import React, { Fragment, useEffect, useState } from 'react';
import "./Products.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProduct  } from '../../actions/productAction';
import Loader from '../layout/Loader/Loader';
import ProductCard from '../Home/ProductCard';
import Pagination from "react-js-pagination";
import { useAlert } from 'react-alert';
import Typography from "@material-ui/core/Typography";
import MetaData from '../layout/MetaData';


const categories = [
    "Laptop",
    "Footwear",
    "Bottom",
    "Tops",
    "Attire",
    "Camera",
    "SmartPhones",
]

const Products = ({match}) => {
    const dispatch = useDispatch();
    const alert = useAlert();

    const [currentPage, setCurrentPage] = useState(1);
    const [category, setCategory] = useState("")

    const {products,loading,error,productsCount,resultPerPage} = useSelector(
        (state) => state.products)
    

    const keyword = match.params.keyword;

    const setCurrentPageNo = (e) => {
        setCurrentPage(e)
    }

    

    useEffect(() => {
        if(error){
            alert.error(error)
            dispatch(clearErrors())
        }
        dispatch(getProduct(keyword, currentPage,category))
    }, [dispatch,keyword, currentPage,category,alert,error]);

    
    
  return <Fragment>
      {loading ? <Loader/> : 
      <Fragment>

          <MetaData title="PRODUCTS -- P.T.D.A"/>
          <h2 className="productsHeading">Products</h2>

          <div className="products">
              {products && products.map((product) => (
                  <ProductCard key={product._id} product={product} />
              ))}
          </div>
          <div className="filterBox">
              <Typography></Typography>
<Typography>Categories</Typography>
            <ul className="categoryBox">
                {categories.map((category) => (
                    <li className="category-link"
                    key={category}
                    onClick={() => setCategory(category)}
                    >
                        {category}

                    </li>
                ))}
            </ul>
            </div>
         
          <div className="paginationBox">
              <Pagination
              activePage={currentPage}
              itemsCountPerPage={resultPerPage}
              totalItemsCount={productsCount}
              onChange={setCurrentPageNo}
              nextPageText="Next"
              prevPageText="Prev"
              firstPageText="First"
              lastPageText="Last"
              itemClass="page-item"
              linkClass="page-link"
              activeClass="pageItemActive"
              activeLinkClass="pageLinkActive"
              />
          </div>
          </Fragment>}
  </Fragment>;
};

export default Products;