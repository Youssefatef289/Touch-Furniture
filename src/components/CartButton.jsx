import { useState } from 'react'
import { FaShoppingCart } from 'react-icons/fa'
import { useCart } from '../context/CartContext'
import Cart from './Cart'
import './Cart.css'

const CartButton = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { getTotalItems } = useCart()

  const toggleCart = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      <button
        onClick={toggleCart}
        className="cart-toggle"
        aria-label="Shopping Cart"
      >
        <FaShoppingCart className="w-5 h-5" />
        {getTotalItems() > 0 && (
          <span className="cart-badge">{getTotalItems()}</span>
        )}
      </button>
      <Cart isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  )
}

export default CartButton

