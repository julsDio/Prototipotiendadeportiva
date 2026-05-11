import { useState } from 'react';
import { ShoppingCart, Search, Menu, Plus, Minus, X, Send, Facebook, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import { ImageWithFallback } from './components/figma/ImageWithFallback';

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  gender: 'mujer' | 'hombre';
  image: string;
  description: string;
  sizes: string[];
}

interface CartItem extends Product {
  quantity: number;
}

const products: Product[] = [
  {
    id: 1,
    name: 'Conjunto Deportivo Mujer',
    price: 89.99,
    category: 'Conjuntos',
    gender: 'mujer',
    image: 'https://images.unsplash.com/photo-1768929096095-8f379b34278b?w=400',
    description: 'Conjunto de top y leggings de alto rendimiento. Fabricado con materiales transpirables y elásticos que se adaptan perfectamente a tu cuerpo. Ideal para entrenamientos intensos y actividades deportivas.',
    sizes: ['XS', 'S', 'M', 'L', 'XL']
  },
  {
    id: 2,
    name: 'Set de Yoga Premium',
    price: 79.99,
    category: 'Conjuntos',
    gender: 'mujer',
    image: 'https://images.unsplash.com/photo-1768929096150-9a76dc1d6560?w=400',
    description: 'Ideal para yoga y pilates con máxima flexibilidad. Material suave y cómodo que permite total libertad de movimiento. Perfecto para tus sesiones de meditación y ejercicio.',
    sizes: ['XS', 'S', 'M', 'L', 'XL']
  },
  {
    id: 3,
    name: 'Ropa Deportiva Elegante',
    price: 94.99,
    category: 'Conjuntos',
    gender: 'mujer',
    image: 'https://images.unsplash.com/photo-1768929096133-1748d1fe5944?w=400',
    description: 'Diseño moderno para entrenamientos intensos. Combina estilo y funcionalidad con tecnología de secado rápido. Mantente fresca y cómoda durante todo tu entrenamiento.',
    sizes: ['XS', 'S', 'M', 'L', 'XL']
  },
  {
    id: 4,
    name: 'Top Deportivo Rojo',
    price: 39.99,
    category: 'Tops',
    gender: 'mujer',
    image: 'https://images.unsplash.com/photo-1597586309250-ceb10255182d?w=400',
    description: 'Top deportivo de alto soporte. Diseñado con copas integradas y material de compresión para máximo soporte durante ejercicios de alto impacto.',
    sizes: ['XS', 'S', 'M', 'L', 'XL']
  },
  {
    id: 5,
    name: 'Leggings Azules',
    price: 54.99,
    category: 'Pantalones',
    gender: 'mujer',
    image: 'https://images.unsplash.com/photo-1597460927195-a6c823cc0d0e?w=400',
    description: 'Leggings de compresión para máximo rendimiento. Tecnología anti-sudor y costuras planas para evitar rozaduras. Cintura alta para mayor comodidad.',
    sizes: ['XS', 'S', 'M', 'L', 'XL']
  },
  {
    id: 6,
    name: 'Conjunto Blanco Elegante',
    price: 99.99,
    category: 'Conjuntos',
    gender: 'mujer',
    image: 'https://images.unsplash.com/photo-1540582093410-c06370c89515?w=400',
    description: 'Set completo de entrenamiento premium. Diseño minimalista y elegante con máxima funcionalidad. Perfecto para lucir bien mientras te ejercitas.',
    sizes: ['XS', 'S', 'M', 'L', 'XL']
  },
  {
    id: 7,
    name: 'Camiseta Deportiva Azul',
    price: 44.99,
    category: 'Camisetas',
    gender: 'hombre',
    image: 'https://images.unsplash.com/photo-1619474221266-0e23ce248c60?w=400',
    description: 'Camiseta transpirable de alto rendimiento. Tejido técnico que absorbe la humedad y se seca rápidamente. Corte atlético que favorece la figura.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL']
  },
  {
    id: 8,
    name: 'Camiseta Roja Sport',
    price: 42.99,
    category: 'Camisetas',
    gender: 'hombre',
    image: 'https://images.unsplash.com/photo-1619361814016-4acc36025fa9?w=400',
    description: 'Tejido técnico con control de humedad. Diseño ergonómico que permite total libertad de movimiento. Ideal para running y entrenamiento funcional.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL']
  },
  {
    id: 9,
    name: 'Conjunto Urbano Deportivo',
    price: 124.99,
    category: 'Conjuntos',
    gender: 'hombre',
    image: 'https://images.unsplash.com/photo-1623285512357-ff3b9a7579ea?w=400',
    description: 'Estilo urbano con funcionalidad deportiva. Perfecto para el gimnasio y para uso casual. Materiales de alta calidad que resisten el uso intensivo.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL']
  },
  {
    id: 10,
    name: 'Camiseta Blanca Premium',
    price: 49.99,
    category: 'Camisetas',
    gender: 'hombre',
    image: 'https://images.unsplash.com/photo-1606105961732-6332674f4ee6?w=400',
    description: 'Diseño clásico con tecnología moderna. Fabricada con algodón premium mezclado con fibras sintéticas para mayor durabilidad y comodidad.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL']
  },
  {
    id: 11,
    name: 'Conjunto Running Pro',
    price: 134.99,
    category: 'Conjuntos',
    gender: 'hombre',
    image: 'https://images.unsplash.com/photo-1643061779987-78b366128372?w=400',
    description: 'Set completo para corredores profesionales. Incluye camiseta y pantalón con tecnología anti-viento y reflectantes para mayor seguridad.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL']
  },
  {
    id: 12,
    name: 'Ropa Deportiva Basketball',
    price: 89.99,
    category: 'Conjuntos',
    gender: 'hombre',
    image: 'https://images.unsplash.com/photo-1710869084206-0e3add7a0c12?w=400',
    description: 'Ideal para entrenamientos de basketball. Tejido ligero y transpirable que favorece la movilidad. Diseño inspirado en el streetwear deportivo.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL']
  }
];

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGender, setSelectedGender] = useState<'todos' | 'mujer' | 'hombre'>('todos');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>('');

  const addToCart = (product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const addToCartFromModal = () => {
    if (selectedProduct && selectedSize) {
      addToCart(selectedProduct);
      setSelectedProduct(null);
      setSelectedSize('');
    }
  };

  const updateQuantity = (id: number, delta: number) => {
    setCart(prevCart =>
      prevCart
        .map(item =>
          item.id === id
            ? { ...item, quantity: item.quantity + delta }
            : item
        )
        .filter(item => item.quantity > 0)
    );
  };

  const removeFromCart = (id: number) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const sendWhatsAppOrder = () => {
    const orderDetails = cart.map(item =>
      `${item.quantity}x ${item.name} - $${(item.price * item.quantity).toFixed(2)}`
    ).join('%0A');

    const message = `¡Hola! Me gustaría hacer el siguiente pedido:%0A%0A${orderDetails}%0A%0ATotal: $${getTotalPrice().toFixed(2)}`;
    const phoneNumber = '1234567890'; // Reemplazar con el número de WhatsApp de la tienda

    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGender = selectedGender === 'todos' || product.gender === selectedGender;
    return matchesSearch && matchesGender;
  });

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-black via-gray-900 to-black shadow-2xl sticky top-0 z-40 border-b-4 border-gradient-to-r from-[#F72C08] to-[#FEA30B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsMenuOpen(true)}
                className="p-2 hover:bg-gradient-to-r hover:from-[#F72C08] hover:to-[#FEA30B] rounded-lg transition-all"
              >
                <Menu className="w-6 h-6 text-white" />
              </button>
              <h1 className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-[#F72C08] to-[#FEA30B] bg-clip-text text-transparent tracking-wider">
                LULIG
              </h1>
              <span className="hidden sm:block text-xs text-gray-400 uppercase tracking-widest">Sport</span>
            </div>

            <div className="flex-1 max-w-xl mx-8 hidden md:flex items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-orange-400" />
                <input
                  type="text"
                  placeholder="Buscar productos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-gray-800/50 border-2 border-gray-700 text-white placeholder-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                />
              </div>
              <div className="flex items-center gap-2">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 hover:bg-gradient-to-r hover:from-[#F72C08] hover:to-[#FEA30B] rounded-lg transition-all group"
                >
                  <Facebook className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 hover:bg-gradient-to-r hover:from-[#F72C08] hover:to-[#FEA30B] rounded-lg transition-all group"
                >
                  <Instagram className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                </a>
                <a
                  href="https://x.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 hover:bg-gradient-to-r hover:from-[#F72C08] hover:to-[#FEA30B] rounded-lg transition-all group"
                >
                  <svg className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-3 hover:bg-gradient-to-r hover:from-[#F72C08] hover:to-[#FEA30B] rounded-lg transition-all group"
              >
                <ShoppingCart className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
                {getTotalItems() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-r from-[#F72C08] to-[#FEA30B] text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold shadow-lg animate-pulse">
                    {getTotalItems()}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Mobile Search */}
          <div className="pb-4 md:hidden">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-orange-400" />
              <input
                type="text"
                placeholder="Buscar productos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-800/50 border-2 border-gray-700 text-white placeholder-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#F72C08] via-[#FE8517] to-[#FEA30B] text-white py-12 sm:py-16 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl mb-4 font-bold">Ropa Deportiva de Alta Calidad</h2>
          <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto">
            Descubre estilo y rendimiento en cada prenda
          </p>
        </div>
      </section>

      {/* Products Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Category Filters */}
        <div className="flex gap-3 mb-8 overflow-x-auto pb-2">
          <button
            onClick={() => setSelectedGender('todos')}
            className={`px-6 py-2 rounded-full whitespace-nowrap transition-all shadow-sm hover:shadow-md ${
              selectedGender === 'todos'
                ? 'bg-gradient-to-r from-[#F72C08] to-[#FEA30B] text-white'
                : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-orange-500'
            }`}
          >
            Todos
          </button>
          <button
            onClick={() => setSelectedGender('mujer')}
            className={`px-6 py-2 rounded-full whitespace-nowrap transition-all shadow-sm hover:shadow-md ${
              selectedGender === 'mujer'
                ? 'bg-gradient-to-r from-[#F72C08] to-[#FEA30B] text-white'
                : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-orange-500'
            }`}
          >
            Mujer
          </button>
          <button
            onClick={() => setSelectedGender('hombre')}
            className={`px-6 py-2 rounded-full whitespace-nowrap transition-all shadow-sm hover:shadow-md ${
              selectedGender === 'hombre'
                ? 'bg-gradient-to-r from-[#F72C08] to-[#FEA30B] text-white'
                : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-orange-500'
            }`}
          >
            Hombre
          </button>
        </div>

        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl sm:text-2xl">
            {searchTerm ? `Resultados para "${searchTerm}"` : 'Todos los Productos'}
          </h3>
          <span className="text-gray-600">{filteredProducts.length} productos</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-200"
            >
              <div
                onClick={() => {
                  setSelectedProduct(product);
                  setSelectedSize('');
                }}
                className="aspect-square overflow-hidden bg-gray-100 cursor-pointer"
              >
                <ImageWithFallback
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm bg-gradient-to-r from-[#F72C08] to-[#FEA30B] bg-clip-text text-transparent font-bold">{product.category}</span>
                  <span className="text-xs px-2 py-1 rounded-full bg-gradient-to-r from-[#F72C08] to-[#FEA30B] text-white">
                    {product.gender === 'mujer' ? 'Mujer' : 'Hombre'}
                  </span>
                </div>
                <h3 className="mt-1 mb-2 text-gray-900">{product.name}</h3>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">{product.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold bg-gradient-to-r from-[#F72C08] to-[#FEA30B] bg-clip-text text-transparent">${product.price}</span>
                  <button
                    onClick={() => {
                      setSelectedProduct(product);
                      setSelectedSize('');
                    }}
                    className="bg-gradient-to-r from-[#F72C08] to-[#FEA30B] text-white px-4 py-2 rounded-lg hover:opacity-90 transition-all shadow-sm hover:shadow-md"
                  >
                    Ver Detalles
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">No se encontraron productos</p>
          </div>
        )}
      </main>

      {/* Cart Sidebar */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setIsCartOpen(false)}
          />
          <div className="absolute right-0 top-0 h-full w-full sm:w-96 bg-white shadow-xl flex flex-col">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-xl">Carrito de Compras</h2>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              {cart.length === 0 ? (
                <div className="text-center py-16">
                  <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">Tu carrito está vacío</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div key={item.id} className="flex gap-4 border-b pb-4">
                      <ImageWithFallback
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="text-sm mb-1">{item.name}</h3>
                        <p className="text-blue-600 mb-2">${item.price}</p>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="p-1 hover:bg-gray-100 rounded"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="p-1 hover:bg-gray-100 rounded"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="ml-auto text-red-600 hover:text-red-700 text-sm"
                          >
                            Eliminar
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="border-t p-4 space-y-4">
                <div className="flex justify-between text-lg">
                  <span className="font-semibold">Total:</span>
                  <span className="text-2xl font-bold bg-gradient-to-r from-[#F72C08] to-[#FEA30B] bg-clip-text text-transparent">
                    ${getTotalPrice().toFixed(2)}
                  </span>
                </div>
                <button
                  onClick={sendWhatsAppOrder}
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#F72C08] to-[#FEA30B] text-white py-4 rounded-lg hover:opacity-90 transition-all shadow-md hover:shadow-lg font-semibold"
                >
                  <Send className="w-5 h-5" />
                  Enviar Pedido por WhatsApp
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => {
              setSelectedProduct(null);
              setSelectedSize('');
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <div className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <button
                onClick={() => {
                  setSelectedProduct(null);
                  setSelectedSize('');
                }}
                className="absolute top-4 right-4 p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors z-10"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>

              <div className="grid md:grid-cols-2 gap-6 p-6">
                {/* Product Image */}
                <div className="aspect-square rounded-xl overflow-hidden bg-gray-100">
                  <ImageWithFallback
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Product Details */}
                <div className="flex flex-col">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm bg-gradient-to-r from-[#F72C08] to-[#FEA30B] bg-clip-text text-transparent font-bold">
                      {selectedProduct.category}
                    </span>
                    <span className="text-xs px-2 py-1 rounded-full bg-gradient-to-r from-[#F72C08] to-[#FEA30B] text-white">
                      {selectedProduct.gender === 'mujer' ? 'Mujer' : 'Hombre'}
                    </span>
                  </div>

                  <h2 className="text-3xl mb-3 text-gray-900">{selectedProduct.name}</h2>

                  <div className="text-3xl font-bold bg-gradient-to-r from-[#F72C08] to-[#FEA30B] bg-clip-text text-transparent mb-4">
                    ${selectedProduct.price}
                  </div>

                  <div className="mb-6">
                    <h3 className="text-sm uppercase tracking-wider text-gray-600 mb-2">
                      Descripción
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {selectedProduct.description}
                    </p>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-sm uppercase tracking-wider text-gray-600 mb-3">
                      Selecciona tu talla
                    </h3>
                    <div className="grid grid-cols-5 gap-2">
                      {selectedProduct.sizes.map((size) => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`py-3 px-4 rounded-lg border-2 transition-all font-semibold ${
                            selectedSize === size
                              ? 'border-transparent bg-gradient-to-r from-[#F72C08] to-[#FEA30B] text-white'
                              : 'border-gray-300 hover:border-orange-500 text-gray-700'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={addToCartFromModal}
                    disabled={!selectedSize}
                    className={`w-full py-4 rounded-lg font-semibold transition-all shadow-md hover:shadow-lg ${
                      selectedSize
                        ? 'bg-gradient-to-r from-[#F72C08] to-[#FEA30B] text-white hover:opacity-90'
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    {selectedSize ? 'Agregar al Carrito' : 'Selecciona una talla'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Side Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setIsMenuOpen(false)}
          />
          <div className="absolute left-0 top-0 h-full w-full sm:w-80 bg-gradient-to-b from-black via-gray-900 to-black shadow-xl flex flex-col">
            <div className="flex items-center justify-between p-4 border-b-2 border-gradient-to-r from-[#F72C08] to-[#FEA30B]">
              <h2 className="text-2xl font-black bg-gradient-to-r from-[#F72C08] to-[#FEA30B] bg-clip-text text-transparent tracking-wider">
                LULIG
              </h2>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-2 hover:bg-gradient-to-r hover:from-[#F72C08] hover:to-[#FEA30B] rounded-lg transition-all"
              >
                <X className="w-6 h-6 text-white" />
              </button>
            </div>

            <div className="flex-1 p-4 space-y-3">
              <div className="mb-6">
                <h3 className="text-white/70 text-sm uppercase tracking-wider mb-3 font-semibold">Categorías</h3>
                <div className="space-y-2">
                  <button
                    onClick={() => {
                      setSelectedGender('todos');
                      setIsMenuOpen(false);
                    }}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                      selectedGender === 'todos'
                        ? 'bg-gradient-to-r from-[#F72C08] to-[#FEA30B] text-white font-semibold shadow-lg'
                        : 'bg-white/10 text-white hover:bg-white/20'
                    }`}
                  >
                    Todos los Productos
                  </button>
                  <button
                    onClick={() => {
                      setSelectedGender('mujer');
                      setIsMenuOpen(false);
                    }}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                      selectedGender === 'mujer'
                        ? 'bg-gradient-to-r from-[#F72C08] to-[#FEA30B] text-white font-semibold shadow-lg'
                        : 'bg-white/10 text-white hover:bg-white/20'
                    }`}
                  >
                    Mujer
                  </button>
                  <button
                    onClick={() => {
                      setSelectedGender('hombre');
                      setIsMenuOpen(false);
                    }}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                      selectedGender === 'hombre'
                        ? 'bg-gradient-to-r from-[#F72C08] to-[#FEA30B] text-white font-semibold shadow-lg'
                        : 'bg-white/10 text-white hover:bg-white/20'
                    }`}
                  >
                    Hombre
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gradient-to-r from-black via-gray-900 to-black text-white mt-16 border-t-4 border-gradient-to-r from-[#F72C08] to-[#FEA30B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Brand Section */}
            <div>
              <h3 className="text-3xl font-black bg-gradient-to-r from-[#F72C08] to-[#FEA30B] bg-clip-text text-transparent mb-4">
                LULIG
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Tu tienda de confianza para ropa deportiva de alta calidad. Estilo y rendimiento en cada prenda.
              </p>
            </div>

            {/* Contact Section */}
            <div>
              <h4 className="text-lg font-bold mb-4 text-white">Contáctenos</h4>
              <div className="space-y-3">
                <a href="tel:+1234567890" className="flex items-center gap-3 text-gray-400 hover:text-orange-400 transition-colors">
                  <Phone className="w-5 h-5" />
                  <span className="text-sm">+1 (234) 567-890</span>
                </a>
                <a href="mailto:info@lulig.com" className="flex items-center gap-3 text-gray-400 hover:text-orange-400 transition-colors">
                  <Mail className="w-5 h-5" />
                  <span className="text-sm">info@lulig.com</span>
                </a>
                <div className="flex items-start gap-3 text-gray-400">
                  <MapPin className="w-5 h-5 mt-1" />
                  <span className="text-sm">Calle Principal #123<br/>Ciudad, País</span>
                </div>
              </div>
            </div>

            {/* Social Media Section */}
            <div>
              <h4 className="text-lg font-bold mb-4 text-white">Síguenos</h4>
              <div className="flex gap-3">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-gray-800 hover:bg-gradient-to-r hover:from-[#F72C08] hover:to-[#FEA30B] rounded-lg transition-all group"
                >
                  <Facebook className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-gray-800 hover:bg-gradient-to-r hover:from-[#F72C08] hover:to-[#FEA30B] rounded-lg transition-all group"
                >
                  <Instagram className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors" />
                </a>
                <a
                  href="https://x.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-gray-800 hover:bg-gradient-to-r hover:from-[#F72C08] hover:to-[#FEA30B] rounded-lg transition-all group"
                >
                  <svg className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} LULIG Sport. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}