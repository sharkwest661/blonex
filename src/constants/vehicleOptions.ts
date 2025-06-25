// ===== 1. src/constants/vehicleOptions.ts =====
export interface OptionItem {
  value: string;
  label: string;
}

// Make options
export const makeOptions: OptionItem[] = [
  { value: "mercedes", label: "Mercedes" },
  { value: "bmw", label: "BMW" },
  { value: "audi", label: "Audi" },
  { value: "toyota", label: "Toyota" },
  { value: "honda", label: "Honda" },
  { value: "hyundai", label: "Hyundai" },
  { value: "kia", label: "Kia" },
  { value: "nissan", label: "Nissan" },
  { value: "volkswagen", label: "Volkswagen" },
  { value: "ford", label: "Ford" },
];

// Model options mapped by make
export const modelOptions: Record<string, OptionItem[]> = {
  mercedes: [
    { value: "c200", label: "C 200" },
    { value: "c300", label: "C 300" },
    { value: "e350", label: "E 350" },
    { value: "e500", label: "E 500" },
    { value: "s500", label: "S 500" },
    { value: "g63", label: "G 63 AMG" },
    { value: "gla200", label: "GLA 200" },
    { value: "glc300", label: "GLC 300" },
  ],
  bmw: [
    { value: "320i", label: "320i" },
    { value: "325i", label: "325i" },
    { value: "520d", label: "520d" },
    { value: "530i", label: "530i" },
    { value: "x3", label: "X3" },
    { value: "x5", label: "X5" },
    { value: "m3", label: "M3" },
    { value: "m5", label: "M5" },
  ],
  audi: [
    { value: "a3", label: "A3" },
    { value: "a4", label: "A4" },
    { value: "a6", label: "A6" },
    { value: "a8", label: "A8" },
    { value: "q3", label: "Q3" },
    { value: "q5", label: "Q5" },
    { value: "q7", label: "Q7" },
    { value: "rs6", label: "RS6" },
  ],
  toyota: [
    { value: "camry", label: "Camry" },
    { value: "corolla", label: "Corolla" },
    { value: "rav4", label: "RAV4" },
    { value: "highlander", label: "Highlander" },
    { value: "landcruiser", label: "Land Cruiser" },
    { value: "prius", label: "Prius" },
  ],
  honda: [
    { value: "civic", label: "Civic" },
    { value: "accord", label: "Accord" },
    { value: "crv", label: "CR-V" },
    { value: "hrv", label: "HR-V" },
    { value: "pilot", label: "Pilot" },
  ],
  hyundai: [
    { value: "elantra", label: "Elantra" },
    { value: "sonata", label: "Sonata" },
    { value: "tucson", label: "Tucson" },
    { value: "santa_fe", label: "Santa Fe" },
    { value: "i30", label: "i30" },
  ],
  kia: [
    { value: "cerato", label: "Cerato" },
    { value: "optima", label: "Optima" },
    { value: "sportage", label: "Sportage" },
    { value: "sorento", label: "Sorento" },
    { value: "rio", label: "Rio" },
  ],
  nissan: [
    { value: "altima", label: "Altima" },
    { value: "sentra", label: "Sentra" },
    { value: "rogue", label: "Rogue" },
    { value: "pathfinder", label: "Pathfinder" },
    { value: "murano", label: "Murano" },
  ],
  volkswagen: [
    { value: "passat", label: "Passat" },
    { value: "jetta", label: "Jetta" },
    { value: "tiguan", label: "Tiguan" },
    { value: "touareg", label: "Touareg" },
    { value: "golf", label: "Golf" },
  ],
  ford: [
    { value: "focus", label: "Focus" },
    { value: "fusion", label: "Fusion" },
    { value: "escape", label: "Escape" },
    { value: "explorer", label: "Explorer" },
    { value: "mustang", label: "Mustang" },
  ],
};

// Color options
export const colorOptions: OptionItem[] = [
  { value: "black", label: "Qara" },
  { value: "white", label: "Ağ" },
  { value: "silver", label: "Gümüşü" },
  { value: "gray", label: "Boz" },
  { value: "red", label: "Qırmızı" },
  { value: "blue", label: "Mavi" },
  { value: "green", label: "Yaşıl" },
  { value: "brown", label: "Qəhvəyi" },
  { value: "gold", label: "Qızılı" },
  { value: "orange", label: "Narıncı" },
];

// Fuel type options
export const fuelOptions: OptionItem[] = [
  { value: "gasoline", label: "Benzin" },
  { value: "diesel", label: "Dizel" },
  { value: "hybrid", label: "Hibrid" },
  { value: "electric", label: "Elektrik" },
  { value: "gas", label: "Qaz" },
  { value: "other", label: "Digər" },
];

// Body type options
export const bodyOptions: OptionItem[] = [
  { value: "sedan", label: "Sedan" },
  { value: "suv", label: "SUV" },
  { value: "coupe", label: "Kupe" },
  { value: "hatchback", label: "Hetçbek" },
  { value: "wagon", label: "Universal" },
  { value: "convertible", label: "Kabriolet" },
  { value: "pickup", label: "Pikap" },
  { value: "minivan", label: "Mikroavtobus" },
];

// Transmission options
export const transmissionOptions: OptionItem[] = [
  { value: "automatic", label: "Avtomat" },
  { value: "manual", label: "Mexaniki" },
  { value: "semi-automatic", label: "Robotlaşdırılmış" },
  { value: "variator", label: "Variator" },
];

// City options (Azerbaijan cities)
export const cityOptions: OptionItem[] = [
  { value: "baku", label: "Bakı" },
  { value: "ganja", label: "Gəncə" },
  { value: "sumgait", label: "Sumqayıt" },
  { value: "mingachevir", label: "Mingəçevir" },
  { value: "shirvan", label: "Şirvan" },
  { value: "nakhchivan", label: "Naxçıvan" },
  { value: "lankaran", label: "Lənkəran" },
  { value: "sheki", label: "Şəki" },
  { value: "yevlakh", label: "Yevlax" },
  { value: "khirdalan", label: "Xırdalan" },
];
