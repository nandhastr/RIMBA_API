#RIMBA API

##Langkah Menjalankan testing API

###ersyaratan

-Sebelum mulai, pastikan sudah menginstal beberapa perangkat lunak berikut:

-PHP (versi 8.2 atau lebih tinggi)

-Composer (untuk mengelola dependensi PHP)

-Node.js (versi 16.x atau lebih tinggi)

-npm (untuk mengelola dependensi JavaScript)

-MySQL (atau database yang pilih)

-Jest dan Supertest (untuk pengujian otomatis)

-WampServer (untuk menjalankan local server )


##langkah-langkah

###1. clone project dari github 

    git clone https://github.com/nandhastr/RIMBA_API.git

    cd rimba-api

###2. Instalasi Backend (Laravel)

    Pastikan Anda berada di dalam direktori rimba-api, kemudian ikuti langkah berikut:

    a. Instalasi Dependensi PHP

    Jalankan perintah berikut untuk menginstal dependensi PHP menggunakan Composer:

    composer install

###3. Setelah itu, atur konfigurasi database dan lainnya di dalam file .env sesuai kebutuhan.

###4. migrasi database

    jalankan migrasi databse untuk membuat tabel yang di perlukan :

    php artisan migrate

###5. Instalasi Dependensi Node.js

   jalankan perintah berikut untuk menginstal dependensi:

   npm install

###6. menjalankan server API

    php artisan serve

###7. menjalankan pengujian 

    jalankan perintah berikut untuk menjalankan pengujian test API

    npm test

###8. Perintah ini akan menjalankan pengujian otomatis yang meliputi:

    -Pengujian untuk endpoint GET /api/users

    -Pengujian untuk mendapatkan data pengguna berdasarkan ID GET /api/users/{id}

    -Pengujian untuk membuat pengguna baru POST /api/users

    -Pengujian untuk memperbarui pengguna PUT /api/users/{id}
    
    -Pengujian untuk menghapus pengguna DELETE /api/users/{id}