# Dokumentáció a Next.js CMS rendszerhez

## Áttekintés

Ez a projekt egy CMS rendszert ábrázol, amelyet Next.js segítségével valósítottunk meg. Alapvető adatokat egy helyi mock.ts fájlból szerez be, de lehetővé teszi a felhasználók számára az elemek hozzáadását, törlését és módosítását, melyek az oldal frissítése után eltűnnek.

## Nyelvi lokalizáció

Az alkalmazás támogatja az angol és a magyar nyelveket. A fordításokat a [src/language](./src/language) könyvtárban tároljuk.

## Stílusozás

A stílusokat a Tailwind CSS segítségével értük el.

## Modális ablak

A modális ablak funkciója a react-modal könyvtár segítségével van implementálva.

## Nyelvváltás

A nyelvváltás a i18n és i18n-react könyvtárak segítségével történik.

## Telepítés és beállítás

1. Klónozza a git repository-t.

```bash
git clone https://github.com/WyLToR/dialogue-test.git
```

2. Telepítse a függőségeket.

```bash
yarn
```

3. Indítsa el az alkalmazást. Alapértelmezés szerint a 3000-es porton fog elindulni.

```bash
yarn run dev
```

## Függőségek

Az alkalmazás a következő könyvtárakat használja:

- i18next: Nyelvi lokalizáció és fordítás céljából.
- next: Next.js keretrendszer.
- react: React könyvtár.
- react-dom: React DOM manipulációkhoz.
- react-i18next: Nyelvi lokalizáció kezeléséhez React alkalmazásokban.
- react-modal: Modális ablakok megjelenítéséhez és kezeléséhez.

Ezek a könyvtárak elengedhetetlenek az alkalmazás működéséhez és funkcionalitásához.