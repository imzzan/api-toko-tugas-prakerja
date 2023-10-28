untuk menggunakan api ini : 
1. clone repository ini
2. setelah tercloning install dependency yang dibutuhkan dengan cara npm install
3. jgn lupa untuk sequelize-cli init di folder ini bisa lewat git bash atau terminal divscode
4. jalankan migration sequelize-cli db:migrate
5. sekian

<!-- Link  -->
http://localhost:8000


<!-- Enpoint dan method untuk user -->
/auth/reqister-admin : post
/auth/reqister-member : post
/auth/login : post
/auth/users : get
/auth/refresh-token :get
/auth/users/:id : get
/auth/users/:id : delete
/auth/logout : delete


<!-- Enpoint dan method untuk produk -->
/produk : post
/produk : get
/produk/:id : get
/produk/:id : put
/produk/:id : delete
