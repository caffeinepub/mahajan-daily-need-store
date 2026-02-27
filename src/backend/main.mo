import Map "mo:core/Map";
import Text "mo:core/Text";
import Runtime "mo:core/Runtime";
import List "mo:core/List";
import Order "mo:core/Order";
import Array "mo:core/Array";
import Principal "mo:core/Principal";
import Iter "mo:core/Iter";
import Int "mo:core/Int";

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

  let productCatalog = Map.empty<Nat, Product>();
  let carts = Map.empty<Principal, Cart>();

  var storeName : Text = "Mahajan Daily Need Store";
  var storeAddress : Text = "Post Office Shikroha, Distt. Bilaspur, Himachal Pradesh - 174032";
  var storePhone : Text = "+91 9876543210";
  var storeHours : Text = "Mon-Sun: 8am - 10pm";

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

    let newCart : Cart = {
      items = cart.items.filter(
        func(item) { item.productId != productId }
      );
    };
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
      // GROCERIES
      {
        id = nextProductId;
        name = "Aashirvaad Atta 5kg";
        category = #groceries;
        priceInr = 250;
        description = "Premium whole wheat flour";
        stockQuantity = 50;
      },
      {
        id = nextProductId + 1;
        name = "India Gate Basmati Rice 1kg";
        category = #groceries;
        priceInr = 120;
        description = "Long grain aromatic rice";
        stockQuantity = 40;
      },
      {
        id = nextProductId + 2;
        name = "Tata Salt 1kg";
        category = #groceries;
        priceInr = 20;
        description = "Iodized crystal salt";
        stockQuantity = 100;
      },
      {
        id = nextProductId + 3;
        name = "Patanjali Honey 500g";
        category = #groceries;
        priceInr = 180;
        description = "Pure natural honey";
        stockQuantity = 35;
      },
      {
        id = nextProductId + 4;
        name = "Sunfeast Yippee Noodles";
        category = #groceries;
        priceInr = 12;
        description = "Instant masala noodles";
        stockQuantity = 150;
      },
      {
        id = nextProductId + 5;
        name = "Fortune Sunflower Oil 1L";
        category = #groceries;
        priceInr = 145;
        description = "Refined sunflower oil";
        stockQuantity = 60;
      },
      {
        id = nextProductId + 6;
        name = "Tata Dal Masoor 500g";
        category = #groceries;
        priceInr = 65;
        description = "Red lentils";
        stockQuantity = 80;
      },
      {
        id = nextProductId + 7;
        name = "MDH Garam Masala 100g";
        category = #groceries;
        priceInr = 55;
        description = "Aromatic spice blend";
        stockQuantity = 70;
      },
      {
        id = nextProductId + 8;
        name = "Maggi 2-Minute Noodles 560g";
        category = #groceries;
        priceInr = 110;
        description = "Classic instant noodles pack";
        stockQuantity = 90;
      },
      {
        id = nextProductId + 9;
        name = "Tata Tea Premium 250g";
        category = #groceries;
        priceInr = 130;
        description = "Strong & refreshing tea";
        stockQuantity = 55;
      },
      {
        id = nextProductId + 10;
        name = "Nescafe Classic Coffee 50g";
        category = #groceries;
        priceInr = 120;
        description = "Rich instant coffee";
        stockQuantity = 40;
      },
      {
        id = nextProductId + 11;
        name = "Catch Black Pepper 50g";
        category = #groceries;
        priceInr = 35;
        description = "Ground black pepper";
        stockQuantity = 80;
      },
      {
        id = nextProductId + 12;
        name = "Saffola Oats 500g";
        category = #groceries;
        priceInr = 90;
        description = "Healthy rolled oats";
        stockQuantity = 45;
      },
      {
        id = nextProductId + 13;
        name = "Kissan Mixed Fruit Jam 500g";
        category = #groceries;
        priceInr = 95;
        description = "Fruit jam for bread";
        stockQuantity = 40;
      },
      {
        id = nextProductId + 14;
        name = "Amul Butter 500g";
        category = #groceries;
        priceInr = 250;
        description = "Salted white butter";
        stockQuantity = 35;
      },

      // DAIRY
      {
        id = nextProductId + 15;
        name = "Amul Gold Milk 1L";
        category = #dairy;
        priceInr = 60;
        description = "Full cream fresh milk";
        stockQuantity = 80;
      },
      {
        id = nextProductId + 16;
        name = "Mother Dairy Curd 500g";
        category = #dairy;
        priceInr = 45;
        description = "Thick creamy dahi";
        stockQuantity = 60;
      },
      {
        id = nextProductId + 17;
        name = "Mother Dairy Paneer 200g";
        category = #dairy;
        priceInr = 80;
        description = "Fresh cottage cheese";
        stockQuantity = 40;
      },
      {
        id = nextProductId + 18;
        name = "Amul Cheese Slices 200g";
        category = #dairy;
        priceInr = 110;
        description = "Processed cheese slices";
        stockQuantity = 30;
      },
      {
        id = nextProductId + 19;
        name = "Amul Lassi 200ml";
        category = #dairy;
        priceInr = 25;
        description = "Sweet flavoured lassi";
        stockQuantity = 70;
      },
      {
        id = nextProductId + 20;
        name = "Nestle Milkmaid 400g";
        category = #dairy;
        priceInr = 85;
        description = "Sweetened condensed milk";
        stockQuantity = 35;
      },

      // SNACKS
      {
        id = nextProductId + 21;
        name = "Britannia Marie Gold Biscuits";
        category = #snacks;
        priceInr = 30;
        description = "Crispy tea time biscuit";
        stockQuantity = 100;
      },
      {
        id = nextProductId + 22;
        name = "Parle-G Biscuits 800g";
        category = #snacks;
        priceInr = 50;
        description = "Classic glucose biscuits";
        stockQuantity = 120;
      },
      {
        id = nextProductId + 23;
        name = "Haldiram's Bhujia 200g";
        category = #snacks;
        priceInr = 55;
        description = "Spicy namkeen snack";
        stockQuantity = 90;
      },
      {
        id = nextProductId + 24;
        name = "Dairy Milk Chocolate 50g";
        category = #snacks;
        priceInr = 45;
        description = "Cadbury milk chocolate";
        stockQuantity = 80;
      },
      {
        id = nextProductId + 25;
        name = "Good Day Cookies 250g";
        category = #snacks;
        priceInr = 48;
        description = "Crunchy cashew cookies";
        stockQuantity = 70;
      },
      {
        id = nextProductId + 26;
        name = "Lays Classic Salted 52g";
        category = #snacks;
        priceInr = 20;
        description = "Crispy potato chips";
        stockQuantity = 150;
      },
      {
        id = nextProductId + 27;
        name = "Kurkure Masala Munch 90g";
        category = #snacks;
        priceInr = 20;
        description = "Spicy corn puff snack";
        stockQuantity = 130;
      },
      {
        id = nextProductId + 28;
        name = "Hide & Seek Biscuits 120g";
        category = #snacks;
        priceInr = 30;
        description = "Chocolate chip biscuits";
        stockQuantity = 80;
      },
      {
        id = nextProductId + 29;
        name = "5 Star Chocolate 50g";
        category = #snacks;
        priceInr = 20;
        description = "Caramel chocolate bar";
        stockQuantity = 100;
      },
      {
        id = nextProductId + 30;
        name = "Haldiram's Aloo Bhujia 400g";
        category = #snacks;
        priceInr = 90;
        description = "Crunchy potato namkeen";
        stockQuantity = 60;
      },

      // BEVERAGES
      {
        id = nextProductId + 31;
        name = "Coca-Cola 2L Bottle";
        category = #beverages;
        priceInr = 90;
        description = "Classic cold drink";
        stockQuantity = 60;
      },
      {
        id = nextProductId + 32;
        name = "Pepsi 1.25L Bottle";
        category = #beverages;
        priceInr = 65;
        description = "Refreshing cola drink";
        stockQuantity = 50;
      },
      {
        id = nextProductId + 33;
        name = "Tropicana Orange Juice 1L";
        category = #beverages;
        priceInr = 120;
        description = "100% real fruit juice";
        stockQuantity = 40;
      },
      {
        id = nextProductId + 34;
        name = "Real Mango Juice 1L";
        category = #beverages;
        priceInr = 110;
        description = "Aamras mango nectar";
        stockQuantity = 45;
      },
      {
        id = nextProductId + 35;
        name = "Limca 600ml Bottle";
        category = #beverages;
        priceInr = 40;
        description = "Lemon lime soda";
        stockQuantity = 80;
      },
      {
        id = nextProductId + 36;
        name = "Bisleri Water 1L";
        category = #beverages;
        priceInr = 20;
        description = "Packaged drinking water";
        stockQuantity = 200;
      },
      {
        id = nextProductId + 37;
        name = "Frooti Mango 200ml";
        category = #beverages;
        priceInr = 15;
        description = "Mango fruit drink";
        stockQuantity = 120;
      },
      {
        id = nextProductId + 38;
        name = "Red Bull Energy Drink 250ml";
        category = #beverages;
        priceInr = 130;
        description = "Energy boost drink";
        stockQuantity = 30;
      },

      // PERSONAL CARE
      {
        id = nextProductId + 39;
        name = "Colgate Toothpaste 200g";
        category = #personalCare;
        priceInr = 80;
        description = "Strong cavity protection";
        stockQuantity = 70;
      },
      {
        id = nextProductId + 40;
        name = "Dabur Chyawanprash 1kg";
        category = #personalCare;
        priceInr = 250;
        description = "Ayurvedic health supplement";
        stockQuantity = 25;
      },
      {
        id = nextProductId + 41;
        name = "Clinic Plus Shampoo 340ml";
        category = #personalCare;
        priceInr = 60;
        description = "Healthy strong hair";
        stockQuantity = 50;
      },
      {
        id = nextProductId + 42;
        name = "Lux Soap 100g";
        category = #personalCare;
        priceInr = 35;
        description = "Moisturising bath soap";
        stockQuantity = 100;
      },
      {
        id = nextProductId + 43;
        name = "Lifebuoy Hand Wash 250ml";
        category = #personalCare;
        priceInr = 70;
        description = "Germ protection hand wash";
        stockQuantity = 80;
      },
      {
        id = nextProductId + 44;
        name = "Parachute Coconut Oil 200ml";
        category = #personalCare;
        priceInr = 85;
        description = "Pure coconut hair oil";
        stockQuantity = 55;
      },
      {
        id = nextProductId + 45;
        name = "Himalaya Face Wash 150ml";
        category = #personalCare;
        priceInr = 120;
        description = "Neem purifying face wash";
        stockQuantity = 40;
      },
      {
        id = nextProductId + 46;
        name = "Dettol Antiseptic Liquid 250ml";
        category = #personalCare;
        priceInr = 110;
        description = "Antiseptic germ killer";
        stockQuantity = 45;
      },
      {
        id = nextProductId + 47;
        name = "Gillette Shaving Cream 70g";
        category = #personalCare;
        priceInr = 90;
        description = "Smooth close shave";
        stockQuantity = 35;
      },
      {
        id = nextProductId + 48;
        name = "Whisper Pads Regular 15s";
        category = #personalCare;
        priceInr = 55;
        description = "Comfortable sanitary pads";
        stockQuantity = 60;
      },

      // HOUSEHOLD
      {
        id = nextProductId + 49;
        name = "Surf Excel Detergent 1kg";
        category = #household;
        priceInr = 110;
        description = "Tough stain washing powder";
        stockQuantity = 30;
      },
      {
        id = nextProductId + 50;
        name = "Vim Dishwash Bar 100g";
        category = #household;
        priceInr = 10;
        description = "Grease-cutting dish bar";
        stockQuantity = 200;
      },
      {
        id = nextProductId + 51;
        name = "Harpic Toilet Cleaner 500ml";
        category = #household;
        priceInr = 85;
        description = "Powerful toilet disinfectant";
        stockQuantity = 50;
      },
      {
        id = nextProductId + 52;
        name = "Colin Glass Cleaner 250ml";
        category = #household;
        priceInr = 60;
        description = "Streak-free glass cleaner";
        stockQuantity = 40;
      },
      {
        id = nextProductId + 53;
        name = "Odonil Bathroom Freshener 50g";
        category = #household;
        priceInr = 35;
        description = "Long-lasting air freshener";
        stockQuantity = 70;
      },
      {
        id = nextProductId + 54;
        name = "Good Knight Fast Card 10s";
        category = #household;
        priceInr = 30;
        description = "Mosquito repellent cards";
        stockQuantity = 100;
      },
      {
        id = nextProductId + 55;
        name = "Lizol Floor Cleaner 500ml";
        category = #household;
        priceInr = 95;
        description = "Disinfectant floor cleaner";
        stockQuantity = 45;
      },
      {
        id = nextProductId + 56;
        name = "Scotch Brite Scrub Pad";
        category = #household;
        priceInr = 25;
        description = "Heavy duty scrubber";
        stockQuantity = 120;
      },
    ];

    for (product in products.values()) {
      productCatalog.add(product.id, product);
    };

    nextProductId += products.size();
  };
};
