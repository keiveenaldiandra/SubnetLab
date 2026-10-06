# SubnetLab
Platform belajar jaringan interaktif. Next.js + TypeScript + Tailwind CSS.

## Menjalankan
    npm install && npm run dev

## Design pattern
Container-Presenter + Custom Hooks: `SubnetCalculatorContainer` (container), `SubnetResultPresenter` dan `BinaryOctets` (presenter), `useSubnetCalc` (hook). Logika hitung ada di class `IPv4Address` dan `SubnetCalculator` (OOP).

## Docker
    docker build -t <username>/subnetlab:v1-UTS .
    docker push <username>/subnetlab:v1-UTS
Docker Hub: (isi link repository publik di sini)
