import { createContext, useState, useEffect, useContext } from 'react';

const JSON_SERVER = 'http://localhost:3000';

const InventoryContext = createContext();

export const InventoryProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [sales, setSales] = useState([]);

  // Load data from JSON Server using fetch + .then()
  useEffect(() => {
    fetch(`${JSON_SERVER}/products`)
      .then(response => response.json())
      .then(data => {
        setProducts(data);
        return fetch(`${JSON_SERVER}/sales?_sort=date&_order=desc`);
      })
      .then(response => response.json())
      .then(data => {
        setSales(data);
      })
      .catch(err => {
        console.error('Error loading data:', err);
      });
  }, []);

  // Add product
  const addProduct = (data) => {
    fetch(`${JSON_SERVER}/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...data,
        price: parseFloat(data.price),
        quantity: parseInt(data.quantity),
        createdAt: new Date().toISOString()
      })
    })
      .then(response => response.json())
      .then(newProduct => {
        setProducts(prev => [...prev, newProduct]);
        alert('Product added successfully!');
      })
      .catch(err => {
        console.error('Error adding product:', err);
        alert('Error adding product');
      });
  };

  // Update product
  const updateProduct = (id, updates) => {
    fetch(`${JSON_SERVER}/products/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates)
    })
      .then(response => response.json())
      .then(updated => {
        setProducts(prev => prev.map(p => p.id === id ? updated : p));
        alert('Product updated!');
      })
      .catch(err => {
        console.error('Error updating product:', err);
        alert('Error updating product');
      });
  };

  // Delete product
  const deleteProduct = (id) => {
    if (!confirm('Delete this product?')) return;
    fetch(`${JSON_SERVER}/products/${id}`, {
      method: 'DELETE'
    })
      .then(() => {
        setProducts(prev => prev.filter(p => p.id !== id));
        alert('Product deleted');
      })
      .catch(err => {
        console.error('Error deleting product:', err);
        alert('Error deleting product');
      });
  };

  // Record sale with automatic stock deduction
  const recordSale = (saleData) => {
    fetch(`${JSON_SERVER}/products/${saleData.productId}`)
      .then(response => response.json())
      .then(product => {
        if (product.quantity < saleData.quantity) {
          alert('Insufficient stock!');
          return;
        }

        const newQty = product.quantity - saleData.quantity;
        return fetch(`${JSON_SERVER}/products/${saleData.productId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ quantity: newQty })
        })
          .then(response => response.json())
          .then(() => {
            const sale = {
              productId: product.id,
              productName: product.name,
              quantity: parseInt(saleData.quantity),
              total: product.price * parseInt(saleData.quantity),
              date: new Date().toISOString().split('T')[0],
              createdAt: new Date().toISOString()
            };

            return fetch(`${JSON_SERVER}/sales`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(sale)
            })
              .then(response => response.json())
              .then(newSale => {
                setSales(prev => [newSale, ...prev]);
                setProducts(prev => prev.map(p => 
                  p.id === product.id ? { ...p, quantity: newQty } : p
                ));
                alert('Sale recorded successfully!');
              });
          });
      })
      .catch(err => {
        console.error('Error recording sale:', err);
        alert('Error recording sale');
      });
  };

  // Delete sale
  const deleteSale = (id) => {
    if (!confirm('Delete this sale record?')) return;
    fetch(`${JSON_SERVER}/sales/${id}`, {
      method: 'DELETE'
    })
      .then(() => {
        setSales(prev => prev.filter(s => s.id !== id));
        alert('Sale record deleted');
      })
      .catch(err => {
        console.error('Error deleting sale:', err);
        alert('Error deleting sale');
      });
  };

  // Summary stats
  const totalProducts = products.length;
  const totalValue = products.reduce((sum, p) => sum + (p.price * p.quantity), 0);
  const lowStock = products.filter(p => p.quantity < 10).length;
  const totalSales = sales.length;

  const value = {
    products,
    sales,
    totalProducts,
    totalValue,
    lowStock,
    totalSales,
    addProduct,
    updateProduct,
    deleteProduct,
    recordSale,
    deleteSale
  };

  return (
    <InventoryContext.Provider value={value}>
      {children}
    </InventoryContext.Provider>
  );
};

export const useInventory = () => {
  const context = useContext(InventoryContext);
  if (!context) {
    throw new Error('useInventory must be used within an InventoryProvider');
  }
  return context;
};