import React, { Fragment, useState } from "react";
import "./Delivery.css";
import { useSelector, useDispatch } from "react-redux";
import { saveDeliveryInfo } from "../../actions/cartAction";
import MetaData from "../layout/MetaData";
import PinDropIcon from "@material-ui/icons/PinDrop";
import HomeIcon from "@material-ui/icons/Home";
import LocationCity from "@material-ui/icons/LocationCity";
import PhoneIcon from "@material-ui/icons/Phone";
import { useAlert } from "react-alert";
import CheckoutSteps from "../Cart/CheckoutSteps";

const Delivery = ({history}) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { deliveryInfo } = useSelector((state) => state.cart);

  const [streetName, setStreetName] = useState(deliveryInfo.streetName);
  const [area, setArea] = useState(deliveryInfo.area);
  const [houseNum, setHouseNum] = useState(deliveryInfo.houseNum);
  const [phoneNum, setPhoneNum] = useState(deliveryInfo.phoneNum);

  const deliverySubmit = (e) => {
    e.preventDefault();

    if (phoneNum.length < 10 || phoneNum.length > 10) {
      alert.error("Phone Number Should Be 10 Digits Only");
      return;
    }
    dispatch(
      saveDeliveryInfo({area, streetName, houseNum, phoneNum})
    );
    history.push("/order/confirm")
  };

  return (
    <Fragment>
        <MetaData title="Delivery Details" />

        <CheckoutSteps activeStep={0} />
      <div className="deliveryContainer">
        <div className="deliveryBox">
          <h2 className="deliveryHeading">Delivery Details</h2>

          <form
            className="deliveryForm"
            encType="multipart/form-data"
            onSubmit={deliverySubmit}
          >
            <div>
              <HomeIcon />
              <input
                type="text"
                placeholder="Area Name"
                value={area}
                onChange={(e) => setArea(e.target.value)}
              />
            </div>

            <div>
              <LocationCity />
              <input
                type="text"
                placeholder="Street Name"
                value={streetName}
                onChange={(e) => setStreetName(e.target.value)}
              />
            </div>

            <div>
              <PinDropIcon />
              <input
                placeholder="House Number"
                value={houseNum}
                onChange={(e) => setHouseNum(e.target.value)}
              />
            </div>

            <div>
              <PhoneIcon />
              <input
                type="number"
                placeholder="Phone Number"
                required
                value={phoneNum}
                onChange={(e) => setPhoneNum(e.target.value)}
                size="10"
              />
            </div>

            <input
              type="submit"
              value="Continue"
              className="deliveryBtn"
            />
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Delivery;
