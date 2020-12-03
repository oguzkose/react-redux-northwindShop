import React, { Component } from "react";
import { connect } from "react-redux";
import * as cartActions from "../../redux/actions/cartActions";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavItem,
  NavLink,
  Badge,
} from "reactstrap";
import { bindActionCreators } from "redux";
import {Link} from "react-router-dom"
import alertify from 'alertifyjs'

class CartSummary extends Component {

 removeFromCart=(product)=>{
  this.props.actions.removeFromCart(product)
  alertify.error(product.productName + " sepetten silindi" , 1)
 }
  renderEmpty() {
    return (
      <NavItem>
        <NavLink>
          Cart is Empty <i class="fas fa-cart-plus"></i>
        </NavLink>
      </NavItem>
    );
  }
  renderSummary() {
    return (
      <UncontrolledDropdown nav inNavbar>
        <DropdownToggle nav caret>
          Your Carts <i class="fas fa-shopping-cart"></i>
        </DropdownToggle>
        <DropdownMenu right>
          {this.props.cart.map((cartItem) => (
            <DropdownItem key={cartItem.product.id}>
              {cartItem.product.productName}
              <Badge color="success">{cartItem.quantity}</Badge>
              <Badge color="danger" onClick={()=> this.removeFromCart(cartItem.product)}>
                <i class="fas fa-trash-alt"></i>
              </Badge>
            </DropdownItem>
          ))}

          <DropdownItem divider />
          <DropdownItem><Link Link to={"/cart"}>Go To Cart</Link></DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    );
  }
  render() {
    return (
      <div>
        {this.props.cart.length > 0 ? this.renderSummary() : this.renderEmpty()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    cart: state.cartReducer,
  };
}
function mapDispatchToProp(dispatch) {
  return {
    actions: {
      removeFromCart: bindActionCreators(cartActions.removeFromCart, dispatch),
    },
  };
}
export default connect(mapStateToProps, mapDispatchToProp)(CartSummary);
