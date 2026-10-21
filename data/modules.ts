export interface LearningModule {
  slug: string;
  title: string;
  summary: string;
  duration: number;
  objectives: string[];
  sections: { id: string; title: string; paragraphs: string[]; steps?: string[] }[];
  example: { title: string; description: string; rows: [string, string][] };
  exercise: { question: string; answer: string };
  references: { title: string; href: string }[];
}

export const modules: LearningModule[] = [
  {
    slug: "dasar-ip-address",
    title: "Dasar IP Address",
    summary: "Kenali struktur IPv4, oktet, serta bagian network dan host.",
    duration: 8,
    objectives: ["Membaca alamat IPv4 yang valid.", "Mengubah satu oktet menjadi biner.", "Membedakan alamat perangkat dan alamat jaringan."],
    sections: [
      {
        id: "struktur-ipv4", title: "Struktur alamat IPv4",
        paragraphs: [
          "IPv4 memakai 32 bit, ditulis sebagai empat angka desimal yang dipisahkan titik. Setiap angka disebut oktet, terdiri dari 8 bit, dan bernilai 0 sampai 255. Contoh alamat yang valid adalah 192.168.10.77.",
          "Alamat 192.168.1.256 tidak valid karena satu oktet melebihi 255. Tuliskan setiap oktet tanpa angka nol tambahan di depan: gunakan 10, bukan 010. Kalkulator ini menerima IPv4, bukan IPv6.",
        ],
      },
      {
        id: "biner", title: "Membaca bit dalam satu oktet",
        paragraphs: ["Bobot bit dari kiri ke kanan adalah 128, 64, 32, 16, 8, 4, 2, dan 1. Jumlahkan bobot pada posisi bit yang bernilai 1. Misalnya 01001101 berarti 64 + 8 + 4 + 1 = 77."],
        steps: ["192 = 128 + 64, sehingga bentuk binernya 11000000.", "168 = 128 + 32 + 8, sehingga bentuk binernya 10101000.", "10 = 8 + 2, sehingga bentuk binernya 00001010.", "77 = 64 + 8 + 4 + 1, sehingga bentuk binernya 01001101."],
      },
      {
        id: "network-host", title: "Bagian network dan host",
        paragraphs: [
          "Prefix atau subnet mask menentukan batas bagian network dan host. Pada 192.168.10.77/24, 24 bit pertama menandai network dan 8 bit terakhir menandai host. Network-nya adalah 192.168.10.0/24.",
          "Alamat IP saja tidak cukup untuk menentukan subnet. Contohnya, 192.168.10.77/26 berada pada network 192.168.10.64/26, berbeda dengan /24. Untuk latihan lokal, blok privat yang tersedia adalah 10.0.0.0/8, 172.16.0.0/12, dan 192.168.0.0/16; blok ini tidak dirutekan secara global di Internet.",
        ],
      },
    ],
    example: {
      title: "Membaca 192.168.10.77/24", description: "Prefix /24 menyisakan satu oktet untuk bagian host.",
      rows: [["Jumlah bit IPv4", "32 bit = 4 oktet"], ["Bit network / host", "24 bit / 8 bit"], ["Network address", "192.168.10.0"], ["Biner oktet terakhir (77)", "01001101"]],
    },
    exercise: { question: "Apakah 192.168.1.300 merupakan IPv4 yang valid? Berapa nilai desimal dari 00001010?", answer: "Alamat tersebut tidak valid karena 300 melebihi batas 255. Biner 00001010 bernilai 8 + 2 = 10." },
    references: [{ title: "RFC 791 — Internet Protocol", href: "https://www.rfc-editor.org/rfc/rfc791" }, { title: "RFC 1918 — Address Allocation for Private Internets", href: "https://www.rfc-editor.org/rfc/rfc1918" }],
  },
  {
    slug: "subnet-mask-dan-cidr",
    title: "Subnet Mask dan CIDR",
    summary: "Baca prefix, subnet mask, ukuran blok, dan kapasitas host.",
    duration: 10,
    objectives: ["Mengubah prefix menjadi subnet mask.", "Menghitung jumlah alamat dalam satu blok.", "Memahami penggunaan khusus /31 dan /32."],
    sections: [
      {
        id: "mask-cidr", title: "Hubungan subnet mask dan prefix",
        paragraphs: ["Subnet mask berisi deretan bit 1 untuk bagian network, lalu bit 0 untuk bagian host. CIDR menuliskan jumlah bit network setelah garis miring. Prefix /24 berarti 24 bit 1 diikuti 8 bit 0, sehingga mask-nya 255.255.255.0.", "Pada /26, mask binernya adalah 11111111.11111111.11111111.11000000. Oktet terakhir bernilai 128 + 64 = 192, sehingga subnet mask-nya 255.255.255.192."],
      },
      {
        id: "ukuran-blok", title: "Ukuran blok dan kapasitas host",
        paragraphs: ["Jumlah bit host adalah 32 − prefix. Jumlah seluruh alamat dalam blok adalah 2 pangkat jumlah bit host. Untuk subnet biasa hingga /30, dua alamat dipakai sebagai network dan broadcast, sehingga host usable = 2^(32 − prefix) − 2.", "Prefix /26 memiliki 6 bit host, 64 alamat, dan 62 host usable. Dalam satu /24 terdapat empat blok /26, dimulai pada oktet terakhir 0, 64, 128, dan 192. Semakin besar prefix, semakin kecil blok alamatnya."],
      },
      {
        id: "prefix-khusus", title: "Kasus khusus /0, /31, dan /32",
        paragraphs: ["Prefix /0 mencakup seluruh ruang alamat IPv4 dan sering dipakai pada rute default. Perhitungan kapasitas secara matematis tidak berarti seluruh alamat tersebut dapat diberikan ke perangkat; ada alamat dengan fungsi khusus.", "Pada sambungan point-to-point /31, kedua alamat dapat menjadi alamat endpoint sesuai RFC 3021, sehingga tersedia 2 host tanpa broadcast terpisah. Prefix /32 menunjuk tepat satu alamat, misalnya rute host atau alamat loopback. Rumus pengurangan dua tidak berlaku untuk kedua kasus ini."],
      },
    ],
    example: {
      title: "Perbandingan prefix", description: "Kapasitas berikut berlaku untuk subnet biasa, dengan pengecualian /31 dan /32 seperti dijelaskan di atas.",
      rows: [["/24 · 255.255.255.0", "256 alamat · 254 host"], ["/26 · 255.255.255.192", "64 alamat · 62 host"], ["/30 · 255.255.255.252", "4 alamat · 2 host"], ["/31 · 255.255.255.254", "2 alamat · 2 endpoint point-to-point"], ["/32 · 255.255.255.255", "1 alamat"]],
    },
    exercise: { question: "Berapa subnet mask, jumlah alamat, dan host usable pada /27?", answer: "Mask /27 adalah 255.255.255.224. Tersisa 5 bit host, sehingga ada 2^5 = 32 alamat dan 32 − 2 = 30 host usable." },
    references: [{ title: "RFC 4632 — Classless Inter-domain Routing", href: "https://www.rfc-editor.org/rfc/rfc4632" }, { title: "RFC 3021 — 31-Bit Prefixes on Point-to-Point Links", href: "https://www.rfc-editor.org/rfc/rfc3021" }],
  },
  {
    slug: "menghitung-subnet",
    title: "Menghitung Subnet",
    summary: "Temukan network, broadcast, wildcard, dan rentang host langkah demi langkah.",
    duration: 12,
    objectives: ["Menentukan blok tempat sebuah IP berada.", "Menghitung network, broadcast, dan rentang host.", "Memeriksa hasil dengan kalkulator subnet."],
    sections: [
      {
        id: "network", title: "Menentukan network address",
        paragraphs: ["Network address diperoleh dari operasi AND antara bit alamat IP dan subnet mask. Bit host menjadi 0. Untuk 192.168.10.77/26, operasi pada oktet terakhir adalah 01001101 AND 11000000 = 01000000, atau 64."],
        steps: ["Ubah /26 menjadi mask 255.255.255.192.", "Ukuran blok pada oktet terakhir = 256 − 192 = 64.", "Batas blok: 0–63, 64–127, 128–191, dan 192–255.", "Angka 77 berada dalam blok 64–127. Network address adalah 192.168.10.64."],
      },
      {
        id: "broadcast-host", title: "Broadcast dan host usable",
        paragraphs: ["Broadcast address adalah alamat terakhir pada subnet biasa, dengan seluruh bit host bernilai 1. Untuk blok 64–127, broadcast-nya 192.168.10.127. Host pertama adalah network + 1 dan host terakhir adalah broadcast − 1.", "Rentang host pada contoh ini adalah 192.168.10.65 sampai 192.168.10.126, sebanyak 62 host. Alamat network dan broadcast tidak diberikan kepada perangkat pada subnet biasa. Pengecualian /31 untuk point-to-point dan /32 dijelaskan di modul sebelumnya."],
      },
      {
        id: "wildcard", title: "Wildcard dan pengecekan hasil",
        paragraphs: ["Wildcard adalah kebalikan setiap bit subnet mask. Kurangi masing-masing oktet mask dari 255: mask 255.255.255.192 menghasilkan wildcard 0.0.0.63.", "Buka kalkulator dan masukkan 192.168.10.77 dengan prefix /26. Cocokkan hasilnya dengan tabel. Geser ke /24 lalu perhatikan perubahan network menjadi 192.168.10.0 dan broadcast menjadi 192.168.10.255."],
      },
    ],
    example: {
      title: "Hasil 192.168.10.77/26", description: "Gunakan contoh yang sama di kalkulator untuk memeriksa setiap nilai.",
      rows: [["Network address", "192.168.10.64"], ["Broadcast address", "192.168.10.127"], ["Subnet mask", "255.255.255.192"], ["Wildcard mask", "0.0.0.63"], ["Host pertama", "192.168.10.65"], ["Host terakhir", "192.168.10.126"], ["Jumlah host usable", "62"]],
    },
    exercise: { question: "Tentukan network, broadcast, dan rentang host untuk 192.168.1.130/27.", answer: "Ukuran blok /27 adalah 32. Alamat 130 berada pada blok 128–159. Network: 192.168.1.128; broadcast: 192.168.1.159; host: 192.168.1.129–192.168.1.158, sebanyak 30 host." },
    references: [{ title: "RFC 4632 — Classless Inter-domain Routing", href: "https://www.rfc-editor.org/rfc/rfc4632" }],
  },
  {
    slug: "pengenalan-vlsm",
    title: "Pengenalan VLSM",
    summary: "Alokasikan subnet dengan ukuran berbeda sesuai kebutuhan host.",
    duration: 12,
    objectives: ["Memilih prefix berdasarkan kebutuhan host.", "Mengalokasikan blok dari kebutuhan terbesar.", "Memastikan subnet tidak tumpang tindih dan tetap di dalam blok induk."],
    sections: [
      {
        id: "konsep-vlsm", title: "Mengapa memakai VLSM?",
        paragraphs: ["VLSM (Variable Length Subnet Mask) membagi satu blok jaringan menjadi subnet dengan prefix berbeda. Sebuah jaringan dengan 50 perangkat membutuhkan blok lebih besar dibanding jaringan dengan 10 perangkat. Memberikan ukuran yang sama untuk semuanya dapat menyisakan banyak alamat yang tidak terpakai.", "Untuk subnet biasa, pilih jumlah bit host terkecil yang memenuhi 2^h − 2 ≥ kebutuhan host, lalu hitung prefix = 32 − h. Hitung juga alamat gateway dan perangkat lain yang membutuhkan IP sebagai bagian dari kebutuhan host."],
      },
      {
        id: "alokasi", title: "Langkah alokasi VLSM",
        paragraphs: ["Misalkan blok induk 192.168.10.0/24 melayani tiga jaringan yang membutuhkan total 50, 25, dan 10 alamat host. Kebutuhan tersebut sudah mencakup gateway. Mulai dari blok terbesar dan lanjutkan pada batas subnet berikutnya."],
        steps: ["Urutkan kebutuhan: 50, 25, lalu 10 host.", "50 host membutuhkan /26: 64 alamat dan 62 host usable. Alokasikan 192.168.10.0/26.", "25 host membutuhkan /27: 32 alamat dan 30 host usable. Alokasikan 192.168.10.64/27.", "10 host membutuhkan /28: 16 alamat dan 14 host usable. Alokasikan 192.168.10.96/28.", "Periksa setiap batas blok, kapasitas host, dan pastikan tidak ada rentang yang tumpang tindih."],
      },
      {
        id: "validasi", title: "Periksa batas dan sisa alamat",
        paragraphs: ["Ketiga blok memakai 64 + 32 + 16 = 112 alamat dari 256 alamat pada /24. Rentang 192.168.10.112–192.168.10.255 masih belum dialokasikan. Rentang sisa ini bukan satu subnet CIDR tunggal; pembagian berikutnya tetap harus mengikuti batas blok yang sesuai.", "Jangan memilih network secara sembarang: blok /27 dimulai pada kelipatan 32 di oktet terakhir, dan /28 pada kelipatan 16. Jika kebutuhan tidak muat dalam blok induk, gunakan blok induk yang lebih besar atau ubah rencana. Kalkulator menghitung satu subnet per input; periksa setiap alokasi secara terpisah."],
      },
    ],
    example: {
      title: "Pembagian 192.168.10.0/24", description: "Tiga subnet memiliki rentang terpisah dan kapasitas yang mencukupi.",
      rows: [["50 host · 192.168.10.0/26", "Host .1–.62 · broadcast .63"], ["25 host · 192.168.10.64/27", "Host .65–.94 · broadcast .95"], ["10 host · 192.168.10.96/28", "Host .97–.110 · broadcast .111"], ["Belum dialokasikan", "192.168.10.112–192.168.10.255"]],
    },
    exercise: { question: "Dari sisa blok contoh di atas, alokasikan subnet terkecil untuk total 12 host. Tentukan network dan broadcast.", answer: "12 host membutuhkan /28 karena 16 − 2 = 14 host usable. Batas /28 berikutnya adalah 192.168.10.112/28. Broadcast: 192.168.10.127; host usable: 192.168.10.113–192.168.10.126. Blok ini tidak bertabrakan dengan alokasi sebelumnya." },
    references: [{ title: "RFC 4632 — Classless Inter-domain Routing", href: "https://www.rfc-editor.org/rfc/rfc4632" }],
  },
];
