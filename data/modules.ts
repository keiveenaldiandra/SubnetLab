export interface LearningModule {
  slug: string;
  title: string;
  summary: string;
  body: string[];
}

export const modules: LearningModule[] = [
  {
    slug: "dasar-ip-address",
    title: "Dasar IP Address",
    summary: "Apa itu alamat IPv4 dan bagaimana strukturnya.",
    body: [
      "IPv4 adalah alamat 32 bit yang ditulis sebagai empat angka desimal dipisah titik, misalnya 192.168.10.77.",
      "Setiap angka disebut oktet dan mewakili 8 bit, dengan nilai 0 sampai 255.",
      "Alamat IP terbagi menjadi bagian network dan bagian host. Batasnya ditentukan oleh subnet mask.",
    ],
  },
  {
    slug: "subnet-mask-dan-cidr",
    title: "Subnet Mask dan CIDR",
    summary: "Cara membaca prefix seperti /24 dan /26.",
    body: [
      "Subnet mask menandai bit mana yang menjadi network (angka 1) dan bit mana yang menjadi host (angka 0).",
      "Notasi CIDR menuliskan jumlah bit network sebagai prefix. Prefix /24 sama dengan mask 255.255.255.0.",
      "Semakin besar prefix, semakin kecil jumlah host dalam subnet tersebut.",
    ],
  },
  {
    slug: "menghitung-subnet",
    title: "Menghitung Subnet",
    summary: "Mencari network, broadcast, dan rentang host.",
    body: [
      "Network address didapat dari operasi AND antara alamat IP dan subnet mask.",
      "Broadcast address adalah alamat dengan seluruh bit host bernilai 1.",
      "Host usable berada di antara network dan broadcast, sehingga jumlahnya 2^(32 - prefix) dikurangi 2.",
      "Coba langsung di kalkulator pada halaman utama untuk melihat bit network dan host berubah saat prefix digeser.",
    ],
  },
  {
    slug: "pengenalan-vlsm",
    title: "Pengenalan VLSM",
    summary: "Membagi satu blok IP menjadi subnet berbeda ukuran.",
    body: [
      "VLSM (Variable Length Subnet Mask) memungkinkan setiap subnet memiliki prefix yang berbeda sesuai kebutuhan host.",
      "Langkahnya: urutkan kebutuhan host dari yang terbesar, alokasikan subnet terbesar lebih dulu, lalu lanjutkan ke subnet yang lebih kecil.",
      "Dengan cara ini pemborosan alamat IP bisa dikurangi.",
    ],
  },
];
