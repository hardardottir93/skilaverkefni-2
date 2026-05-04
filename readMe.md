# Team Task Hub – React Verkefni

## Lausn – Vite + shadcn grunnur

**Vite** verkefni með **shadcn/ui** (Tailwind 4, `components.json`, `src/components/ui`) og moppuskipan í anda **lesson6** (`src/feature/…`, `src/shared/…`) stendur til í möppunni [`team-task-hub/`](./team-task-hub/README.md). Keyrdu `npm install` og `npm run dev` þar inni. Nánar lýst í [`team-task-hub/README.md`](./team-task-hub/README.md).

---

## Kröfur

Búðu til **React + TypeScript** app sem heitir **Team Task Hub** þar sem notendur geta unnið með **projects** og **tasks**.

### Virkni:

- Skoða öll project ✅
- Búa til nýtt project ✅
- Velja project og sjá tilheyrandi task ✅
- Bæta við task ✅
- Breyta task ✅
- Eyða task ✅
- Merkja "task" sem lokið / ólokið ✅
- Leita í "tasks" ✅
- Sía eftir stöðu / forgangi ✅
- Sýna einfalt dashboard með tölfræði ✅

### Gögn og validation

- Gögn skulu vistast í **localStorage**
- Notaðu **Zod** fyrir form validation
- Gögn (projects og tasks) skulu vera **tryggð með typed parsing** þegar þau eru lesin úr localStorage
- Gögn skulu **haldast eftir refresh**

---

## State management

- **Global state** á að nota fyrir:
  - **projects**
  - **tasks**
  - **aðgerðir á þeim** (add, update, delete, toggle complete)
- Nemendur geta valið **annaðhvort**:
  - **Context API + `useReducer`**
  - **External state management** (t.d. Zustand)
- Önnur UI state (modal, search, filters, input values) má geyma sem **local state** í componentum eða custom hooks.

---

## Tæknikröfur

- React functional components
- TypeScript (**ekki nota `any`**)
- Component library (MUI, Chakra, shadcn/ui, Ant Design)
- Hooks (t.d. `useMemo`, `useCallback`, `useRef`)
- Að minnsta kosti 3 custom hooks:
  - `useLocalStorage`
  - `useTaskFilters`
  - einn hook að eigin vali
- Skýrt og skipulagt project architecture
- Endurnýtanlegir components

---

## Reglur og skil

- Minst **8 Git commits**
- Link af repo'inu og myndband sem sýnir fram á virkni

---

# Námsmat (100 stig)

## 1. Virkni – 30 stig

- Projects virka rétt: **10**
- Tasks virka rétt: **10**
- Leit og síur virka: **5**
- Dashboard tölfræði virkar: **5**

## 2. Component design – 20 stig

- Endurnýtanlegir components: **8**
- Typed props og composition: **6**
- Skýr skipting á componentum: **6**

## 3. Hooks og custom hooks – 20 stig

- Advanced hooks notaðir rétt: **8**
- Custom hooks notaðir rétt: **8**
- `useLocalStorage` og filter/search hook til staðar: **4**

## 4. State management – 10 stig

- Projects, tasks og aðgerðir eru í global state: **6**
- Skýr og rökrétt uppbygging á global state: **4**

## 5. localStorage + Zod – 10 stig

- Gögn haldast eftir refresh: **4**
- Typed localStorage logic eða custom hook: **3**
- Zod form validation rétt notað: **3**

## 6. Kóðagæði og skipulag – 10 stig

- Góð mappaskipan: **5**
- TypeScript notað rétt og kóðinn læsilegur: **5**
