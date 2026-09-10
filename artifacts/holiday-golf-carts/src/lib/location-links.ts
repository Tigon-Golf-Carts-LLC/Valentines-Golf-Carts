interface LocationCidEntry {
  cities: string[];
  state: string;
  url: string;
}

const stateCodes: Record<string, string> = {
  alabama: "al",
  california: "ca",
  delaware: "de",
  florida: "fl",
  indiana: "in",
  newjersey: "nj",
  northcarolina: "nc",
  ohio: "oh",
  pennsylvania: "pa",
  southcarolina: "sc",
  texas: "tx",
  virginia: "va",
};

const locationCidEntries: LocationCidEntry[] = [
  {
    cities: ["hatfield"],
    state: "pa",
    url: "https://www.google.com/maps?cid=8221925612164093496",
  },
  {
    cities: ["oceanview"],
    state: "nj",
    url: "https://www.google.com/maps?cid=6446924254429489274",
  },
  {
    cities: ["longpond"],
    state: "pa",
    url: "https://www.google.com/maps?cid=11714838830522733253",
  },
  {
    cities: ["pocono", "poconopines"],
    state: "pa",
    url: "https://www.google.com/maps?cid=17137841834562046914",
  },
  {
    cities: ["dover"],
    state: "de",
    url: "https://www.google.com/maps?cid=12843447677705895190",
  },
  {
    cities: ["scranton", "scrantonwilkesbarre", "wilkesbarre"],
    state: "pa",
    url: "https://www.google.com/maps?cid=13243686786001524416",
  },
  {
    cities: ["raleigh"],
    state: "nc",
    url: "https://www.google.com/maps?cid=14570072271497929915",
  },
  {
    cities: ["southbend"],
    state: "in",
    url: "https://www.google.com/maps?cid=17532455648086849827",
  },
  {
    cities: ["gloucesterpoint"],
    state: "va",
    url: "https://www.google.com/maps?cid=16682967888503617377",
  },
  {
    cities: ["bayville"],
    state: "nj",
    url: "https://www.google.com/maps?cid=16812778070531162551",
  },
  {
    cities: ["waretown"],
    state: "nj",
    url: "https://www.google.com/maps?cid=11595558320608622005",
  },
  {
    cities: ["orangeburg"],
    state: "sc",
    url: "https://www.google.com/maps?cid=17192321019507936230",
  },
  {
    cities: ["swanton"],
    state: "oh",
    url: "https://www.google.com/maps?cid=16517552730289967239",
  },
  {
    cities: ["lecanto"],
    state: "fl",
    url: "https://www.google.com/maps?cid=4773802157529013859",
  },
  {
    cities: ["riogrande"],
    state: "nj",
    url: "https://www.google.com/maps?cid=17469351422439742131",
  },
  {
    cities: ["wichitafalls"],
    state: "tx",
    url: "https://www.google.com/maps?cid=2130717932581096026",
  },
];

const normalize = (value: string | undefined) =>
  String(value ?? "")
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");

export function getLocationCidUrl(
  city: string | undefined,
  state: string | undefined,
) {
  const cityKey = normalize(city);
  const stateKey = stateCodes[normalize(state)] ?? normalize(state);
  return locationCidEntries.find(
    (entry) => entry.state === stateKey && entry.cities.includes(cityKey),
  )?.url;
}
