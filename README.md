# SubnetLab
Platform belajar jaringan interaktif. Next.js + TypeScript + Tailwind CSS.

## Menjalankan
    npm ci
    npm run dev

## Modul belajar
Empat modul tersedia di `/modul/`: Dasar IP Address, Subnet Mask dan CIDR, Menghitung Subnet, dan Pengenalan VLSM. Setiap modul memuat tujuan belajar, materi bertahap, contoh perhitungan, latihan dengan pembahasan, dan navigasi ke materi berikutnya. Slug yang tidak dikenal menampilkan halaman 404.

## Build dan pemeriksaan
    npm test
    npm run build
    npm run test:export
    npm run preview

Build default menghasilkan website statis di `out/` dengan base path `/SubnetLab` untuk GitHub Pages. Preview tersedia di `http://127.0.0.1:3100/SubnetLab/`. Direktori `out/` yang disimpan di repository harus diperbarui dengan `npm run build` setiap kali sumber berubah. Unggah **isi** `out/` sebagai artefak website, termasuk `.nojekyll` agar aset `_next` tetap dilayani. Halaman modul diekspor sebagai direktori dengan `index.html` sehingga tautan langsung dan refresh bekerja pada server statis.

Untuk hosting pada root domain, set `NEXT_PUBLIC_BASE_PATH` ke string kosong saat build dan preview. Untuk subdirektori lain, gunakan path yang diawali `/` tanpa garis miring di akhir. `npm start` dan `npm run preview` melayani hasil export statis pada port 3100 (dapat diubah melalui `PORT`). Gunakan Dockerfile untuk menjalankan mode server standalone.

Tes mencakup validasi IPv4, prefix /0 sampai /32, hasil contoh dan alokasi VLSM, serta HTTP untuk seluruh halaman, tautan internal, anchor, aset, dan halaman 404. `npm run typecheck` memeriksa TypeScript.

Saat `npm run dev` berjalan, jalankan `npm run test:dev` dari terminal lain untuk memeriksa akses langsung, refresh, navigasi client, dan 404 pada development server. Target default `http://127.0.0.1:3000` dapat diubah melalui `SUBNETLAB_TEST_ORIGIN`. Mode development tidak mengaktifkan `output: export`; export statis hanya dipakai saat build produksi agar route modul tetap dapat dirender oleh Next.js 14.

## Design pattern
Container-Presenter + Custom Hooks: `SubnetCalculatorContainer` (container), `SubnetResultPresenter` dan `BinaryOctets` (presenter), `useSubnetCalc` (hook). Logika hitung ada di class `IPv4Address` dan `SubnetCalculator` (OOP).

## Docker
    docker build -t <username>/subnetlab:v1-UTS .
    docker run --rm -p 3000:3000 <username>/subnetlab:v1-UTS
    docker push <username>/subnetlab:v1-UTS
Dockerfile memakai build standalone dengan base path kosong, sehingga aplikasi diakses melalui `http://localhost:3000/` dan tidak bergantung pada folder export statis.
Docker Hub: https://hub.docker.com/r/veena0908/subnetlab
