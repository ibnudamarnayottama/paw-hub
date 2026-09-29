export const WHATSAPP_NUMBER = '6281234567890'

export function formatRupiah(value: number) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(value)
}

export function whatsappLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}

export type ServiceKey =
  | 'grooming'
  | 'klinik'
  | 'hotel'
  | 'pelatihan'
  | 'antar-jemput'
  | 'spa'
  | 'vaksinasi'
  | 'nutrisi'

export const services: {
  key: ServiceKey
  title: string
  desc: string
  price: string
}[] = [
  { key: 'grooming', title: 'Grooming', desc: 'Mandi, potong bulu, kuku & bersih telinga oleh groomer bersertifikat.', price: 'mulai 75rb' },
  { key: 'klinik', title: 'Klinik Hewan', desc: 'Pemeriksaan rutin, rawat jalan, hingga tindakan medis oleh dokter hewan.', price: 'mulai 120rb' },
  { key: 'hotel', title: 'Pet Hotel', desc: 'Kamar ber-AC, CCTV 24 jam & laporan foto harian untuk ketenangan Anda.', price: 'mulai 90rb/malam' },
  { key: 'pelatihan', title: 'Pelatihan', desc: 'Kelas kepatuhan, sosialisasi & trik seru dengan metode positif.', price: 'mulai 250rb' },
  { key: 'antar-jemput', title: 'Antar Jemput', desc: 'Layanan pet taxi aman dan nyaman langsung dari depan rumah Anda.', price: 'mulai 35rb' },
  { key: 'spa', title: 'Spa & Aromaterapi', desc: 'Mud bath, pijat relaksasi & perawatan bulu dengan bahan alami.', price: 'mulai 150rb' },
  { key: 'vaksinasi', title: 'Vaksinasi', desc: 'Program vaksin lengkap & pengingat jadwal otomatis via WhatsApp.', price: 'mulai 180rb' },
  { key: 'nutrisi', title: 'Konsultasi Nutrisi', desc: 'Rencana makan personal sesuai usia, ras & kondisi kesehatan anabul.', price: 'gratis' },
]

export const showcase = [
  {
    key: 'grooming',
    label: 'Grooming',
    title: 'Salon premium untuk si bulu halus',
    desc: 'Ruang grooming higienis dengan produk hypoallergenic. Setiap sesi ditutup dengan parfum lembut dan pita cantik.',
    points: ['Groomer bersertifikat internasional', 'Produk organik & hypoallergenic', 'Pengering rendah bising'],
    image: '/images/grooming.png',
  },
  {
    key: 'klinik',
    label: 'Klinik',
    title: 'Dokter hewan yang peduli & berpengalaman',
    desc: 'Dari cek kesehatan rutin hingga laboratorium, tim medis kami siap menjaga anabul tetap sehat dan ceria.',
    points: ['Dokter hewan berlisensi', 'Lab & USG di tempat', 'Layanan darurat 24 jam'],
    image: '/images/clinic.png',
  },
  {
    key: 'hotel',
    label: 'Pet Hotel',
    title: 'Liburan tenang, anabul tetap bahagia',
    desc: 'Kamar pribadi yang nyaman, jadwal main harian, dan update foto langsung ke WhatsApp Anda setiap hari.',
    points: ['Kamar ber-AC & kasur empuk', 'CCTV live 24 jam', 'Playtime 3x sehari'],
    image: '/images/hotel.png',
  },
  {
    key: 'pelatihan',
    label: 'Pelatihan',
    title: 'Belajar patuh dengan cara yang menyenangkan',
    desc: 'Trainer kami menggunakan metode positive reinforcement agar anabul belajar dengan gembira, tanpa stres.',
    points: ['Kelas privat & grup', 'Metode positive reinforcement', 'Sertifikat kelulusan'],
    image: '/images/training.png',
  },
  {
    key: 'spa',
    label: 'Spa',
    title: 'Ritual relaksasi ala resort',
    desc: 'Mandi susu oat, pijat aromaterapi, dan masker bulu untuk kulit sehat dan bulu berkilau.',
    points: ['Bahan alami & aman', 'Pijat relaksasi otot', 'Perawatan kulit sensitif'],
    image: '/images/cat-spa.png',
  },
] as const

export const packages = [
  {
    name: 'Basic Clean',
    desc: 'Perawatan harian yang esensial.',
    price: { anjing: 85000, kucing: 75000 },
    features: ['Mandi 2x shampo', 'Pengeringan & sisir', 'Potong kuku', 'Bersih telinga'],
    popular: false,
  },
  {
    name: 'Premium Groom',
    desc: 'Favorit para pawrents.',
    price: { anjing: 175000, kucing: 150000 },
    features: ['Semua di Basic Clean', 'Potong & styling bulu', 'Anti kutu & jamur', 'Parfum & pita cantik', 'Foto hasil grooming'],
    popular: true,
  },
  {
    name: 'Royal Spa',
    desc: 'Pengalaman paling memanjakan.',
    price: { anjing: 295000, kucing: 260000 },
    features: ['Semua di Premium Groom', 'Mud bath & masker bulu', 'Pijat aromaterapi', 'Sikat gigi', 'Antar jemput gratis'],
    popular: false,
  },
]

export type ProductCategory = 'Makanan' | 'Mainan' | 'Aksesoris' | 'Perawatan'

export const products: {
  id: string
  name: string
  category: ProductCategory
  price: number
  image: string
  tag?: string
}[] = [
  { id: 'p1', name: 'Natural Kibble Salmon 2kg', category: 'Makanan', price: 245000, image: '/images/product-food.png', tag: 'Terlaris' },
  { id: 'p2', name: 'Paket Mainan Rajut', category: 'Mainan', price: 89000, image: '/images/product-toy.png' },
  { id: 'p3', name: 'Kasur Bulat Cloud', category: 'Aksesoris', price: 329000, image: '/images/product-bed.png', tag: 'Baru' },
  { id: 'p4', name: 'Kalung & Tali Kulit Sage', category: 'Aksesoris', price: 199000, image: '/images/product-collar.png' },
  { id: 'p5', name: 'Shampo Oat Organik', category: 'Perawatan', price: 119000, image: '/images/product-shampoo.png', tag: 'Organik' },
  { id: 'p6', name: 'Wet Food Tuna (6 kaleng)', category: 'Makanan', price: 135000, image: '/images/product-catfood.png' },
]

export const testimonials = [
  { name: 'Rina A.', pet: 'Mochi, Pomeranian', text: 'Mochi pulang wangi banget dan potongannya lucu! Groomer-nya sabar sekali.' },
  { name: 'Dimas P.', pet: 'Luna, Kucing Persia', text: 'Pet hotel terbaik. Tiap hari dapat foto Luna lagi main, jadi tenang pas dinas luar kota.' },
  { name: 'Sari W.', pet: 'Bruno, Golden Retriever', text: 'Kelas pelatihannya efektif. Bruno sekarang sudah bisa duduk dan menunggu dengan sabar.' },
  { name: 'Kevin H.', pet: 'Oyen, Kucing Domestik', text: 'Dokternya ramah dan jelas menjelaskan kondisi Oyen. Harganya juga transparan.' },
  { name: 'Maya L.', pet: 'Coco, Shih Tzu', text: 'Layanan antar jemputnya sangat membantu. Tepat waktu dan Coco terlihat nyaman.' },
  { name: 'Andre S.', pet: 'Milo, Corgi', text: 'Royal Spa-nya worth it! Bulu Milo jadi lembut dan berkilau seminggu lebih.' },
]

export const faqs = [
  { q: 'Apakah perlu booking terlebih dahulu?', a: 'Kami sangat menyarankan booking minimal H-1 melalui formulir atau WhatsApp agar mendapat jadwal yang Anda inginkan. Walk-in tetap diterima jika slot tersedia.' },
  { q: 'Berapa lama proses grooming?', a: 'Rata-rata 1–2 jam tergantung ukuran, jenis bulu, dan paket yang dipilih. Kami akan mengabari via WhatsApp saat anabul siap dijemput.' },
  { q: 'Apa syarat menitipkan di Pet Hotel?', a: 'Anabul wajib sudah vaksin lengkap, bebas kutu, dan membawa makanan favoritnya. Kami juga menyediakan makanan premium jika diperlukan.' },
  { q: 'Apakah klinik melayani kondisi darurat?', a: 'Ya, klinik kami memiliki layanan darurat 24 jam. Silakan hubungi hotline kami agar tim dapat bersiap sebelum Anda tiba.' },
  { q: 'Wilayah mana saja yang dijangkau antar jemput?', a: 'Saat ini kami melayani radius 15 km dari toko. Untuk jarak lebih jauh, silakan hubungi kami untuk penawaran khusus.' },
]
