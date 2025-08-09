# E-Commerce Application

This is a full-stack e-commerce application built with the MERN stack (MongoDB, Express, React, Node.js).

## Features

-   User authentication and authorization (JWT)
-   Product search and filtering (by category, price, rating)
-   Instant search suggestions
-   Shopping cart
-   Checkout process with Stripe integration
-   User profiles
-   Admin dashboard to manage users, products, and orders

## Technologies Used

### Backend

-   Node.js
-   Express
-   MongoDB
-   Mongoose
-   JWT (JSON Web Tokens)
-   Stripe

### Frontend

-   React
-   Redux
-   React Router
-   Axios
-   Bootstrap

## Installation and Setup

### Prerequisites

-   Node.js and npm
-   MongoDB

### Backend Setup

1.  Navigate to the `backend` directory:
    ```bash
    cd backend
    ```

2.  Install the dependencies:
    ```bash
    npm install
    ```

3.  Create a `.env` file by copying the `.env.example` file:
    ```bash
    cp .env.example .env
    ```

4.  Fill in the environment variables in the `.env` file:
    -   `MONGO_URI`: Your MongoDB connection string.
    -   `JWT_SECRET`: A secret key for JWT.
    -   `STRIPE_SECRET_KEY`: Your Stripe secret key.

5.  Start the backend server:
    ```bash
    npm start
    ```

### Frontend Setup

1.  Navigate to the `frontend` directory:
    ```bash
    cd frontend
    ```

2.  Install the dependencies:
    ```bash
    npm install
    ```

3.  Create a `.env` file by copying the `.env.example` file:
    ```bash
    cp .env.example .env
    ```

4.  Fill in the environment variables in the `.env` file:
    -   `REACT_APP_STRIPE_PUBLIC_KEY`: Your Stripe public key.

5.  Start the frontend development server:
    ```bash
    npm start
    ```

---

# E-Ticaret Uygulaması

Bu, MERN yığını (MongoDB, Express, React, Node.js) ile oluşturulmuş tam donanımlı bir e-ticaret uygulamasıdır.

## Özellikler

-   Kullanıcı kimlik doğrulaması ve yetkilendirme (JWT)
-   Ürün arama ve filtreleme (kategoriye, fiyata, puana göre)
-   Anlık arama önerileri
-   Alışveriş sepeti
-   Stripe entegrasyonu ile ödeme süreci
-   Kullanıcı profilleri
-   Kullanıcıları, ürünleri ve siparişleri yönetmek için yönetici paneli

## Kullanılan Teknolojiler

### Backend

-   Node.js
-   Express
-   MongoDB
-   Mongoose
-   JWT (JSON Web Tokens)
-   Stripe

### Frontend

-   React
-   Redux
-   React Router
-   Axios
-   Bootstrap

## Kurulum ve Ayarlar

### Ön Gereksinimler

-   Node.js ve npm
-   MongoDB

### Backend Kurulumu

1.  `backend` dizinine gidin:
    ```bash
    cd backend
    ```

2.  Bağımlılıkları yükleyin:
    ```bash
    npm install
    ```

3.  `.env.example` dosyasını kopyalayarak bir `.env` dosyası oluşturun:
    ```bash
    cp .env.example .env
    ```

4.  `.env` dosyasındaki ortam değişkenlerini doldurun:
    -   `MONGO_URI`: MongoDB bağlantı dizginiz.
    -   `JWT_SECRET`: JWT için gizli bir anahtar.
    -   `STRIPE_SECRET_KEY`: Stripe gizli anahtarınız.

5.  Backend sunucusunu başlatın:
    ```bash
    npm start
    ```

### Frontend Kurulumu

1.  `frontend` dizinine gidin:
    ```bash
    cd frontend
    ```

2.  Bağımlılıkları yükleyin:
    ```bash
    npm install
    ```

3.  `.env.example` dosyasını kopyalayarak bir `.env` dosyası oluşturun:
    ```bash
    cp .env.example .env
    ```

4.  `.env` dosyasındaki ortam değişkenlerini doldurun:
    -   `REACT_APP_STRIPE_PUBLIC_KEY`: Stripe genel anahtarınız.

5.  Frontend geliştirme sunucusunu başlatın:
    ```bash
    npm start
    ```