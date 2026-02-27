import Map "mo:core/Map";
import Text "mo:core/Text";
import List "mo:core/List";
import Array "mo:core/Array";
import Int "mo:core/Int";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Iter "mo:core/Iter";
import Order "mo:core/Order";

actor {
  type Product = {
    id : Nat;
    name : Text;
    category : ProductCategory;
    priceInr : Nat;
    description : Text;
    stockQuantity : Nat;
  };

  type CartItem = {
    productId : Nat;
    quantity : Nat;
  };

  type Cart = {
    items : [CartItem];
  };

  type ProductCategory = {
    #groceries;
    #dairy;
    #snacks;
    #beverages;
    #personalCare;
    #household;
  };

  module Product {
    public func compare(product1 : Product, product2 : Product) : Order.Order {
      Int.compare(product1.id, product2.id);
    };
  };

  var nextProductId = 1;
  var storeName : Text = "Mahajan Daily Need Store";
  var storeAddress : Text = "123 Market Street, Delhi, India";
  var storePhone : Text = "+91 9876543210";
  var storeHours : Text = "Mon-Sun: 8am - 10pm";

  let productCatalog = Map.empty<Nat, Product>();
  let carts = Map.empty<Principal, Cart>();

  public shared ({ caller }) func addProduct(
    name : Text,
    category : ProductCategory,
    priceInr : Nat,
    description : Text,
    stockQuantity : Nat,
  ) : async Nat {
    let productId = nextProductId;
    nextProductId += 1;

    let product : Product = {
      id = productId;
      name;
      category;
      priceInr;
      description;
      stockQuantity;
    };

    productCatalog.add(productId, product);
    productId;
  };

  public query ({ caller }) func getAllProducts() : async [Product] {
    productCatalog.values().toArray().sort();
  };

  public query ({ caller }) func getProductsByCategory(category : ProductCategory) : async [Product] {
    productCatalog.values().filter(
      func(product) { product.category == category }
    ).toArray();
  };

  public query ({ caller }) func searchProductsByName(searchTerm : Text) : async [Product] {
    productCatalog.values().filter(
      func(product) { product.name.contains(#text(searchTerm)) }
    ).toArray();
  };

  public shared ({ caller }) func addToCart(productId : Nat, quantity : Nat) : async () {
    if (quantity == 0) { Runtime.trap("Quantity must be greater than zero") };

    let product = switch (productCatalog.get(productId)) {
      case (null) { Runtime.trap("Product not found") };
      case (?product) { product };
    };

    if (product.stockQuantity < quantity) {
      Runtime.trap("Insufficient stock for product");
    };

    let cart = switch (carts.get(caller)) {
      case (null) { { items = [] } };
      case (?cart) { cart };
    };

    let existingQuantity = switch (cart.items.findIndex(func(item) { item.productId == productId })) {
      case (?_index) { 1 };
      case (null) { 0 };
    };

    let newItems = List.empty<CartItem>();
    for (item in cart.items.values()) {
      if (item.productId == productId) {
        newItems.add({ productId; quantity = item.quantity + quantity });
      } else {
        newItems.add(item);
      };
    };

    if (existingQuantity == 0) {
      newItems.add({ productId; quantity });
    };

    let newCart : Cart = { items = newItems.toArray() };
    carts.add(caller, newCart);
  };

  public shared ({ caller }) func removeFromCart(productId : Nat) : async () {
    let cart = switch (carts.get(caller)) {
      case (null) { Runtime.trap("Cart not found") };
      case (?cart) { cart };
    };

    let newItems = List.empty<CartItem>();
    for (item in cart.items.values()) {
      if (item.productId != productId) {
        newItems.add(item);
      };
    };

    let newCart : Cart = { items = newItems.toArray() };
    carts.add(caller, newCart);
  };

  public shared ({ caller }) func clearCart() : async () {
    carts.remove(caller);
  };

  public query ({ caller }) func getCart() : async [CartItem] {
    let cart = switch (carts.get(caller)) {
      case (null) { { items = [] } };
      case (?cart) { cart };
    };
    cart.items;
  };

  public query ({ caller }) func getStoreInfo() : async {
    name : Text;
    address : Text;
    phone : Text;
    hours : Text;
  } {
    {
      name = storeName;
      address = storeAddress;
      phone = storePhone;
      hours = storeHours;
    };
  };

  public shared ({ caller }) func updateStoreInfo(
    name : Text,
    address : Text,
    phone : Text,
    hours : Text,
  ) : async () {
    storeName := name;
    storeAddress := address;
    storePhone := phone;
    storeHours := hours;
  };

  public shared ({ caller }) func initializeProducts() : async () {
    if (productCatalog.size() > 0) {
      Runtime.trap("Products already initialized");
    };

    let products : [Product] = [
      {
        id = nextProductId;
        name = "Aashirvaad Atta 5kg";
        category = #groceries;
        priceInr = 250;
        description = "Premium wheat flour";
        stockQuantity = 50;
      },
      {
        id = nextProductId + 1;
        name = "India Gate Basmati Rice 1kg";
        category = #groceries;
        priceInr = 120;
        description = "Long grain rice";
        stockQuantity = 40;
      },
      {
        id = nextProductId + 2;
        name = "Amul Gold Milk 1L";
        category = #dairy;
        priceInr = 60;
        description = "Full cream milk";
        stockQuantity = 80;
      },
      {
        id = nextProductId + 3;
        name = "Britannia Marie Gold Biscuits";
        category = #snacks;
        priceInr = 30;
        description = "Tea time biscuit";
        stockQuantity = 100;
      },
      {
        id = nextProductId + 4;
        name = "Coca-Cola 2L Bottle";
        category = #beverages;
        priceInr = 90;
        description = "Classic cold drink";
        stockQuantity = 60;
      },
      {
        id = nextProductId + 5;
        name = "Colgate Toothpaste 200g";
        category = #personalCare;
        priceInr = 80;
        description = "Cavity protection";
        stockQuantity = 70;
      },
      {
        id = nextProductId + 6;
        name = "Surf Excel Detergent 1kg";
        category = #household;
        priceInr = 110;
        description = "Washing powder";
        stockQuantity = 30;
      },
      {
        id = nextProductId + 7;
        name = "Tata Salt 1kg";
        category = #groceries;
        priceInr = 20;
        description = "Iodized salt";
        stockQuantity = 100;
      },
      {
        id = nextProductId + 8;
        name = "Mother Dairy Curd 500g";
        category = #dairy;
        priceInr = 45;
        description = "Thick & creamy";
        stockQuantity = 60;
      },
      {
        id = nextProductId + 9;
        name = "Parle-G Biscuits 800g";
        category = #snacks;
        priceInr = 50;
        description = "Classic glucose biscuits";
        stockQuantity = 120;
      },
      {
        id = nextProductId + 10;
        name = "Pepsi 1.25L Bottle";
        category = #beverages;
        priceInr = 65;
        description = "Refreshing drink";
        stockQuantity = 50;
      },
      {
        id = nextProductId + 11;
        name = "Patanjali Honey 500g";
        category = #groceries;
        priceInr = 180;
        description = "Pure honey";
        stockQuantity = 35;
      },
      {
        id = nextProductId + 12;
        name = "Haldiram's Bhujia 200g";
        category = #snacks;
        priceInr = 55;
        description = "Spicy snack";
        stockQuantity = 90;
      },
      {
        id = nextProductId + 13;
        name = "Dabur Chyawanprash 1kg";
        category = #personalCare;
        priceInr = 250;
        description = "Health supplement";
        stockQuantity = 25;
      },
      {
        id = nextProductId + 14;
        name = "Dairy Milk Chocolate 50g";
        category = #snacks;
        priceInr = 45;
        description = "Milk chocolate";
        stockQuantity = 80;
      },
      {
        id = nextProductId + 15;
        name = "Sunfeast Yippee Noodles";
        category = #groceries;
        priceInr = 12;
        description = "Instant noodles";
        stockQuantity = 150;
      },
      {
        id = nextProductId + 16;
        name = "Clinic Plus Shampoo 340ml";
        category = #personalCare;
        priceInr = 60;
        description = "Healthy hair";
        stockQuantity = 50;
      },
      {
        id = nextProductId + 17;
        name = "Vim Dishwash Bar 100g";
        category = #household;
        priceInr = 10;
        description = "Dish cleaning";
        stockQuantity = 200;
      },
      {
        id = nextProductId + 18;
        name = "Mother Dairy Paneer 200g";
        category = #dairy;
        priceInr = 80;
        description = "Cottage cheese";
        stockQuantity = 40;
      },
      {
        id = nextProductId + 19;
        name = "Good Day Cookies 250g";
        category = #snacks;
        priceInr = 48;
        description = "Crunchy cookies";
        stockQuantity = 70;
      },
    ];

    for (product in products.values()) {
      productCatalog.add(product.id, product);
    };

    nextProductId += products.size();
  };
};
